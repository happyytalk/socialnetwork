import React, { useState } from 'react'
import { Star, Lock, Check, Gift, Trophy } from 'lucide-react'
import { curriculum } from '../data/curriculum'
import LessonModal from './LessonModal'

const QuestMap = ({ language }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeLesson, setActiveLesson] = useState(null)

  const langData = curriculum[language] || curriculum['English']
  const levels = langData.units.map((unit, index) => ({
    ...unit,
    status: index === 0 ? 'completed' : (index === 1 ? 'active' : 'locked'),
    offset: index % 2 === 0 ? 30 : -30
  }))

  const handleNodeClick = (level) => {
    if (level.status !== 'locked') {
      setActiveLesson(level)
      setIsModalOpen(true)
    }
  }

  return (
    <div className="quest-map">
      {levels.map((level, index) => (
        <div 
          key={level.id} 
          className="quest-node-wrapper"
          style={{ transform: `translateX(${level.offset}px)` }}
        >
          <button 
            className={`quest-node ${level.status}`}
            onClick={() => handleNodeClick(level)}
          >
            {level.status === 'completed' && <Check size={32} color="white" strokeWidth={4} />}
            {level.status === 'active' && <Star size={40} color="white" fill="white" className="pulse-animation" />}
            {level.status === 'locked' && <Lock size={24} color="#AFAFAF" />}
            
            <div className="node-label-bg">
              <span className="node-label">{level.title}</span>
            </div>
          </button>
          
          {index < levels.length - 1 && (
            <div className="path-line"></div>
          )}
        </div>
      ))}

      <LessonModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        lessonTitle={activeLesson?.title}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .quest-map {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 60px;
          padding: 40px 0 100px 0;
          position: relative;
        }

        .quest-node-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .quest-node {
          width: 90px;
          height: 85px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          border: none;
          cursor: pointer;
        }

        .quest-node.completed {
          background: var(--secondary);
          box-shadow: 0 8px 0 0 var(--secondary-hover);
        }

        .quest-node.active {
          background: var(--tertiary);
          box-shadow: 0 8px 0 0 #1588BC;
          width: 105px;
          height: 100px;
        }

        .quest-node.locked {
          background: #E5E5E5;
          box-shadow: 0 8px 0 0 #AFAFAF;
          cursor: not-allowed;
        }

        .node-label-bg {
          position: absolute;
          bottom: -40px;
          background: white;
          padding: 4px 16px;
          border-radius: 12px;
          border: 2px solid var(--border);
          box-shadow: 0 4px 0 0 var(--border);
          white-space: nowrap;
        }

        .node-label {
          font-weight: 900;
          font-size: 14px;
          color: var(--text);
          text-transform: uppercase;
        }

        .path-line {
          position: absolute;
          top: 80px;
          width: 8px;
          height: 60px;
          background: #E5E5E5;
          z-index: 1;
        }

        .pulse-animation {
          animation: pulse 1.5s infinite ease-in-out;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}} />
    </div>
  )
}

export default QuestMap
