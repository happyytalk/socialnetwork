import React, { useState } from 'react'
import { X, Volume2, CheckCircle, AlertCircle } from 'lucide-react'

const LessonModal = ({ isOpen, onClose, lessonTitle }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [isChecked, setIsChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  if (!isOpen) return null

  const options = [
    { id: 'a', text: 'A - Apple', sound: 'ah' },
    { id: 'b', text: 'B - Ball', sound: 'buh' },
    { id: 'c', text: 'C - Cat', sound: 'kuh' },
  ]

  const handleCheck = () => {
    setIsChecked(true)
    setIsCorrect(selectedOption === 'a')
  }

  return (
    <div className="lesson-overlay">
      <div className="lesson-container">
        <header className="lesson-header">
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
          <div className="progress-container">
            <div className="progress-bar-inner" style={{ width: '30%' }}></div>
          </div>
        </header>

        <div className="lesson-content">
          <h2 className="question-title">{lessonTitle || 'Select the correct sound'}</h2>
          <div className="voice-instruction">
            <button className="voice-btn"><Volume2 size={32} color="white" /></button>
            <p>Tap to hear the instruction</p>
          </div>

          <div className="options-grid">
            {options.map((option) => (
              <button 
                key={option.id}
                className={`option-card ${selectedOption === option.id ? 'selected' : ''}`}
                onClick={() => !isChecked && setSelectedOption(option.id)}
              >
                <span className="option-id">{option.id.toUpperCase()}</span>
                <span className="option-text">{option.text}</span>
              </button>
            ))}
          </div>
        </div>

        <footer className={`lesson-footer ${isChecked ? (isCorrect ? 'correct' : 'incorrect') : ''}`}>
          <div className="footer-content">
            {isChecked && (
              <div className="feedback-area">
                {isCorrect ? (
                  <div className="feedback-msg">
                    <CheckCircle size={32} />
                    <div>
                      <h3>Great job!</h3>
                      <p>You're getting better every day!</p>
                    </div>
                  </div>
                ) : (
                  <div className="feedback-msg">
                    <AlertCircle size={32} />
                    <div>
                      <h3>Incorrect</h3>
                      <p>The correct answer was A - Apple.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            <button 
              className={`btn-primary check-btn ${!selectedOption ? 'disabled' : ''}`}
              onClick={isChecked ? onClose : handleCheck}
              disabled={!selectedOption}
            >
              {isChecked ? 'CONTINUE' : 'CHECK'}
            </button>
          </div>
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .lesson-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--background);
          z-index: 2000;
          display: flex;
          flex-direction: column;
        }

        .lesson-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          max-width: 600px;
          margin: 0 auto;
          width: 100%;
          color: var(--text);
        }

        .lesson-header {
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .close-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--text-muted);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
        }

        .progress-container {
          flex: 1;
          height: 12px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
        }

        .progress-bar-inner {
          height: 100%;
          background: var(--primary);
          border-radius: 20px;
          transition: width 0.3s ease;
        }

        .lesson-content {
          flex: 1;
          padding: 40px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .question-title {
          font-size: 32px;
          text-align: center;
          margin-bottom: 32px;
          color: var(--text);
        }

        .voice-instruction {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 40px;
        }

        .voice-btn {
          width: 80px;
          height: 80px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }

        .options-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          width: 100%;
        }

        .option-card {
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          background: var(--surface);
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.2s;
          font-size: 20px;
          color: var(--text);
        }

        .option-card:hover {
          background: var(--surface-hover);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .option-card.selected {
          border-color: var(--primary);
          background: rgba(59, 130, 246, 0.1);
        }

        .option-id {
          width: 40px;
          height: 40px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: var(--text-muted);
        }

        .selected .option-id {
          border-color: var(--primary);
          color: var(--primary);
        }

        .option-text {
          font-weight: 600;
        }

        .lesson-footer {
          padding: 32px 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          background: var(--surface);
        }

        .lesson-footer.correct {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border-top-color: rgba(16, 185, 129, 0.2);
        }

        .lesson-footer.incorrect {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border-top-color: rgba(239, 68, 68, 0.2);
        }

        .check-btn {
          width: 100%;
          font-size: 18px;
          padding: 20px;
          background: var(--primary);
          color: white;
        }
        .check-btn:not(.disabled):hover {
          background: var(--primary-hover);
        }

        .check-btn.disabled {
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.3);
          cursor: not-allowed;
        }

        .feedback-area {
          margin-bottom: 24px;
        }
        .feedback-msg {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .feedback-msg h3 { font-size: 24px; margin-bottom: 4px; }
        .feedback-msg p { font-size: 16px; opacity: 0.9; }
      `}} />
    </div>
  )
}

export default LessonModal
