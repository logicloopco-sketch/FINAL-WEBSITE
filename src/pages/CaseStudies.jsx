import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'
import useTilt3D from '../hooks/useTilt3D'

const cases = [
  {
    img: '/images/zoom3.png',
    tag: 'Meeting Intelligence · B2B SaaS Startup, Bengaluru',
    h: 'Post-Meeting Chaos → Automated Summaries in Under 5 Minutes',
    p: 'A 12-person B2B SaaS team in Bengaluru was spending 3+ hours every week manually writing meeting notes, assigning follow-ups, and emailing stakeholders. Calls slipped through the cracks. We built a Zoom → OpenAI → Gmail pipeline that auto-classifies the meeting type, transcribes the full call, generates a structured summary with action items, and emails the right stakeholders — all within 5 minutes of the meeting ending.',
    results: [['3 hrs', 'Saved weekly'], ['100%', 'Follow-ups captured'], ['<5 min', 'Delivery time']],
    tools: ['Zoom', 'OpenAI', 'Pinecone', 'Gmail', 'Make.com'],
    rev: false
  },
  {
    img: '/images/lead1.png',
    tag: 'CRM & Lead Automation · Digital Agency, Mumbai',
    h: 'From 6-Hour Lead Delays to 10-Second CRM Entry — Zero Touch',
    p: 'A Mumbai-based performance marketing agency was losing leads because their sales team manually entered every inbound enquiry into Pipedrive — often hours later, sometimes never. We built an AI-powered webhook pipeline that instantly captures every lead, runs it through OpenAI for qualification scoring and notes, creates a Pipedrive deal, and pings the right salesperson on MS Teams with a full brief — in under 10 seconds.',
    results: [['2×', 'Pipeline visibility'], ['<10s', 'Lead-to-CRM time'], ['0', 'Leads slipping through']],
    tools: ['Webhook', 'Pipedrive', 'OpenAI', 'MS Teams'],
    rev: true
  },
  {
    img: '/images/hotel1.png',
    tag: 'Property Management · Hospitality Business, Goa',
    h: '20 Hours of Manual Hotel Admin — Fully Eliminated in One Week',
    p: 'A Goa-based operator managing 6 Airbnb properties was manually handling every booking confirmation, guest payment, and invoice across three disconnected platforms. 20+ hours of admin per week, and frequent billing errors. We built a unified Make.com system that pulls every Airbnb and Gather booking, generates the correct QuickBooks invoice automatically, and sends a confirmation to the guest — no human in the loop.',
    results: [['20 hrs', 'Reclaimed weekly'], ['3', 'Platforms unified'], ['100%', 'Invoice accuracy']],
    tools: ['Airbnb', 'Gather', 'QuickBooks', 'Make.com'],
    rev: false
  }
]

export default function CaseStudies() {
  useScrollReveal()
  useTilt3D()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      {/* PAGE HERO */}
      <section style={{ background: 'linear-gradient(158deg,var(--md) 0%,var(--maroon) 100%)', padding: '160px 5% 90px', textAlign: 'center' }}>
        <div className="mw">
          <div className="lbl" style={{ color: 'var(--gl)' }}>Case Studies</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.8rem,4.8vw,4.2rem)', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.1, marginBottom: '20px' }}>
            Real Founders. Real Problems.<br/><em style={{ color: 'var(--gl)', fontStyle: 'italic' }}>Real Outcomes.</em>
          </h1>
          <p style={{ color: 'rgba(253,248,240,0.7)', fontSize: '1.07rem', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto', fontWeight: 300 }}>
            Every case study includes the exact client context, the tools we used, and the measurable result — not just "hours saved" with no story behind it.
          </p>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section style={{ background: 'var(--white)', padding: '108px 5%' }}>
        <div className="mw">
          {cases.map((c, i) => (
            <article key={i} className="fu tilt3d" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center', padding: '52px', background: 'var(--cream)', border: '1px solid var(--bdr)', borderRadius: '24px', marginBottom: '28px', direction: c.rev ? 'rtl' : 'ltr' }}>
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
