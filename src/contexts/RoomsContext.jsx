import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '../supabase/config';
import { mockRooms } from '../data/mockRooms';
import { getGuestRooms } from '../utils/guestRoomManager';

const RoomsContext = createContext({});

export const useRooms = () => useContext(RoomsContext);

// Global channel singleton - shared across all instances
let globalChannel = null;

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
            .on('broadcast', { event: 'room_created' }, ({ payload }) => {
                const newRoom = payload.room;
                setRooms(prev => {
                    if (prev.some(r => r.id === newRoom.id)) return prev;
                    return [newRoom, ...prev];
                });
            })
            .on('broadcast', { event: 'room_deleted' }, ({ payload }) => {
                console.log('Sync Delete:', payload.roomId);
                setRooms(prev => prev.filter(r => r.id !== payload.roomId));
            })
            .on('broadcast', { event: 'room_updated' }, ({ payload }) => {
                const updatedRoom = payload.room;
                setRooms(prev => {
                    const exists = prev.some(r => r.id === updatedRoom.id);
                    if (!exists) return [updatedRoom, ...prev];
                    return prev.map(r => r.id === updatedRoom.id ? updatedRoom : r);
                });
            })
            .subscribe();

        channelRef.current = channel;
        globalChannel = channel;

        // Auto-cleanup empty rooms every 30 seconds
        const cleanupInterval = setInterval(() => {
            const threeMinAgo = new Date(Date.now() - 3 * 60 * 1000);
            
            setRooms(prev => {
                const toDelete = prev.filter(r => {
                    if (String(r.id).startsWith('room-gen') || r.created_by === 'system') return false;
                    const people = Array.isArray(r.people) ? r.people : [];
                    const lastActive = new Date(r.last_active || r.created_at);
                    // 3 MINUTE RULE: Delete if 0 people AND no activity for 3 mins
                    return people.length === 0 && lastActive < threeMinAgo;
                });

                if (toDelete.length === 0) return prev;

                toDelete.forEach(async (room) => {
                    console.log(`Cleanup: Deleting room "${room.title}"`);
                    const isDbRoom = typeof room.id === 'string' && room.id.length > 20;
                    if (isDbRoom) {
                        await supabase.from('rooms').delete().eq('id', room.id);
                    }
                    globalChannel?.send({
                        type: 'broadcast',
                        event: 'room_deleted',
                        payload: { roomId: room.id }
                    });
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

    // CREATE ROOM
    const createRoom = useCallback(async (roomData, currentUser) => {
        const slug = roomData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        let username = currentUser?.user_metadata?.username || currentUser?.username || currentUser?.email?.split('@')[0] || 'Learner';
        
        const avatar = currentUser?.user_metadata?.avatar_url || 
                       currentUser?.avatar_url || 
                       `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(username)}`;

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
            const { data, error } = await supabase.from('rooms').insert([newRoom]).select().single();
            if (!error && data) savedRoom = data;
        } catch (err) {}

        const localRooms = getLocalRooms();
        localRooms.unshift(savedRoom);
        saveLocalRooms(localRooms);
        setRooms(prev => [savedRoom, ...prev]);

        globalChannel?.send({
            type: 'broadcast',
            event: 'room_created',
            payload: { room: savedRoom }
        });

        return savedRoom;
    }, []);

    // DELETE ROOM
    const deleteRoom = useCallback(async (roomId) => {
        setRooms(prev => prev.filter(r => r.id !== roomId));
        const localRooms = getLocalRooms();
        saveLocalRooms(localRooms.filter(r => r.id !== roomId));
        try { await supabase.from('rooms').delete().eq('id', roomId); } catch {}
        globalChannel?.send({
            type: 'broadcast',
            event: 'room_deleted',
            payload: { roomId }
        });
    }, []);

    // ADD PARTICIPANT (Accurate Join + No Duplicates)
    const addParticipant = useCallback(async (roomId, user) => {
        console.log(`Join Room ${roomId}: ${user.username}`);
        const isDbRoom = typeof roomId === 'string' && roomId.length > 20 && roomId.includes('-');
        let updatedRoomData = null;

        if (isDbRoom) {
            try {
                const { data: room } = await supabase.from('rooms').select('*').eq('id', roomId).single();
                if (room) {
                    const people = Array.isArray(room.people) ? room.people : [];
                    if (!people.some(p => String(p.id) === String(user.id))) {
                        const newPeople = [user, ...people];
                        const { data: updated } = await supabase.from('rooms')
                            .update({ people: newPeople, last_active: new Date().toISOString() })
                            .eq('id', roomId)
                            .select().single();
                        updatedRoomData = updated;
                    } else {
                        updatedRoomData = room;
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
            setRooms(prev => prev.map(r => {
                if (r.id !== roomId) return r;
                const people = Array.isArray(r.people) ? r.people : [];
                if (people.some(p => String(p.id) === String(user.id))) return r;
                updatedRoomData = { ...r, people: [user, ...people], last_active: new Date().toISOString() };
                return updatedRoomData;
            }));
        }

        if (updatedRoomData && globalChannel) {
            globalChannel.send({ type: 'broadcast', event: 'room_updated', payload: { room: updatedRoomData } });
        }
        if (updatedRoomData) {
            setRooms(prev => prev.map(r => r.id === roomId ? updatedRoomData : r));
        }
    }, []);

    // REMOVE PARTICIPANT (Accurate Leave)
    const removeParticipant = useCallback(async (roomId, userId) => {
        console.log(`Leave Room ${roomId}: ${userId}`);
        const isDbRoom = typeof roomId === 'string' && roomId.length > 20 && roomId.includes('-');
        let updatedRoomData = null;

        if (isDbRoom) {
            try {
                const { data: room } = await supabase.from('rooms').select('*').eq('id', roomId).single();
                if (room) {
                    const newPeople = (room.people || []).filter(p => String(p.id) !== String(userId));
                    const { data: updated } = await supabase.from('rooms')
                        .update({ people: newPeople, last_active: new Date().toISOString() })
                        .eq('id', roomId)
                        .select().single();
                    updatedRoomData = updated;
                }
            } catch (err) {}
        } else {
            const overrides = JSON.parse(localStorage.getItem('room_participant_overrides') || '{}');
            if (overrides[roomId]) {
                overrides[roomId] = overrides[roomId].filter(p => String(p.id) !== String(userId));
                localStorage.setItem('room_participant_overrides', JSON.stringify(overrides));
            }
            setRooms(prev => prev.map(r => {
                if (r.id !== roomId) return r;
                const newPeople = (r.people || []).filter(p => String(p.id) !== String(userId));
                updatedRoomData = { ...r, people: newPeople, last_active: new Date().toISOString() };
                return updatedRoomData;
            }));
        }

        if (updatedRoomData && globalChannel) {
            globalChannel.send({ type: 'broadcast', event: 'room_updated', payload: { room: updatedRoomData } });
        }
        if (updatedRoomData) {
            setRooms(prev => prev.map(r => r.id === roomId ? updatedRoomData : r));
        }
    }, []);

    // REPORT ROOM
    const reportRoom = useCallback(async (roomId) => {
        let isDeleted = false;
        let updatedRoom = null;
        setRooms(prev => {
            const newRooms = prev.map(r => {
                if (r.id !== roomId) return r;
                const count = (r.report_count || 0) + 1;
                if (count >= 10) { isDeleted = true; return null; }
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
                globalChannel?.send({ type: 'broadcast', event: 'room_updated', payload: { room: updatedRoom } });
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
