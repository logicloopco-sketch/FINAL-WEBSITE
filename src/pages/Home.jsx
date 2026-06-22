import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import useTilt3D from '../hooks/useTilt3D'
import useFlipReveal from '../hooks/useFlipReveal'
import NodeCanvas from '../animations/NodeCanvas'
import Particles from '../animations/Particles'
import FAQSection from '../components/FAQSection'
import { blogPosts } from '../data/blogPosts'
import '../styles/animations.css'

const homeFaqs = [
  {
    q: 'What types of businesses benefit most from AI automation?',
    a: 'Any business with repetitive, rule-based tasks benefits — agencies, SaaS companies, e-commerce stores, real estate firms, hospitality groups, and professional service providers. If your team spends time on manual data entry, follow-ups, reporting, or connecting tools, automation can eliminate that work entirely.'
  },
  {
    q: 'How is working with Logic Loops AI different from hiring a developer or freelancer?',
    a: 'Developers build custom code that requires ongoing maintenance and technical knowledge. We use no-code and low-code automation platforms (Make.com, n8n, Zapier) meaning faster delivery, lower cost, and workflows your team can monitor and understand — no black-box code dependencies.'
  },
  {
    q: 'Will automation break my existing tools or disrupt my operations?',
    a: 'No. We build automations that connect to your existing stack via APIs — nothing is replaced or disrupted. Your team continues using the same tools while the automation handles the manual steps running silently in the background.'
  },
  {
    q: 'Do I need to sign a long-term contract?',
    a: 'No long-term contracts are required for project work. We deliver your automation, you pay on completion. For ongoing maintenance retainers, we offer flexible monthly arrangements with no lock-in periods.'
  },
  {
    q: 'How quickly can I see my automation running?',
    a: 'Simple automations can be live in as little as 3–5 business days. Most projects go live within 1–2 weeks. We prioritise fast, clean delivery because we know your time has value.'
  },
]

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

/* ─── Platform logo chip ─────────────────────────────────── */
function PlatformChip({ slug, name }) {
  const [err, setErr] = useState(false)
  const url = slug ? `https://cdn.simpleicons.org/${slug}/ffffff` : null
  return (
    <div className="platform-chip" style={{ background:'rgba(253,248,240,0.07)', border:'1px solid rgba(253,248,240,0.11)', borderRadius:'10px', padding:'10px 18px', fontSize:'0.81rem', fontWeight:500, whiteSpace:'nowrap', color:'rgba(253,248,240,0.7)', display:'flex', alignItems:'center', gap:'9px', flexShrink:0 }}>
      {url && !err
        ? <img src={url} alt={name} width={16} height={16} style={{ objectFit:'contain', flexShrink:0, opacity:0.9 }} onError={() => setErr(true)} />
        : <span style={{ width:16, height:16, borderRadius:4, background:'linear-gradient(135deg,rgba(201,150,58,0.7),rgba(122,28,28,0.7))', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:'0.48rem', fontWeight:800, color:'#fff', flexShrink:0, letterSpacing:'0.3px' }}>
            {name.replace(/[^A-Za-z0-9]/g,'').slice(0,2).toUpperCase()}
          </span>
      }
      {name}
    </div>
  )
}

