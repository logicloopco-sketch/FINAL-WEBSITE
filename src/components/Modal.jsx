import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const PROJECTS = {
  zoom: {
    title: 'Zoom Meeting AI Processing Pipeline',
    cat: 'Meeting Intelligence · Make.com',
    imgs: ['/images/zoom1.png', '/images/zoom2.png', '/images/zoom3.png'],
    desc: 'A fully automated meeting intelligence system. When a Zoom meeting ends, the pipeline classifies it (1-on-1, Group, Discovery, or Misc), converts to audio, transcribes with Whisper AI, generates an AI summary, stores in Pinecone for semantic search, and emails stakeholders — all within 5 minutes.',
    features: ['Auto-transcription with Whisper AI', 'AI-generated meeting summaries', '4 meeting type routing', 'Pinecone vector storage', 'Automatic Gmail delivery', 'Google Drive management', 'Full error handling & retry'],
    tools: ['Zoom API', 'Google Drive', 'OpenAI', 'Whisper AI', 'Pinecone', 'Gmail', 'Make.com']
  },
  lead: {
    title: 'AI Lead Management & CRM Automation',
    cat: 'CRM Automation · Make.com',
    imgs: ['/images/lead1.png'],
    desc: 'When a lead arrives via webhook, the system logs to Google Sheets, checks Pipedrive for duplicates, then follows smart paths. If exists: AI generates message, creates Deal + Note, fires Teams and Outlook alerts. If new: creates them first, then same AI flow. Completes in seconds.',
    features: ['Webhook-triggered automation', 'Duplicate contact detection', 'AI-generated personalized messages', 'Automatic Deal creation', 'Note with AI context', 'MS Teams notifications', 'Outlook alerts', 'Google Sheets logging'],
    tools: ['Webhook', 'Google Sheets', 'Pipedrive', 'OpenAI', 'MS Teams', 'Outlook', 'Make.com']
  },
  email: {
    title: 'AI Cold Email Outreach Pipeline',
    cat: 'Outreach Automation · Make.com',
    imgs: ['/images/email1.png'],
    desc: 'Scheduled automation that loads leads from Google Sheets, researches each company via Perplexity AI, then uses ChatGPT to generate hyper-personalized emails. Automatically adds to Instantly campaigns and updates Google Sheets — scaling outreach without scaling headcount.',
    features: ['Scheduled trigger', 'Perplexity AI research', 'ChatGPT personalization', 'Instantly campaign integration', 'Google Sheets tracking', 'Rate limiting & waits', 'Bulk loop processing'],
    tools: ['Google Sheets', 'Perplexity AI', 'ChatGPT', 'Instantly', 'Make.com']
  },
  qualify: {
    title: 'AI-Powered Lead Qualification System',
    cat: 'Lead Qualification · Make.com',
    imgs: ['/images/qualify1.png'],
    desc: 'OpenAI scores and qualifies every incoming lead via webhook, generating qualification insights and personalized messages. Logs to Google Sheets, routes to Pipedrive (new or existing), attaches AI notes, and fires simultaneous notifications to Teams and Outlook.',
    features: ['AI lead scoring', 'Qualification messaging', 'Dual routing', 'Pipedrive deal creation', 'AI note generation', 'Multi-channel notifications', 'Audit logging'],
    tools: ['Webhook', 'OpenAI', 'Pipedrive', 'Google Sheets', 'MS Teams', 'Outlook', 'Make.com']
  },
  hotel: {
    title: 'Fully Automated Hotel Management System',
    cat: 'Property Management · Make.com',
    imgs: ['/images/hotel1.png', '/images/hotel2.png', '/images/hotel3.png'],
    desc: 'Comprehensive property automation across Airbnb and Gather. Handles single and multi-room bookings, payment processing, and error recovery. QuickBooks module handles customer lookup, invoice creation, and sales receipts. Scheduled sync reconciles all records 24/7.',
    features: ['Airbnb booking automation', 'Gather platform integration', 'Multi-room handling', 'Payment processing', 'QuickBooks invoicing', 'Customer auto-creation', 'Scheduled data sync', 'Error recovery'],
    tools: ['Airbnb API', 'Gather', 'QuickBooks', 'Gmail', 'OpenAI', 'Make.com']
  },
  ghl: {
    title: 'Zoom → GoHighLevel Campaign Automation',
    cat: 'Marketing Automation · Make.com',
    imgs: ['/images/ghl1.png', '/images/ghl2.png'],
    desc: 'When a Zoom meeting ends, this pipeline logs attendee data to Google Sheets, updates GoHighLevel contacts and pipeline stages, then fires personalized email and SMS follow-up campaigns — creating a fully automated nurture sequence for every participant.',
    features: ['Zoom meeting end trigger', 'Attendee data capture', 'GHL contact updates', 'Automated email campaigns', 'SMS follow-ups', 'Google Sheets logging', 'Pipeline stage management'],
    tools: ['Zoom', 'GoHighLevel', 'Google Sheets', 'SMS', 'Email', 'Make.com']
  },
  seo: {
    title: 'AI SEO Content Automation Pipeline',
    cat: 'Content Automation · Make.com',
    imgs: ['/images/seo1.png'],
    desc: 'Monitors RSS feeds for trending topics, parses relevant content, uses ChatGPT to generate SEO-optimized focus keywords and descriptions, checks for duplicates, saves to Google Sheets, and notifies the team via Slack — zero manual effort.',
    features: ['RSS feed monitoring', 'Content parsing', 'ChatGPT keyword generation', 'SEO descriptions', 'Duplicate prevention', 'Google Sheets library', 'Slack notifications'],
    tools: ['Google Sheets', 'RSS Feeds', 'Text Parser', 'ChatGPT', 'Slack', 'Make.com']
  },
  xero: {
    title: 'Xero Invoice Automation via Google Sheets',
    cat: 'Finance Automation · Make.com',
    imgs: ['/images/xero1.png'],
    desc: 'Webhook-triggered system that reads invoicing rules from Google Sheets, uses smart routing for different invoice types, searches Xero contacts, creates invoices, retrieves URLs, and updates Google Sheets — eliminating all manual invoicing.',
    features: ['Webhook invoicing trigger', 'Google Sheets rules', 'Xero contact search', 'Auto invoice creation', 'Invoice URL retrieval', 'Sheets status updates', 'Multi-type routing'],
    tools: ['Xero', 'Google Sheets', 'Webhook', 'Opereto', 'Make.com']
  },
  apollo: {
    title: 'AI Lead Generation — Apollo + Apify → CRM',
    cat: 'Lead Generation · Make.com',
    imgs: ['/images/apollo1.png'],
    desc: 'Reads target job titles and locations from Google Sheets, searches Apollo.io, runs Apify data enrichment actors to validate leads, then automatically creates persons and leads in Pipedrive CRM — qualified prospects on complete autopilot.',
    features: ['Google Sheets config', 'Apollo.io prospect search', 'Apify data enrichment', 'Pipedrive deduplication', 'Person auto-creation', 'Lead record creation', 'Iterator bulk processing'],
    tools: ['Google Sheets', 'Apollo.io', 'Apify', 'Pipedrive', 'Make.com']
  }
}

