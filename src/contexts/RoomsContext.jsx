import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '../supabase/config';
import { mockRooms } from '../data/mockRooms';
import { getGuestRooms } from '../utils/guestRoomManager';

const RoomsContext = createContext({});

export const useRooms = () => useContext(RoomsContext);

// Global channel singleton
let globalChannel = null;

const BROADCAST_CHANNEL = 'happytalk_global_sync_v2';
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
    const [isSynced, setIsSynced] = useState(false);

    // 1. Fetch from Database
    const fetchAllRooms = useCallback(async () => {
        let dbRooms = [];
        try {
            const { data, error } = await supabase
                .from('rooms')
                .select('*')
                .order('created_at', { ascending: false });
            if (!error && data) dbRooms = data;
        } catch (e) { console.error('Fetch Error:', e); }

        const localCreated = getLocalRooms();
        const guestRooms = getGuestRooms();
        const overrides = JSON.parse(localStorage.getItem('room_participant_overrides') || '{}');
        const BLACKLISTED_TITLES = ['Zero to Hero Beginners', 'Grammar Practice', 'Vocabulary Voyagers', '📚 Grammar Practice'];

        const all = [...dbRooms, ...localCreated, ...guestRooms, ...mockRooms].map(r => {
            if (overrides[r.id]) {
                return { ...r, people: [...(r.people || []), ...overrides[r.id]].filter((p, i, self) => 
                    self.findIndex(t => String(t.id) === String(p.id)) === i
                )};
            }
            return r;
        });

        const seen = new Set();
        const unique = all.filter(r => {
            const key = r.id || r.jitsi_room_name || r.title;
            if (seen.has(key)) return false;
            if (r.title && BLACKLISTED_TITLES.some(t => r.title.includes(t))) return false;
            seen.add(key);
            return true;
        });

        setRooms(unique);
        setIsSynced(true);
        return unique;
    }, []);

    // 2. Real-Time Sync Engine
    useEffect(() => {
        fetchAllRooms();

        const channel = supabase.channel(BROADCAST_CHANNEL, {
            config: { broadcast: { self: true } } // Listen to self to ensure local state updates correctly
        });

        channel
            .on('broadcast', { event: 'room_created' }, ({ payload }) => {
                console.log('Broadcast Received: Created', payload.room.id);
                setRooms(prev => {
                    if (prev.some(r => r.id === payload.room.id)) return prev;
                    return [payload.room, ...prev];
                });
            })
            .on('broadcast', { event: 'room_updated' }, ({ payload }) => {
                console.log('Broadcast Received: Updated', payload.room.id);
                setRooms(prev => prev.map(r => r.id === payload.room.id ? payload.room : r));
            })
            .on('broadcast', { event: 'room_deleted' }, ({ payload }) => {
                console.log('Broadcast Received: Deleted', payload.roomId);
                setRooms(prev => prev.filter(r => r.id !== payload.roomId));
            })
            .subscribe((status) => {
                console.log('Sync Engine Status:', status);
                if (status === 'SUBSCRIBED') {
                    // When a new tab joins, it might want to ask others for current state
                    // For now, we rely on DB + Initial Fetch
                }
            });

        globalChannel = channel;

        // Auto-cleanup empty rooms (3-minute rule)
        const cleanupInterval = setInterval(async () => {
            const threeMinAgo = new Date(Date.now() - 3 * 60 * 1000);
            setRooms(prev => {
                const toDelete = prev.filter(r => {
                    if (String(r.id).startsWith('room-gen') || r.created_by === 'system') return false;
                    const people = Array.isArray(r.people) ? r.people : [];
                    const lastActive = new Date(r.last_active || r.created_at);
                    return people.length === 0 && lastActive < threeMinAgo;
                });

                toDelete.forEach(async (room) => {
                    const isDbRoom = typeof room.id === 'string' && room.id.length > 20;
                    if (isDbRoom) await supabase.from('rooms').delete().eq('id', room.id);
                    globalChannel?.send({ type: 'broadcast', event: 'room_deleted', payload: { roomId: room.id } });
                });

                return prev.filter(r => !toDelete.some(td => td.id === r.id));
            });
        }, 30 * 1000);

        return () => {
            clearInterval(cleanupInterval);
            supabase.removeChannel(channel);
            globalChannel = null;
        };
    }, [fetchAllRooms]);

    // 3. Actions
    const createRoom = useCallback(async (roomData, currentUser) => {
        const slug = roomData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        const username = currentUser?.user_metadata?.username || currentUser?.username || currentUser?.email?.split('@')[0] || 'Learner';
        const avatar = currentUser?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${username}`;

        const GUEST_ID = '00000000-0000-0000-0000-000000000000';
        const newRoom = {
            title: roomData.title,
            topic: roomData.topic || roomData.language || 'General',
            language: roomData.language || 'English',
            level: roomData.level || 'Beginner (A1)',
            created_by: currentUser?.id || GUEST_ID,
            jitsi_room_name: slug,
            people: [], 
            last_active: new Date().toISOString(),
            created_at: new Date().toISOString(),
            profile: { id: currentUser?.id || GUEST_ID, username, avatar_url: avatar }
        };

        let savedRoom = { ...newRoom, id: `temp-${Date.now()}` };

        // Attempt DB Save
        try {
            const { data, error } = await supabase.from('rooms').insert([newRoom]).select().single();
            if (data) savedRoom = data;
            else if (error) console.error('DB Insert Error:', error);
        } catch (err) { console.error('DB Exception:', err); }

        // Broadcast to ALL browsers immediately
        if (globalChannel) {
            globalChannel.send({ type: 'broadcast', event: 'room_created', payload: { room: savedRoom } });
        }

        // Local State Update
        setRooms(prev => [savedRoom, ...prev]);
        const local = getLocalRooms();
        local.unshift(savedRoom);
        saveLocalRooms(local);

        return savedRoom;
    }, []);

    const addParticipant = useCallback(async (roomId, user) => {
        const isDbRoom = typeof roomId === 'string' && roomId.length > 20;
        let updated = null;

        if (isDbRoom) {
            const { data: room } = await supabase.from('rooms').select('*').eq('id', roomId).single();
            if (room) {
                const people = Array.isArray(room.people) ? room.people : [];
                if (!people.some(p => String(p.id) === String(user.id))) {
                    const { data } = await supabase.from('rooms')
                        .update({ people: [user, ...people], last_active: new Date().toISOString() })
                        .eq('id', roomId).select().single();
                    updated = data;
                } else updated = room;
            }
        } else {
            setRooms(prev => prev.map(r => {
                if (r.id !== roomId) return r;
                const people = Array.isArray(r.people) ? r.people : [];
                if (people.some(p => String(p.id) === String(user.id))) return r;
                updated = { ...r, people: [user, ...people], last_active: new Date().toISOString() };
                return updated;
            }));
        }

        if (updated && globalChannel) {
            globalChannel.send({ type: 'broadcast', event: 'room_updated', payload: { room: updated } });
        }
        if (updated) setRooms(prev => prev.map(r => r.id === roomId ? updated : r));
    }, []);

    const removeParticipant = useCallback(async (roomId, userId) => {
        const isDbRoom = typeof roomId === 'string' && roomId.length > 20;
        let updated = null;

        if (isDbRoom) {
            const { data: room } = await supabase.from('rooms').select('*').eq('id', roomId).single();
            if (room) {
                const newPeople = (room.people || []).filter(p => String(p.id) !== String(userId));
                const { data } = await supabase.from('rooms')
                    .update({ people: newPeople, last_active: new Date().toISOString() })
                    .eq('id', roomId).select().single();
                updated = data;
            }
        } else {
            setRooms(prev => prev.map(r => {
                if (r.id !== roomId) return r;
                const newPeople = (r.people || []).filter(p => String(p.id) !== String(userId));
                updated = { ...r, people: newPeople, last_active: new Date().toISOString() };
                return updated;
            }));
        }

        if (updated && globalChannel) {
            globalChannel.send({ type: 'broadcast', event: 'room_updated', payload: { room: updated } });
        }
        if (updated) setRooms(prev => prev.map(r => r.id === roomId ? updated : r));
    }, []);

    const deleteRoom = useCallback(async (roomId) => {
        setRooms(prev => prev.filter(r => r.id !== roomId));
        const local = getLocalRooms().filter(r => r.id !== roomId);
        saveLocalRooms(local);
        try { await supabase.from('rooms').delete().eq('id', roomId); } catch {}
        globalChannel?.send({ type: 'broadcast', event: 'room_deleted', payload: { roomId } });
    }, []);

    const reportRoom = useCallback(async (roomId) => {
        let deleted = false;
        let updated = null;
        setRooms(prev => prev.map(r => {
            if (r.id !== roomId) return r;
            const count = (r.report_count || 0) + 1;
            if (count >= 10) { deleted = true; return null; }
            updated = { ...r, report_count: count };
            return updated;
        }).filter(Boolean));

        if (deleted) await deleteRoom(roomId);
        else if (updated) {
            await supabase.from('rooms').update({ report_count: updated.report_count }).eq('id', roomId);
            globalChannel?.send({ type: 'broadcast', event: 'room_updated', payload: { room: updated } });
        }
    }, [deleteRoom]);

    return (
        <RoomsContext.Provider value={{ 
            rooms, createRoom, deleteRoom, addParticipant, removeParticipant, 
            refreshRooms: fetchAllRooms, reportRoom 
        }}>
            {children}
        </RoomsContext.Provider>
    );
};