/* ─── Agent mini-card for the scrolling ticker ───────────── */
const TICKER_AGENTS = [
  { id:'lead-router-ai',           firstName:'Arjun',     role:'Lead Router AI',            blurb:'Assigns every new lead to the next available rep — instantly, fairly, every time.',            time:'4 hrs/week',  cost:'£640/mo',    color:'#7a1c1c' },
  { id:'win-back-campaign-ai',     firstName:'Meera',     role:'Win-Back Campaign AI',       blurb:'Fires an automatic follow-up sequence the moment a deal is lost.',                             time:'3 hrs/week',  cost:'£480/mo',    color:'#7a1c1c' },
  { id:'deal-recovery-ai',         firstName:'Vikram',    role:'Deal Recovery AI',           blurb:'Reopens and reassigns cancelled or rejected deals for a second chance.',                       time:'2 hrs/week',  cost:'£320/mo',    color:'#7a1c1c' },
  { id:'renewal-reminder-ai',      firstName:'Ananya',    role:'Renewal Reminder AI',        blurb:'Flags contracts nearing renewal and routes them to a rep automatically.',                      time:'4 hrs/week',  cost:'£640/mo',    color:'#c9963a' },
  { id:'upsell-builder-ai',        firstName:'Rishi',     role:'Upsell Builder AI',          blurb:"Builds a renewal deal from a customer's order history, ready for a rep to action.",           time:'3 hrs/week',  cost:'£480/mo',    color:'#c9963a' },
  { id:'email-tracker-ai',         firstName:'Kavya',     role:'Email Tracker AI',           blurb:'Logs every call and email into the CRM automatically the moment it happens.',                 time:'2 hrs/week',  cost:'£320/mo',    color:'#7a1c1c' },
  { id:'contract-generator-ai',    firstName:'Siddharth', role:'Contract Generator AI',      blurb:'Generates a pre-filled contract PDF the moment a deal is won and sends it for e-signature.',  time:'6 hrs/week',  cost:'£960/mo',    color:'#c9963a' },
  { id:'document-filing-ai',       firstName:'Priya',     role:'Document Filing AI',         blurb:'Saves every signed document to the correct client folder — automatically, zero manual filing.',time:'2 hrs/week',  cost:'£320/mo',    color:'#c9963a' },
  { id:'order-form-builder-ai',    firstName:'Rohan',     role:'Order Form Builder AI',      blurb:'Generates a pre-filled order form and sends it to the customer the moment a deal is won.',    time:'5 hrs/week',  cost:'£800/mo',    color:'#c9963a' },
  { id:'review-collector-ai',      firstName:'Neha',      role:'Review Collector AI',        blurb:'Sends a review request automatically at the right moment — after delivery, not forgotten.',    time:'3 hrs/week',  cost:'£480/mo',    color:'#c9963a' },
  { id:'onboarding-ai',            firstName:'Aryan',     role:'Onboarding AI',              blurb:'Triggers the full onboarding sequence the moment a new customer is added to the CRM.',        time:'1 hr/week',   cost:'£160/mo',    color:'#c9963a' },
  { id:'sales-dashboard-ai',       firstName:'Shreya',    role:'Sales Dashboard AI',         blurb:'Compiles call volumes, revenue, and pipeline data into a report delivered every morning.',    time:'5 hrs/week',  cost:'£800/mo',    color:'#a07828' },
  { id:'data-sync-ai',             firstName:'Kiran',     role:'Data Sync AI',               blurb:'Keeps your CRM and every connected tool in sync — contacts, deals, and statuses updated live.',time:'6 hrs/week', cost:'£960/mo',    color:'#5c3d2e' },
  { id:'field-update-tracker-ai',  firstName:'Aditya',    role:'Field Update Tracker AI',    blurb:'Logs every field change in the CRM with a timestamp and the user who made it.',               time:'4 hrs/week',  cost:'£640/mo',    color:'#5c3d2e' },
  { id:'deal-won-orchestrator-ai', firstName:'Dhruv',     role:'Deal-Won Orchestrator AI',   blurb:'Fires every next step at once the moment any deal is marked won on any pipeline.',            time:'7 hrs/week',  cost:'£1,120/mo',  color:'#5c3d2e' },
  { id:'invoice-generator-ai',     firstName:'Tanvi',     role:'Invoice Generator AI',       blurb:'Builds and sends the invoice the moment the order form is signed — no manual billing.',       time:'4 hrs/week',  cost:'£640/mo',    color:'#9b2c2c' },
  { id:'payment-reminder-ai',      firstName:'Karan',     role:'Payment Reminder AI',        blurb:'Chases overdue invoices automatically, before they become a write-off.',                      time:'3 hrs/week',  cost:'£480/mo',    color:'#9b2c2c' },
  { id:'payment-reconciliation-ai',firstName:'Diya',      role:'Payment Reconciliation AI',  blurb:'Matches every incoming payment to the right invoice and closes it automatically.',            time:'3 hrs/week',  cost:'£480/mo',    color:'#9b2c2c' },
  { id:'recurring-billing-ai',     firstName:'Rahul',     role:'Recurring Billing AI',       blurb:'Generates and sends the recurring invoice automatically, every cycle, on time.',              time:'2 hrs/week',  cost:'£320/mo',    color:'#9b2c2c' },
  { id:'expense-approval-ai',      firstName:'Pooja',     role:'Expense Approval AI',        blurb:'Routes every expense claim to the right approver and logs the outcome automatically.',        time:'2 hrs/week',  cost:'£320/mo',    color:'#9b2c2c' },
  { id:'data-enrichment-ai',       firstName:'Ishaan',    role:'Data Enrichment AI',         blurb:'Enriches every new lead with company and contact details the second it lands.',               time:'2 hrs/week',  cost:'£320/mo',    color:'#8b6f5e' },
  { id:'pipeline-health-ai',       firstName:'Simran',    role:'Pipeline Health AI',         blurb:'Flags deals that have gone quiet and alerts the rep before they go cold.',                    time:'2 hrs/week',  cost:'£320/mo',    color:'#8b6f5e' },
  /* ── Sales & CRM (4 new) ── */
  { id:'apollo-lead-ai',           firstName:'James',     role:'Apollo Lead Gen AI',            blurb:'Pulls fresh leads from Apollo, parses them with AI, and fires timed follow-up emails.',          time:'3 hrs/week',  cost:'£480/mo',    color:'#7a1c1c' },
  { id:'ai-lead-nurture-ai',       firstName:'Oliver',    role:'Lead Nurture AI',               blurb:'Drafts personalised nurture emails using ChatGPT and Gemini, ready for one-click send.',         time:'3 hrs/week',  cost:'£480/mo',    color:'#7a1c1c' },
  { id:'cold-email-tracker-ai',    firstName:'Emma',      role:'Cold Email Tracker AI',         blurb:'Syncs cold email open, click, and reply rates from Smartlead into Google Sheets automatically.',  time:'2 hrs/week',  cost:'£320/mo',    color:'#7a1c1c' },
  { id:'erp-lead-manager-ai',      firstName:'Charlotte', role:'ERP Lead Manager AI',           blurb:'Captures inquiries in ERPNext and routes them to the right rep with AI-generated responses.',    time:'4 hrs/week',  cost:'£640/mo',    color:'#7a1c1c' },
  /* ── Customer Journey (5 new) ── */
  { id:'booking-assistant-ai',     firstName:'Harry',     role:'Booking Assistant AI',          blurb:'Handles customer support questions and books calendar appointments automatically via AI.',         time:'3 hrs/week',  cost:'£480/mo',    color:'#c9963a' },
  { id:'email-responder-ai',       firstName:'Sophie',    role:'Smart Email Responder AI',      blurb:'Classifies incoming emails by intent and drafts a smart reply using Gemini AI instantly.',        time:'2 hrs/week',  cost:'£320/mo',    color:'#c9963a' },
  { id:'reservation-ai',           firstName:'William',   role:'Reservation Manager AI',        blurb:'Takes reservations via Telegram, confirms with Gemini AI, and logs them in Google Sheets.',      time:'3 hrs/week',  cost:'£480/mo',    color:'#c9963a' },
  { id:'form-reply-ai',            firstName:'Lily',      role:'Form Auto-Reply AI',            blurb:'Captures Tally form submissions, stores them in Airtable, and sends a Gmail confirmation.',      time:'2 hrs/week',  cost:'£320/mo',    color:'#c9963a' },
  { id:'telegram-agent-ai',        firstName:'Jack',      role:'Telegram AI Agent',             blurb:'Processes text, audio, and image messages on Telegram with a full AI agent.',                     time:'2 hrs/week',  cost:'£320/mo',    color:'#c9963a' },
  /* ── Finance (5 new) ── */
  { id:'stripe-payment-notify-ai', firstName:'Grace',     role:'Stripe Payment Notifier AI',    blurb:"Sends a WhatsApp receipt to customers the moment a Stripe payment completes.",                    time:'2 hrs/week',  cost:'£320/mo',    color:'#9b2c2c' },
  { id:'order-fulfil-ai',          firstName:'Thomas',    role:'Order Fulfillment AI',          blurb:'Marks Squarespace orders as fulfilled automatically, eliminating manual order management.',        time:'3 hrs/week',  cost:'£480/mo',    color:'#9b2c2c' },
  { id:'sales-report-ai',          firstName:'Olivia',    role:'Sales Report Puller AI',        blurb:'Pulls Square daily sales summaries and formats them for automated reporting.',                    time:'3 hrs/week',  cost:'£480/mo',    color:'#9b2c2c' },
  { id:'revenue-spike-ai',         firstName:'George',    role:'Revenue Spike Monitor AI',      blurb:'Monitors WooCommerce daily revenue and sends a Slack alert when targets are hit.',                time:'2 hrs/week',  cost:'£320/mo',    color:'#9b2c2c' },
  { id:'stock-insight-ai',         firstName:'Isla',      role:'Stock Insight AI',              blurb:'Delivers real-time stock market insights powered by xAI to your preferred channel.',              time:'2 hrs/week',  cost:'£320/mo',    color:'#9b2c2c' },
  /* ── Reporting (9 new) ── */
  { id:'ga-report-ai',             firstName:'Henry',     role:'GA Report AI',                  blurb:'Extracts Google Analytics metrics, formats them, and emails the report automatically.',            time:'3 hrs/week',  cost:'£480/mo',    color:'#a07828' },
  { id:'youtube-stats-ai',         firstName:'Poppy',     role:'YouTube Stats AI',              blurb:'Pulls YouTube video performance metrics and logs them in Google Sheets automatically.',            time:'2 hrs/week',  cost:'£320/mo',    color:'#a07828' },
  { id:'seo-audit-ai',             firstName:'Edward',    role:'SEO Audit AI',                  blurb:'Runs competitor SEO analysis via SEMrush and logs findings in Google Sheets automatically.',      time:'3 hrs/week',  cost:'£480/mo',    color:'#a07828' },
  { id:'fb-ads-insight-ai',        firstName:'Freya',     role:'Facebook Ads Insight AI',       blurb:'Extracts Facebook Ads data, runs Gemini AI analysis, and pushes insights to Google Sheets.',      time:'3 hrs/week',  cost:'£480/mo',    color:'#a07828' },
  { id:'ga4-email-ai',             firstName:'Charlie',   role:'GA4 Email Report AI',           blurb:'Pulls GA4 data, generates AI insights, and emails a formatted performance report.',               time:'3 hrs/week',  cost:'£480/mo',    color:'#a07828' },
  { id:'ga-airtable-ai',           firstName:'Daisy',     role:'Analytics to Airtable AI',      blurb:'Transfers Google Analytics data to an Airtable database automatically on schedule.',              time:'2 hrs/week',  cost:'£320/mo',    color:'#a07828' },
  { id:'tiktok-analytics-ai',      firstName:'Noah',      role:'TikTok Analytics AI',           blurb:'Tracks TikTok account performance metrics and logs them to Google Sheets automatically.',         time:'2 hrs/week',  cost:'£320/mo',    color:'#a07828' },
  { id:'newsletter-brief-ai',      firstName:'Ava',       role:'Newsletter Briefing AI',        blurb:'Summarises incoming newsletters with AI and delivers a daily briefing email.',                    time:'2 hrs/week',  cost:'£320/mo',    color:'#a07828' },
  { id:'crunchbase-scout-ai',      firstName:'Liam',      role:'Crunchbase Scout AI',           blurb:'Scrapes recent funding rounds from Crunchbase and delivers them as sales triggers.',              time:'2 hrs/week',  cost:'£320/mo',    color:'#a07828' },
  /* ── CRM Optimisation (8 new) ── */
  { id:'linkedin-to-hubspot-ai',   firstName:'Isabella',  role:'LinkedIn to HubSpot AI',        blurb:'Creates HubSpot contacts from people who interact with LinkedIn posts automatically.',             time:'3 hrs/week',  cost:'£480/mo',    color:'#8b6f5e' },
  { id:'airtable-hubspot-sync-ai', firstName:'Mason',     role:'Airtable-HubSpot Sync AI',      blurb:'Keeps contacts perfectly synced two-ways between Airtable and HubSpot, always.',                 time:'4 hrs/week',  cost:'£640/mo',    color:'#8b6f5e' },
  { id:'deal-distributor-ai',      firstName:'Ethan',     role:'Deal Distributor AI',           blurb:'Routes won deals to Slack for celebration and lost deals to Airtable for analysis.',              time:'2 hrs/week',  cost:'£320/mo',    color:'#8b6f5e' },
  { id:'contact-enrichment-ai',    firstName:'Mia',       role:'Contact Enrichment AI',         blurb:'Enriches HubSpot contacts with AI-sourced company data, filling every blank field.',              time:'3 hrs/week',  cost:'£480/mo',    color:'#8b6f5e' },
  { id:'lead-router-gpt-ai',       firstName:'Logan',     role:'GPT Lead Router AI',            blurb:'Uses GPT-4 to match HubSpot leads to the best-fit rep based on Airtable profiles.',               time:'4 hrs/week',  cost:'£640/mo',    color:'#8b6f5e' },
  { id:'domain-enrich-ai',         firstName:'Aiden',     role:'Domain Traffic Enricher AI',    blurb:'Enriches domain lists with SimilarWeb traffic data in Google Sheets and Airtable.',               time:'2 hrs/week',  cost:'£320/mo',    color:'#8b6f5e' },
  { id:'typeform-lead-ai',         firstName:'Amelia',    role:'Typeform Lead Scorer AI',       blurb:'Captures Typeform leads, scores them, and sends Slack alerts for high-priority prospects.',       time:'3 hrs/week',  cost:'£480/mo',    color:'#8b6f5e' },
  { id:'linkedin-leads-ai',        firstName:'Lucas',     role:'LinkedIn Lead Qualifier AI',    blurb:'Turns LinkedIn post reactions into qualified leads using AI profile scoring and Apify.',           time:'3 hrs/week',  cost:'£480/mo',    color:'#8b6f5e' },
  /* ── Bespoke (7 new) ── */
  { id:'webhook-builder-ai',       firstName:'Harper',    role:'Webhook Builder AI',            blurb:'Creates custom n8n workflows on demand via webhook without touching the n8n editor.',              time:'4 hrs/week',  cost:'£640/mo',    color:'#5c3d2e' },
  { id:'error-retry-ai',           firstName:'Jackson',   role:'Error Recovery AI',             blurb:'Automatically retries failed workflow steps with exponential backoff and failure alerts.',         time:'2 hrs/week',  cost:'£320/mo',    color:'#5c3d2e' },
  { id:'drive-airtable-ai',        firstName:'Evelyn',    role:'Drive to Airtable Sync AI',     blurb:'Monitors Google Drive for new files and logs them with metadata into Airtable automatically.',    time:'2 hrs/week',  cost:'£320/mo',    color:'#5c3d2e' },
  { id:'zoom-archive-ai',          firstName:'Sebastian', role:'Zoom Archive AI',               blurb:'Saves Zoom recordings to Google Drive and logs meeting details in Airtable automatically.',       time:'2 hrs/week',  cost:'£320/mo',    color:'#5c3d2e' },
  { id:'order-reward-ai',          firstName:'Abigail',   role:'Order Reward AI',               blurb:'Sends order confirmations and first-buyer discount coupons automatically after payment.',          time:'2 hrs/week',  cost:'£320/mo',    color:'#5c3d2e' },
  { id:'team-invite-ai',           firstName:'Matthew',   role:'Team Onboarder AI',             blurb:'Reads a Google Sheet team roster and automatically invites new users to n8n.',                    time:'2 hrs/week',  cost:'£320/mo',    color:'#5c3d2e' },
  { id:'meeting-prep-ai',          firstName:'Emily',     role:'Meeting Prep AI',               blurb:'Enriches prospects via Bright Data when a Cal.com meeting is booked and logs to Airtable.',       time:'3 hrs/week',  cost:'£480/mo',    color:'#5c3d2e' },
  /* ── Marketing Automation (10 new) ── */
  { id:'social-visuals-ai',        firstName:'Alexander', role:'Social Visuals Publisher AI',   blurb:'Generates platform-specific social graphics with Abyssale and publishes via Blotato.',            time:'4 hrs/week',  cost:'£640/mo',    color:'#b5651d' },
  { id:'festival-post-ai',         firstName:'Elizabeth', role:'Festival Post AI',              blurb:'Creates and posts festival-themed content to X and Facebook automatically with Gemini AI.',       time:'2 hrs/week',  cost:'£320/mo',    color:'#b5651d' },
  { id:'newsletter-gen-ai',        firstName:'Daniel',    role:'Newsletter Generator AI',       blurb:'Builds a personalised daily newsletter from RSS feeds using Google Gemini and delivers it.',      time:'3 hrs/week',  cost:'£480/mo',    color:'#b5651d' },
  { id:'gmail-sort-ai',            firstName:'Sofia',     role:'Gmail Sorter AI',               blurb:'Classifies and labels every incoming Gmail email using Google Gemini AI automatically.',          time:'2 hrs/week',  cost:'£320/mo',    color:'#b5651d' },
  { id:'blog-rss-ai',              firstName:'Michael',   role:'Blog Content AI',               blurb:'Monitors RSS feeds and generates SEO-optimised blog posts with Gemini, delivered via Telegram.',  time:'3 hrs/week',  cost:'£480/mo',    color:'#b5651d' },
  { id:'wp-blog-ai',               firstName:'Avery',     role:'WordPress Blog AI',             blurb:'Generates and publishes scheduled or on-demand blog posts to WordPress using AI.',                time:'4 hrs/week',  cost:'£640/mo',    color:'#b5651d' },
  { id:'rss-social-ai',            firstName:'Owen',      role:'RSS to Social AI',              blurb:'Transforms RSS articles into AI-summarised social posts with images and auto-publishes.',         time:'3 hrs/week',  cost:'£480/mo',    color:'#b5651d' },
  { id:'blogger-post-ai',          firstName:'Ella',      role:'Blogger Post AI',               blurb:'Generates SEO blog posts from current news via OpenRouter AI and publishes to Blogger.',          time:'3 hrs/week',  cost:'£480/mo',    color:'#b5651d' },
  { id:'cold-icebreaker-ai',       firstName:'Wyatt',     role:'Cold Email Icebreaker AI',      blurb:'Generates personalised cold email icebreakers from LinkedIn or website data using GPT-4.',        time:'3 hrs/week',  cost:'£480/mo',    color:'#b5651d' },
  { id:'shopify-blog-ai',          firstName:'Scarlett',  role:'Shopify Blog AI',               blurb:'Generates SEO and AEO-optimised blog articles for Shopify stores using GPT-4.',                  time:'4 hrs/week',  cost:'£640/mo',    color:'#b5651d' },
  /* ── Customer Support Automation (10 new) ── */
  { id:'ticket-classify-ai',       firstName:'Luke',      role:'Ticket Classifier AI',          blurb:'Triages support tickets with multi-model AI classification against a knowledge base.',            time:'4 hrs/week',  cost:'£640/mo',    color:'#6f4e37' },
  { id:'jira-from-email-ai',       firstName:'Victoria',  role:'Outlook-to-Jira AI',            blurb:'Converts Outlook support emails into Jira issues automatically using AI prioritisation.',         time:'3 hrs/week',  cost:'£480/mo',    color:'#6f4e37' },
  { id:'zendesk-ticket-ai',        firstName:'Ryan',      role:'Zendesk Ticketer AI',           blurb:'Creates Zendesk support tickets automatically from multiple incoming channels.',                  time:'2 hrs/week',  cost:'£320/mo',    color:'#6f4e37' },
  { id:'hubspot-sla-ai',           firstName:'Madison',   role:'SLA Guardian AI',               blurb:'Triages HubSpot tickets, creates Jira issues for high-priority ones, and sends Slack SLA alerts.',time:'4 hrs/week', cost:'£640/mo',    color:'#6f4e37' },
  { id:'gemini-email-ai',          firstName:'Nathan',    role:'Gemini Email Manager AI',       blurb:'Categorises Gmail emails with Gemini AI and replies, drafts, or archives them intelligently.',    time:'3 hrs/week',  cost:'£480/mo',    color:'#6f4e37' },
  { id:'auto-responder-ai',        firstName:'Luna',      role:'Smart Auto-Responder AI',       blurb:'Sends AI-generated smart replies to emails while integrating with CRM and marketing tools.',      time:'3 hrs/week',  cost:'£480/mo',    color:'#6f4e37' },
  { id:'feedback-router-ai',       firstName:'Adam',      role:'Feedback Router AI',            blurb:'Analyses customer feedback across Gmail, Zendesk, and Slack using AI and routes it to Pipedrive.',time:'4 hrs/week',  cost:'£640/mo',    color:'#6f4e37' },
  { id:'human-loop-ai',            firstName:'Chloe',     role:'Human-in-Loop Email AI',        blurb:'Drafts AI email replies via IMAP and holds them for human review before sending.',                time:'3 hrs/week',  cost:'£480/mo',    color:'#6f4e37' },
  { id:'gmail-alert-ai',           firstName:'Tyler',     role:'Gmail Alert AI',                blurb:'Classifies Gmail emails with GPT-4o mini and sends priority alerts via Telegram.',                time:'2 hrs/week',  cost:'£320/mo',    color:'#6f4e37' },
  { id:'email-memory-ai',          firstName:'Penelope',  role:'Email Memory AI',               blurb:'Parses Gmail emails with AI and stores structured intelligence in Mem0 for RAG agents.',          time:'3 hrs/week',  cost:'£480/mo',    color:'#6f4e37' },
  /* ── HR & Recruitment Automation (10 new) ── */
  { id:'cv-intake-ai',             firstName:'Benjamin',  role:'CV Intake AI',                  blurb:'Handles job application submissions via n8n forms and routes them with AI screening.',             time:'4 hrs/week',  cost:'£640/mo',    color:'#8a6d3a' },
  { id:'resume-scorer-ai',         firstName:'Layla',     role:'Resume Scorer AI',              blurb:'Uses OpenAI to score and rank CVs against a job description, logging results in Google Sheets.',  time:'3 hrs/week',  cost:'£480/mo',    color:'#8a6d3a' },
  { id:'job-hunter-ai',            firstName:'Joseph',    role:'Job Hunter AI',                 blurb:'Finds matching jobs via Google Jobs and SerpAPI and generates tailored cover letters with Gemini.',time:'3 hrs/week',  cost:'£480/mo',    color:'#8a6d3a' },
  { id:'cv-ranker-ai',             firstName:'Riley',     role:'CV Ranker AI',                  blurb:'Compares multiple CVs against a job description with OpenAI and ranks candidates by fit.',        time:'4 hrs/week',  cost:'£640/mo',    color:'#8a6d3a' },
  { id:'linkedin-jobs-ai',         firstName:'Samuel',    role:'LinkedIn Jobs AI',              blurb:'Scrapes LinkedIn job listings via RSS and Gemini AI, storing results in Google Sheets.',          time:'3 hrs/week',  cost:'£480/mo',    color:'#8a6d3a' },
  { id:'jobs-newsletter-ai',       firstName:'Zoey',      role:'Jobs Newsletter AI',            blurb:'Aggregates job postings with AI and distributes a curated newsletter to subscribers.',            time:'3 hrs/week',  cost:'£480/mo',    color:'#8a6d3a' },
  { id:'policy-compliance-ai',     firstName:'Andrew',    role:'Policy Compliance AI',          blurb:'Monitors employee communications for policy violations using GPT-4 and alerts via Slack.',         time:'4 hrs/week',  cost:'£640/mo',    color:'#8a6d3a' },
  { id:'hyperperson-outreach-ai',  firstName:'Nora',      role:'Outreach Personalizer AI',      blurb:'Pulls leads from Apollo, enriches with LinkedIn, and sends hyperpersonalised emails via SendGrid.',time:'4 hrs/week',  cost:'£640/mo',    color:'#8a6d3a' },
  { id:'linkedin-cv-ai',           firstName:'Dylan',     role:'LinkedIn Profile Extractor AI', blurb:'Scrapes LinkedIn profiles with Bright Data and builds structured JSON resumes with Gemini.',      time:'3 hrs/week',  cost:'£480/mo',    color:'#8a6d3a' },
  { id:'job-app-ai',               firstName:'Hannah',    role:'Job Application AI',            blurb:'Generates tailored CVs, cover letters, and interview prep from LinkedIn jobs using AI.',           time:'3 hrs/week',  cost:'£480/mo',    color:'#8a6d3a' },
  /* ── IT & Security Automation (10 new) ── */
  { id:'attack-surface-ai',        firstName:'Brandon',   role:'Attack Surface Mapper AI',      blurb:'Maps external attack surfaces via Shodan and DNS enumeration, surfacing exposed assets.',         time:'5 hrs/week',  cost:'£800/mo',    color:'#4a2c2a' },
  { id:'github-monitor-ai',        firstName:'Ellie',     role:'GitHub Monitor AI',             blurb:'Monitors GitHub events in real time and routes notifications to Slack, email, or project tools.',  time:'2 hrs/week',  cost:'£320/mo',    color:'#4a2c2a' },
  { id:'secret-expiry-ai',         firstName:'Jordan',    role:'Secret Expiry AI',              blurb:'Monitors Microsoft Entra ID for expiring app secrets and certificates, emailing reports before they lapse.',time:'3 hrs/week',cost:'£480/mo',color:'#4a2c2a' },
  { id:'workflow-error-ai',        firstName:'Aubrey',    role:'Workflow Error Alerter AI',     blurb:'Detects n8n workflow failures in real time and posts error details to Slack immediately.',         time:'2 hrs/week',  cost:'£320/mo',    color:'#4a2c2a' },
  { id:'log-cleanup-ai',           firstName:'Cameron',   role:'Log Cleanup AI',                blurb:'Automatically purges old n8n execution logs based on custom retention rules via the API.',         time:'2 hrs/week',  cost:'£320/mo',    color:'#4a2c2a' },
  { id:'uptime-email-ai',          firstName:'Clara',     role:'Uptime Email Alerter AI',       blurb:'Pings servers on a schedule, logs status in Google Sheets, and emails alerts when one goes down.', time:'3 hrs/week',  cost:'£480/mo',    color:'#4a2c2a' },
  { id:'iot-backup-ai',            firstName:'Austin',    role:'IoT Backup AI',                 blurb:'Requests and saves Zigbee2MQTT configuration backups automatically via MQTT and SFTP.',           time:'2 hrs/week',  cost:'£320/mo',    color:'#4a2c2a' },
  { id:'drive-notify-ai',          firstName:'Phoebe',    role:'Drive Notify AI',               blurb:'Monitors Google Drive for new file uploads and sends instant email notifications to the team.',    time:'2 hrs/week',  cost:'£320/mo',    color:'#4a2c2a' },
  { id:'ai-news-digest-ai',        firstName:'Connor',    role:'AI News Digest AI',             blurb:'Aggregates AI news from RSS, Reddit and HN, summarises with Claude, and posts to Discord and Slack.',time:'2 hrs/week',cost:'£320/mo',  color:'#4a2c2a' },
  { id:'posthog-event-ai',         firstName:'Violet',    role:'PostHog Event Tracker AI',      blurb:'Converts webhook events from any service into trackable PostHog analytics events automatically.',  time:'2 hrs/week',  cost:'£320/mo',    color:'#4a2c2a' },
]

