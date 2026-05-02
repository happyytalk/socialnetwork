import React from 'react'
import { Globe, Sparkles, GraduationCap, Trophy } from 'lucide-react'

const AVAILABLE_LANGS = [
  'English', 'Hindi', 'Malayalam', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Marathi', 'Gujarati', 'Punjabi', 'Odia'
];

const HomePage = ({ onStart, onSwitchMode }) => {
  return (
    <div className="landing-page">
      <main className="landing-hero-aligned">
        <div className="hero-content-aligned">
          <div className="hero-pill animate-fade-in">
             <Sparkles size={16} />
             <span>AI-POWERED LANGUAGE REVOLUTION</span>
          </div>
          <h1 className="hero-main-title">
            Master Languages
          </h1>
          <p className="hero-sub-text">
            No textbooks. No classrooms. Just real-time AI conversations, 
            interactive cultural maps, and curated linguistic paths.
          </p>
          
          <div className="hero-available-langs animate-fade-in">
            {AVAILABLE_LANGS.map(lang => (
              <span key={lang} className="lang-tag-hero">{lang}</span>
            ))}
          </div>

          <div className="hero-actions-aligned">
            <button className="cta-mode-btn study" onClick={() => onSwitchMode('study')}>
              <GraduationCap size={22} />
              <span>STUDY MODE</span>
            </button>
            <button className="cta-mode-btn quiz" onClick={() => onSwitchMode('quiz')}>
              <Trophy size={22} />
              <span>QUIZ MODE</span>
            </button>
          </div>
        </div>

        <div className="hero-visual-aligned">
           <div className="visual-abstract-element">
              <div className="visual-globe-wrapper">
                <Globe size={400} color="#3b82f6" strokeWidth={1} style={{ opacity: 0.6 }} />
                
                {/* Circular Ordered Flags - Duolingo Style */}
                <div className="flag-orbit">
                  <img src="https://flagcdn.com/h80/gb.png" className="orbit-flag" style={{ top: '0%', left: '50%', transform: 'translate(-50%, -50%)' }} alt="uk" />
                  <img src="https://flagcdn.com/h80/fr.png" className="orbit-flag" style={{ top: '25%', right: '0%', transform: 'translate(50%, -50%)' }} alt="fr" />
                  <img src="https://flagcdn.com/h80/es.png" className="orbit-flag" style={{ top: '75%', right: '0%', transform: 'translate(50%, -50%)' }} alt="es" />
                  <img src="https://flagcdn.com/h80/in.png" className="orbit-flag" style={{ bottom: '0%', left: '50%', transform: 'translate(-50%, 50%)' }} alt="in" />
                  <img src="https://flagcdn.com/h80/de.png" className="orbit-flag" style={{ top: '75%', left: '0%', transform: 'translate(-50%, -50%)' }} alt="de" />
                  <img src="https://flagcdn.com/h80/jp.png" className="orbit-flag" style={{ top: '25%', left: '0%', transform: 'translate(-50%, -50%)' }} alt="jp" />
                  <img src="https://flagcdn.com/h80/sa.png" className="orbit-flag" style={{ top: '50%', right: '-15%', transform: 'translate(50%, -50%)' }} alt="sa" />
                  <img src="https://flagcdn.com/h80/it.png" className="orbit-flag" style={{ top: '50%', left: '-15%', transform: 'translate(-50%, -50%)' }} alt="it" />
                </div>
              </div>
           </div>
        </div>
      </main>

      <footer className="landing-footer-aligned">
         <p>© 2026 HappyTalk AI · Pure Learning</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .landing-page {
          min-height: 100vh;
          background: #000000;
          color: #ffffff;
          display: flex;
          flex-direction: column;
        }

        .landing-hero-aligned {
          flex: 1;
          padding: 80px;
          display: flex;
          align-items: center;
          gap: 60px;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        .hero-content-aligned { flex: 1; text-align: left; }
        
        .hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 13px;
          margin-bottom: 24px;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .hero-main-title {
          font-size: 72px;
          line-height: 1.1;
          margin-bottom: 24px;
          font-weight: 900;
          letter-spacing: -2px;
        }

        .hero-sub-text {
          font-size: 20px;
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 32px;
          max-width: 600px;
        }

        .hero-available-langs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 40px;
        }

        .lang-tag-hero {
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 13px;
          color: #94a3b8;
          font-weight: 600;
        }

        .hero-actions-aligned { display: flex; align-items: center; gap: 20px; }

        .cta-mode-btn {
          background: #0d0d0d;
          color: white;
          padding: 16px 32px;
          font-size: 16px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 800;
          border: 2px solid #1a1a1a;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cta-mode-btn.study {
          background: #3b82f6;
          border-color: #3b82f6;
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
        }

        .cta-mode-btn:hover {
          transform: translateY(-4px);
        }

        .hero-visual-aligned { flex: 1; display: flex; align-items: center; justify-content: center; }
        
        .visual-globe-wrapper {
          position: relative;
          width: 440px;
          height: 440px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px dashed rgba(59, 130, 246, 0.1);
          border-radius: 50%;
        }

        .flag-orbit {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .orbit-flag {
          position: absolute;
          width: 60px;
          height: 42px;
          object-fit: cover;
          border-radius: 8px;
          border: 2px solid #ffffff;
          box-shadow: 0 10px 25px rgba(0,0,0,0.8);
          z-index: 20;
          transition: transform 0.3s;
        }
        
        .orbit-flag:hover { transform: scale(1.2); border-color: #3b82f6; z-index: 30; }

        .landing-footer-aligned {
          padding: 40px;
          text-align: center;
          color: #444;
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        @media (max-width: 1100px) {
          .landing-hero-aligned { flex-direction: column; text-align: center; padding: 40px 24px; }
          .hero-content-aligned { text-align: center; display: flex; flex-direction: column; align-items: center; }
          .hero-main-title { font-size: 48px; margin-bottom: 16px; }
          .hero-sub-text { font-size: 16px; margin-bottom: 24px; }
          .hero-actions-aligned { flex-direction: column; width: 100%; max-width: 400px; }
          .cta-mode-btn { width: 100%; justify-content: center; padding: 14px 24px; font-size: 14px; }
          .visual-globe-wrapper { width: 280px; height: 280px; }
          .orbit-flag { width: 40px; height: 28px; }
          .hero-visual-aligned { order: -1; margin-bottom: 40px; }
          
          .hero-available-langs {
            justify-content: center;
            max-width: 100%;
            padding: 0 10px;
          }
          
          .lang-tag-hero {
            font-size: 11px;
            padding: 4px 10px;
          }
        }

        @media (max-width: 480px) {
          .hero-main-title { font-size: 36px; }
          .visual-globe-wrapper { width: 220px; height: 220px; }
          .orbit-flag { width: 34px; height: 24px; }
        }
      `}} />
    </div>
  )
}

export default HomePage
