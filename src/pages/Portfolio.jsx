import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import useScrollReveal from '../hooks/useScrollReveal'
import FAQSection from '../components/FAQSection'
import AutomationShowcase from '../components/AutomationShowcase'

const portfolioFaqs = [
  {
    q: 'What exactly do I receive when an automation project is delivered?',
    a: 'You receive a fully tested, live automation on your chosen platform (Make.com, n8n, or Zapier), a walkthrough video explaining how it works, complete documentation of the logic and connected tools, and a post-delivery support window to handle any adjustments needed after go-live.'
  },
  {
    q: 'Can I request a custom automation that is not listed here?',
    a: 'Absolutely. Every automation we\'ve built can be adapted for your specific tools, data structure, and business logic. We also scope entirely custom workflows from scratch — just share your process and we\'ll design the right solution.'
  },
  {
    q: 'Are these real, production automations that Logic Loops AI built?',
    a: 'Yes. Every automation in this showcase reflects a real workflow we have built and deployed for clients. Names and identifying details may be omitted for confidentiality, but the workflows, tools, and results are genuine.'
  },
  {
    q: 'How long does it take to deploy one of these automations for my business?',
    a: 'Simple single-workflow automations go live within 3–5 business days. Multi-system or AI agent workflows typically take 1–2 weeks. We prioritise fast, clean delivery — you get a clear timeline before any work begins.'
  },
  {
    q: 'Which automation tool is right for me — Make.com, n8n, or Zapier?',
    a: 'It depends on your budget, technical comfort, and complexity. Zapier is the easiest to maintain; Make.com handles complex logic better; n8n is self-hosted and cheapest at scale. We recommend the right one for your situation on the discovery call — we have no incentive to upsell a more expensive platform.'
  },
  {
    q: 'Will I be able to manage the automation myself after delivery?',
    a: 'Yes. We build on visual no-code platforms like Make.com and n8n that are designed for non-technical users. We also provide documentation and a recorded walkthrough so you can monitor, understand, and make simple edits without needing a developer.'
  },
]

export default function Portfolio() {
  useScrollReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Helmet>
        <title>AI Automation Portfolio | Logic Loops AI — Make.com, n8n, Zapier Workflows</title>
        <meta name="description" content="Browse Logic Loops AI's automation portfolio: 100 live AI workflows across sales, finance, CRM, marketing, support, HR, and IT — built on Make.com, n8n, and Zapier." />
        <link rel="canonical" href="https://logicloopsai.com/portfolio" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AI Automation Portfolio | Logic Loops AI" />
        <meta property="og:description" content="100 live AI automation workflows across sales, finance, CRM, marketing, support, HR, and IT — built on Make.com, n8n, and Zapier. Saving 295+ hours a week for real clients." />
        <meta property="og:url" content="https://logicloopsai.com/portfolio" />
        <meta property="og:site_name" content="Logic Loops AI" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Automation Portfolio | Logic Loops AI" />
        <meta name="twitter:description" content="100 live AI automation workflows built on Make.com, n8n, and Zapier. Browse sales, finance, CRM, marketing, support, HR, and IT automations." />

        {/* Structured Data — BreadcrumbList */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://logicloopsai.com/" },
            { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://logicloopsai.com/portfolio" },
          ]
        })}</script>

        {/* Structured Data — Service */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "AI Automation Portfolio — Logic Loops AI",
          "description": "Live AI automation workflows built for real clients on Make.com, n8n, and Zapier.",
          "url": "https://logicloopsai.com/portfolio",
          "numberOfItems": 100,
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Lead Router AI — Sales CRM Automation" },
            { "@type": "ListItem", "position": 2, "name": "Contract Generator AI — E-Signature Automation" },
            { "@type": "ListItem", "position": 3, "name": "Deal-Won Orchestrator AI — Post-Sale Workflow Automation" },
            { "@type": "ListItem", "position": 4, "name": "Win-Back Campaign AI — Lost Deal Recovery Automation" },
            { "@type": "ListItem", "position": 5, "name": "Sales Dashboard AI — Automated Reporting" },
          ]
        })}</script>
      </Helmet>

      {/* ── Page Hero ── */}
      <section style={{ background: 'linear-gradient(158deg,var(--md) 0%,var(--maroon) 100%)', padding: '160px 5% 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative corner lines */}
        <div style={{ position: 'absolute', top: 100, left: '5%', width: 60, height: 60, borderTop: '1px solid rgba(201,150,58,0.3)', borderLeft: '1px solid rgba(201,150,58,0.3)' }} />
        <div style={{ position: 'absolute', bottom: 40, right: '5%', width: 60, height: 60, borderBottom: '1px solid rgba(201,150,58,0.3)', borderRight: '1px solid rgba(201,150,58,0.3)' }} />
        <div className="mw fu">
          <div className="lbl" style={{ color: 'var(--gl)' }}>Our Portfolio</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.8rem,4.8vw,4.2rem)', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.1, marginBottom: '20px' }}>
            Real Automations. <em style={{ color: 'var(--gl)', fontStyle: 'italic' }}>Real Results.</em>
          </h1>
          <p style={{ color: 'rgba(253,248,240,0.7)', fontSize: '1.07rem', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto 36px', fontWeight: 300 }}>
            100 live AI automation workflows across 10 business categories — sales, finance, CRM, marketing, support, HR, IT, and more — built on Make.com, n8n, and Zapier. Click any category to explore what's inside.
          </p>
          {/* Key stats */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
            {[['295+','hrs saved / week'],['100','live automations'],['10','business categories']].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.2rem', fontWeight: 700, color: 'var(--gl)', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(253,248,240,0.45)', marginTop: 5, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Automation Showcase (journey + category grid + detail overlays) ── */}
      <AutomationShowcase />

      {/* ── FAQ ── */}
      <FAQSection
        faqs={portfolioFaqs}
        title={<>Questions About Our <em>Automation Deliverables</em></>}
        bg="var(--cream)"
      />

      {/* ── CTA ── */}
      <section style={{ background: 'var(--md)', padding: '108px 5%', textAlign: 'center' }}>
        <div className="mw fu">
          <div className="lbl" style={{ color: 'var(--gl)' }}>Want Something Similar?</div>
          <h2 className="sh" style={{ color: 'var(--cream)', margin: '0 auto 17px' }}>
            Let's Build Your <em style={{ color: 'var(--gl)' }}>Custom Automation</em>
          </h2>
          <p className="sub" style={{ color: 'rgba(253,248,240,0.54)', margin: '0 auto 40px' }}>
            Tell us your workflow and we'll design the perfect automation — scoped, built, and live within 2 weeks.
          </p>
          <Link to="/contact" className="btn-gold">🚀 Book Free Discovery Call</Link>
        </div>
      </section>
    </>
  )
}
