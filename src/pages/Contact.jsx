import { useState, useEffect, useRef } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

const WEBHOOK_URL = 'https://hook.eu2.make.com/u29nnwprpsk7c3zujr4aih8pbj32ntuj'

const inputStyle = {
  background: 'var(--white)',
  border: '1px solid var(--bdr)',
  borderRadius: '10px',
  padding: '12px 14px',
  color: 'var(--text)',
  fontFamily: "'DM Sans',sans-serif",
  fontSize: '0.88rem',
  outline: 'none',
  width: '100%',
}
const labelStyle = { fontSize: '0.79rem', fontWeight: 600, color: 'var(--text)' }
const fieldWrap = { display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '16px' }

function Field({ label, name, type = 'text', placeholder, required = false, disabled }) {
  return (
    <div style={fieldWrap}>
      <label style={labelStyle}>{label}{required ? ' *' : ''}</label>
      <input
        name={name} type={type} placeholder={placeholder} required={required} disabled={disabled}
        style={{ ...inputStyle, opacity: disabled ? 0.7 : 1 }}
        onFocus={e => { e.target.style.borderColor = 'var(--maroon)'; e.target.style.boxShadow = '0 0 0 3px rgba(122,28,28,0.08)' }}
        onBlur={e => { e.target.style.borderColor = 'var(--bdr)'; e.target.style.boxShadow = 'none' }}
      />
    </div>
  )
}

