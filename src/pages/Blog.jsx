import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import useScrollReveal from '../hooks/useScrollReveal'
import { blogPosts, categories } from '../data/blogPosts'

export default function Blog() {
  useScrollReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory)

  return (
    <>
      <Helmet>
        <title>Blog | AI Automation Insights | Logic Loops AI</title>
        <meta name="description" content="Expert guides on Make.com, n8n, Zapier, AI agents, and workflow automation. Real strategies from Logic Loops AI — India's #1 automation agency." />
        <link rel="canonical" href="https://logicloopsai.com/blog" />
        <meta property="og:title" content="Blog | AI Automation Insights | Logic Loops AI" />
        <meta property="og:description" content="Expert guides on Make.com, n8n, Zapier, AI agents, and workflow automation from Logic Loops AI." />
        <meta property="og:url" content="https://logicloopsai.com/blog" />
      </Helmet>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(158deg,var(--md) 0%,var(--maroon) 100%)', padding: '160px 5% 90px', textAlign: 'center' }}>
        <div className="mw">
          <div className="lbl" style={{ color: 'var(--gl)' }}>The Logic Loops Blog</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.8rem,4.8vw,4.2rem)', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.1, marginBottom: '20px' }}>
            Automation <em style={{ color: 'var(--gl)', fontStyle: 'italic' }}>Insights</em> That Actually Work
          </h1>
          <p style={{ color: 'rgba(253,248,240,0.7)', fontSize: '1.07rem', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto', fontWeight: 300 }}>
            No fluff. No theory. Just real guides from real workflows we have deployed for real clients across Make.com, n8n, Zapier, and AI agents.
          </p>
        </div>
      </section>

      {/* POSTS */}
      <section style={{ background: 'var(--cream)', padding: '80px 5% 120px' }}>
        <div className="mw">

          {/* CATEGORY FILTER */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '52px', justifyContent: 'center' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '999px',
                  border: activeCategory === cat ? 'none' : '1.5px solid var(--bdr)',
                  background: activeCategory === cat
                    ? 'linear-gradient(135deg,var(--gold),var(--gl))'
                    : 'transparent',
                  color: activeCategory === cat ? 'var(--md)' : 'var(--t2)',
                  fontWeight: activeCategory === cat ? 700 : 500,
                  fontSize: '0.83rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  letterSpacing: '0.02em',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '28px' }} className="proj-resp">
            {filtered.map((post, i) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <article
                  className="fu"
                  style={{
                    background: '#fff',
                    borderRadius: '18px',
                    border: '1px solid var(--bdr)',
                    overflow: 'hidden',
                    transition: 'transform 0.22s, box-shadow 0.22s',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    animationDelay: `${i * 0.07}s`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-5px)'
                    e.currentTarget.style.boxShadow = 'var(--shl)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* CARD COVER */}
                  <div style={{ position: 'relative', height: '192px', overflow: 'hidden', borderRadius: '18px 18px 0 0' }}>
                    <img
                      src={post.cover}
                      alt={`${post.title} - Logic Loops AI`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(80,16,16,0.18) 0%, rgba(80,16,16,0.45) 100%)' }} />
                    <span style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      background: 'rgba(201,150,58,0.22)',
                      color: 'var(--gl)',
                      border: '1px solid rgba(201,150,58,0.4)',
                      borderRadius: '999px',
                      padding: '4px 12px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      backdropFilter: 'blur(4px)',
                    }}>
                      {post.category}
                    </span>
                  </div>

                  {/* CARD BODY */}
                  <div style={{ padding: '24px 26px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <p style={{ color: 'var(--mut)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '20px', flex: 1 }}>
                      {post.excerpt}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                      <span style={{ fontSize: '0.76rem', color: 'var(--mut)', fontWeight: 400 }}>
                        {post.date} · {post.readTime}
                      </span>
                      <span style={{
                        fontSize: '0.8rem',
                        color: 'var(--gold)',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}>
                        Read →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--mut)', padding: '60px 0' }}>
              No posts in this category yet. Check back soon.
            </p>
          )}
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ background: 'linear-gradient(158deg,var(--md) 0%,var(--maroon) 100%)', padding: '80px 5%', textAlign: 'center' }}>
        <div className="mw">
          <div className="lbl" style={{ color: 'var(--gl)' }}>Free Strategy Call</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.15, margin: '12px 0 16px' }}>
            Ready to Automate Your <em style={{ color: 'var(--gl)', fontStyle: 'italic' }}>Business?</em>
          </h2>
          <p style={{ color: 'rgba(253,248,240,0.7)', maxWidth: '500px', margin: '0 auto 32px', fontSize: '1rem', lineHeight: 1.7 }}>
            Book a free 30-minute call. We will audit your workflow and tell you exactly where automation will give you the highest ROI.
          </p>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg,var(--gold),var(--gl))',
              color: 'var(--md)',
              padding: '14px 34px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
            }}
          >
            Book Free Call →
          </Link>
        </div>
      </section>
    </>
  )
}
