import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

/* ─── Scroll-reveal hook ─────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed') }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  })
}

/* ─── 3D Tilt card ───────────────────────────────────────── */
function TiltCard({ children, style, className = '' }) {
  const ref = useRef(null)
  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width  - 0.5
    const y = (e.clientY - r.top)  / r.height - 0.5
    ref.current.style.transform = `perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale3d(1.03,1.03,1.03)`
  }
  const handleLeave = () => {
    ref.current.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
  }
  return (
    <div ref={ref} className={className} style={{ transition: 'transform 0.25s ease', transformStyle: 'preserve-3d', ...style }}
      onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  )
}

/* ─── Animated counter ───────────────────────────────────── */
function Counter({ to, suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0
        const num = parseInt(to)
        const step = Math.ceil(num / 60)
        const t = setInterval(() => {
          start = Math.min(start + step, num)
          setVal(start)
          if (start >= num) clearInterval(t)
        }, 18)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [to])
  return <span ref={ref}>{val}{suffix}</span>
}

/* ─── Floating orb background ────────────────────────────── */
function Orbs() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {[
        { w:700, h:700, top:'-15%', left:'-10%', c:'rgba(201,150,58,0.07)', d:'0s' },
        { w:500, h:500, top:'30%',  right:'-8%', c:'rgba(122,28,28,0.12)',  d:'3s' },
        { w:400, h:400, bottom:'-5%', left:'30%', c:'rgba(201,150,58,0.05)', d:'6s' },
      ].map((o, i) => (
        <div key={i} style={{
          position:'absolute', width:o.w, height:o.h,
          top:o.top, left:o.left, right:o.right, bottom:o.bottom,
          borderRadius:'50%', background:o.c,
          filter:'blur(80px)',
          animation:`orbFloat 12s ease-in-out ${o.d} infinite alternate`,
        }}/>
      ))}
    </div>
  )
}

/* ─── Grid lines overlay ─────────────────────────────────── */
function GridLines() {
  return (
    <div style={{
      position:'absolute', inset:0, pointerEvents:'none', zIndex:0,
      backgroundImage:`
        linear-gradient(rgba(201,150,58,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(201,150,58,0.04) 1px, transparent 1px)
      `,
      backgroundSize:'80px 80px',
    }}/>
  )
}

