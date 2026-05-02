import React, { useState } from 'react'
import { MapPin, X, Info, ExternalLink, ArrowRight } from 'lucide-react'
import { monuments } from '../data/monuments'

const IndiaMapExplorer = () => {
  const [selectedPlace, setSelectedPlace] = useState(null)

  return (
    <div className="map-explorer-container">
      <header className="map-header">
        <h1>India Heritage Map</h1>
        <p>Click on the markers to explore the "encyclopedia" of India's iconic landmarks.</p>
      </header>

      <div className="explorer-layout">
        <div className="map-visual game-card">
          <div className="map-canvas">
            {/* Simple India Outline SVG */}
            <svg viewBox="0 0 500 600" className="india-svg">
              <path 
                className="india-path"
                d="M171,114 L180,95 L200,85 L220,95 L235,115 L245,140 L260,155 L280,165 L300,165 L320,155 L340,160 L350,175 L360,200 L370,220 L380,230 L400,230 L420,240 L430,260 L425,280 L400,290 L380,300 L370,320 L365,350 L370,380 L380,410 L395,430 L410,450 L420,480 L410,500 L380,510 L350,505 L320,490 L290,470 L265,440 L250,420 L240,400 L235,380 L230,360 L220,340 L200,330 L180,335 L160,350 L145,370 L135,400 L130,430 L135,460 L145,490 L160,520 L180,550 L195,575 L180,590 L160,580 L140,560 L120,530 L105,500 L95,470 L90,440 L95,410 L105,380 L120,355 L135,335 L150,320 L160,300 L165,280 L160,260 L145,240 L130,225 L115,215 L100,205 L85,200 L70,200 L55,205 L40,215 L30,230 L25,250 L20,275 L15,300 L15,325 L20,350 L30,375 L45,400 L60,420 L75,440 L85,465 L90,490 L85,515 L70,540 L50,560 L30,575 L15,585 L5,575 L0,555 L5,530 L15,505 L30,480 L45,460 L55,440 L60,415 L55,390 L45,365 L30,345 L20,320 L15,295 L20,270 L30,245 L45,225 L65,210 L85,200 L105,195 L125,190 L145,180 L160,165 L170,145 L171,125 Z" 
                fill="#E2E8F0" 
                stroke="#94A3B8" 
                strokeWidth="2"
              />
              
              {/* Place Markers */}
              {monuments.map(place => (
                <g 
                  key={place.id} 
                  className={`marker-group ${selectedPlace?.id === place.id ? 'selected' : ''}`}
                  onClick={() => setSelectedPlace(place)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle 
                    cx={(place.coordinates.x / 100) * 500} 
                    cy={(place.coordinates.y / 100) * 600} 
                    r="8" 
                    fill="var(--tertiary)"
                    className="marker-bg"
                  />
                  <MapPin 
                    size={24} 
                    x={(place.coordinates.x / 100) * 500 - 12} 
                    y={(place.coordinates.y / 100) * 600 - 24} 
                    className="marker-icon"
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="place-details-panel">
          {selectedPlace ? (
            <div className="details-content game-card animate-slide-up">
              <button className="close-panel" onClick={() => setSelectedPlace(null)}><X /></button>
              <img src={selectedPlace.image} alt={selectedPlace.name} className="place-image" />
              <div className="place-info">
                <span className="region-tag">{selectedPlace.region} India</span>
                <h2>{selectedPlace.name}</h2>
                <div className="location-bar">
                  <MapPin size={16} />
                  <span>{selectedPlace.location}</span>
                </div>
                
                <div className="info-section">
                  <h4><Info size={16} /> Significance</h4>
                  <p>{selectedPlace.significance}</p>
                </div>

                <div className="info-section">
                  <h4><BookOpen size={16} /> Details</h4>
                  <p>{selectedPlace.details}</p>
                </div>

                <div className="info-section highlighted">
                  <h4>🌟 Best Known For</h4>
                  <p>{selectedPlace.bestKnownFor}</p>
                </div>

                <button className="cta-btn primary full-width">
                  <span>Learn More</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="empty-state game-card">
              <div className="empty-icon"><Globe size={48} /></div>
              <h3>Explore the Wonders of India</h3>
              <p>Select a location on the map to view its encyclopedia entry and historical significance.</p>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .map-explorer-container {
          padding-bottom: 40px;
          animation: fadeIn 0.5s ease;
        }

        .map-header {
          margin-bottom: 40px;
          text-align: center;
        }

        .map-header h1 { font-size: 36px; margin-bottom: 8px; }
        .map-header p { color: var(--text-muted); font-weight: 700; max-width: 600px; margin: 0 auto; }

        .explorer-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }

        .map-visual {
          padding: 40px;
          background: #F8FAFC;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 600px;
        }

        .map-canvas {
          width: 100%;
          max-width: 450px;
          position: relative;
        }

        .india-svg {
          width: 100%;
          height: auto;
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.05));
        }

        .india-path {
          transition: fill 0.3s;
        }

        .marker-group {
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .marker-icon {
          color: white;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }

        .marker-bg {
          opacity: 0.2;
          animation: pulseMarker 2s infinite;
        }

        @keyframes pulseMarker {
          0% { transform: scale(1); opacity: 0.4; }
          70% { transform: scale(2.5); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }

        .marker-group:hover, .marker-group.selected {
          transform: scale(1.3);
        }

        .marker-group:hover .marker-icon, .marker-group.selected .marker-icon {
          color: #FFD700;
        }

        .place-details-panel {
          position: sticky;
          top: 100px;
        }

        .details-content {
          padding: 0;
          overflow: hidden;
          position: relative;
        }

        .close-panel {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255,255,255,0.9);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          z-index: 10;
        }

        .place-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }

        .place-info {
          padding: 32px;
        }

        .region-tag {
          background: #E0F2FE;
          color: var(--tertiary);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 12px;
          display: inline-block;
        }

        .location-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          font-weight: 700;
          margin-bottom: 24px;
        }

        .info-section {
          margin-bottom: 20px;
        }

        .info-section h4 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          margin-bottom: 8px;
          color: var(--text);
        }

        .info-section p {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-muted);
          font-weight: 600;
        }

        .info-section.highlighted {
          background: #FFFBEB;
          padding: 16px;
          border-radius: 16px;
          border: 1px dashed #F59E0B;
        }

        .empty-state {
          height: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px;
          color: var(--text-muted);
        }

        .empty-icon {
          margin-bottom: 24px;
          color: var(--border);
        }

        .full-width { width: 100%; }

        @media (max-width: 1024px) {
          .explorer-layout { grid-template-columns: 1fr; }
          .place-details-panel { position: static; }
        }
      `}} />
    </div>
  )
}

const BookOpen = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
)

const Globe = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
)

export default IndiaMapExplorer
