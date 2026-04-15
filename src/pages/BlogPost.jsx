import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import useScrollReveal from '../hooks/useScrollReveal'
import { blogPosts } from '../data/blogPosts'

function renderBlock(block, i) {
  switch (block.type) {
    case 'intro':
      return (
        <p key={i} style={{
          fontSize: '1.12rem',
          lineHeight: 1.85,
          color: 'var(--text)',
          fontWeight: 400,
          borderLeft: '3px solid var(--gold)',
          paddingLeft: '20px',
          marginBottom: '32px',
          fontStyle: 'italic',
        }}>
          {block.text}
        </p>
      )
    case 'h2':
      return (
        <h2 key={i} style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 'clamp(1.45rem,2.4vw,1.95rem)',
          fontWeight: 700,
          color: 'var(--maroon)',
          marginTop: '44px',
          marginBottom: '14px',
          lineHeight: 1.25,
        }}>
          {block.text}
        </h2>
      )
    case 'p':
      return (
        <p key={i} style={{
          fontSize: '1rem',
          lineHeight: 1.85,
          color: 'var(--t2)',
          marginBottom: '22px',
        }}>
          {block.text}
        </p>
      )
    case 'list':
      return (
        <ul key={i} style={{ marginBottom: '24px', paddingLeft: '0', listStyle: 'none' }}>
          {block.items.map((item, j) => (
            <li key={j} style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
              color: 'var(--t2)',
              fontSize: '0.97rem',
              lineHeight: 1.75,
              marginBottom: '10px',
            }}>
              <span style={{ color: 'var(--gold)', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    default:
      return null
  }
}

export default function BlogPost() {
  useScrollReveal()
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  if (!post) return <Navigate to="/blog" replace />

  const currentIndex = blogPosts.findIndex(p => p.slug === slug)
  const prev = blogPosts[currentIndex - 1] || null
  const next = blogPosts[currentIndex + 1] || null

  return (
    <>
      <Helmet>
        <title>{post.title} | Logic Loops AI Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://logicloopsai.com/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://logicloopsai.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "image": post.cover,
          "author": { "@type": "Organization", "name": "Logic Loops AI" },
          "publisher": { "@type": "Organization", "name": "Logic Loops AI", "url": "https://logicloopsai.com" },
          "datePublished": post.date,
          "description": post.excerpt,
          "url": `https://logicloopsai.com/blog/${post.slug}`
        })}</script>
      </Helmet>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(158deg,var(--md) 0%,var(--maroon) 100%)', padding: '140px 5% 80px' }}>
        <div className="mw" style={{ maxWidth: '820px' }}>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(253,248,240,0.55)', fontSize: '0.83rem', textDecoration: 'none', marginBottom: '28px', fontWeight: 500 }}>
            ← Back to Blog
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{
              background: 'rgba(201,150,58,0.18)',
              color: 'var(--gl)',
              border: '1px solid rgba(201,150,58,0.3)',
              borderRadius: '999px',
              padding: '5px 14px',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>
              {post.category}
            </span>
            <span style={{ color: 'rgba(253,248,240,0.45)', fontSize: '0.8rem' }}>
              {post.date} · {post.readTime}
            </span>
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 'clamp(2.2rem,4vw,3.4rem)',
            fontWeight: 700,
            color: 'var(--cream)',
            lineHeight: 1.15,
            marginBottom: '20px',
          }}>
            {post.title}
          </h1>
          <p style={{ color: 'rgba(253,248,240,0.65)', fontSize: '1.05rem', lineHeight: 1.75, fontWeight: 300, maxWidth: '660px' }}>
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* HERO IMAGE */}
      {post.cover && (
        <div style={{ background: 'var(--cream)', padding: '0 5%' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto', transform: 'translateY(-36px)' }}>
            <img
              src={post.cover}
              alt={post.imageAlt || post.title}
              style={{
                width: '100%',
                maxHeight: '384px',
                objectFit: 'cover',
                borderRadius: '16px',
                display: 'block',
                boxShadow: 'var(--shl)',
              }}
            />
          </div>
        </div>
      )}

      {/* CONTENT */}
      <section style={{ background: 'var(--cream)', padding: post.cover ? '0 5% 100px' : '72px 5% 100px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div className="fu">
            {(() => {
              let h2Count = 0
              return post.content.flatMap((block, i) => {
                const el = renderBlock(block, i)
                if (block.type === 'h2') {
                  h2Count++
                  if (h2Count === 2) {
                    return [el, (
                      <div key="inline-cta" style={{ background: 'rgba(122,28,28,0.04)', border: '1px solid rgba(122,28,28,0.12)', borderRadius: '12px', padding: '18px 22px', marginBottom: '28px', fontSize: '0.9rem', color: 'var(--t2)', lineHeight: 1.75 }}>
                        Want to see how this works for your business? Check our{' '}
                        <Link to="/services" style={{ color: 'var(--maroon)', fontWeight: 600, textDecoration: 'underline' }}>automation services</Link>{' '}
                        or view our{' '}
                        <Link to="/portfolio" style={{ color: 'var(--maroon)', fontWeight: 600, textDecoration: 'underline' }}>live project examples</Link>.
                      </div>
                    )]
                  }
                }
                return [el]
              })
            })()}
          </div>

          {/* RELATED POSTS */}
          {(() => {
            const related = [
              ...blogPosts.filter(p => p.slug !== slug && p.category === post.category),
              ...blogPosts.filter(p => p.slug !== slug && p.category !== post.category),
            ].slice(0, 2)
            if (related.length === 0) return null
            return (
              <div style={{ marginTop: '60px' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: '20px' }}>Related Posts</h3>
                <div style={{ display: 'grid', gridTemplateColumns: related.length > 1 ? '1fr 1fr' : '1fr', gap: '20px' }}>
                  {related.map(rp => (
                    <Link key={rp.slug} to={`/blog/${rp.slug}`} style={{ textDecoration: 'none' }}>
                      <div
                        style={{ background: '#fff', border: '1px solid var(--bdr)', borderRadius: '14px', overflow: 'hidden', transition: 'box-shadow 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--sh)'}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                      >
                        <img src={rp.cover} alt={`${rp.title} - Logic Loops AI`} style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }} loading="lazy" />
                        <div style={{ padding: '16px 18px 18px' }}>
                          <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '2px', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '6px' }}>{rp.category}</div>
                          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.35 }}>{rp.title}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })()}

          {/* AUTHOR CARD */}
          <div style={{
            marginTop: '60px',
            padding: '28px 32px',
            background: 'linear-gradient(135deg,rgba(122,28,28,0.05),rgba(122,28,28,0.02))',
            border: '1px solid var(--bdr)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}>
            <img
              src="/images/Copy_of_Untitled_Design__3_-removebg-preview.png"
              alt="Logic Loops AI"
              style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'contain', flexShrink: 0 }}
            />
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.95rem', marginBottom: '3px' }}>
                Logic Loops AI Team
              </div>
              <div style={{ color: 'var(--mut)', fontSize: '0.83rem', lineHeight: 1.6 }}>
                India's #1 AI automation agency. We build Make.com, n8n, and AI agent workflows for SaaS and D2C businesses globally.
              </div>
            </div>
          </div>

          {/* PREV / NEXT */}
          {(prev || next) && (
            <div style={{ marginTop: '52px', display: 'grid', gridTemplateColumns: prev && next ? '1fr 1fr' : '1fr', gap: '20px' }}>
              {prev && (
                <Link to={`/blog/${prev.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    padding: '20px 24px',
                    background: '#fff',
                    border: '1px solid var(--bdr)',
                    borderRadius: '14px',
                    transition: 'box-shadow 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--sh)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                  >
                    <div style={{ fontSize: '0.72rem', color: 'var(--mut)', marginBottom: '6px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>← Previous</div>
                    <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.9rem', lineHeight: 1.45 }}>{prev.title}</div>
                  </div>
                </Link>
              )}
              {next && (
                <Link to={`/blog/${next.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    padding: '20px 24px',
                    background: '#fff',
                    border: '1px solid var(--bdr)',
                    borderRadius: '14px',
                    textAlign: 'right',
                    transition: 'box-shadow 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--sh)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                  >
                    <div style={{ fontSize: '0.72rem', color: 'var(--mut)', marginBottom: '6px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Next →</div>
                    <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.9rem', lineHeight: 1.45 }}>{next.title}</div>
                  </div>
                </Link>
              )}
            </div>
          )}

          {/* CTA */}
          <div style={{
            marginTop: '60px',
            padding: '40px 36px',
            background: 'linear-gradient(148deg,var(--md) 0%,var(--maroon) 100%)',
            borderRadius: '18px',
            textAlign: 'center',
          }}>
            <div className="lbl" style={{ color: 'var(--gl)', marginBottom: '12px' }}>Free Strategy Call</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.6rem,2.8vw,2.2rem)', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.2, marginBottom: '12px' }}>
              Want Us to Build This <em style={{ color: 'var(--gl)', fontStyle: 'italic' }}>For You?</em>
            </h3>
            <p style={{ color: 'rgba(253,248,240,0.65)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '440px', margin: '0 auto 26px' }}>
              Book a free 30-minute call. We will scope the exact workflow for your business.
            </p>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg,var(--gold),var(--gl))',
                color: 'var(--md)',
                padding: '13px 30px',
                borderRadius: '9px',
                fontWeight: 700,
                fontSize: '0.9rem',
                textDecoration: 'none',
              }}
            >
              Book Free Call →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
