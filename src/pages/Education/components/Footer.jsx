import { BookOpen, Mail, Globe, Info } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="page-container footer-content">
        <div className="footer-brand">
          <div className="logo-group">
            <BookOpen size={24} color="var(--primary)" strokeWidth={2.5} />
            <h2 style={{ fontSize: '20px' }}>HappyLearning</h2>
          </div>
          <p>Combating illiteracy through professional, accessible digital education.</p>
          <div className="social-links">
            <a href="#"><Mail size={20} /></a>
            <a href="#"><Globe size={20} /></a>
            <a href="#"><Info size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <div className="link-col">
            <h4>PLATFORM</h4>
            <a href="#">Courses</a>
            <a href="#">AI Tutor</a>
            <a href="#">Library</a>
          </div>
          <div className="link-col">
            <h4>SUPPORT</h4>
            <a href="#">Help Center</a>
            <a href="#">Accessibility</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="page-container">
          <p>© 2026 Happy Learning Initiative. All rights reserved.</p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .main-footer {
          background: white;
          border-top: 1px solid var(--border);
          padding-top: 80px;
          margin-top: 80px;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 64px;
          padding-bottom: 64px;
        }

        .footer-brand p {
          color: var(--text-muted);
          margin: 16px 0 24px 0;
          max-width: 320px;
        }

        .social-links {
          display: flex;
          gap: 16px;
        }

        .social-links a {
          color: var(--text-muted);
          transition: color 0.2s;
        }

        .social-links a:hover {
          color: var(--primary);
        }

        .footer-links {
          display: flex;
          gap: 64px;
        }

        .link-col h4 {
          font-size: 14px;
          color: var(--text);
          margin-bottom: 24px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .link-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .link-col a {
          text-decoration: none;
          color: var(--text-muted);
          font-size: 15px;
          font-weight: 500;
        }

        .link-col a:hover {
          color: var(--primary);
        }

        .footer-bottom {
          padding: 24px 0;
          border-top: 1px solid var(--border);
          text-align: center;
          color: var(--text-muted);
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .footer-content { grid-template-columns: 1fr; gap: 40px; }
          .footer-links { flex-direction: column; gap: 40px; }
        }
      `}} />
    </footer>
  )
}

export default Footer
