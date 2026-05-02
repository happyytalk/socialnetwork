import React from 'react'
import { Flame, Heart, Zap, ShieldCheck } from 'lucide-react'

const StatsBar = ({ xp, streak, hearts }) => {
  return (
    <div className="stats-bar">
      <div className="stats-header">
        <div className="stat-item streak">
          <Flame size={24} fill="#FF9600" color="#FF9600" />
          <span>{streak}</span>
        </div>
        <div className="stat-item xp">
          <Zap size={24} fill="#FFD700" color="#FFD700" />
          <span>{xp}</span>
        </div>
        <div className="stat-item hearts">
          <Heart size={24} fill="#FF4B4B" color="#FF4B4B" />
          <span>{hearts}</span>
        </div>
      </div>

      <div className="stats-card quest-card">
        <h3>Daily Quests</h3>
        <div className="quest-item">
          <div className="quest-info">
            <p>Earn 50 XP</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '60%' }}></div>
            </div>
          </div>
          <span className="quest-xp">30/50</span>
        </div>
      </div>

      <div className="stats-card league-card">
        <div className="league-header">
          <h3>Bronze League</h3>
          <ShieldCheck size={32} color="#CD7F32" />
        </div>
        <p>You're in the top 10!</p>
        <button className="btn-outline" style={{ width: '100%', marginTop: '12px' }}>VIEW LEAGUE</button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .stats-bar {
          width: var(--stats-width);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
        }

        .stats-header {
          display: flex;
          justify-content: space-between;
          padding: 0 8px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 800;
          font-size: 16px;
        }

        .stat-item.streak { color: #FF9600; }
        .stat-item.xp { color: #FFD700; }
        .stat-item.hearts { color: #FF4B4B; }

        .stats-card {
          border: 2px solid var(--border);
          border-radius: 16px;
          padding: 20px;
        }

        .stats-card h3 {
          font-size: 18px;
          margin-bottom: 16px;
        }

        .quest-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .quest-info {
          flex: 1;
        }

        .quest-info p {
          font-weight: 700;
          margin-bottom: 8px;
        }

        .progress-bar {
          height: 12px;
          background: #E5E5E5;
          border-radius: 6px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--primary);
          border-radius: 6px;
        }

        .quest-xp {
          font-weight: 800;
          color: var(--text-muted);
          margin-left: 12px;
        }

        .league-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .league-card p {
          color: var(--text-muted);
          font-weight: 600;
        }

        .btn-outline {
          color: var(--primary);
          border-color: var(--border);
        }

        .btn-outline:hover {
          background: var(--background-alt);
        }
      `}} />
    </div>
  )
}

export default StatsBar
