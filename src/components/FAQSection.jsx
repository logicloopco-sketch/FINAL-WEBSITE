import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

/**
 * Reusable FAQ accordion section with FAQPage JSON-LD schema (AEO + SEO).
 * Props:
 *   faqs  — array of { q: string, a: string }
 *   title — section heading (default: 'Frequently Asked Questions')
 *   bg    — CSS background value (default: 'var(--cream)')
 */
export default function FAQSection({
  faqs,
  title = 'Frequently Asked Questions',
  bg = 'var(--cream)',
}) {
  const [open, setOpen] = useState(null)
  const toggle = (i) => setOpen(open === i ? null : i)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section style={{ background: bg, padding: '100px 5%' }}>
        <div className="mw">
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div className="lbl">FAQ</div>
            <h2 className="sh" style={{ margin: '0 auto' }}>{title}</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '820px', margin: '0 auto' }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{ background: 'var(--white)', border: '1px solid var(--bdr)', borderRadius: '14px', overflow: 'hidden' }}
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={open === i}
                  style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '22px 26px', fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}
                >
                  {faq.q}
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(122,28,28,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: 'var(--maroon)', flexShrink: 0, transition: 'transform 0.3s', transform: open === i ? 'rotate(45deg)' : 'none' }}>
                    +
                  </span>
                </button>
                <div style={{ maxHeight: open === i ? '420px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                  <p style={{ padding: '0 26px 22px', color: 'var(--mut)', fontSize: '0.9rem', lineHeight: 1.78, fontWeight: 300 }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
