import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/services', label: 'Services' },
  { to: '/managed-hosting', label: 'Managed Hosting' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/contact', label: 'Contact' },
]

const LOGO = '/images/Copy_of_Untitled_Design__3_-removebg-preview.png'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => { setOpen(false) }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner container">
          <Link to="/" className="logo" aria-label="Logic Loops AI home">
            <img className="logo-img" src={LOGO} alt="Logic Loops AI" width="44" height="44" />
            <span className="logo-name">Logic Loops&nbsp;AI</span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to}>{l.label}</NavLink>
            ))}
          </nav>

          <Link to="/contact" className="btn btn-cream nav-cta">Book a Call</Link>

          <button
            className={`hamburger ${open ? 'active' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`nav-scrim ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`mobile-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <nav className="mobile-links">
          <NavLink to="/" end>Home</NavLink>
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to}>{l.label}</NavLink>
          ))}
        </nav>
        <Link to="/contact" className="btn btn-cream">Book a Call →</Link>
      </aside>
    </>
  )
}
