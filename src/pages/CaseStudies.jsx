import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'

const cases = [
  {
    img: '/images/zoom3.png',
    tag: 'Meeting Intelligence · SaaS Company',
    h: 'Automated 100% of Post-Meeting Work for a SaaS Team',
    p: 'A SaaS company spent 3+ hours weekly on meeting notes. We built a Zoom pipeline that classifies, transcribes, summarizes, and emails stakeholders — in under 5 minutes of meeting end.',
    results: [['3 hrs', 'Saved weekly'], ['100%', 'Automated'], ['<5 min', 'Delivery']],
    tools: ['Zoom', 'OpenAI', 'Pinecone', 'Gmail', 'Make.com'],
    rev: false
  },
  {
    img: '/images/lead1.png',
    tag: 'CRM Automation · Digital Agency',
    h: 'Zero-Touch Lead Management That Doubled Pipeline Visibility',
    p: 'Manual CRM entry was causing lost leads. We built an AI pipeline that instantly logs, qualifies, and routes every lead into Pipedrive with AI notes — response time dropped from hours to seconds.',
    results: [['2×', 'Pipeline visibility'], ['<10s', 'Lead entry'], ['0', 'Leads missed']],
    tools: ['Webhook', 'Pipedrive', 'OpenAI', 'MS Teams'],
    rev: true
  },
  {
    img: '/images/hotel1.png',
    tag: 'Property Management · Hospitality',
    h: 'Full Automation of a Multi-Property Hotel — Booking to Invoice',
    p: '20+ hours weekly of manual bookings, payments, and invoicing — fully eliminated. We built a system handling all Airbnb and Gather bookings with automatic QuickBooks invoicing.',
    results: [['20 hrs', 'Saved weekly'], ['3', 'Platforms unified'], ['100%', 'Invoice accuracy']],
    tools: ['Airbnb', 'Gather', 'QuickBooks', 'Make.com'],
    rev: false
  }
]

export default function CaseStudies() {
  useScrollReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      {/* PAGE HERO */}
      <section style={{ background: 'linear-gradient(158deg,var(--md) 0%,var(--maroon) 100%)', padding: '160px 5% 90px', textAlign: 'center' }}>
        <div className="mw">
          <div className="lbl" style={{ color: 'var(--gl)' }}>Case Studies</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.8rem,4.8vw,4.2rem)', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.1, marginBottom: '20px' }}>
            How We've Transformed <em style={{ color: 'var(--gl)', fontStyle: 'italic' }}>Real Businesses</em>
          </h1>
          <p style={{ color: 'rgba(253,248,240,0.7)', fontSize: '1.07rem', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto', fontWeight: 300 }}>
            Measurable outcomes, documented results, real client workflows.
          </p>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section style={{ background: 'var(--white)', padding: '108px 5%' }}>
        <div className="mw">
          {cases.map((c, i) => (
            <article key={i} className="fu" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center', padding: '52px', background: 'var(--cream)', border: '1px solid var(--bdr)', borderRadius: '24px', marginBottom: '28px', direction: c.rev ? 'rtl' : 'ltr' }}>
              <div style={{ borderRadius: '16px', overflow: 'hidden', height: '290px', direction: 'ltr' }}>
                <img src={c.img} alt={c.h} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ direction: 'ltr' }}>
                <div style={{ fontSize: '0.67rem', fontWeight: 700, letterSpacing: '2.5px', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '13px' }}>{c.tag}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: '14px', lineHeight: 1.25 }}>{c.h}</h3>
                <p style={{ color: 'var(--mut)', fontSize: '0.89rem', lineHeight: 1.77, fontWeight: 300, marginBottom: '22px' }}>{c.p}</p>
                <div style={{ display: 'flex', gap: '28px', marginBottom: '24px' }}>
                  {c.results.map(([n, l]) => (
                    <div key={l}>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', fontWeight: 700, color: 'var(--maroon)' }}>{n}</div>
                      <div style={{ fontSize: '0.73rem', color: 'var(--mut)', marginTop: '3px' }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {c.tools.map(t => <span key={t} style={{ background: 'rgba(122,28,28,0.07)', border: '1px solid var(--bdr)', color: 'var(--maroon)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 600 }}>{t}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
        <style>{`
          @media(max-width:1100px){article.fu[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;direction:ltr!important;}}
          @media(max-width:768px){article.fu[style*="padding: 52px"]{padding:28px!important;} .case-img-box{height:200px!important;}}
        `}</style>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--cream)', padding: '108px 5%', textAlign: 'center' }}>
        <div className="mw fu">
          <div className="lbl">Your Business Next</div>
          <h2 className="sh" style={{ margin: '0 auto 17px' }}>Ready to Become Our Next <em>Success Story?</em></h2>
          <p className="sub" style={{ margin: '0 auto 40px' }}>Book your free consultation and we'll show you exactly what results you can expect.</p>
          <Link to="/contact" className="btn-gold">🚀 Book Free Consultation</Link>
        </div>
      </section>
    </>
  )
}
