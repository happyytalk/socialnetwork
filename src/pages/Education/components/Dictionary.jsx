import React, { useState } from 'react'
import { Search, Book, Sparkles, Volume2, Globe, Loader2, Copy, Check, MessageSquare, History, Info } from 'lucide-react'
import { chatWithOpenAI } from '../services/openaiService'

const Dictionary = ({ nativeLanguage }) => {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setResult(null);

    const prompt = `Act as an advanced multilingual lexicographer. For the word/phrase "${query}", provide:
    1. Part of Speech.
    2. Primary Definition.
    3. Roman Pronunciation.
    4. Example Sentence.
    5. Cultural Context or Etymology (specifically related to India if applicable).
    6. Brief translations in: Hindi, Malayalam, Tamil, Telugu, Kannada, Bengali, Marathi, Gujarati, Punjabi, Odia.
    
    Format: Return ONLY a JSON object with keys: "pos", "definition", "pronunciation", "example", "cultural", "translations" (object with lang:text).`;

    try {
      const response = await chatWithOpenAI(prompt);
      const cleaned = response.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      setResult(parsed);
    } catch (error) {
      console.error(error);
      setResult({ error: "Could not find word in AI archives. Please try another word." });
    } finally {
      setIsSearching(false);
    }
  }

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(u);
  }

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.definition);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="dictionary-container-fixed animate-fade-in">
      <header className="dict-header-fixed">
        <div className="fixed-badge-pill"><Book size={14} /> AI LEXICON CORE</div>
        <h1>Linguistic Dictionary</h1>
        <p>Smart word exploration with AI insights.</p>
      </header>

      <form className="dict-search-fixed" onSubmit={handleSearch}>
        <Search size={20} color="var(--text-muted)" />
        <input 
          type="text" 
          placeholder="Search any word or phrase..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="dict-btn-fixed">
          {isSearching ? <Loader2 className="animate-spin" size={18} /> : 'SEARCH'}
        </button>
      </form>

      <div className="dict-results-box-fixed">
        {isSearching && (
          <div className="dict-loader-fixed">
            <div className="pulse-lexicon"><Sparkles size={32} /></div>
            <h3>Consulting AI...</h3>
          </div>
        )}

        {result && !result.error && (
          <div className="dict-card-fixed animate-slide-up">
            <div className="dict-card-top">
               <div className="word-group-fixed">
                  <span className="pos-label">{result.pos}</span>
                  <h2>{query}</h2>
                  <div className="audio-pill-fixed" onClick={() => speak(query)}>
                    <Volume2 size={16} /> <span>{result.pronunciation}</span>
                  </div>
               </div>
               <button className="copy-btn-fixed" onClick={handleCopy}>
                 {copied ? <Check size={18} color="#059669" /> : <Copy size={18} />}
               </button>
            </div>

            <div className="dict-grid-fixed">
              <div className="def-col-fixed">
                <div className="fixed-label"><Info size={14} /> Definition</div>
                <p className="main-def-fixed">{result.definition}</p>
                
                <div className="fixed-label mt-24"><MessageSquare size={14} /> Example</div>
                <p className="ex-text-fixed">"{result.example}"</p>
              </div>

              <div className="insight-col-fixed">
                <div className="fixed-label"><Sparkles size={14} /> AI Word Insights</div>
                <p className="insight-text-fixed">{result.cultural}</p>
              </div>
            </div>

            <div className="lang-section-fixed">
               <div className="fixed-label"><Globe size={14} /> Translations</div>
               <div className="trans-pills-fixed">
                  {Object.entries(result.translations).map(([lang, text]) => (
                    <div key={lang} className="t-pill-fixed" onClick={() => speak(text)}>
                      <span className="t-lang">{lang}</span>
                      <span className="t-word">{text}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {result?.error && (
          <div className="dict-error-fixed">
             <Info size={24} />
             <p>{result.error}</p>
          </div>
        )}

        {!result && !isSearching && (
          <div className="dict-empty-fixed">
             <div className="empty-ring-fixed"><History size={28} /></div>
             <h3>Ready to Explore?</h3>
             <p>Search for words to unlock global translations and cultural history.</p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .dictionary-container-fixed {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .dict-header-fixed { text-align: center; margin-bottom: 40px; }
        .fixed-badge-pill { display: inline-flex; align-items: center; gap: 8px; background: rgba(28, 176, 246, 0.1); color: var(--tertiary); padding: 8px 16px; border-radius: 20px; font-weight: 900; font-size: 11px; margin-bottom: 12px; }
        .dict-header-fixed h1 { font-size: 36px; color: var(--text); }
        .dict-header-fixed p { color: var(--text-muted); font-weight: 700; margin-top: 4px; }

        .dict-search-fixed {
          width: 100%;
          max-width: 600px;
          background: var(--surface);
          border: 2px solid var(--border);
          border-radius: 24px;
          padding: 8px 8px 8px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 8px 0 var(--border);
          margin-bottom: 48px;
        }
        .dict-search-fixed input { flex: 1; background: transparent; border: none; outline: none; font-size: 16px; font-weight: 700; color: var(--text); font-family: inherit; }
        .dict-btn-fixed { background: var(--tertiary); color: white; padding: 12px 24px; border-radius: 16px; font-weight: 900; box-shadow: 0 4px 0 #1588BC; }

        .dict-results-box-fixed { width: 100%; max-width: 1000px; }

        .dict-card-fixed {
          background: var(--surface);
          border-radius: 40px;
          border: 2px solid var(--border);
          box-shadow: 0 16px 0 var(--border);
          padding: 40px;
        }

        .dict-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
        .word-group-fixed h2 { font-size: 40px; text-transform: capitalize; margin: 4px 0; }
        .pos-label { background: rgba(28, 176, 246, 0.1); color: var(--tertiary); padding: 4px 10px; border-radius: 8px; font-weight: 900; font-size: 11px; text-transform: uppercase; }
        .audio-pill-fixed { display: flex; align-items: center; gap: 6px; color: var(--text-muted); font-weight: 800; cursor: pointer; font-size: 14px; }
        .copy-btn-fixed { background: var(--background); border: 2px solid var(--border); width: 44px; height: 44px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }

        .dict-grid-fixed { display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; margin-bottom: 40px; }
        .fixed-label { font-size: 11px; font-weight: 900; color: var(--text-muted); text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
        .mt-24 { margin-top: 24px; }

        .main-def-fixed { font-size: 18px; font-weight: 700; color: var(--text); line-height: 1.5; }
        .ex-text-fixed { font-style: italic; color: var(--text-muted); font-weight: 600; border-left: 3px solid var(--border); padding-left: 16px; margin-top: 8px; }
        
        .insight-text-fixed { background: var(--background); padding: 24px; border-radius: 20px; border: 2px dashed var(--border); font-size: 15px; line-height: 1.6; font-weight: 600; }

        .lang-section-fixed { border-top: 2px solid var(--border); padding-top: 32px; }
        .trans-pills-fixed { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
        .t-pill-fixed { background: var(--background); padding: 12px 16px; border-radius: 16px; border: 1px solid var(--border); cursor: pointer; transition: all 0.2s; text-align: center; }
        .t-pill-fixed:hover { transform: translateY(-3px); border-color: var(--tertiary); }
        .t-lang { font-size: 10px; font-weight: 900; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 2px; }
        .t-word { font-size: 16px; font-weight: 800; color: var(--tertiary); }

        .dict-loader-fixed { text-align: center; padding: 60px 0; color: var(--tertiary); }
        .dict-empty-fixed { text-align: center; padding: 60px 0; color: var(--text-muted); }
        .empty-ring-fixed { width: 64px; height: 64px; background: var(--background); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: var(--border); }

        @media (max-width: 900px) {
          .dict-grid-fixed { grid-template-columns: 1fr; }
          .dict-card-fixed { padding: 24px; }
          .word-group-fixed h2 { font-size: 32px; }
        }
      `}} />
    </div>
  )
}

export default Dictionary
