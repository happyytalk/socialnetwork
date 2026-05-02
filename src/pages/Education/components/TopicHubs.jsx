import React from 'react'
import { BookOpen, Music, Users, GraduationCap, Map, Video, Bot } from 'lucide-react'

const TopicHubs = ({ language, onExplore }) => {
  const hubs = [
    { title: 'Heritage Map', icon: <Map />, color: '#7C3AED', count: '9 Wonders', type: 'map' },
    { title: 'The Basics', icon: <BookOpen />, color: '#1CB0F6', count: '12 Lessons', type: 'handbook' },
    { title: 'Live Rooms', icon: <Users />, color: '#FF9600', count: 'Active Now', type: 'rooms' },
    { title: 'Video Hub', icon: <Video />, color: '#FF4B4B', count: '50+ Tutorials', type: 'videos' },
    { title: 'AI Mission', icon: <Bot />, color: '#58CC02', count: 'Daily Task', type: 'dashboard' },
  ]

  return (
    <div className="hubs-grid">
      {hubs.map((hub, i) => (
        <div key={i} className="hub-card" style={{ '--hub-color': hub.color }}>
          <div className="hub-icon">{hub.icon}</div>
          <div className="hub-info">
            <h3>{hub.title}</h3>
            <span>{hub.count}</span>
          </div>
          <button className="hub-btn" onClick={() => onExplore(hub.type)}>Explore</button>
        </div>
      ))}

      <style dangerouslySetInnerHTML={{ __html: `
        .hubs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }

        .hub-card {
          background: #F8FAFC;
          border-radius: 24px;
          padding: 24px;
          border: 2px solid var(--border);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.2s;
        }

        .hub-card:hover {
          transform: translateY(-5px);
          border-color: var(--hub-color);
        }

        .hub-icon {
          width: 60px;
          height: 60px;
          background: var(--hub-color);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-bottom: 16px;
          box-shadow: 0 6px 0 0 rgba(0,0,0,0.1);
        }

        .hub-info h3 {
          font-size: 18px;
          margin-bottom: 4px;
          color: var(--text);
        }

        .hub-info span {
          font-size: 13px;
          font-weight: 800;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .hub-btn {
          margin-top: 20px;
          width: 100%;
          background: white;
          border: 2px solid var(--border);
          padding: 8px;
          font-size: 14px;
          color: var(--text);
        }

        .hub-card:hover .hub-btn {
          background: var(--hub-color);
          color: white;
          border-color: var(--hub-color);
        }
      `}} />
    </div>
  )
}

export default TopicHubs
