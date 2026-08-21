import { Check, Magnet, Workflow, Bot, Database } from 'lucide-react'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import SectionCTA from '../components/SectionCTA'
import useScrollReveal from '../hooks/useScrollReveal'
import { SERVICES, TOOLS } from '../data/content'

const HERO_CARDS = [
  { icon: <Magnet />, label: 'Lead Automation', sub: 'Capture & follow up' },
  { icon: <Workflow />, label: 'Operations', sub: 'Remove admin work' },
  { icon: <Bot />, label: 'AI Agents', sub: 'Work 24/7' },
  { icon: <Database />, label: 'CRM Integration', sub: 'Always up to date' },
]

export default function Services() {
  useScrollReveal()
  return (
    <main id="main">
      <SEO
        title="AI Automation Services | Lead, Ops, AI Agents — Logic Loops AI"
        description="Full-service business automation: lead automation, operations automation, AI agents, and CRM integration. Built on Make.com, n8n, and Zapier — hosted and managed by us."
        path="/services"
        keywords="AI automation services, lead automation, operations automation, AI agents, CRM automation, Make.com, n8n"
      />

      <PageHero
        tag="Services"
        title={<>Automations that <span className="em">run themselves</span></>}
        sub="We build the automation, connect it to the tools you already use, then host and manage it for you — so it keeps working long after it goes live."
        primary={{ to: '/contact', label: 'Book a Free Call' }}
        secondary={{ to: '/pricing', label: 'See Pricing' }}
      >
        <div className="hv-cards">
          {HERO_CARDS.map((c) => (
            <div className="hv-card" key={c.label}>
              <span className="hv-ico">{c.icon}</span>
              <span className="hv-label">{c.label}</span>
              <span className="hv-sub">{c.sub}</span>
            </div>
          ))}
        </div>
      </PageHero>

      {SERVICES.map((s, i) => {
        const dark = i % 2 === 1
        return (
          <section key={s.id} className={`section ${dark ? 'section-dark' : 'section-light'}`}>
            <div className="container service-row">
              <div className="service-copy fu">
                <p className="tag">{s.tag}</p>
                <h2 className="h2">{s.title}</h2>
                <p className="lede">{s.body}</p>
                <ul className="service-uses-list">
                  {s.uses.map((u) => <li key={u}><Check /> {u}</li>)}
                </ul>
                <div className="tool-chips">
                  {s.tools.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>
              </div>
              <figure className="wf-frame fu">
                <div className="wf-bar">
                  <span className="wf-dots"><i /><i /><i /></span>
                  <span className="wf-label">{s.tag.toLowerCase().replace(/\s+/g, '-')}.workflow</span>
                </div>
                <img src={s.img} alt={s.imgAlt} loading="lazy" />
                <figcaption>A real automation we built, host &amp; manage.</figcaption>
              </figure>
            </div>
          </section>
        )
      })}

      {/* Tools grid (cream) */}
      <section className="section section-light">
        <div className="container">
          <div className="sec-head center fu">
            <p className="tag center">Our Stack</p>
            <h2 className="h2">Tools we <span className="em">work with</span></h2>
            <p className="lede">We integrate with the platforms your business already runs on — and dozens more.</p>
          </div>
          <div className="tools-grid fu">
            {TOOLS.map((t) => (
              <div key={t.slug} className="tool-cell" title={t.name}>
                <img src={`/logos/${t.slug}.svg`} alt={`${t.name} logo`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionCTA
        dark
        title={<>Not sure what to <span className="em">automate first?</span></>}
        sub="Book a free 30-minute call. We'll map your workflows and show you the highest-ROI automation to start with."
      />
    </main>
  )
}
