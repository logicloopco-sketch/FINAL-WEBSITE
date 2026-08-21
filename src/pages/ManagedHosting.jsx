import { Server, Activity, RefreshCw, ShieldCheck, DatabaseBackup, Bell, Check, X, ServerCrash, EyeOff, AlertTriangle } from 'lucide-react'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import SectionCTA from '../components/SectionCTA'
import useScrollReveal from '../hooks/useScrollReveal'

const INCLUDES = [
  { icon: <Server />, title: 'Server setup & deployment', body: 'We deploy your automations on our managed infrastructure — no servers for you to touch.' },
  { icon: <Activity />, title: '24/7 monitoring', body: 'Every workflow is watched around the clock. If something looks wrong, we know before you do.' },
  { icon: <RefreshCw />, title: 'Monthly optimisation', body: 'We review and improve your automations every month as your business changes.' },
  { icon: <Bell />, title: 'Priority issue fixes', body: 'When an integration breaks or an API changes, we fix it — fast, as part of your plan.' },
  { icon: <DatabaseBackup />, title: 'Backups & versioning', body: 'Every workflow is backed up and versioned, so nothing is ever lost.' },
  { icon: <ShieldCheck />, title: 'Security & patches', body: 'We keep everything patched, secure, and up to date on your behalf.' },
]

const DIY = [
  { icon: <ServerCrash />, title: 'Servers crash at 2am', body: 'A self-hosted automation server goes down and your workflows silently stop — often for days before anyone notices.' },
  { icon: <EyeOff />, title: 'No monitoring', body: "You don't find out something broke until a customer complains or a lead goes cold." },
  { icon: <AlertTriangle />, title: 'It breaks silently', body: 'An API changes, a token expires, a workflow errors — and there is no one watching to catch it.' },
]

const STEPS = [
  { n: '01', title: 'Deploy', body: 'We set up and deploy your automation on our managed servers — configured, secured, and tested.' },
  { n: '02', title: 'Monitor', body: 'We watch it 24/7 with automated alerts, so issues are caught the moment they happen.' },
  { n: '03', title: 'Maintain', body: 'We fix, patch, back up, and optimise every month — so it keeps running as you grow.' },
]

const COMPARE = [
  ['Server setup & maintenance', false, true],
  ['24/7 monitoring & alerts', false, true],
  ['Fixes when integrations break', false, true],
  ['Monthly optimisation', false, true],
  ['Backups & version history', false, true],
  ['Security patches', false, true],
  ['Your time spent on it', 'Hours every week', 'Zero'],
]

