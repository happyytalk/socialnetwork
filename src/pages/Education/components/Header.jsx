import React from 'react'
import { Globe, Bot, Search, Sun, Moon, ArrowLeft } from 'lucide-react'

const Header = ({ language, nativeLanguage, onReset, isDark, toggleDarkMode }) => {
  return (
    <header className="game-header">
      <div className="header-container">
        <div className="header-left">
          {/* Removed redundant back button and logo as per user request */}

          <div className="current-lang-pill">
            <Globe size={14} />
            <span>{language}</span>
            {nativeLanguage && <span className="from-hint">from {nativeLanguage}</span>}
          </div>
        </div>

        <div className="header-right">
          <div className="header-search-bar">
            <Search size={18} />
            <input type="text" placeholder="Search lessons..." />
          </div>

          <button className="theme-toggle-btn-header" onClick={toggleDarkMode} title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .game-header {
          background: var(--surface);
          height: 80px;
          border-bottom: 2px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          transition: all 0.3s;
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          padding: 0 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--background);
          color: var(--text-muted);
          padding: 10px 18px;
          border-radius: 14px;
          font-weight: 800;
          font-size: 14px;
          box-shadow: 0 4px 0 var(--border);
        }

        .logo-group {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .logo-icon {
          width: 44px;
          height: 44px;
          background: var(--tertiary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 0 #1588BC;
        }

        .logo-text {
          font-family: 'Fredoka', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--text);
        }

        .current-lang-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #F0F9FF;
          padding: 8px 16px;
          border-radius: 12px;
          color: var(--tertiary);
          font-weight: 900;
          text-transform: uppercase;
          font-size: 12px;
          border: 2px solid #E1F5FE;
        }

        .dark .current-lang-pill {
          background: #1E293B;
          border-color: #334155;
          color: var(--tertiary);
        }

        .from-hint {
          color: var(--text-muted);
          font-weight: 600;
          opacity: 0.7;
          font-size: 10px;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .header-search-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--background);
          padding: 10px 20px;
          border-radius: 20px;
          color: var(--text-muted);
          width: 300px;
          border: 2px solid var(--border);
        }

        .header-search-bar input {
          background: transparent;
          border: none;
          outline: none;
          font-family: inherit;
          font-weight: 700;
          color: var(--text);
          width: 100%;
          font-size: 14px;
        }

        .theme-toggle-btn-header {
          width: 48px;
          height: 48px;
          background: var(--surface);
          border: 2px solid var(--border);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text);
          box-shadow: 0 4px 0 var(--border);
          transition: all 0.2s;
        }

        .theme-toggle-btn-header:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 0 var(--border);
        }

        @media (max-width: 900px) {
          .header-search-bar { display: none; }
          .logo-text { display: none; }
          .from-hint { display: none; }
          .back-btn span { display: none; }
        }

        @media (max-width: 600px) {
          .header-container { padding: 0 16px; }
          .header-left { gap: 12px; }
          .game-header { height: 72px; }
        }
      `}} />
    </header>
  )
}

export default Header
