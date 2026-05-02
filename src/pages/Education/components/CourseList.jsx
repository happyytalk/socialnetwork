import React, { useState } from 'react'
import { BookOpen, CheckCircle, Lock, PlayCircle, Clock } from 'lucide-react'
import { curriculum } from '../data/curriculum'
import LessonModal from './LessonModal'

const CourseList = ({ language }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeLesson, setActiveLesson] = useState(null)

  const langData = curriculum[language] || curriculum['English']
  
  const handleOpenLesson = (unit) => {
    setActiveLesson(unit)
    setIsModalOpen(true)
  }

  return (
    <div className="course-container">
      <div className="course-grid">
        {langData.units.map((unit, index) => (
          <div key={unit.id} className="edu-card module-card">
            <div className="card-image">
              <div className="module-icon">
                <BookOpen size={40} color="white" />
              </div>
              {index === 0 && <span className="status-tag completed">COMPLETED</span>}
              {index === 1 && <span className="status-tag active">NEXT UP</span>}
              {index > 1 && <span className="status-tag locked"><Lock size={12} /> LOCKED</span>}
            </div>
            
            <div className="card-body">
              <div className="card-meta">
                <span>Module {index + 1}</span>
                <span className="meta-sep">•</span>
                <span><Clock size={14} /> 20 mins</span>
              </div>
              <h3>{unit.title}</h3>
              <p>Learn the fundamental building blocks of {language}.</p>
              
              <div className="card-footer">
                <div className="progress-small">
                  <div className="progress-fill" style={{ width: index === 0 ? '100%' : (index === 1 ? '0%' : '0%') }}></div>
                </div>
                <button 
                  className={`btn-primary start-btn ${index > 1 ? 'disabled' : ''}`}
                  disabled={index > 1}
                  onClick={() => handleOpenLesson(unit)}
                >
                  {index === 0 ? 'REVIEW' : (index === 1 ? 'START' : 'LOCKED')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <LessonModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        lessonTitle={activeLesson?.title}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .module-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .card-image {
          height: 160px;
          background: #EEF2FF;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .module-icon {
          width: 80px;
          height: 80px;
          background: var(--primary);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 16px rgba(30, 58, 138, 0.2);
        }

        .status-tag {
          position: absolute;
          top: 16px;
          right: 16px;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
        }

        .status-tag.completed { background: #DCFCE7; color: #166534; }
        .status-tag.active { background: #DBEAFE; color: #1E40AF; }
        .status-tag.locked { background: #F1F5F9; color: #64748B; display: flex; align-items: center; gap: 4px; }

        .card-body {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .card-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .meta-sep { opacity: 0.5; }

        .card-body h3 {
          font-size: 20px;
          margin-bottom: 12px;
          color: var(--text);
        }

        .card-body p {
          color: var(--text-muted);
          font-size: 14px;
          margin-bottom: 24px;
          flex: 1;
        }

        .card-footer {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .progress-small {
          height: 6px;
          background: #E2E8F0;
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--primary);
        }

        .start-btn {
          width: 100%;
        }

        .start-btn.disabled {
          background: #E2E8F0;
          color: #94A3B8;
          cursor: not-allowed;
        }
      `}} />
    </div>
  )
}

export default CourseList
