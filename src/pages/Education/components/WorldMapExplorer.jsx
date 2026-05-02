import React, { useState, useEffect } from 'react'
import ReactIndia from 'react-svgmap-india'
import { MapPin, X, Info, ExternalLink, ArrowRight, Search, Map, Sparkles, Loader2, Navigation, Globe } from 'lucide-react'
import { chatWithOpenAI } from '../services/openaiService'

const WorldMapExplorer = ({ onLanguageSelect }) => {
  const [selectedState, setSelectedState] = useState(null)
  const [aiData, setAiData] = useState({ summary: '', officialLanguage: 'Regional' })
  const [isLoading, setIsLoading] = useState(false)
  const [hoveredState, setHoveredState] = useState(null)

  const handleStateClick = async (stateName) => {
    setSelectedState(stateName)
    setIsLoading(true)
    setAiData({ summary: '', officialLanguage: 'Scanning...' })

    const prompt = `Act as a geographical expert. For the Indian state of "${stateName}", provide:
    1. Official Language(s).
    2. A brief 3-sentence cultural and historical profile.
    
    Format: Return ONLY a JSON object with keys: "officialLanguage" (string) and "summary" (string).
    Example: {"officialLanguage": "Malayalam", "summary": "Kerala is known as..."}`;

    try {
      const response = await chatWithOpenAI(prompt);
      const cleaned = response.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      setAiData(parsed);
    } catch (error) {
      setAiData({ 
        summary: "Could not fetch deep archives for this state. Please try again.", 
        officialLanguage: "Regional/Local" 
      });
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="map-explorer-container-aligned animate-fade-in">
      <header className="map-header-premium">
        <div className="map-pill-badge"><Navigation size={14} /> LIVE LINGUISTIC RADAR</div>
        <h1>India's Cultural Explorer</h1>
        <p>Interactive Map · Real AI-Generated State Profiles</p>
      </header>

      <div className="explorer-grid-aligned">
        <div className="map-visual-box alien-card-premium">
          <div className="map-canvas-stable">
            <ReactIndia
              onClick={handleStateClick}
              onHover={(state) => setHoveredState(state)}
              color="none" 
              hoverColor="#FFD700"
              strokeColor="rgba(255,255,255,0.4)"
              strokeWidth={1}
            />
            
            {hoveredState && (
              <div className="state-hover-pill">
                <Sparkles size={14} /> {hoveredState}
              </div>
            )}
          </div>
        </div>

        <div className="details-panel-aligned">
          {selectedState ? (
            <div className="state-info-card animate-slide-up">
              <button className="close-panel-btn" onClick={() => setSelectedState(null)}><X size={20} /></button>
              
              <div className="card-top-aligned">
                <span className="overline">Discover State</span>
                <h2>{selectedState}</h2>
                <div className="loc-pill-small"><MapPin size={12} /> India</div>
              </div>

              <div className="card-scroll-body no-scrollbar">
                <div className="data-section-premium">
                  <div className="section-label"><Sparkles size={14} /> AI Cultural Profile</div>
                  {isLoading ? (
                    <div className="ai-loader-box">
                      <Loader2 className="animate-spin" size={28} />
                      <p>Consulting AI Geographers...</p>
                    </div>
                  ) : (
                    <div className="summary-box-premium">
                      {aiData.summary}
                    </div>
                  )}
                </div>

                <div className="data-section-premium">
                   <div className="section-label"><Info size={14} /> Linguistic Identity</div>
                   <div className="official-lang-pill">
                      <div className="lang-icon-circle"><Globe size={24} /></div>
                      <div className="lang-text-group">
                         <span className="label">Official Tongue</span>
                         <strong>{aiData.officialLanguage}</strong>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="map-empty-state-box alien-card-premium">
               <div className="map-pulse-icon"><Map size={48} /></div>
               <h3>Select a State</h3>
               <p>Tap any colorful region to reveal its true linguistic heart and history powered by real AI data.</p>
               <div className="stats-grid-map">
                  <div className="s-item"><strong>28</strong><span>States</span></div>
                  <div className="s-item"><strong>22</strong><span>Langs</span></div>
               </div>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .map-explorer-container-aligned {
          max-width: 1240px;
          margin: 0 auto;
          padding: 40px 24px 120px;
        }

        .map-header-premium { text-align: center; margin-bottom: 56px; }
        .map-pill-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(28, 176, 246, 0.1); color: var(--tertiary); padding: 10px 20px; border-radius: 30px; font-weight: 900; font-size: 12px; margin-bottom: 20px; letter-spacing: 1px; }
        .map-header-premium h1 { font-size: 56px; color: var(--text); margin-bottom: 12px; font-weight: 800; }
        .map-header-premium p { font-size: 20px; color: var(--text-muted); font-weight: 700; }

        .explorer-grid-aligned {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 48px;
          align-items: start;
        }

        .map-visual-box {
          background: #0F172A;
          border-radius: 48px;
          padding: 48px;
          min-height: 680px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 20px 0 #020617;
          border: 4px solid #1E293B;
        }

        .map-canvas-stable { width: 100%; position: relative; z-index: 5; }
        .map-canvas-stable svg { width: 100%; height: auto; max-height: 600px; filter: drop-shadow(0 0 20px rgba(0,0,0,0.5)); }

        .map-canvas-stable path { transition: all 0.4s ease; cursor: pointer; fill-opacity: 0.8; }
        
        .map-canvas-stable path:nth-child(5n+1) { fill: #1CB0F6 !important; }
        .map-canvas-stable path:nth-child(5n+2) { fill: #58CC02 !important; }
        .map-canvas-stable path:nth-child(5n+3) { fill: #FF9600 !important; }
        .map-canvas-stable path:nth-child(5n+4) { fill: #7C3AED !important; }
        .map-canvas-stable path:nth-child(5n+5) { fill: #EF4444 !important; }

        .map-canvas-stable path:hover { 
          fill: #FFD700 !important; 
          filter: drop-shadow(0 0 20px #FFD700); 
          fill-opacity: 1;
        }

        .state-hover-pill {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--tertiary);
          color: white;
          padding: 14px 28px;
          border-radius: 24px;
          font-weight: 900;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 12px 32px rgba(28, 176, 246, 0.5);
          z-index: 100;
          font-size: 18px;
        }

        .details-panel-aligned { height: 680px; position: sticky; top: 100px; }

        .state-info-card {
          background: var(--surface);
          border-radius: 48px;
          height: 100%;
          border: 2px solid var(--border);
          box-shadow: 0 16px 0 var(--border);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
        }

        .close-panel-btn { position: absolute; top: 32px; right: 32px; background: var(--background); border: none; width: 48px; height: 48px; border-radius: 16px; color: var(--text-muted); display: flex; align-items: center; justify-content: center; z-index: 20; cursor: pointer; }

        .card-top-aligned { padding: 48px 40px 24px; border-bottom: 2px solid var(--border); }
        .overline { font-size: 13px; font-weight: 900; color: var(--tertiary); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; display: block; }
        .card-top-aligned h2 { font-size: 42px; font-weight: 800; margin-bottom: 12px; }
        .loc-pill-small { display: inline-flex; align-items: center; gap: 8px; background: var(--background); padding: 8px 16px; border-radius: 14px; font-size: 14px; font-weight: 800; color: var(--text-muted); }

        .card-scroll-body { flex: 1; overflow-y: auto; padding: 40px; display: flex; flex-direction: column; gap: 40px; }
        .section-label { font-size: 14px; font-weight: 900; color: var(--text-muted); text-transform: uppercase; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }

        .summary-box-premium { background: var(--background); padding: 32px; border-radius: 24px; border: 2px dashed var(--border); font-weight: 600; line-height: 1.7; color: var(--text); font-size: 17px; }

        .official-lang-pill { background: var(--surface); border: 2px solid var(--border); padding: 24px; border-radius: 24px; display: flex; align-items: center; gap: 20px; box-shadow: 0 8px 0 var(--border); }
        .lang-icon-circle { width: 56px; height: 56px; background: var(--tertiary); color: white; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
        .lang-text-group { display: flex; flex-direction: column; }
        .lang-text-group .label { font-size: 12px; color: var(--text-muted); font-weight: 900; text-transform: uppercase; margin-bottom: 4px; }
        .lang-text-group strong { font-size: 24px; color: var(--text); font-weight: 800; }

        .map-empty-state-box {
          height: 100%;
          background: var(--surface);
          border-radius: 48px;
          padding: 60px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--border);
          box-shadow: 0 20px 0 var(--border);
        }

        .map-pulse-icon { width: 120px; height: 120px; background: rgba(28, 176, 246, 0.1); color: var(--tertiary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 40px; animation: pulse-map-xl 2s infinite; }
        .map-empty-state-box h3 { font-size: 32px; margin-bottom: 16px; }
        .map-empty-state-box p { font-size: 18px; color: var(--text-muted); font-weight: 700; line-height: 1.6; margin-bottom: 48px; }

        .stats-grid-map { display: flex; gap: 40px; border-top: 2px solid var(--border); padding-top: 40px; width: 100%; }
        .s-item { flex: 1; text-align: center; }
        .s-item strong { font-size: 32px; color: var(--tertiary); display: block; margin-bottom: 4px; }
        .s-item span { font-size: 13px; font-weight: 900; color: var(--text-muted); text-transform: uppercase; }

        @media (max-width: 1200px) {
          .explorer-grid-aligned { grid-template-columns: 1fr; }
          .details-panel-aligned { height: auto; position: relative; top: 0; }
          .map-visual-box { min-height: 500px; padding: 24px; }
        }
      `}} />
    </div>
  )
}

export default WorldMapExplorer
