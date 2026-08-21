import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Magnetic from './Magnetic'
import useScrollReveal from '../hooks/useScrollReveal'
import { waLink } from '../data/site'

/**
 * Reusable final CTA band. Same three actions site-wide: Book · Message · WhatsApp.
 * `dark` renders it on navy (for pages whose previous section is cream).
 */
export default function SectionCTA({
  title = <>Let's find what you can <span className="em">automate</span></>,
  sub = "Book a free 30-minute call. We'll identify the repetitive work slowing your business down and show you exactly what we can automate — no pitch, no pressure.",
  tag = 'Ready when you are',
  dark = false,
}) {
  useScrollReveal()
  const primary = dark ? 'btn-cream' : 'btn-navy'
  return (
    <section className={`section ${dark ? 'section-dark' : 'section-light'}`}>
      <div className="container cta-final">
        <div className="fu">
          <p className="tag center">{tag}</p>
          <h2 className="h2">{title}</h2>
          <p className="lede">{sub}</p>
        </div>
        <div className="cta-actions fu">
          <Magnetic>
            <Link to="/contact" className={`btn ${primary} btn-lg`}>Book a Free Discovery Call <ArrowRight className="arrow" /></Link>
          </Magnetic>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="cta-textlink">or message us on WhatsApp →</a>
        </div>
        <p className="trust-line fu">Trusted by SMEs across the UK, US, Australia, and Canada.</p>
      </div>
    </section>
  )
}
