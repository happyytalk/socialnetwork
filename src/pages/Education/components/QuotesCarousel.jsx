import React, { useState, useEffect } from 'react'

const quotes = [
  { text: "If you talk to a man in a language he understands, that goes to his head. If you talk to him in his language, that goes to his heart.", author: "Nelson Mandela" },
  { text: "Language is the road map of a culture. It tells you where its people come from and where they are going.", author: "Rita Mae Brown" },
  { text: "The limits of my language mean the limits of my world.", author: "Ludwig Wittgenstein" },
  { text: "Words are, of course, the most powerful drug used by mankind.", author: "Rudyard Kipling" },
  { text: "Communication works for those who work at it.", author: "John Powell" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { text: "Education is not the filling of a pail, but the lighting of a fire.", author: "William Butler Yeats" },
  { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B. B. King" },
  { text: "To have another language is to possess a second soul.", author: "Charlemagne" },
  { text: "Learning another language is not only learning different words for the same things, but learning another way to think about things.", author: "Flora Lewis" },
  { text: "Knowledge of languages is the doorway to wisdom.", author: "Roger Bacon" }
]

const QuotesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="quotes-carousel-wrapper">
      <div className="quotes-container">
        {quotes.map((quote, index) => (
          <div 
            key={index} 
            className={`quote-slide ${index === currentIndex ? 'active' : ''}`}
          >
            <div className="quote-mark">"</div>
            <p className="quote-text">{quote.text}</p>
            <p className="quote-author">— {quote.author}</p>
          </div>
        ))}

        <div className="quote-indicators">
          {quotes.map((_, index) => (
            <button 
              key={index} 
              className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .quotes-carousel-wrapper {
          background: #1E293B;
          padding: 60px 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-top: 4px solid var(--tertiary);
          border-bottom: 4px solid var(--tertiary);
        }

        .quotes-container {
          max-width: 800px;
          width: 100%;
          position: relative;
          min-height: 220px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .quote-slide {
          position: absolute;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
          pointer-events: none;
        }

        .quote-slide.active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
          position: relative;
        }

        .quote-mark {
          font-size: 64px;
          color: var(--tertiary);
          font-family: serif;
          line-height: 1;
          height: 40px;
          opacity: 0.8;
          margin-bottom: 10px;
        }

        .quote-text {
          font-size: 24px;
          font-weight: 700;
          color: white;
          line-height: 1.5;
          margin-bottom: 24px;
          font-style: italic;
        }

        .quote-author {
          font-size: 16px;
          color: #94A3B8;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .quote-indicators {
          display: flex;
          gap: 8px;
          margin-top: 32px;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 600px;
        }

        .indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #475569;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          padding: 0;
        }

        .indicator-dot.active {
          background: var(--tertiary);
          transform: scale(1.5);
        }

        .indicator-dot:hover {
          background: #94A3B8;
        }
      `}} />
    </div>
  )
}

export default QuotesCarousel
