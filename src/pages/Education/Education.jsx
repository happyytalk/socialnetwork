import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import LanguageSelector from './components/LanguageSelector';
import YouTubeExplorer from './components/YouTubeExplorer';
import TranslationEngine from './components/TranslationEngine';
import WorldMapExplorer from './components/WorldMapExplorer';
import AlphabetHandbook from './components/AlphabetHandbook';
import Dictionary from './components/Dictionary';
import AITutor from './components/AITutor';
import { Book, Map, PlayCircle, Languages as TranslateIcon, Search } from 'lucide-react';
import './Education.css';

const Education = ({ onSwitchToQuiz, onPrefsChange, onInternalBackState, backSignal }) => {
  const [view, setView] = useState('home'); 
  const [userPrefs, setUserPrefs] = useState(null);
  const [activeTab, setActiveTab] = useState('learn');
  const [isDark, setIsDark] = useState(true);
  
  // Handle back signal from parent
  useEffect(() => {
    if (backSignal) {
        if (view === 'dashboard') {
            setView('selection');
        } else if (view === 'selection') {
            setView('home');
        }
    }
  }, [backSignal]);

  // Update parent on internal back availability
  useEffect(() => {
    if (onInternalBackState) {
        onInternalBackState(view !== 'home');
    }
  }, [view, onInternalBackState]);

  const handleStart = () => setView('selection');
  
  const handleModeSwitch = (mode) => {
    if (mode === 'quiz' && onSwitchToQuiz) {
      onSwitchToQuiz();
    } else {
      handleStart();
    }
  };

  const handleLanguageSelect = (prefs) => {
    setUserPrefs(prefs);
    if (onPrefsChange) onPrefsChange(prefs);
    setActiveTab('learn');
    setView('dashboard');
  };

  const updateLanguagePrefs = (updates) => {
    setUserPrefs(prev => ({ ...prev, ...updates }));
  };

  const handleReset = () => {
    setUserPrefs(null);
    setView('selection');
  };

  const toggleDarkMode = () => setIsDark(!isDark);

  if (view === 'home') {
    return (
      <div className="education-container">
        <HomePage onStart={handleStart} onSwitchMode={handleModeSwitch} />
      </div>
    );
  }

  if (view === 'selection') {
    return (
      <div className={`education-container ${isDark ? 'dark' : ''}`}>
         <LanguageSelector onSelect={handleLanguageSelect} onBack={() => setView('home')} />
      </div>
    );
  }

  return (
    <div className={`education-container app-container ${isDark ? 'dark' : ''}`}>
      {/* Internal header removed to use unified LearningLanguages header */}
      
      <main className="main-content-aligned">
        <div className="content-inner-aligned">
          {activeTab === 'learn' && (
            <AlphabetHandbook 
              language={userPrefs?.learningLanguage} 
              nativeLanguage={userPrefs?.nativeLanguage}
              onLanguageChange={updateLanguagePrefs}
            />
          )}

          {activeTab === 'map' && (
            <WorldMapExplorer onLanguageSelect={updateLanguagePrefs} />
          )}

          {activeTab === 'videos' && (
            <YouTubeExplorer language={userPrefs?.learningLanguage} />
          )}

          {activeTab === 'translate' && (
            <TranslationEngine 
              nativeLanguage={userPrefs?.nativeLanguage}
              learningLanguage={userPrefs?.learningLanguage}
            />
          )}

          {activeTab === 'dictionary' && (
            <Dictionary nativeLanguage={userPrefs?.nativeLanguage} />
          )}
        </div>
      </main>

      <nav className="global-bottom-nav">
        <div className="nav-container-aligned">
          <button className={activeTab === 'learn' ? 'active' : ''} onClick={() => setActiveTab('learn')}>
            <Book size={24} /> <span>Learn</span>
          </button>
          <button className={activeTab === 'map' ? 'active' : ''} onClick={() => setActiveTab('map')}>
            <Map size={24} /> <span>Map</span>
          </button>
          <button className={activeTab === 'videos' ? 'active' : ''} onClick={() => setActiveTab('videos')}>
            <PlayCircle size={24} /> <span>Videos</span>
          </button>
          <button className={activeTab === 'translate' ? 'active' : ''} onClick={() => setActiveTab('translate')}>
            <TranslateIcon size={24} /> <span>Translate</span>
          </button>
          <button className={activeTab === 'dictionary' ? 'active' : ''} onClick={() => setActiveTab('dictionary')}>
            <Search size={24} /> <span>Dictionary</span>
          </button>
        </div>
      </nav>

      <AITutor />

      <style dangerouslySetInnerHTML={{ __html: `
        .app-container {
          min-height: 100vh;
          background: var(--background);
          display: flex;
          flex-direction: column;
        }

        .main-content-aligned {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding-bottom: 120px;
        }

        .content-inner-aligned {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .global-bottom-nav {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 48px);
          max-width: 700px;
          background: var(--surface);
          border: 2px solid var(--border);
          border-radius: 32px;
          display: flex;
          justify-content: center;
          padding: 12px;
          z-index: 4000;
          box-shadow: 0 16px 32px rgba(0,0,0,0.1);
        }

        .nav-container-aligned {
          display: flex;
          justify-content: space-around;
          width: 100%;
          gap: 8px;
        }

        .global-bottom-nav button {
          flex: 1;
          background: transparent;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          padding: 12px;
          font-weight: 800;
          text-transform: uppercase;
          border-radius: 20px;
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .global-bottom-nav button.active {
          color: var(--primary);
          background: var(--surface-hover);
          box-shadow: 0 4px 0 var(--border);
          transform: translateY(-4px);
        }

        @media (max-width: 768px) {
          .global-bottom-nav { bottom: 0; left: 0; transform: none; width: 100%; border-radius: 0; border: none; padding-bottom: calc(12px + env(safe-area-inset-bottom)); }
          .global-bottom-nav button { font-size: 9px; padding: 10px 4px; }
          .main-content-aligned { padding-bottom: 100px; }
        }
      `}} />
    </div>
  );
};

export default Education;
