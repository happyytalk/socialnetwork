import { api } from './apiSetup';

export const getMeetTokenApi = async (roomName) => {
    try {
        const response = await api.get(`/jitsi/getToken/${roomName}`);
        return response?.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
