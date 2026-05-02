import React, { useState, useEffect } from 'react'
import { Play, Search, X, Video, Sparkles, Loader2, PlayCircle } from 'lucide-react'

const API_KEY = "AIzaSyC6oMRQGHry3jiG3OLCGt_TCkOSMoksZX8";

const YouTubeExplorer = ({ language }) => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeVideo, setActiveVideo] = useState(null)

  useEffect(() => {
    fetchVideos(`learn ${language} alphabet basics`)
  }, [language])

  const fetchVideos = async (query) => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`
      )
      const data = await response.json()
      if (data.items) {
        setVideos(data.items)
      }
    } catch (error) {
      console.error("YouTube API Error:", error)
    }
    setLoading(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      fetchVideos(`${searchQuery} ${language}`)
    }
  }

  return (
    <div className="youtube-container-premium animate-fade-in">
      <header className="youtube-header-premium">
        <div className="header-badge-premium"><Video size={14} /> CURATED LEARNING PATH</div>
        <h1>Global Video Hub</h1>
        <p>Expert-picked {language} lessons from around the world.</p>
        
        <form className="video-search-premium" onSubmit={handleSearch}>
          <Search size={20} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder={`What do you want to learn in ${language}?`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-pill-btn">EXPLORE</button>
        </form>
      </header>

      {activeVideo ? (
        <div className="video-player-aligned animate-slide-up">
          <div className="player-top-bar">
            <h3>{activeVideo.snippet.title}</h3>
            <button className="close-player-premium" onClick={() => setActiveVideo(null)}>
              <X size={20} /> <span>Close</span>
            </button>
          </div>
          <div className="video-frame-box">
            <iframe 
              src={`https://www.youtube.com/embed/${activeVideo.id.videoId}?autoplay=1`}
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      ) : (
        <div className="video-content-aligned">
          {loading ? (
            <div className="video-loader-box">
              <Loader2 className="animate-spin" size={48} />
              <p>Scanning YouTube for premium {language} content...</p>
            </div>
          ) : (
            <div className="premium-video-grid">
              {videos.map(video => (
                <div key={video.id.videoId} className="premium-video-card" onClick={() => setActiveVideo(video)}>
                  <div className="video-thumb-container">
                    <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} />
                    <div className="play-circle-overlay">
                      <Play size={32} fill="white" color="white" />
                    </div>
                  </div>
                  <div className="video-details-box">
                    <span className="channel-pill">{video.snippet.channelTitle}</span>
                    <h3>{video.snippet.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .youtube-container-premium {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px 120px;
        }

        .youtube-header-premium { text-align: center; margin-bottom: 48px; }
        .header-badge-premium { display: inline-flex; align-items: center; gap: 8px; background: rgba(28, 176, 246, 0.1); color: var(--tertiary); padding: 8px 16px; border-radius: 20px; font-weight: 900; font-size: 12px; margin-bottom: 16px; letter-spacing: 1px; }
        .youtube-header-premium h1 { font-size: 48px; color: var(--text); margin-bottom: 8px; }
        .youtube-header-premium p { font-size: 18px; color: var(--text-muted); font-weight: 700; margin-bottom: 32px; }

        .video-search-premium {
          display: flex;
          align-items: center;
          background: var(--surface);
          padding: 10px 10px 10px 24px;
          border-radius: 24px;
          border: 2px solid var(--border);
          gap: 16px;
          max-width: 600px;
          margin: 0 auto;
          box-shadow: 0 8px 0 var(--border);
        }

        .video-search-premium input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: inherit;
          font-weight: 700;
          font-size: 16px;
          color: var(--text);
        }

        .search-pill-btn {
          background: var(--tertiary);
          color: white;
          padding: 12px 24px;
          border-radius: 16px;
          font-weight: 900;
          font-size: 14px;
          box-shadow: 0 4px 0 #1588BC;
        }

        .premium-video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 32px;
        }

        .premium-video-card {
          background: var(--surface);
          border-radius: 24px;
          overflow: hidden;
          border: 2px solid var(--border);
          box-shadow: 0 8px 0 var(--border);
          cursor: pointer;
          transition: all 0.2s;
        }
        .premium-video-card:hover { transform: translateY(-4px); border-color: var(--tertiary); }

        .video-thumb-container {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
          background: #000;
        }
        .video-thumb-container img { width: 100%; height: 100%; object-fit: cover; opacity: 0.9; transition: all 0.3s; }
        .premium-video-card:hover img { opacity: 0.6; transform: scale(1.05); }

        .play-circle-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: var(--tertiary);
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s;
        }
        .premium-video-card:hover .play-circle-overlay { opacity: 1; }

        .video-details-box { padding: 24px; }
        .channel-pill { display: inline-block; background: var(--background); padding: 4px 12px; border-radius: 10px; font-size: 11px; font-weight: 900; color: var(--tertiary); text-transform: uppercase; margin-bottom: 12px; }
        .video-details-box h3 { font-size: 16px; line-height: 1.4; color: var(--text); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

        .video-player-aligned {
          background: var(--surface);
          border: 2px solid var(--border);
          border-radius: 40px;
          padding: 40px;
          box-shadow: 0 16px 0 var(--border);
        }

        .player-top-bar { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; gap: 32px; }
        .player-top-bar h3 { font-size: 28px; line-height: 1.2; flex: 1; }
        
        .close-player-premium {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #FEE2E2;
          color: #DC2626;
          padding: 12px 24px;
          border-radius: 16px;
          font-weight: 800;
          border: 2px solid #FCA5A5;
          cursor: pointer;
          box-shadow: 0 4px 0 #FCA5A5;
        }

        .video-frame-box { position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 24px; overflow: hidden; background: #000; border: 2px solid var(--border); }
        .video-frame-box iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }

        .video-loader-box { text-align: center; padding: 100px 0; color: var(--tertiary); font-weight: 800; display: flex; flex-direction: column; align-items: center; gap: 24px; }

        @media (max-width: 768px) {
          .youtube-header-premium h1 { font-size: 32px; }
          .premium-video-grid { grid-template-columns: 1fr; }
          .video-player-aligned { padding: 24px; border-radius: 24px; }
          .player-top-bar h3 { font-size: 20px; }
          .video-search-premium { padding: 8px 8px 8px 16px; }
        }
      `}} />
    </div>
  )
}

export default YouTubeExplorer
