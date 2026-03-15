import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'

const faqs = [
  {
    q: 'What is Logic Loops AI and what do you do?',
    a: 'Logic Loops AI is a premier AI automation agency specializing in Make.com, n8n, Zapier, and custom AI agent workflows. We design and deploy intelligent automation systems that eliminate manual work, connect your business tools, and scale your operations — no traditional software development needed.'
  },
  {
    q: 'Which automation platforms do you specialize in?',
    a: 'We have deep expertise in Make.com, n8n, and Zapier. We also work with OpenAI, Anthropic, LangChain, and 500+ other platforms including Pipedrive, GoHighLevel, HubSpot, Zoom, Xero, QuickBooks, Google Workspace, Microsoft 365, and many more.'
  },
  {
    q: 'How long does it take to build an automation?',
    a: 'Most automations go live within 1–2 weeks. Simple projects can be ready in 3–5 days. Complex multi-platform AI systems typically take 3–4 weeks. We always provide a clear timeline after the discovery call.'
  },
  {
    q: 'How much do AI automation projects cost?',
    a: 'Simple automations start from $500. Mid-complexity projects range $1,500–$5,000. Enterprise systems are custom quoted. We offer a completely free 30-minute discovery call to assess your needs — no obligation.'
  },
  {
    q: 'Do you provide support after delivery?',
    a: 'Yes. Every automation includes a post-delivery support period. We also offer ongoing maintenance retainers for monitoring, updates, and improvements as your business evolves.'
  },
  {
    q: 'What industries do you work with?',
    a: 'We work across all industries — SaaS, agencies, e-commerce, hospitality, real estate, finance, and more. If your business has repetitive workflows or disconnected tools, we can automate it.'
  },
  {
    q: 'Do I need any technical knowledge to work with you?',
    a: 'Not at all. We handle all technical aspects of the automation build. You just need to describe your current workflow and the outcome you want. We take it from there.'
  },
  {
    q: 'What happens if an automation breaks?',
    a: 'Every automation we build includes error handling, retry logic, and failure alerts. If something unexpected happens, we are notified immediately and resolve it quickly. We also offer ongoing maintenance retainers.'
  },
  {
    q: 'Can you automate workflows that involve AI?',
    a: 'Absolutely. AI integration is at the core of what we do. We embed OpenAI, Anthropic, and other LLMs directly into automation workflows to handle tasks like content generation, classification, summarisation, and decision-making.'
  },
  {
    q: 'How do I get started?',
    a: 'Simply book a free 30-minute consultation call. We will discuss your workflow, identify automation opportunities, and provide a clear proposal — completely free, no strings attached.'
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  useScrollReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const toggle = (i) => setOpen(open === i ? null : i)

  return (
    <>
      {/* PAGE HERO */}
      <section style={{ background: 'linear-gradient(158deg,var(--md) 0%,var(--maroon) 100%)', padding: '160px 5% 90px', textAlign: 'center' }}>
        <div className="mw">
          <div className="lbl" style={{ color: 'var(--gl)' }}>FAQ</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.8rem,4.8vw,4.2rem)', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.1, marginBottom: '20px' }}>
            Frequently Asked <em style={{ color: 'var(--gl)', fontStyle: 'italic' }}>Questions</em>
          </h1>
          <p style={{ color: 'rgba(253,248,240,0.7)', fontSize: '1.07rem', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto', fontWeight: 300 }}>
            Everything you need to know about working with Logic Loops AI.
          </p>
        </div>
      </section>

      {/* FAQ LIST */}
      <section style={{ background: 'var(--cream)', padding: '108px 5%' }}>
        <div className="mw">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '820px', margin: '0 auto' }}>
            {faqs.map((faq, i) => (
              <div key={i} className="fu" style={{ background: 'var(--white)', border: '1px solid var(--bdr)', borderRadius: '14px', overflow: 'hidden' }}>
                <button
                  onClick={() => toggle(i)}
                  style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '22px 26px', fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}
                >
                  {faq.q}
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(122,28,28,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: 'var(--maroon)', flexShrink: 0, transition: 'transform 0.3s', transform: open === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                <div style={{ maxHeight: open === i ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                  <p style={{ padding: '0 26px 22px', color: 'var(--mut)', fontSize: '0.9rem', lineHeight: 1.78, fontWeight: 300 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--white)', padding: '108px 5%', textAlign: 'center' }}>
        <div className="mw fu">
          <div className="lbl">Still Have Questions?</div>
          <h2 className="sh" style={{ margin: '0 auto 17px' }}>Let's Talk About Your <em>Automation Needs</em></h2>
          <p className="sub" style={{ margin: '0 auto 40px' }}>Book a free 30-minute call. We'll answer every question and show you exactly what's possible.</p>
          <Link to="/contact" className="btn-gold">🚀 Book Free Consultation</Link>
        </div>
      </section>
    </>
  )
}
