import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Magnet, Workflow, Bot, Blocks, Server, Activity,
  Check, Inbox, Sparkles, Database, Send,
} from 'lucide-react'
import SEO from '../components/SEO'
import Magnetic from '../components/Magnetic'
import SectionCTA from '../components/SectionCTA'
import HeroCanvas from '../animations/HeroCanvas'
import useScrollReveal from '../hooks/useScrollReveal'
import useCountUp from '../hooks/useCountUp'
import { TOOLS } from '../data/content'

/* Organization + WebSite + Service JSON-LD lives statically in index.html
   (crawlable without JS) — see the <head>. No per-page schema needed on Home. */

/* Split a string into animated words for the hero entrance.
   Words are inline-block and separated by real spaces so the headline wraps naturally. */
function RevealWords({ text, start = 0, step = 55, cls = '' }) {
  const words = text.split(' ')
  return words.map((w, i) => (
    <Fragment key={i}>
      <span className={`reveal-word ${cls}`} style={{ '--i': `${start + i * step}ms` }}>{w}</span>
      {i < words.length - 1 ? ' ' : ''}
    </Fragment>
  ))
}

const PIPE = [
  { icon: <Inbox />, lbl: 'Lead comes in', sub: 'Email · WhatsApp · Form' },
  { icon: <Sparkles />, lbl: 'AI qualifies it', sub: 'Scores · tags · replies' },
  { icon: <Database />, lbl: 'CRM updates', sub: 'Pipedrive · HubSpot' },
  { icon: <Send />, lbl: 'Follow-up sent', sub: 'On time, every time' },
]

