import React, { useState } from 'react'
import { Star, Check, Lock } from 'lucide-react'
import LessonModal from './LessonModal'
import { curriculum } from '../data/curriculum'

const LearningPath = ({ language }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeLesson, setActiveLesson] = useState(null)

  const langData = curriculum[language] || curriculum['English']
  const levels = langData.units.map((unit, index) => ({
    ...unit,
    status: index === 0 ? 'completed' : (index === 1 ? 'active' : 'locked'),
    offset: index % 2 === 0 ? 0 : (index % 4 === 1 ? 40 : -40)
  }))

  const handleNodeClick = (level) => {
    if (level.status !== 'locked') {
      setActiveLesson(level)
      setIsModalOpen(true)
    }
  }

  return (
    <div className="learning-path">
      {levels.map((level, index) => (
        <div 
          key={level.id} 
          className="level-node-container"
          style={{ marginLeft: `${level.offset || 0}px` }}
          onClick={() => handleNodeClick(level)}
        >
          <div className={`level-node ${level.status}`}>
            {level.status === 'completed' && <Check size={24} color="white" strokeWidth={3} />}
            {level.status === 'active' && <Star size={32} color="white" fill="white" className="animate-bounce" />}
            {level.status === 'locked' && <Lock size={24} color="#AFAFAF" />}
            
            {level.status === 'active' && (
              <div className="active-tooltip">
                <span className="tooltip-text">START</span>
                <div className="tooltip-arrow"></div>
              </div>
            )}
          </div>
          <span className="level-label">{level.title}</span>
        </div>
      ))}

      <LessonModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        lessonTitle={activeLesson?.label}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .learning-path {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          padding: 40px 0;
        }

        .level-node-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .level-node {
          width: 70px;
          height: 65px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: pointer;
          transition: transform 0.1s;
        }

        .level-node:active {
          transform: scale(0.95);
        }

        .level-node.completed {
          background-color: var(--secondary);
          box-shadow: 0 6px 0 0 var(--secondary-hover);
        }

        .level-node.active {
          background-color: var(--secondary);
          box-shadow: 0 6px 0 0 var(--secondary-hover);
          width: 85px;
          height: 80px;
        }

        .level-node.locked {
          background-color: #E5E5E5;
          box-shadow: 0 6px 0 0 #AFAFAF;
          cursor: not-allowed;
        }

        .level-label {
          margin-top: 12px;
          font-weight: 800;
          color: var(--text);
          font-size: 14px;
          text-transform: uppercase;
        }

        .active-tooltip {
          position: absolute;
          top: -50px;
          background: var(--primary);
          color: white;
          padding: 6px 16px;
          border-radius: 8px;
          font-weight: 900;
          font-size: 14px;
          box-shadow: 0 4px 0 0 #004DCF;
        }

        .tooltip-arrow {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid var(--primary);
        }

        .unit-card {
          background: linear-gradient(135deg, var(--primary) 0%, #60A5FA 100%);
          color: white;
          padding: 32px;
          border-radius: 24px;
          margin-bottom: 40px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .unit-card h2 {
          font-size: 24px;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .unit-card p {
          opacity: 0.9;
          font-weight: 600;
          font-size: 16px;
        }
      `}} />
    </div>
  )
}

export default LearningPath
