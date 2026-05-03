import React from 'react';
import { getRandomNameByLanguage } from '../../data/creatorNames';

const RoomFooter = ({ 
    creator, 
    created_by, 
    currentUser, 
    is_guest_room, 
    id, 
    isOwner, 
    isFull, 
    handleShare, 
    handleJoinRoom, 
    setShowDeleteConfirm, 
    openProfile,
    participants,
    scheduled_start_time,
    language
}) => {
    const fallbackHost = participants && participants.length > 0 ? participants[0] : null;
    const host = creator || fallbackHost;

    // Show real username if available, otherwise random name only for mock rooms
    const isSystemRoom = String(id).startsWith('room-gen') || created_by === 'system';
    const isMockLikeId = String(id).length < 5;
    
    const hostDisplayName = host?.username && 
        !host.username.startsWith('user_') && 
        host.username !== 'system' &&
        host.username !== '!' &&
        host.username.length > 1
        ? host.username
        : isSystemRoom || isMockLikeId
            ? getRandomNameByLanguage(language || 'English', id)
            : (host?.name || host?.username || 'Host');

    return (
        <div className="flex justify-between items-center w-full mt-auto" style={{ padding: '4px 2px' }}>
            <div
                onClick={handleShare}
                className="cursor-pointer transition-all flex items-center justify-center"
                title="Share Room"
                style={{ 
                    color: 'rgba(255,255,255,0.6)', 
                    fontSize: window.innerWidth <= 480 ? '1rem' : '1.1rem', 
                    padding: '8px' 
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
            >
                <i className="fas fa-share-alt"></i>
            </div>

            <div style={{ 
                fontSize: window.innerWidth <= 480 ? '0.6rem' : '0.65rem', 
                color: 'rgba(255,255,255,0.25)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                flex: 1,
                justifyContent: 'center'
            }}>
                <div 
                    style={{ display: 'flex', alignItems: 'center', gap: '3px', cursor: host ? 'pointer' : 'default' }}
                    onClick={(e) => {
                        if (host && openProfile) {
                          e.stopPropagation();
                          openProfile({...host, id: host.id || created_by});
                        }
                    }}
                >
                    <span style={{color: 'rgba(255,255,255,0.35)'}}>Created by</span>
                    <span 
                        style={{ 
                            color: 'rgba(255,255,255,0.6)', 
                            fontWeight: '700',
                            transition: 'color 0.2s',
                            fontSize: '0.7rem'
                        }}
                    >
                        {hostDisplayName}
                    </span>
                </div>
            </div>

            <button
                onClick={handleJoinRoom}
                disabled={isFull}
                style={{
                    padding: window.innerWidth <= 480 ? '8px 20px' : '10px 24px',
                    borderRadius: '12px',
                    fontFamily: '"Orbitron", sans-serif',
                    fontWeight: 800,
                    fontSize: window.innerWidth <= 480 ? '0.7rem' : '0.8rem',
                    letterSpacing: '1px',
                    border: 'none',
                    background: isFull
                        ? 'rgba(100,100,100,0.3)'
                        : 'linear-gradient(135deg, #1d5eff, #3b82f6)',
                    color: isFull ? 'rgba(255,255,255,0.35)' : '#ffffff',
                    cursor: isFull ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isFull ? 'none' : '0 4px 15px rgba(29,94,255,0.4)',
                    transform: 'scale(1)',
                }}
                onMouseEnter={e => {
                    if (!isFull) {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(29,94,255,0.6)';
                    }
                }}
                onMouseLeave={e => {
                    if (!isFull) {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(29,94,255,0.4)';
                    }
                }}
            >
                {isFull ? 'FULL' : (scheduled_start_time && new Date(scheduled_start_time) > new Date() ? 'JOIN' : 'JOIN')}
            </button>

            {scheduled_start_time && new Date(scheduled_start_time) > new Date() && (
                <div style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(10px)',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    animation: 'pulse 2s infinite'
                }}>
                    <i className="far fa-clock text-indigo-400" style={{ fontSize: '0.7rem' }}></i>
                    <span style={{ 
                        color: '#fff', 
                        fontSize: '0.7rem', 
                        fontWeight: '800',
                        fontFamily: '"Orbitron", sans-serif'
                    }}>
                        {new Date(scheduled_start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            )}
        </div>
    );
};

export default RoomFooter;
