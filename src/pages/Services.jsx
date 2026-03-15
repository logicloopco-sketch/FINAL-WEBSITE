import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'

const services = [
  { ic: '⚡', h: 'Workflow Automation', p: 'End-to-end workflows on Make.com, n8n, and Zapier. Custom logic, error handling, multi-step pipelines built to scale. We design every workflow to handle edge cases, retries, and errors gracefully.', tags: ['Make.com', 'n8n', 'Zapier'] },
  { ic: '🤖', h: 'AI Agent Development', p: 'Intelligent AI agents powered by OpenAI and Anthropic that reason, decide, and act on your behalf 24/7. From simple chatbots to complex multi-step reasoning pipelines.', tags: ['OpenAI', 'LangChain', 'AI Agents', 'Anthropic'] },
  { ic: '📊', h: 'CRM & Lead Automation', p: 'Automate your entire lead pipeline. Smart CRM entry, AI follow-up sequences, deal management on autopilot. Never miss a lead or forget to follow up again.', tags: ['Pipedrive', 'GoHighLevel', 'HubSpot', 'Salesforce'] },
  { ic: '📹', h: 'Meeting Intelligence', p: 'Auto-transcribe, summarize, and store every Zoom meeting. AI insights delivered to your inbox within minutes of the meeting ending. Classify by type and route to the right stakeholders.', tags: ['Zoom', 'Whisper AI', 'Pinecone', 'OpenAI'] },
  { ic: '📧', h: 'AI Cold Email Outreach', p: 'Research prospects with Perplexity, generate personalized emails with ChatGPT, run Instantly campaigns automatically. Scale your outreach without scaling your team.', tags: ['Apollo.io', 'Instantly', 'Perplexity AI', 'ChatGPT'] },
  { ic: '💰', h: 'Finance & Invoice Automation', p: 'Auto-create invoices in Xero and QuickBooks triggered from any event. Streamline billing entirely with zero manual data entry and 100% accuracy.', tags: ['Xero', 'QuickBooks', 'Google Sheets', 'Stripe'] },
  { ic: '🏠', h: 'Property Management Automation', p: 'Fully automate bookings, payments, and invoicing across Airbnb, Gather, and other platforms. Handle multi-property portfolios without lifting a finger.', tags: ['Airbnb', 'Gather', 'QuickBooks', 'Gmail'] },
  { ic: '📈', h: 'SEO & Content Automation', p: 'Monitor RSS feeds, generate SEO-optimized keywords and descriptions with ChatGPT, and notify your team via Slack. Keep your content pipeline flowing automatically.', tags: ['RSS', 'ChatGPT', 'Google Sheets', 'Slack'] },
  { ic: '🎯', h: 'Lead Generation Pipelines', p: 'Search Apollo.io, enrich with Apify, and auto-create qualified prospects in your CRM — all on complete autopilot. Target the right people, every time.', tags: ['Apollo.io', 'Apify', 'Pipedrive', 'Make.com'] },
]

export default function Services() {
  useScrollReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      {/* PAGE HERO */}
      <section style={{ background: 'linear-gradient(158deg,var(--md) 0%,var(--maroon) 100%)', padding: '160px 5% 90px', textAlign: 'center' }}>
        <div className="mw">
          <div className="lbl" style={{ color: 'var(--gl)' }}>Our Services</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.8rem,4.8vw,4.2rem)', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.1, marginBottom: '20px' }}>
            Expert AI Automation <em style={{ color: 'var(--gl)', fontStyle: 'italic' }}>Services</em>
          </h1>
          <p style={{ color: 'rgba(253,248,240,0.7)', fontSize: '1.07rem', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto 36px', fontWeight: 300 }}>
            From simple task automation to complex multi-step AI pipelines — using Make.com, n8n, Zapier and custom AI agents.
          </p>
          <Link to="/contact" className="btn-gold">Book Free Consultation →</Link>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section style={{ background: 'var(--white)', padding: '108px 5%' }}>
        <div className="mw">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '22px' }} className="srv-resp">
            {services.map(({ ic, h, p, tags }) => (
              <article key={h} className="srv-c fu" style={{ background: 'var(--cream)', border: '1px solid var(--bdr)', borderRadius: '18px', padding: '34px 30px', transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '13px', background: 'linear-gradient(135deg,rgba(122,28,28,0.08),rgba(201,150,58,0.1))', border: '1px solid rgba(122,28,28,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '20px' }}>{ic}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.22rem', fontWeight: 700, marginBottom: '11px' }}>{h}</h3>
                <p style={{ color: 'var(--mut)', fontSize: '0.87rem', lineHeight: 1.73, fontWeight: 300 }}>{p}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '17px' }}>
                  {tags.map(t => <span key={t} style={{ background: 'rgba(122,28,28,0.06)', border: '1px solid rgba(122,28,28,0.13)', color: 'var(--maroon)', padding: '3px 10px', borderRadius: '100px', fontSize: '0.69rem', fontWeight: 600 }}>{t}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          .srv-c::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(to bottom,var(--maroon),var(--gold));transform:scaleY(0);transition:transform 0.3s;transform-origin:top;}
          .srv-c:hover::before{transform:scaleY(1);}
          .srv-c:hover{box-shadow:var(--shl);transform:translateY(-5px);}
          @media(max-width:1100px){.srv-resp{grid-template-columns:repeat(2,1fr)!important;}}
          @media(max-width:768px){.srv-resp{grid-template-columns:1fr!important;}}
        `}</style>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--md)', padding: '108px 5%', textAlign: 'center' }}>
        <div className="mw fu">
          <div className="lbl" style={{ color: 'var(--gl)' }}>Get Started</div>
          <h2 className="sh" style={{ color: 'var(--cream)', margin: '0 auto 17px' }}>Ready to Automate Your <em style={{ color: 'var(--gl)' }}>Business?</em></h2>
          <p className="sub" style={{ color: 'rgba(253,248,240,0.54)', margin: '0 auto 40px' }}>Book a free 30-minute consultation and discover what's automatable in your workflow.</p>
          <Link to="/contact" className="btn-gold">🚀 Book Free Consultation</Link>
        </div>
      </section>
    </>
  )
}
