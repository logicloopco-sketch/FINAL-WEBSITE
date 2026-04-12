import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import useScrollReveal from '../hooks/useScrollReveal'
import FAQSection from '../components/FAQSection'

const portfolioFaqs = [
  {
    q: 'What exactly do I receive when an automation project is delivered?',
    a: 'You receive a fully tested, live automation on your chosen platform (Make.com, n8n, or Zapier), a walkthrough video explaining how it works, documentation of the logic and connected tools, and a post-delivery support window to handle any adjustments needed after go-live.'
  },
  {
    q: 'Can I request a custom automation based on a portfolio project I have seen?',
    a: 'Absolutely. Every portfolio project can be adapted for your specific tools, data structure, and business logic. Share the project you have seen and describe your workflow — we will scope exactly what changes are needed.'
  },
  {
    q: 'Are all the portfolio projects real, production automations?',
    a: 'Yes. Every project shown is a live automation built for a real client. Names and identifying details may be omitted for confidentiality, but the workflows, tools, and results are genuine.'
  },
  {
    q: 'How do I know which type of automation is right for my business?',
    a: 'That is exactly what our free discovery call is for. We will map your current workflow, identify the highest-impact automation opportunities, and recommend the right approach — no generic templates, only purpose-built solutions.'
  },
  {
    q: 'Will I be able to manage the automation myself after delivery?',
    a: 'Yes. We build on visual platforms like Make.com and n8n that are designed for non-technical users. We also provide documentation and a walkthrough so you can monitor the automation, understand its logic, and make simple edits if needed.'
  },
]

const projects = [
  { key: 'zoom', thumb: ['/images/zoom1.png', '/images/zoom2.png'], cat: 'Meeting Intelligence', h: 'Zoom Meeting AI Processing Pipeline', p: 'Auto-transcribes, summarizes, and stores every Zoom meeting by type — delivered to your inbox in minutes.', tools: ['Zoom', 'OpenAI', 'Pinecone', 'Gmail'] },
  { key: 'lead', thumb: ['/images/lead1.png'], cat: 'CRM Automation', h: 'AI Lead Management & CRM Automation', p: 'Leads auto-logged, AI-qualified, entered into Pipedrive with smart routing and instant team notifications.', tools: ['Pipedrive', 'OpenAI', 'MS Teams', 'Outlook'] },
  { key: 'email', thumb: ['/images/email1.png'], cat: 'Outreach Automation', h: 'AI Cold Email Outreach Pipeline', p: 'Researches companies with Perplexity, generates personalized emails with ChatGPT, runs Instantly campaigns.', tools: ['Perplexity AI', 'ChatGPT', 'Instantly'] },
  { key: 'qualify', thumb: ['/images/qualify1.png'], cat: 'Lead Qualification', h: 'AI-Powered Lead Qualification System', p: 'OpenAI qualifies every lead, routes to Pipedrive with deals, notes, and multi-channel alerts in seconds.', tools: ['OpenAI', 'Pipedrive', 'MS Teams'] },
  { key: 'hotel', thumb: ['/images/hotel1.png', '/images/hotel2.png'], cat: 'Property Management', h: 'Fully Automated Hotel Management System', p: 'Handles Airbnb bookings, payments, QuickBooks invoicing across multiple properties — 24/7 automated.', tools: ['Airbnb', 'QuickBooks', 'Gather'] },
  { key: 'ghl', thumb: ['/images/ghl1.png'], cat: 'Marketing Automation', h: 'Zoom → GoHighLevel Campaign Automation', p: 'Meeting end triggers automated GHL email & SMS campaigns, turning meetings into nurture sequences.', tools: ['Zoom', 'GoHighLevel', 'SMS'] },
  { key: 'seo', thumb: ['/images/seo1.png'], cat: 'Content Automation', h: 'AI SEO Content Automation Pipeline', p: 'Monitors RSS feeds, generates SEO keywords & descriptions with ChatGPT, updates Sheets, notifies Slack.', tools: ['RSS', 'ChatGPT', 'Sheets', 'Slack'] },
  { key: 'xero', thumb: ['/images/xero1.png'], cat: 'Finance Automation', h: 'Xero Invoice Automation via Google Sheets', p: 'Reads invoicing rules, creates Xero invoices automatically, updates Google Sheets with URLs.', tools: ['Xero', 'Google Sheets', 'Opereto'] },
  { key: 'apollo', thumb: ['/images/apollo1.png'], cat: 'Lead Generation', h: 'AI Lead Generation — Apollo + Apify → CRM', p: 'Searches Apollo by job title & location, enriches with Apify, auto-creates leads in Pipedrive CRM.', tools: ['Apollo.io', 'Apify', 'Pipedrive'] },
]

