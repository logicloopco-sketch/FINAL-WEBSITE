import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="fb">
            <Link to="/" className="logo">
              <img src="/images/logo.png" alt="Logic Loops AI" style={{ height: '46px', borderRadius: '8px' }} />
              <div className="logo-txt">
                <span className="logo-name">Logic Loops AI</span>
                <span className="logo-tag">Where Logic Meets Limitless AI</span>
              </div>
            </Link>
            <p>We build intelligent automation workflows that eliminate manual work and scale your business using Make.com, n8n, Zapier, and AI agents.</p>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', marginTop: '22px', background: 'linear-gradient(135deg,var(--gold),var(--gl))', color: 'var(--md)', padding: '11px 24px', borderRadius: '9px', fontWeight: '700', fontSize: '0.85rem', textDecoration: 'none' }}>
              Book Free Call →
            </Link>
          </div>
          <div className="fc">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services">Workflow Automation</Link></li>
              <li><Link to="/services">AI Agent Development</Link></li>
              <li><Link to="/services">CRM Automation</Link></li>
              <li><Link to="/services">Meeting Intelligence</Link></li>
              <li><Link to="/services">Cold Email Outreach</Link></li>
              <li><Link to="/services">Finance Automation</Link></li>
            </ul>
          </div>
          <div className="fc">
            <h4>Company</h4>
            <ul>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/case-studies">Case Studies</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="https://www.logicloopsai.com" target="_blank" rel="noreferrer">logicloopsai.com</a></li>
            </ul>
          </div>
          <div className="fc">
            <h4>Top Platforms</h4>
            <ul>
              <li><a href="#platforms">Make.com</a></li>
              <li><a href="#platforms">n8n</a></li>
              <li><a href="#platforms">Zapier</a></li>
              <li><a href="#platforms">GoHighLevel</a></li>
              <li><a href="#platforms">Pipedrive</a></li>
              <li><a href="#platforms">OpenAI</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bot">
          <span>© 2025 Logic Loops AI. All rights reserved.</span>
          <span>AI Automation Agency · Make.com · n8n · Zapier · Where Logic Meets Limitless AI</span>
        </div>
      </div>
    </footer>
  )
}
