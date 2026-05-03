import { supabase } from '../supabase/config';
import { mockRooms } from '../data/mockRooms';
import { getGuestRooms } from '../utils/guestRoomManager';

// Merge all room sources: Supabase, Guest Rooms (local), Local User Rooms, and Mocks
export const getRoomsApi = async () => {
    let supabaseRooms = [];
    try {
        const { data, error } = await supabase
            .from('rooms')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (!error && data) {
            supabaseRooms = data;
        }
    } catch (err) {
        console.warn('Supabase rooms fetch failed, using local sources only');
    }

    const guestRooms = getGuestRooms();
    const localUserRooms = JSON.parse(localStorage.getItem('happytalk_local_rooms') || '[]');
    
    // Combine all, removing duplicates by ID
    const allRooms = [...supabaseRooms, ...guestRooms, ...localUserRooms, ...mockRooms];
    const uniqueRooms = [];
    const seenIds = new Set();

    for (const room of allRooms) {
        const id = room.id || room.jitsi_room_name;
        if (!seenIds.has(id)) {
            seenIds.add(id);
            uniqueRooms.push(room);
        }
    }

    return uniqueRooms;
};

export const createRoomApi = async (roomData) => {
    const slug = roomData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    
    // Ensure we have a valid profile with a username
    const creatorName = roomData.profile?.username || roomData.profile?.name || 'HappyTalk Learner';
    const creatorAvatar = roomData.profile?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${creatorName}`;

    const newRoom = {
        title: roomData.title,
        topic: roomData.topic || roomData.language,
        language: roomData.language,
        level: roomData.level,
        created_by: roomData.created_by,
        jitsi_room_name: slug,
        is_private: roomData.is_private || false,
        people: roomData.people || [],
        last_active: new Date().toISOString(),
        created_at: new Date().toISOString(),
        profile: {
            username: creatorName,
            avatar_url: creatorAvatar
        }
    };

    let createdRoom = null;

    // Try Supabase first
    try {
        const { data, error } = await supabase
            .from('rooms')
            .insert([newRoom])
            .select()
            .single();
        
        if (!error && data) {
            console.log('Room created in Supabase:', data.id);
            createdRoom = data;
        } else {
            if (error) console.warn('Supabase insert failed, using fallback:', error.message);
        }
    } catch (err) {
        console.error('Supabase error during creation:', err);
    }

    if (!createdRoom) {
        // Fallback to local storage
        console.log('Falling back to local storage for room creation');
        const localRooms = JSON.parse(localStorage.getItem('happytalk_local_rooms') || '[]');
        createdRoom = { ...newRoom, id: `local-${Date.now()}` };
        localRooms.unshift(createdRoom);
        localStorage.setItem('happytalk_local_rooms', JSON.stringify(localRooms));
    }

    // BROADCAST the creation to all other tabs/browsers via Supabase Channel
    // This works even if Realtime is disabled on the table itself
    try {
        const channel = supabase.channel('room_updates');
        channel.subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
                await channel.send({
                    type: 'broadcast',
                    event: 'room_created',
                    payload: { room: createdRoom },
                });
                console.log('Broadcasted room creation event');
            }
        });
    } catch (err) {
        console.warn('Failed to broadcast room creation');
    }

    return createdRoom;
};

export const deleteRoomApi = async (roomId) => {
    try {
        await supabase.from('rooms').delete().eq('id', roomId);
    } catch (err) {}

    const localRooms = JSON.parse(localStorage.getItem('happytalk_local_rooms') || '[]');
    const filtered = localRooms.filter(r => r.id !== roomId);
    localStorage.setItem('happytalk_local_rooms', JSON.stringify(filtered));
    
    return { message: "Room deleted" };
};

export const addParticipantToRoomApi = async (roomId, user) => {
    if (!roomId || !user) return null;

    try {
        const { data: room } = await supabase.from('rooms').select('people').eq('id', roomId).single();
        if (room) {
            const people = room.people || [];
            if (!people.some(p => String(p.id) === String(user.id))) {
                const { data } = await supabase
                    .from('rooms')
                    .update({ 
                        people: [user, ...people],
                        last_active: new Date().toISOString() 
                    })
                    .eq('id', roomId)
                    .select()
                    .single();
                
                // Broadcast update
                supabase.channel('room_updates').send({
                    type: 'broadcast',
                    event: 'room_updated',
                    payload: { room: data },
                });

                return data;
            }
            return room;
        }
    } catch (err) {}

    const localRooms = JSON.parse(localStorage.getItem('happytalk_local_rooms') || '[]');
    const idx = localRooms.findIndex(r => r.id === roomId);
    if (idx !== -1) {
        if (!localRooms[idx].people) localRooms[idx].people = [];
        if (!localRooms[idx].people.some(p => String(p.id) === String(user.id))) {
            localRooms[idx].people.unshift(user);
            localStorage.setItem('happytalk_local_rooms', JSON.stringify(localRooms));
        }
        return localRooms[idx];
    }

    return null;
};

export const removeParticipantFromRoomApi = async (roomId, userId) => {
    try {
        const { data: room } = await supabase.from('rooms').select('people').eq('id', roomId).single();
        if (room) {
            const people = room.people || [];
            const { data } = await supabase
                .from('rooms')
                .update({ people: people.filter(p => String(p.id) !== String(userId)) })
                .eq('id', roomId)
                .select()
                .single();

            // Broadcast update
            supabase.channel('room_updates').send({
                type: 'broadcast',
                event: 'room_updated',
                payload: { room: data },
            });

            return data;
        }
    } catch (err) {}

    const localRooms = JSON.parse(localStorage.getItem('happytalk_local_rooms') || '[]');
    const idx = localRooms.findIndex(r => r.id === roomId);
    if (idx !== -1) {
        localRooms[idx].people = (localRooms[idx].people || []).filter(p => String(p.id) !== String(userId));
        localStorage.setItem('happytalk_local_rooms', JSON.stringify(localRooms));
        return localRooms[idx];
    }
    return null;
};

export const toggleRoomPrivacyApi = async (roomId) => {
    try {
        const { data: room } = await supabase.from('rooms').select('is_private').eq('id', roomId).single();
        if (room) {
            const { data } = await supabase.from('rooms').update({ is_private: !room.is_private }).eq('id', roomId).select().single();
            return data;
        }
    } catch (err) {}
    return null;
};

export const joinRoomByInviteApi = async (token) => {
    const { data } = await supabase.from('rooms').select('*').eq('invite_token', token).single();
    return { room: data };
};
