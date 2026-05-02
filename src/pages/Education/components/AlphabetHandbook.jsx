import React, { useState, useEffect } from 'react'
import { BookOpen, Sparkles, ChevronDown, ChevronUp, Languages, Volume2, VolumeX, Globe, X, Loader2, Info } from 'lucide-react'
import { handbooks } from '../data/handbooks'
import { alphabetPronunciation, ALL_LANGUAGES } from '../data/alphabetPronunciation'
import { fetchUnsplashImage } from '../services/imageService'
import { chatWithOpenAI } from '../services/openaiService'

// Global mute state
let isAppMuted = false;

const SUPPORTED_LANGUAGES = [
  'English', 'Hindi', 'Malayalam', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Marathi', 'Gujarati', 'Punjabi', 'Odia'
];

const speak = (text, langStr) => {
  if (!window.speechSynthesis || isAppMuted) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  if (langStr) {
    const l = langStr.toLowerCase()
    if (l.includes('hindi')) u.lang = 'hi-IN'
    else if (l.includes('punjabi')) u.lang = 'pa-IN'
    else if (l.includes('odia') || l.includes('oriya')) u.lang = 'or-IN'
    else if (l.includes('marathi')) u.lang = 'mr-IN'
    else if (l.includes('tamil')) u.lang = 'ta-IN'
    else if (l.includes('telugu')) u.lang = 'te-IN'
    else if (l.includes('gujarati')) u.lang = 'gu-IN'
    else if (l.includes('kannada')) u.lang = 'kn-IN'
    else if (l.includes('malayalam')) u.lang = 'ml-IN'
    else if (l.includes('bengali')) u.lang = 'bn-IN'
    else if (l.includes('english')) u.lang = 'en-IN'
  }
  window.speechSynthesis.speak(u)
}

