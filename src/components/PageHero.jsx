import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Magnetic from './Magnetic'
import HeroCanvas from '../animations/HeroCanvas'

/**
 * Navy hero for inner pages. Shares the animated canvas + entrance motion with the
 * home hero. `children` renders a page-specific visual below the copy so every page
 * *shows* what its automation does, not just describes it.
 */
export default function PageHero({ tag, title, sub, primary, secondary, children }) {
  return (
    <section className="page-hero">
      <HeroCanvas />
      <div className="container page-hero-inner">
        {tag && <p className="tag reveal-el" style={{ '--i': '60ms' }}>{tag}</p>}
        <h1 className="reveal-el" style={{ '--i': '140ms' }}>{title}</h1>
        {sub && <p className="page-hero-sub reveal-el" style={{ '--i': '260ms' }}>{sub}</p>}
        {(primary || secondary) && (
          <div className="btn-row reveal-el" style={{ '--i': '360ms' }}>
            {primary && (
              <Magnetic>
                <Link to={primary.to} className="btn btn-cream">
                  {primary.label} <ArrowRight className="arrow" />
                </Link>
              </Magnetic>
            )}
            {secondary && <Link to={secondary.to} className="btn btn-ghost">{secondary.label}</Link>}
          </div>
        )}
        {children && (
          <div className="page-hero-visual reveal-el" style={{ '--i': '480ms' }}>{children}</div>
        )}
      </div>
    </section>
  )
}
