import React from 'react'
import { Check, ArrowLeft, Globe } from 'lucide-react'

const languages = [
  { name: 'English' },
  { name: 'Hindi' },
  { name: 'Malayalam' },
  { name: 'Tamil' },
  { name: 'Telugu' },
  { name: 'Kannada' },
  { name: 'Bengali' },
  { name: 'Marathi' },
  { name: 'Gujarati' },
  { name: 'Punjabi' },
  { name: 'Odia' }
]

const LanguageSelector = ({ onSelect, onBack }) => {
  const [nativeLang, setNativeLang] = React.useState(null)
  const [step, setStep] = React.useState(1)

  const handleSelectLang = (langName) => {
    if (step === 1) {
      setNativeLang(langName)
      setStep(2)
    } else {
      onSelect({ nativeLanguage: nativeLang, learningLanguage: langName })
    }
  }

  return (
    <div className="onboarding-overlay animate-fade-in">
      <div className="onboarding-card-compact">
        <button className="perfect-back-btn" onClick={step === 1 ? onBack : () => setStep(1)} title="Go Back">
           <ArrowLeft size={24} color="#3b82f6" strokeWidth={3} />
        </button>

        <header className="onboarding-header-compact">
          <div className="step-tracker-compact">
            <div className={`step-dot-sm ${step === 1 ? 'active' : ''}`}></div>
            <div className={`step-dot-sm ${step === 2 ? 'active' : ''}`}></div>
          </div>

          <h1 className="onboarding-title-compact">
            {step === 1 ? 'Native ' : 'Goal: '}
            <span className="highlight">{step === 1 ? 'Language' : 'Learning'}</span>
          </h1>
          <p className="onboarding-subtitle-compact">
            {step === 1 ? 'Pick your primary tongue' : 'Select your goal today'}
          </p>
        </header>

        <div className="selection-grid-container">
          <div className="language-grid-compact">
            {languages.map((lang) => {
              const isDisabled = step === 2 && lang.name === nativeLang;
              const isSelected = step === 1 ? nativeLang === lang.name : false;
              
              return (
                <button 
                  key={lang.name}
                  className={`lang-btn-compact ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                  onClick={() => !isDisabled && handleSelectLang(lang.name)}
                  disabled={isDisabled}
                >
                  <div className="lang-icon-wrapper">
                    <Globe size={18} />
                  </div>
                  <span className="lang-text-sm">{lang.name}</span>
                  {isSelected && <Check size={16} className="check-sm" />}
                </button>
              )
            })}
          </div>
        </div>

        <footer className="onboarding-footer-compact">
           <p>© 2026 HappyTalk AI · Pure Learning</p>
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .onboarding-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000000;
          z-index: 5000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .onboarding-card-compact {
          width: 100%;
          max-width: 800px;
          background: #0a0a0a;
          padding: 60px 40px 40px 40px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          border-radius: 32px;
          position: relative;
          border: 1px solid #1a1a1a;
          box-shadow: 0 40px 100px rgba(0,0,0,0.8);
        }

        .perfect-back-btn {
          position: absolute;
          top: 24px;
          left: 24px;
          background: #111;
          border: 1px solid #222;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 0 #000;
        }
        .perfect-back-btn:hover { background: #1a1a1a; transform: translateY(-2px); border-color: #3b82f6; }
        .perfect-back-btn:active { transform: translateY(2px); box-shadow: none; }

        .step-tracker-compact { display: flex; gap: 8px; justify-content: center; }
        .step-dot-sm { width: 8px; height: 8px; background: #222; border-radius: 50%; transition: all 0.3s; }
        .step-dot-sm.active { width: 32px; border-radius: 16px; background: #3b82f6; }

        .onboarding-title-compact { 
          font-size: 36px; 
          color: #fff; 
          text-align: center;
          font-weight: 900;
          letter-spacing: -1px;
        }
        .onboarding-title-compact .highlight { color: #3b82f6; }
        .onboarding-subtitle-compact { text-align: center; color: #94a3b8; font-weight: 600; font-size: 16px; margin-top: 8px; }

        .language-grid-compact {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          width: 100%;
        }

        .lang-btn-compact {
          background: #111;
          border: 1px solid #222;
          border-radius: 20px;
          padding: 20px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }

        .lang-btn-compact:hover:not(.disabled) {
          border-color: #3b82f6;
          background: #1a1a1a;
          transform: translateY(-4px);
        }

        .lang-btn-compact.selected {
          border-color: #3b82f6;
          background: rgba(59, 130, 246, 0.05);
        }

        .lang-btn-compact.disabled { opacity: 0.1; cursor: not-allowed; }

        .lang-icon-wrapper {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3b82f6;
        }

        .lang-text-sm { 
          color: #fff; 
          font-weight: 700; 
          font-size: 14px; 
        }

        .check-sm { position: absolute; top: 12px; right: 12px; color: #3b82f6; }

        .onboarding-footer-compact { 
          text-align: center;
          color: #444; 
          font-weight: 800; 
          font-size: 11px; 
          text-transform: uppercase; 
          letter-spacing: 2px;
        }

        @media (max-width: 768px) {
          .onboarding-card-compact { padding: 80px 24px 32px 24px; border-radius: 32px; }
          .language-grid-compact { grid-template-columns: repeat(3, 1fr); }
          .onboarding-title-compact { font-size: 28px; }
        }
        @media (max-width: 480px) {
          .language-grid-compact { grid-template-columns: repeat(2, 1fr); }
        }
      `}} />
    </div>
  )
}

export default LanguageSelector
