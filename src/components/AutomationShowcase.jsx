import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

/* ─── Scroll fade-in ─────────────────────────────────────── */
function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
    }}>
      {children}
    </div>
  )
}

/* ─── Animated count-up ──────────────────────────────────── */
function Counter({ to, prefix = '', suffix = '', duration = 1200 }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration)
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [to, duration])
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>
}

/* ─── Best suited descriptions ───────────────────────────── */
const BEST_SUITED = {
  'Sales & CRM':             'B2B sales teams, digital agencies, and SaaS companies running a CRM like Pipedrive, HubSpot, or GoHighLevel.',
  'Telecom & Subscription':  'Telecom resellers, ISPs, SaaS providers, and subscription businesses managing recurring contracts.',
  'Retail & Local Services': 'Retailers, salons, local trade businesses, and service providers that depend on word-of-mouth and reviews.',
  'Field & Installation':    'Field service companies, installers, engineers, and businesses that coordinate teams across multiple job sites.',
  'Operations & HR':         'Growing teams running multiple tools across sales, operations, onboarding, and reporting.',
  'Marketing':               'Marketing teams, content creators, and businesses running paid campaigns who need consistent output without full-time coordination.',
  'Customer Support':        'Support teams, SaaS companies, and service businesses handling high ticket volumes who need faster response times and fewer dropped tickets.',
  'HR & Recruitment':        'HR departments, recruitment agencies, and growing businesses that hire regularly and need people-ops to run without manual chasing.',
  'IT & Security':           'IT managers, MSPs, and businesses with compliance requirements who need monitoring and access control to run without depending on someone remembering.',
}