export default function Home() {
  useScrollReveal()
  const [statA, valA] = useCountUp(100)
  const [statB, valB] = useCountUp(20)

  return (
    <main id="main">
      <SEO
        title="AI Automation Services | Built, Hosted & Managed — Logic Loops AI"
        description="Logic Loops AI builds AI-powered business automations, hosts them on our servers, and keeps them running 24/7. Save 20+ hours a week. Book a free call."
        path="/"
        keywords="business automation, AI automation, managed automation, managed n8n hosting, Make.com automation, workflow automation, AI agents"
      />

      {/* ─── SECTION 1 · HERO ─────────────────────────── */}
      <section className="hero">
        <HeroCanvas />
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="tag reveal-el" style={{ '--i': '80ms' }}>AI-Powered Business Automation</p>
            <h1>
              <RevealWords text="We Build &amp; Manage Automations That" start={150} />
              <RevealWords text="Run Your Business" start={470} cls="em" />
            </h1>
            <p className="hero-sub reveal-el" style={{ '--i': '640ms' }}>
              <strong className="hero-kicker">Zero maintenance required.</strong> We automate the
              repetitive work behind your sales, operations, and customer workflows — and keep
              everything running for you.
            </p>
            <div className="btn-row reveal-el" style={{ '--i': '700ms' }}>
              <Magnetic>
                <Link to="/contact" className="btn btn-cream">
                  Book a Free Call <ArrowRight className="arrow" />
                </Link>
              </Magnetic>
              <Link to="/pricing" className="btn btn-ghost">See Pricing</Link>
            </div>
          </div>

          {/* Concrete automation pipeline — the "what we do" centrepiece */}
          <div className="pipeline-wrap">
            <div className="pipeline" role="img" aria-label="Example automation: a lead comes in, AI qualifies it, the CRM updates, and a follow-up is sent — all built, hosted, and managed by Logic Loops AI.">
              {PIPE.map((s, i) => (
                <div className="pipe-stage" key={s.lbl} style={{ '--s': i }}>
                  <span className="pipe-ico">{s.icon}</span>
                  {i < PIPE.length - 1 && <span className="pipe-conn" style={{ '--s': i }} />}
                  <span className="pipe-body">
                    <span className="pipe-lbl">{s.lbl}</span>
                    <span className="pipe-sub">{s.sub}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="pipe-foot">
              <span className="pipe-tagword">Build</span>
              <span className="sep">→</span>
              <span className="pipe-tagword">Host</span>
              <span className="sep">→</span>
              <span className="pipe-tagword">Manage</span>
              <span style={{ color: 'var(--cream-faint)' }}>&nbsp;— all done for you</span>
            </div>
          </div>

          <div className="hero-stats reveal-el" style={{ '--i': '820ms' }}>
            <div>
              <span className="stat-num" ref={statA}>{valA}+</span>
              <span className="stat-label">Automations built</span>
            </div>
            <div>
              <span className="stat-num" ref={statB}>{valB}h</span>
              <span className="stat-label">Saved per week</span>
            </div>
            <div>
              <span className="stat-num">24/7</span>
              <span className="stat-label">Monitoring &amp; support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2 · WHAT WE DELIVER ──────────────── */}
      <section className="section section-light">
        <div className="container">
          <div className="sec-head center fu">
            <p className="tag center">What We Deliver</p>
            <h2 className="h2">Three ways we <span className="em">save your time</span></h2>
            <p className="lede">Every automation we build, host, and manage — done for you, running 24/7.</p>
          </div>
          <div className="grid grid-3">
            {[
              { n: '01', icon: <Magnet />, title: 'Lead Automation', body: 'Capture, qualify, and follow up with every lead automatically — across email, WhatsApp, and your CRM. Never miss an enquiry again.' },
              { n: '02', icon: <Workflow />, title: 'Operations Automation', body: 'Remove repetitive admin work and connect the tools your team already uses — spreadsheets, CRMs, invoicing, and finance apps.' },
              { n: '03', icon: <Bot />, title: 'AI Agents', body: 'Give your business AI workers that handle conversations, tasks, and follow-ups 24/7 — support, bookings, and FAQs while you sleep.' },
            ].map((c, i) => (
              <article key={c.title} className="card deliver-card fu" style={{ '--d': `${i * 90}ms` }}>
                <span className="num">{c.n}</span>
                <span className="deliver-icon">{c.icon}</span>
                <h3 className="h3">{c.title}</h3>
                <p>{c.body}</p>
              </article>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 44 }}>
            <Link to="/services" className="btn btn-navy fu">See All Services <ArrowRight className="arrow" /></Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3 · WHY US / MANAGED ─────────────── */}
      <section className="section section-dark">
        <div className="container">
          <div className="sec-head fu">
            <p className="tag">Why Logic Loops AI</p>
            <h2 className="h2">We don't just build it. <span className="em-keep">We run it for you.</span></h2>
            <p className="lede">Most companies hand you a workflow and vanish. We host your automations, monitor them 24/7, and keep improving them every month — so you never have to maintain them yourself.</p>
          </div>
          <div className="grid grid-3">
            {[
              { icon: <Blocks />, title: 'We Build', body: 'Custom automations on Make.com, n8n, and Zapier — designed around your business, not templates.' },
              { icon: <Server />, title: 'We Host', body: 'Your automations run on our managed servers. No setup, no maintenance, no downtime on your end.' },
              { icon: <Activity />, title: 'We Manage', body: 'We monitor them 24/7, fix issues when they happen, and continuously improve them as your business changes.' },
            ].map((p, i) => (
              <div key={p.title} className="pillar fu" style={{ '--d': `${i * 90}ms` }}>
                <span className="pill-ico">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
          <div className="quote-box fu">
            <div className="quote-body">
              <p>"Managed" means you don't maintain anything. We host your workflows, watch them around the clock, fix them when something breaks, and improve them as you grow.</p>
              <p className="quote-note">Standalone hosting from <b>£20/mo</b> · fully-managed workflow plans from <b>£800/mo</b>.</p>
            </div>
            <Link to="/managed-hosting" className="btn btn-cream">How Managed Works <ArrowRight className="arrow" /></Link>
          </div>

          {/* Works-with logo strip (real brand logos on white chips for navy legibility) */}
          <div className="logo-strip fu">
            <span className="logo-strip-label">Works with</span>
            <div className="logo-chips">
              {TOOLS.map((t) => (
                <span className="logo-chip" key={t.slug} title={t.name}>
                  <img src={`/logos/${t.slug}.svg`} alt={`${t.name} logo`} loading="lazy" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4 · HOW IT WORKS ─────────────────── */}
      <section className="section section-light">
        <div className="container">
          <div className="sec-head center fu">
            <p className="tag center">Our Process</p>
            <h2 className="h2">From idea to running in <span className="em">3 weeks</span></h2>
            <p className="lede">Simple, transparent, and built to move fast.</p>
          </div>
          <div className="grid grid-3">
            {[
              { n: '01', title: 'Understand', body: 'We map your current process and find where automation can save the most time.', highlight: false },
              { n: '02', title: 'Build', body: 'We build, test, and connect the automation to the tools your team already uses.', highlight: false },
              { n: '03', title: 'Run', body: 'We host, monitor, maintain, and improve it for you — so it keeps working as you grow.', highlight: true },
            ].map((s, i) => (
              <div key={s.n} className={`step fu ${s.highlight ? 'step-key' : ''}`} style={{ '--d': `${i * 90}ms` }}>
                <div className="step-num">{s.n}</div>
                <h3>{s.title}{s.highlight && <span className="step-flag">Our difference</span>}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 44 }}>
            <Link to="/contact" className="btn btn-navy fu">Book Your Discovery Call <ArrowRight className="arrow" /></Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5 · PRICING TEASER ───────────────── */}
      <section className="section section-dark">
        <div className="container">
          <div className="sec-head center fu">
            <p className="tag center">Simple Pricing</p>
            <h2 className="h2">One monthly price. <span className="em">Everything included.</span></h2>
            <p className="lede">Build, hosting, monitoring, maintenance, and ongoing optimisation — no hidden fees.</p>
          </div>
          <div className="grid grid-3">
            {[
              { plan: 'Starter', price: '£800', featured: false, items: ['1 workflow', 'Hosting included', 'Monthly optimisation', '48h email support'] },
              { plan: 'Growth', price: '£1,500', featured: true, items: ['5 workflows', 'Hosting included', 'Monthly optimisation + strategy call', '24h priority support'] },
              { plan: 'Scale', price: '£2,500', featured: false, items: ['Unlimited workflows', 'Hosting included', 'Weekly optimisation + dedicated PM', '4h priority support'] },
            ].map((p, i) => (
              <div key={p.plan} className={`price-card fu ${p.featured ? 'featured' : ''}`} style={{ '--d': `${i * 90}ms` }}>
                {p.featured && <span className="price-badge">Most popular</span>}
                <span className="price-plan">{p.plan}</span>
                <div className="price-amt">{p.price}<span> /mo</span></div>
                <ul className="price-list">
                  {p.items.map((it) => <li key={it}><Check /> {it}</li>)}
                </ul>
                <Link to="/pricing" className={`btn mt-auto ${p.featured ? 'btn-navy' : 'btn-ghost'}`}>Choose {p.plan}</Link>
              </div>
            ))}
          </div>
          <p className="text-center fu" style={{ marginTop: 34, color: 'var(--cream-muted)', fontSize: '0.92rem' }}>
            Save 10% on 6-month plans · Save 20% on annual plans
          </p>
          <div className="text-center" style={{ marginTop: 22 }}>
            <Link to="/pricing" className="btn btn-cream fu">See Full Pricing &amp; FAQ <ArrowRight className="arrow" /></Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6 · FINAL CTA ────────────────────── */}
      <SectionCTA />
    </main>
  )
}
