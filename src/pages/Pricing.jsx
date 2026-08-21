import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import SectionCTA from '../components/SectionCTA'
import FAQAccordion from '../components/FAQAccordion'
import useScrollReveal from '../hooks/useScrollReveal'
import { PLANS, INCLUDED, FAQS } from '../data/content'

const HERO_CHIPS = ['Build', 'Hosting', 'Monitoring', 'Maintenance', 'Optimisation']

export default function Pricing() {
  useScrollReveal()

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <main id="main">
      <SEO
        title="AI Automation Pricing | Transparent Monthly Plans — Logic Loops AI"
        description="Simple monthly pricing for business automation. Starter £800/mo, Growth £1,500/mo, Scale £2,500/mo. Build, hosting, and monthly optimisation included."
        path="/pricing"
        keywords="AI automation pricing, automation cost, managed automation pricing, workflow automation pricing"
        schema={faqSchema}
      />

      <PageHero
        tag="Pricing"
        title={<>Simple, transparent <span className="em">pricing</span></>}
        sub="One monthly price covers the build, hosting, monitoring, maintenance, and ongoing optimisation. No setup fees. No surprises."
        primary={{ to: '/contact', label: 'Book a Free Call' }}
      >
        <div className="hv-chips">
          {HERO_CHIPS.map((c, i) => (
            <span className="hv-chip" key={c}>
              <Check size={14} /> {c}{i < HERO_CHIPS.length - 1 && <span className="hv-plus">+</span>}
            </span>
          ))}
          <span className="hv-chip hv-chip-total">= one monthly price</span>
        </div>
      </PageHero>

      {/* Plans (cream) */}
      <section className="section section-light">
        <div className="container">
          <div className="grid grid-3 pricing-grid">
            {PLANS.map((p, i) => (
              <div key={p.plan} className={`price-card price-card-light fu ${p.featured ? 'featured' : ''}`} style={{ '--d': `${i * 90}ms` }}>
                {p.featured && <span className="price-badge">Most popular</span>}
                <span className="price-plan">{p.plan}</span>
                <p className="price-tagline">{p.tagline}</p>
                <div className="price-amt">{p.price}<span> /mo</span></div>
                <ul className="price-list">
                  {p.items.map((it) => <li key={it}><Check /> {it}</li>)}
                </ul>
                <Link to="/contact" className={`btn mt-auto ${p.featured ? 'btn-cream' : 'btn-navy'}`}>Choose {p.plan}</Link>
              </div>
            ))}
          </div>
          <p className="text-center fu" style={{ marginTop: 30, color: 'var(--navy-muted)', fontSize: '0.92rem' }}>
            Save 10% on 6-month plans · Save 20% on annual plans
          </p>
        </div>
      </section>

      {/* What's included in every plan (navy) */}
      <section className="section section-dark">
        <div className="container">
          <div className="sec-head center fu">
            <p className="tag center">Every Plan Includes</p>
            <h2 className="h2">Everything included, <span className="em">every month</span></h2>
            <p className="lede">No matter which plan you choose, all of this is part of the price.</p>
          </div>
          <ul className="included-grid fu">
            {INCLUDED.map((it) => <li key={it}><Check /> {it}</li>)}
          </ul>
        </div>
      </section>

      {/* FAQ (cream) */}
      <section className="section section-light">
        <div className="container faq-wrap">
          <div className="sec-head center fu">
            <p className="tag center">FAQ</p>
            <h2 className="h2">Questions, <span className="em">answered</span></h2>
          </div>
          <div className="fu">
            <FAQAccordion items={FAQS} />
          </div>
        </div>
      </section>

      <SectionCTA
        dark
        tag="Still deciding?"
        title={<>Let's find the <span className="em">right plan</span> for you</>}
        sub="Book a free 30-minute call. We'll recommend the plan that fits your workflows — no pressure to commit."
      />
    </main>
  )
}