export default function Portfolio({ openModal }) {
  useScrollReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Helmet>
        <title>AI Automation Portfolio | Workflow Projects | Logic Loops AI</title>
        <meta name="description" content="Browse Logic Loops AI's automation portfolio: Zoom meeting intelligence, AI lead management, cold email outreach, hotel booking automation, Xero invoicing, and Apollo lead generation — all built with Make.com, n8n, and AI agents." />
        <link rel="canonical" href="https://logicloopsai.com/portfolio" />
        <meta property="og:title" content="AI Automation Portfolio | Logic Loops AI" />
        <meta property="og:description" content="Real automation projects: Zoom AI pipeline, CRM automation, cold email outreach, hotel management, invoice automation, and more." />
        <meta property="og:url" content="https://logicloopsai.com/portfolio" />
      </Helmet>
      {/* PAGE HERO */}
      <section style={{ background: 'linear-gradient(158deg,var(--md) 0%,var(--maroon) 100%)', padding: '160px 5% 90px', textAlign: 'center' }}>
        <div className="mw">
          <div className="lbl" style={{ color: 'var(--gl)' }}>Our Portfolio</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.8rem,4.8vw,4.2rem)', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.1, marginBottom: '20px' }}>
            Real Automations. <em style={{ color: 'var(--gl)', fontStyle: 'italic' }}>Real Results.</em>
          </h1>
          <p style={{ color: 'rgba(253,248,240,0.7)', fontSize: '1.07rem', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto', fontWeight: 300 }}>
            Every project is a live automation deployed for real clients. Click any card to explore the full workflow.
          </p>
        </div>
      </section>

      {/* PROJECTS */}
      <section style={{ background: 'var(--cream)', padding: '108px 5%' }}>
        <div className="mw">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '26px' }} className="proj-resp">
            {projects.map((proj) => (
              <article key={proj.key} className="proj-c fu" onClick={() => openModal(proj.key)}
                style={{ background: 'var(--white)', border: '1px solid var(--bdr)', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.32s', boxShadow: 'var(--sh)' }}>
                <div style={{ position: 'relative', height: '208px', overflow: 'hidden', background: 'var(--c2)' }}>
                  {proj.thumb.length === 2 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '100%' }}>
                      <img src={proj.thumb[0]} alt={proj.h} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.45s' }} />
                      <img src={proj.thumb[1]} alt={proj.h} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.45s' }} />
                    </div>
                  ) : (
                    <img src={proj.thumb[0]} alt={proj.h} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.45s' }} />
                  )}
                  <div className="proj-ov" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(80,16,16,0.82) 0%,transparent 55%)', opacity: 0, transition: 'opacity 0.3s', display: 'flex', alignItems: 'flex-end', padding: '18px' }}>
                    <div style={{ background: 'var(--gold)', color: 'var(--md)', padding: '9px 20px', borderRadius: '9px', fontWeight: 700, fontSize: '0.8rem' }}>View Details →</div>
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ fontSize: '0.66rem', fontWeight: 700, letterSpacing: '2.5px', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '8px' }}>{proj.cat}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', fontWeight: 700, marginBottom: '9px', lineHeight: 1.35 }}>{proj.h}</h3>
                  <p style={{ color: 'var(--mut)', fontSize: '0.82rem', lineHeight: 1.65, marginBottom: '14px', fontWeight: 300 }}>{proj.p}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {proj.tools.map(t => <span key={t} style={{ background: 'rgba(122,28,28,0.06)', border: '1px solid rgba(122,28,28,0.11)', color: 'var(--maroon)', padding: '2px 9px', borderRadius: '100px', fontSize: '0.67rem', fontWeight: 600 }}>{t}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          .proj-c:hover{box-shadow:var(--shl)!important;transform:translateY(-7px)!important;border-color:rgba(122,28,28,0.24)!important;}
          .proj-c:hover .proj-ov{opacity:1!important;}
          @media(max-width:1100px){.proj-resp{grid-template-columns:repeat(2,1fr)!important;}}
          @media(max-width:768px){.proj-resp{grid-template-columns:1fr!important;}}
        `}</style>
      </section>

      {/* FAQ */}
      <FAQSection faqs={portfolioFaqs} title={<>About Our <em>Project Deliverables</em></>} bg="var(--cream)" />

      {/* CTA */}
      <section style={{ background: 'var(--md)', padding: '108px 5%', textAlign: 'center' }}>
        <div className="mw fu">
          <div className="lbl" style={{ color: 'var(--gl)' }}>Want Something Similar?</div>
          <h2 className="sh" style={{ color: 'var(--cream)', margin: '0 auto 17px' }}>Let's Build Your <em style={{ color: 'var(--gl)' }}>Custom Automation</em></h2>
          <p className="sub" style={{ color: 'rgba(253,248,240,0.54)', margin: '0 auto 40px' }}>Tell us your workflow and we'll design the perfect automation solution for your business.</p>
          <Link to="/contact" className="btn-gold">🚀 Book Free Consultation</Link>
        </div>
      </section>
    </>
  )
}