function AgentMiniCard({ ag }) {
  return (
    <Link
      to={`/portfolio#${ag.id}`}
      style={{
        display:'block', width:262, flexShrink:0,
        borderRadius:16, overflow:'hidden',
        border:'1px solid rgba(122,28,28,0.13)',
        boxShadow:'0 4px 20px rgba(80,16,16,0.1)',
        background:'var(--white)', textDecoration:'none',
        transition:'transform 0.22s ease, box-shadow 0.22s ease',
      }}
      onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow=`0 18px 44px ${ag.color}28` }}
      onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 20px rgba(80,16,16,0.1)' }}
    >
      {/* Thumbnail */}
      <div style={{ width:'100%', aspectRatio:'16/9', position:'relative', background:`linear-gradient(135deg,${ag.color}18,${ag.color}08)`, border:`1px dashed ${ag.color}30`, borderWidth:'0 0 1px 0', overflow:'hidden' }}>
        <img
          src={`/employees/${ag.id}.png`}
          alt={ag.firstName}
          onError={e => { e.currentTarget.style.display='none'; if(e.currentTarget.nextSibling) e.currentTarget.nextSibling.style.display='flex' }}
          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
        />
        <div style={{ display:'none', position:'absolute', inset:0, alignItems:'center', justifyContent:'center', flexDirection:'column', gap:5 }}>
          <div style={{ width:48, height:48, borderRadius:'50%', background:`linear-gradient(135deg,${ag.color},${ag.color}99)`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:22, color:'#fff' }}>{ag.firstName.charAt(0)}</div>
          <span style={{ fontSize:10, fontWeight:700, color:ag.color, fontFamily:"'DM Sans',sans-serif", letterSpacing:'0.5px' }}>AI AUTOMATION AGENT</span>
        </div>
        {/* Name badge */}
        <div style={{ position:'absolute', bottom:8, left:10, background:'rgba(44,24,16,0.72)', backdropFilter:'blur(4px)', color:'#fff', fontSize:11, fontWeight:700, padding:'4px 11px', borderRadius:50, display:'flex', alignItems:'center', gap:5, fontFamily:"'DM Sans',sans-serif" }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'#4ade80', flexShrink:0 }}/>
          {ag.firstName}
        </div>
      </div>
      {/* Body */}
      <div style={{ padding:'14px 16px 16px' }}>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.05rem', fontWeight:700, color:'var(--text)', lineHeight:1.25, marginBottom:6 }}>{ag.role}</h3>
        <p style={{ fontSize:'0.78rem', color:'var(--mut)', lineHeight:1.65, fontWeight:300, fontFamily:"'DM Sans',sans-serif", marginBottom:12, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{ag.blurb}</p>
        <div style={{ borderTop:'1px solid var(--bdr)', paddingTop:10, display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
          <div>
            <div style={{ fontSize:'0.56rem', fontWeight:700, color:'var(--mut)', letterSpacing:'0.8px', textTransform:'uppercase', marginBottom:2, fontFamily:"'DM Sans',sans-serif" }}>TIME SAVED</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'0.95rem', fontWeight:700, color:'var(--text)' }}>{ag.time}</div>
          </div>
          <div>
            <div style={{ fontSize:'0.56rem', fontWeight:700, color:'var(--mut)', letterSpacing:'0.8px', textTransform:'uppercase', marginBottom:2, fontFamily:"'DM Sans',sans-serif" }}>COST SAVED</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'0.95rem', fontWeight:700, color:ag.color }}>{ag.cost}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ─── HOME PAGE ──────────────────────────────────────────── */
