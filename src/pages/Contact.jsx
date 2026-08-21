import { useState } from 'react'
import { Phone, Mail, MessageCircle, Calendar, Send, Clock, Globe, Check } from 'lucide-react'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import useScrollReveal from '../hooks/useScrollReveal'
import { SITE, waLink } from '../data/site'

export default function Contact() {
  useScrollReveal()
  const [status, setStatus] = useState('idle') // idle | sending | ok | error

  async function onSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.target)
    try {
      const res = await fetch(SITE.formEndpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) { setStatus('ok'); e.target.reset() }
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main id="main">
      <SEO
        title="Contact Us | Book a Free AI Automation Call — Logic Loops AI"
        description="Get in touch with Logic Loops AI. Book a free 30-minute call, send a message, or WhatsApp us. UK, US, Australia, Canada."
        path="/contact"
        keywords="contact Logic Loops AI, book automation call, AI automation consultation"
      />

      <PageHero
        tag="Contact"
        title={<>Let's talk <span className="em">automation</span></>}
        sub="Tell us what's slowing your team down. We'll show you what we can automate, host, and manage for you — free, in 30 minutes."
      >
        <div className="hv-methods">
          <div className="hv-method"><span className="hv-ico"><Phone /></span> Book a call</div>
          <div className="hv-method"><span className="hv-ico"><Mail /></span> Send a message</div>
          <div className="hv-method"><span className="hv-ico"><MessageCircle /></span> WhatsApp us</div>
          <div className="hv-method hv-method-badge"><Clock size={15} /> Replies in under 4h</div>
        </div>
      </PageHero>

      {/* 3 contact columns (cream) */}
      <section className="section section-light">
        <div className="container">
          <div className="grid grid-3 contact-grid">
            {/* Book a call */}
            <div className="card contact-col fu">
              <span className="deliver-icon"><Calendar /></span>
              <h3 className="h3">Book a call</h3>
              <p>A free 30-minute discovery call. We map your workflows and show you what's worth automating — no pitch.</p>
              <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-navy mt-auto">Pick a time <Calendar size={16} /></a>
              <span className="contact-note">Opens our Calendly — pick any 30-minute slot.</span>
            </div>

            {/* Send a message */}
            <div className="card contact-col contact-form-col fu" style={{ '--d': '90ms' }}>
              <span className="deliver-icon"><Send /></span>
              <h3 className="h3">Send a message</h3>
              {status === 'ok' ? (
                <div className="form-success"><Check /> Thanks — we'll reply within 4 hours.</div>
              ) : (
                <form className="contact-form" onSubmit={onSubmit}>
                  <label>Name<input name="name" type="text" required autoComplete="name" /></label>
                  <label>Email<input name="email" type="email" required autoComplete="email" /></label>
                  <label>Company<input name="company" type="text" autoComplete="organization" /></label>
                  <label>Message<textarea name="message" rows="3" required /></label>
                  <button className="btn btn-navy" type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : <>Send message <Send size={16} /></>}
                  </button>
                  {status === 'error' && <span className="form-error">Something went wrong — please email us directly.</span>}
                </form>
              )}
            </div>

            {/* WhatsApp */}
            <div className="card contact-col fu" style={{ '--d': '180ms' }}>
              <span className="deliver-icon"><MessageCircle /></span>
              <h3 className="h3">WhatsApp us</h3>
              <p>Prefer to chat? Message us on WhatsApp and we'll get straight back to you during business hours.</p>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-navy mt-auto">Chat on WhatsApp <MessageCircle size={16} /></a>
              <span className="contact-note">{SITE.email}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Response promise (navy) */}
      <section className="section section-dark">
        <div className="container">
          <div className="promise-grid">
            <div className="promise-item fu"><span className="promise-ico"><Clock /></span><b>Under 4 hours</b><span>Typical first response</span></div>
            <div className="promise-item fu" style={{ '--d': '80ms' }}><span className="promise-ico"><Globe /></span><b>UK · US · AU · CA</b><span>Timezone-friendly support</span></div>
            <div className="promise-item fu" style={{ '--d': '160ms' }}><span className="promise-ico"><Check /></span><b>No pressure</b><span>Just honest advice</span></div>
          </div>
        </div>
      </section>
    </main>
  )
}