function SelectField({ label, name, required = false, disabled, children }) {
  return (
    <div style={fieldWrap}>
      <label style={labelStyle}>{label}{required ? ' *' : ''}</label>
      <select name={name} required={required} disabled={disabled} style={{ ...inputStyle, opacity: disabled ? 0.7 : 1 }}>
        {children}
      </select>
    </div>
  )
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const formRef = useRef(null)

  useScrollReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const fd = new FormData(formRef.current)
    const data = {
      firstName:         fd.get('firstName'),
      lastName:          fd.get('lastName'),
      email:             fd.get('email'),
      phone:             fd.get('phone') || '',
      company:           fd.get('company'),
      preferredPlatform: fd.get('preferredPlatform') || '',
      useCase:           fd.get('useCase'),
      budget:            fd.get('budget') || '',
      workflow:          fd.get('workflow'),
      submittedAt:       new Date().toISOString(),
      source:            'logicloopsai.com — Contact Form',
    }

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* PAGE HERO */}
      <section style={{ background: 'linear-gradient(158deg,var(--md) 0%,var(--maroon) 100%)', padding: '160px 5% 90px', textAlign: 'center' }}>
        <div className="mw">
          <div className="lbl" style={{ color: 'var(--gl)' }}>Get Started</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.8rem,4.8vw,4.2rem)', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.1, marginBottom: '20px' }}>
            Book Your <em style={{ color: 'var(--gl)', fontStyle: 'italic' }}>Free Consultation</em>
          </h1>
          <p style={{ color: 'rgba(253,248,240,0.7)', fontSize: '1.07rem', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto', fontWeight: 300 }}>
            Tell us about your business and we'll show you exactly how we can automate it.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ background: 'var(--white)', padding: '108px 5%' }}>
        <div className="mw">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.7fr', gap: '60px', alignItems: 'start' }} className="contact-resp">

            {/* LEFT */}
            <div className="fu">
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px' }}>Why Book a Call?</h3>
              <p className="sub" style={{ maxWidth: '100%', marginBottom: 0 }}>In 30 minutes, we'll map out exactly what's automatable in your business — free, no strings attached.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '36px' }}>
                {[
                  ['📞', 'Free 30-Minute Call', "We listen, analyse your workflow, and show what's possible. No hard sells."],
                  ['⚡', '24-Hour Response', 'Submit your enquiry and our team responds within one business day.'],
                  ['🌍', 'Global Clients', 'We work with businesses across North America, Europe, Middle East, and Asia.'],
                  ['🔒', 'Confidentiality First', 'NDAs available upon request before any discovery conversation begins.'],
                ].map(([ico, h, p]) => (
                  <div key={h} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '11px', background: 'linear-gradient(135deg,rgba(122,28,28,0.08),rgba(201,150,58,0.08))', border: '1px solid var(--bdr)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{ico}</div>
                    <div>
                      <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, marginBottom: '4px' }}>{h}</h4>
                      <p style={{ color: 'var(--mut)', fontSize: '0.84rem', fontWeight: 300, lineHeight: 1.6 }}>{p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FORM CARD */}
            <div className="fu" style={{ background: 'var(--cream)', border: '1px solid var(--bdr)', borderRadius: '24px', padding: '46px', boxShadow: 'var(--shl)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg,var(--maroon),var(--gold))' }} />

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ fontSize: '3rem' }}>🎉</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', color: 'var(--maroon)', margin: '16px 0 10px' }}>Request Received!</h3>
                  <p style={{ color: 'var(--mut)' }}>We'll reach out within 24 hours to schedule your free consultation!</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }} className="frow-resp">
                    <Field label="First Name" name="firstName" placeholder="John" required disabled={loading} />
                    <Field label="Last Name" name="lastName" placeholder="Smith" required disabled={loading} />
                    <Field label="Business Email" name="email" type="email" placeholder="john@company.com" required disabled={loading} />
                    <Field label="Phone Number" name="phone" type="tel" placeholder="+1 (555) 000-0000" disabled={loading} />
                    <Field label="Company Name" name="company" placeholder="Your Company" required disabled={loading} />
                    <SelectField label="Preferred Platform" name="preferredPlatform" disabled={loading}>
                      <option value="">Select...</option>
                      <option>Make.com</option>
                      <option>n8n</option>
                      <option>Zapier</option>
                      <option>Not Sure</option>
                    </SelectField>
                    <SelectField label="Use Case" name="useCase" required disabled={loading}>
                      <option value="">Select...</option>
                      <option>CRM &amp; Lead Automation</option>
                      <option>Meeting Intelligence</option>
                      <option>AI Cold Email Outreach</option>
                      <option>Finance &amp; Invoice Automation</option>
                      <option>Hotel/Property Management</option>
                      <option>SEO Content Automation</option>
                      <option>Custom AI Agent</option>
                      <option>Other</option>
                    </SelectField>
                    <SelectField label="Monthly Budget" name="budget" disabled={loading}>
                      <option value="">Select...</option>
                      <option>Under $500</option>
                      <option>$500–$1,500</option>
                      <option>$1,500–$5,000</option>
                      <option>$5,000+</option>
                    </SelectField>
                    <div style={{ ...fieldWrap, gridColumn: '1 / -1' }}>
                      <label style={labelStyle}>Describe Your Workflow *</label>
                      <textarea
                        name="workflow" required disabled={loading}
                        placeholder="What do you want to automate? What tools do you use? What manual task costs you the most time?"
                        style={{ ...inputStyle, resize: 'vertical', minHeight: '110px', opacity: loading ? 0.7 : 1 }}
                        onFocus={e => { e.target.style.borderColor = 'var(--maroon)'; e.target.style.boxShadow = '0 0 0 3px rgba(122,28,28,0.08)' }}
                        onBlur={e => { e.target.style.borderColor = 'var(--bdr)'; e.target.style.boxShadow = 'none' }}
                      />
                    </div>
                  </div>

                  {error && (
                    <div style={{ background: 'rgba(122,28,28,0.07)', border: '1px solid rgba(122,28,28,0.22)', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', color: 'var(--maroon)', fontSize: '0.87rem', textAlign: 'center' }}>
                      ⚠️ {error}
                    </div>
                  )}

                  <button
                    type="submit" disabled={loading}
                    style={{ width: '100%', marginTop: '6px', background: loading ? 'rgba(80,16,16,0.55)' : 'linear-gradient(135deg,var(--md),var(--maroon))', color: 'var(--cream)', padding: '15px 40px', borderRadius: '12px', fontWeight: 700, fontSize: '0.94rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans',sans-serif", transition: 'transform 0.2s,box-shadow 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                    onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 34px rgba(80,16,16,0.38)' }}}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    {loading ? <><span className="spinner" /> Sending...</> : '🚀 Book My Free Consultation →'}
                  </button>
                  <p style={{ textAlign: 'center', marginTop: '13px', fontSize: '0.76rem', color: 'var(--mut)' }}>✅ Free 30-min call · No commitment · Reply within 24 hours</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media(max-width:1100px){.contact-resp{grid-template-columns:1fr!important;}}
        @media(max-width:768px){.frow-resp{grid-template-columns:1fr!important;}}
        .spinner{display:inline-block;width:18px;height:18px;border:2px solid rgba(253,248,240,0.3);border-top-color:var(--cream);border-radius:50%;animation:spin 0.7s linear infinite;}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>
    </>
  )
}
