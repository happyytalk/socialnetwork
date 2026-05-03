import { api } from './apiSetup';
import { isPlaceholder, supabase } from '../supabase/config';

export const getUserProfileApi = async (userId) => {
    if (isPlaceholder) {
        return {
            id: userId,
            username: 'DemoUser',
            full_name: 'HappyTalk Demo',
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
            bio: 'This is a demo profile.',
            socials: { twitter: '@happytalk', website: 'happytalk.io' }
        };
    }
    try {
        const response = await api.get(`/users/profile/${userId}`);
        return response.data;
    } catch (error) {
        console.warn("Backend profile fetch failed, trying Supabase fallback:", error.message);
        try {
            const { data, error: sbError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();
            
            if (sbError) throw sbError;
            return data;
        } catch (sbError) {
            console.error("Supabase fallback also failed:", sbError.message);
            // Return basic info as last resort
            return {
                id: userId,
                username: 'User',
                avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${userId}`
            };
        }
    }
};

export const getCurrentUserProfileApi = async () => {
    if (isPlaceholder) {
        return {
            id: 'mock-user-1234',
            username: 'DemoUser',
            full_name: 'HappyTalk Demo',
            avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DemoUser',
            bio: 'This is a demo profile.',
            socials: { twitter: '@happytalk', website: 'happytalk.io' }
        };
    }
    try {
        const response = await api.get(`/users/profile`);
        return response.data;
    } catch (error) {
        console.warn("Backend current profile fetch failed, trying session metadata:", error.message);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const user = session?.user;
            if (!user) throw new Error("No active session");

            // Try to fetch from profiles table first
            const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            if (profile) return profile;

            // Fallback to auth metadata
            return {
                id: user.id,
                username: user.user_metadata?.username || user.email?.split('@')[0] || 'User',
                full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
                avatar_url: user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.id}`,
                bio: 'Hey there! I am using HappyTalk.',
                socials: {}
            };
        } catch (sbError) {
            throw error; // Re-throw original backend error if even session fallback fails
        }
    }
};

export const updateUserProfileApi = async (profileData) => {
    if (isPlaceholder) {
        return { message: 'Profile updated (mock)', profile: profileData };
    }
    try {
        // The backend's updateUserProfile expects fields like username, bio, avatar_url, socials
        const response = await api.put(`/users/profile`, profileData);
        return response.data; // Should return { message: '...', profile: updatedProfileData }
    } catch (error) {
        console.warn("Backend profile update failed, trying Supabase fallback:", error.message);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("No active user");

            const { data, error: sbError } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    username: profileData.username,
                    bio: profileData.bio,
                    avatar_url: profileData.avatar_url,
                    socials: profileData.socials,
                    updated_at: new Date().toISOString()
                })
                .select()
                .single();
            
            if (sbError) throw sbError;
            
            // Also sync to auth metadata for consistency
            await supabase.auth.updateUser({
                data: {
                    username: profileData.username,
                    avatar_url: profileData.avatar_url
                }
            });

            return { message: 'Profile updated via Supabase', profile: data };
        } catch (sbError) {
            console.error("Supabase update fallback failed:", sbError.message);
            throw error;
        }
    }
};

export const followUserApi = async (followerId) => {
    try {
        const response = await api.post(`/users/follow/${followerId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const unfollowUserApi = async (followerId) => {
    try {
        const response = await api.delete(`/users/unfollow/${followerId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const blockUserApi = async (userIdToBlock) => {
    try {
        const response = await api.post(`/users/block/${userIdToBlock}`);
        return response.data; // { message, block }
    } catch (error) {
        console.error("Error blocking user:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

export const unblockUserApi = async (userIdToUnblock) => {
    try {
        const response = await api.delete(`/users/unblock/${userIdToUnblock}`); // Assuming DELETE for unblock
        return response.data; // { message }
    } catch (error) {
        console.error("Error unblocking user:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

export const reportUserApi = async (userIdToReport, reason) => {
    try {
        const response = await api.post(`/users/report/${userIdToReport}`, { reason });
        return response.data; // { message, report }
    } catch (error) {
        console.error("Error reporting user:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

export const checkBlockStatusApi = async (userId) => {
    try {
        const response = await api.get(`/users/block-status/${userId}`);
        return response.data; // { isBlocked }
    } catch (error) {
        console.error("Error checking block status:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};