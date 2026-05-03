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
        const overrides = JSON.parse(localStorage.getItem('room_participant_overrides') || '{}');

        const BLACKLISTED_TITLES = ['Zero to Hero Beginners', 'Grammar Practice', 'Vocabulary Voyagers', '📚 Grammar Practice'];

        const allRooms = [...dbRooms, ...localCreated, ...guestRooms, ...mockRooms].map(r => {
            if (overrides[r.id]) {
                return { ...r, people: [...(r.people || []), ...overrides[r.id]].filter((p, i, self) => 
                    self.findIndex(t => String(t.id) === String(p.id)) === i
                )};
            }
            return r;
        });
        const seen = new Set();
        const unique = allRooms.filter(r => {
            const key = r.id || r.jitsi_room_name;
            if (seen.has(key)) return false;
            
            // Explicitly filter out the test rooms the user wants removed
            if (r.title && BLACKLISTED_TITLES.some(t => r.title.includes(t))) return false;
            
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
                const updatedRoom = payload.room;
                setRooms(prev => {
                    if (!prev.some(r => r.id === updatedRoom.id)) {
                        return [updatedRoom, ...prev];
                    }
                    return prev.map(r => r.id === updatedRoom.id ? updatedRoom : r);
                });
            })
            .subscribe((status) => {
                console.log('Rooms channel status:', status);
            });

        channelRef.current = channel;
        globalChannel = channel;

        // Auto-cleanup empty rooms every 30 seconds for better responsiveness
        const cleanupInterval = setInterval(() => {
            const threeMinAgo = new Date(Date.now() - 3 * 60 * 1000);
            setRooms(prev => {
                const toDelete = prev.filter(r => {
                    // Don't auto-delete system rooms
                    if (String(r.id).startsWith('room-gen') || r.created_by === 'system') return false;
                    
                    const hasPeople = Array.isArray(r.people) && r.people.length > 0;
                    const lastActive = new Date(r.last_active || r.created_at);
                    
                    // Delete if empty AND inactive for > 3 minutes
                    return !hasPeople && lastActive < threeMinAgo;
                });

                if (toDelete.length === 0) return prev;

                const deleteIds = new Set(toDelete.map(r => r.id));
                
                // Cleanup DB and Broadcast
                toDelete.forEach(async (room) => {
                    console.log(`Auto-deleting empty room: ${room.title}`);
                    const isDbRoom = typeof room.id === 'string' && room.id.length > 20;
                    if (isDbRoom) {
                        await supabase.from('rooms').delete().eq('id', room.id);
                    }
                    globalChannel?.send({ type: 'broadcast', event: 'room_deleted', payload: { roomId: room.id } });
                });

                // Update local storage for non-DB rooms
                const localRooms = getLocalRooms().filter(r => !deleteIds.has(r.id));
                saveLocalRooms(localRooms);

                return prev.filter(r => !deleteIds.has(r.id));
            });
        }, 30 * 1000);

        return () => {
            clearInterval(cleanupInterval);
            supabase.removeChannel(channel);
            globalChannel = null;
        };
    }, [fetchAllRooms]);

    // CREATE ROOM - stores in Supabase + broadcasts to all browsers
    const createRoom = useCallback(async (roomData, currentUser) => {
        const slug = roomData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        
        // Improved username detection (avoid single-character names)
        let username = currentUser?.user_metadata?.username || currentUser?.username || 'Learner';
        if (username.length < 2) {
            username = currentUser?.email?.split('@')[0] || 'Learner';
        }

        const avatar = currentUser
            ? (currentUser.user_metadata?.avatar_url 
               || currentUser.user_metadata?.picture
               || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(username)}`)
            : `https://api.dicebear.com/7.x/initials/svg?seed=Guest`;

        const GUEST_ID = '00000000-0000-0000-0000-000000000000';
        const newRoom = {
            title: roomData.title,
            topic: roomData.topic || roomData.language || 'General',
            language: roomData.language || 'English',
            level: roomData.level || 'Beginner (A1)',
            created_by: currentUser?.id || GUEST_ID,
            jitsi_room_name: slug,
            is_private: roomData.is_private || false,
            people: [], 
            last_active: new Date().toISOString(),
            created_at: new Date().toISOString(),
            profile: {
                id: currentUser?.id || GUEST_ID,
                username: username,
                avatar_url: avatar
            }
        };

        let savedRoom = { ...newRoom, id: `local-${Date.now()}` };

        try {
            const { data, error } = await supabase
                .from('rooms')
                .insert([newRoom])
                .select()
                .single();
            
            if (error) {
                console.error('Supabase room creation error:', error);
            } else if (data) {
                savedRoom = data;
                console.log('Room successfully saved to DB:', savedRoom.id);
            }
        } catch (err) {
            console.error('Failed to insert room:', err);
        }

        const localRooms = getLocalRooms();
        localRooms.unshift(savedRoom);
        saveLocalRooms(localRooms);
        setRooms(prev => [savedRoom, ...prev]);

        if (channelRef.current) {
            channelRef.current.send({
                type: 'broadcast',
                event: 'room_created',
                payload: { room: savedRoom }
            });
        }

        return savedRoom;
    }, []);

    // DELETE ROOM
    const deleteRoom = useCallback(async (roomId) => {
        setRooms(prev => prev.filter(r => r.id !== roomId));
        const localRooms = getLocalRooms();
        saveLocalRooms(localRooms.filter(r => r.id !== roomId));
        try { await supabase.from('rooms').delete().eq('id', roomId); } catch {}
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
        console.log(`Adding participant ${user.username} to room ${roomId}`);
        
        let updatedRoom = null;

        // 1. Update local state and prepare updatedRoom for broadcast
        setRooms(prev => {
            const newRooms = prev.map(r => {
                if (r.id !== roomId) return r;
                const people = Array.isArray(r.people) ? r.people : [];
                if (people.some(p => String(p.id) === String(user.id))) return r;
                updatedRoom = { ...r, people: [user, ...people], last_active: new Date().toISOString() };
                return updatedRoom;
            });

            // 2. Broadcast immediately inside the setter to ensure we have the correct data
            if (updatedRoom && channelRef.current) {
                channelRef.current.send({
                    type: 'broadcast',
                    event: 'room_updated',
                    payload: { room: updatedRoom }
                });
            }
            return newRooms;
        });

        // 3. Persist to DB if it's a DB room
        const isDbRoom = typeof roomId === 'string' && roomId.length > 20 && roomId.includes('-');
        if (isDbRoom) {
            try {
                const { data: room } = await supabase.from('rooms').select('people').eq('id', roomId).single();
                if (room) {
                    const people = Array.isArray(room.people) ? room.people : [];
                    if (!people.some(p => String(p.id) === String(user.id))) {
                        await supabase.from('rooms')
                            .update({ 
                                people: [user, ...people], 
                                last_active: new Date().toISOString() 
                            })
                            .eq('id', roomId);
                    }
                }
            } catch (err) {}
        } else {
            const overrides = JSON.parse(localStorage.getItem('room_participant_overrides') || '{}');
            const currentPeople = overrides[roomId] || [];
            if (!currentPeople.some(p => String(p.id) === String(user.id))) {
                overrides[roomId] = [user, ...currentPeople];
                localStorage.setItem('room_participant_overrides', JSON.stringify(overrides));
            }
        }
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

    // REPORT ROOM (10 reports = delete)
    const reportRoom = useCallback(async (roomId) => {
        let isDeleted = false;
        let updatedRoom = null;

        setRooms(prev => {
            const newRooms = prev.map(r => {
                if (r.id !== roomId) return r;
                const count = (r.report_count || 0) + 1;
                if (count >= 10) {
                    isDeleted = true;
                    return null;
                }
                updatedRoom = { ...r, report_count: count };
                return updatedRoom;
            }).filter(Boolean);
            return newRooms;
        });

        if (isDeleted) {
            await deleteRoom(roomId);
            alert("This room has been removed due to multiple community reports.");
        } else if (updatedRoom) {
            try {
                await supabase.from('rooms').update({ report_count: updatedRoom.report_count }).eq('id', roomId);
                channelRef.current?.send({ type: 'broadcast', event: 'room_updated', payload: { room: updatedRoom } });
            } catch {}
        }
    }, [deleteRoom]);

    const refreshRooms = useCallback(() => fetchAllRooms(), [fetchAllRooms]);

    return (
        <RoomsContext.Provider value={{ 
            rooms, 
            setRooms, 
            createRoom, 
            deleteRoom, 
            addParticipant, 
            removeParticipant, 
            refreshRooms,
            reportRoom 
        }}>
            {children}
        </RoomsContext.Provider>
    );
};
