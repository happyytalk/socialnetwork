import React from 'react'
import { PlayCircle, Award, Users } from 'lucide-react'

const Hero = ({ language, level }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="badge">EDUCATIONAL PLATFORM</span>
        <h1>Unlock Your Potential in {language}</h1>
        <p>
          Experience a professional, structured approach to mastering literacy and advanced communication. 
          Currently enrolled in: <strong>{level} {language} Course</strong>.
        </p>
        <div className="hero-btns">
          <button className="btn-accent">CONTINUE LESSON</button>
          <button className="btn-outline" style={{ border: '2px solid white', color: 'white' }}>
            VIEW CURRICULUM
          </button>
        </div>
        
        <div className="hero-stats">
          <div className="h-stat">
            <Users size={20} />
            <span>2.5M Learners</span>
          </div>
          <div className="h-stat">
            <Award size={20} />
            <span>Certified Modules</span>
          </div>
        </div>
      </div>

      <div className="hero-illustration">
        {/* Abstract shapes or image */}
        <div className="shape s1"></div>
        <div className="shape s2"></div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .badge {
          display: inline-block;
          padding: 4px 12px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 16px;
          letter-spacing: 1px;
        }

        .hero-btns {
          display: flex;
          gap: 16px;
          margin-bottom: 40px;
        }

        .hero-stats {
          display: flex;
          gap: 32px;
        }

        .h-stat {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          font-size: 14px;
          opacity: 0.9;
        }

        .hero-illustration {
          position: absolute;
          right: -50px;
          top: -50px;
          width: 400px;
          height: 400px;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }

        .s1 {
          width: 300px;
          height: 300px;
          background: var(--accent);
          opacity: 0.3;
          top: 0;
          right: 0;
        }

        .s2 {
          width: 200px;
          height: 200px;
          background: #60A5FA;
          opacity: 0.4;
          bottom: 0;
          left: 0;
        }

        @media (max-width: 1024px) {
          .hero-illustration { display: none; }
        }
      `}} />
    </section>
  )
}

export default Hero