// Native-language sound hint translations
const SOUND_HINTS = {
  Tamil: {
    'uh (up)': 'அ (up)', 'a in up': 'அ (up)', 'u in up': 'அ (up)',
    'aa (father)': 'ஆ (ஆடு)', 'a in father': 'ஆ (ஆடு)',
    'i (in)': 'இ (இடம்)', 'i in in': 'இ (இடம்)',
    'ee (feet)': 'ஈ (ஈ)', 'ee in feet': 'ஈ (ஈ)',
    'u (put)': 'உ (உப்பு)', 'u in put': 'உ (உப்பு)',
    'oo (boot)': 'ஊ (ஊரன்)', 'oo in boot': 'ஊ (ஊரன்)',
    'eh (pet)': 'எ (எலி)', 'e in pet': 'எ (எலி)',
    'ay (say)': 'ஏ (ஏணி)', 'a in fame': 'ஏ (ஏணி)',
    'eye (ice)': 'ஐ (ஐந்து)', 'i in ice': 'ஐ (ஐந்து)', 'ai (cat)': 'ஐ (ஐந்து)',
    'o (pot)': 'ஒ (ஒட்டகம்)', 'o in old': 'ஒ (ஒட்டகம்)',
    'oh (go)': 'ஓ (ஓடு)', 'o in go': 'ஓ (ஓடு)',
    'ow (out)': 'ஔ (ஔடதம்)', 'ou in our': 'ஔ (ஔடதம்)',
    'k (kite)': 'க (கடல்)', 'k in kite': 'க (கடல்)',
    'hard T': 'ட (டமில்)', 'soft th': 'த (தமிழ்)',
    'p (pen)': 'ப (பழம்)', 'rolled R': 'ற (றோடு)',
    'ng in sing': 'ங (ங)', 'ny in canyon': 'ஞ (ஞாயிறு)',
    'hard N': 'ண (அண்ணன்)', 'dental n': 'ந (நடை)',
    'm (man)': 'ம (मரம்)', 'm in man': 'മ (मரம்)',
    'alveolar n': 'ன (மனம்)', 'y in yes': 'ய (யานை)',
    'tapped r': 'ர (ரதம்)', 'l (love)': 'ல (லட்சுமி)',
    'v (van)': 'வ (வண்ணம்)', 'v in van': 'வ (வண்ணம்)',
    'unique Tamil zha': 'ழ (தமிழ்)', 'hard L': 'ள (மழலை)',
    'ri (ring)': 'ரி (ரிഷി)',
  },
  Malayalam: {
    'uh (up)': 'അ (up)', 'a in up': 'അ (up)',
    'aa (father)': 'ആ (ആന)', 'a in father': 'ആ (ആന)',
    'i (in)': 'ഇ (ഇല)', 'i in in': 'ഇ (ഇല)',
    'ee (feet)': 'ഈ (ഈ)', 'ee in feet': 'ഈ (ഈ)',
    'u (put)': 'ഉ (ഉടൽ)', 'u in put': 'ഉ (ഉടൽ)',
    'oo (boot)': 'ഊ (ഊഴം)', 'oo in boot': 'ഊ (ഊഴം)',
    'ri (ring)': 'ഋ (ഋഷി)',
    'ree (long ri)': 'ൠ (ൠ)',
    'eh (pet)': 'എ (എണ്ണം)', 'e in pet': 'എ (എണ്ണം)',
    'ay (say)': 'ഏ (ഏണി)', 'ay (they)': 'ഏ (ഏണി)',
    'eye (ice)': 'ഐ (ഐശ്വര്യം)', 'ai (cat)': 'ഐ (ഐശ്വര്യം)',
    'o (pot)': 'ഒ (ഒട്ടകം)',
    'oh (go)': 'ഓ (ഓട്)', 'oa': 'ഓ (ഓട്)',
    'ow (out)': 'ഔ (ഔദാര്യം)',
    'k (kite)': 'ക (കടൽ)', 'kh (khaki)': 'ഖ (ഖജനാവ്)',
    'g (go)': 'ഗ (ഗജം)', 'gh (ghost)': 'ഘ (ഘടനം)',
    'ng (sing)': 'ങ (ദങ്ക)',
    'ch (chair)': 'ച (ചന്ദ്രൻ)', 'chh (chhota)': 'ഛ (ഛദം)',
    'j (jump)': 'ജ (ജലം)', 'jh (jhumka)': 'ഝ (ഝങ്ക)',
    'ny (canyon)': 'ഞ (ഞായർ)',
    'hard T': 'ട (ടൗൺ)', 'hard Th': 'ഠ (ഠ)',
    'hard D': 'ഡ (ഡ്രം)', 'hard Dh': 'ഢ (ഢ)',
    'hard N': 'ണ (ണ)',
    'soft t': 'ത (തമ്പ്)', 'soft th': 'ത (തമ്പ്)',
    'soft d': 'ദ (ദൈവം)', 'soft dh': 'ധ (ധനം)',
    'n (no)': 'ന (നദി)',
    'p (pen)': 'പ (പழം)', 'ph (phone)': 'ഫ (ഫലം)',
    'b (bat)': 'ബ (ബലം)', 'bh (abhor)': 'ഭ (ഭൂമി)',
    'm (man)': 'മ (മരം)',
    'y (yes)': 'യ (യാത്ര)', 'rolled r': 'ര (രതം)',
    'l (love)': 'ಲ (ಲಕ್ಷ್ಮಿ)', 'v (van)': 'വ (വനം)',
    'sh (ship)': 'ശ (ശക്തി)', 'harder sh': 'ഷ (ഷ)',
    's (sun)': 'സ (സൂര്യൻ)', 'h (hat)': 'ഹ (ഹൃദയം)',
    'unique zha': 'ഴ (ഴ)', 'hard L': 'ള (ളം)',
    'retroflex r': 'റ (റോഡ്)',
  },
  Hindi: {
    'uh (up)': 'अ (up)', 'aa (father)': 'आ (आम)',
    'i (in)': 'इ (इमली)', 'ee (feet)': 'ई (ईख)',
    'u (put)': 'उ (उम्र)', 'oo (boot)': 'ऊ (ऊन)',
    'ri (ring)': 'ऋ (ऋषि)', 'eh (pet)': 'ए (एक)',
    'ay (say)': 'ऐ (ऐनक)', 'oh (go)': 'ओ (ओस)',
    'ow (out)': 'औ (औरत)',
  },
  Kannada: {
    'uh (up)': 'ಅ (up)', 'aa (father)': 'ಆ (ಆಡು)',
    'i (in)': 'ಇ (ಇಲಿ)', 'ee (feet)': 'ಈ (ಈಚಲು)',
    'u (put)': 'ಉ (ಉಪ್ಪು)', 'oo (boot)': 'ಊ (ಊರು)',
    'ri (ring)': 'ಋ (ಋಷಿ)', 'oh (go)': 'ಓ (ಓಡು)',
  },
  Bengali: {
    'uh (up)': 'অ (up)', 'aa (father)': 'আ (আম)',
    'i (in)': 'ই (ইট)', 'ee (feet)': 'ঈ (ঈগল)',
    'u (put)': 'উ (উপর)', 'oo (boot)': 'ঊ (ঊষা)',
  },
}

