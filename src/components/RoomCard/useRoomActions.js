import { useState } from 'react';
import { toggleRoomPrivacyApi } from '../../api/roomApi';
import { getMeetTokenApi } from '../../api/meetApi';
import { useSocket } from '../../contexts/SocketContext';
import { useRooms } from '../../contexts/RoomsContext';

export const useRoomActions = ({ room, currentUser, onTopicUpdated }) => {
    const socket = useSocket();
    const { addParticipant, removeParticipant, deleteRoom: contextDeleteRoom } = useRooms();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showFullModal, setShowFullModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [currentInviteToken, setCurrentInviteToken] = useState(room.invite_token);

    const {
        id,
        title,
        jitsi_room_name,
        mirotalk_room_name,
        is_private,
        max_capacity,
        people: profiles,
        is_guest_room
    } = room;

    const isFull = max_capacity > 0 && profiles && profiles.length >= max_capacity;

    const handleJoinRoom = async () => {
        if (isFull) {
            setShowFullModal(true);
            return;
        }

        // Allow guests to join without login
        const user = currentUser || {
            id: `guest-${Math.random().toString(36).substr(2, 9)}`,
            user_metadata: {
                username: `Guest-${Math.random().toString(36).substr(2, 4)}`,
                avatar_url: ''
            }
        };

        const roomWindow = window.open('about:blank', '_blank');
        if (!roomWindow) {
            alert('Please allow popups to join the room.');
            return;
        }

        try {
            const roomName = jitsi_room_name || mirotalk_room_name || id || 'default';
            const encodedUserName = encodeURIComponent(
                user?.user_metadata?.username || user?.username || user?.email?.split('@')[0] || 'Guest'
            );
            
            // Get Meet token
            let meetToken = null;
            try {
                const tokenResponse = await getMeetTokenApi(roomName);
                if (tokenResponse?.success) {
                    meetToken = tokenResponse.jitsiToken;
                }
            } catch (tokenErr) {
                console.warn('Failed to get Meet token, joining as guest if allowed:', tokenErr);
            }

            const username = user?.user_metadata?.username || user?.username || 'Guest';
            const baseMeetUrl = room.meeting_url || import.meta.env.VITE_JITSI_URL || 'https://meet.happytalk.in';
            
            // Construct Meet URL with parameters
            let meetUrl = `${baseMeetUrl}/${roomName}`;
            
            // Add JWT if available
            if (meetToken) {
                meetUrl += `?jwt=${meetToken}`;
            }

            // Add config and interface config parameters
            meetUrl += `#userInfo.displayName="${username}"`;
            meetUrl += `&config.prejoinPageEnabled=true`;
            meetUrl += `&config.startWithAudioMuted=true`;
            meetUrl += `&config.startWithVideoMuted=true`;
            meetUrl += `&config.watermark.enabled=true`;
            meetUrl += `&config.watermark.showLogo=true`;
            meetUrl += `&interfaceConfig.SHOW_JITSI_WATERMARK=false`;
            meetUrl += `&interfaceConfig.SHOW_WATERMARK_FOR_GUESTS=false`;
            meetUrl += `&interfaceConfig.SHOW_BRAND_WATERMARK=false`;
            meetUrl += `&interfaceConfig.DEFAULT_LOGO_URL=""`;
            meetUrl += `&interfaceConfig.JITSI_WATERMARK_LINK="https://happytalk.in"`;
            meetUrl += `&config.hideHelpButton=true`;
            meetUrl += `&config.disableThirdPartyRequests=true`;
            meetUrl += `&config.enableWelcomePage=false`;
            meetUrl += `&config.enableClosePage=true`;
            meetUrl += `&config.dynamicBrandingUrl=""`;
            meetUrl += `&config.defaultRemoteDisplayName="Learner"`;
            
            const avatarUrl = user.user_metadata?.avatar_url || user.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${username}`;
            meetUrl += `&userInfo.avatarURL="${encodeURIComponent(avatarUrl)}"`;
            
            const userData = {
                id: user.id || `guest-${Math.random().toString(36).substr(2, 9)}`,
                name: user.user_metadata?.username || user.username || 'Guest',
                username: user.user_metadata?.username || user.username || 'Guest',
                avatar_url: user.user_metadata?.avatar_url || user.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.user_metadata?.username || user.username || 'Guest'}`
            };
            
            // Add to room via context (broadcasts to all browsers)
            await addParticipant(id, userData);
            if (onTopicUpdated) onTopicUpdated();

            // Remove participant when user closes the meeting window
            const cleanup = async () => {
                await removeParticipant(id, userData.id);
                if (onTopicUpdated) onTopicUpdated();
                if (socket) socket.emit('leave_room', { roomName, userId: userData.id });
            };

            // Monitor the popup window for closure
            const checkWindow = setInterval(() => {
                if (roomWindow.closed) {
                    clearInterval(checkWindow);
                    cleanup();
                }
            }, 2000);

            window.addEventListener('beforeunload', cleanup);
            roomWindow.location.href = meetUrl;

            if (socket && user) {
                socket.emit('join_room', { roomName, user: userData });
            }
        } catch (error) {
            console.error('Failed to join room process:', error);
            if (roomWindow) roomWindow.close();
        }
    };

    const handleShare = async (e) => {
        if (e) e.stopPropagation();
        const shareRoomName = jitsi_room_name || mirotalk_room_name || id;
        if (!shareRoomName) return;
        
        const shareUrl = `${window.location.origin}/?join=${shareRoomName}`;
        const urlToCopy = is_private && currentInviteToken
            ? `${window.location.origin}/?invite=${currentInviteToken}`
            : shareUrl;

        if (navigator.share) {
            try {
                await navigator.share({ title: `HAPPYY TALK - ${title}`, text: `Join my room "${title}"!`, url: urlToCopy });
            } catch (err) {
                if (err.name !== 'AbortError') navigator.clipboard.writeText(urlToCopy);
            }
        } else {
            navigator.clipboard.writeText(urlToCopy);
        }
    };

    const handleTogglePrivacy = async (e) => {
        if (e) e.stopPropagation();
        try {
            await toggleRoomPrivacyApi(id);
            if (onTopicUpdated) onTopicUpdated();
            setShowMenu(false);
        } catch (error) {
            console.error('Failed to toggle privacy:', error);
        }
    };

    const handleDeleteRoom = async () => {
        setIsDeleting(true);
        try {
            if (is_guest_room || String(id).startsWith('guest-')) {
                const { deleteGuestRoom } = await import('../../utils/guestRoomManager');
                deleteGuestRoom(id);
            }
            // Use context deleteRoom — broadcasts to all browsers
            await contextDeleteRoom(id);
            if (onTopicUpdated) onTopicUpdated();
            setShowDeleteConfirm(false);
        } catch (error) {
            console.error('Failed to delete room:', error);
            setShowDeleteConfirm(false);
            if (onTopicUpdated) onTopicUpdated();
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        showDeleteConfirm, setShowDeleteConfirm,
        isDeleting,
        showLoginModal, setShowLoginModal,
        showFullModal, setShowFullModal,
        showMenu, setShowMenu,
        isFull,
        handleJoinRoom,
        handleShare,
        handleTogglePrivacy,
        handleDeleteRoom
    };
};
