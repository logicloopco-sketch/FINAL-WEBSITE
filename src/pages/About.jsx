import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'

export default function About() {
  useScrollReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      {/* PAGE HERO */}
      <section style={{ background: 'linear-gradient(158deg,var(--md) 0%,var(--maroon) 100%)', padding: '160px 5% 90px', textAlign: 'center' }}>
        <div className="mw">
          <div className="lbl" style={{ color: 'var(--gl)' }}>About Us</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.8rem,4.8vw,4.2rem)', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.1, marginBottom: '20px' }}>
            The Agency Behind <em style={{ color: 'var(--gl)', fontStyle: 'italic' }}>Logic Loops AI</em>
          </h1>
          <p style={{ color: 'rgba(253,248,240,0.7)', fontSize: '1.07rem', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto', fontWeight: 300 }}>
            We are a specialized AI automation agency with one focus: building intelligent workflows that save time, reduce costs, and scale businesses.
          </p>
        </div>
      </section>

      {/* ABOUT MAIN */}
      <section style={{ background: 'var(--cream)', padding: '108px 5%' }}>
        <div className="mw">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="about-resp">
            {/* MOSAIC */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', height: '480px' }} className="mosaic-resp">
              <div style={{ gridRow: '1/3', background: 'linear-gradient(148deg,var(--md),var(--maroon))', borderRadius: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '32px', color: 'var(--cream)' }}>
                <img src="/images/logo.png" alt="Logic Loops AI" style={{ width: '64px', height: '64px', objectFit: 'contain', borderRadius: '10px', marginBottom: '20px' }} />
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '3.8rem', fontWeight: 700, color: 'var(--gl)' }}>500+</div>
                <p style={{ color: 'rgba(253,248,240,0.62)', fontSize: '0.84rem', marginTop: '5px', fontWeight: 300 }}>Platforms integrated across all client automations</p>
              </div>
              <div style={{ borderRadius: '14px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'linear-gradient(135deg,rgba(201,150,58,0.1),rgba(201,150,58,0.05))', border: '1px solid rgba(201,150,58,0.16)' }}>
                <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', fontWeight: 700, marginBottom: '7px' }}>⚡ Speed</h4>
                <p style={{ color: 'var(--mut)', fontSize: '0.82rem', lineHeight: 1.62, fontWeight: 300 }}>Production-ready automations delivered in 1–2 weeks, every time.</p>
              </div>
              <div style={{ borderRadius: '14px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'linear-gradient(135deg,rgba(122,28,28,0.07),rgba(122,28,28,0.03))', border: '1px solid var(--bdr)' }}>
                <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', fontWeight: 700, marginBottom: '7px' }}>🔒 Reliability</h4>
                <p style={{ color: 'var(--mut)', fontSize: '0.82rem', lineHeight: 1.62, fontWeight: 300 }}>Full error handling, monitoring, and retry logic included as standard.</p>
              </div>
            </div>

            {/* TEXT */}
            <div className="fu">
              <div className="lbl">About Us</div>
              <h2 className="sh">The Agency Behind <em>Logic Loops AI</em></h2>
              <p className="sub">We are a specialized AI automation agency with one focus: building intelligent workflows that save time, reduce costs, and scale businesses. Every automation is custom-engineered for your exact workflow.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginTop: '30px' }}>
                {[
                  ['No-Code, Maximum Power', 'We leverage Make.com, n8n, and Zapier to build enterprise-grade automations without traditional development overhead.'],
                  ['AI-First Philosophy', 'Every solution incorporates AI where it genuinely adds value — to deliver measurable business outcomes.'],
                  ['Long-Term Partnership', "We don't just build and disappear. We monitor, maintain, and evolve your automations as your business grows."],
                ].map(([h, p]) => (
                  <div key={h} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--maroon),var(--gold))', flexShrink: 0, marginTop: '5px' }} />
                    <div>
                      <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>{h}</h4>
                      <p style={{ color: 'var(--mut)', fontSize: '0.85rem', lineHeight: 1.65, fontWeight: 300 }}>{p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media(max-width:1100px){
            .about-resp{grid-template-columns:1fr!important;}
            .mosaic-resp{height:auto!important;grid-template-columns:1fr!important;}
            .mosaic-resp>div:first-child{grid-row:auto!important;height:200px;}
          }
        `}</style>
      </section>

      {/* TEAM */}
      <section style={{ background: 'var(--white)', padding: '108px 5%' }}>
        <div className="mw">
          <div className="sec-hd fu">
            <div className="lbl">Our Team</div>
            <h2 className="sh">The Experts Behind Your <em>Automations</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '22px' }} className="team-resp">
            {[
              ['A', 'Automation Architects', 'Make.com · n8n · Zapier', 'Senior workflow builders with 3+ years designing complex automation pipelines across every major platform.'],
              ['I', 'AI Integration Specialists', 'OpenAI · Anthropic · LangChain', 'Experts embedding LLMs, vector databases, and AI agents into real business workflows that deliver results.'],
              ['S', 'Solutions Consultants', 'Strategy · Architecture · Support', 'Dedicated consultants who translate your challenges into automation blueprints that exceed expectations.'],
            ].map(([av, h, role, p]) => (
              <div key={h} className="team-c fu" style={{ background: 'var(--cream)', border: '1px solid var(--bdr)', borderRadius: '18px', padding: '30px', textAlign: 'center', transition: 'all 0.3s' }}>
                <div style={{ width: '76px', height: '76px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--maroon),var(--gold))', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond',serif", fontSize: '1.9rem', fontWeight: 700, color: 'var(--cream)' }}>{av}</div>
                <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', fontWeight: 700, marginBottom: '5px' }}>{h}</h4>
                <div style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '11px' }}>{role}</div>
                <p style={{ color: 'var(--mut)', fontSize: '0.82rem', lineHeight: 1.65, fontWeight: 300 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .team-c:hover{box-shadow:var(--shl);transform:translateY(-4px);}
          @media(max-width:1100px){.team-resp{grid-template-columns:repeat(2,1fr)!important;}}
          @media(max-width:768px){.team-resp{grid-template-columns:1fr!important;}}
        `}</style>
      </section>

      {/* WHY US */}
      <section style={{ background: 'var(--md)', padding: '108px 5%' }}>
        <div className="mw">
          <div className="sec-hd fu">
            <div className="lbl" style={{ color: 'var(--gl)' }}>Why Choose Us</div>
            <h2 className="sh" style={{ color: 'var(--cream)' }}>We Don't Just Build Automations — <em style={{ color: 'var(--gl)' }}>We Build Systems</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '18px' }} className="why-resp">
            {[
              ['🎯', 'Outcome-First Approach', 'We start with your business goal. Every automation is measured by the ROI it generates for you.'],
              ['⚡', 'Multi-Platform Expertise', 'Deep expertise in Make.com, n8n, and Zapier means we always choose the right tool — not our preferred one.'],
              ['🔒', 'Built-In Reliability', 'Error handling, retry logic, and monitoring included in every workflow. No silent failures, ever.'],
              ['📈', '500+ Integrations Mastered', "From CRMs to accounting to AI models — if it has an API, we've connected and automated it."],
            ].map(([ic, h, p]) => (
              <div key={h} className="why-c fu" style={{ background: 'rgba(253,248,240,0.04)', border: '1px solid rgba(253,248,240,0.08)', borderRadius: '16px', padding: '30px', transition: 'all 0.3s' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '15px' }}>{ic}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.18rem', fontWeight: 700, color: 'var(--cream)', marginBottom: '9px' }}>{h}</h3>
                <p style={{ color: 'rgba(253,248,240,0.56)', fontSize: '0.86rem', lineHeight: 1.72, fontWeight: 300 }}>{p}</p>
              </div>
            ))}
          </div>

          {/* PROCESS */}
          <div className="fu" style={{ marginTop: '72px', background: 'rgba(253,248,240,0.04)', border: '1px solid rgba(253,248,240,0.08)', borderRadius: '22px', padding: '48px' }}>
            <div className="sec-hd" style={{ marginBottom: '48px' }}>
              <div className="lbl" style={{ color: 'var(--gl)' }}>Our Process</div>
              <h2 className="sh" style={{ color: 'var(--cream)' }}>From Discovery to <em style={{ color: 'var(--gl)' }}>Deployment</em></h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '30px' }} className="proc-resp">
              {[
                ['1', 'Discovery Call', 'We map your workflow, identify pain points, and define the automation blueprint together.'],
                ['2', 'Solution Design', 'We architect the complete system with every step, condition, and integration documented.'],
                ['3', 'Build & Test', 'We build with edge cases and error handling, then test exhaustively with real data.'],
                ['4', 'Deploy & Support', 'Go live together with ongoing monitoring, maintenance, and support.'],
              ].map(([n, h, p]) => (
                <div key={n} style={{ textAlign: 'center' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--gold),var(--gl))', color: 'var(--md)', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', fontFamily: "'Syne',sans-serif" }}>{n}</div>
                  <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', fontWeight: 700, color: 'var(--cream)', marginBottom: '8px' }}>{h}</h4>
                  <p style={{ color: 'rgba(253,248,240,0.48)', fontSize: '0.81rem', lineHeight: 1.62, fontWeight: 300 }}>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          .why-c:hover{background:rgba(253,248,240,0.07)!important;border-color:rgba(201,150,58,0.22)!important;}
          @media(max-width:768px){.why-resp,.proc-resp{grid-template-columns:1fr!important;}}
        `}</style>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--cream)', padding: '108px 5%', textAlign: 'center' }}>
        <div className="mw fu">
          <div className="lbl">Work With Us</div>
          <h2 className="sh" style={{ margin: '0 auto 17px' }}>Ready to Work With <em>Logic Loops AI?</em></h2>
          <p className="sub" style={{ margin: '0 auto 40px' }}>Book a free 30-minute consultation. No commitment, no hard sell — just real automation advice.</p>
          <Link to="/contact" className="btn-gold">🚀 Book Free Consultation</Link>
        </div>
      </section>
    </>
  )
}
