import React from 'react'
import { Home, Trophy, Target, ShoppingBag, MoreHorizontal, BookOpen } from 'lucide-react'

const Sidebar = () => {
  const navItems = [
    { icon: <Home size={28} />, label: 'LEARN', active: true },
    { icon: <Trophy size={28} />, label: 'LEADERBOARD', active: false },
    { icon: <Target size={28} />, label: 'QUESTS', active: false },
    { icon: <ShoppingBag size={28} />, label: 'SHOP', active: false },
    { icon: <MoreHorizontal size={28} />, label: 'MORE', active: false },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src="/logo.png" alt="Happy Learning Logo" className="logo-img" />
        <h1 className="logo-text">HAPPY<span>LEARNING</span></h1>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item, index) => (
          <button 
            key={index} 
            className={`nav-item ${item.active ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar {
          width: var(--sidebar-width);
          border-right: 2px solid var(--border);
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          height: 100vh;
          position: sticky;
          top: 0;
        }

        .sidebar-logo {
          padding: 0 12px 32px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .logo-img {
          width: 80px;
          height: auto;
          border-radius: 20px;
        }

        .logo-text {
          font-size: 24px;
          color: #0F172A;
          letter-spacing: -1px;
        }

        .logo-text span {
          color: var(--primary);
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 16px;
          background: transparent;
          color: #64748B;
          border-radius: 12px;
          text-align: left;
          transition: all 0.2s;
        }

        .nav-item:hover {
          background-color: #F1F5F9;
          color: var(--primary);
        }

        .nav-item.active {
          background-color: #E0E7FF;
          color: var(--primary);
          border: 2px solid var(--primary);
          box-shadow: 0 4px 0 0 #C7D2FE;
        }

        .nav-label {
          font-weight: 800;
          font-size: 15px;
        }

        @media (max-width: 768px) {
          .sidebar-logo { display: none; }
          .sidebar-nav {
            flex-direction: row;
            justify-content: space-around;
            width: 100%;
          }
          .nav-label { display: none; }
          .nav-item { padding: 8px; }
        }
      `}} />
    </aside>
  )
}

export default Sidebar
