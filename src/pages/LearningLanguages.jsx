import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import Education from './Education/Education';
import { GraduationCap, Trophy, Globe, ArrowLeft, Bot, Zap, Play, Search } from 'lucide-react';

const LearningLanguages = () => {
  const navigate = useNavigate();
  const { theme, changeTheme } = useTheme();
  const [viewMode, setViewMode] = useState('study'); // 'study' or 'quiz'
  const [searchTerm, setSearchTerm] = useState('');
  const [activePrefs, setActivePrefs] = useState(null);
  const [canInternalBack, setCanInternalBack] = useState(false);
  const [backSignal, setBackSignal] = useState(0);

  const handleBackAction = () => {
    if (viewMode === 'study' && canInternalBack) {
        setBackSignal(prev => prev + 1);
    } else {
        navigate(-1);
    }
  };

  const QUIZ_LANGS = [
    { name: 'English', flag: 'gb', level: 'Beginner' },
    { name: 'Hindi', flag: 'in', level: 'Intermediate' },
    { name: 'Spanish', flag: 'es', level: 'Beginner' },
    { name: 'French', flag: 'fr', level: 'Expert' },
    { name: 'Japanese', flag: 'jp', level: 'Beginner' },
    { name: 'German', flag: 'de', level: 'Beginner' },
    { name: 'Korean', flag: 'kr', level: 'Beginner' },
    { name: 'Italian', flag: 'it', level: 'Beginner' },
    { name: 'Chinese', flag: 'cn', level: 'Beginner' },
    { name: 'Russian', flag: 'ru', level: 'Beginner' },
    { name: 'Portuguese', flag: 'pt', level: 'Beginner' },
    { name: 'Turkish', flag: 'tr', level: 'Beginner' },
    { name: 'Dutch', flag: 'nl', level: 'Beginner' },
    { name: 'Greek', flag: 'gr', level: 'Beginner' },
    { name: 'Vietnamese', flag: 'vn', level: 'Beginner' },
    { name: 'Polish', flag: 'pl', level: 'Beginner' },
    { name: 'Swedish', flag: 'se', level: 'Beginner' },
    { name: 'Latin', flag: 'va', level: 'Beginner' },
    { name: 'Indonesian', flag: 'id', level: 'Beginner' }
  ];

  const filteredLangs = QUIZ_LANGS.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (theme !== 'dark') changeTheme('dark');
  }, []);

  const handleLanguageClick = (name) => {
    const routeMap = {
      'English': '/english-quiz',
      'Hindi': '/hindi-quiz',
      'French': '/french-quiz',
      'Spanish': '/spanish-quiz',
      'Japanese': '/japanese-quiz',
      'German': '/german-quiz',
      'Korean': '/korean-quiz',
      'Italian': '/italian-quiz',
      'Chinese': '/chinese-quiz',
      'Russian': '/russian-quiz',
      'Portuguese': '/portuguese-quiz',
      'Turkish': '/turkish-quiz',
      'Dutch': '/dutch-quiz',
      'Greek': '/greek-quiz',
      'Vietnamese': '/vietnamese-quiz',
      'Polish': '/polish-quiz',
      'Swedish': '/swedish-quiz',
      'Latin': '/latin-quiz',
      'Indonesian': '/indonesian-quiz'
    };
    if (routeMap[name]) {
      navigate(routeMap[name]);
      return;
    }
    alert(`${name} quiz starting...`);
  };

  return (
    <div className={`sleek-learning-page ${viewMode === 'quiz' ? 'quiz-theme' : ''}`}>
      <style>{`
        .sleek-learning-page {
          background: #000000;
          color: #ffffff;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          transition: background 0.5s ease;
        }

        .sleek-learning-page.quiz-theme {
          background: radial-gradient(circle at top right, #001a3d, #000000);
        }

        :root {
          --primary-blue: #3b82f6;
          --bg-black: #000000;
          --text-gray: #94a3b8;
        }

        .dash-header {
          padding: 16px 5%;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 2000;
        }

        .perfect-back-btn {
          background: #ffffff;
          border: none;
          width: 52px;
          height: 52px;
          border-radius: 16px;
          color: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.15);
        }
        .perfect-back-btn svg { color: #000000; }
        .perfect-back-btn:hover { border-color: #3b82f6; transform: translateY(-2px); box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2); }

        .mode-selector-main {
          display: flex;
          background: rgba(255, 255, 255, 0.03);
          padding: 6px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          gap: 4px;
        }

        .mode-btn-main {
          padding: 10px 24px;
          border-radius: 12px;
          border: none;
          background: transparent;
          color: #666;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mode-btn-main.active.study { background: #3b82f6; color: white; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3); }
        .mode-btn-main.active.quiz { background: #f59e0b; color: white; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3); }

        /* QUIZ HUB UI */
        .quiz-hub-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 5%;
        }

        .quiz-hero-section {
          text-align: center;
          margin-bottom: 60px;
        }

        .quiz-hero-title {
          font-size: 56px;
          font-weight: 900;
          margin-bottom: 16px;
          letter-spacing: -2px;
          background: linear-gradient(to bottom right, #fff, #666);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .quiz-search-bar {
          max-width: 600px;
          margin: 0 auto 40px auto;
          position: relative;
        }

        .quiz-search-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 18px 24px 18px 56px;
          border-radius: 20px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          outline: none;
          transition: all 0.3s;
        }

        .quiz-search-input:focus { border-color: #f59e0b; background: rgba(255, 255, 255, 0.08); }
        .search-icon-pos { position: absolute; left: 20px; top: 50%; transform: translateY(-50%); color: #666; }

        .older-style-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 900px;
          margin: 0 auto;
        }

        .older-quiz-row {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 24px 32px;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.2s;
        }

        .older-quiz-row:hover {
          background: rgba(245, 158, 11, 0.05);
          border-color: #f59e0b;
          transform: translateX(10px);
        }

        .quiz-row-left { display: flex; align-items: center; gap: 24px; }
        .row-flag { width: 60px; height: 42px; object-fit: cover; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); }
        .row-name { font-size: 22px; font-weight: 800; color: #fff; }
        .row-badge { background: #222; padding: 4px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; color: #f59e0b; }

        .play-btn-circle {
          width: 48px;
          height: 48px;
          background: #222;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f59e0b;
          transition: all 0.3s;
        }
        .older-quiz-row:hover .play-btn-circle { background: #f59e0b; color: #000; transform: scale(1.1); }

        @media (max-width: 768px) {
          .sleek-learning-page {
             display: flex;
             flex-direction: column;
             height: 100vh;
             overflow: hidden;
             background: #000;
          }

          .dash-header {
            padding: 0 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            background: rgba(0,0,0,0.95);
            backdrop-filter: blur(20px);
            height: 64px;
            position: sticky;
            top: 0;
            z-index: 5000;
          }
          
          .perfect-back-btn {
            width: 48px;
            height: 48px;
            border-radius: 14px;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            color: #000000;
            box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
          }
          .perfect-back-btn svg { color: #000000; }

          .mode-selector-main {
            display: flex;
            background: #111;
            padding: 3px;
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.1);
            width: 150px;
          }
          
          .mode-btn-main {
            flex: 1;
            font-size: 10px;
            padding: 6px;
            letter-spacing: 0.5px;
            border-radius: 8px;
            gap: 4px;
          }
          .mode-btn-main span { display: none; } /* Hide text on very small headers if needed, or just keep it small */
          .mode-btn-main.active { background: #3b82f6; color: white; }

          .header-lang-pill-new {
            background: rgba(59, 130, 246, 0.1);
            color: #3b82f6;
            padding: 6px 12px;
            border-radius: 10px;
            font-size: 11px;
            font-weight: 800;
            display: flex;
            align-items: center;
            gap: 6px;
            border: 1px solid rgba(59, 130, 246, 0.2);
          }

          .hidden-mobile { display: none; }

          .quiz-hub-container {
            padding: 20px 16px 140px 16px;
            flex: 1;
            overflow-y: auto;
          }

          main {
            flex: 1;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            display: flex;
            flex-direction: column;
          }
        }
      `}</style>

      <header className="dash-header">
        <button className="perfect-back-btn" onClick={handleBackAction} title="Go Back">
          <ArrowLeft size={28} strokeWidth={3} />
        </button>

        <div className="mode-selector-main">
          <button 
            className={`mode-btn-main study ${viewMode === 'study' ? 'active' : ''}`}
            onClick={() => setViewMode('study')}
          >
            <GraduationCap size={18} />
            <span>STUDY</span>
          </button>
          <button 
            className={`mode-btn-main quiz ${viewMode === 'quiz' ? 'active' : ''}`}
            onClick={() => setViewMode('quiz')}
          >
            <Trophy size={18} />
            <span>QUIZ</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {activePrefs && viewMode === 'study' && (
            <div className="header-lang-pill-new">
              <Globe size={14} />
              <span>{activePrefs.learningLanguage}</span>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bot color={viewMode === 'quiz' ? '#f59e0b' : '#3b82f6'} size={20} />
            <span style={{ fontWeight: 900, fontSize: '18px' }} className="hidden-mobile">HappyTalk</span>
          </div>
        </div>
      </header>

      <main>
        {viewMode === 'study' ? (
          <Education 
            onSwitchToQuiz={() => setViewMode('quiz')} 
            onPrefsChange={setActivePrefs} 
            onInternalBackState={setCanInternalBack}
            backSignal={backSignal}
          />
        ) : (
          <div className="quiz-hub-container animate-fade-in">
             <div className="quiz-hero-section">
                <h2 className="quiz-hero-title">Challenge Yourself</h2>
                <p style={{ color: '#666', fontSize: '18px', fontWeight: 600 }}>Select a language to start a timed knowledge test.</p>
             </div>

             <div className="quiz-search-bar">
                <Search className="search-icon-pos" size={24} />
                <input 
                  className="quiz-search-input"
                  placeholder="Search for a language..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>

             <div className="older-style-list">
                {filteredLangs.map((lang) => (
                  <div 
                    key={lang.name}
                    className="older-quiz-row"
                    onClick={() => handleLanguageClick(lang.name)}
                  >
                    <div className="quiz-row-left">
                      <img 
                        src={`https://flagcdn.com/h80/${lang.flag}.png`} 
                        alt={lang.name} 
                        className="row-flag"
                      />
                      <div>
                        <div className="row-name">{lang.name}</div>
                        <div className="row-badge">{lang.level} Level</div>
                      </div>
                    </div>
                    <div className="play-btn-circle">
                      <Play size={20} fill="currentColor" />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LearningLanguages;
