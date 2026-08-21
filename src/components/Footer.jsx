import { Link } from 'react-router-dom'
import { Mail, MessageCircle, Globe } from 'lucide-react'
import { SITE, waLink } from '../data/site'

const LOGO = '/images/Copy_of_Untitled_Design__3_-removebg-preview.png'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="foot-brand">
            <Link to="/" className="logo" aria-label="Logic Loops AI home">
              <img className="logo-img" src={LOGO} alt="Logic Loops AI" width="48" height="48" />
              <span className="logo-name">Logic Loops&nbsp;AI</span>
            </Link>
            <p>We build, host, and manage AI automations for growing businesses.</p>
          </div>

          <div className="foot-col">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services">Lead Automation</Link></li>
              <li><Link to="/services">Ops Automation</Link></li>
              <li><Link to="/services">AI Agents</Link></li>
              <li><Link to="/managed-hosting">Managed Hosting</Link></li>
            </ul>
          </div>

          <div className="foot-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/case-studies">Case Studies</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="foot-col">
            <h4>Get in touch</h4>
            <ul className="foot-contact">
              <li><Mail /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><MessageCircle /> <a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp us</a></li>
              <li><Globe /> UK · US · AU · CA</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Logic Loops AI. All rights reserved.</span>
          <nav aria-label="Legal">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
