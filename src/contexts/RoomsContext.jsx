import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '../supabase/config';
import { mockRooms } from '../data/mockRooms';
import { getGuestRooms } from '../utils/guestRoomManager';

const RoomsContext = createContext({});

export const useRooms = () => useContext(RoomsContext);

// Global channel singleton - shared across all instances
let globalChannel = null;
let globalListeners = [];

const BROADCAST_CHANNEL = 'happytalk_rooms_v1';
const LOCAL_ROOMS_KEY = 'happytalk_created_rooms';

const getLocalRooms = () => {
    try { return JSON.parse(localStorage.getItem(LOCAL_ROOMS_KEY) || '[]'); } 
    catch { return []; }
};

const saveLocalRooms = (rooms) => {
    localStorage.setItem(LOCAL_ROOMS_KEY, JSON.stringify(rooms));
};

export const RoomsProvider = ({ children }) => {
    const [rooms, setRooms] = useState([]);
    const channelRef = useRef(null);

    // Merge all sources: Supabase DB + Local Created + Guest + Mock
    const fetchAllRooms = useCallback(async () => {
        let dbRooms = [];
        try {
            const { data, error } = await supabase
                .from('rooms')
                .select('*')
                .order('created_at', { ascending: false });
            if (!error && data) dbRooms = data;
        } catch (e) {}

        const localCreated = getLocalRooms();
        const guestRooms = getGuestRooms();

        const allRooms = [...dbRooms, ...localCreated, ...guestRooms, ...mockRooms];
        const seen = new Set();
        const unique = allRooms.filter(r => {
            const key = r.id || r.jitsi_room_name;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });

        setRooms(unique);
        return unique;
    }, []);

    // Subscribe to broadcast channel for cross-browser sync
    useEffect(() => {
        fetchAllRooms();

        const channel = supabase
            .channel(BROADCAST_CHANNEL, { config: { broadcast: { self: false } } })
            // Supabase DB changes (if rooms table + replication enabled)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'rooms' }, ({ new: newRoom }) => {
                setRooms(prev => {
                    if (prev.some(r => r.id === newRoom.id)) return prev;
                    return [newRoom, ...prev];
                });
            })
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'rooms' }, ({ new: updatedRoom }) => {
                setRooms(prev => prev.map(r => r.id === updatedRoom.id ? updatedRoom : r));
            })
            .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'rooms' }, ({ old }) => {
                setRooms(prev => prev.filter(r => r.id !== old.id));
            })
            // Broadcast events (works even WITHOUT DB table – cross-browser sync)
            .on('broadcast', { event: 'room_created' }, ({ payload }) => {
                const newRoom = payload.room;
                setRooms(prev => {
                    if (prev.some(r => r.id === newRoom.id)) return prev;
                    return [newRoom, ...prev];
                });
                // Also persist to local so it survives refresh
                const localRooms = getLocalRooms();
                if (!localRooms.some(r => r.id === newRoom.id)) {
                    localRooms.unshift(newRoom);
                    saveLocalRooms(localRooms);
                }
            })
            .on('broadcast', { event: 'room_deleted' }, ({ payload }) => {
                setRooms(prev => prev.filter(r => r.id !== payload.roomId));
            })
            .on('broadcast', { event: 'room_updated' }, ({ payload }) => {
                setRooms(prev => prev.map(r => r.id === payload.room.id ? payload.room : r));
            })
            .subscribe((status) => {
                console.log('Rooms channel status:', status);
            });

        channelRef.current = channel;
        globalChannel = channel;

        // Auto-cleanup empty rooms every 3 minutes
        const cleanupInterval = setInterval(async () => {
            const threeMinAgo = new Date(Date.now() - 3 * 60 * 1000);
            setRooms(prev => {
                const toDelete = prev.filter(r => {
                    if (String(r.id).startsWith('room-gen')) return false;
                    const lastActive = new Date(r.last_active || r.created_at);
                    return (!r.people || r.people.length === 0) && lastActive < threeMinAgo;
                });
                if (toDelete.length === 0) return prev;

                // Clean from local storage
                const localRooms = getLocalRooms();
                const deleteIds = new Set(toDelete.map(r => r.id));
                saveLocalRooms(localRooms.filter(r => !deleteIds.has(r.id)));

                // Clean from Supabase
                toDelete.forEach(room => {
                    supabase.from('rooms').delete().eq('id', room.id).then(() => {});
                    channel.send({ type: 'broadcast', event: 'room_deleted', payload: { roomId: room.id } });
                });

                return prev.filter(r => !deleteIds.has(r.id));
            });
        }, 60 * 1000);

        return () => {
            clearInterval(cleanupInterval);
            supabase.removeChannel(channel);
            globalChannel = null;
        };
    }, [fetchAllRooms]);

    // CREATE ROOM - stores in Supabase + broadcasts to all browsers
    const createRoom = useCallback(async (roomData, currentUser) => {
        const slug = roomData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        
        const username = currentUser
            ? (currentUser.user_metadata?.username 
               || currentUser.user_metadata?.full_name
               || currentUser.user_metadata?.name 
               || currentUser.email?.split('@')[0] 
               || 'HappyTalk User')
            : 'Guest';

        const avatar = currentUser
            ? (currentUser.user_metadata?.avatar_url 
               || currentUser.user_metadata?.picture
               || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(username)}`)
            : `https://api.dicebear.com/7.x/initials/svg?seed=Guest`;

        const newRoom = {
            title: roomData.title,
            topic: roomData.topic || roomData.language,
            language: roomData.language,
            level: roomData.level || 'Beginner (A1)',
            created_by: currentUser?.id || 'guest',
            jitsi_room_name: slug,
            is_private: roomData.is_private || false,
            people: [], // ← EMPTY: creator is NOT auto-added to participants
            last_active: new Date().toISOString(),
            created_at: new Date().toISOString(),
            // Store creator info for "Created by" display
            profile: {
                id: currentUser?.id || 'guest',
                username: username,
                avatar_url: avatar
            }
        };

        let savedRoom = { ...newRoom, id: `local-${Date.now()}` };

        // Try to save to Supabase DB
        try {
            const { data, error } = await supabase
                .from('rooms')
                .insert([newRoom])
                .select()
                .single();
            if (!error && data) {
                savedRoom = data;
                console.log('✅ Room saved to Supabase:', savedRoom.id);
            } else {
                console.warn('⚠️ Supabase insert failed, using local fallback:', error?.message);
            }
        } catch (err) {
            console.warn('⚠️ Supabase unavailable, using local fallback');
        }

        // Save to local storage as well (for refresh persistence)
        const localRooms = getLocalRooms();
        localRooms.unshift(savedRoom);
        saveLocalRooms(localRooms);

        // Update local state immediately
        setRooms(prev => [savedRoom, ...prev]);

        // BROADCAST to all other browsers via Supabase channel
        if (channelRef.current) {
            try {
                await channelRef.current.send({
                    type: 'broadcast',
                    event: 'room_created',
                    payload: { room: savedRoom }
                });
                console.log('📡 Room broadcasted to all browsers');
            } catch (err) {
                console.warn('Broadcast failed:', err);
            }
        }

        return savedRoom;
    }, []);

    // DELETE ROOM
    const deleteRoom = useCallback(async (roomId) => {
        // Remove from state
        setRooms(prev => prev.filter(r => r.id !== roomId));

        // Remove from local
        const localRooms = getLocalRooms();
        saveLocalRooms(localRooms.filter(r => r.id !== roomId));

        // Remove from Supabase
        try { await supabase.from('rooms').delete().eq('id', roomId); } catch {}

        // Broadcast deletion
        if (channelRef.current) {
            channelRef.current.send({
                type: 'broadcast',
                event: 'room_deleted',
                payload: { roomId }
            });
        }
    }, []);

    // ADD PARTICIPANT (on Join)
    const addParticipant = useCallback(async (roomId, user) => {
        const updateFn = (prev) => prev.map(r => {
            if (r.id !== roomId) return r;
            const people = r.people || [];
            if (people.some(p => String(p.id) === String(user.id))) return r;
            const updated = { ...r, people: [user, ...people], last_active: new Date().toISOString() };
            return updated;
        });

        setRooms(updateFn);

        // Update in DB
        try {
            const { data: room } = await supabase.from('rooms').select('people').eq('id', roomId).single();
            if (room) {
                const people = room.people || [];
                if (!people.some(p => String(p.id) === String(user.id))) {
                    const { data } = await supabase.from('rooms')
                        .update({ people: [user, ...people], last_active: new Date().toISOString() })
                        .eq('id', roomId).select().single();
                    // Broadcast update
                    channelRef.current?.send({ type: 'broadcast', event: 'room_updated', payload: { room: data } });
                }
            }
        } catch {}
    }, []);

    // REMOVE PARTICIPANT (on Leave)
    const removeParticipant = useCallback(async (roomId, userId) => {
        setRooms(prev => prev.map(r => {
            if (r.id !== roomId) return r;
            return { ...r, people: (r.people || []).filter(p => String(p.id) !== String(userId)) };
        }));

        try {
            const { data: room } = await supabase.from('rooms').select('people').eq('id', roomId).single();
            if (room) {
                const updated = { ...room, people: (room.people || []).filter(p => String(p.id) !== String(userId)) };
                const { data } = await supabase.from('rooms').update({ people: updated.people }).eq('id', roomId).select().single();
                channelRef.current?.send({ type: 'broadcast', event: 'room_updated', payload: { room: data } });
            }
        } catch {}
    }, []);

    const refreshRooms = useCallback(() => fetchAllRooms(), [fetchAllRooms]);

    return (
        <RoomsContext.Provider value={{ rooms, setRooms, createRoom, deleteRoom, addParticipant, removeParticipant, refreshRooms }}>
            {children}
        </RoomsContext.Provider>
    );
};
