import React, { useState, useEffect } from 'react'
import { ArrowRightLeft, Volume2, Copy, Check, Sparkles, Loader2, Languages } from 'lucide-react'
import { chatWithGitHubAI } from '../services/githubService'

const targetLanguages = [
  'English', 'Hindi', 'Bengali', 'Marathi', 'Telugu', 'Tamil', 'Gujarati', 'Kannada', 'Odia', 'Malayalam', 'Punjabi'
]

const TranslationEngine = ({ nativeLanguage, learningLanguage }) => {
  const [inputText, setInputText] = useState('')
  const [sourceLang, setSourceLang] = useState(nativeLanguage || 'English')
  const [targetLang, setTargetLang] = useState(learningLanguage || 'Hindi')
  const [results, setResults] = useState(null)
  const [isTranslating, setIsTranslating] = useState(false)
  const [copied, setCopied] = useState(null)

  useEffect(() => {
    if (nativeLanguage) setSourceLang(nativeLanguage)
    if (learningLanguage) setTargetLang(learningLanguage)
  }, [nativeLanguage, learningLanguage])

  const handleTranslate = async (isAll = false) => {
    if (!inputText.trim()) return
    setIsTranslating(true)
    
    const prompt = isAll 
    ? `Act as a multilingual language expert. Translate the text into ALL these languages: ${targetLanguages.join(', ')}. 
       Format: JSON array of objects with {language, text, pronunciation, breakdown, vocabulary}.`
    : `Act as a language expert. Translate the text from ${sourceLang} to ${targetLang}.
       Maintain meaning and tone. Include Roman pronunciation.
       Format: JSON object {language: "${targetLang}", text: "...", pronunciation: "...", breakdown: "...", vocabulary: "..."}`;

    try {
      const response = await chatWithGitHubAI(inputText, [], prompt);
      let parsedResults;
      try {
        const jsonMatch = response.match(/\[[\s\S]*\]/) || response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const data = JSON.parse(jsonMatch[0]);
          parsedResults = Array.isArray(data) ? data : [data];
        } else {
          parsedResults = [{ language: targetLang, text: response, pronunciation: "" }];
        }
      } catch (e) {
        parsedResults = [{ language: targetLang, text: response, pronunciation: "" }];
      }
      setResults(parsedResults);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTranslating(false);
    }
  }

  const swapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    if (results && results.length === 1) setResults(null);
  }

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text)
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)
  }

  const speak = (text) => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(u)
  }

  return (
    <div className="translation-container-fixed animate-fade-in">
      <div className="translation-header-fixed">
        <div className="fixed-badge"><Languages size={14} /> AI MULTILINGUAL CORE</div>
        <h2>Smart Language Hub</h2>
        <p>Real-time AI translation between <strong>{sourceLang}</strong> and <strong>{targetLang}</strong></p>
      </div>

      <div className="translation-box-fixed alien-card">
        <div className="selectors-row-fixed">
          <div className="sel-field">
            <span>FROM:</span>
            <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
              {targetLanguages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          
          <button className="swap-btn-fixed" onClick={swapLanguages}>
            <ArrowRightLeft size={20} />
          </button>

          <div className="sel-field">
            <span>TO:</span>
            <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
              {targetLanguages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        <div className="input-area-fixed">
          <textarea 
            placeholder={`Enter text to translate from ${sourceLang}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="no-scrollbar"
          ></textarea>
          
          <div className="actions-row-fixed">
             <button 
              className={`act-btn-fixed secondary ${!inputText.trim() ? 'disabled' : ''}`}
              onClick={() => handleTranslate(true)}
              disabled={!inputText.trim() || isTranslating}
            >
              <Sparkles size={18} /> <span>TRANSLATE ALL</span>
            </button>
            <button 
              className={`act-btn-fixed primary ${!inputText.trim() ? 'disabled' : ''}`}
              onClick={() => handleTranslate(false)}
              disabled={!inputText.trim() || isTranslating}
            >
              {isTranslating ? <Loader2 className="animate-spin" size={18} /> : <ArrowRightLeft size={18} />}
              <span>GO</span>
            </button>
          </div>
        </div>

        {results && (
          <div className="results-panel-fixed no-scrollbar">
            <div className="results-grid-fixed">
              {results.map((res, i) => (
                <div key={i} className="res-card-fixed animate-slide-up">
                  <div className="res-head">
                    <span className="lang-tag-sm">{res.language}</span>
                    <div className="res-btns">
                      <button onClick={() => speak(res.text)}><Volume2 size={16} /></button>
                      <button onClick={() => handleCopy(res.text, i)}>
                        {copied === i ? <Check size={16} color="#059669" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className="res-body">
                    <div className="res-main">{res.text}</div>
                    {res.pronunciation && <div className="res-pron">({res.pronunciation})</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .translation-container-fixed {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .translation-header-fixed { text-align: center; margin-bottom: 40px; }
        .fixed-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(28, 176, 246, 0.1); color: var(--tertiary); padding: 8px 16px; border-radius: 20px; font-weight: 900; font-size: 11px; margin-bottom: 12px; }
        .translation-header-fixed h2 { font-size: 36px; color: var(--text); }
        .translation-header-fixed p { color: var(--text-muted); font-weight: 700; margin-top: 8px; }

        .translation-box-fixed { 
          width: 100%;
          max-width: 1000px;
          background: var(--surface);
          border-radius: 40px;
          border: 2px solid var(--border);
          box-shadow: 0 16px 0 var(--border);
          overflow: hidden;
        }

        .selectors-row-fixed {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 24px 40px;
          background: var(--background);
          border-bottom: 2px solid var(--border);
        }

        .sel-field { flex: 1; display: flex; flex-direction: column; gap: 4px; }
        .sel-field span { font-size: 11px; font-weight: 900; color: var(--text-muted); }
        .sel-field select {
          background: var(--surface);
          border: 2px solid var(--border);
          padding: 12px 16px;
          border-radius: 16px;
          font-weight: 800;
          color: var(--text);
          outline: none;
          box-shadow: 0 4px 0 var(--border);
        }

        .swap-btn-fixed {
          margin-top: 16px;
          background: var(--surface);
          border: 2px solid var(--border);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--tertiary);
          box-shadow: 0 4px 0 var(--border);
        }

        .input-area-fixed { padding: 40px; }
        .input-area-fixed textarea {
          width: 100%;
          min-height: 180px;
          background: var(--background);
          border: 2px solid var(--border);
          border-radius: 24px;
          padding: 24px;
          font-size: 22px;
          font-family: inherit;
          font-weight: 700;
          color: var(--text);
          outline: none;
          resize: none;
        }

        .actions-row-fixed { display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; }

        .act-btn-fixed {
          padding: 16px 32px;
          border-radius: 20px;
          font-weight: 900;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .act-btn-fixed.primary { background: var(--tertiary); color: white; box-shadow: 0 6px 0 #1588BC; }
        .act-btn-fixed.secondary { background: var(--background); color: var(--tertiary); border: 2px solid var(--border); box-shadow: 0 6px 0 var(--border); }
        .act-btn-fixed.disabled { opacity: 0.4; cursor: not-allowed; }

        .results-panel-fixed { padding: 40px; background: var(--background); border-top: 2px solid var(--border); max-height: 500px; overflow-y: auto; }
        .results-grid-fixed { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }

        .res-card-fixed { background: var(--surface); padding: 24px; border-radius: 24px; border: 2px solid var(--border); box-shadow: 0 8px 0 var(--border); }
        .res-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .lang-tag-sm { background: rgba(28, 176, 246, 0.1); color: var(--tertiary); padding: 6px 12px; border-radius: 10px; font-weight: 900; font-size: 11px; text-transform: uppercase; }
        .res-btns { display: flex; gap: 8px; }
        .res-btns button { width: 36px; height: 36px; border-radius: 50%; background: var(--background); display: flex; align-items: center; justify-content: center; color: var(--text-muted); }

        .res-main { font-size: 22px; font-weight: 800; color: var(--text); margin-bottom: 4px; }
        .res-pron { font-size: 14px; color: var(--text-muted); font-style: italic; font-weight: 600; }

        @media (max-width: 768px) {
          .selectors-row-fixed { flex-direction: column; padding: 24px; }
          .swap-btn-fixed { transform: rotate(90deg); margin: 0; }
          .input-area-fixed { padding: 24px; }
          .input-area-fixed textarea { font-size: 18px; }
          .results-grid-fixed { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  )
}

export default TranslationEngine
