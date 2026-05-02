import React, { useState } from 'react'
import { Video, Plus, Users, Globe, ExternalLink, Shield } from 'lucide-react'

const StudyRooms = ({ language }) => {
  const [rooms, setRooms] = useState([
    { id: '1', name: `${language} Beginners Chat`, members: 4, active: true },
    { id: '2', name: `Culture & Stories`, members: 12, active: true },
    { id: '3', name: `Exam Prep Room`, members: 2, active: false },
  ])

  const createRoom = () => {
    const newRoom = {
      id: Math.random().toString(36).substr(2, 9),
      name: `New ${language} Room`,
      members: 1,
      active: true
    }
    setRooms([newRoom, ...rooms])
  }

  const joinMeet = (roomId) => {
    // Simulate opening Google Meet
    window.open(`https://meet.google.com/new`, '_blank')
  }

  return (
    <div className="rooms-container">
      <header className="rooms-header">
        <div className="header-info">
          <h1>Live Study Rooms</h1>
          <p>Join a room to practice {language} with others via Google Meet.</p>
        </div>
        <button className="cta-btn primary" onClick={createRoom}>
          <Plus size={20} />
          <span>Create Room</span>
        </button>
      </header>

      <div className="rooms-grid">
        {rooms.map(room => (
          <div key={room.id} className="game-card room-card">
            <div className="room-status">
              {room.active ? <span className="tag active">Live</span> : <span className="tag">Scheduled</span>}
            </div>
            <div className="room-icon">
              <Users size={32} color="var(--tertiary)" />
            </div>
            <h3>{room.name}</h3>
            <div className="room-meta">
              <div className="meta-item">
                <Users size={16} />
                <span>{room.members} Online</span>
              </div>
              <div className="meta-item">
                <Globe size={16} />
                <span>{language}</span>
              </div>
            </div>
            <div className="room-actions">
              <button className="join-btn" onClick={() => joinMeet(room.id)}>
                <Video size={18} />
                <span>Join Meet</span>
              </button>
              <button className="info-btn">
                <ExternalLink size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="meet-info-card game-card">
        <Shield size={24} color="#58CC02" />
        <div>
          <h4>Safe & Secure Learning</h4>
          <p>All rooms use Google Meet for high-quality audio and video practice.</p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .rooms-container {
          animation: fadeIn 0.5s ease;
        }

        .rooms-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .header-info h1 { font-size: 32px; margin-bottom: 8px; }
        .header-info p { color: var(--text-muted); font-weight: 700; }

        .rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .room-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 32px 24px;
          position: relative;
        }

        .room-status {
          position: absolute;
          top: 16px;
          right: 16px;
        }

        .tag {
          padding: 4px 12px;
          background: #F1F5F9;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .tag.active {
          background: #DCFCE7;
          color: #166534;
        }

        .room-icon {
          width: 64px;
          height: 64px;
          background: #E0F2FE;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .room-card h3 {
          font-size: 20px;
          margin-bottom: 12px;
        }

        .room-meta {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .room-actions {
          display: flex;
          width: 100%;
          gap: 12px;
        }

        .join-btn {
          flex: 1;
          background: var(--tertiary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
          box-shadow: 0 4px 0 0 #1588BC;
        }

        .info-btn {
          width: 48px;
          background: white;
          border: 2px solid var(--border);
          color: var(--text-muted);
          box-shadow: 0 4px 0 0 var(--border);
        }

        .meet-info-card {
          display: flex;
          align-items: center;
          gap: 20px;
          background: #F8FAFC;
        }

        .meet-info-card h4 { margin-bottom: 4px; }
        .meet-info-card p { font-size: 14px; color: var(--text-muted); font-weight: 700; }

        @media (max-width: 600px) {
          .rooms-header { flex-direction: column; text-align: center; gap: 20px; }
        }
      `}} />
    </div>
  )
}

export default StudyRooms