export default function Home({ openModal }) {
  useReveal()
  useTilt3D()
  useFlipReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const p1 = [
    ['make','Make.com'], ['n8n','n8n'], ['zapier','Zapier'], ['openai','OpenAI'],
    ['pipedrive','Pipedrive'], ['gohighlevel','GoHighLevel'], ['hubspot','HubSpot'],
    ['salesforce','Salesforce'], ['googlesheets','Google Sheets'], ['zoom','Zoom'],
    ['slack','Slack'], ['microsoftteams','MS Teams'], ['microsoftoutlook','Outlook'],
    ['gmail','Gmail'], ['pinecone','Pinecone'], ['xero','Xero'],
    ['intuit','QuickBooks'], ['stripe','Stripe'], ['','Apollo.io'], ['apify','Apify'],
  ]
  const p2 = [
    ['','Instantly'], ['airtable','Airtable'], ['notion','Notion'], ['monday','Monday.com'],
    ['asana','Asana'], ['jira','Jira'], ['shopify','Shopify'], ['woocommerce','WooCommerce'],
    ['twilio','Twilio'], ['sendgrid','SendGrid'], ['mailchimp','Mailchimp'],
    ['typeform','Typeform'], ['calendly','Calendly'], ['airbnb','Airbnb'],
    ['perplexity','Perplexity AI'], ['anthropic','Anthropic'], ['googledrive','Google Drive'],
    ['dropbox','Dropbox'], ['amazonaws','AWS S3'], ['','Webhooks'],
  ]

  const chips = (items) => [...items, ...items].map(([slug, name], i) => (
    <PlatformChip key={`${slug}-${i}`} slug={slug} name={name} />
  ))

  return (
    <>
      <Helmet>
        <title>Logic Loops AI | AI Automation Agency</title>
        <meta name="description" content="India's #1 AI Automation Agency. We build Make.com, n8n, Zapier, and AI agent systems that automate your leads, ops, and outreach — permanently. 2-week live delivery. Serving US, UK, AU, CA." />
        <link rel="canonical" href="https://logicloopsai.com/" />
        <meta property="og:title" content="Logic Loops AI | #1 AI Automation Agency" />
        <meta property="og:description" content="We build Make.com, n8n, and AI agent systems that automate your leads, ops, and outreach — permanently. India's #1 AI automation agency." />
        <meta property="og:url" content="https://logicloopsai.com/" />
      </Helmet>
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

        /* ── 3D decorative shapes ── */
        @keyframes ringOrbit  { 0%{transform:rotateX(68deg) rotateZ(0deg)} 100%{transform:rotateX(68deg) rotateZ(360deg)} }
        @keyframes ringOrbit2 { 0%{transform:rotateX(55deg) rotateZ(0deg)} 100%{transform:rotateX(55deg) rotateZ(-360deg)} }
        @keyframes spinCube   { 0%{transform:rotateX(0deg) rotateY(0deg)} 100%{transform:rotateX(360deg) rotateY(360deg)} }
        @keyframes diamondSpin{ 0%{transform:rotate(0deg) rotateY(0deg)} 50%{transform:rotate(180deg) rotateY(90deg)} 100%{transform:rotate(360deg) rotateY(0deg)} }
        @keyframes depth3d    { 0%,100%{transform:perspective(400px) rotateX(0deg) translateY(0)} 50%{transform:perspective(400px) rotateX(8deg) translateY(-12px)} }

        /* ── Step badge hover spin ── */
        .step-badge { transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1); transform-style: preserve-3d; }
        .step-badge:hover { transform: rotateY(360deg) scale(1.1) !important; }

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

        {/* Animation 1 — floating connected nodes */}
        <NodeCanvas />

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
                AI Automation for SaaS &amp; D2C Founders
              </div>

              {/* H1 */}
              <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(3rem,5vw,5rem)', fontWeight:700, lineHeight:1.04, color:'var(--cream)', marginBottom:24, animation:'heroFadeUp 0.9s 0.35s ease both' }}>
                Your Leads.<br/>
                <em className="gold-line" style={{ color:'var(--gl)', fontStyle:'italic' }}>Your Ops.</em><br/>
                Your Outreach.<br/>All Automated.
              </h1>

              {/* Sub */}
              <p style={{ color:'rgba(253,248,240,0.68)', fontSize:'1.05rem', lineHeight:1.85, marginBottom:40, maxWidth:500, fontWeight:300, animation:'heroFadeUp 0.9s 0.5s ease both' }}>
                We build Make.com, n8n, and AI agent systems that take the repetitive work off your plate — permanently.{' '}
                <strong style={{ color:'rgba(253,248,240,0.92)', fontWeight:600 }}>48-hour delays become 5-minute responses. Live in 2 weeks.</strong>
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
                {[['500', '+', 'Platforms Integrated'],['2', '-Week', 'Live Delivery'],['24', '/7', 'Workflows Running']].map(([n,s,l]) => (
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
      <section style={{ background:'var(--white)', padding:'120px 5%', position:'relative', overflow:'hidden' }}>
        {/* Decorative 3D ring */}
        <div style={{ position:'absolute', top:'8%', right:'-60px', width:320, height:320, border:'1px solid rgba(201,150,58,0.12)', borderRadius:'50%', animation:'ringOrbit 18s linear infinite', pointerEvents:'none', zIndex:0 }}/>
        <div style={{ position:'absolute', bottom:'5%', left:'-40px', width:200, height:200, border:'1px solid rgba(122,28,28,0.1)', borderRadius:'50%', animation:'ringOrbit2 24s linear infinite', pointerEvents:'none', zIndex:0 }}/>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div className="reveal" style={{ textAlign:'center', marginBottom:72 }}>
            <div style={{ fontSize:'0.67rem', fontWeight:700, letterSpacing:'4px', color:'var(--gold)', textTransform:'uppercase', marginBottom:14 }}>What We Build</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.2rem,3.6vw,3.2rem)', fontWeight:700, color:'var(--text)', lineHeight:1.1, marginBottom:16 }}>
              The AI Systems That Replace<br/><em style={{ fontStyle:'italic', color:'var(--maroon)' }}>Your Repetitive Work</em>
            </h2>
            <p style={{ color:'var(--mut)', fontSize:'0.97rem', lineHeight:1.8, maxWidth:560, margin:'0 auto', fontWeight:300 }}>
              Every service is outcome-first. We measure success in hours saved, leads closed, and revenue unlocked — not just workflows shipped.
            </p>
          </div>

          {/* ── AI Agent Card Ticker ── */}
          <>
            <style>{`
              @keyframes tickL { from{transform:translateX(0)} to{transform:translateX(-50%)} }
              @keyframes tickR { from{transform:translateX(-50%)} to{transform:translateX(0)} }
            `}</style>
            {[
              { agents: TICKER_AGENTS.slice(0, 50),  anim:'tickL', dur:'210s' },
              { agents: TICKER_AGENTS.slice(50),      anim:'tickR', dur:'195s' },
            ].map(({ agents, anim, dur }, ri) => (
              <div key={ri} style={{ overflow:'hidden', marginBottom: ri === 0 ? 18 : 0 }}>
                <div
                  style={{ display:'flex', alignItems:'stretch', gap:16, width:'max-content', animation:`${anim} ${dur} linear infinite` }}
                  onMouseEnter={e => e.currentTarget.style.animationPlayState='paused'}
                  onMouseLeave={e => e.currentTarget.style.animationPlayState='running'}
                  onTouchStart={e => e.currentTarget.style.animationPlayState='paused'}
                  onTouchEnd={e => e.currentTarget.style.animationPlayState='running'}
                  onTouchCancel={e => e.currentTarget.style.animationPlayState='running'}
                >
                  {[...agents, ...agents].map((ag, i) => (
                    <AgentMiniCard key={`${ag.id}-${i}`} ag={ag} />
                  ))}
                </div>
              </div>
            ))}
          </>

          <div className="reveal delay-3" style={{ textAlign:'center', marginTop:52 }}>
            <Link to="/services" style={{ background:'linear-gradient(135deg,var(--gold),var(--gl))', color:'var(--md)', padding:'15px 38px', borderRadius:12, fontWeight:700, fontSize:'0.97rem', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:9, transition:'all 0.2s', boxShadow:'0 8px 30px rgba(201,150,58,0.28)' }}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px)'}
              onMouseLeave={e=>e.currentTarget.style.transform='none'}>
              Explore All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ HOW WE DELIVER ══ */}
      <section style={{ background:'var(--cream)', padding:'120px 5%', position:'relative', overflow:'hidden' }}>
        {/* Decorative 3D spinning shapes */}
        <div style={{ position:'absolute', top:'12%', left:'2%', width:100, height:100, border:'1.5px solid rgba(201,150,58,0.15)', transform:'rotateX(45deg) rotateZ(45deg)', animation:'spinCube 28s linear infinite', pointerEvents:'none', zIndex:0 }}/>
        <div style={{ position:'absolute', bottom:'10%', right:'3%', width:64, height:64, border:'1.5px solid rgba(122,28,28,0.12)', transform:'rotate(45deg)', animation:'diamondSpin 16s linear infinite', pointerEvents:'none', zIndex:0 }}/>
        <div style={{ position:'absolute', top:'40%', right:'-80px', width:280, height:280, border:'1px solid rgba(201,150,58,0.09)', borderRadius:'50%', animation:'ringOrbit 22s linear infinite reverse', pointerEvents:'none', zIndex:0 }}/>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div className="reveal" style={{ textAlign:'center', marginBottom:72 }}>
            <div style={{ fontSize:'0.67rem', fontWeight:700, letterSpacing:'4px', color:'var(--gold)', textTransform:'uppercase', marginBottom:14 }}>Our Process</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.2rem,3.6vw,3.2rem)', fontWeight:700, color:'var(--text)', lineHeight:1.1, marginBottom:16 }}>
              How We Deliver Your<br/><em style={{ fontStyle:'italic', color:'var(--maroon)' }}>AI Automation Project</em>
            </h2>
            <p style={{ color:'var(--mut)', fontSize:'0.97rem', lineHeight:1.8, maxWidth:540, margin:'0 auto', fontWeight:300 }}>
              No black boxes. No surprise timelines. Here's exactly what working with us looks like — from first call to live workflow.
            </p>
          </div>

          <div className="process-resp" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:22 }}>
            {[
              { step:'01', h:'Discovery & Goal Setting',     items:['A focused 30-min call to understand your pain points and current tools (CRM, Shopify, Slack, etc.).','We identify what\'s eating your team\'s time and where automation has the highest ROI.','You leave with a clear picture of what\'s possible — before any commitment.'], delay:'0.05s' },
              { step:'02', h:'Process Mapping',              items:['We map your existing manual workflow step by step — exactly as it runs today.','We find the bottlenecks, the repetitive handoffs, and the decision points AI can handle.','You get a visual map of what will be automated and why.'], delay:'0.15s' },
              { step:'03', h:'Design & Scope',               items:['We define each automated step (e.g., lead → qualify → CRM → follow-up) with clear logic.','We agree on success metrics upfront — time saved, error rate, response speed.','You approve the scope and timeline before a single line of automation is built.'], delay:'0.25s' },
              { step:'04', h:'Build & Test',                 items:['We build in a staging environment using Make.com, n8n, or Zapier — plus AI agents where they add real value.','Every workflow is tested with real-world data, edge cases, and error scenarios.','You review the workflow before it touches your live systems.'], delay:'0.35s' },
              { step:'05', h:'Go Live & Handover',           items:['We connect everything to your live tools and run a final end-to-end test together.','We walk you through every trigger, step, and output so you understand exactly what\'s running.','You get a simple playbook — what the workflow does, how to monitor it, and when to flag an issue.'], delay:'0.45s' },
              { step:'06', h:'Ongoing Support & Iteration',  items:['As your business grows, your automations can grow with it — we offer light-touch monthly support.','We check in periodically to catch issues before they become problems.','Need a new trigger, a new tool integration, or a logic change? We\'re a message away.'], delay:'0.55s' },
            ].map(({ step, h, items }) => (
              <article key={step} className="flip-reveal tilt3d" style={{ background:'var(--white)', border:'1px solid var(--bdr)', borderRadius:18, padding:'34px 30px', position:'relative', overflow:'hidden' }}>
                <div className="step-badge" style={{ display:'inline-flex', alignItems:'center', gap:7, background:'linear-gradient(135deg,var(--maroon),rgba(122,28,28,0.75))', color:'var(--cream)', padding:'5px 16px', borderRadius:100, fontSize:'0.72rem', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:18, cursor:'default' }}>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1rem', fontWeight:700, lineHeight:1 }}>{step}</span>
                  Step
                </div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.2rem', fontWeight:700, color:'var(--text)', marginBottom:16, lineHeight:1.25 }}>{h}</h3>
                <ul style={{ listStyle:'none', padding:0, margin:0 }}>
                  {items.map((item, i) => (
                    <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:10, fontSize:'0.86rem', color:'var(--mut)', lineHeight:1.7, fontWeight:300 }}>
                      <span style={{ color:'var(--gold)', fontWeight:700, marginTop:1, flexShrink:0 }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="reveal delay-3" style={{ textAlign:'center', marginTop:52 }}>
            <Link to="/contact" style={{ background:'linear-gradient(135deg,var(--gold),var(--gl))', color:'var(--md)', padding:'15px 38px', borderRadius:12, fontWeight:700, fontSize:'0.97rem', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:9, transition:'all 0.2s', boxShadow:'0 8px 30px rgba(201,150,58,0.28)' }}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px)'}
              onMouseLeave={e=>e.currentTarget.style.transform='none'}>
              🚀 Book Free Automation Audit
            </Link>
          </div>
        </div>
        <style>{`@media(max-width:1100px){.process-resp{grid-template-columns:repeat(2,1fr)!important;}} @media(max-width:768px){.process-resp{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ═══════════════════════ PORTFOLIO PREVIEW ══ */}
      <section style={{ background:'var(--cream)', padding:'120px 5%' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div className="reveal" style={{ textAlign:'center', marginBottom:72 }}>
            <div style={{ fontSize:'0.67rem', fontWeight:700, letterSpacing:'4px', color:'var(--gold)', textTransform:'uppercase', marginBottom:14 }}>Our Portfolio</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.2rem,3.6vw,3.2rem)', fontWeight:700, color:'var(--text)', lineHeight:1.1 }}>
              Real Automations. <em style={{ fontStyle:'italic', color:'var(--maroon)' }}>Real Results.</em>
            </h2>
            <p style={{ color:'var(--mut)', fontSize:'0.97rem', lineHeight:1.8, maxWidth:540, margin:'14px auto 0', fontWeight:300 }}>
              45 live AI workflows across 10 business areas — click any to see the automation, the team member it replaced, and the exact time saved.
            </p>
          </div>

          <div className="proj-grid-resp" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
            {[
              {
                label:'SALES & CRM · AI AUTOMATION', icon:'📈', count:6,
                title:'Sales Automation',   sub:'Lead to close — fully automatic.',
                descPre:"From the moment a lead comes in to the moment it's followed up — ",
                descEm:'assigned, tracked, and recovered automatically.',
                tags:['Lead Router','Win-Back Campaign','Deal Recovery','Renewal Reminder','Upsell Builder','Email Tracker'],
                time:'18 hrs/week', cost:'£2,880/mo', delay:'0.05s',
              },
              {
                label:'CUSTOMER JOURNEY · AI AUTOMATION', icon:'🚀', count:5,
                title:'Customer Journey',   sub:'Win to delivery — zero manual steps.',
                descPre:'From signed contract to onboarding to review request — ',
                descEm:'the entire post-sale chain handled automatically.',
                tags:['Contract Generator','Document Filing','Order Form Builder','Review Collector','Onboarding'],
                time:'17 hrs/week', cost:'£2,720/mo', delay:'0.15s',
              },
              {
                label:'FINANCE · AI AUTOMATION', icon:'💰', count:0,
                title:'Finance Automation',  sub:'Invoices sent before you remember to.',
                descPre:'Billing, invoicing, and payment tracking — ',
                descEm:'kept on schedule without anyone chasing it manually.',
                tags:[],
                time:null, cost:'From £200/user · £1,000 min', delay:'0.25s',
              },
              {
                label:'REPORTING · AI AUTOMATION', icon:'📊', count:1,
                title:'Reporting & Dashboards', sub:'Numbers in your inbox every morning.',
                descPre:'Call activity, revenue figures, and operations data compiled overnight — ',
                descEm:'ready before the office opens.',
                tags:['Sales Dashboard'],
                time:'5 hrs/week', cost:'£800/mo', delay:'0.35s',
              },
              {
                label:'CRM · AI AUTOMATION', icon:'🛠️', count:0,
                title:'CRM Optimisation',  sub:'Clean data. Clear pipeline. Real forecasts.',
                descPre:'Audit, restructure, or set up your CRM from scratch — ',
                descEm:'so your pipeline data actually works for you.',
                tags:[],
                time:null, cost:'From £150/user · £750 min', delay:'0.45s',
              },
              {
                label:'BESPOKE · AI AUTOMATION', icon:'🧩', count:3,
                title:'Workflow & Bespoke',  sub:'Any process. Any system. Automated.',
                descPre:"Custom workflows and system integration for anything that doesn't fit a standard category — ",
                descEm:'built exactly to your spec.',
                tags:['Data Sync','Field Update Tracker','Deal-Won Orchestrator'],
                time:'17 hrs/week', cost:'£2,720/mo', delay:'0.55s',
              },
            ].map(({ label, icon, count, title, sub, descPre, descEm, tags, time, cost, delay }) => (
              <Link
                key={title}
                to="/portfolio"
                className="reveal"
                style={{
                  transitionDelay:delay,
                  borderRadius:20,
                  overflow:'hidden',
                  boxShadow:'0 4px 28px rgba(80,16,16,0.13)',
                  border:'1px solid rgba(122,28,28,0.14)',
                  textDecoration:'none',
                  display:'flex',
                  flexDirection:'column',
                  transition:'transform 0.24s ease, box-shadow 0.24s ease',
                  background:'var(--cream)',
                }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-7px)'; e.currentTarget.style.boxShadow='0 28px 64px rgba(80,16,16,0.22)' }}
                onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 28px rgba(80,16,16,0.13)' }}
              >
                {/* ── Dark maroon header ── */}
                <div style={{
                  background:'radial-gradient(ellipse at 70% 30%, #7a1c1c 0%, #501010 100%)',
                  padding:'26px 26px 24px',
                  position:'relative', overflow:'hidden',
                }}>
                  {/* Dot texture overlay */}
                  <div style={{
                    position:'absolute', inset:0, pointerEvents:'none',
                    backgroundImage:'radial-gradient(circle, rgba(253,248,240,0.07) 1px, transparent 1px)',
                    backgroundSize:'16px 16px',
                  }}/>
                  {/* Category label */}
                  <div style={{
                    fontSize:'0.59rem', fontWeight:700, letterSpacing:'2.5px',
                    color:'rgba(253,248,240,0.42)', textTransform:'uppercase',
                    marginBottom:18, position:'relative', fontFamily:"'DM Sans',sans-serif",
                  }}>{label}</div>
                  {/* Icon + Title row */}
                  <div style={{ display:'flex', alignItems:'center', gap:14, position:'relative' }}>
                    <div style={{
                      width:52, height:52, borderRadius:13, flexShrink:0,
                      background:'rgba(253,248,240,0.1)', border:'1px solid rgba(253,248,240,0.16)',
                      display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem',
                    }}>{icon}</div>
                    <div>
                      <h3 style={{
                        fontFamily:"'Cormorant Garamond',serif", fontSize:'1.55rem', fontWeight:700,
                        color:'var(--cream)', lineHeight:1.1, marginBottom:5,
                      }}>{title}</h3>
                      <p style={{
                        fontSize:'0.78rem', color:'rgba(253,248,240,0.52)', fontWeight:300,
                        fontFamily:"'DM Sans',sans-serif",
                      }}>{sub}</p>
                    </div>
                  </div>
                </div>

                {/* ── Cream body ── */}
                <div style={{ padding:'22px 26px 0', flex:1, display:'flex', flexDirection:'column' }}>
                  {/* Description with italic emphasis */}
                  <p style={{ fontSize:'0.87rem', color:'var(--t2)', lineHeight:1.75, marginBottom:18, fontWeight:300, fontFamily:"'DM Sans',sans-serif" }}>
                    {descPre}
                    <em style={{ fontStyle:'italic', color:'var(--maroon)', fontWeight:400 }}>{descEm}</em>
                  </p>

                  {/* Automation name pills — neutral outlined style */}
                  <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:20 }}>
                    {tags.length > 0
                      ? tags.map(t => (
                        <span key={t} style={{
                          fontSize:'0.74rem', fontWeight:500, color:'var(--text)',
                          background:'var(--white)', border:'1px solid rgba(44,24,16,0.16)',
                          padding:'5px 12px', borderRadius:100, fontFamily:"'DM Sans',sans-serif",
                        }}>{t}</span>
                      ))
                      : <span style={{ fontSize:'0.8rem', color:'var(--mut)', fontStyle:'italic', fontFamily:"'DM Sans',sans-serif" }}>Custom-scoped for your business</span>
                    }
                  </div>

                  {/* Divider */}
                  <div style={{ height:1, background:'rgba(44,24,16,0.1)', marginBottom:16, marginTop:'auto' }} />

                  {/* Stats */}
                  {time ? (
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:18 }}>
                      <div>
                        <div style={{ fontSize:'0.59rem', fontWeight:700, color:'var(--mut)', letterSpacing:'0.8px', textTransform:'uppercase', marginBottom:4, fontFamily:"'DM Sans',sans-serif" }}>TIME SAVED</div>
                        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.15rem', fontWeight:700, color:'var(--text)' }}>{time}</div>
                      </div>
                      <div>
                        <div style={{ fontSize:'0.59rem', fontWeight:700, color:'var(--mut)', letterSpacing:'0.8px', textTransform:'uppercase', marginBottom:4, fontFamily:"'DM Sans',sans-serif" }}>COST SAVED</div>
                        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.15rem', fontWeight:700, color:'var(--maroon)' }}>{cost}</div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ fontSize:'0.84rem', fontWeight:700, color:'var(--maroon)', marginBottom:18, fontFamily:"'DM Sans',sans-serif" }}>{cost}</div>
                  )}
                </div>

                {/* ── Full-width dark CTA button ── */}
                <div style={{ padding:'0 16px 16px' }}>
                  <div style={{
                    background:'linear-gradient(135deg,#501010,#7a1c1c)',
                    borderRadius:12, padding:'13px 18px',
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                  }}>
                    <span style={{ fontSize:'0.86rem', fontWeight:600, color:'var(--cream)', fontFamily:"'DM Sans',sans-serif" }}>
                      View all automations
                    </span>
                    <span style={{ fontSize:'0.83rem', fontWeight:700, color:'var(--gl)', fontFamily:"'DM Sans',sans-serif" }}>
                      {count > 0 ? `${count} included →` : 'Talk to us →'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="reveal delay-3" style={{ textAlign:'center', marginTop:52 }}>
            <Link to="/portfolio" style={{ background:'linear-gradient(135deg,var(--gold),var(--gl))', color:'var(--md)', padding:'14px 36px', borderRadius:12, fontWeight:700, fontSize:'0.95rem', textDecoration:'none', border:'none', display:'inline-flex', alignItems:'center', gap:9, transition:'all 0.2s', boxShadow:'0 8px 28px rgba(201,150,58,0.3)' }}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px)'}
              onMouseLeave={e=>e.currentTarget.style.transform='none'}>
              View Full Automation Showcase →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ PLATFORMS ══ */}
      <section style={{ background:'var(--md)', padding:'120px 5%', position:'relative', overflow:'hidden' }}>
        {/* Animation 5 — drifting particles */}
        <Particles />
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
            <p style={{ color:'var(--mut)', fontSize:'0.97rem', lineHeight:1.8, maxWidth:520, margin:'14px auto 0', fontWeight:300 }}>
              Numbers from the 45 live automation workflows in our showcase — across sales, finance, CRM, marketing, support, HR, and IT.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:22 }} className="stats-cards-resp">
            {[
              {
                n:'295', suffix:'hrs', l:'Saved Every Week',
                tag:'Full Automation Stack',
                icon:'⏱',
                color:'#7a1c1c',
                desc:'Across 100 live automation workflows — sales, invoicing, CRM, marketing, support, HR, IT, and more.',
                items:['Lead Router AI','Invoice Generator AI','Ticket Router AI'],
                delay:'0.05s',
              },
              {
                n:'£46,200', suffix:'', l:'Saved Every Month',
                tag:'Admin & Operations Hours',
                icon:'💰',
                color:'#c9963a',
                desc:'Manual admin hours freed from tasks that add zero value once automated — redirected to revenue-generating work.',
                items:['Deal-Won Orchestrator','Payment Reminder AI','Candidate Screener AI'],
                delay:'0.2s',
              },
              {
                n:'100', suffix:'', l:'Live AI Automations',
                tag:'10 Business Categories',
                icon:'🤖',
                color:'#9b2c2c',
                desc:'From sales CRM to IT security — 100 AI agents handling tasks 24/7 without human input.',
                items:['Sales Automation','Marketing Automation','IT & Security'],
                delay:'0.35s',
              },
            ].map(({ n, suffix, l, tag, icon, color, desc, items, delay }) => (
              <div key={l} className="reveal scale-in tilt3d" style={{ transitionDelay:delay, borderRadius:20, overflow:'hidden', border:'1px solid var(--bdr)', boxShadow:'var(--sh)', background:'var(--cream)', display:'flex', flexDirection:'column' }}>
                {/* Colour header */}
                <div style={{ background:`linear-gradient(135deg,${color},${color}bb)`, padding:'28px 26px 24px' }}>
                  <div style={{ fontSize:'0.63rem', fontWeight:700, letterSpacing:'2.5px', color:'rgba(253,248,240,0.6)', textTransform:'uppercase', marginBottom:10 }}>{tag}</div>
                  <div style={{ display:'flex', alignItems:'baseline', gap:6 }}>
                    <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'3.4rem', fontWeight:700, color:'var(--cream)', lineHeight:1 }}>{n}</span>
                    {suffix && <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.6rem', fontWeight:700, color:'rgba(253,248,240,0.7)', lineHeight:1 }}>{suffix}</span>}
                  </div>
                  <div style={{ fontSize:'0.72rem', fontWeight:700, letterSpacing:'1.5px', color:'rgba(253,248,240,0.65)', textTransform:'uppercase', marginTop:4 }}>{l}</div>
                </div>
                {/* Body */}
                <div style={{ padding:'22px 26px 26px', flex:1 }}>
                  <p style={{ color:'var(--mut)', fontSize:'0.84rem', lineHeight:1.7, fontWeight:300, margin:'0 0 16px' }}>{desc}</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                    {items.map(t=><span key={t} style={{ background:`${color}0d`, border:`1px solid ${color}22`, color, padding:'3px 10px', borderRadius:100, fontSize:'0.67rem', fontWeight:600 }}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Aggregate stats bar */}
          <div className="reveal delay-2" style={{ marginTop:36, background:'linear-gradient(135deg,rgba(122,28,28,0.04),rgba(201,150,58,0.06))', border:'1px solid rgba(201,150,58,0.2)', borderRadius:16, padding:'24px 36px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:20 }}>
            <div style={{ display:'flex', gap:40, flexWrap:'wrap' }}>
              {[['£249,600','Saved / Year'],['2 weeks','Live Delivery'],['24/7','Workflows Running']].map(([v,l])=>(
                <div key={l}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.6rem', fontWeight:700, color:'var(--maroon)' }}>{v}</div>
                  <div style={{ fontSize:'0.67rem', color:'var(--mut)', fontWeight:600, letterSpacing:'0.5px', textTransform:'uppercase' }}>{l}</div>
                </div>
              ))}
            </div>
            <Link to="/case-studies" style={{ background:'linear-gradient(135deg,var(--gold),var(--gl))', color:'var(--md)', padding:'12px 26px', borderRadius:11, fontWeight:700, fontSize:'0.88rem', textDecoration:'none', flexShrink:0, boxShadow:'0 6px 20px rgba(201,150,58,0.3)' }}>
              Read Full Case Studies →
            </Link>
          </div>
        </div>
        <style>{`@media(max-width:1100px){.stats-cards-resp{grid-template-columns:repeat(2,1fr)!important;}} @media(max-width:768px){.stats-cards-resp{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ═══════════════════════ WHY LOGIC LOOPS ══ */}
      <section style={{ background:'var(--cream)', padding:'120px 5%', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'5%', right:'4%', width:140, height:140, border:'1.5px solid rgba(201,150,58,0.13)', borderRadius:'50%', animation:'ringOrbit2 20s linear infinite', pointerEvents:'none', zIndex:0 }}/>
        <div style={{ position:'absolute', bottom:'8%', left:'1%', width:88, height:88, border:'1.5px solid rgba(122,28,28,0.1)', transform:'rotate(45deg)', animation:'diamondSpin 22s linear infinite reverse', pointerEvents:'none', zIndex:0 }}/>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div className="reveal" style={{ textAlign:'center', marginBottom:72 }}>
            <div style={{ fontSize:'0.67rem', fontWeight:700, letterSpacing:'4px', color:'var(--gold)', textTransform:'uppercase', marginBottom:14 }}>Why Logic Loops</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.2rem,3.6vw,3.2rem)', fontWeight:700, color:'var(--text)', lineHeight:1.1 }}>
              Built for Founders.<br/><em style={{ fontStyle:'italic', color:'var(--maroon)' }}>Not Enterprise Procurement.</em>
            </h2>
            <p style={{ color:'var(--mut)', fontSize:'0.97rem', lineHeight:1.8, maxWidth:540, margin:'16px auto 0', fontWeight:300 }}>
              We're not a ticket-based automation factory. We work directly with you, move fast, and build systems that are made to last.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:24 }} className="why-resp">
            {[
              { ic:'🎯', h:'Niche Over Volume', p:'We focus on SaaS, D2C, and digital agencies — not every vertical under the sun. That means sharper solutions, faster turnarounds, and zero "we\'ll figure it out" energy.', delay:'0.05s' },
              { ic:'⚡', h:'2-Week Live Delivery', p:'Most automation agencies take months. We scope, build, and ship production-ready workflows in 2 weeks — with proper error handling, monitoring, and docs included.', delay:'0.15s' },
              { ic:'🤝', h:'You Talk to the Builder', p:'No account managers, no junior handoffs. You work directly with the person building your automation — which means faster decisions and better outcomes.', delay:'0.25s' },
              { ic:'🔩', h:'Opinion-Driven Stack', p:"We'll tell you when Make.com is overkill and n8n saves you ₹50K/year. Or when a simple Zapier chain beats a custom AI agent. You get honest advice, not upsells.", delay:'0.35s' },
              { ic:'📖', h:'Story-Driven Results', p:'Every case study we share includes the real problem, the exact stack used, and the measurable outcome — not vague "40+ hours saved" claims with no context.', delay:'0.45s' },
              { ic:'🇮🇳', h:'India-First Pricing', p:'Our pricing is structured for Indian SaaS and D2C teams — competitive, transparent, and without the USD sticker shock you get from global agencies.', delay:'0.55s' },
            ].map(({ ic, h, p, delay }) => (
              <article key={h} className="reveal tilt3d" style={{ transitionDelay:delay, display:'flex', gap:22, background:'var(--white)', border:'1px solid var(--bdr)', borderRadius:18, padding:'32px 30px' }}>
                <div style={{ width:52, height:52, borderRadius:13, background:'linear-gradient(135deg,rgba(122,28,28,0.08),rgba(201,150,58,0.1))', border:'1px solid rgba(122,28,28,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', flexShrink:0 }}>{ic}</div>
                <div>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.18rem', fontWeight:700, marginBottom:9 }}>{h}</h3>
                  <p style={{ color:'var(--mut)', fontSize:'0.87rem', lineHeight:1.73, fontWeight:300, margin:0 }}>{p}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:900px){.why-resp{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ═══════════════════════ PRICING ══ */}
      <section style={{ background:'var(--white)', padding:'120px 5%', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'10%', left:'-50px', width:260, height:260, border:'1px solid rgba(201,150,58,0.1)', borderRadius:'50%', animation:'ringOrbit 30s linear infinite', pointerEvents:'none', zIndex:0 }}/>
        <div style={{ position:'absolute', bottom:'15%', right:'-30px', width:120, height:120, border:'1.5px solid rgba(122,28,28,0.08)', transform:'rotate(45deg)', animation:'spinCube 20s linear infinite reverse', pointerEvents:'none', zIndex:0 }}/>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div className="reveal" style={{ textAlign:'center', marginBottom:72 }}>
            <div style={{ fontSize:'0.67rem', fontWeight:700, letterSpacing:'4px', color:'var(--gold)', textTransform:'uppercase', marginBottom:14 }}>Packages</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.2rem,3.6vw,3.2rem)', fontWeight:700, color:'var(--text)', lineHeight:1.1 }}>
              Pick a Starting Point.<br/><em style={{ fontStyle:'italic', color:'var(--maroon)' }}>We'll Scale From There.</em>
            </h2>
            <p style={{ color:'var(--mut)', fontSize:'0.97rem', lineHeight:1.8, maxWidth:500, margin:'16px auto 0', fontWeight:300 }}>
              All packages start with a free 30-min Workflow Audit — a slide deck showing exactly what to automate first and the ROI to expect.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }} className="pkg-resp">
            {[
              {
                name:'Starter',
                tagline:'One workflow, zero friction.',
                color:'var(--bdr)',
                accent:'var(--maroon)',
                badge:null,
                items:[
                  '1 end-to-end automation workflow',
                  'Make.com, n8n, or Zapier (we recommend)',
                  'Error handling + monitoring setup',
                  '2-week delivery guarantee',
                  '2 weeks post-launch support',
                ],
                cta:'Start Automating →',
                delay:'0.05s',
              },
              {
                name:'Growth',
                tagline:'Multi-system AI automation.',
                color:'var(--maroon)',
                accent:'var(--gold)',
                badge:'Most Popular',
                items:[
                  'Up to 4 connected automation workflows',
                  'AI agent integration (OpenAI / Anthropic)',
                  'CRM, email, and lead pipeline setup',
                  'Custom dashboard or reporting',
                  '30 days post-launch support + iteration',
                ],
                cta:'Book Your Audit →',
                delay:'0.15s',
              },
              {
                name:'Scale',
                tagline:'Your entire ops on autopilot.',
                color:'var(--bdr)',
                accent:'var(--maroon)',
                badge:null,
                items:[
                  'Unlimited workflows for one business area',
                  'Multi-agent AI system architecture',
                  'Full stack: CRM + ops + outreach + finance',
                  'Monthly retainer with iteration sprints',
                  'Dedicated async support channel',
                ],
                cta:'Let\'s Scope It →',
                delay:'0.25s',
              },
            ].map(({ name, tagline, color, accent, badge, items, cta, delay }) => (
              <article key={name} className="reveal tilt3d" style={{ transitionDelay:delay, background: badge ? 'var(--md)' : 'var(--cream)', border:`2px solid ${badge ? 'var(--gold)' : color}`, borderRadius:20, padding:'38px 32px', position:'relative', display:'flex', flexDirection:'column' }}>
                {badge && (
                  <div style={{ position:'absolute', top:-14, left:'50%', transform:'translateX(-50%)', background:'linear-gradient(135deg,var(--gold),var(--gl))', color:'var(--md)', padding:'4px 18px', borderRadius:100, fontSize:'0.67rem', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', whiteSpace:'nowrap' }}>{badge}</div>
                )}
                <div style={{ marginBottom:24 }}>
                  <div style={{ fontSize:'0.67rem', fontWeight:700, letterSpacing:'3px', color: badge ? 'var(--gl)' : 'var(--gold)', textTransform:'uppercase', marginBottom:8 }}>{name}</div>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.5rem', fontWeight:700, color: badge ? 'var(--cream)' : 'var(--text)', marginBottom:6 }}>{tagline}</h3>
                </div>
                <ul style={{ listStyle:'none', padding:0, margin:'0 0 32px', flex:1 }}>
                  {items.map(item => (
                    <li key={item} style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:12, fontSize:'0.87rem', color: badge ? 'rgba(253,248,240,0.75)' : 'var(--mut)', lineHeight:1.5, fontWeight:300 }}>
                      <span style={{ color: badge ? 'var(--gl)' : accent, fontWeight:700, marginTop:1, flexShrink:0 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" style={{ background: badge ? 'linear-gradient(135deg,var(--gold),var(--gl))' : 'transparent', color: badge ? 'var(--md)' : accent, padding:'13px 24px', borderRadius:11, fontWeight:700, fontSize:'0.9rem', textDecoration:'none', display:'block', textAlign:'center', border: badge ? 'none' : `2px solid ${accent}`, transition:'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none' }}>
                  {cta}
                </Link>
              </article>
            ))}
          </div>

          <div className="reveal delay-2" style={{ marginTop:40, background:'linear-gradient(135deg,rgba(122,28,28,0.04),rgba(201,150,58,0.06))', border:'1px solid rgba(201,150,58,0.2)', borderRadius:16, padding:'28px 36px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:20 }}>
            <div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.25rem', fontWeight:700, marginBottom:6 }}>Free Workflow Audit</div>
              <p style={{ color:'var(--mut)', fontSize:'0.87rem', lineHeight:1.6, fontWeight:300, margin:0 }}>30-minute call + a slide deck showing your top 3 automation opportunities and the ROI estimate for each. No commitment required.</p>
            </div>
            <Link to="/contact" style={{ background:'linear-gradient(135deg,var(--gold),var(--gl))', color:'var(--md)', padding:'13px 28px', borderRadius:11, fontWeight:700, fontSize:'0.9rem', textDecoration:'none', whiteSpace:'nowrap', flexShrink:0, boxShadow:'0 6px 20px rgba(201,150,58,0.3)' }}>
              Claim Free Audit →
            </Link>
          </div>
        </div>
        <style>{`@media(max-width:1100px){.pkg-resp{grid-template-columns:repeat(2,1fr)!important;}} @media(max-width:700px){.pkg-resp{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ═══════════════════════ LATEST BLOG ══ */}
      <section style={{ background: 'var(--cream)', padding: '120px 5%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontSize: '0.67rem', fontWeight: 700, letterSpacing: '4px', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 14 }}>Our Blog</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.2rem,3.6vw,3.2rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.1 }}>
              Latest From <em style={{ fontStyle: 'italic', color: 'var(--maroon)' }}>Our Blog</em>
            </h2>
            <p style={{ color: 'var(--mut)', fontSize: '0.97rem', lineHeight: 1.8, maxWidth: 480, margin: '14px auto 0', fontWeight: 300 }}>
              Real automation guides from real workflows we have deployed for clients.
            </p>
          </div>

          <div className="proj-grid-resp" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {blogPosts.slice(0, 3).map((post, i) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <article
                  className="reveal"
                  style={{ transitionDelay: `${i * 0.1}s`, background: '#fff', borderRadius: 18, border: '1px solid var(--bdr)', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.22s, box-shadow 0.22s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--shl)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                    <img src={post.cover} alt={post.imageAlt || `${post.title} - Logic Loops AI`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(80,16,16,0.15) 0%, rgba(80,16,16,0.42) 100%)' }} />
                    <span style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(201,150,58,0.22)', color: 'var(--gl)', border: '1px solid rgba(201,150,58,0.4)', borderRadius: 999, padding: '3px 10px', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', backdropFilter: 'blur(4px)' }}>{post.category}</span>
                  </div>
                  <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.08rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.35, marginBottom: 10, flex: 1 }}>{post.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                      <span style={{ fontSize: '0.74rem', color: 'var(--mut)' }}>{post.date} · {post.readTime}</span>
                      <span style={{ fontSize: '0.79rem', color: 'var(--gold)', fontWeight: 700 }}>Read →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="reveal delay-2" style={{ textAlign: 'center', marginTop: 44 }}>
            <Link to="/blog" style={{ background: 'transparent', color: 'var(--maroon)', padding: '13px 32px', borderRadius: 12, fontWeight: 700, fontSize: '0.93rem', textDecoration: 'none', border: '2px solid var(--maroon)', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--maroon)'; e.currentTarget.style.color = 'var(--cream)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--maroon)' }}>
              View All Articles →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FAQ ══ */}
      <FAQSection faqs={homeFaqs} title={<>Common Questions, <em>Clearly Answered</em></>} bg="var(--cream)" />

      {/* ═══════════════════════ CTA BANNER ══ */}
      <section style={{ background:'linear-gradient(135deg,var(--md) 0%,var(--maroon) 100%)', padding:'120px 5%', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <Particles />
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