export default function Modal({ projectKey, onClose }) {
  const [slideIdx, setSlideIdx] = useState(0)
  const p = PROJECTS[projectKey]

  useEffect(() => {
    setSlideIdx(0)
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [projectKey])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!p) return null

  const nextSlide = () => setSlideIdx((i) => (i + 1) % p.imgs.length)
  const prevSlide = () => setSlideIdx((i) => (i - 1 + p.imgs.length) % p.imgs.length)

  return (
    <div className="mo open" onClick={(e) => { if (e.target.classList.contains('mo')) onClose() }}>
      <div className="modal">
        <div className="mhd">
          <h2>{p.title}</h2>
          <button className="mclose" onClick={onClose}>✕</button>
        </div>
        <div className="mbody">
          <div className="mcat">{p.cat}</div>
          <div className="slider-wrap">
            <div className="s-track" style={{ transform: `translateX(-${slideIdx * 100}%)` }}>
              {p.imgs.map((src, i) => (
                <div className="s-slide" key={i}>
                  <img src={src} alt={p.title} loading="lazy" />
                </div>
              ))}
            </div>
            {p.imgs.length > 1 && (
              <>
                <button className="s-btn s-prev" onClick={prevSlide}>&#8592;</button>
                <button className="s-btn s-next" onClick={nextSlide}>&#8594;</button>
                <div className="s-dots">
                  {p.imgs.map((_, i) => (
                    <div key={i} className={`s-dot${i === slideIdx ? ' on' : ''}`} onClick={() => setSlideIdx(i)} />
                  ))}
                </div>
              </>
            )}
          </div>
          <p className="m-desc">{p.desc}</p>
          <div className="m-feats">
            <h4>Key Features</h4>
            <div className="feat-list">
              {p.features.map((f, i) => <div className="feat" key={i}>{f}</div>)}
            </div>
          </div>
          <div className="m-stack">
            <h4>Tech Stack</h4>
            <div className="mpills">
              {p.tools.map((t, i) => <span className="mpill" key={i}>{t}</span>)}
            </div>
          </div>
          <div className="mcta">
            <Link to="/contact" onClick={onClose}>Get a Similar Automation →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