const getNativeSoundHint = (sound, nativeLanguage) => {
  if (!sound || !nativeLanguage || nativeLanguage === 'English') return sound
  const map = SOUND_HINTS[nativeLanguage]
  if (!map) return sound
  const key = sound.toLowerCase().trim()
  return map[key] || sound
}

const getNativeTranslation = (englishMeaning, nativeLanguage) => {
  if (!nativeLanguage || nativeLanguage === 'English') return englishMeaning
  const wordMap = handbooks[nativeLanguage]?.sections?.find(s => s.type === 'words')?.words
  if (wordMap) {
    const match = wordMap.find(w => w.meaning.toLowerCase() === englishMeaning.toLowerCase())
    if (match) return match.native
  }
  return englishMeaning
}

const ImageModal = ({ imageUrl, title, onClose, isLoading, translations }) => {
  if (!imageUrl && !isLoading) return null;
  return (
    <div className="image-overlay" onClick={onClose}>
      <div className="image-modal glass animate-slide-up" onClick={e => e.stopPropagation()}>
        <button className="close-img-btn" onClick={onClose}><X /></button>
        
        <div className="modal-main-content no-scrollbar">
          {isLoading ? (
            <div className="img-loader">
              <Loader2 className="animate-spin" size={48} />
              <p>Consulting Global AI Archives...</p>
            </div>
          ) : (
            <>
              <div className="img-wrapper">
                <img src={imageUrl} alt={title} className="pop-image" />
                <div className="img-caption">{title}</div>
              </div>

              <div className="global-translations">
                <h3><Sparkles size={18} /> Global AI Translation</h3>
                <div className="translation-grid">
                  {translations && Object.entries(translations).map(([lang, text]) => (
                    <div key={lang} className="translation-item">
                      <span className="trans-lang">{lang}</span>
                      <span className="trans-text">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const LetterCard = ({ char, roman, sound, sign, name, use, example, meaning, lang, nativeLanguage, onClick, ...rest }) => {
  const displaySound = getNativeSoundHint(sound, nativeLanguage) || sound
  
  // Show native language equivalent if it exists in the data
  const nativeKey = nativeLanguage.toLowerCase()
  const nativeEquiv = rest[nativeKey]

  return (
    <div className="letter-card" onClick={onClick} title="Click for global translation">
      <div className="letter-char">{char}</div>
      {roman && <div className="letter-roman">{roman}</div>}
      {nativeEquiv && <div className="letter-native-equiv">({nativeEquiv})</div>}
      {displaySound && <div className="letter-sound">{displaySound}</div>}
      {name && <div className="letter-name">{name}</div>}
      {sign && sign !== '(none)' && <div className="letter-sign">sign: {sign}</div>}
      {use && <div className="letter-sound">{use}</div>}
      {meaning && <div className="letter-sound">{meaning}</div>}
      <div className="letter-speaker"><Volume2 size={12} /></div>
    </div>
  )
}

const WordCard = ({ native, roman, meaning, nativeLanguage, lang, onClick }) => (
  <div className="word-card" onClick={onClick}>
    <div className="word-main">
      <span className="word-native">{native}</span>
      <span className="word-roman">{roman}</span>
    </div>
    <span className="word-meaning">{getNativeTranslation(meaning, nativeLanguage)}</span>
    <div className="letter-speaker"><Volume2 size={12} /></div>
  </div>
)

const Section = ({ section, language, nativeLanguage, onCardClick }) => {
  const [expanded, setExpanded] = useState(true)
  return (
    <div className="hb-section">
      <button className="section-toggle" onClick={() => setExpanded(!expanded)}>
        <h3>{section.title}</h3>
        {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {expanded && (
        <div className="section-body no-scrollbar">
          {section.description && <p className="section-desc">{section.description}</p>}
          {section.letters && (
            <div className="letters-grid-fill">
              {section.letters.map((l, i) => (
                <LetterCard 
                  key={i} 
                  {...l} 
                  lang={language} 
                  nativeLanguage={nativeLanguage} 
                  onClick={() => onCardClick(l.char, l.example || l.meaning || l.roman || l.char, language)}
                />
              ))}
            </div>
          )}
          {section.groups && section.groups.map((g, gi) => (
            <div key={gi} className="consonant-group">
              <h4 className="group-name">{g.name}</h4>
              <div className="letters-grid-fill">
                {g.letters.map((l, i) => (
                  <LetterCard 
                    key={i} 
                    {...l} 
                    lang={language} 
                    nativeLanguage={nativeLanguage} 
                    onClick={() => onCardClick(l.char, l.example || l.meaning || l.roman || l.char, language)}
                  />
                ))}
              </div>
            </div>
          ))}
          {section.words && (
            <div className="words-list-aligned">
              {section.words.map((w, i) => (
                <WordCard 
                  key={i} 
                  {...w} 
                  nativeLanguage={nativeLanguage} 
                  lang={language} 
                  onClick={() => onCardClick(w.native, w.meaning, language)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const AlphabetPronunciationSection = ({ nativeLanguage, onCardClick }) => {
  const [expanded, setExpanded] = useState(true)
  const targetLang = nativeLanguage && nativeLanguage !== 'English' ? nativeLanguage : null

  return (
    <div className="hb-section">
      <button className="section-toggle" onClick={() => setExpanded(!expanded)}>
        <h3>🌐 A-Z Pronunciation {targetLang ? `in ${targetLang}` : 'in Indian Languages'}</h3>
        {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {expanded && (
        <div className="section-body">
          <p className="section-desc">
            How each English letter is pronounced {targetLang ? `in ${targetLang}` : 'across Indian languages'}. Tap a card to hear it.
          </p>
          <div className="az-grid-aligned">
            {alphabetPronunciation.map((row) => {
              const nativeScript = targetLang ? row[targetLang] : null
              return (
                <div
                  key={row.letter}
                  className="az-card"
                  onClick={() => onCardClick(nativeScript || row.letter, row.english, nativeLanguage)}
                  title={`Click to hear "${row.letter}" in ${targetLang || 'English'}`}
                >
                  <div className="az-letter">{row.letter}</div>
                  <div className="az-english">{row.english}</div>
                  {nativeScript && (
                    <div className="az-native">{nativeScript}</div>
                  )}
                  <div className="letter-speaker"><Volume2 size={11} /></div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

const AlphabetHandbook = ({ language, nativeLanguage, onLanguageChange }) => {
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const [muted, setMuted] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [activeTitle, setActiveTitle] = useState('')
  const [aiTranslations, setAiTranslations] = useState(null)

  useEffect(() => {
    isAppMuted = muted;
    if (muted) window.speechSynthesis.cancel();
  }, [muted]);

  const handleCardClick = async (text, query, lang) => {
    speak(text, lang);
    setActiveTitle(query);
    setIsImageLoading(true);
    setAiTranslations(null);
    setSelectedImage(true); // Placeholder to show modal

    const prompt = `Act as a multilingual translator. 
    Translate the text: "${text}" (which means "${query}" in ${lang}) into the following languages:
    English, Hindi, Malayalam, Tamil, Telugu, Kannada, Bengali, Marathi, Gujarati, Punjabi, Odia.
    Provide ONLY a JSON object where keys are language names and values are the translation in native script.
    Example: {"Hindi": "नमस्ते", "Tamil": "வணக்கம்"}`;

    const [imageUrl, translations] = await Promise.all([
      fetchUnsplashImage(query),
      chatWithOpenAI(prompt).then(res => {
        try { return JSON.parse(res.replace(/```json|```/g, '')); } catch(e) { return null; }
      })
    ]);

    setSelectedImage(imageUrl);
    setAiTranslations(translations);
    setIsImageLoading(false);
  };

  const data = handbooks[language] || {
    title: `${language} — Interactive Learning`,
    subtitle: `Learn ${language} · Coming Soon`,
    intro: `Welcome to the ${language} explorer! Our historians are actively digitizing the full encyclopedia for ${language}.`,
    totalLetters: '...',
    sections: []
  }

  return (
    <div className="handbook-container-aligned no-scrollbar">
      {/* Hero */}
      <div className="hb-hero-premium gradient-hero-blue">
        <div className="hb-hero-text">
          <h1 className="hb-title-premium">{data.title}</h1>
          <p className="hb-subtitle-premium">{data.subtitle}</p>
        </div>
        <div className="hb-hero-meta">
           <button 
             className={`mute-btn-round ${muted ? 'muted' : ''}`} 
             onClick={() => setMuted(!muted)}
           >
             {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
           </button>
           <div className="letters-count-pill">{data.totalLetters} letters</div>
        </div>
      </div>

      {/* Language Preferences Bar */}
      <div className="preferences-bar-aligned">
        <div className="pref-item">
          <Globe size={16} />
          <span>Learning:</span>
          <div className="custom-dropdown-trigger" onClick={() => setShowLangDropdown(!showLangDropdown)}>
            <strong>{language}</strong>
            <ChevronDown size={14} />
            {showLangDropdown && (
              <div className="custom-dropdown-list no-scrollbar">
                {SUPPORTED_LANGUAGES.map(lang => (
                  <div 
                    key={lang} 
                    className={`dropdown-opt ${lang === language ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onLanguageChange && onLanguageChange({ learningLanguage: lang })
                      setShowLangDropdown(false)
                    }}
                  >
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {nativeLanguage && (
          <div className="pref-item native-item">
            <Sparkles size={16} />
            <span>Native:</span>
            <strong>{nativeLanguage}</strong>
          </div>
        )}
      </div>

      {/* Intro Card */}
      <div className="intro-card-premium alien-card">
         <div className="intro-icon-ring"><BookOpen size={24} /></div>
         <p>{data.intro}</p>
      </div>

      {/* Sections Grid */}
      <div className="handbook-content-grid" style={{ direction: data.direction || 'ltr' }}>
        {data.sections.map((sec, i) => (
          <Section key={i} section={sec} language={language} nativeLanguage={nativeLanguage} onCardClick={handleCardClick} />
        ))}

        {language === 'English' && (
          <AlphabetPronunciationSection nativeLanguage={nativeLanguage} onCardClick={handleCardClick} />
        )}
      </div>

      {/* Global AI Modal */}
      {(selectedImage || isImageLoading) && (
        <ImageModal 
          imageUrl={selectedImage === true ? null : selectedImage} 
          title={activeTitle} 
          isLoading={isImageLoading}
          translations={aiTranslations}
          onClose={() => { setSelectedImage(null); setAiTranslations(null); }} 
        />
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .handbook-container-aligned { max-width: 1200px; margin: 0 auto; padding: 40px 24px 120px; }
        
        .hb-hero-premium {
          background: linear-gradient(135deg, #1CB0F6 0%, #1588BC 100%);
          border-radius: 32px;
          padding: 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          color: white;
          box-shadow: 0 12px 0 #1588BC;
          border: 2px solid #1E293B;
        }

        .hb-title-premium { font-size: 48px; font-weight: 800; margin-bottom: 8px; }
        .hb-subtitle-premium { font-size: 20px; font-weight: 700; opacity: 0.9; }
        .hb-hero-meta { display: flex; align-items: center; gap: 20px; }

        .mute-btn-round { background: white; color: var(--tertiary); border: none; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 0 #CBD5E1; transition: all 0.2s; }
        .mute-btn-round.muted { background: #FF4B4B; color: white; box-shadow: 0 4px 0 #D43F3F; }
        .letters-count-pill { background: white; color: #1588BC; padding: 14px 28px; border-radius: 20px; font-weight: 900; font-size: 16px; }

        .preferences-bar-aligned {
          display: flex;
          gap: 20px;
          margin-bottom: 24px;
        }

        .pref-item {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--surface);
          padding: 16px 24px;
          border-radius: 20px;
          border: 2px solid var(--border);
          box-shadow: 0 6px 0 var(--border);
          font-weight: 800;
          position: relative;
        }
        .pref-item span { color: var(--text-muted); font-size: 13px; text-transform: uppercase; }
        .pref-item strong { color: var(--tertiary); font-size: 16px; }

        .custom-dropdown-trigger { display: flex; align-items: center; gap: 8px; cursor: pointer; }
        .custom-dropdown-list {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          right: 0;
          background: var(--surface);
          border: 2px solid var(--border);
          border-radius: 20px;
          padding: 8px;
          z-index: 1000;
          max-height: 300px;
          overflow-y: auto;
          box-shadow: 0 12px 32px rgba(0,0,0,0.15);
        }
        .dropdown-opt { padding: 12px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; }
        .dropdown-opt:hover { background: var(--background); color: var(--tertiary); }
        .dropdown-opt.active { background: var(--tertiary); color: white; }

        .intro-card-premium {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 32px;
          background: var(--surface);
          border-radius: 24px;
          border: 2px solid var(--border);
          margin-bottom: 40px;
          box-shadow: 0 8px 0 var(--border);
        }
        .intro-icon-ring { width: 60px; height: 60px; background: var(--tertiary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .intro-card-premium p { font-size: 18px; font-weight: 600; color: var(--text); line-height: 1.6; }

        .handbook-content-grid { display: flex; flex-direction: column; gap: 32px; }
        .hb-section { background: var(--surface); border: 2px solid var(--border); border-radius: 32px; box-shadow: 0 12px 0 var(--border); overflow: hidden; }
        .section-toggle { width: 100%; padding: 24px 32px; display: flex; justify-content: space-between; align-items: center; background: var(--background); border: none; cursor: pointer; border-bottom: 2px solid var(--border); }
        .section-toggle h3 { font-size: 24px; font-weight: 800; color: var(--text); }
        .section-body { padding: 32px; }

        .letters-grid-fill {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 20px;
        }

        .letter-card {
          background: var(--surface);
          border: 2px solid var(--border);
          border-radius: 24px;
          padding: 24px 16px;
          text-align: center;
          position: relative;
          box-shadow: 0 8px 0 var(--border);
          transition: all 0.2s;
        }
        .letter-card:hover { transform: translateY(-6px); border-color: var(--tertiary); box-shadow: 0 12px 0 var(--tertiary); }
        .letter-char { font-size: 40px; font-weight: 900; color: var(--text); margin-bottom: 4px; }
        .letter-roman { font-size: 16px; font-weight: 800; color: var(--tertiary); text-transform: uppercase; }
        .letter-sound { font-size: 12px; color: var(--text-muted); font-weight: 700; margin-top: 4px; }

        .words-list-aligned {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
        }
        .word-card {
          background: var(--background);
          padding: 20px 28px;
          border-radius: 24px;
          border: 2px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .word-card:hover { transform: scale(1.02); border-color: var(--tertiary); }
        .word-main { display: flex; flex-direction: column; }
        .word-native { font-size: 24px; font-weight: 800; color: var(--text); }
        .word-roman { font-size: 14px; font-weight: 700; color: var(--tertiary); text-transform: uppercase; }
        .word-meaning { font-size: 16px; font-weight: 700; color: var(--text-muted); }

        .az-grid-aligned {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
          gap: 16px;
        }
        .az-card {
          background: var(--surface);
          border: 2px solid var(--border);
          padding: 20px 12px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 6px 0 var(--border);
          cursor: pointer;
        }

        .image-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); backdrop-filter: blur(12px); z-index: 5000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .image-modal { background: var(--surface); border-radius: 40px; border: 4px solid var(--border); max-width: 900px; width: 100%; max-height: 90vh; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 32px 64px rgba(0,0,0,0.4); }

        @media (max-width: 768px) {
          .handbook-container-aligned { padding: 12px 12px 140px; }
          .hb-hero-premium { 
            flex-direction: column; 
            text-align: center; 
            padding: 24px 16px; 
            gap: 16px; 
            border-radius: 20px;
            margin-bottom: 16px;
          }
          .hb-title-premium { font-size: 28px; line-height: 1.2; }
          .hb-subtitle-premium { font-size: 16px; }
          .hb-hero-meta { gap: 12px; }
          .mute-btn-round { width: 44px; height: 44px; }
          .letters-count-pill { padding: 10px 20px; font-size: 13px; }
          
          .preferences-bar-aligned { flex-direction: column; gap: 8px; margin-bottom: 16px; }
          .pref-item { padding: 12px 16px; border-radius: 12px; }
          .pref-item strong { font-size: 14px; }

          .intro-card-premium { padding: 20px; gap: 16px; border-radius: 16px; margin-bottom: 24px; }
          .intro-icon-ring { width: 44px; height: 44px; }
          .intro-card-premium p { font-size: 15px; }

          .section-toggle { padding: 16px 20px; }
          .section-toggle h3 { font-size: 18px; }
          .section-body { padding: 16px; }

          .letters-grid-fill { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .letter-card { padding: 20px 10px; border-radius: 18px; min-height: 140px; }
          .letter-char { font-size: 32px; }
          
          .words-list-aligned { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  )
}

export default AlphabetHandbook
