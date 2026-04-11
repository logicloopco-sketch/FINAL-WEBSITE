import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import useScrollReveal from '../hooks/useScrollReveal'
import useTilt3D from '../hooks/useTilt3D'

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
  useTilt3D()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Helmet>
        <title>AI Automation Services | Make.com, n8n, Zapier Experts | Logic Loops AI</title>
        <meta name="description" content="Explore Logic Loops AI services: Make.com automation, n8n workflows, Zapier integrations, AI agent development, CRM automation, cold email outreach, meeting intelligence, and finance automation." />
        <link rel="canonical" href="https://logicloopsai.com/services" />
        <meta property="og:title" content="AI Automation Services | Logic Loops AI" />
        <meta property="og:description" content="Make.com, n8n, Zapier experts. AI agents, CRM automation, cold email outreach, meeting intelligence and more. 2-week delivery guaranteed." />
        <meta property="og:url" content="https://logicloopsai.com/services" />
      </Helmet>
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
              <article key={h} className="srv-c fu tilt3d" style={{ background: 'var(--cream)', border: '1px solid var(--bdr)', borderRadius: '18px', padding: '34px 30px', transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}>
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

      {/* HOW WE DELIVER */}
      <section style={{ background: 'var(--cream)', padding: '108px 5%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position:'absolute', top:'8%', right:'-60px', width:300, height:300, border:'1px solid rgba(201,150,58,0.12)', borderRadius:'50%', animation:'ringOrbit 20s linear infinite', pointerEvents:'none', zIndex:0 }}/>
        <div style={{ position:'absolute', bottom:'6%', left:'1%', width:80, height:80, border:'1.5px solid rgba(122,28,28,0.1)', transform:'rotate(45deg)', animation:'diamondSpin 18s linear infinite', pointerEvents:'none', zIndex:0 }}/>
        <style>{`
          @keyframes ringOrbit  { 0%{transform:rotateX(68deg) rotateZ(0deg)} 100%{transform:rotateX(68deg) rotateZ(360deg)} }
          @keyframes diamondSpin{ 0%{transform:rotate(0deg) rotateY(0deg)} 50%{transform:rotate(180deg) rotateY(90deg)} 100%{transform:rotate(360deg) rotateY(0deg)} }
          .step-badge { transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1); transform-style: preserve-3d; }
          .step-badge:hover { transform: rotateY(360deg) scale(1.1) !important; }
        `}</style>
        <div className="mw">
          <div className="fu" style={{ textAlign: 'center', marginBottom: '72px' }}>
            <div className="lbl">Our Process</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.2rem,3.6vw,3.2rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.1, marginBottom: '16px' }}>
              How We Deliver Your<br/><em style={{ fontStyle: 'italic', color: 'var(--maroon)' }}>AI Automation Project</em>
            </h2>
            <p style={{ color: 'var(--mut)', fontSize: '0.97rem', lineHeight: 1.8, maxWidth: '540px', margin: '0 auto', fontWeight: 300 }}>
              No black boxes. No surprise timelines. Here's exactly what working with us looks like — from first call to live workflow.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '22px' }} className="process-resp">
            {[
              {
                step: '01',
                h: 'Discovery & Goal Setting',
                items: [
                  'A focused 30-min call to understand your pain points and current tools (CRM, Shopify, Slack, etc.).',
                  'We identify what\'s eating your team\'s time and where automation has the highest ROI.',
                  'You leave with a clear picture of what\'s possible — before any commitment.',
                ],
                delay: '0.05s',
              },
              {
                step: '02',
                h: 'Process Mapping',
                items: [
                  'We map your existing manual workflow step by step — exactly as it runs today.',
                  'We find the bottlenecks, the repetitive handoffs, and the decision points AI can handle.',
                  'You get a visual map of what will be automated and why.',
                ],
                delay: '0.15s',
              },
              {
                step: '03',
                h: 'Design & Scope',
                items: [
                  'We define each automated step (e.g., lead → qualify → CRM → follow-up) with clear logic.',
                  'We agree on success metrics upfront — time saved, error rate, response speed.',
                  'You approve the scope and timeline before a single line of automation is built.',
                ],
                delay: '0.25s',
              },
              {
                step: '04',
                h: 'Build & Test',
                items: [
                  'We build in a staging environment using Make.com, n8n, or Zapier — plus AI agents where they add real value.',
                  'Every workflow is tested with real-world data, edge cases, and error scenarios.',
                  'You review the workflow before it touches your live systems.',
                ],
                delay: '0.35s',
              },
              {
                step: '05',
                h: 'Go Live & Handover',
                items: [
                  'We connect everything to your live tools and run a final end-to-end test together.',
                  'We walk you through every trigger, step, and output so you understand exactly what\'s running.',
                  'You get a simple playbook — what the workflow does, how to monitor it, and when to flag an issue.',
                ],
                delay: '0.45s',
              },
              {
                step: '06',
                h: 'Ongoing Support & Iteration',
                items: [
                  'As your business grows, your automations can grow with it — we offer light-touch monthly support.',
                  'We check in periodically to catch issues before they become problems.',
                  'Need a new trigger, a new tool integration, or a logic change? We\'re a message away.',
                ],
                delay: '0.55s',
              },
            ].map(({ step, h, items, delay }) => (
              <article key={step} className="fu srv-c tilt3d" style={{ transitionDelay: delay, background: 'var(--white)', border: '1px solid var(--bdr)', borderRadius: '18px', padding: '34px 30px', position: 'relative', overflow: 'hidden' }}>
                <div className="step-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'linear-gradient(135deg,var(--maroon),rgba(122,28,28,0.75))', color: 'var(--cream)', padding: '5px 16px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '18px', cursor: 'default' }}>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', fontWeight: 700, lineHeight: 1 }}>{step}</span>
                  Step
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px', lineHeight: 1.25 }}>{h}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {items.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px', fontSize: '0.86rem', color: 'var(--mut)', lineHeight: 1.7, fontWeight: 300 }}>
                      <span style={{ color: 'var(--gold)', fontWeight: 700, marginTop: '1px', flexShrink: 0 }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="fu" style={{ marginTop: '60px', background: 'linear-gradient(135deg, var(--md) 0%, var(--maroon) 100%)', borderRadius: '20px', padding: '52px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '28px' }}>
            <div style={{ maxWidth: '560px' }}>
              <div style={{ fontSize: '0.67rem', fontWeight: 700, letterSpacing: '3px', color: 'var(--gl)', textTransform: 'uppercase', marginBottom: '10px' }}>Ready to Start?</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.6rem,2.4vw,2.1rem)', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.2, marginBottom: '12px' }}>
                Book a Free Automation Audit
              </h3>
              <p style={{ color: 'rgba(253,248,240,0.65)', fontSize: '0.92rem', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
                A 30-minute call where we map your biggest manual bottleneck and show you exactly what to automate first — including a rough ROI estimate. No pitch, no pressure, just clarity.
              </p>
            </div>
            <a href="/contact" style={{ background: 'linear-gradient(135deg,var(--gold),var(--gl))', color: 'var(--md)', padding: '15px 34px', borderRadius: '12px', fontWeight: 700, fontSize: '0.97rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '9px', whiteSpace: 'nowrap', boxShadow: '0 8px 30px rgba(201,150,58,0.35)', flexShrink: 0 }}>
              🚀 Book Your Free Audit
            </a>
          </div>
        </div>
        <style>{`
          @media(max-width:1100px){.process-resp{grid-template-columns:repeat(2,1fr)!important;}}
          @media(max-width:768px){.process-resp{grid-template-columns:1fr!important;}}
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
