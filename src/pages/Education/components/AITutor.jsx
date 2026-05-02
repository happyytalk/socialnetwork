import React, { useState, useEffect, useRef } from 'react'
import { MessageCircle, Send, X, Mic, MicOff, Volume2, VolumeX, Bot, User, Loader2, Sparkles } from 'lucide-react'
import { chatWithOpenAI } from '../services/openaiService'

const AITutor = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'model', text: "Namaste! I'm your HappyTalk AI buddy. Ready to master a new language today?" }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const scrollRef = useRef(null)

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = SpeechRecognition ? new SpeechRecognition() : null

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (text = inputText, wasVoice = false) => {
    const trimmed = text.trim();
    if (!trimmed) return

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }

    const userMessage = { role: 'user', text: trimmed }
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    const history = messages
      .filter((m, i) => i > 0)
      .map(m => ({
        role: m.role === 'model' ? 'assistant' : 'user',
        content: m.text
      }))

    try {
      const response = await chatWithOpenAI(trimmed, history)
      const modelMessage = { role: 'model', text: response }
      setMessages(prev => [...prev, modelMessage])
      if (wasVoice || isSpeaking) speak(response)
    } catch (error) {
      console.error(error)
    } finally {
      setIsTyping(false)
    }
  }

  const toggleListening = () => {
    if (!recognition) {
      alert("Speech recognition is not supported in this browser.")
      return
    }
    if (isListening) {
      recognition.stop()
    } else {
      recognition.start()
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        handleSend(transcript, true)
      }
      recognition.onend = () => setIsListening(false)
    }
    setIsListening(!isListening)
  }

  const speak = (text) => {
    if (!window.speechSynthesis) return
    const utterance = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(utterance)
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
  }

  return (
    <>
      <button 
        className={`ai-fab ${isOpen ? 'open' : ''} animate-fade-in`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with AI Buddy"
      >
        {isOpen ? <X size={28} /> : <div className="fab-content"><Bot size={28} /><Sparkles className="sparkle-icon" size={14} /></div>}
      </button>

      {isOpen && (
        <div className="ai-chat-window glass animate-slide-up">
          <header className="ai-header-premium">
            <div className="ai-brand">
              <div className="status-indicator-pill">
                <div className="status-dot pulse"></div>
                <span>AI Buddy Online</span>
              </div>
            </div>
            <div className="ai-header-actions">
               <button className="icon-action-btn" onClick={() => setIsSpeaking(!isSpeaking)}>
                 {isSpeaking ? <Volume2 size={20} /> : <VolumeX size={20} />}
               </button>
               <button className="icon-action-btn close-chat" onClick={() => setIsOpen(false)}>
                 <X size={20} />
               </button>
            </div>
          </header>

          <div className="ai-chat-body no-scrollbar" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble-new ${m.role}`}>
                <div className="bubble-icon">
                  {m.role === 'model' ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div className="bubble-content">
                  <p>{m.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-bubble-new model typing">
                <div className="bubble-icon"><Loader2 className="animate-spin" size={14} /></div>
                <div className="bubble-content"><span>Thinking...</span></div>
              </div>
            )}
          </div>

          <footer className="ai-footer-aligned">
            <div className="input-wrapper-aligned">
              <button 
                className={`voice-circle-btn ${isListening ? 'listening' : ''}`}
                onClick={toggleListening}
                title="Voice Input"
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              <input 
                type="text" 
                placeholder="Ask your AI Buddy anything..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button className="send-circle-btn" onClick={() => handleSend()}>
                <Send size={20} />
              </button>
            </div>
          </footer>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .ai-fab {
          position: fixed;
          bottom: 100px;
          right: 30px;
          width: 68px;
          height: 68px;
          border-radius: 24px;
          background: var(--tertiary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 12px 24px rgba(28, 176, 246, 0.3);
          z-index: 4000;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .ai-fab:hover { transform: translateY(-4px) scale(1.05); }
        .ai-fab.open { background: #FF4B4B; box-shadow: 0 12px 24px rgba(255, 75, 75, 0.3); }

        .fab-content { position: relative; display: flex; align-items: center; justify-content: center; }
        .sparkle-icon { position: absolute; top: -8px; right: -8px; color: #FFD700; }

        .ai-chat-window {
          position: fixed;
          bottom: 110px;
          right: 30px;
          width: 400px;
          height: 650px;
          z-index: 4000;
          display: flex;
          flex-direction: column;
          background: var(--surface);
          border: 2px solid var(--border);
          border-radius: 32px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.15);
          overflow: hidden;
        }

        .ai-header-premium {
          padding: 24px;
          background: var(--surface);
          border-bottom: 2px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .status-indicator-pill {
          background: var(--background);
          padding: 6px 14px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          font-size: 12px;
          color: var(--text);
        }

        .status-dot { width: 8px; height: 8px; background: #58CC02; border-radius: 50%; }
        .pulse { animation: pulse-ai 2s infinite; }

        .ai-header-actions { display: flex; gap: 8px; }
        .icon-action-btn { background: var(--background); color: var(--text-muted); padding: 10px; border-radius: 12px; cursor: pointer; }
        .icon-action-btn:hover { color: var(--text); background: var(--border); }

        .ai-chat-body {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          background: var(--surface);
        }

        .chat-bubble-new { display: flex; gap: 12px; max-width: 90%; }
        .chat-bubble-new.user { flex-direction: row-reverse; align-self: flex-end; }
        
        .bubble-icon {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          background: var(--background);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 4px;
        }
        .user .bubble-icon { background: var(--tertiary); color: white; }

        .bubble-content {
          background: var(--background);
          padding: 14px 18px;
          border-radius: 18px;
          color: var(--text);
          font-weight: 600;
          line-height: 1.5;
          font-size: 15px;
          border: 1px solid var(--border);
        }
        .user .bubble-content { background: var(--tertiary); color: white; border: none; border-top-right-radius: 4px; }
        .model .bubble-content { border-top-left-radius: 4px; }

        .ai-footer-aligned { padding: 24px; background: var(--surface); border-top: 2px solid var(--border); }
        .input-wrapper-aligned {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--background);
          padding: 8px;
          border-radius: 20px;
          border: 2px solid var(--border);
        }

        .input-wrapper-aligned input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: inherit;
          font-weight: 700;
          color: var(--text);
          font-size: 14px;
        }

        .voice-circle-btn { width: 44px; height: 44px; background: var(--surface); border: 2px solid var(--border); border-radius: 50%; color: var(--tertiary); display: flex; align-items: center; justify-content: center; }
        .voice-circle-btn.listening { background: #FF4B4B; color: white; border-color: #FF4B4B; }
        .send-circle-btn { color: var(--tertiary); padding: 10px; }

        @keyframes pulse-ai {
          0% { box-shadow: 0 0 0 0 rgba(88, 204, 2, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(88, 204, 2, 0); }
          100% { box-shadow: 0 0 0 0 rgba(88, 204, 2, 0); }
        }

        @media (max-width: 768px) {
          .ai-fab { bottom: 100px; right: 20px; width: 60px; height: 60px; }
          .ai-chat-window {
            width: 100%;
            height: 100%;
            bottom: 0;
            right: 0;
            border-radius: 0;
            z-index: 5000;
          }
          .ai-chat-body { padding: 20px; padding-bottom: 120px; }
          .ai-footer-aligned { padding-bottom: calc(24px + env(safe-area-inset-bottom)); }
        }
      `}} />
    </>
  )
}

export default AITutor