export default function ManagedHosting() {
  useScrollReveal()
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Managed AI Automation Hosting',
    description: 'Managed hosting for n8n, Make.com, and custom AI automations with 24/7 monitoring, monthly optimisation, and priority fixes.',
    provider: { '@type': 'Organization', name: 'Logic Loops AI' },
    areaServed: ['GB', 'US', 'AU', 'CA'],
    offers: { '@type': 'Offer', price: '20', priceCurrency: 'GBP' },
  }

  return (
    <main id="main">
      <SEO
        title="Managed n8n Hosting | Automation Hosting Service — Logic Loops AI"
        description="Managed hosting for n8n, Make.com, and custom AI automations. 24/7 monitoring, monthly optimisation, no server headaches. Plans from £20/mo."
        path="/managed-hosting"
        keywords="managed n8n hosting, automation hosting, Make.com hosting, managed automation, 24/7 monitoring"
        schema={schema}
      />

      <PageHero
        tag="Managed Hosting"
        title={<>Managed AI automation <span className="em">hosting</span></>}
        sub="'Managed' means you never touch a server. We host your automations, watch them 24/7, fix what breaks, and keep improving them — so they just keep running."
        primary={{ to: '/contact', label: 'Talk to Us' }}
        secondary={{ to: '/pricing', label: 'See Pricing' }}
      >
        <div className="hv-status">
          <div className="hv-status-head">
            <span className="hv-status-title"><Server size={16} /> Your automations</span>
            <span className="flow-live"><span className="flow-dot" /> All systems live</span>
          </div>
          <div className="hv-status-rows">
            <div className="hv-status-row"><span>Uptime (30 days)</span><b>99.9%</b></div>
            <div className="hv-status-row"><span>Monitoring</span><b className="ok">Active</b></div>
            <div className="hv-status-row"><span>Last health check</span><b>2s ago</b></div>
            <div className="hv-status-row"><span>Issues fixed this month</span><b>3</b></div>
          </div>
          <div className="hv-bars" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, i) => <span key={i} style={{ '--h': `${40 + Math.round(Math.abs(Math.sin(i * 1.7)) * 55)}%`, '--i': `${i * 60}ms` }} />)}
          </div>
        </div>
      </PageHero>

      {/* Problem with DIY (cream) */}
      <section className="section section-light">
        <div className="container">
          <div className="sec-head center fu">
            <p className="tag center">The Problem With DIY</p>
            <h2 className="h2">Building an automation is easy. <span className="em">Keeping it running isn't.</span></h2>
            <p className="lede">Most automations don't fail on day one — they fail three months later, quietly, when no one is watching.</p>
          </div>
          <div className="grid grid-3">
            {DIY.map((d, i) => (
              <article key={d.title} className="card deliver-card fu" style={{ '--d': `${i * 90}ms` }}>
                <span className="deliver-icon">{d.icon}</span>
                <h3 className="h3">{d.title}</h3>
                <p>{d.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What managed hosting includes (navy) */}
      <section className="section section-dark">
        <div className="container">
          <div className="sec-head center fu">
            <p className="tag center">What's Included</p>
            <h2 className="h2">Everything it takes to <span className="em">keep it running</span></h2>
            <p className="lede">One managed service that covers the entire life of your automation.</p>
          </div>
          <div className="grid grid-3">
            {INCLUDES.map((it, i) => (
              <div key={it.title} className="pillar fu" style={{ '--d': `${i * 70}ms` }}>
                <span className="pill-ico">{it.icon}</span>
                <h3>{it.title}</h3>
                <p>{it.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How our hosting works (cream) */}
      <section className="section section-light">
        <div className="container">
          <div className="sec-head center fu">
            <p className="tag center">How It Works</p>
            <h2 className="h2">Deploy, monitor, <span className="em">maintain</span></h2>
          </div>
          <div className="grid grid-3">
            {STEPS.map((s, i) => (
              <div key={s.n} className="step fu" style={{ '--d': `${i * 90}ms` }}>
                <div className="step-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing add-on + comparison (navy) */}
      <section className="section section-dark">
        <div className="container">
          <div className="sec-head center fu">
            <p className="tag center">Hosting Pricing</p>
            <h2 className="h2">From <span className="em">£20/mo</span> per workflow</h2>
            <p className="lede">Managed hosting is included in every Starter, Growth, and Scale plan — or added standalone from £20/mo per workflow.</p>
          </div>
          <div className="compare fu">
            <div className="compare-row compare-head">
              <span>Feature</span>
              <span>DIY hosting</span>
              <span className="hl">Managed by us</span>
            </div>
            {COMPARE.map((row) => (
              <div key={row[0]} className="compare-row">
                <span>{row[0]}</span>
                <span>{typeof row[1] === 'boolean' ? (row[1] ? <Check className="c-yes" /> : <X className="c-no" />) : <em>{row[1]}</em>}</span>
                <span className="hl">{typeof row[2] === 'boolean' ? (row[2] ? <Check className="c-yes" /> : <X className="c-no" />) : <b>{row[2]}</b>}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionCTA
        title={<>Let us <span className="em">run it</span> for you</>}
        sub="Book a free call and we'll show you exactly how managed hosting keeps your automations alive 24/7."
      />
    </main>
  )
}