/* ─── Employee names updated to reflect the team ─────────── */
const AUTOMATIONS = {
  'lead-router-ai': {
    id: 'lead-router-ai', firstName: 'Arjun', role: 'Lead Router AI', industry: 'Sales & CRM',
    blurb: 'Assigns every new lead to the next available rep — instantly, fairly, every time.',
    intro: 'Automatically route every new lead to the next available rep across every pipeline, ensuring no lead sits untouched and no rep gets overloaded — no manual assignment required.',
    roleDescription: "When a new lead comes in, it traditionally lands in a queue — waiting for a manager to notice it, decide who's free, and assign it by hand. That delay costs response time, and slow response time costs deals.\n\nArjun solves this by acting as a real-time dispatcher between your CRM and your sales team. The moment a lead arrives, Arjun checks which pipeline it belongs to, finds the next rep in the rotation, and assigns the deal automatically — rotating fairly across every product line without anyone touching a spreadsheet.\n\nThe business value: faster response times, an even spread of leads across the team, and zero leads forgotten because nobody happened to be looking at the dashboard.",
    steps: [{icon:'⚡',label:'New Lead In'},{icon:'🔀',label:'Check Pipeline'},{icon:'🎯',label:'Assign Next Rep'},{icon:'✅',label:'Deal Updated'}],
    time: '4 hrs/week', cost: '£640/mo',
  },
  'win-back-campaign-ai': {
    id: 'win-back-campaign-ai', firstName: 'Meera', role: 'Win-Back Campaign AI', industry: 'Sales & CRM',
    blurb: 'Fires an automatic follow-up sequence the moment a deal is lost.',
    intro: 'Automatically trigger a follow-up email sequence the moment a deal is marked lost — keeping the door open long after a human would have moved on.',
    roleDescription: "Most lost deals are simply abandoned — the rep moves on to the next opportunity, and the lost lead never hears from the business again, even though 'not now' often just means 'not yet'.\n\nMeera doesn't let a lost deal disappear. The moment it's marked lost, an automatic email sequence begins, staying in front of that contact over time without taking up a rep's attention.\n\nThe business value: a meaningful share of 'lost' deals come back to life months later, recovered entirely by a sequence that needed no manual follow-up.",
    steps: [{icon:'⚡',label:'Deal Lost'},{icon:'📧',label:'Auto Email Sequence'},{icon:'🔔',label:'Rep Notified'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'deal-recovery-ai': {
    id: 'deal-recovery-ai', firstName: 'Vikram', role: 'Deal Recovery AI', industry: 'Sales & CRM',
    blurb: 'Reopens and reassigns cancelled or rejected deals for a second chance.',
    intro: "Automatically reopen a cancelled or rejected deal and reassign it for a second look — so promising leads don't vanish over a single 'no'.",
    roleDescription: "A cancelled or rejected deal usually just sits closed — even though circumstances change, budgets free up, and a 'no' today is often a 'maybe' in three months.\n\nVikram gives every cancelled or rejected deal a second chance automatically. The moment one's marked closed-lost in this way, Vikram reopens it and reassigns it to a rep for a fresh follow-up, instead of letting it disappear into the archive.\n\nThe business value: pipeline value that would otherwise be written off gets a genuine second pass, recovering deals that a busy team would never have revisited manually.",
    steps: [{icon:'⚡',label:'Deal Cancelled'},{icon:'♻️',label:'Auto Re-Open'},{icon:'🎯',label:'Reassigned'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'renewal-reminder-ai': {
    id: 'renewal-reminder-ai', firstName: 'Ananya', role: 'Renewal Reminder AI', industry: 'Telecom & Subscription',
    blurb: 'Flags contracts nearing renewal and routes them to a rep automatically.',
    intro: 'Automatically flag contracts approaching their renewal date and route them to a rep for outreach — before the customer ever has a reason to consider leaving.',
    roleDescription: "Renewal dates are easy to miss when they're buried in a spreadsheet alongside hundreds of other accounts. By the time someone notices a contract's about to lapse, it's often too late to act.\n\nAnanya watches every contract's end date continuously. The moment one's approaching the renewal window, Ananya flags the account and routes it to the right rep for proactive outreach — automatically, with no manual checking required.\n\nThe business value: fewer accounts slipping through unnoticed, more renewal conversations happening early, and meaningfully less churn.",
    steps: [{icon:'📅',label:'Renewal Approaching'},{icon:'🔀',label:'Flag Account'},{icon:'🎯',label:'Assign for Outreach'}],
    time: '4 hrs/week', cost: '£640/mo',
  },
  'upsell-builder-ai': {
    id: 'upsell-builder-ai', firstName: 'Rishi', role: 'Upsell Builder AI', industry: 'Telecom & Subscription',
    blurb: "Builds a renewal deal from a customer's order history, ready for a rep.",
    intro: "Automatically build a new deal from a customer's order history the moment their renewal window opens — ready for a rep to action immediately.",
    roleDescription: "Upsell opportunities often get missed simply because nobody's actively watching for the renewal window to open. By the time someone notices, the moment's passed and the conversation never happens.\n\nRishi watches for that window directly. The moment it opens, Rishi pulls the customer's order history, builds a new deal reflecting the upgrade opportunity, and assigns it to a rep — fully prepared, ready to action.\n\nThe business value: upsell conversations happen at exactly the right moment, every time, without relying on anyone remembering to check.",
    steps: [{icon:'⚡',label:'Renewal Window Opens'},{icon:'📄',label:'Build Deal from History'},{icon:'🎯',label:'Assigned to Rep'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'email-tracker-ai': {
    id: 'email-tracker-ai', firstName: 'Kavya', role: 'Email Tracker AI', industry: 'Sales & CRM',
    blurb: 'Matches every sent and replied email to the right deal automatically.',
    intro: 'Automatically match every sent and replied email to the correct deal and log it in the CRM — keeping every record accurate without manual updates.',
    roleDescription: "CRM records only stay useful if they're kept up to date — but logging every email exchange by hand is exactly the kind of task that gets skipped when things get busy.\n\nKavya makes sure it never gets skipped. Every email sent or replied to is automatically matched to the right deal and logged against it, so the record reflects reality without anyone having to remember to update it.\n\nThe business value: a CRM that's actually trustworthy, because the data entry that usually falls behind simply never falls behind in the first place.",
    steps: [{icon:'📧',label:'Email Sent/Replied'},{icon:'🔄',label:'Match to Deal'},{icon:'✅',label:'CRM Updated'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'contract-generator-ai': {
    id: 'contract-generator-ai', firstName: 'Sasha', role: 'Contract Generator AI', industry: 'Telecom & Subscription',
    blurb: 'Builds the contract and sends it for e-signature the second a deal is won.',
    intro: 'Automatically generate a contract from CRM deal data and send it for e-signature the instant a deal is marked won — no templates, no copy-pasting, no delay.',
    roleDescription: "Traditionally, once a deal is won, someone has to open a template, manually fill in the customer's details, double-check everything, and send it out for signature. That gap between 'yes' and paperwork is where deals quietly stall.\n\nSiddharth closes that gap. The second a deal is marked won in the CRM, Siddharth pulls every relevant field, builds the contract, and sends it straight to the customer for e-signature — logging the outcome back into the CRM automatically.\n\nThe business value: contracts go out in minutes instead of hours, with zero data-entry errors, and every signed deal is tracked without anyone chasing it manually.",
    steps: [{icon:'⚡',label:'Deal Won'},{icon:'📄',label:'Build Contract'},{icon:'💬',label:'Send for E-Sign'},{icon:'✅',label:'Logged in CRM'}],
    time: '6 hrs/week', cost: '£960/mo',
  },
  'document-filing-ai': {
    id: 'document-filing-ai', firstName: 'Priya', role: 'Document Filing AI', industry: 'Sales & CRM',
    blurb: 'Pulls signed contracts and files them against the right customer record.',
    intro: 'Automatically retrieve a completed e-signature document and attach it to the correct customer record — nothing left sitting in an inbox.',
    roleDescription: "Signed documents have a habit of getting lost — sitting in someone's email, downloaded once, then forgotten. When a customer ever asks for a copy, someone has to go hunting.\n\nPriya removes that risk entirely. The moment a signature completes, Priya retrieves the finished document and attaches it directly to the matching deal or customer record — automatically, every time, with no human step in between.\n\nThe business value: every signed contract is exactly where it should be, instantly searchable, with nothing relying on someone remembering to file it.",
    steps: [{icon:'⚡',label:'Signature Done'},{icon:'☁️',label:'Pull Signed Doc'},{icon:'📄',label:'Attach to Record'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'order-form-builder-ai': {
    id: 'order-form-builder-ai', firstName: 'Rohan', role: 'Order Form Builder AI', industry: 'Telecom & Subscription',
    blurb: 'Builds, emails, and logs the order form the moment a deal closes.',
    intro: 'Automatically build the order form, email it to the customer, and log the record the second a deal is marked won — same-day orders, every time.',
    roleDescription: "Order forms are repetitive but unforgiving — one missed field and the whole order gets delayed. When it's done manually under pressure on a busy sales floor, mistakes creep in.\n\nRohan takes that risk out of the process. The moment a deal closes, Rohan builds the order form from the CRM data, emails it straight to the customer, and saves the record — with the same fields filled the same way, every single time.\n\nThe business value: orders go out same-day without exception, and the sales team gets that admin task off their plate entirely.",
    steps: [{icon:'⚡',label:'Deal Won'},{icon:'📄',label:'Build Order Form'},{icon:'📧',label:'Email Customer'},{icon:'✅',label:'Record Saved'}],
    time: '5 hrs/week', cost: '£800/mo',
  },
  'review-collector-ai': {
    id: 'review-collector-ai', firstName: 'Neha', role: 'Review Collector AI', industry: 'Retail & Local Services',
    blurb: 'Sends a review request by text and syncs the result straight back to the CRM.',
    intro: 'Automatically send a review request by SMS the moment a job is completed, and sync the result back into the CRM the moment it comes in.',
    roleDescription: "The best time to ask for a review is right after the job's done — but that's exactly when teams are too busy moving on to the next customer to ask. The moment passes, and the review never gets requested.\n\nNeha catches that moment every time. The instant a job is marked closed, Neha sends a review request by text. When the customer responds, the result is pulled back into the CRM automatically, so the team has visibility without lifting a finger.\n\nThe business value: a steady stream of fresh reviews with zero manual chasing, which compounds into stronger referral and reputation numbers over time.",
    steps: [{icon:'⚡',label:'Job Closed'},{icon:'📱',label:'SMS Review Request'},{icon:'⭐',label:'Review Received'},{icon:'✅',label:'Synced to CRM'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'onboarding-ai': {
    id: 'onboarding-ai', firstName: 'Aryan', role: 'Onboarding AI', industry: 'Operations & HR',
    blurb: "Sets up new starters' CRM profile and rota slot on day one.",
    intro: "Automatically create a new starter's CRM profile and add them to the team rota on their first day — no manual account setup required.",
    roleDescription: "New starter setup is one of those tasks that always waits for whoever has five free minutes — which on a busy day might not happen until the new hire's second or third day.\n\nAryan removes that wait entirely. The moment a new starter is added to the system, Aryan creates their CRM profile and slots them into the rep table and rota automatically.\n\nThe business value: new hires are productive from hour one instead of day three, with zero manual account setup needed from anyone on the team.",
    steps: [{icon:'⚡',label:'New Starter Added'},{icon:'👤',label:'Create CRM Profile'},{icon:'✅',label:'Added to Rota'}],
    time: '1 hr/week', cost: '£160/mo',
  },
  'sales-dashboard-ai': {
    id: 'sales-dashboard-ai', firstName: 'Shreya', role: 'Sales Dashboard AI', industry: 'Sales & CRM',
    blurb: 'Pulls daily call and revenue numbers and emails the report to managers.',
    intro: 'Automatically pull daily call activity and revenue numbers into a report, and email it straight to management every morning.',
    roleDescription: "Daily reporting is valuable but tedious — pulling numbers from the CRM, formatting them, and emailing them out used to eat up the first half-hour of someone's morning, every single day.\n\nShreya does that work overnight. Call activity, talk time, and revenue figures are pulled automatically, compiled into a clean report, and sitting in management's inbox before the office opens.\n\nThe business value: consistent, accurate daily visibility into sales performance, with the manual reporting work removed completely.",
    steps: [{icon:'📊',label:'Pull Daily Activity'},{icon:'🔄',label:'Build Report'},{icon:'📧',label:'Email Managers'}],
    time: '5 hrs/week', cost: '£800/mo',
  },
  'data-sync-ai': {
    id: 'data-sync-ai', firstName: 'Kiran', role: 'Data Sync AI', industry: 'Operations & HR',
    blurb: 'Keeps your CRM and operations database in sync, both ways, always.',
    intro: 'Automatically keep your CRM and your operations database in sync, both directions — update either one, and the other updates itself.',
    roleDescription: "When a business runs on more than one system — a CRM for sales, a database or spreadsheet for operations — the two inevitably drift apart. Someone updates one and forgets the other, and from then on, nobody's sure which version is correct.\n\nKiran's entire job is making sure that never happens. Any change in either system triggers an automatic two-way sync, so both stay identical without anyone re-typing the same information twice.\n\nThe business value: one source of truth across the business, with the hours that used to go into manual reconciliation freed up entirely.",
    steps: [{icon:'⚡',label:'Record Changed'},{icon:'🔄',label:'Two-Way Sync'},{icon:'✅',label:'Both Updated'}],
    time: '6 hrs/week', cost: '£960/mo',
  },
  'field-update-tracker-ai': {
    id: 'field-update-tracker-ai', firstName: 'Aditya', role: 'Field Update Tracker AI', industry: 'Field & Installation',
    blurb: 'Pushes install and completion dates across every connected system instantly.',
    intro: "Automatically sync installation and completion dates across every connected system the instant they're logged — no manual re-entry.",
    roleDescription: "Field data has a habit of living in one system and needing to exist in three more. Someone logs a completion date in one tool, and then has to remember to copy it into the CRM, the billing system, and the reporting sheet too.\n\nAditya removes that re-typing entirely. The moment an installation or completion date is logged anywhere, Aditya pushes that update across every connected system automatically — so the same fact never has to be entered twice.\n\nThe business value: field records stay consistent everywhere at once, and engineers' time goes into the job, not into updating four different tools afterward.",
    steps: [{icon:'⚡',label:'Install Date Logged'},{icon:'🔄',label:'Sync Across Systems'},{icon:'✅',label:'Status Updated'}],
    time: '4 hrs/week', cost: '£640/mo',
  },
  'deal-won-orchestrator-ai': {
    id: 'deal-won-orchestrator-ai', firstName: 'Dhruv', role: 'Deal-Won Orchestrator AI', industry: 'Sales & CRM',
    blurb: 'Fires every next step at once the moment any deal is marked won.',
    intro: 'Automatically trigger every next step at once — paperwork, notifications, and review requests — the moment any deal is marked won, on any pipeline.',
    roleDescription: "A won deal should set off a whole chain of next steps: contract, notification, order form, eventually a review request. Run by hand, that chain happens in stages, with gaps between each one where things get forgotten.\n\nDhruv is the one trigger that starts the whole chain at once. The instant a deal is marked won — on any pipeline — Dhruv fires every downstream action simultaneously, instead of waiting for each step to be handled in turn.\n\nThe business value: the entire post-sale process runs in parallel instead of in sequence, finishing in minutes what used to take a full day to work through manually.",
    steps: [{icon:'⚡',label:'Deal Won (Any Pipeline)'},{icon:'🔀',label:'Trigger All Actions'},{icon:'📄',label:'Docs + Notify + Review'}],
    time: '7 hrs/week', cost: '£1,120/mo',
  },
  'invoice-generator-ai': {
    id: 'invoice-generator-ai', firstName: 'Tanvi', role: 'Invoice Generator AI', industry: 'Telecom & Subscription',
    blurb: 'Builds and sends the invoice the moment the order form is signed — no manual billing.',
    intro: 'Automatically generate an invoice straight from the signed order and email it to the customer the same day — instead of waiting for someone to find time to bill it.',
    roleDescription: "Invoicing usually sits at the bottom of someone's to-do list — it's not urgent until a customer asks where their bill is, by which point payment is already late before it's even been requested.\n\nTanvi removes that delay entirely. The moment an order form is signed, Tanvi pulls the pricing and customer details straight from the CRM, builds the invoice, and sends it out the same day — with the same format and accuracy every time.\n\nThe business value: invoices go out same-day instead of whenever someone gets round to it, which means payment terms start on time and cash comes in faster.",
    steps: [{icon:'⚡',label:'Order Form Signed'},{icon:'📄',label:'Build Invoice'},{icon:'📧',label:'Send to Customer'},{icon:'✅',label:'Logged in CRM'}],
    time: '4 hrs/week', cost: '£640/mo',
  },
  'payment-reminder-ai': {
    id: 'payment-reminder-ai', firstName: 'Karan', role: 'Payment Reminder AI', industry: 'Telecom & Subscription',
    blurb: 'Chases overdue invoices automatically, before they become a write-off.',
    intro: "Automatically track every invoice's due date and send a reminder sequence as it approaches and passes — so late payment is caught early instead of three months down the line.",
    roleDescription: "Chasing late payers is a job nobody wants and most teams only get round to when the gap's already painful — usually well past the point a gentle nudge would have worked.\n\nKaran watches every invoice's due date continuously. As it approaches, Karan sends a reminder; if it passes unpaid, the tone escalates automatically and the assigned rep gets notified to step in personally.\n\nThe business value: faster collection, fewer invoices written off as bad debt, and zero awkward 'have you forgotten' calls that nobody had time to make.",
    steps: [{icon:'📅',label:'Due Date Approaching'},{icon:'📧',label:'Reminder Sent'},{icon:'🔔',label:'Rep Notified if Overdue'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'payment-reconciliation-ai': {
    id: 'payment-reconciliation-ai', firstName: 'Diya', role: 'Payment Reconciliation AI', industry: 'Telecom & Subscription',
    blurb: 'Matches every incoming payment to the right invoice and closes it automatically.',
    intro: 'Automatically match incoming bank payments to the correct open invoice and mark it paid — no spreadsheet, no manual cross-checking.',
    roleDescription: "Reconciling payments against invoices by hand means scrolling through a bank statement and a list of open invoices side by side, trying to match amounts and names that don't always line up neatly.\n\nDiya does that matching automatically. The moment a payment lands, Diya checks it against open invoices by amount and reference, marks the matching one paid, and flags anything that doesn't match cleanly for a human to check.\n\nThe business value: a finance record that's accurate in near real-time, with the tedious cross-checking work removed and only genuine exceptions landing on someone's desk.",
    steps: [{icon:'💳',label:'Payment Received'},{icon:'🔄',label:'Match to Invoice'},{icon:'✅',label:'Marked Paid'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'recurring-billing-ai': {
    id: 'recurring-billing-ai', firstName: 'Rahul', role: 'Recurring Billing AI', industry: 'Telecom & Subscription',
    blurb: 'Generates and sends the recurring invoice automatically, every cycle, on time.',
    intro: 'Automatically generate and send the recurring invoice on every subscription billing cycle — without anyone needing to remember which customer is due when.',
    roleDescription: "Recurring billing should be the easiest part of finance, but tracking which customer's cycle is due, on which date, at which price, is exactly the kind of detail that gets missed when there are dozens of accounts running on different schedules.\n\nRahul tracks every subscription's billing cycle directly. The moment one's due, Rahul builds the invoice at the correct price and sends it out — on schedule, every time, regardless of how many accounts are running in parallel.\n\nThe business value: billing that never slips a cycle, with recurring revenue collected reliably instead of depending on someone's memory.",
    steps: [{icon:'📅',label:'Billing Cycle Due'},{icon:'📄',label:'Generate Invoice'},{icon:'📧',label:'Send to Customer'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'expense-approval-ai': {
    id: 'expense-approval-ai', firstName: 'Pooja', role: 'Expense Approval AI', industry: 'Operations & HR',
    blurb: 'Routes every expense claim to the right approver and logs the outcome automatically.',
    intro: 'Automatically route a submitted expense claim to the correct approver based on amount and department, and log the decision — no chasing sign-off over email.',
    roleDescription: "Expense approval usually means an email sits in someone's inbox until they have a free moment, while the person who submitted it has no idea whether it's been seen, approved, or forgotten.\n\nPooja routes every claim the moment it's submitted — to the right approver based on amount and department — and logs the decision automatically once it's made, so nothing sits in limbo.\n\nThe business value: faster turnaround on expense claims, a clear audit trail for every decision, and no more chasing approvers over email.",
    steps: [{icon:'📥',label:'Expense Submitted'},{icon:'🔀',label:'Route to Approver'},{icon:'✅',label:'Logged'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'data-enrichment-ai': {
    id: 'data-enrichment-ai', firstName: 'Ishaan', role: 'Data Enrichment AI', industry: 'Sales & CRM',
    blurb: 'Enriches every new lead with company and contact details the second it lands.',
    intro: "Automatically enrich every new lead with company size, industry, and contact details the moment it's added — so reps never start a call blind.",
    roleDescription: "A new lead often arrives with little more than a name and an email — leaving the rep to spend the first ten minutes of prep just googling who they're about to call.\n\nIshaan fills that gap automatically. The moment a lead is created, Ishaan pulls company and contact details from available data sources and writes them straight into the record before anyone's even picked up the phone.\n\nThe business value: reps walk into every call already briefed, and the CRM stays genuinely useful instead of a list of half-empty contact cards.",
    steps: [{icon:'⚡',label:'New Lead Added'},{icon:'🔎',label:'Pull Company Data'},{icon:'✅',label:'CRM Updated'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'pipeline-health-ai': {
    id: 'pipeline-health-ai', firstName: 'Simran', role: 'Pipeline Health AI', industry: 'Sales & CRM',
    blurb: 'Flags deals that have gone quiet and alerts the rep before they go cold.',
    intro: 'Automatically flag any deal with no activity in a set number of days and alert the rep — so nothing sits forgotten in the pipeline.',
    roleDescription: "Deals don't usually die in a dramatic moment — they just quietly stop getting touched, and by the time anyone notices, the prospect's moved on and the opportunity's gone cold.\n\nSimran watches every open deal's activity continuously. The moment one goes quiet past the threshold, Simran flags it and nudges the assigned rep directly, instead of letting it sit unnoticed until a pipeline review.\n\nThe business value: fewer deals slipping through from simple neglect, and a pipeline that reflects what's actually being worked, not what's just been left open.",
    steps: [{icon:'📅',label:'No Activity Logged'},{icon:'🔔',label:'Flag Stale Deal'},{icon:'🎯',label:'Alert Rep'}],
    time: '2 hrs/week', cost: '£320/mo',
    },

  /* ── Sales & CRM (4 new) ── */
  'apollo-lead-ai': {
    id: 'apollo-lead-ai', firstName: 'James', role: 'Apollo Lead Gen AI', industry: 'Sales & CRM',
    blurb: 'Pulls fresh leads from Apollo, parses them with AI, and fires timed follow-up emails.',
    intro: 'Automatically source leads from Apollo, enrich them with AI parsing, and trigger a timed email follow-up sequence — so every prospect gets contacted without a rep lifting a finger.',
    roleDescription: "Building a pipeline from scratch means manually hunting for prospects in Apollo, copying data into a CRM, and remembering who to follow up with and when. That process falls apart the moment the team gets busy.\n\nJames automates the full cycle. Leads are pulled from Apollo on a schedule, parsed and enriched by AI to extract only the most relevant fields, then passed into a timed email sequence that reaches out at exactly the right intervals.\n\nThe business value: a self-filling pipeline that generates and nurtures new prospects continuously, without anyone managing the outreach queue manually.",
    steps: [{icon:'🔍',label:'Pull Apollo Leads'},{icon:'🤖',label:'AI Parse & Enrich'},{icon:'📧',label:'Timed Email Sequence'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'ai-lead-nurture-ai': {
    id: 'ai-lead-nurture-ai', firstName: 'Oliver', role: 'Lead Nurture AI', industry: 'Sales & CRM',
    blurb: 'Drafts personalised nurture emails using ChatGPT and Gemini, ready for one-click send.',
    intro: 'Automatically generate personalised nurture emails for each lead using dual AI models — so every contact gets a tailored message without a rep writing one from scratch.',
    roleDescription: "Generic nurture emails get ignored. Writing a personalised one for every lead takes time that sales reps simply don't have when they're also managing calls, demos, and follow-ups.\n\nOliver uses both ChatGPT and Gemini to draft contextual outreach for each lead, pulling from CRM data to personalise tone, company references, and pain points. The draft lands in the rep's queue ready for one-click review and send.\n\nThe business value: every lead gets a message that feels personal, without the hours of writing. Response rates improve and no lead sits ignored simply because nobody had time to craft a proper email.",
    steps: [{icon:'👤',label:'Lead Profile Pulled'},{icon:'🤖',label:'AI Draft Generated'},{icon:'✅',label:'Rep Reviews & Sends'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'cold-email-tracker-ai': {
    id: 'cold-email-tracker-ai', firstName: 'Emma', role: 'Cold Email Tracker AI', industry: 'Sales & CRM',
    blurb: 'Syncs cold email open, click, and reply rates from Smartlead into Google Sheets automatically.',
    intro: 'Automatically pull cold email engagement metrics from Smartlead and log them in Google Sheets — so campaign performance is always visible without manual exports.',
    roleDescription: "Cold email campaigns generate a lot of data — open rates, click rates, replies, bounces — but pulling that data out of the sending platform and into a format the team can actually use usually means scheduled CSV exports and manual pasting.\n\nEmma connects Smartlead directly to Google Sheets, syncing engagement data automatically on every campaign update. The team always has a live view of what's working without touching an export button.\n\nThe business value: campaign performance is always current, A/B test results are tracked without manual effort, and the data is ready for reporting the moment anyone needs it.",
    steps: [{icon:'📧',label:'Smartlead Campaign'},{icon:'🔄',label:'Sync Metrics'},{icon:'📊',label:'Google Sheets Updated'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'erp-lead-manager-ai': {
    id: 'erp-lead-manager-ai', firstName: 'Charlotte', role: 'ERP Lead Manager AI', industry: 'Sales & CRM',
    blurb: 'Captures inquiries in ERPNext and routes them to the right rep with AI-generated responses.',
    intro: 'Automatically capture new customer inquiries in ERPNext, assign them to the right rep, and trigger an AI-drafted acknowledgement — so no lead goes unacknowledged.',
    roleDescription: "ERPNext handles a lot — inventory, billing, HR — but when a new sales inquiry comes in, it can sit unnoticed in the system while the team is focused elsewhere. By the time someone picks it up, the prospect has already gone cold.\n\nCharlotte watches every new inquiry in ERPNext and acts on it immediately. The lead is assessed, assigned to the right rep based on product or territory, and an AI-drafted first response goes out automatically while a human follows up properly.\n\nThe business value: every inquiry gets acknowledged within minutes rather than hours, leads are distributed intelligently, and the team's response rate improves without anyone having to monitor an inbox continuously.",
    steps: [{icon:'⚡',label:'Inquiry Captured'},{icon:'🔀',label:'Route to Rep'},{icon:'📧',label:'AI Response Sent'}],
    time: '4 hrs/week', cost: '£640/mo',
  },

  /* ── Customer Journey (5 new) ── */
  'booking-assistant-ai': {
    id: 'booking-assistant-ai', firstName: 'Harry', role: 'Booking Assistant AI', industry: 'Customer Support',
    blurb: 'Handles customer support questions and books calendar appointments automatically via AI.',
    intro: 'Automatically answer customer support questions using AI and book appointments directly into Google Calendar — without a human managing the inbox.',
    roleDescription: "Support inboxes fill up with two types of messages: questions that have standard answers, and requests to book a time to speak. Handling both manually means someone's always playing catch-up.\n\nHarry combines both into one automated workflow. An AI agent handles common questions with accurate, context-aware answers, and when a customer asks to book a call, it checks Google Calendar and confirms the slot automatically.\n\nThe business value: common inquiries get answered instantly without staff involvement, appointment bookings happen without email ping-pong, and the support team's time goes to the genuinely complex cases that need a human.",
    steps: [{icon:'💬',label:'Customer Enquiry'},{icon:'🤖',label:'AI Responds'},{icon:'📅',label:'Appointment Booked'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'email-responder-ai': {
    id: 'email-responder-ai', firstName: 'Sophie', role: 'Smart Email Responder AI', industry: 'Customer Support',
    blurb: 'Classifies incoming emails by intent and drafts a smart reply using Gemini AI instantly.',
    intro: "Automatically classify every incoming email by intent and generate a contextually accurate reply using Gemini AI — so response times drop without the team's workload increasing.",
    roleDescription: "A busy support inbox means someone spends their morning categorising emails before they can even start responding — and by then, some customers have already waited hours for a basic acknowledgement.\n\nSophie removes both delays. The moment an email arrives, it's classified by intent, and a contextually appropriate draft reply is generated using Gemini AI. The team reviews and sends rather than writing from scratch.\n\nThe business value: first response times drop dramatically, every customer gets an acknowledgement almost immediately, and the team spends their time on quality review rather than writing the same types of replies repeatedly.",
    steps: [{icon:'📥',label:'Email Arrives'},{icon:'🏷️',label:'AI Classifies'},{icon:'✍️',label:'Draft Reply Generated'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'reservation-ai': {
    id: 'reservation-ai', firstName: 'William', role: 'Reservation Manager AI', industry: 'Customer Support',
    blurb: 'Takes reservations via Telegram, confirms with Gemini AI, and logs them in Google Sheets.',
    intro: 'Automatically receive reservation requests through Telegram, confirm availability with Gemini AI, and log every booking in Google Sheets — no manual reservation management needed.',
    roleDescription: "Reservation systems that depend on someone answering a phone or checking a inbox create gaps. A message comes in at the wrong time, nobody responds quickly enough, and the booking goes elsewhere.\n\nWilliam handles the full reservation flow through Telegram, which most customers already have on their phones. Gemini AI confirms availability, responds with booking details, and the reservation is logged automatically in Google Sheets for the team to see.\n\nThe business value: reservations are confirmed around the clock, response times are measured in seconds rather than hours, and the booking record is always accurate without manual data entry.",
    steps: [{icon:'💬',label:'Telegram Request'},{icon:'🤖',label:'Gemini Confirms'},{icon:'📊',label:'Logged in Sheets'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'form-reply-ai': {
    id: 'form-reply-ai', firstName: 'Lily', role: 'Form Auto-Reply AI', industry: 'Customer Support',
    blurb: 'Captures Tally form submissions, stores them in Airtable, and sends a Gmail confirmation.',
    intro: 'Automatically receive form submissions from Tally, store them in Airtable, and send a confirmation email via Gmail — so every submission is acknowledged and recorded without manual handling.',
    roleDescription: "Forms are often where customer journeys start — but the gap between someone submitting a form and receiving a response is where trust erodes. When that confirmation takes hours instead of seconds, first impressions suffer.\n\nLily closes that gap entirely. The moment a Tally form is submitted, the data is stored in Airtable for the team to track, and a personalised confirmation email goes to the customer via Gmail immediately.\n\nThe business value: every form submission gets an instant professional response, the team has a clean Airtable record of every inquiry, and nothing gets lost or forgotten simply because someone forgot to check the inbox.",
    steps: [{icon:'📋',label:'Form Submitted'},{icon:'📂',label:'Saved to Airtable'},{icon:'📧',label:'Gmail Confirmation'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'telegram-agent-ai': {
    id: 'telegram-agent-ai', firstName: 'Jack', role: 'Telegram AI Agent', industry: 'Customer Support',
    blurb: 'Processes text, audio, and image messages on Telegram with a full AI agent.',
    intro: 'Automatically handle customer messages across text, voice notes, and images on Telegram using a full AI agent — giving customers a responsive channel that needs no human monitoring.',
    roleDescription: "Telegram has become a preferred support channel for many customers, but staffing it means someone has to watch it continuously. Audio messages and images add another layer of complexity that a standard inbox can't handle efficiently.\n\nJack is a full AI agent that handles all three formats. Text messages get instant intelligent responses, voice notes are transcribed and answered, and images are analysed and replied to in context — all without a human in the loop.\n\nThe business value: a Telegram support channel that operates around the clock, handles multimedia inputs natively, and delivers accurate responses without tying up any member of the team.",
    steps: [{icon:'💬',label:'Telegram Message'},{icon:'🤖',label:'AI Processes'},{icon:'✅',label:'Response Sent'}],
    time: '2 hrs/week', cost: '£320/mo',
  },

  /* ── Finance (5 new) ── */
  'stripe-payment-notify-ai': {
    id: 'stripe-payment-notify-ai', firstName: 'Grace', role: 'Stripe Payment Notifier AI', industry: 'Retail & Local Services',
    blurb: 'Sends a WhatsApp receipt to customers the moment a Stripe payment completes.',
    intro: 'Automatically send a personalised WhatsApp payment confirmation to customers the instant a Stripe transaction succeeds — no manual receipting required.',
    roleDescription: "Customers who pay online expect immediate confirmation, but triggering a personalised WhatsApp message after every successful payment typically requires someone to monitor Stripe and send it manually — which nobody has time for.\n\nGrace connects Stripe directly to WhatsApp via MoltFlow. The moment a payment clears, a personalised receipt lands on the customer's phone with the transaction details extracted and formatted automatically.\n\nThe business value: customers get instant confirmation on the channel they check most, receipting requires no manual effort, and the professional follow-through builds trust from the very first transaction.",
    steps: [{icon:'💳',label:'Stripe Payment'},{icon:'⚡',label:'Trigger Fires'},{icon:'📱',label:'WhatsApp Receipt Sent'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'order-fulfil-ai': {
    id: 'order-fulfil-ai', firstName: 'Thomas', role: 'Order Fulfillment AI', industry: 'Retail & Local Services',
    blurb: 'Marks Squarespace orders as fulfilled automatically, eliminating manual order management.',
    intro: 'Automatically mark Squarespace orders as fulfilled as they complete — so the fulfilment queue stays accurate without anyone updating it by hand.',
    roleDescription: "Squarespace stores generate orders continuously, but marking each one as fulfilled is a task that falls to whoever has a spare moment — which means fulfilment status is often hours behind reality, and customers are left uncertain about their order.\n\nThomas watches the Squarespace order feed and marks orders fulfilled the moment the conditions are met, keeping the store's status accurate and customer-facing updates timely.\n\nThe business value: fulfilment records are always current, customers receive accurate status updates, and the team is freed from the repetitive admin of order management entirely.",
    steps: [{icon:'🛒',label:'Order Received'},{icon:'✅',label:'Auto-Fulfilled'},{icon:'📧',label:'Customer Updated'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'sales-report-ai': {
    id: 'sales-report-ai', firstName: 'Olivia', role: 'Sales Report Puller AI', industry: 'Retail & Local Services',
    blurb: 'Pulls Square daily sales summaries and formats them for automated reporting.',
    intro: 'Automatically pull daily sales summary data from Square and format it for reporting — so management always has accurate numbers without anyone running the export manually.',
    roleDescription: "Daily sales reporting from a Point of Sale system should be the simplest part of running a retail operation — but pulling the data, formatting it, and distributing it to the right people still takes someone's time every single day.\n\nOlivia automates the full pull-and-distribute cycle. Square sales data is extracted each day, summarised and formatted cleanly, and delivered to accounting, databases, or notification channels without anyone touching an export button.\n\nThe business value: daily sales figures are always accurate and always on time, the person who used to run the report gets that time back, and the data format is consistent every single day.",
    steps: [{icon:'🏪',label:'Square Sales Data'},{icon:'🔄',label:'Pull & Format'},{icon:'📊',label:'Report Delivered'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'revenue-spike-ai': {
    id: 'revenue-spike-ai', firstName: 'George', role: 'Revenue Spike Monitor AI', industry: 'Retail & Local Services',
    blurb: 'Monitors WooCommerce daily revenue and sends a Slack alert when targets are hit.',
    intro: 'Automatically monitor WooCommerce daily revenue figures and send a Slack notification the moment a spike or target milestone is reached — no manual dashboards to check.',
    roleDescription: "Revenue spikes often go unnoticed until the end-of-day report — by which point the opportunity to capitalise on them (push more inventory, replicate the promotion, notify the team) has already passed.\n\nGeorge watches WooCommerce revenue continuously throughout the day. The moment a daily target is hit or an unusual spike is detected, a Slack alert goes to the team with the numbers so they can act on it immediately.\n\nThe business value: the team is informed in real time when something interesting is happening in the store, without anyone having to watch a dashboard. Smart, timely decisions replace delayed end-of-day reactions.",
    steps: [{icon:'🛍️',label:'WooCommerce Revenue'},{icon:'📈',label:'Spike Detected'},{icon:'🔔',label:'Slack Alert Sent'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'stock-insight-ai': {
    id: 'stock-insight-ai', firstName: 'Isla', role: 'Stock Insight AI', industry: 'Sales & CRM',
    blurb: 'Delivers real-time stock market insights powered by xAI to your preferred channel.',
    intro: 'Automatically generate real-time stock market insights using xAI and deliver them to your preferred notification channel — continuous market intelligence without manual monitoring.',
    roleDescription: "Monitoring stock markets manually means either missing key movements or spending hours watching dashboards. Neither is sustainable for a team that has other work to do.\n\nIsla connects to xAI's market analysis capabilities and runs continuously, surfacing explainable insights on stock movements and sending them to the team the moment something notable happens.\n\nThe business value: the team stays informed about market conditions in real time without dedicating anyone's attention to watching prices. Intelligence arrives when it's relevant, not hours later when someone finally checks.",
    steps: [{icon:'📈',label:'Markets Monitored'},{icon:'🤖',label:'xAI Analysis'},{icon:'🔔',label:'Insight Delivered'}],
    time: '2 hrs/week', cost: '£320/mo',
  },

  /* ── Reporting (9 new) ── */
  'ga-report-ai': {
    id: 'ga-report-ai', firstName: 'Henry', role: 'GA Report AI', industry: 'Marketing',
    blurb: 'Extracts Google Analytics metrics, formats them, and emails the report automatically.',
    intro: 'Automatically extract Google Analytics performance data, compile it into a formatted report, and distribute it by email — so management always has up-to-date website numbers.',
    roleDescription: "Google Analytics reporting means going into the platform, configuring the date range, exporting the data, formatting it for readability, and emailing it to the relevant people. Done daily or weekly, that process eats time that could go elsewhere.\n\nHenry automates the entire pipeline. Analytics data is pulled on schedule, formatted into a clean HTML report with the key metrics highlighted, and distributed to whoever needs it — without anyone touching the platform.\n\nThe business value: consistent, formatted website performance reports delivered on time every time, with the manual reporting work removed entirely from the team's plate.",
    steps: [{icon:'📊',label:'Pull GA Data'},{icon:'🔄',label:'Format Report'},{icon:'📧',label:'Email Delivered'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'youtube-stats-ai': {
    id: 'youtube-stats-ai', firstName: 'Poppy', role: 'YouTube Stats AI', industry: 'Marketing',
    blurb: 'Pulls YouTube video performance metrics and logs them in Google Sheets automatically.',
    intro: 'Automatically collect YouTube video statistics and save them to Google Sheets on a schedule — so performance tracking never requires a manual export.',
    roleDescription: "YouTube analytics are buried inside the platform — getting them into a format the team can actually use means logging in, filtering by video or date, exporting, and pasting into a sheet. For a channel with regular uploads, that becomes a significant ongoing task.\n\nPoppy runs that export automatically. Video statistics are pulled from the YouTube API on schedule and written into Google Sheets, where they can be filtered, charted, and compared without anyone visiting the platform.\n\nThe business value: performance data is always available in the team's working tool of choice, trends are visible across videos and time periods, and the content team has the numbers they need without waiting for a data pull.",
    steps: [{icon:'▶️',label:'YouTube Videos'},{icon:'🔄',label:'Pull Statistics'},{icon:'📊',label:'Logged in Sheets'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'seo-audit-ai': {
    id: 'seo-audit-ai', firstName: 'Edward', role: 'SEO Audit AI', industry: 'Marketing',
    blurb: 'Runs competitor SEO analysis via SEMrush and logs findings in Google Sheets automatically.',
    intro: 'Automatically run competitor SEO analysis using the SEMrush API and log the findings in Google Sheets — ongoing SEO intelligence without manual research sessions.',
    roleDescription: "Competitor SEO analysis is valuable but time-consuming — checking keyword rankings, domain authority, backlink profiles, and content gaps by hand means hours of research that most teams can only afford occasionally.\n\nEdward connects to the SEMrush API and runs competitor analysis automatically on a schedule. Findings are logged directly in Google Sheets, giving the team a live and historical picture of the competitive landscape without manual research.\n\nThe business value: the team has regular SEO intelligence on competitors rather than snapshots taken once a quarter. Strategy decisions can be made with current data, and the research hours are recovered entirely.",
    steps: [{icon:'🔍',label:'SEMrush Analysis'},{icon:'🔄',label:'Process Data'},{icon:'📊',label:'Logged in Sheets'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'fb-ads-insight-ai': {
    id: 'fb-ads-insight-ai', firstName: 'Freya', role: 'Facebook Ads Insight AI', industry: 'Marketing',
    blurb: 'Extracts Facebook Ads data, runs Gemini AI analysis, and pushes insights to Google Sheets.',
    intro: 'Automatically extract Facebook Ads campaign data, analyse performance patterns with Gemini AI, and push actionable insights into Google Sheets — no manual analysis required.',
    roleDescription: "Facebook Ads campaigns generate a lot of data, and extracting meaningful insight from it requires someone to pull the numbers, compare campaigns, identify what's working, and document the findings. That analysis session is always something that gets pushed when the team is busy.\n\nFreya handles the extraction and analysis automatically. Campaign data is pulled from Facebook Ads, processed through Gemini AI to surface performance patterns and anomalies, and the findings land in Google Sheets ready for the team to act on.\n\nThe business value: regular, consistent analysis of ad performance without scheduling a manual session. Underperforming campaigns get noticed sooner, and the insights are documented rather than living in someone's head.",
    steps: [{icon:'📣',label:'Facebook Ads Data'},{icon:'🤖',label:'Gemini Analysis'},{icon:'📊',label:'Insights in Sheets'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'ga4-email-ai': {
    id: 'ga4-email-ai', firstName: 'Charlie', role: 'GA4 Email Report AI', industry: 'Marketing',
    blurb: 'Pulls GA4 data, generates AI insights, and emails a formatted performance report.',
    intro: 'Automatically extract GA4 analytics data, apply trend analysis with AI-generated insights, and deliver a formatted report by email — regular website intelligence without manual effort.',
    roleDescription: "GA4 has significant reporting capabilities, but getting a clean, insight-driven summary out of it and into stakeholders' inboxes still requires someone to go in, pull the data, interpret the trends, and write it up.\n\nCharlie automates that entire flow. GA4 data is extracted on schedule, colour-coded trend analysis is applied automatically, and an AI-generated narrative summarising the key insights is packaged into an email report that lands in the right inboxes.\n\nThe business value: stakeholders get regular, intelligible performance reports without the team spending time on data extraction and interpretation. The reporting cadence becomes reliable and the quality stays consistent.",
    steps: [{icon:'📊',label:'GA4 Data Pulled'},{icon:'🤖',label:'AI Insights Generated'},{icon:'📧',label:'Report Emailed'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'ga-airtable-ai': {
    id: 'ga-airtable-ai', firstName: 'Daisy', role: 'Analytics to Airtable AI', industry: 'Sales & CRM',
    blurb: 'Transfers Google Analytics data to an Airtable database automatically on schedule.',
    intro: 'Automatically transfer Google Analytics website data into an Airtable database on schedule — so the team can build custom dashboards and reports without manual data migration.',
    roleDescription: "Teams that want to combine website analytics with their own operational data in Airtable face a recurring manual task: exporting from Google Analytics and importing into Airtable. Done weekly or daily, it's a drain.\n\nDaisy connects both platforms directly, transferring analytics data to Airtable automatically. Once the data is there, the team can build any view, filter, or report they need without going back to Google Analytics.\n\nThe business value: website data lives where the team already works, cross-referencing analytics with other business data becomes straightforward, and the manual import step disappears entirely.",
    steps: [{icon:'📊',label:'Google Analytics'},{icon:'🔄',label:'Auto Transfer'},{icon:'📂',label:'Airtable Updated'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'tiktok-analytics-ai': {
    id: 'tiktok-analytics-ai', firstName: 'Noah', role: 'TikTok Analytics AI', industry: 'Marketing',
    blurb: 'Tracks TikTok account performance metrics and logs them to Google Sheets automatically.',
    intro: 'Automatically track TikTok account performance metrics on a schedule and log every data point into Google Sheets — continuous social analytics without manual pulling.',
    roleDescription: "TikTok analytics require the team to go into the app or creator dashboard, check numbers manually, and record them somewhere useful. For an active account, that's a repetitive weekly task with no return beyond the data it captures.\n\nNoah runs that capture automatically via RapidAPI. Account performance metrics are pulled on schedule and written into Google Sheets, where the team can track trends over time and compare performance across content types.\n\nThe business value: a growing historical record of TikTok performance that requires no manual effort to maintain. Content decisions can be grounded in data rather than gut feel, and the tracking cadence never slips because someone forgot.",
    steps: [{icon:'🎵',label:'TikTok Account'},{icon:'🔄',label:'Pull via RapidAPI'},{icon:'📊',label:'Logged in Sheets'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'newsletter-brief-ai': {
    id: 'newsletter-brief-ai', firstName: 'Ava', role: 'Newsletter Briefing AI', industry: 'Sales & CRM',
    blurb: 'Summarises incoming newsletters with AI and delivers a daily briefing email.',
    intro: 'Automatically process incoming newsletters via Gmail, extract key insights with AI, store them in Google Sheets, and deliver a daily briefing email — so the team stays informed without reading every newsletter manually.',
    roleDescription: "Subscribing to industry newsletters is valuable, but actually reading them is a different matter. Inboxes fill with valuable information that nobody has time to absorb, and the value of staying informed gets lost to the volume.\n\nAva reads newsletters as they arrive, uses AI to extract the most relevant insights, and logs them in Google Sheets. Each morning, a clean briefing email summarises what mattered — without the team needing to read anything themselves.\n\nThe business value: the team stays genuinely informed about their industry without the time cost of reading dozens of emails. Important developments get seen and acted on, and inbox overload stops being an excuse for staying uninformed.",
    steps: [{icon:'📧',label:'Newsletter Arrives'},{icon:'🤖',label:'AI Summarises'},{icon:'📋',label:'Daily Briefing Sent'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'crunchbase-scout-ai': {
    id: 'crunchbase-scout-ai', firstName: 'Liam', role: 'Crunchbase Scout AI', industry: 'Sales & CRM',
    blurb: 'Scrapes recent funding rounds from Crunchbase and delivers them as sales triggers.',
    intro: 'Automatically scrape recent funding rounds from Crunchbase and surface them as sales triggers — so the team can reach out to freshly funded companies at exactly the right moment.',
    roleDescription: "Newly funded companies are a prime sales opportunity — they've just received budget and are actively investing in growth. But identifying them in time means monitoring Crunchbase regularly, which nobody actually has time to do.\n\nLiam watches Crunchbase for new funding announcements on a schedule, extracts the relevant company data, and delivers it directly to the team as a structured lead list — timed to when the news is fresh and outreach is most likely to land.\n\nThe business value: the team never misses a funding announcement that represents a sales opportunity. Outreach goes out when the timing is right, and the research that would have taken an SDR hours is delivered automatically.",
    steps: [{icon:'🔍',label:'Monitor Crunchbase'},{icon:'⚡',label:'New Funding Found'},{icon:'🎯',label:'Lead Alert Sent'}],
    time: '2 hrs/week', cost: '£320/mo',
  },

  /* ── CRM Optimisation (8 new) ── */
  'linkedin-to-hubspot-ai': {
    id: 'linkedin-to-hubspot-ai', firstName: 'Isabella', role: 'LinkedIn to HubSpot AI', industry: 'Sales & CRM',
    blurb: 'Creates HubSpot contacts from people who interact with LinkedIn posts automatically.',
    intro: 'Automatically capture everyone who interacts with your LinkedIn posts and create a corresponding HubSpot contact — so social engagement turns into CRM pipeline without manual data entry.',
    roleDescription: "LinkedIn post engagement is a strong signal of intent — someone who comments on or reacts to your content is expressing interest. But converting that engagement into a CRM contact currently means manually noting names, looking them up, and entering data.\n\nIsabella automates the full capture. Post interactions are detected automatically, the interacting profile is extracted, and a contact is created in HubSpot with the relevant details and source context — ready for follow-up.\n\nThe business value: warm leads who have already engaged with your content are captured automatically, so no sales opportunity walks away simply because nobody got round to following up a LinkedIn interaction.",
    steps: [{icon:'💼',label:'LinkedIn Interaction'},{icon:'🔄',label:'Extract Profile'},{icon:'✅',label:'HubSpot Contact Created'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'airtable-hubspot-sync-ai': {
    id: 'airtable-hubspot-sync-ai', firstName: 'Mason', role: 'Airtable-HubSpot Sync AI', industry: 'Sales & CRM',
    blurb: 'Keeps contacts perfectly synced two-ways between Airtable and HubSpot, always.',
    intro: 'Automatically keep contact records in sync between Airtable and HubSpot in both directions — update either system, and the other reflects it within minutes.',
    roleDescription: "Teams that use Airtable for operations and HubSpot for CRM end up with two versions of the same contact data that quickly diverge. Someone updates a phone number in one place, and the other stays wrong indefinitely — until a call goes to the wrong number or a deal is attached to a stale record.\n\nMason keeps both in sync automatically. Any change in either system triggers a bidirectional update, so both tools always hold the same version of the truth without manual reconciliation.\n\nThe business value: one source of truth across both platforms, with the hours that used to go into checking which version is current recovered entirely. Contacts, companies, and deal data stay accurate regardless of which tool the team uses.",
    steps: [{icon:'🔄',label:'Change Detected'},{icon:'↔️',label:'Two-Way Sync'},{icon:'✅',label:'Both Updated'}],
    time: '4 hrs/week', cost: '£640/mo',
  },
  'deal-distributor-ai': {
    id: 'deal-distributor-ai', firstName: 'Ethan', role: 'Deal Distributor AI', industry: 'Sales & CRM',
    blurb: 'Routes won deals to Slack for celebration and lost deals to Airtable for analysis.',
    intro: 'Automatically route every new HubSpot deal to the right destination — won deals to Slack for team visibility, and lost deals to Airtable with follow-up tickets prioritised by value.',
    roleDescription: "Deal outcomes generate two separate needs: celebrating wins visibly to keep the team motivated, and analysing losses carefully to understand why they happened. Both currently require someone to manually distribute the information.\n\nEthan handles both instantly. The moment a deal is marked won, a Slack notification goes to the team. The moment one is lost, it's sent to Airtable with a follow-up ticket created and prioritised by the deal value — so higher-value losses get more immediate attention.\n\nThe business value: wins are celebrated in real time, which drives team morale. Losses are captured with context for analysis, and the highest-value ones get actioned first — all without anyone managing the distribution.",
    steps: [{icon:'⚡',label:'Deal Closed'},{icon:'🔀',label:'Route by Outcome'},{icon:'🎉',label:'Slack / Airtable'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'contact-enrichment-ai': {
    id: 'contact-enrichment-ai', firstName: 'Mia', role: 'Contact Enrichment AI', industry: 'Sales & CRM',
    blurb: 'Enriches HubSpot contacts with AI-sourced company data, filling every blank field.',
    intro: 'Automatically enrich every HubSpot contact with AI-sourced company data — so the CRM stays complete without anyone manually researching each record.',
    roleDescription: "HubSpot contacts often arrive with just a name and email — half-filled records that make every rep's call prep slower. Filling those gaps manually means searching the web for company size, industry, and funding status for every new contact.\n\nMia extracts the email domain from each new contact, uses AI and web search to populate structured business information, and writes it back into HubSpot automatically. The record is complete before anyone ever opens it.\n\nThe business value: reps go into calls with full context rather than blank fields. The CRM becomes genuinely useful for segmentation and reporting, rather than a partially completed address book.",
    steps: [{icon:'👤',label:'New Contact'},{icon:'🔎',label:'AI Enrichment'},{icon:'✅',label:'HubSpot Updated'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'lead-router-gpt-ai': {
    id: 'lead-router-gpt-ai', firstName: 'Logan', role: 'GPT Lead Router AI', industry: 'Sales & CRM',
    blurb: 'Uses GPT-4 to match HubSpot leads to the best-fit rep based on Airtable profiles.',
    intro: 'Automatically route every new HubSpot lead to the best-matched sales rep using GPT-4 analysis against your team profiles in Airtable — smarter distribution than round-robin.',
    roleDescription: "Standard round-robin lead routing is fair, but not intelligent — a lead with a specific industry background or deal size gets assigned to whoever's next in the queue, regardless of whether that rep has the right experience or current capacity.\n\nLogan uses GPT-4 to read each new lead's details and compare them against the sales team's profiles stored in Airtable — matching on industry experience, deal type, and current workload. The right rep gets the right lead.\n\nThe business value: leads land with the rep most likely to close them, not just the next one in rotation. Conversion rates improve, rep frustration from mis-matched leads decreases, and the routing logic scales as the team grows.",
    steps: [{icon:'⚡',label:'New HubSpot Lead'},{icon:'🤖',label:'GPT-4 Matches Rep'},{icon:'🎯',label:'Assigned in HubSpot'}],
    time: '4 hrs/week', cost: '£640/mo',
  },
  'domain-enrich-ai': {
    id: 'domain-enrich-ai', firstName: 'Aiden', role: 'Domain Traffic Enricher AI', industry: 'Sales & CRM',
    blurb: 'Enriches domain lists with SimilarWeb traffic data in Google Sheets and Airtable.',
    intro: 'Automatically enrich a list of domains with SimilarWeb traffic analytics and update Google Sheets or Airtable — so sales teams have website size data without manual research.',
    roleDescription: "Prospecting with account-based selling requires knowing the size and reach of each target company's web presence — but looking up SimilarWeb traffic data for a list of domains manually takes hours that SDRs should be spending on calls.\n\nAiden takes the domain list and enriches each entry with SimilarWeb metrics automatically. The results land in Google Sheets or Airtable alongside the rest of the prospect data, giving the team everything they need in one place.\n\nThe business value: sales teams can prioritise outreach based on verified traffic data rather than guesswork, and the research hours are recovered entirely. Higher-traffic prospects get first attention, and the data is always fresh.",
    steps: [{icon:'🌐',label:'Domain List'},{icon:'🔍',label:'SimilarWeb Data'},{icon:'📊',label:'Sheets / Airtable Updated'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'typeform-lead-ai': {
    id: 'typeform-lead-ai', firstName: 'Amelia', role: 'Typeform Lead Scorer AI', industry: 'Sales & CRM',
    blurb: 'Captures Typeform leads, scores them, and sends Slack alerts for high-priority prospects.',
    intro: 'Automatically capture Typeform form submissions, apply lead scoring logic, create HubSpot contacts, and fire a Slack alert when a high-priority prospect submits.',
    roleDescription: "Forms are the most common lead capture tool, but without scoring, every submission looks the same — a warm enterprise prospect gets the same response time as a student doing research. High-value leads get lost in the queue.\n\nAmelia applies scoring logic the moment a Typeform submission comes in. Company size, role, and intent signals are evaluated, the lead is created in HubSpot with a score attached, and the team gets a Slack alert only for the ones that actually warrant immediate attention.\n\nThe business value: the team knows which form submissions to act on immediately without manually reviewing every one. Response times for high-value leads improve, and the CRM record is created automatically before anyone picks up the phone.",
    steps: [{icon:'📋',label:'Typeform Submitted'},{icon:'🏆',label:'Lead Scored'},{icon:'🔔',label:'Slack Alert (High Priority)'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'linkedin-leads-ai': {
    id: 'linkedin-leads-ai', firstName: 'Lucas', role: 'LinkedIn Lead Qualifier AI', industry: 'Sales & CRM',
    blurb: 'Turns LinkedIn post reactions into qualified leads using AI profile scoring and Apify.',
    intro: 'Automatically scrape LinkedIn post reactions with Apify, enrich profiles, score them against your ICP using AI, and surface only the qualified leads — so social engagement becomes pipeline.',
    roleDescription: "A LinkedIn post that gets strong engagement is a prospecting goldmine — but converting reactions and comments into qualified leads means manually visiting each profile, assessing fit, and deciding whether to reach out. Nobody does it consistently.\n\nLucas automates the entire qualification process. Reactions are scraped with Apify, profiles are enriched with company and role data, and AI scores each person against the ideal customer profile. Only the qualified leads surface for follow-up.\n\nThe business value: LinkedIn engagement converts into a structured, pre-qualified lead list without manual effort. The team reaches out to people who've already expressed interest, and the qualification filter ensures time isn't wasted on poor-fit contacts.",
    steps: [{icon:'💼',label:'LinkedIn Reactions'},{icon:'🔍',label:'Apify Scrapes Profiles'},{icon:'🎯',label:'AI Qualifies Leads'}],
    time: '3 hrs/week', cost: '£480/mo',
  },

  /* ── Bespoke (7 new) ── */
  'webhook-builder-ai': {
    id: 'webhook-builder-ai', firstName: 'Harper', role: 'Webhook Builder AI', industry: 'Operations & HR',
    blurb: 'Creates custom n8n workflows on demand via webhook without touching the n8n editor.',
    intro: 'Automatically generate fully functional n8n workflows on demand by sending a JSON definition to a webhook — programmatic workflow creation without opening the editor.',
    roleDescription: "Building automation workflows at scale — where different customers or products need customised versions of the same base workflow — usually means opening the n8n editor and manually copying, modifying, and activating each one. That doesn't scale.\n\nHarper accepts JSON workflow definitions via a webhook and creates them in n8n automatically using the API. Any business logic that needs a unique workflow instance gets one generated programmatically, without editor time.\n\nThe business value: organisations running n8n at scale can generate client-specific or product-specific workflows on demand, cutting the operational overhead of workflow management dramatically.",
    steps: [{icon:'🪝',label:'Webhook Triggered'},{icon:'🏗️',label:'Build Workflow'},{icon:'✅',label:'Workflow Active'}],
    time: '4 hrs/week', cost: '£640/mo',
  },
  'error-retry-ai': {
    id: 'error-retry-ai', firstName: 'Jackson', role: 'Error Recovery AI', industry: 'Operations & HR',
    blurb: 'Automatically retries failed workflow steps with exponential backoff and failure alerts.',
    intro: 'Automatically catch workflow failures, retry them with intelligent exponential backoff, and send failure notifications when retries are exhausted — so transient errors never kill a workflow.',
    roleDescription: "Automation workflows fail for temporary reasons — an API rate limit, a momentary network blip, a service that went down for 30 seconds. Without retry logic, those transient failures require manual intervention to restart.\n\nJackson intercepts failures and applies intelligent retry logic with exponential backoff, giving the failing service time to recover before attempting again. If retries are exhausted, the team gets a notification so nothing slips past undetected.\n\nThe business value: workflows self-heal from temporary failures without manual restarts. The team is only notified when there's a genuine problem that needs attention, rather than every time an API has a bad second.",
    steps: [{icon:'⚠️',label:'Workflow Fails'},{icon:'🔁',label:'Retry with Backoff'},{icon:'🔔',label:'Alert if Exhausted'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'drive-airtable-ai': {
    id: 'drive-airtable-ai', firstName: 'Evelyn', role: 'Drive to Airtable Sync AI', industry: 'Operations & HR',
    blurb: 'Monitors Google Drive for new files and logs them with metadata into Airtable automatically.',
    intro: 'Automatically detect new files uploaded to Google Drive, extract their metadata, log them in Airtable, and notify the team by email — so file tracking is always current.',
    roleDescription: "Shared Google Drive folders accumulate files continuously, but knowing when something new has been added — and capturing the file details in a structured way — currently requires manual checking or a spreadsheet that nobody keeps updated.\n\nEvelyn watches the Drive folder automatically. When a new file is added, its metadata is captured and a new Airtable record is created. Team members get an email notification so nothing slips in unnoticed.\n\nThe business value: a live, structured inventory of shared files that stays current without manual management. For teams that route documents through Drive as part of a workflow, this creates a reliable audit trail of what has arrived and when.",
    steps: [{icon:'☁️',label:'New Drive File'},{icon:'📂',label:'Log to Airtable'},{icon:'📧',label:'Team Notified'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'zoom-archive-ai': {
    id: 'zoom-archive-ai', firstName: 'Sebastian', role: 'Zoom Archive AI', industry: 'Operations & HR',
    blurb: 'Saves Zoom recordings to Google Drive and logs meeting details in Airtable automatically.',
    intro: 'Automatically save completed Zoom recordings to Google Drive and log the meeting details in Airtable — so every recorded call is archived and findable without manual effort.',
    roleDescription: "Zoom recordings are valuable — sales calls, client meetings, training sessions — but they expire from Zoom's cloud storage and need to be moved somewhere permanent. Doing that manually for every meeting is a task that falls through the cracks.\n\nSebastian handles the archive automatically. The moment a Zoom meeting recording is ready, it's downloaded and saved to Google Drive in the right folder, and the meeting details are logged in Airtable for reference.\n\nThe business value: no recording is ever lost to cloud expiry, every call has a permanent home, and the Airtable log makes it possible to search for any meeting's recording without hunting through Drive manually.",
    steps: [{icon:'📹',label:'Zoom Recording Ready'},{icon:'☁️',label:'Save to Drive'},{icon:'📂',label:'Log in Airtable'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'order-reward-ai': {
    id: 'order-reward-ai', firstName: 'Abigail', role: 'Order Reward AI', industry: 'Retail & Local Services',
    blurb: 'Sends order confirmations and first-buyer discount coupons automatically after payment.',
    intro: 'Automatically send order confirmation emails with Slack notifications, plus personalised discount coupons for first-time buyers — making the post-purchase moment feel considered.',
    roleDescription: "The moment after a customer pays is an opportunity to build loyalty or just send a generic receipt. Most businesses send the generic receipt because the personalised version would require someone to check whether this is a first-time buyer and generate a coupon manually.\n\nAbigail handles the full post-purchase sequence automatically. Every payment triggers an email confirmation and a Slack notification. For first-time buyers, a personalised discount coupon is generated and included, making the first experience memorable.\n\nThe business value: customer loyalty programmes start at the first purchase without manual intervention. The post-purchase sequence feels intentional, and the cost of the first-buyer reward is offset by the repeat purchase rate it drives.",
    steps: [{icon:'💳',label:'Payment Success'},{icon:'📧',label:'Order Confirmation'},{icon:'🎁',label:'First-Buyer Coupon'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'team-invite-ai': {
    id: 'team-invite-ai', firstName: 'Matthew', role: 'Team Onboarder AI', industry: 'Operations & HR',
    blurb: 'Reads a Google Sheet team roster and automatically invites new users to n8n.',
    intro: "Automatically sync a Google Sheets team roster with n8n user management, sending invitations to anyone who appears in the sheet but doesn't yet have an account.",
    roleDescription: "Adding new team members to n8n means going into the admin panel, finding the invite screen, entering each person's email, and sending it manually. For teams that onboard regularly, this becomes a recurring overhead.\n\nMatthew runs a sync between a Google Sheets roster and n8n's user management. When someone is added to the sheet, an invite is generated and sent automatically. The admin panel is never touched.\n\nThe business value: onboarding a new automation team member takes seconds rather than admin intervention. Sheets remains the source of truth for team membership, and n8n access is provisioned automatically when someone joins.",
    steps: [{icon:'📊',label:'Roster Updated'},{icon:'🔍',label:'Find New Members'},{icon:'✉️',label:'n8n Invite Sent'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'meeting-prep-ai': {
    id: 'meeting-prep-ai', firstName: 'Emily', role: 'Meeting Prep AI', industry: 'Sales & CRM',
    blurb: 'Enriches prospects via Bright Data when a Cal.com meeting is booked and logs to Airtable.',
    intro: "Automatically enrich a prospect's profile using Bright Data the moment they book a meeting via Cal.com, and log the prepared brief in Airtable — so every call starts fully researched.",
    roleDescription: "Meeting prep is one of the most valuable things a sales rep can do and one of the first things to get skipped when the calendar gets full. The result is calls where the rep is discovering things about the prospect in real time that they should have known going in.\n\nEmily removes that gap. The moment a Cal.com booking is confirmed, Bright Data enriches the prospect's profile with company, role, and online presence data. The brief is logged in Airtable and linked to the meeting so the rep has everything before they dial in.\n\nThe business value: every discovery call starts with the rep already briefed. Conversations are more substantive, trust is built faster, and close rates improve when preparation is never the bottleneck.",
    steps: [{icon:'📅',label:'Meeting Booked'},{icon:'🔍',label:'Bright Data Enrichment'},{icon:'📂',label:'Brief in Airtable'}],
    time: '3 hrs/week', cost: '£480/mo',
  },

  /* ── Marketing Automation (10 new) ── */
  'social-visuals-ai': {
    id: 'social-visuals-ai', firstName: 'Alexander', role: 'Social Visuals Publisher AI', industry: 'Marketing',
    blurb: 'Generates platform-specific social graphics with Abyssale and publishes via Blotato.',
    intro: 'Automatically generate multi-format social media graphics using Abyssale templates and publish them across channels via Blotato — a complete visual content pipeline without manual design.',
    roleDescription: "Producing social visuals at scale — different sizes for Instagram, LinkedIn, Twitter, and Facebook — means a designer resizing and exporting the same asset multiple times, or a marketer using an app manually for every post.\n\nAlexander automates the full pipeline. Content is fed in, Abyssale generates the correctly-sized visual for each platform, and Blotato handles the publishing across all channels simultaneously.\n\nThe business value: social visual production scales to any posting frequency without adding design hours. Every platform gets the right format, and the team's creative effort goes into the content strategy rather than the production.",
    steps: [{icon:'🎨',label:'Content Input'},{icon:'🖼️',label:'Abyssale Generates'},{icon:'📣',label:'Published via Blotato'}],
    time: '4 hrs/week', cost: '£640/mo',
  },
  'festival-post-ai': {
    id: 'festival-post-ai', firstName: 'Elizabeth', role: 'Festival Post AI', industry: 'Marketing',
    blurb: 'Creates and posts festival-themed content to X and Facebook automatically with Gemini AI.',
    intro: 'Automatically generate festival and seasonal social media posts using Gemini AI and publish them to X/Twitter and Facebook — timely content that never misses a key date.',
    roleDescription: "Seasonal and festival content requires knowing what's coming up, generating relevant posts, and publishing them at the right time. Miss a key date and the opportunity for timely engagement is gone. The manual version requires someone monitoring a content calendar continuously.\n\nElizabeth handles the full flow. Upcoming festivals and seasonal dates are monitored, Gemini AI generates appropriate promotional content for each, and the posts go to X and Facebook automatically at the right time.\n\nThe business value: the social presence feels culturally aware and consistently active without requiring the marketing team to manage a manual content calendar. Seasonal engagement opportunities are never missed.",
    steps: [{icon:'🎉',label:'Festival Date'},{icon:'🤖',label:'Gemini Creates Content'},{icon:'📣',label:'Published to X & FB'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'newsletter-gen-ai': {
    id: 'newsletter-gen-ai', firstName: 'Daniel', role: 'Newsletter Generator AI', industry: 'Marketing',
    blurb: 'Builds a personalised daily newsletter from RSS feeds using Google Gemini and delivers it.',
    intro: 'Automatically collect articles from RSS feeds, personalise and summarise them using Google Gemini AI, and send a daily newsletter to subscribers — regular high-quality content without editorial effort.',
    roleDescription: "Running a newsletter that people actually read requires sourcing relevant content daily, curating it intelligently, and writing summaries that aren't just copied headlines. For a small team, that's a significant time commitment before any other marketing work happens.\n\nDaniel automates the entire editorial cycle. RSS feeds are monitored for new articles, Gemini AI selects and personalises the most relevant content for the audience, and the newsletter is assembled and sent on schedule.\n\nThe business value: a daily newsletter that maintains editorial quality without the manual curation hours. Subscribers receive a genuinely useful digest, and the team's attention goes to strategy rather than sourcing and writing summaries.",
    steps: [{icon:'📡',label:'RSS Feeds Monitored'},{icon:'🤖',label:'Gemini Curates'},{icon:'📧',label:'Newsletter Sent'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'gmail-sort-ai': {
    id: 'gmail-sort-ai', firstName: 'Sofia', role: 'Gmail Sorter AI', industry: 'Marketing',
    blurb: 'Classifies and labels every incoming Gmail email using Google Gemini AI automatically.',
    intro: 'Automatically classify and label every incoming Gmail email using Google Gemini AI — so the inbox is organised by priority and type without any manual sorting.',
    roleDescription: "A busy Gmail inbox is impossible to work from without organisation — but manually labelling and categorising emails as they arrive takes time that could be spent on the emails themselves. Most people give up on the system when volume gets high.\n\nSofia uses Gemini AI to classify every incoming email automatically. High Priority, Work Related, Marketing, and other categories are applied as labels the moment the email lands, so the inbox is sorted before the user even opens it.\n\nThe business value: the inbox becomes navigable regardless of volume. Important emails surface immediately, marketing and low-priority items don't compete for attention, and the categorisation is consistent rather than depending on whether someone had time to sort their email that morning.",
    steps: [{icon:'📥',label:'Email Arrives'},{icon:'🤖',label:'Gemini Classifies'},{icon:'🏷️',label:'Label Applied'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'blog-rss-ai': {
    id: 'blog-rss-ai', firstName: 'Michael', role: 'Blog Content AI', industry: 'Marketing',
    blurb: 'Monitors RSS feeds and generates SEO-optimised blog posts with Gemini, delivered via Telegram.',
    intro: 'Automatically monitor RSS feeds for topics, generate SEO-optimised blog articles using Google Gemini AI, and deliver finished content via Telegram — consistent publishing without a writer on call.',
    roleDescription: "Maintaining a blog at a consistent cadence requires content ideas, writing, and SEO optimisation — three separate skills that most small marketing teams can only sustain if they sacrifice something else.\n\nMichael watches RSS feeds for trending topics relevant to the business, generates full blog articles using Gemini AI optimised for search, and delivers the finished drafts via Telegram for quick review and publishing.\n\nThe business value: a consistent content output that doesn't depend on a writer being available every week. SEO coverage improves, the blog stays active, and the team's review effort is minimal compared to writing from scratch.",
    steps: [{icon:'📡',label:'RSS Topic Found'},{icon:'✍️',label:'Gemini Writes Post'},{icon:'📲',label:'Delivered via Telegram'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'wp-blog-ai': {
    id: 'wp-blog-ai', firstName: 'Avery', role: 'WordPress Blog AI', industry: 'Marketing',
    blurb: 'Generates and publishes scheduled or on-demand blog posts to WordPress using AI.',
    intro: 'Automatically generate and publish SEO-optimised blog posts to WordPress on a schedule or on-demand via prompt — content published without a writer managing the process.',
    roleDescription: "WordPress blogs need a steady flow of content to build search authority, but generating that content — researching topics, writing articles, optimising for SEO, scheduling publication — is a full-time content role that many businesses can't sustain.\n\nAvery operates in both modes: on a schedule, it generates and publishes new posts automatically; on-demand, a prompt triggers immediate content generation and publication. Either way, WordPress gets fresh content without manual authoring.\n\nThe business value: the blog publishes consistently regardless of the team's capacity, SEO presence grows steadily, and the time that would go into content creation goes into distribution and strategy instead.",
    steps: [{icon:'💡',label:'Topic / Schedule'},{icon:'🤖',label:'AI Writes Article'},{icon:'🌐',label:'Published to WordPress'}],
    time: '4 hrs/week', cost: '£640/mo',
  },
  'rss-social-ai': {
    id: 'rss-social-ai', firstName: 'Owen', role: 'RSS to Social AI', industry: 'Marketing',
    blurb: 'Transforms RSS articles into AI-summarised social posts with images and auto-publishes.',
    intro: 'Automatically transform RSS feed articles into AI-summarised social media posts with generated images and publish them to Facebook and Instagram — content repurposing on autopilot.',
    roleDescription: "Repurposing blog content or news articles into social media posts means reading the article, summarising it for the right audience and platform, sourcing or creating an image, and posting it. Done for every article, every day, it's a significant content operations burden.\n\nOwen takes any RSS feed and converts each new article into a ready-to-publish social post. AI generates a platform-appropriate summary, an accompanying image is created, and the post goes to Facebook and Instagram automatically.\n\nThe business value: social channels stay active with relevant, high-quality content without the team spending hours on content operations. Every new blog post or news article becomes a piece of social content without anyone working to make it so.",
    steps: [{icon:'📡',label:'RSS Article'},{icon:'🤖',label:'AI Summary + Image'},{icon:'📣',label:'Posted to Social'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'blogger-post-ai': {
    id: 'blogger-post-ai', firstName: 'Ella', role: 'Blogger Post AI', industry: 'Marketing',
    blurb: 'Generates SEO blog posts from current news via OpenRouter AI and publishes to Blogger.',
    intro: 'Automatically generate SEO-optimised blog posts from current news using OpenRouter AI and the Mediastack API, then publish them directly to Blogger — news-driven content on autopilot.',
    roleDescription: "News-reactive content is one of the highest-performing SEO strategies — articles that connect a business's expertise to current events can rank quickly and drive significant traffic. But monitoring news and writing articles in response requires someone watching the news and writing fast.\n\nElla monitors Mediastack for relevant news, uses OpenRouter AI to generate SEO-optimised articles that connect the news to the business's content angle, and publishes them to Blogger automatically.\n\nThe business value: a content strategy that responds to current events in near-real time, without a human writer on call. Articles are published while the news is fresh, when ranking potential is highest, without requiring any manual effort.",
    steps: [{icon:'📰',label:'News Detected'},{icon:'✍️',label:'AI Writes Article'},{icon:'🌐',label:'Published to Blogger'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'cold-icebreaker-ai': {
    id: 'cold-icebreaker-ai', firstName: 'Wyatt', role: 'Cold Email Icebreaker AI', industry: 'Marketing',
    blurb: 'Generates personalised cold email icebreakers from LinkedIn or website data using GPT-4.',
    intro: 'Automatically generate personalised cold email icebreakers for each prospect by analysing their LinkedIn profile or website with GPT-4 — so every cold email opens with something that feels researched.',
    roleDescription: "The icebreaker is the difference between a cold email that gets read and one that gets deleted. Writing a genuinely personalised first line for each prospect — based on their recent posts, company news, or LinkedIn activity — takes research time that most SDRs can't sustain at scale.\n\nWyatt does that research automatically. For each prospect, LinkedIn or website data is analysed by GPT-4, which generates a unique, contextually relevant icebreaker. The personalised line drops into the email template before it's sent.\n\nThe business value: cold emails open with lines that feel researched and relevant, rather than generic. Response rates improve, the prospect's first impression is better, and the SDR writes zero icebreakers manually — the research is done before they even open the email.",
    steps: [{icon:'🔍',label:'Research Profile'},{icon:'🤖',label:'GPT-4 Writes Icebreaker'},{icon:'📧',label:'Added to Email'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'shopify-blog-ai': {
    id: 'shopify-blog-ai', firstName: 'Scarlett', role: 'Shopify Blog AI', industry: 'Marketing',
    blurb: 'Generates SEO and AEO-optimised blog articles for Shopify stores using GPT-4.',
    intro: 'Automatically generate SEO and AEO-optimised blog articles for Shopify stores using GPT-4 — consistent content that drives organic traffic without ongoing editorial resources.',
    roleDescription: "Shopify stores with active blogs consistently outperform those without in organic search — but maintaining a blog alongside running an e-commerce operation is exactly the kind of task that gets deprioritised when orders are coming in.\n\nScarlett handles the full content cycle. Keywords are identified, GPT-4 generates articles optimised for both search engines and AI-generated answer engines, images are sourced, and the content is published to Shopify automatically. Duplicate prevention logic ensures the same topic isn't covered twice.\n\nThe business value: organic search presence grows consistently without a dedicated content role. The blog publishes on schedule, articles are genuinely search-optimised, and the team's energy stays on fulfillment and customers.",
    steps: [{icon:'🔑',label:'Keyword Selected'},{icon:'✍️',label:'GPT-4 Writes Article'},{icon:'🛍️',label:'Published to Shopify'}],
    time: '4 hrs/week', cost: '£640/mo',
  },

  /* ── Customer Support Automation (10 new) ── */
  'ticket-classify-ai': {
    id: 'ticket-classify-ai', firstName: 'Luke', role: 'Ticket Classifier AI', industry: 'Customer Support',
    blurb: 'Triages support tickets with multi-model AI classification against a knowledge base.',
    intro: 'Automatically triage every incoming support ticket using multi-model AI classification and knowledge base matching — routing each ticket to the right team before a human sees it.',
    roleDescription: "Support ticket triage is typically a manual first step — someone reads each incoming ticket, decides its priority and category, and routes it to the right team. At high volume, that person is a bottleneck the entire support operation depends on.\n\nLuke removes that bottleneck. Every incoming ticket is assessed by a multi-model AI classification system that checks it against a knowledge base, assigns a priority and category, and routes it automatically. Only genuinely ambiguous cases need human triage.\n\nThe business value: tickets reach the right team faster, priority tickets are identified and escalated immediately, and the triage burden is removed from the support team entirely. Response times improve across every tier.",
    steps: [{icon:'🎫',label:'Ticket Arrives'},{icon:'🤖',label:'AI Classifies'},{icon:'🔀',label:'Routed to Team'}],
    time: '4 hrs/week', cost: '£640/mo',
  },
  'jira-from-email-ai': {
    id: 'jira-from-email-ai', firstName: 'Victoria', role: 'Outlook-to-Jira AI', industry: 'Customer Support',
    blurb: 'Converts Outlook support emails into Jira issues automatically using AI prioritisation.',
    intro: 'Automatically convert Outlook support emails into Jira issues with AI-assigned priority — so every support request becomes a trackable ticket without manual Jira entry.',
    roleDescription: "Support requests that arrive by email often get handled in the inbox rather than in Jira — which means they're not tracked, not assigned formally, and not visible in sprint planning. When they fall through, there's no audit trail.\n\nVictoria monitors the Outlook support inbox and converts every incoming email into a Jira issue automatically. AI reads the email content to assign priority and category, so the Jira ticket arrives already triaged rather than as a blank entry.\n\nThe business value: every support request is tracked in Jira from the moment it arrives, regardless of which channel it came through. The team has full visibility, SLAs can be monitored, and no request is lost because it sat in an inbox instead of a ticket system.",
    steps: [{icon:'📧',label:'Outlook Email'},{icon:'🤖',label:'AI Prioritises'},{icon:'🎫',label:'Jira Issue Created'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'zendesk-ticket-ai': {
    id: 'zendesk-ticket-ai', firstName: 'Ryan', role: 'Zendesk Ticketer AI', industry: 'Customer Support',
    blurb: 'Creates Zendesk support tickets automatically from multiple incoming channels.',
    intro: 'Automatically create Zendesk support tickets from incoming messages across multiple channels — so every customer contact becomes a tracked ticket without manual entry.',
    roleDescription: "Support requests arrive through multiple channels — email, live chat, social media, forms — and converting each one into a Zendesk ticket manually means someone is constantly switching between tools and creating entries by hand.\n\nRyan handles ticket creation automatically across all connected channels. The moment a support message arrives, a Zendesk ticket is created with the relevant details extracted and populated, ready for the team to respond through a single unified queue.\n\nThe business value: nothing falls through the cracks because it came through an informal channel. Every customer contact is tracked, every SLA clock starts immediately, and the team works from a single queue rather than monitoring multiple inboxes.",
    steps: [{icon:'💬',label:'Customer Message'},{icon:'⚡',label:'Auto-Capture'},{icon:'🎫',label:'Zendesk Ticket Created'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'hubspot-sla-ai': {
    id: 'hubspot-sla-ai', firstName: 'Madison', role: 'SLA Guardian AI', industry: 'Customer Support',
    blurb: 'Triages HubSpot tickets, creates Jira issues for high-priority ones, and sends Slack SLA alerts.',
    intro: 'Automatically triage HubSpot support tickets by priority, create Jira issues for escalations, and send Slack alerts when SLAs are at risk — SLA compliance without manual monitoring.',
    roleDescription: "Support SLAs are easy to commit to and hard to maintain when they depend on someone manually checking ticket ages and escalating the ones that are approaching the deadline. When that person is busy, SLAs get breached.\n\nMadison monitors HubSpot ticket ages continuously. High-priority tickets are automatically escalated to Jira for engineering involvement. When any ticket approaches its SLA window, a Slack alert fires before the breach occurs rather than after.\n\nThe business value: SLA compliance becomes systematic rather than dependent on someone's attention. Breaches drop, escalation happens at the right time, and the support team isn't manually checking ages against a spreadsheet.",
    steps: [{icon:'🎫',label:'HubSpot Ticket'},{icon:'⚠️',label:'SLA Risk Detected'},{icon:'🔔',label:'Jira + Slack Alert'}],
    time: '4 hrs/week', cost: '£640/mo',
  },
  'gemini-email-ai': {
    id: 'gemini-email-ai', firstName: 'Nathan', role: 'Gemini Email Manager AI', industry: 'Customer Support',
    blurb: 'Categorises Gmail emails with Gemini AI and replies, drafts, or archives them intelligently.',
    intro: 'Automatically categorise incoming Gmail emails using Gemini AI, then either send instant replies, create drafts for review, or archive irrelevant messages — intelligent email management without manual triage.',
    roleDescription: "Managing a support Gmail inbox manually means reading every incoming email to decide what needs a reply, what needs drafting, and what can be archived. For high-volume inboxes, that triage is a significant daily task before any actual responding happens.\n\nNathan uses Gemini to assess each email's intent and urgency. Straightforward queries get an instant AI reply. Complex ones get a draft for review. Irrelevant messages get archived automatically, so the inbox only contains things that need genuine attention.\n\nThe business value: inbox triage becomes automatic, response times improve for straightforward queries, and the support team's attention goes to the complex cases that genuinely need a human. Inbox zero is achievable without manual effort.",
    steps: [{icon:'📧',label:'Email Arrives'},{icon:'🤖',label:'Gemini Categorises'},{icon:'✅',label:'Reply / Draft / Archive'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'auto-responder-ai': {
    id: 'auto-responder-ai', firstName: 'Luna', role: 'Smart Auto-Responder AI', industry: 'Customer Support',
    blurb: 'Sends AI-generated smart replies to emails while integrating with CRM and marketing tools.',
    intro: 'Automatically generate and send smart AI replies to incoming emails, while integrating with CRM systems and marketing tools to capture context and take follow-up actions.',
    roleDescription: "Standard auto-responders send the same message to everyone regardless of what they asked. That feels impersonal at best and tone-deaf at worst — telling someone their inquiry has been received when they sent an urgent complaint doesn't help anyone.\n\nLuna generates contextually appropriate responses based on what the email actually says. Routine queries get accurate instant replies. Complex ones get an acknowledgement plus a CRM note. Marketing opt-ins trigger list updates automatically.\n\nThe business value: customers receive responses that feel considered rather than generic, routine queries are resolved without human involvement, and the CRM and marketing stack stay updated without manual data entry after every email.",
    steps: [{icon:'📥',label:'Email Arrives'},{icon:'🤖',label:'AI Reads & Responds'},{icon:'🔄',label:'CRM + Tools Updated'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'feedback-router-ai': {
    id: 'feedback-router-ai', firstName: 'Adam', role: 'Feedback Router AI', industry: 'Customer Support',
    blurb: 'Analyses customer feedback across Gmail, Zendesk, and Slack using AI and routes it to Pipedrive.',
    intro: 'Automatically gather customer feedback from Gmail, Zendesk, and Slack, analyse sentiment and category with AI, and route findings to the right team with Pipedrive CRM updates.',
    roleDescription: "Customer feedback arrives from multiple channels and gets lost in each one — positive reviews sit in email, complaints pile up in Zendesk, and candid product feedback appears in Slack threads. Nobody has a complete picture.\n\nAdam collects feedback from all three channels, runs AI sentiment and topic analysis across all of it, and routes each piece to the relevant team: product feedback to the product board, negative experience flags to customer success, and positive signals to the marketing team — with CRM updates in Pipedrive throughout.\n\nThe business value: the business hears what customers are actually saying, across every channel, without anyone manually aggregating feedback. The right teams see the right signals at the right time.",
    steps: [{icon:'💬',label:'Feedback Collected'},{icon:'🤖',label:'AI Analyses Sentiment'},{icon:'🔀',label:'Routed to Teams'}],
    time: '4 hrs/week', cost: '£640/mo',
  },
  'human-loop-ai': {
    id: 'human-loop-ai', firstName: 'Chloe', role: 'Human-in-Loop Email AI', industry: 'Customer Support',
    blurb: 'Drafts AI email replies via IMAP and holds them for human review before sending.',
    intro: 'Automatically draft AI-generated email replies via IMAP and queue them for human review before sending — so AI handles the writing and humans handle the approval.',
    roleDescription: "Full AI email automation works for simple, predictable queries. For anything with nuance — customer complaints, pricing discussions, relationship-sensitive conversations — sending an AI reply without review creates risk.\n\nChloe finds the balance. AI drafts the reply based on the email content and available context, but holds it in a review queue before sending. A human approves, edits, or rejects each draft — so speed comes from AI writing, and quality comes from human oversight.\n\nThe business value: response times drop by 60–80% because the drafting work is done. The team reviews rather than writes, which is faster and lower-friction. And no sensitive email goes out without a human having read it first.",
    steps: [{icon:'📥',label:'Email Arrives'},{icon:'✍️',label:'AI Drafts Reply'},{icon:'👁️',label:'Human Reviews & Sends'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'gmail-alert-ai': {
    id: 'gmail-alert-ai', firstName: 'Tyler', role: 'Gmail Alert AI', industry: 'Customer Support',
    blurb: 'Classifies Gmail emails with GPT-4o mini and sends priority alerts via Telegram.',
    intro: 'Automatically classify every Gmail email using GPT-4o mini and send an instant Telegram notification for high-priority messages — so nothing important is missed in a busy inbox.',
    roleDescription: "A busy Gmail inbox makes it easy to miss something important — the high-priority request buried under newsletters, the urgent complaint that arrived overnight, the time-sensitive enquiry that needed a reply within the hour.\n\nTyler classifies every incoming email using GPT-4o mini and filters for what actually matters. When a high-priority message arrives, a Telegram notification fires immediately — so the team is alerted to what needs attention without checking Gmail every few minutes.\n\nThe business value: urgent emails get noticed regardless of when they arrive or how busy the inbox is. The Telegram alert means the team can step away from their inbox without missing something that needs an immediate response.",
    steps: [{icon:'📧',label:'Gmail Arrives'},{icon:'🤖',label:'GPT-4o Classifies'},{icon:'📲',label:'Telegram Alert Sent'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'email-memory-ai': {
    id: 'email-memory-ai', firstName: 'Penelope', role: 'Email Memory AI', industry: 'Customer Support',
    blurb: 'Parses Gmail emails with AI and stores structured intelligence in Mem0 for RAG agents.',
    intro: 'Automatically parse incoming Gmail emails with AI and store structured client intelligence in Mem0 persistent memory — so AI agents have context on every past interaction without manual logging.',
    roleDescription: "AI agents that handle customer queries need context — what has this customer said before, what issues have they had, what did the team promise them? Without that memory, every interaction starts from scratch.\n\nPenelope builds that memory automatically. Every incoming email is parsed by AI, key information is extracted, and it's stored in Mem0 as persistent structured memory. Any AI agent handling the customer later has full context on past interactions without anyone manually logging it.\n\nThe business value: AI customer support agents become genuinely contextual — they know the customer's history before the conversation starts. Trust builds faster, issues are resolved without the customer repeating themselves, and the support experience feels personal even when it's automated.",
    steps: [{icon:'📧',label:'Email Parsed'},{icon:'🤖',label:'AI Extracts Intel'},{icon:'🧠',label:'Stored in Mem0'}],
    time: '3 hrs/week', cost: '£480/mo',
  },

  /* ── HR & Recruitment Automation (10 new) ── */
  'cv-intake-ai': {
    id: 'cv-intake-ai', firstName: 'Benjamin', role: 'CV Intake AI', industry: 'HR & Recruitment',
    blurb: 'Handles job application submissions via n8n forms and routes them with AI screening.',
    intro: 'Automatically receive job applications via n8n forms, screen them with AI, and route qualifying candidates to the right stage — so the hiring pipeline stays moving without manual intake.',
    roleDescription: "Every job posting generates a volume of applications that someone has to process. Reading through CVs, deciding which move forward, and organising them into stages is often the most time-consuming part of recruitment — before any candidate ever speaks to the business.\n\nBenjamin handles the intake end-to-end. Applications arrive via n8n forms, AI screens each one against the job requirements, and candidates who qualify are automatically moved to the next stage with their details organised for the hiring manager.\n\nThe business value: the volume of applications no longer determines how long intake takes. The hiring pipeline processes applications continuously rather than in batches, and the hiring manager's time goes to the candidates who matter rather than the screening itself.",
    steps: [{icon:'📋',label:'Application Received'},{icon:'🤖',label:'AI Screens CV'},{icon:'🔀',label:'Qualified Candidates Routed'}],
    time: '4 hrs/week', cost: '£640/mo',
  },
  'resume-scorer-ai': {
    id: 'resume-scorer-ai', firstName: 'Layla', role: 'Resume Scorer AI', industry: 'HR & Recruitment',
    blurb: 'Uses OpenAI to score and rank CVs against a job description, logging results in Google Sheets.',
    intro: 'Automatically score and rank candidate CVs against the job description using OpenAI, and log the results in Google Sheets — objective shortlisting at any volume.',
    roleDescription: "Shortlisting from a pool of CVs involves reading each one, mentally scoring it against the requirements, and deciding where it sits in the ranking. At volume, that judgement becomes inconsistent — early applications are evaluated differently from later ones when the reader is fatigued.\n\nLayla removes that inconsistency. Each CV is scored by OpenAI against the same job description criteria, generating a numerical score and a brief rationale. All results are logged in Google Sheets in ranked order, ready for the hiring manager to review.\n\nThe business value: shortlisting is faster, consistent, and defensible. Every candidate is evaluated against the same criteria. The hiring manager reviews a ranked list rather than a pile, and the first-pass screening takes minutes rather than days.",
    steps: [{icon:'📄',label:'CV Received'},{icon:'🤖',label:'OpenAI Scores'},{icon:'📊',label:'Ranked in Sheets'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'job-hunter-ai': {
    id: 'job-hunter-ai', firstName: 'Joseph', role: 'Job Hunter AI', industry: 'HR & Recruitment',
    blurb: 'Finds matching jobs via Google Jobs and SerpAPI and generates tailored cover letters with Gemini.',
    intro: 'Automatically search for matching job opportunities via Google Jobs and SerpAPI, then generate tailored cover letters for each role using Gemini AI — applications at scale without manual searching.',
    roleDescription: "For recruitment teams placing candidates, or businesses managing outplacement support, finding matching roles and producing tailored applications for each is enormously time-consuming. Every candidate needs their own job search and their own personalised cover letters.\n\nJoseph automates both. Job searches run continuously via Google Jobs and SerpAPI based on each candidate's profile. For every matching role found, Gemini generates a tailored cover letter that reflects the specific requirements of the position.\n\nThe business value: candidate application volume scales without adding recruitment hours. Each candidate gets a broader search than a human researcher could sustain, and the cover letters are genuinely tailored rather than generic templates with names swapped.",
    steps: [{icon:'🔍',label:'Job Search Runs'},{icon:'🎯',label:'Match Found'},{icon:'✍️',label:'Cover Letter Generated'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'cv-ranker-ai': {
    id: 'cv-ranker-ai', firstName: 'Riley', role: 'CV Ranker AI', industry: 'HR & Recruitment',
    blurb: 'Compares multiple CVs against a job description with OpenAI and ranks candidates by fit.',
    intro: 'Automatically compare multiple candidate CVs against a job description using OpenAI and generate ranked fit scores — objective candidate ranking without manual review.',
    roleDescription: "Comparing candidates fairly across a role requires reading every CV with the same job requirements in mind — which is hard to sustain consistently when reviewing thirty applications in a session.\n\nRiley applies a consistent AI evaluation across all candidates simultaneously. Every CV is analysed against the job description, a fit score is generated with reasoning, and the full candidate pool is ranked by match quality. Hiring managers see the most suitable candidates at the top.\n\nThe business value: candidate evaluation is objective and consistent regardless of batch size. The top candidates are visible immediately, hiring decisions are better-grounded in requirements, and the initial review time drops to minutes rather than hours.",
    steps: [{icon:'📄',label:'CVs Submitted'},{icon:'🤖',label:'OpenAI Compares'},{icon:'🏆',label:'Ranked by Fit Score'}],
    time: '4 hrs/week', cost: '£640/mo',
  },
  'linkedin-jobs-ai': {
    id: 'linkedin-jobs-ai', firstName: 'Samuel', role: 'LinkedIn Jobs AI', industry: 'HR & Recruitment',
    blurb: 'Scrapes LinkedIn job listings via RSS and Gemini AI, storing results in Google Sheets.',
    intro: 'Automatically scrape LinkedIn job listings using RSS and Gemini AI, and store structured results in Google Sheets — a live job market feed without manual searching.',
    roleDescription: "Monitoring LinkedIn job listings for candidates, competitive intelligence, or market research means someone checking manually and copying data into a tracker. Done at any scale or frequency, it's unsustainable.\n\nSamuel scrapes LinkedIn job listings automatically via RSS integration and Gemini AI processing. Listings are extracted, structured, and stored in Google Sheets, creating a live, searchable record of the job market without any manual effort.\n\nThe business value: a continuously updated job market dataset that would take hours of manual monitoring to maintain is built automatically. Recruiters can match candidates to opportunities faster, and the data is always current.",
    steps: [{icon:'💼',label:'LinkedIn Jobs'},{icon:'🤖',label:'Gemini Extracts'},{icon:'📊',label:'Stored in Sheets'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'jobs-newsletter-ai': {
    id: 'jobs-newsletter-ai', firstName: 'Zoey', role: 'Jobs Newsletter AI', industry: 'HR & Recruitment',
    blurb: 'Aggregates job postings with AI and distributes a curated newsletter to subscribers.',
    intro: 'Automatically aggregate relevant job postings, enhance them with AI, and distribute a professional jobs newsletter to subscribers — candidate engagement without manual curation.',
    roleDescription: "Recruitment newsletters require someone to find relevant job listings, write them up in a format subscribers will read, and distribute them on schedule. That curation effort is often what prevents newsletters from being consistent.\n\nZoey automates the full production. Job postings are aggregated from relevant sources, enhanced by ChatGPT to improve presentation and add context, and distributed as a polished newsletter to the subscriber list via Mails.so — on schedule, every time.\n\nThe business value: a jobs newsletter that goes out consistently without editorial effort. Subscribers receive a curated, well-presented digest of relevant opportunities, and the recruitment brand stays visible to a live candidate pool without ongoing manual work.",
    steps: [{icon:'🔍',label:'Jobs Aggregated'},{icon:'🤖',label:'AI Enhances'},{icon:'📧',label:'Newsletter Distributed'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'policy-compliance-ai': {
    id: 'policy-compliance-ai', firstName: 'Andrew', role: 'Policy Compliance AI', industry: 'HR & Recruitment',
    blurb: 'Monitors employee communications for policy violations using GPT-4 and alerts via Slack.',
    intro: 'Automatically monitor employee communications and documents for policy violations using GPT-4, and send real-time alerts to compliance teams via Slack and email.',
    roleDescription: "Compliance monitoring that depends on random sampling or reported incidents misses most of what it needs to catch. But monitoring every communication manually is not something any HR or legal team has the capacity to do.\n\nAndrew uses GPT-4 to analyse communications and documents continuously against defined policy criteria. When a potential violation is detected, a real-time alert goes to the compliance team via Slack and email with the relevant details for review.\n\nThe business value: policy compliance monitoring scales beyond what manual review can cover. Potential issues surface immediately rather than months later, and the compliance function has a documented audit trail of what was reviewed and when.",
    steps: [{icon:'📄',label:'Communication Reviewed'},{icon:'🤖',label:'GPT-4 Checks Policy'},{icon:'🔔',label:'Compliance Alerted'}],
    time: '4 hrs/week', cost: '£640/mo',
  },
  'hyperperson-outreach-ai': {
    id: 'hyperperson-outreach-ai', firstName: 'Nora', role: 'Outreach Personalizer AI', industry: 'HR & Recruitment',
    blurb: 'Pulls leads from Apollo, enriches with LinkedIn, and sends hyperpersonalised emails via SendGrid.',
    intro: 'Automatically source leads from Apollo, enrich each profile with LinkedIn data, generate hyperpersonalised emails using GPT-4.1, and send via SendGrid — B2B outreach at scale.',
    roleDescription: "B2B outreach at meaningful scale requires sourcing a prospect list, researching each person, writing a personalised email for each one, and sending it — all while tracking what was sent and following up. Doing this manually caps the volume any team can realistically manage.\n\nNora runs the entire pipeline automatically. Apollo provides the lead pool, LinkedIn enrichment adds professional context for each contact, and GPT-4.1 writes a genuinely personalised email based on the individual's background. SendGrid handles delivery at any volume.\n\nThe business value: personalised outreach volume scales independently of headcount. Each prospect receives an email that reflects genuine research, which improves open and reply rates, and the team manages campaign strategy rather than individual email production.",
    steps: [{icon:'🔍',label:'Apollo Leads'},{icon:'🤖',label:'GPT-4.1 Personalises'},{icon:'📧',label:'SendGrid Delivers'}],
    time: '4 hrs/week', cost: '£640/mo',
  },
  'linkedin-cv-ai': {
    id: 'linkedin-cv-ai', firstName: 'Dylan', role: 'LinkedIn Profile Extractor AI', industry: 'HR & Recruitment',
    blurb: 'Scrapes LinkedIn profiles with Bright Data and builds structured JSON resumes with Gemini.',
    intro: 'Automatically scrape LinkedIn profiles using Bright Data and generate structured JSON resumes with Google Gemini AI — candidate profiling at scale without manual data extraction.',
    roleDescription: "Building a structured candidate profile from a LinkedIn URL currently means visiting the profile, reading it, and manually entering the information into whatever system the team uses. For a recruiter processing dozens of candidates, that's hours of repetitive data work.\n\nDylan takes a LinkedIn URL and handles everything automatically. Bright Data scrapes the profile cleanly, Gemini AI extracts and structures the information into a JSON resume format compatible with ATS systems, and the result is ready to import.\n\nThe business value: candidate profiling scales to any volume without additional research hours. The structured output is consistent, importable, and arrives in seconds rather than the minutes it takes to build manually.",
    steps: [{icon:'💼',label:'LinkedIn URL'},{icon:'🔍',label:'Bright Data Scrapes'},{icon:'📄',label:'JSON Resume Built'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'job-app-ai': {
    id: 'job-app-ai', firstName: 'Hannah', role: 'Job Application AI', industry: 'HR & Recruitment',
    blurb: 'Generates tailored CVs, cover letters, and interview prep from LinkedIn jobs using AI.',
    intro: 'Automatically analyse LinkedIn job postings and generate personalised CVs, cover letters, and interview prep questions for each role using AI — end-to-end job application support.',
    roleDescription: "Applying for jobs effectively means tailoring the CV and cover letter for each specific role, then preparing for the likely interview questions based on what that employer is looking for. Done properly, each application takes significant time — which is why most people reuse the same materials.\n\nHannah generates everything from scratch for each role. The job posting is analysed, a tailored CV and cover letter are produced, and a set of likely interview preparation questions with model answers is included. Every application package is specific to that role.\n\nThe business value: candidates applying with AI-tailored materials perform significantly better at application stage. For outplacement services or career coaching operations, the volume of genuinely tailored applications per candidate increases without adding advisor time.",
    steps: [{icon:'🔍',label:'Job Posting Analysed'},{icon:'🤖',label:'AI Tailors Materials'},{icon:'📄',label:'CV + Cover Letter + Prep'}],
    time: '3 hrs/week', cost: '£480/mo',
  },

  /* ── IT & Security Automation (10 new) ── */
  'attack-surface-ai': {
    id: 'attack-surface-ai', firstName: 'Brandon', role: 'Attack Surface Mapper AI', industry: 'IT & Security',
    blurb: 'Maps external attack surfaces via Shodan and DNS enumeration, surfacing exposed assets.',
    intro: 'Automatically map your external attack surface by performing DNS enumeration and Shodan API queries — identifying internet-facing assets and potential entry points before an attacker does.',
    roleDescription: "Security teams need to know what's exposed to the internet before adversaries find it first. Manual asset discovery is slow and incomplete — subdomains proliferate, IP ranges change, and the attack surface evolves faster than periodic audits can track.\n\nBrandon runs continuous external reconnaissance. DNS enumeration identifies all associated IP addresses and subdomains, Shodan queries surface any that are internet-facing, and the results are compiled into a structured report of what's exposed and what's notable.\n\nThe business value: the security team has an up-to-date picture of external exposure without scheduling manual assessment sprints. New assets are discovered as they appear, and the reconnaissance data matches what an attacker would actually find.",
    steps: [{icon:'🌐',label:'Domain Submitted'},{icon:'🔍',label:'DNS + Shodan Scan'},{icon:'🗺️',label:'Attack Surface Mapped'}],
    time: '5 hrs/week', cost: '£800/mo',
  },
  'github-monitor-ai': {
    id: 'github-monitor-ai', firstName: 'Ellie', role: 'GitHub Monitor AI', industry: 'IT & Security',
    blurb: 'Monitors GitHub events in real time and routes notifications to Slack, email, or project tools.',
    intro: 'Automatically monitor GitHub repository events — pushes, pull requests, issues, and security alerts — and route instant notifications to Slack, email, or project management tools.',
    roleDescription: "Development teams that need to stay across repository activity currently either check GitHub manually, configure individual email notifications, or rely on someone remembering to look at the event log. None of those approaches work reliably at team scale.\n\nEllie watches GitHub events in real time and routes the ones that matter to the right channels. Security alerts go to the security team, PR notifications go to reviewers, deployment events go to ops — with customisable filtering so only relevant events generate noise.\n\nThe business value: the team is informed of what's happening in the codebase in real time without anyone monitoring GitHub directly. Critical security events are surfaced immediately, and the notification routing is intelligent rather than broadcasting everything to everyone.",
    steps: [{icon:'⚡',label:'GitHub Event'},{icon:'🔀',label:'Filter & Route'},{icon:'🔔',label:'Slack / Email / Tools'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'secret-expiry-ai': {
    id: 'secret-expiry-ai', firstName: 'Jordan', role: 'Secret Expiry AI', industry: 'IT & Security',
    blurb: 'Monitors Microsoft Entra ID for expiring app secrets and certificates, emailing reports before they lapse.',
    intro: 'Automatically detect expiring application secrets and certificates across Microsoft Entra ID tenants and send email reports before they lapse — preventing authentication failures before they cause outages.',
    roleDescription: "Expired application secrets and certificates cause service outages that are entirely preventable — yet they keep happening because tracking expiry dates across multiple Entra ID applications is a manual process that relies on someone remembering to check.\n\nJordan monitors every application secret and certificate across connected Entra ID tenants and sends email reports when anything is approaching expiry. The right team receives the right warning with enough lead time to rotate credentials without incident.\n\nThe business value: authentication outages caused by expired credentials become a thing of the past. The security and IT teams are notified in advance, renewals happen on schedule, and no service goes down because an expiry date was missed.",
    steps: [{icon:'🔑',label:'Entra ID Scanned'},{icon:'⚠️',label:'Expiry Detected'},{icon:'📧',label:'Report Emailed'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'workflow-error-ai': {
    id: 'workflow-error-ai', firstName: 'Aubrey', role: 'Workflow Error Alerter AI', industry: 'IT & Security',
    blurb: 'Detects n8n workflow failures in real time and posts error details to Slack immediately.',
    intro: 'Automatically detect n8n workflow failures the moment they occur and send detailed error notifications to Slack — so the team knows about failures before they affect downstream processes.',
    roleDescription: "Workflow failures that go undetected are the worst kind — they silently stop a process that other systems depend on, and by the time someone notices, the downstream impact has already compounded. Manual monitoring means only finding out when the consequences are already visible.\n\nAubrey watches n8n for workflow failures continuously. The moment one occurs, a notification goes to the team's Slack channel with the workflow name, error details, and timestamp — so the issue is visible and actionable immediately.\n\nThe business value: the mean time to notice a workflow failure drops from hours or days to seconds. The team can address errors before they affect customers or other systems, and the on-call burden of manually checking n8n health is eliminated.",
    steps: [{icon:'⚠️',label:'Workflow Fails'},{icon:'⚡',label:'Error Detected'},{icon:'🔔',label:'Slack Alert Sent'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'log-cleanup-ai': {
    id: 'log-cleanup-ai', firstName: 'Cameron', role: 'Log Cleanup AI', industry: 'IT & Security',
    blurb: 'Automatically purges old n8n execution logs based on custom retention rules via the API.',
    intro: 'Automatically clean up old n8n execution logs according to configurable retention rules using the n8n API — keeping performance optimised without manual log management.',
    roleDescription: "n8n execution logs accumulate over time and degrade performance without anyone noticing. Manual cleanup requires going into the n8n instance, identifying old executions, and deleting them — a maintenance task that gets deprioritised until performance suffers.\n\nCameron runs log cleanup automatically on a schedule. Retention rules define how long successful, failed, and cancelled executions are kept, and the n8n API removes anything older than the threshold automatically.\n\nThe business value: n8n instances run at consistent performance levels without manual maintenance. Storage costs stay predictable, and the operations team isn't spending time on database hygiene when the workflow can handle it.",
    steps: [{icon:'🗂️',label:'Schedule Triggered'},{icon:'🔍',label:'Old Logs Found'},{icon:'🗑️',label:'Purged via API'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'uptime-email-ai': {
    id: 'uptime-email-ai', firstName: 'Clara', role: 'Uptime Email Alerter AI', industry: 'IT & Security',
    blurb: 'Pings servers on a schedule, logs status in Google Sheets, and emails alerts when one goes down.',
    intro: 'Automatically ping servers on a schedule, log uptime status in Google Sheets, and send instant email alerts when a server becomes unavailable — monitoring without expensive subscriptions.',
    roleDescription: "Server downtime discovered by a customer complaint is the worst possible way to find out a service is unavailable. Manual checking isn't viable, and commercial monitoring subscriptions have costs that many smaller operations can't justify.\n\nClara provides the monitoring without the subscription. Servers are pinged on a schedule, status is logged in Google Sheets for historical reference, and the moment a server fails to respond, an email alert goes to the right person immediately.\n\nThe business value: downtime is detected and communicated in minutes rather than hours. The Google Sheets log provides a historical record for SLA reporting and capacity planning, and the monitoring cost is the automation rather than a monthly subscription fee.",
    steps: [{icon:'🖥️',label:'Server Pinged'},{icon:'📊',label:'Status Logged'},{icon:'📧',label:'Alert if Down'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'iot-backup-ai': {
    id: 'iot-backup-ai', firstName: 'Austin', role: 'IoT Backup AI', industry: 'IT & Security',
    blurb: 'Requests and saves Zigbee2MQTT configuration backups automatically via MQTT and SFTP.',
    intro: 'Automatically schedule, request, and save Zigbee2MQTT configuration backups via MQTT and SFTP — so smart home or IoT infrastructure is always recoverable.',
    roleDescription: "Zigbee smart home and IoT deployments have a critical dependency: the Zigbee2MQTT configuration. If the device running it fails without a recent backup, the entire network of paired devices needs to be reconfigured from scratch — a significant undertaking.\n\nAustin schedules backup requests automatically via MQTT, receives the configuration file, and saves it securely via SFTP. Backups happen on schedule without anyone remembering to trigger them.\n\nThe business value: IoT infrastructure is always recoverable from a recent known-good state. The operational risk of a device failure causing hours of reconfiguration work is eliminated, and the backup cadence is reliable rather than depending on someone remembering.",
    steps: [{icon:'🏠',label:'Backup Scheduled'},{icon:'📡',label:'MQTT Request Sent'},{icon:'💾',label:'Saved via SFTP'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'drive-notify-ai': {
    id: 'drive-notify-ai', firstName: 'Phoebe', role: 'Drive Notify AI', industry: 'IT & Security',
    blurb: 'Monitors Google Drive for new file uploads and sends instant email notifications to the team.',
    intro: 'Automatically detect new file uploads to monitored Google Drive folders and send instant email notifications — so the team knows immediately when new files arrive without checking manually.',
    roleDescription: "Shared Google Drive folders are often used as intake points for important files — contracts, reports, submissions — but knowing when something new has arrived means either checking the folder manually or missing it until the sender follows up.\n\nPhoebe watches monitored Drive folders and fires an email notification the moment a new file is detected. The notification includes the file name and uploader details, so the recipient knows exactly what arrived and when.\n\nThe business value: files that matter are noticed immediately rather than discovered hours later. The team can act on new documents as soon as they arrive, and the manual folder-checking habit is replaced by reliable instant notification.",
    steps: [{icon:'☁️',label:'New File Uploaded'},{icon:'⚡',label:'Detected Instantly'},{icon:'📧',label:'Team Notified'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'ai-news-digest-ai': {
    id: 'ai-news-digest-ai', firstName: 'Connor', role: 'AI News Digest AI', industry: 'IT & Security',
    blurb: 'Aggregates AI news from RSS, Reddit and HN, summarises with Claude, and posts to Discord and Slack.',
    intro: 'Automatically collect AI news from RSS feeds, Reddit, and Hacker News, summarise everything with Claude AI, and distribute a daily digest to Discord and Slack — staying informed without inbox overload.',
    roleDescription: "The AI and technology landscape moves fast. Staying current means monitoring RSS feeds, Reddit threads, and Hacker News simultaneously — which translates to significant time spent reading, or important developments going unnoticed because nobody had time to check.\n\nConnor monitors all three simultaneously, aggregates the most relevant content, and uses Claude to summarise everything into a concise digest. The summary posts to Discord and Slack automatically, so the team receives a curated briefing rather than a firehose of unread links.\n\nThe business value: the team stays current on AI and technology developments without spending time monitoring multiple sources manually. The digest format means important news surfaces in 5 minutes of reading rather than an hour of browsing.",
    steps: [{icon:'📡',label:'RSS + Reddit + HN'},{icon:'🤖',label:'Claude Summarises'},{icon:'💬',label:'Discord & Slack Digest'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'posthog-event-ai': {
    id: 'posthog-event-ai', firstName: 'Violet', role: 'PostHog Event Tracker AI', industry: 'IT & Security',
    blurb: 'Converts webhook events from any service into trackable PostHog analytics events automatically.',
    intro: 'Automatically convert incoming webhook requests from any third-party service into structured PostHog analytics events — capturing product interactions without custom code.',
    roleDescription: "Tracking events from third-party services in PostHog typically requires custom code for each integration — a webhook handler that parses the incoming payload and submits it to the PostHog API in the right format. That engineering overhead means most third-party events go untracked.\n\nViolet handles that translation automatically. Any webhook from any service is received, the payload is parsed, and a correctly structured PostHog event is created. The product team captures third-party interactions alongside native product events without writing integration code.\n\nThe business value: the analytics picture in PostHog becomes complete — product events from external services are captured alongside native ones, and the product team can build meaningful funnels and cohorts that include the full user journey across all connected tools.",
    steps: [{icon:'🪝',label:'Webhook Received'},{icon:'🔄',label:'Parse Payload'},{icon:'📊',label:'PostHog Event Created'}],
    time: '2 hrs/week', cost: '£320/mo',
  },

}

const parseHrs  = s => parseFloat(s)
const parseCost = s => parseFloat(s.replace(/[^0-9.]/g, ''))

/* ─── Categories — warm maroon/gold colour palette ────────── */
const CATEGORIES = [
  {
    id: 'sales-automation', name: 'Sales Automation', icon: '📈', color: '#7a1c1c',
    label: 'SALES & CRM · AI AUTOMATION',
    sub: 'Lead to close — fully automatic.',
    descPre: "From the moment a lead comes in to the moment it's followed up — ",
    descEm: 'assigned, tracked, and recovered automatically.',
    description: 'From the moment a lead comes in to the moment it\'s followed up — assigned, tracked, and recovered automatically.',
    automationIds: ['lead-router-ai', 'win-back-campaign-ai', 'deal-recovery-ai', 'renewal-reminder-ai', 'upsell-builder-ai', 'email-tracker-ai', 'apollo-lead-ai', 'ai-lead-nurture-ai', 'cold-email-tracker-ai', 'erp-lead-manager-ai'],
  },
  {
    id: 'customer-journey', name: 'Customer Journey Automation', icon: '🚀', color: '#c9963a',
    label: 'CUSTOMER JOURNEY · AI AUTOMATION',
    sub: 'Win to delivery — zero manual steps.',
    descPre: 'From signed contract to onboarding to review request — ',
    descEm: 'the entire post-sale chain handled automatically.',
    description: 'Onboarding, contracts, orders, and reviews — handled automatically from win to delivery.',
    automationIds: ['contract-generator-ai', 'document-filing-ai', 'order-form-builder-ai', 'review-collector-ai', 'onboarding-ai', 'booking-assistant-ai', 'email-responder-ai', 'reservation-ai', 'form-reply-ai', 'telegram-agent-ai'],
  },
  {
    id: 'finance-automation', name: 'Finance & Invoice Automation', icon: '💰', color: '#9b2c2c',
    label: 'FINANCE · AI AUTOMATION',
    sub: 'Invoices sent before you remember to.',
    descPre: 'Billing, invoicing, and payment tracking — ',
    descEm: 'kept on schedule without anyone chasing it manually.',
    description: 'Billing, invoicing, and payment tracking — kept on schedule without manual chasing.',
    automationIds: ['invoice-generator-ai', 'payment-reminder-ai', 'payment-reconciliation-ai', 'recurring-billing-ai', 'expense-approval-ai', 'stripe-payment-notify-ai', 'order-fulfil-ai', 'sales-report-ai', 'revenue-spike-ai', 'stock-insight-ai'],
  },
  {
    id: 'reporting-dashboards', name: 'Reporting & Dashboards', icon: '📊', color: '#a07828',
    label: 'REPORTING · AI AUTOMATION',
    sub: 'Numbers in your inbox every morning.',
    descPre: 'Call activity, revenue figures, and operations data compiled overnight — ',
    descEm: 'ready before the office opens.',
    description: 'Management, sales, and operations reports delivered automatically to your inbox every morning.',
    automationIds: ['sales-dashboard-ai', 'ga-report-ai', 'youtube-stats-ai', 'seo-audit-ai', 'fb-ads-insight-ai', 'ga4-email-ai', 'ga-airtable-ai', 'tiktok-analytics-ai', 'newsletter-brief-ai', 'crunchbase-scout-ai'],
  },
  {
    id: 'crm-optimisation', name: 'CRM Optimisation', icon: '🛠️', color: '#8b6f5e',
    label: 'CRM · AI AUTOMATION',
    sub: 'Clean data. Clear pipeline. Real forecasts.',
    descPre: 'Audit, restructure, or set up your CRM from scratch — ',
    descEm: 'so your pipeline data actually works for you.',
    description: 'Audit, restructure, or set up your CRM from scratch so your pipeline data actually works for you.',
    automationIds: ['data-enrichment-ai', 'pipeline-health-ai', 'linkedin-to-hubspot-ai', 'airtable-hubspot-sync-ai', 'deal-distributor-ai', 'contact-enrichment-ai', 'lead-router-gpt-ai', 'domain-enrich-ai', 'typeform-lead-ai', 'linkedin-leads-ai'],
  },
  {
    id: 'bespoke', name: 'Workflow Automation & Bespoke', icon: '🧩', color: '#5c3d2e',
    label: 'BESPOKE · AI AUTOMATION',
    sub: 'Any process. Any system. Automated.',
    descPre: "Custom workflows and system integration for anything that doesn't fit a standard category — ",
    descEm: 'built exactly to your spec.',
    description: 'System integration and custom workflows for any process that doesn\'t fit a standard category.',
    automationIds: ['data-sync-ai', 'field-update-tracker-ai', 'deal-won-orchestrator-ai', 'webhook-builder-ai', 'error-retry-ai', 'drive-airtable-ai', 'zoom-archive-ai', 'order-reward-ai', 'team-invite-ai', 'meeting-prep-ai'],
  },
  {
    id: 'marketing-automation', name: 'Marketing Automation', icon: '📢', color: '#b5651d',
    label: 'MARKETING · AI AUTOMATION',
    sub: 'Content, campaigns, and outreach that run themselves.',
    descPre: 'Social posting, ad spend, email campaigns, and lead delivery — ',
    descEm: 'running automatically across every channel.',
    description: 'Social posting, ad spend, email campaigns, and lead delivery — running automatically across every channel.',
    automationIds: ['social-visuals-ai', 'festival-post-ai', 'newsletter-gen-ai', 'gmail-sort-ai', 'blog-rss-ai', 'wp-blog-ai', 'rss-social-ai', 'blogger-post-ai', 'cold-icebreaker-ai', 'shopify-blog-ai'],
  },
  {
    id: 'customer-support-automation', name: 'Customer Support Automation', icon: '🎧', color: '#6f4e37',
    label: 'SUPPORT · AI AUTOMATION',
    sub: 'Faster answers, fewer dropped tickets.',
    descPre: 'Every ticket routed, every question answered, every SLA tracked — ',
    descEm: 'without anyone managing the queue manually.',
    description: 'Ticket routing, FAQ responses, satisfaction surveys, and SLA alerts — handled automatically without manual triage.',
    automationIds: ['ticket-classify-ai', 'jira-from-email-ai', 'zendesk-ticket-ai', 'hubspot-sla-ai', 'gemini-email-ai', 'auto-responder-ai', 'feedback-router-ai', 'human-loop-ai', 'gmail-alert-ai', 'email-memory-ai'],
  },
  {
    id: 'hr-recruitment-automation', name: 'HR & Recruitment Automation', icon: '👥', color: '#8a6d3a',
    label: 'HR & RECRUITMENT · AI AUTOMATION',
    sub: 'Hiring and people-ops admin, handled automatically.',
    descPre: 'From CV screening to day one onboarding — ',
    descEm: 'every hiring and people-ops step automated end to end.',
    description: 'CV screening, interview scheduling, onboarding, leave approvals, and employee feedback — automated from first application to day one.',
    automationIds: ['cv-intake-ai', 'resume-scorer-ai', 'job-hunter-ai', 'cv-ranker-ai', 'linkedin-jobs-ai', 'jobs-newsletter-ai', 'policy-compliance-ai', 'hyperperson-outreach-ai', 'linkedin-cv-ai', 'job-app-ai'],
  },
  {
    id: 'it-security-automation', name: 'IT & Security Automation', icon: '🔐', color: '#4a2c2a',
    label: 'IT & SECURITY · AI AUTOMATION',
    sub: 'The checks that should never depend on someone remembering.',
    descPre: 'Access control, uptime monitoring, patch tracking, and backups — ',
    descEm: 'verified automatically, whether anyone remembers or not.',
    description: 'Ticket triage, access revocation, uptime monitoring, patch tracking, and backup verification — handled without manual oversight.',
    automationIds: ['attack-surface-ai', 'github-monitor-ai', 'secret-expiry-ai', 'workflow-error-ai', 'log-cleanup-ai', 'uptime-email-ai', 'iot-backup-ai', 'drive-notify-ai', 'ai-news-digest-ai', 'posthog-event-ai'],
  },
]

function categoryStats(cat) {
  if (cat.automationIds.length === 0) return null
  const hrs  = cat.automationIds.reduce((sum, id) => sum + parseHrs(AUTOMATIONS[id].time), 0)
  const cost = cat.automationIds.reduce((sum, id) => sum + parseCost(AUTOMATIONS[id].cost), 0)
  return { time: `${hrs} hrs/week`, cost: `£${cost.toLocaleString()}/mo` }
}

function findCategoryOf(automationId) {
  return CATEGORIES.find(c => c.automationIds.includes(automationId))
}

const JOURNEY = [
  { icon: '📞', label: 'Lead (Call / Email)' },
  { icon: '🎯', label: 'Order Placement' },
  { icon: '📄', label: 'Contract Automation' },
  { icon: '📦', label: 'Order Fulfilment' },
  { icon: '💳', label: 'Billing' },
  { icon: '📊', label: 'Dashboards' },
]

/* ─── Step flow row ──────────────────────────────────────── */
function StepFlow({ steps, color, large }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: large ? '8px' : '6px' }}>
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            background: '#fdf8f0', border: `1px solid rgba(122,28,28,0.12)`,
            borderRadius: large ? '12px' : '10px', padding: large ? '12px 16px' : '8px 12px',
            fontSize: large ? '14px' : '12.5px', fontWeight: '600',
            color: '#2c1810', whiteSpace: 'nowrap',
            fontFamily: "'DM Sans',sans-serif",
          }}>
            <span style={{ fontSize: large ? '18px' : '15px' }}>{s.icon}</span>{s.label}
          </div>
          {i < steps.length - 1 && (
            <span style={{ color, fontSize: large ? '20px' : '16px', fontWeight: '800', flexShrink: 0 }}>→</span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

/* ─── Employee avatar with fallback initials ─────────────── */
function Avatar({ a, size, rounded = 20, color = '#7a1c1c' }) {
  const [failed, setFailed] = useState(false)
  return (
    <div style={{
      width: size, height: size, borderRadius: rounded, overflow: 'hidden',
      position: 'relative', flexShrink: 0,
      background: `linear-gradient(135deg, ${color}, ${color}99)`,
    }}>
      {!failed && (
        <img
          src={`/employees/profile-${a.id}.png`}
          alt={`${a.firstName} — ${a.role}`}
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}
      {failed && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Cormorant Garamond',serif", fontWeight: '700', color: 'white',
          fontSize: size * 0.38,
        }}>
          {a.firstName.charAt(0)}
        </div>
      )}
    </div>
  )
}

/* ─── Colour tag ─────────────────────────────────────────── */
function Tag({ children, color }) {
  return (
    <span style={{
      display: 'inline-block', background: `${color}18`, color,
      fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase',
      padding: '5px 14px', borderRadius: '50px', marginRight: '8px', marginBottom: '8px',
      fontFamily: "'DM Sans',sans-serif",
    }}>
      {children}
    </span>
  )
}

/* ─── Workflow screenshot ─────────────────────────────────── */
function WorkflowImage({ a, color }) {
  const [failed, setFailed] = useState(false)
  return (
    <div style={{
      width: '100%', maxWidth: '760px', margin: '0 auto',
      borderRadius: '20px', overflow: 'hidden', position: 'relative',
      border: `1px solid ${color}25`, boxShadow: '0 16px 50px rgba(44,24,16,0.08)',
      background: `linear-gradient(135deg, ${color}10, ${color}03)`,
      aspectRatio: '16/10',
    }}>
      {!failed && (
        <img
          src={`/automations/${a.id}.png`}
          alt={`${a.role} automation workflow built by Logic Loops AI`}
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: 'white' }}
        />
      )}
      {failed && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '10px', color,
        }}>
          <span style={{ fontSize: '40px' }}>🔀</span>
          <span style={{ fontSize: '13px', fontWeight: '700', fontFamily: "'DM Sans',sans-serif" }}>Workflow Diagram</span>
        </div>
      )}
    </div>
  )
}

/* ─── Customer journey visual ─────────────────────────────── */
function JourneyFlow() {
  return (
    <section style={{ padding: '80px 5%', background: 'var(--cream)' }} aria-label="End-to-end automation journey">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{ fontSize: '0.67rem', fontWeight: 700, letterSpacing: '4px', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '12px', fontFamily: "'DM Sans',sans-serif" }}>The Full Picture</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,3vw,2.8rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.12 }}>
              A Typical Customer Journey, <em style={{ fontStyle: 'italic', color: 'var(--maroon)' }}>Fully Automated</em>
            </h2>
            <p style={{ color: 'var(--mut)', fontSize: '0.97rem', lineHeight: 1.8, maxWidth: '540px', margin: '12px auto 0', fontWeight: 300, fontFamily: "'DM Sans',sans-serif" }}>
              This is the same end-to-end flow most businesses we work with run — from first contact to the dashboard that proves it worked.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexWrap: 'wrap', gap: '10px', background: 'var(--white)',
            border: '1px solid var(--bdr)', borderRadius: '20px', padding: '32px 24px',
            boxShadow: 'var(--sh)',
          }}>
            {JOURNEY.map((j, i) => (
              <React.Fragment key={i}>
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                  minWidth: '120px', padding: '14px 16px',
                  background: 'var(--cream)', borderRadius: '14px',
                  border: '1px solid var(--bdr)',
                }}>
                  <span style={{ fontSize: '24px' }}>{j.icon}</span>
                  <span style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text)', textAlign: 'center', fontFamily: "'DM Sans',sans-serif" }}>{j.label}</span>
                </div>
                {i < JOURNEY.length - 1 && (
                  <span style={{ color: 'var(--gold)', fontSize: '20px', fontWeight: '800' }}>→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── Category summary card (level 1) ───────────────────── */
function CategoryCard({ cat, delay, onOpen }) {
  const stats = categoryStats(cat)
  const ref = useRef(null)
  return (
    <FadeIn delay={delay}>
      <article
        ref={ref}
        onClick={() => onOpen(cat)}
        onMouseOver={() => { if (ref.current) { ref.current.style.transform = 'translateY(-7px)'; ref.current.style.boxShadow = '0 28px 64px rgba(80,16,16,0.22)' } }}
        onMouseOut={() => { if (ref.current) { ref.current.style.transform = 'none'; ref.current.style.boxShadow = '0 4px 28px rgba(80,16,16,0.13)' } }}
        style={{
          borderRadius: '20px', overflow: 'hidden',
          boxShadow: '0 4px 28px rgba(80,16,16,0.13)',
          border: '1px solid rgba(122,28,28,0.14)',
          background: 'var(--cream)',
          display: 'flex', flexDirection: 'column',
          cursor: 'pointer', transition: 'transform 0.24s ease, box-shadow 0.24s ease',
          height: '100%',
        }}
        aria-label={`View ${cat.name} automations`}
      >
        {/* ── Dark maroon header ── */}
        <div style={{
          background: 'radial-gradient(ellipse at 70% 30%, #7a1c1c 0%, #501010 100%)',
          padding: '26px 26px 24px',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Dot texture */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(253,248,240,0.07) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }} />
          {/* Category breadcrumb label */}
          <div style={{
            fontSize: '0.59rem', fontWeight: 700, letterSpacing: '2.5px',
            color: 'rgba(253,248,240,0.42)', textTransform: 'uppercase',
            marginBottom: 18, position: 'relative', fontFamily: "'DM Sans',sans-serif",
          }}>{cat.label}</div>
          {/* Icon + Title row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
            <div style={{
              width: 52, height: 52, borderRadius: 13, flexShrink: 0,
              background: 'rgba(253,248,240,0.1)', border: '1px solid rgba(253,248,240,0.16)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
            }}>{cat.icon}</div>
            <div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond',serif", fontSize: '1.55rem', fontWeight: 700,
                color: 'var(--cream)', lineHeight: 1.1, marginBottom: 5,
              }}>{cat.name}</h3>
              <p style={{
                fontSize: '0.78rem', color: 'rgba(253,248,240,0.52)', fontWeight: 300,
                fontFamily: "'DM Sans',sans-serif",
              }}>{cat.sub}</p>
            </div>
          </div>
        </div>

        {/* ── Cream body ── */}
        <div style={{ padding: '22px 26px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Description with italic emphasis */}
          <p style={{ fontSize: '0.87rem', color: 'var(--t2)', lineHeight: 1.75, marginBottom: 18, fontWeight: 300, fontFamily: "'DM Sans',sans-serif" }}>
            {cat.descPre}
            <em style={{ fontStyle: 'italic', color: 'var(--maroon)', fontWeight: 400 }}>{cat.descEm}</em>
          </p>

          {/* Automation name pills — neutral outlined style */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 20 }}>
            {cat.automationIds.length > 0
              ? cat.automationIds.map(id => (
                <span key={id} style={{
                  fontSize: '0.74rem', fontWeight: 500, color: 'var(--text)',
                  background: 'var(--white)', border: '1px solid rgba(44,24,16,0.16)',
                  padding: '5px 12px', borderRadius: 100, fontFamily: "'DM Sans',sans-serif",
                }}>
                  {AUTOMATIONS[id].role.replace(' AI', '')}
                </span>
              ))
              : <span style={{ fontSize: '0.8rem', color: 'var(--mut)', fontStyle: 'italic', fontFamily: "'DM Sans',sans-serif" }}>Custom-scoped for your business</span>
            }
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(44,24,16,0.1)', marginBottom: 16, marginTop: 'auto' }} />

          {/* Stats */}
          {stats ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: '0.59rem', fontWeight: 700, color: 'var(--mut)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 4, fontFamily: "'DM Sans',sans-serif" }}>TIME SAVED</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)' }}>{stats.time}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.59rem', fontWeight: 700, color: 'var(--mut)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 4, fontFamily: "'DM Sans',sans-serif" }}>COST SAVED</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.15rem', fontWeight: 700, color: 'var(--maroon)' }}>{stats.cost}</div>
              </div>
            </div>
          ) : (
            <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--maroon)', marginBottom: 18, fontFamily: "'DM Sans',sans-serif" }}>{cat.priceNote}</div>
          )}
        </div>

        {/* ── Full-width dark CTA button ── */}
        <div style={{ padding: '0 16px 16px' }}>
          <div style={{
            background: 'linear-gradient(135deg,#501010,#7a1c1c)',
            borderRadius: 12, padding: '13px 18px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--cream)', fontFamily: "'DM Sans',sans-serif" }}>
              View all automations
            </span>
            <span style={{ fontSize: '0.83rem', fontWeight: 700, color: 'var(--gl)', fontFamily: "'DM Sans',sans-serif" }}>
              {cat.automationIds.length > 0 ? `${cat.automationIds.length} included →` : 'Talk to us →'}
            </span>
          </div>
        </div>
      </article>
    </FadeIn>
  )
}

/* ─── Individual automation card (inside a category) ────── */
function AutomationCard({ a, color, delay, onOpen }) {
  const cardRef = useRef(null)
  const [imgFailed, setImgFailed] = useState(false)

  const handleMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`
    card.style.boxShadow = `0 20px 50px ${color}22`
  }
  const handleLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'none'
    card.style.boxShadow = 'var(--sh)'
  }

  return (
    <FadeIn delay={delay}>
      <article
        ref={cardRef}
        onClick={() => onOpen(a)}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          background: 'var(--white)', border: '1px solid var(--bdr)', borderRadius: '20px',
          padding: '24px', height: '100%', display: 'flex', flexDirection: 'column',
          cursor: 'pointer', transition: 'transform 0.15s ease-out, box-shadow 0.2s',
          boxShadow: 'var(--sh)', willChange: 'transform',
        }}
        aria-label={`${a.role} — ${a.blurb}`}
      >
        <div style={{
          width: '100%', aspectRatio: '16/9', borderRadius: '12px',
          overflow: 'hidden', marginBottom: '16px', position: 'relative',
          background: `linear-gradient(135deg, ${color}14, ${color}05)`,
          border: `1px dashed ${color}40`,
        }}>
          {!imgFailed && (
            <img
              src={`/employees/${a.id}.png`}
              alt={`${a.firstName} — ${a.role} automation specialist`}
              onError={() => setImgFailed(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )}
          {imgFailed && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '6px',
            }}>
              <div style={{
                width: '60px', height: '60px', borderRadius: '50%',
                background: `linear-gradient(135deg,${color},${color}99)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Cormorant Garamond',serif", fontWeight: 700,
                fontSize: '26px', color: 'white',
              }}>
                {a.firstName.charAt(0)}
              </div>
              <span style={{ fontSize: '11px', fontWeight: '700', color, fontFamily: "'DM Sans',sans-serif" }}>AI Automation Agent</span>
            </div>
          )}
          <div style={{
            position: 'absolute', bottom: '10px', left: '10px',
            background: 'rgba(44,24,16,0.7)', backdropFilter: 'blur(4px)',
            color: 'white', fontSize: '12px', fontWeight: '700',
            padding: '5px 12px', borderRadius: '50px',
            display: 'flex', alignItems: 'center', gap: '6px',
            fontFamily: "'DM Sans',sans-serif",
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
            {a.firstName}
          </div>
        </div>

        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)', marginBottom: '8px', lineHeight: 1.25 }}>
          {a.role}
        </h3>
        <p style={{ fontSize: '0.84rem', color: 'var(--mut)', lineHeight: 1.65, marginBottom: '16px', fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}>
          {a.blurb}
        </p>
        <div style={{ marginBottom: '18px' }}>
          <StepFlow steps={a.steps} color={color} />
        </div>
        <div style={{
          marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px',
          borderTop: '1px solid var(--bdr)', paddingTop: '14px',
        }}>
          <div>
            <div style={{ fontSize: '0.62rem', fontWeight: '700', color: 'var(--mut)', letterSpacing: '0.5px', marginBottom: '3px', textTransform: 'uppercase', fontFamily: "'DM Sans',sans-serif" }}>TIME SAVED</div>
            <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text)', fontFamily: "'Cormorant Garamond',serif" }}>{a.time}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.62rem', fontWeight: '700', color: 'var(--mut)', letterSpacing: '0.5px', marginBottom: '3px', textTransform: 'uppercase', fontFamily: "'DM Sans',sans-serif" }}>COST SAVED</div>
            <div style={{ fontSize: '1rem', fontWeight: '700', color, fontFamily: "'Cormorant Garamond',serif" }}>{a.cost}</div>
          </div>
        </div>
      </article>
    </FadeIn>
  )
}

/* ─── Category listing page (level 2) ───────────────────── */
function CategoryPage({ cat, onOpenAutomation, onBack }) {
  useEffect(() => { window.scrollTo(0, 0) }, [cat])
  const stats = categoryStats(cat)
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--cream)', zIndex: 999,
      overflowY: 'auto', fontFamily: "'DM Sans',sans-serif",
    }}>
      {/* Breadcrumb nav */}
      <div style={{
        position: 'sticky', top: 0, background: 'var(--white)', borderBottom: '1px solid var(--bdr)',
        padding: '18px 5%', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 10,
        boxShadow: '0 2px 16px rgba(44,24,16,0.06)',
      }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer', display: 'flex',
          alignItems: 'center', gap: '6px', color: 'var(--mut)', fontSize: '0.82rem', fontWeight: '600',
          fontFamily: 'inherit', padding: '6px 10px', borderRadius: '8px', transition: 'background 0.2s',
        }}
          onMouseOver={e => e.currentTarget.style.background = 'var(--c2)'}
          onMouseOut={e => e.currentTarget.style.background = 'none'}
        >
          ← Back
        </button>
        <span style={{ color: 'var(--bdr)' }}>/</span>
        <span style={{ fontSize: '0.82rem', color: 'var(--mut)', fontWeight: '600' }}>Automations</span>
        <span style={{ color: 'var(--bdr)' }}>/</span>
        <span style={{ fontSize: '0.82rem', color: 'var(--text)', fontWeight: '700' }}>{cat.name}</span>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 5% 100px' }}>
        <FadeIn>
          <div style={{
            width: '60px', height: '60px', borderRadius: '16px',
            background: `linear-gradient(135deg,${cat.color}18,${cat.color}08)`,
            border: `1px solid ${cat.color}22`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', marginBottom: '20px',
          }}>
            {cat.icon}
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)',
            fontWeight: 700, color: 'var(--text)', marginBottom: '14px', lineHeight: 1.1,
          }}>
            {cat.name}
          </h1>
          <p style={{ fontSize: '0.97rem', color: 'var(--mut)', lineHeight: 1.8, marginBottom: '24px', maxWidth: '640px', fontWeight: 300 }}>
            {cat.description}
          </p>
          {stats && (
            <div style={{
              display: 'inline-flex', gap: '28px',
              background: 'linear-gradient(135deg,var(--md),var(--maroon))',
              borderRadius: '16px', padding: '18px 28px', marginBottom: '40px',
            }}>
              <div>
                <div style={{ fontSize: '0.6rem', fontWeight: '700', color: 'rgba(253,248,240,0.55)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>TIME SAVED</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', fontWeight: 700, color: 'var(--cream)' }}>{stats.time}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.6rem', fontWeight: '700', color: 'rgba(253,248,240,0.55)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>COST SAVED</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', fontWeight: 700, color: 'var(--gl)' }}>{stats.cost}</div>
              </div>
            </div>
          )}
        </FadeIn>

        {cat.automationIds.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {cat.automationIds.map((id, i) => (
              <AutomationCard key={id} a={AUTOMATIONS[id]} color={cat.color} delay={Math.min(i * 0.05, 0.3)} onOpen={onOpenAutomation} />
            ))}
          </div>
        ) : (
          <FadeIn delay={0.1}>
            <div style={{
              background: 'var(--white)', border: '1px dashed var(--bdr)', borderRadius: '20px',
              padding: '48px', textAlign: 'center', boxShadow: 'var(--sh)',
            }}>
              <p style={{ fontSize: '0.97rem', color: 'var(--mut)', marginBottom: '24px', fontWeight: 300 }}>
                We scope this entirely to your business — priced at <strong style={{ color: 'var(--text)' }}>{cat.priceNote}</strong>. Get in touch and we'll show you exactly what's possible.
              </p>
              <Link to="/contact" onClick={onBack} style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 32px', borderRadius: '50px',
                background: 'linear-gradient(135deg,var(--gold),var(--gl))',
                color: 'var(--md)', fontWeight: '700', fontSize: '0.92rem', textDecoration: 'none',
              }}>
                Book Free Discovery Call →
              </Link>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  )
}

/* ─── Automation detail page (level 3) ──────────────────── */
function EmployeePage({ a, categoryName, color, onBack }) {
  useEffect(() => { window.scrollTo(0, 0) }, [a])
  const paragraphs = a.roleDescription.split('\n\n')

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--cream)', zIndex: 1000,
      overflowY: 'auto', fontFamily: "'DM Sans',sans-serif",
    }}>
      {/* Breadcrumb nav */}
      <div style={{
        position: 'sticky', top: 0, background: 'var(--white)', borderBottom: '1px solid var(--bdr)',
        padding: '18px 5%', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 10,
        flexWrap: 'wrap', boxShadow: '0 2px 16px rgba(44,24,16,0.06)',
      }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer', display: 'flex',
          alignItems: 'center', gap: '6px', color: 'var(--mut)', fontSize: '0.82rem', fontWeight: '600',
          fontFamily: 'inherit', padding: '6px 10px', borderRadius: '8px',
        }}
          onMouseOver={e => e.currentTarget.style.background = 'var(--c2)'}
          onMouseOut={e => e.currentTarget.style.background = 'none'}
        >
          ← Back
        </button>
        <span style={{ color: 'var(--bdr)' }}>/</span>
        <span style={{ fontSize: '0.82rem', color: 'var(--mut)' }}>Automations</span>
        <span style={{ color: 'var(--bdr)' }}>/</span>
        <span style={{ fontSize: '0.82rem', color: 'var(--mut)' }}>{categoryName}</span>
        <span style={{ color: 'var(--bdr)' }}>/</span>
        <span style={{ fontSize: '0.82rem', color: 'var(--text)', fontWeight: '700' }}>{a.firstName}</span>
      </div>

      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '48px 5% 100px' }}>
        {/* Tags */}
        <div style={{ marginBottom: '20px' }}>
          <Tag color={color}>AI Automation</Tag>
          <Tag color={color}>{a.role}</Tag>
          <Tag color={color}>{categoryName}</Tag>
        </div>

        {/* Hero grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,0.8fr)', gap: '48px', alignItems: 'start', marginBottom: '20px' }} className="emp-hero-grid">
          <div>
            <h1 style={{
              fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)',
              fontWeight: 700, color: 'var(--text)', lineHeight: 1.1, marginBottom: '20px',
            }}>
              Meet {a.firstName} —{' '}
              <em style={{ fontStyle: 'italic', color }}>{a.role}</em>
            </h1>
            <p style={{ fontSize: '0.97rem', color: 'var(--mut)', lineHeight: 1.8, marginBottom: '14px', fontWeight: 300 }}>
              {a.intro}
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--mut)', marginBottom: '28px', fontWeight: 300 }}>
              <strong style={{ color: 'var(--t2)', fontWeight: '600' }}>Best suited for:</strong>{' '}
              {BEST_SUITED[a.industry]}
            </p>
            <Link to="/contact" onClick={onBack} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg,var(--gold),var(--gl))',
              color: 'var(--md)', fontWeight: '700', fontSize: '0.92rem',
              padding: '14px 28px', borderRadius: '50px', textDecoration: 'none',
              boxShadow: '0 8px 28px rgba(201,150,58,0.35)',
            }}>
              🚀 Deploy {a.firstName} for My Business
            </Link>
            <span style={{ marginLeft: '16px', fontSize: '0.78rem', color: 'var(--mut)' }}>
              Free discovery call · No commitment
            </span>
          </div>

          {/* Avatar card */}
          <div style={{
            background: `linear-gradient(135deg,${color}12,${color}05)`,
            border: `1px solid ${color}25`, borderRadius: '24px', padding: '28px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
          }}>
            <Avatar a={a} size={140} rounded={30} color={color} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)' }}>{a.firstName}</div>
              <div style={{ fontSize: '0.78rem', fontWeight: '700', color, marginTop: '3px', fontFamily: "'DM Sans',sans-serif" }}>{a.role}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#16a34a', fontWeight: '700' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80' }} />
              Active right now
            </div>
          </div>
        </div>

        {/* Workflow screenshot */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.67rem', fontWeight: '700', letterSpacing: '3px', color: 'var(--gold)', textTransform: 'uppercase' }}>
              {a.firstName}'s Live Workflow
            </span>
          </div>
          <WorkflowImage a={a} color={color} />
        </div>

        {/* How it works */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.8rem', fontWeight: 700, color: 'var(--text)', marginBottom: '18px' }}>
            How {a.firstName} Works
          </h2>
          {paragraphs.slice(0, -1).map((p, i) => (
            <p key={i} style={{ fontSize: '0.95rem', color: 'var(--t2)', lineHeight: 1.85, marginBottom: '16px', fontWeight: 300 }}>
              {p}
            </p>
          ))}
          <div style={{ background: 'var(--white)', border: '1px solid var(--bdr)', borderRadius: '16px', padding: '28px', marginTop: '20px', boxShadow: 'var(--sh)' }}>
            <StepFlow steps={a.steps} color={color} large />
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
          <div style={{ background: 'var(--white)', border: '1px solid var(--bdr)', borderRadius: '16px', padding: '24px', boxShadow: 'var(--sh)' }}>
            <div style={{ fontSize: '0.62rem', fontWeight: '700', color: 'var(--mut)', letterSpacing: '0.5px', marginBottom: '6px', textTransform: 'uppercase' }}>TIME SAVED / WEEK</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.2rem', fontWeight: 700, color: 'var(--text)' }}>{a.time}</div>
            <p style={{ fontSize: '0.82rem', color: 'var(--mut)', marginTop: '8px', lineHeight: 1.6, fontWeight: 300 }}>
              Every step in {a.firstName}'s workflow runs automatically in seconds — no one needs to pause their work to action it.
            </p>
          </div>
          <div style={{ background: 'var(--white)', border: '1px solid var(--bdr)', borderRadius: '16px', padding: '24px', boxShadow: 'var(--sh)' }}>
            <div style={{ fontSize: '0.62rem', fontWeight: '700', color: 'var(--mut)', letterSpacing: '0.5px', marginBottom: '6px', textTransform: 'uppercase' }}>COST SAVED / MONTH</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.2rem', fontWeight: 700, color }}>{a.cost}</div>
            <p style={{ fontSize: '0.82rem', color: 'var(--mut)', marginTop: '8px', lineHeight: 1.6, fontWeight: 300 }}>
              Admin and sales hours freed from a task that adds zero value once automated — redirected to work that grows the business.
            </p>
          </div>
        </div>

        {/* Benefit block */}
        <div style={{
          background: 'linear-gradient(135deg,var(--md),var(--maroon))',
          borderRadius: '20px', padding: '32px', marginBottom: '32px',
        }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', fontWeight: 700, color: 'var(--cream)', marginBottom: '12px' }}>
            The Business Benefit
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(253,248,240,0.82)', lineHeight: 1.8, fontWeight: 300 }}>
            {paragraphs[paragraphs.length - 1]}
          </p>
        </div>

        {/* Contact / deploy CTA */}
        <div style={{
          background: 'var(--white)', border: '1px solid var(--bdr)',
          borderRadius: '20px', padding: '36px', boxShadow: 'var(--sh)',
        }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.6rem', fontWeight: 700, color: 'var(--text)', marginBottom: '10px' }}>
            Ready to Deploy <em style={{ fontStyle: 'italic', color }}>{a.firstName}</em>?
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--mut)', lineHeight: 1.75, marginBottom: '24px', fontWeight: 300, maxWidth: '560px' }}>
            Book a free 30-minute discovery call and we'll map exactly how {a.firstName} fits into your current workflow — with a live demo, time-saved estimate, and a clear delivery timeline. No commitment required.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/contact" onClick={onBack} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg,var(--gold),var(--gl))',
              color: 'var(--md)', fontWeight: '700', fontSize: '0.9rem',
              padding: '13px 26px', borderRadius: '50px', textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(201,150,58,0.3)',
            }}>
              📅 Book Free Discovery Call
            </Link>
            <a href="mailto:hello@logicloopsai.com" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'transparent', color: 'var(--maroon)',
              fontWeight: '700', fontSize: '0.9rem', padding: '13px 26px',
              borderRadius: '50px', textDecoration: 'none',
              border: '2px solid var(--maroon)',
            }}>
              📧 hello@logicloopsai.com
            </a>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--mut)', marginTop: '16px' }}>
            ✅ Free 30-min call · Reply within 24 hours · No long-term commitment
          </p>
        </div>

        <p style={{ fontSize: '0.72rem', color: 'var(--mut)', textAlign: 'center', marginTop: '32px' }}>
          Time and cost figures are estimates based on average admin/sales hourly rates. Your exact savings are calculated on the discovery call.
        </p>
      </div>

      <style>{`
        @media(max-width:768px){
          .emp-hero-grid{grid-template-columns:1fr!important;}
        }
      `}</style>
    </div>
  )
}

/* ─── Main AutomationShowcase component ──────────────────── */
export default function AutomationShowcase() {
  const [view, setView] = useState({ level: 'grid' })

  const openCategory = (cat) => {
    window.history.pushState({}, '', `#cat-${cat.id}`)
    setView({ level: 'category', cat })
  }
  const openAutomation = (a) => {
    const cat = findCategoryOf(a.id)
    window.history.pushState({}, '', `#${a.id}`)
    setView({ level: 'detail', a, cat })
  }
  const goBack = () => window.history.back()

  useEffect(() => {
    const restore = () => {
      const hash = window.location.hash.replace('#', '')
      if (!hash) { setView({ level: 'grid' }); return }
      if (hash.startsWith('cat-')) {
        const cat = CATEGORIES.find(c => c.id === hash.slice(4))
        setView(cat ? { level: 'category', cat } : { level: 'grid' })
        return
      }
      const a = AUTOMATIONS[hash]
      if (a) {
        const cat = findCategoryOf(hash)
        setView({ level: 'detail', a, cat })
      } else {
        setView({ level: 'grid' })
      }
    }
    restore()
    window.addEventListener('popstate', restore)
    return () => window.removeEventListener('popstate', restore)
  }, [])

  return (
    <>
      {/* Customer journey visual */}
      <JourneyFlow />

      {/* Category grid */}
      <section style={{ padding: '80px 5%', background: 'var(--white)' }} id="automation-showcase" aria-label="AI automation categories">
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>

          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <div style={{ fontSize: '0.67rem', fontWeight: 700, letterSpacing: '4px', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '12px', fontFamily: "'DM Sans',sans-serif" }}>What We Build</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.2rem,3.6vw,3.2rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.1, marginBottom: '14px' }}>
                Automation Organised Around <em style={{ fontStyle: 'italic', color: 'var(--maroon)' }}>Your Business</em>
              </h2>
              <p style={{ color: 'var(--mut)', fontSize: '0.97rem', lineHeight: 1.8, maxWidth: '540px', margin: '0 auto', fontWeight: 300, fontFamily: "'DM Sans',sans-serif" }}>
                Six areas where we eliminate manual work. Click any category to see exactly what's included and which AI agent handles it.
              </p>
            </div>
          </FadeIn>

          {/* Stats banner */}
          <FadeIn delay={0.08}>
            <div style={{
              display: 'flex', justifyContent: 'center', gap: '0', flexWrap: 'wrap',
              background: 'linear-gradient(135deg,var(--md),var(--maroon))',
              borderRadius: '20px', padding: '28px 20px', margin: '36px 0 52px',
              boxShadow: '0 12px 40px rgba(80,16,16,0.28)',
            }}>
              {[
                { to: 295, suffix: '', label: 'Hours Saved / Week' },
                { to: 46200, prefix: '£', label: 'Saved / Month' },
                { to: 554400, prefix: '£', label: 'Saved / Year' },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: '0 32px', textAlign: 'center',
                  borderLeft: i !== 0 ? '1px solid rgba(253,248,240,0.15)' : 'none',
                }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.2rem', fontWeight: 700, color: 'var(--gl)' }}>
                    <Counter to={s.to} prefix={s.prefix || ''} suffix={s.suffix || ''} />
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(253,248,240,0.6)', fontWeight: '600', marginTop: '4px', fontFamily: "'DM Sans',sans-serif", letterSpacing: '0.5px' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
          }}>
            {CATEGORIES.map((cat, i) => (
              <CategoryCard key={cat.id} cat={cat} delay={Math.min(i * 0.05, 0.3)} onOpen={openCategory} />
            ))}
          </div>

          <FadeIn delay={0.2}>
            <p style={{ textAlign: 'center', fontSize: '0.73rem', color: 'var(--mut)', marginTop: '36px', lineHeight: 1.7, fontFamily: "'DM Sans',sans-serif" }}>
              Time and cost figures are estimates based on average admin/sales hourly rates. Your exact savings are calculated on the free discovery call.
            </p>
          </FadeIn>

        </div>
      </section>

      {/* Overlays */}
      {view.level === 'category' && (
        <CategoryPage cat={view.cat} onOpenAutomation={openAutomation} onBack={goBack} />
      )}
      {view.level === 'detail' && (
        <EmployeePage
          a={view.a}
          categoryName={view.cat ? view.cat.name : 'AI Automation'}
          color={view.cat ? view.cat.color : '#7a1c1c'}
          onBack={goBack}
        />
      )}
    </>
  )
}