/* ─── HOME PAGE ──────────────────────────────────────────── */
export default function Home({ openModal }) {
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const p1 = [['🔧','Make.com'],['🔄','n8n'],['⚡','Zapier'],['🤖','OpenAI'],['📊','Pipedrive'],['🏆','GoHighLevel'],['🟠','HubSpot'],['☁️','Salesforce'],['📋','Google Sheets'],['📹','Zoom'],['💬','Slack'],['👥','MS Teams'],['📧','Outlook'],['✉️','Gmail'],['🔵','Pinecone'],['💼','Xero'],['📒','QuickBooks'],['💳','Stripe'],['🎯','Apollo.io'],['🕷️','Apify']]
  const p2 = [['📨','Instantly'],['📦','Airtable'],['📝','Notion'],['📅','Monday.com'],['✅','Asana'],['🎫','Jira'],['🛍️','Shopify'],['🛒','WooCommerce'],['📱','Twilio'],['📤','SendGrid'],['📰','Mailchimp'],['📋','Typeform'],['📆','Calendly'],['🏠','Airbnb'],['🔍','Perplexity AI'],['🧠','Anthropic'],['📁','Google Drive'],['💧','Dropbox'],['☁️','AWS S3'],['🔗','Webhooks']]

  const chips = (items) => [...items, ...items].map(([e, n], i) => (
    <div key={i} style={{ background:'rgba(253,248,240,0.05)', border:'1px solid rgba(253,248,240,0.09)', borderRadius:'10px', padding:'10px 17px', fontSize:'0.81rem', fontWeight:500, whiteSpace:'nowrap', color:'rgba(253,248,240,0.65)', display:'flex', alignItems:'center', gap:'8px', flexShrink:0, transition:'all 0.2s' }}>
      <span>{e}</span>{n}
    </div>
  ))

  return (
    <>
      <style>{`
        /* ── Keyframes ── */
        @keyframes orbFloat  { from{transform:translateY(0) scale(1)} to{transform:translateY(-40px) scale(1.06)} }
        @keyframes heroFadeUp{ from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:none} }
        @keyframes badgePop  { from{opacity:0;transform:scale(0.8)} to{opacity:1;transform:scale(1)} }
        @keyframes pulseGlow { 0%,100%{box-shadow:0 0 0 0 rgba(201,150,58,0.4)} 50%{box-shadow:0 0 0 12px rgba(201,150,58,0)} }
        @keyframes wfin      { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:none} }
        @keyframes mqs       { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes imgReveal { from{opacity:0;transform:scale(1.08) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes lineGrow  { from{width:0} to{width:100%} }
        @keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

        /* ── Scroll reveals ── */
        .reveal {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1);
        }
        .reveal.revealed { opacity:1; transform:none; }
        .reveal.delay-1  { transition-delay: 0.1s; }
        .reveal.delay-2  { transition-delay: 0.2s; }
        .reveal.delay-3  { transition-delay: 0.3s; }
        .reveal.delay-4  { transition-delay: 0.4s; }
        .reveal.delay-5  { transition-delay: 0.5s; }
        .reveal.from-left  { transform: translateX(-50px); }
        .reveal.from-right { transform: translateX(50px); }
        .reveal.from-left.revealed, .reveal.from-right.revealed { transform:none; }
        .reveal.scale-in   { transform: scale(0.88); }
        .reveal.scale-in.revealed { transform: scale(1); }

        /* ── Hero bg parallax image ── */
        .hero-bg-img {
          position:absolute; inset:0; z-index:0;
          background: url('/images/zoom1.png') center/cover no-repeat;
          filter: brightness(0.08) saturate(0.5) sepia(0.3);
          transform: scale(1.06);
          transition: transform 12s ease;
        }

        /* ── Mq fades ── */
        .mq-fade { position:relative; overflow:hidden; }
        .mq-fade::before,.mq-fade::after{content:'';position:absolute;top:0;bottom:0;width:160px;z-index:2;pointer-events:none;}
        .mq-fade::before{left:0;background:linear-gradient(90deg,var(--md),transparent);}
        .mq-fade::after{right:0;background:linear-gradient(-90deg,var(--md),transparent);}

        /* ── Service card hover ── */
        .srv3d { transition: transform 0.28s ease, box-shadow 0.28s ease; transform-style:preserve-3d; }
        .srv3d:hover { box-shadow: 0 28px 60px rgba(80,16,16,0.22), 0 0 0 1px rgba(201,150,58,0.2) !important; }
        .srv3d::before { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; background:linear-gradient(to bottom,var(--maroon),var(--gold)); transform:scaleY(0); transition:transform 0.3s; transform-origin:top; border-radius:0 0 0 18px; }
        .srv3d:hover::before { transform:scaleY(1); }

        /* ── Project card ── */
        .proj3d { transition: all 0.32s cubic-bezier(0.16,1,0.3,1); cursor:pointer; }
        .proj3d:hover { transform: translateY(-10px) scale(1.01); box-shadow: 0 30px 70px rgba(80,16,16,0.22) !important; }
        .proj3d:hover .proj-ov-inner { opacity:1 !important; }
        .proj3d:hover img { transform: scale(1.07) !important; }

        /* ── Stat number glow ── */
        .stat-num { transition: text-shadow 0.3s; }
        .stat-num:hover { text-shadow: 0 0 30px rgba(232,184,101,0.6); }

        /* ── Gold underline on headings ── */
        .gold-line { position:relative; display:inline-block; }
        .gold-line::after { content:''; position:absolute; bottom:-4px; left:0; height:2px; background:linear-gradient(90deg,var(--gold),var(--gl)); animation: lineGrow 1.2s 0.8s ease forwards; width:0; }

        /* ── Floating automation card ── */
        .float-card { animation: floatY 4s ease-in-out infinite; }

        @media(max-width:768px){
          .hero-cols { grid-template-columns:1fr !important; }
          .hero-card-wrap { display:none !important; }
          .srv-grid-resp { grid-template-columns:1fr !important; }
          .proj-grid-resp { grid-template-columns:1fr !important; }
          .stats-row { gap:28px !important; }
        }
        @media(max-width:1100px){
          .srv-grid-resp { grid-template-columns:repeat(2,1fr) !important; }
          .proj-grid-resp { grid-template-columns:repeat(2,1fr) !important; }
        }
      `}</style>

      {/* ═══════════════════════════════════════ HERO ══ */}
      <section style={{ minHeight:'100vh', position:'relative', display:'flex', alignItems:'center', padding:'140px 5% 100px', overflow:'hidden', background:'var(--md)' }}>

        {/* Background image */}
        <div className="hero-bg-img" />

        {/* Gradient overlay */}
        <div style={{ position:'absolute', inset:0, zIndex:1, background:'linear-gradient(158deg, rgba(80,16,16,0.97) 0%, rgba(122,28,28,0.92) 52%, rgba(139,32,32,0.88) 100%)' }} />

        {/* Grid lines */}
        <div style={{ position:'absolute', inset:0, zIndex:1, backgroundImage:'linear-gradient(rgba(201,150,58,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(201,150,58,0.035) 1px,transparent 1px)', backgroundSize:'80px 80px' }}/>

        {/* Orbs */}
        <Orbs />

        {/* Corner accent lines */}
        <div style={{ position:'absolute', top:100, left:'5%', zIndex:2, width:60, height:60, borderTop:'1px solid rgba(201,150,58,0.3)', borderLeft:'1px solid rgba(201,150,58,0.3)' }}/>
        <div style={{ position:'absolute', bottom:60, right:'5%', zIndex:2, width:60, height:60, borderBottom:'1px solid rgba(201,150,58,0.3)', borderRight:'1px solid rgba(201,150,58,0.3)' }}/>

        <div style={{ maxWidth:1280, margin:'0 auto', width:'100%', position:'relative', zIndex:3 }}>
          <div className="hero-cols" style={{ display:'grid', gridTemplateColumns:'1.2fr 0.8fr', gap:80, alignItems:'center' }}>

            {/* LEFT */}
            <div>
              {/* Badge */}
              <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:'rgba(201,150,58,0.1)', border:'1px solid rgba(201,150,58,0.3)', padding:'8px 20px', borderRadius:100, fontSize:'0.73rem', fontWeight:700, color:'var(--gl)', marginBottom:28, letterSpacing:'1.5px', textTransform:'uppercase', animation:'badgePop 0.6s 0.2s ease both' }}>
                <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--gl)', display:'inline-block', animation:'pulseGlow 2s infinite' }}/>
                Make.com · n8n · Zapier · AI Agents
              </div>

              {/* H1 */}
              <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(3rem,5vw,5rem)', fontWeight:700, lineHeight:1.04, color:'var(--cream)', marginBottom:24, animation:'heroFadeUp 0.9s 0.35s ease both' }}>
                We Build<br/>
                <em className="gold-line" style={{ color:'var(--gl)', fontStyle:'italic' }}>AI Automations</em><br/>
                That Work While<br/>You Sleep
              </h1>

              {/* Sub */}
              <p style={{ color:'rgba(253,248,240,0.68)', fontSize:'1.05rem', lineHeight:1.85, marginBottom:40, maxWidth:500, fontWeight:300, animation:'heroFadeUp 0.9s 0.5s ease both' }}>
                Logic Loops AI designs and deploys intelligent automation workflows that eliminate repetitive work, scale your operations, and connect 500+ business tools.{' '}
                <strong style={{ color:'rgba(253,248,240,0.92)', fontWeight:600 }}>Where Logic Meets Limitless AI.</strong>
              </p>

              {/* Buttons */}
              <div style={{ display:'flex', gap:14, flexWrap:'wrap', marginBottom:60, animation:'heroFadeUp 0.9s 0.65s ease both' }}>
                <Link to="/contact" style={{ background:'linear-gradient(135deg,var(--gold),var(--gl))', color:'var(--md)', padding:'15px 34px', borderRadius:12, fontWeight:700, fontSize:'0.97rem', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:9, transition:'all 0.2s', boxShadow:'0 8px 30px rgba(201,150,58,0.35)' }}
                  onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px)'}
                  onMouseLeave={e=>e.currentTarget.style.transform='none'}>
                  🚀 Book Free Consultation
                </Link>
                <Link to="/portfolio" style={{ background:'transparent', color:'var(--cream)', padding:'15px 34px', borderRadius:12, fontWeight:500, fontSize:'0.97rem', textDecoration:'none', border:'1px solid rgba(253,248,240,0.2)', transition:'all 0.2s' }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gl)';e.currentTarget.style.color='var(--gl)'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(253,248,240,0.2)';e.currentTarget.style.color='var(--cream)'}}>
                  View Our Work →
                </Link>
              </div>

              {/* Stats */}
              <div className="stats-row" style={{ display:'flex', gap:48, animation:'heroFadeUp 0.9s 0.8s ease both' }}>
                {[['500', '+', 'Platforms Integrated'],['9', '+', 'Automations Delivered'],['24', '/7', 'Workflows Running']].map(([n,s,l]) => (
                  <div key={l}>
                    <div className="stat-num" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2.8rem', fontWeight:700, color:'var(--gl)', lineHeight:1 }}>
                      <Counter to={n} suffix={s}/>
                    </div>
                    <div style={{ fontSize:'0.72rem', color:'rgba(253,248,240,0.45)', marginTop:6, letterSpacing:'0.5px' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Floating automation card */}
            <div className="hero-card-wrap float-card" style={{ animation:'heroFadeUp 0.9s 0.5s ease both, floatY 5s 1.4s ease-in-out infinite' }}>
              <TiltCard style={{ background:'rgba(253,248,240,0.05)', border:'1px solid rgba(253,248,240,0.1)', borderRadius:22, padding:28, backdropFilter:'blur(20px)' }}>
                {/* Live pill */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
                  <span style={{ fontSize:'0.63rem', color:'rgba(253,248,240,0.32)', letterSpacing:'3px', textTransform:'uppercase' }}>Live Automation</span>
                  <span style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(74,222,128,0.12)', border:'1px solid rgba(74,222,128,0.22)', borderRadius:100, padding:'4px 12px', fontSize:'0.67rem', color:'#4ade80', fontWeight:600 }}>
                    <span style={{ width:6, height:6, borderRadius:'50%', background:'#4ade80', display:'inline-block', animation:'pulseGlow 2s infinite' }}/>
                    RUNNING
                  </span>
                </div>

                {[
                  ['🔗','a','Webhook Trigger','New lead received'],
                  ['🤖','b','AI Processing','OpenAI generates message'],
                  ['📊','c','CRM Updated','Pipedrive deal created'],
                  ['📧','a','Team Notified','Teams + Email + SMS'],
                ].map(([ic, cls, title, sub], i) => (
                  <div key={i}>
                    <div style={{ display:'flex', alignItems:'center', gap:12, background:'rgba(253,248,240,0.04)', border:'1px solid rgba(253,248,240,0.07)', borderRadius:11, padding:'13px 14px', marginBottom:8, opacity:0, animation:`wfin 0.5s ${0.9 + i*0.18}s ease forwards` }}>
                      <div style={{ width:36, height:36, borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.95rem', flexShrink:0, background: cls==='a'?'rgba(201,150,58,0.18)': cls==='b'?'rgba(122,28,28,0.35)':'rgba(253,248,240,0.08)' }}>{ic}</div>
                      <div style={{ flex:1 }}>
                        <strong style={{ fontSize:'0.79rem', color:'var(--cream)', fontWeight:600, display:'block' }}>{title}</strong>
                        <span style={{ fontSize:'0.68rem', color:'rgba(253,248,240,0.42)' }}>{sub}</span>
                      </div>
                      <div style={{ width:7, height:7, borderRadius:'50%', background:'#4ade80', flexShrink:0 }}/>
                    </div>
                    {i < 3 && <div style={{ textAlign:'center', color:'rgba(253,248,240,0.14)', fontSize:'0.68rem', padding:'1px 0', marginBottom:8 }}>↓</div>}
                  </div>
                ))}

                {/* Bottom stats */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:18 }}>
                  {[['⚡','12ms','Response time'],['🔄','99.9%','Uptime SLA']].map(([ic,n,l]) => (
                    <div key={l} style={{ background:'rgba(253,248,240,0.04)', borderRadius:10, padding:'12px 14px', textAlign:'center', border:'1px solid rgba(253,248,240,0.06)' }}>
                      <div style={{ fontSize:'0.9rem', marginBottom:4 }}>{ic}</div>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.3rem', fontWeight:700, color:'var(--gl)' }}>{n}</div>
                      <div style={{ fontSize:'0.63rem', color:'rgba(253,248,240,0.35)', marginTop:2 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </div>

          </div>
        </div>

        {/* Bottom fade */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:120, background:'linear-gradient(to bottom, transparent, var(--cream))', zIndex:4 }}/>
      </section>

      {/* ═══════════════════════ SERVICES ══ */}
      <section style={{ background:'var(--white)', padding:'120px 5%' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div className="reveal" style={{ textAlign:'center', marginBottom:72 }}>
            <div style={{ fontSize:'0.67rem', fontWeight:700, letterSpacing:'4px', color:'var(--gold)', textTransform:'uppercase', marginBottom:14 }}>What We Do</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.2rem,3.6vw,3.2rem)', fontWeight:700, color:'var(--text)', lineHeight:1.1, marginBottom:16 }}>
              Expert AI Automation Services<br/>Built for <em style={{ fontStyle:'italic', color:'var(--maroon)' }}>Modern Business</em>
            </h2>
            <p style={{ color:'var(--mut)', fontSize:'0.97rem', lineHeight:1.8, maxWidth:560, margin:'0 auto', fontWeight:300 }}>
              From simple task automation to complex multi-step AI pipelines — using Make.com, n8n, Zapier and custom AI agents.
            </p>
          </div>

          <div className="srv-grid-resp" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:22 }}>
            {[
              ['⚡','Workflow Automation','End-to-end workflows on Make.com, n8n, and Zapier. Custom logic, error handling, multi-step pipelines built to scale.',['Make.com','n8n','Zapier'],'0.05s'],
              ['🤖','AI Agent Development','Intelligent AI agents powered by OpenAI and Anthropic that reason, decide, and act on your behalf 24/7.',['OpenAI','LangChain','AI Agents'],'0.15s'],
              ['📊','CRM & Lead Automation','Automate your entire lead pipeline. Smart CRM entry, AI follow-up sequences, deal management on autopilot.',['Pipedrive','GoHighLevel','HubSpot'],'0.25s'],
              ['📹','Meeting Intelligence','Auto-transcribe, summarize, and store every Zoom meeting. AI insights delivered to your inbox within minutes.',['Zoom','Whisper AI','Pinecone'],'0.35s'],
              ['📧','AI Cold Email Outreach','Research prospects with Perplexity, generate personalized emails with ChatGPT, run Instantly campaigns automatically.',['Apollo.io','Instantly','Perplexity AI'],'0.45s'],
              ['💰','Finance & Invoice Automation','Auto-create invoices in Xero and QuickBooks triggered from any event. Streamline billing entirely.',['Xero','QuickBooks','Google Sheets'],'0.55s'],
            ].map(([ic,h,p,tags,delay]) => (
              <article key={h} className={`reveal srv3d`} style={{ transitionDelay:delay, background:'var(--cream)', border:'1px solid var(--bdr)', borderRadius:18, padding:'34px 30px', position:'relative', overflow:'hidden' }}>
                <div style={{ width:52, height:52, borderRadius:13, background:'linear-gradient(135deg,rgba(122,28,28,0.08),rgba(201,150,58,0.1))', border:'1px solid rgba(122,28,28,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.35rem', marginBottom:20 }}>{ic}</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.22rem', fontWeight:700, marginBottom:11 }}>{h}</h3>
                <p style={{ color:'var(--mut)', fontSize:'0.86rem', lineHeight:1.73, fontWeight:300 }}>{p}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:16 }}>
                  {tags.map(t=><span key={t} style={{ background:'rgba(122,28,28,0.06)', border:'1px solid rgba(122,28,28,0.13)', color:'var(--maroon)', padding:'3px 10px', borderRadius:100, fontSize:'0.68rem', fontWeight:600 }}>{t}</span>)}
                </div>
              </article>
            ))}
          </div>

          <div className="reveal delay-3" style={{ textAlign:'center', marginTop:52 }}>
            <Link to="/services" style={{ background:'linear-gradient(135deg,var(--gold),var(--gl))', color:'var(--md)', padding:'15px 38px', borderRadius:12, fontWeight:700, fontSize:'0.97rem', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:9, transition:'all 0.2s', boxShadow:'0 8px 30px rgba(201,150,58,0.28)' }}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px)'}
              onMouseLeave={e=>e.currentTarget.style.transform='none'}>
              Explore All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ PORTFOLIO PREVIEW ══ */}
      <section style={{ background:'var(--cream)', padding:'120px 5%' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div className="reveal" style={{ textAlign:'center', marginBottom:72 }}>
            <div style={{ fontSize:'0.67rem', fontWeight:700, letterSpacing:'4px', color:'var(--gold)', textTransform:'uppercase', marginBottom:14 }}>Our Portfolio</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.2rem,3.6vw,3.2rem)', fontWeight:700, color:'var(--text)', lineHeight:1.1 }}>
              Real Automations. <em style={{ fontStyle:'italic', color:'var(--maroon)' }}>Real Results.</em>
            </h2>
          </div>

          <div className="proj-grid-resp" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
            {[
              { key:'zoom',    img:'/images/zoom1.png',   img2:'/images/zoom2.png', cat:'Meeting Intelligence', h:'Zoom Meeting AI Pipeline',        tools:['Zoom','OpenAI','Pinecone'],    delay:'0.05s' },
              { key:'lead',    img:'/images/lead1.png',   img2:null,                cat:'CRM Automation',       h:'AI Lead Management & CRM',         tools:['Pipedrive','OpenAI','Teams'],   delay:'0.15s' },
              { key:'email',   img:'/images/email1.png',  img2:null,                cat:'Outreach Automation',  h:'AI Cold Email Outreach Pipeline',  tools:['Perplexity AI','ChatGPT'],     delay:'0.25s' },
              { key:'hotel',   img:'/images/hotel1.png',  img2:'/images/hotel2.png',cat:'Property Management',  h:'Automated Hotel Management',       tools:['Airbnb','QuickBooks'],         delay:'0.35s' },
              { key:'seo',     img:'/images/seo1.png',    img2:null,                cat:'Content Automation',   h:'AI SEO Content Pipeline',          tools:['RSS','ChatGPT','Slack'],       delay:'0.45s' },
              { key:'apollo',  img:'/images/apollo1.png', img2:null,                cat:'Lead Generation',      h:'Apollo + Apify → CRM Pipeline',    tools:['Apollo.io','Apify','Pipedrive'],delay:'0.55s' },
            ].map(({ key, img, img2, cat, h, tools, delay }) => (
              <article key={key} className="reveal proj3d" style={{ transitionDelay:delay, background:'var(--white)', border:'1px solid var(--bdr)', borderRadius:20, overflow:'hidden', boxShadow:'var(--sh)' }}
                onClick={() => openModal(key)}>
                <div style={{ position:'relative', height:200, overflow:'hidden', background:'var(--c2)' }}>
                  {img2 ? (
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', height:'100%' }}>
                      <img src={img}  alt={h} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.45s' }}/>
                      <img src={img2} alt={h} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.45s' }}/>
                    </div>
                  ) : (
                    <img src={img} alt={h} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.45s' }}/>
                  )}
                  <div className="proj-ov-inner" style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(80,16,16,0.88) 0%,transparent 55%)', opacity:0, transition:'opacity 0.3s', display:'flex', alignItems:'flex-end', padding:18 }}>
                    <span style={{ background:'var(--gold)', color:'var(--md)', padding:'9px 20px', borderRadius:9, fontWeight:700, fontSize:'0.79rem' }}>View Details →</span>
                  </div>
                </div>
                <div style={{ padding:22 }}>
                  <div style={{ fontSize:'0.64rem', fontWeight:700, letterSpacing:'2.5px', color:'var(--gold)', textTransform:'uppercase', marginBottom:8 }}>{cat}</div>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.08rem', fontWeight:700, marginBottom:12, lineHeight:1.35 }}>{h}</h3>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                    {tools.map(t=><span key={t} style={{ background:'rgba(122,28,28,0.06)', border:'1px solid rgba(122,28,28,0.11)', color:'var(--maroon)', padding:'2px 9px', borderRadius:100, fontSize:'0.66rem', fontWeight:600 }}>{t}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="reveal delay-3" style={{ textAlign:'center', marginTop:52 }}>
            <Link to="/portfolio" style={{ background:'transparent', color:'var(--maroon)', padding:'14px 36px', borderRadius:12, fontWeight:700, fontSize:'0.95rem', textDecoration:'none', border:'2px solid var(--maroon)', display:'inline-flex', alignItems:'center', gap:9, transition:'all 0.2s' }}
              onMouseEnter={e=>{e.currentTarget.style.background='var(--maroon)';e.currentTarget.style.color='var(--cream)'}}
              onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='var(--maroon)'}}>
              View Full Portfolio →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ PLATFORMS ══ */}
      <section style={{ background:'var(--md)', padding:'120px 5%', position:'relative', overflow:'hidden' }}>
        <Orbs />
        <div style={{ maxWidth:1280, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div className="reveal" style={{ textAlign:'center', marginBottom:64 }}>
            <div style={{ fontSize:'0.67rem', fontWeight:700, letterSpacing:'4px', color:'var(--gl)', textTransform:'uppercase', marginBottom:14 }}>Integrations</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.2rem,3.6vw,3.2rem)', fontWeight:700, color:'var(--cream)', lineHeight:1.1 }}>
              500+ Platforms. <em style={{ fontStyle:'italic', color:'var(--gl)' }}>One Agency.</em>
            </h2>
            <p style={{ color:'rgba(253,248,240,0.5)', fontSize:'0.97rem', marginTop:14, fontWeight:300 }}>If your business uses it, we can automate it.</p>
          </div>

          <div className="mq-fade reveal" style={{ marginBottom:14 }}>
            <div style={{ display:'flex', gap:13, width:'max-content', animation:'mqs 36s linear infinite' }}>{chips(p1)}</div>
          </div>
          <div className="mq-fade reveal delay-1">
            <div style={{ display:'flex', gap:13, width:'max-content', animation:'mqs 28s linear infinite reverse' }}>{chips(p2)}</div>
          </div>

          <div className="reveal delay-2" style={{ textAlign:'center', marginTop:72 }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'7rem', fontWeight:700, color:'var(--gl)', lineHeight:1, textShadow:'0 0 60px rgba(232,184,101,0.25)' }}>500+</div>
            <p style={{ color:'rgba(253,248,240,0.38)', marginTop:10 }}>Platforms integrated across all client automations</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CASE STUDY TEASER ══ */}
      <section style={{ background:'var(--white)', padding:'120px 5%' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div className="reveal" style={{ textAlign:'center', marginBottom:72 }}>
            <div style={{ fontSize:'0.67rem', fontWeight:700, letterSpacing:'4px', color:'var(--gold)', textTransform:'uppercase', marginBottom:14 }}>Results</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.2rem,3.6vw,3.2rem)', fontWeight:700, color:'var(--text)', lineHeight:1.1 }}>
              Measurable Outcomes for <em style={{ fontStyle:'italic', color:'var(--maroon)' }}>Real Clients</em>
            </h2>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:22 }} className="stats-cards-resp">
            {[
              { n:'3 hrs', l:'Saved weekly', desc:'SaaS team — post-meeting work fully automated with Zoom AI pipeline', img:'/images/zoom3.png', delay:'0.05s' },
              { n:'20 hrs', l:'Saved weekly', desc:'Hotel management — bookings, payments, invoicing across Airbnb & QuickBooks', img:'/images/hotel1.png', delay:'0.2s' },
              { n:'2×', l:'Pipeline visibility', desc:'Digital agency — zero-touch CRM lead management with instant AI routing', img:'/images/lead1.png', delay:'0.35s' },
            ].map(({ n, l, desc, img, delay }) => (
              <div key={l} className="reveal scale-in" style={{ transitionDelay:delay, position:'relative', borderRadius:20, overflow:'hidden', border:'1px solid var(--bdr)', boxShadow:'var(--sh)' }}>
                <div style={{ height:160, overflow:'hidden' }}>
                  <img src={img} alt={l} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(80,16,16,0.9) 40%, rgba(80,16,16,0.2) 100%)' }}/>
                </div>
                <div style={{ padding:'28px 28px 32px', position:'relative', zIndex:1 }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'3.2rem', fontWeight:700, color:'var(--maroon)', lineHeight:1 }}>{n}</div>
                  <div style={{ fontSize:'0.75rem', fontWeight:700, letterSpacing:'1.5px', color:'var(--gold)', textTransform:'uppercase', marginBottom:10, marginTop:4 }}>{l}</div>
                  <p style={{ color:'var(--mut)', fontSize:'0.85rem', lineHeight:1.65, fontWeight:300 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal delay-3" style={{ textAlign:'center', marginTop:52 }}>
            <Link to="/case-studies" style={{ background:'linear-gradient(135deg,var(--gold),var(--gl))', color:'var(--md)', padding:'15px 38px', borderRadius:12, fontWeight:700, fontSize:'0.97rem', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:9, transition:'all 0.2s', boxShadow:'0 8px 30px rgba(201,150,58,0.28)' }}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px)'}
              onMouseLeave={e=>e.currentTarget.style.transform='none'}>
              Read Full Case Studies →
            </Link>
          </div>
        </div>
        <style>{`@media(max-width:1100px){.stats-cards-resp{grid-template-columns:repeat(2,1fr)!important;}} @media(max-width:768px){.stats-cards-resp{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ═══════════════════════ CTA BANNER ══ */}
      <section style={{ background:'linear-gradient(135deg,var(--md) 0%,var(--maroon) 100%)', padding:'120px 5%', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <GridLines />
        <Orbs />
        <div style={{ maxWidth:800, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div className="reveal" style={{ fontSize:'0.67rem', fontWeight:700, letterSpacing:'4px', color:'var(--gl)', textTransform:'uppercase', marginBottom:20 }}>Ready to Automate?</div>
          <h2 className="reveal delay-1" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.4rem,4vw,3.6rem)', fontWeight:700, color:'var(--cream)', lineHeight:1.1, marginBottom:22 }}>
            Let's Build Your <em style={{ color:'var(--gl)', fontStyle:'italic' }}>Dream Automation</em>
          </h2>
          <p className="reveal delay-2" style={{ color:'rgba(253,248,240,0.6)', fontSize:'1.05rem', lineHeight:1.8, marginBottom:44, fontWeight:300 }}>
            Book a free 30-minute consultation and we'll show you exactly what's automatable in your business. No commitment, no hard sell.
          </p>
          <div className="reveal delay-3">
            <Link to="/contact" style={{ background:'linear-gradient(135deg,var(--gold),var(--gl))', color:'var(--md)', padding:'17px 48px', borderRadius:14, fontWeight:700, fontSize:'1.05rem', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:10, transition:'all 0.2s', boxShadow:'0 12px 40px rgba(201,150,58,0.4)' }}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 20px 50px rgba(201,150,58,0.55)'}}
              onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 12px 40px rgba(201,150,58,0.4)'}}>
              🚀 Book Free Consultation
            </Link>
          </div>
          <p className="reveal delay-4" style={{ marginTop:22, fontSize:'0.8rem', color:'rgba(253,248,240,0.32)' }}>✅ Free 30-min call · No commitment · Reply within 24 hours</p>
        </div>
      </section>
    </>
  )
}