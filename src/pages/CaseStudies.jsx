import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import SectionCTA from '../components/SectionCTA'
import useScrollReveal from '../hooks/useScrollReveal'
import useCountUp from '../hooks/useCountUp'
import { CASES } from '../data/content'

function HeroStat({ target, prefix = '', suffix = '', label }) {
  const [ref, val] = useCountUp(target)
  return (
    <div className="hv-stat">
      <span className="hv-stat-num" ref={ref}>{prefix}{val}{suffix}</span>
      <span className="hv-stat-label">{label}</span>
    </div>
  )
}

export default function CaseStudies() {
  useScrollReveal()
  return (
    <main id="main">
      <SEO
        title="AI Automation Case Studies | Real Results — Logic Loops AI"
        description="Real business automation case studies from SMEs. See how we saved businesses 20+ hours a week with Make.com, n8n, and AI agent workflows."
        path="/case-studies"
        keywords="AI automation case studies, automation results, business automation examples, workflow automation ROI"
      />

      <PageHero
        tag="Case Studies"
        title={<>Real automations. <span className="em">Real results.</span></>}
        sub="These are the kinds of outcomes we build, host, and manage for businesses like yours — measured in hours saved and errors removed."
        primary={{ to: '/contact', label: 'Get Results Like These' }}
      >
        <div className="hv-stats">
          <HeroStat target={20} suffix="+ hrs" label="Saved per week" />
          <HeroStat target={94} suffix="%" label="Fewer errors" />
          <HeroStat target={3} suffix="×" label="More qualified leads" />
        </div>
      </PageHero>

      {/* Case cards (cream) */}
      <section className="section section-light">
        <div className="container">
          <div className="grid grid-3">
            {CASES.map((c, i) => (
              <article key={c.title} className="card case-card fu" style={{ '--d': `${i * 90}ms` }}>
                <div className="case-thumb">
                  <img src={c.img} alt={`Real ${c.industry.toLowerCase()} automation built by Logic Loops AI`} loading="lazy" />
                </div>
                <span className="case-industry">{c.industry}</span>
                <h3 className="h3">{c.title}</h3>
                <div className="case-block">
                  <span className="case-label">Challenge</span>
                  <p>{c.challenge}</p>
                </div>
                <div className="case-block">
                  <span className="case-label">Solution</span>
                  <p>{c.solution}</p>
                </div>
                <div className="case-results">
                  {c.results.map((r) => (
                    <div key={r.l} className="case-result">
                      <span className="case-num">{r.n}</span>
                      <span className="case-rlabel">{r.l}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <p className="text-center fu" style={{ marginTop: 36, color: 'var(--navy-faint)', fontSize: '0.9rem' }}>
            Illustrative results based on typical Logic Loops AI engagements. Named client case studies coming soon.
          </p>
        </div>
      </section>

      <SectionCTA
        dark
        title={<>Your business could be <span className="em">next</span></>}
        sub="Book a free 30-minute call and we'll show you what we'd automate first — and the time it would save you."
      />
    </main>
  )
}
