import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" className="logo">
            <img src="/images/logo.png" alt="Logic Loops AI Logo" width="46" height="46" />
            <div className="logo-txt">
              <span className="logo-name">Logic Loops AI</span>
              <span className="logo-tag">Where Logic Meets Limitless AI</span>
            </div>
          </Link>
          <div className="nav-links">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/portfolio">Portfolio</NavLink>
            <NavLink to="/case-studies">Case Studies</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
            <NavLink to="/contact" className="nav-cta">Book Free Call</NavLink>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/case-studies">Case Studies</Link>
        <Link to="/about">About Us</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/contact" className="nav-cta">Book Free Call</Link>
      </div>
    </>
  )
}
