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
    id: 'contract-generator-ai', firstName: 'Siddharth', role: 'Contract Generator AI', industry: 'Telecom & Subscription',
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
  'duplicate-cleaner-ai': {
    id: 'duplicate-cleaner-ai', firstName: 'Nikhil', role: 'Duplicate Cleaner AI', industry: 'Operations & HR',
    blurb: 'Finds and merges duplicate CRM records before they split your pipeline reporting.',
    intro: 'Automatically scan for duplicate contacts and organisations and merge them — keeping one accurate record instead of three conflicting ones.',
    roleDescription: "Duplicate records creep in constantly — a lead fills in a form twice, a rep adds a contact that's already there under a slightly different name — and each one quietly splits your pipeline data into two half-true versions.\n\nNikhil scans continuously for matches based on name, email, and company, and merges genuine duplicates automatically — keeping the most complete record and folding the rest into it, with anything ambiguous flagged for a quick human check.\n\nThe business value: pipeline numbers you can actually trust, because the same deal isn't being counted twice under two different records.",
    steps: [{icon:'🔍',label:'Scan Records'},{icon:'🔀',label:'Match Duplicates'},{icon:'♻️',label:'Merge Automatically'}],
    time: '3 hrs/week', cost: '£480/mo',
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
  'field-mapping-ai': {
    id: 'field-mapping-ai', firstName: 'Varun', role: 'Field Mapping AI', industry: 'Operations & HR',
    blurb: 'Keeps custom fields and dropdown IDs in sync across every connected system.',
    intro: "Automatically keep custom field and dropdown mappings aligned across your CRM and every connected tool — so an integration never breaks because an ID changed.",
    roleDescription: "Custom fields and dropdown options change as a business grows — a new pipeline stage gets added, a field gets renamed — and every integration relying on the old ID or label quietly breaks until someone notices data's stopped flowing correctly.\n\nVarun tracks those mappings directly. When a custom field or dropdown value changes anywhere in the CRM, Varun updates the corresponding mapping across every connected system automatically, so integrations keep working without manual reconfiguration.\n\nThe business value: automations that don't silently break every time the CRM structure changes, and far less time spent debugging why a sync suddenly stopped.",
    steps: [{icon:'⚡',label:'Field Updated'},{icon:'🔄',label:'Sync Mapping'},{icon:'✅',label:'Systems Aligned'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'forecast-sync-ai': {
    id: 'forecast-sync-ai', firstName: 'Anjali', role: 'Forecast Sync AI', industry: 'Sales & CRM',
    blurb: 'Recalculates your pipeline forecast automatically every time a deal moves stage.',
    intro: 'Automatically recalculate the pipeline forecast the moment any deal changes stage or value — so the number in your report is always current.',
    roleDescription: "A forecast is only as good as the moment it was last updated — and if that update depends on someone remembering to refresh a spreadsheet, the number leadership's looking at is usually already stale.\n\nAnjali recalculates the forecast in real time. Every stage change, every value update, every closed deal feeds straight into the model automatically, so the figure on the dashboard always reflects the pipeline as it stands right now.\n\nThe business value: forecasting leadership can actually rely on, with the manual recalculation work removed completely.",
    steps: [{icon:'🔀',label:'Deal Stage Changed'},{icon:'📊',label:'Recalculate Forecast'},{icon:'✅',label:'Report Updated'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  /* ── Marketing Automation ── */
  'social-post-scheduler-ai': {
    id: 'social-post-scheduler-ai', firstName: 'Aarav', role: 'Social Post Scheduler AI', industry: 'Marketing',
    blurb: 'Schedules and publishes every social post on time, across every channel, from one calendar.',
    intro: 'Automatically queue and publish social content across every connected channel — so posting never depends on someone remembering to hit send.',
    roleDescription: "Social content usually gets written well in advance and then sits waiting for someone to actually post it at the right time on the right platform — and that's exactly where it slips.\n\nAarav takes the finished content and publishes it automatically, on schedule, across every channel at once.\n\nThe business value: consistent posting without anyone babysitting a calendar, and content that goes out when it's planned, not when someone remembers.",
    steps: [{icon:'📝',label:'Content Ready'},{icon:'📅',label:'Schedule Queue'},{icon:'📤',label:'Auto-Published'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'ad-spend-optimiser-ai': {
    id: 'ad-spend-optimiser-ai', firstName: 'Bhumi', role: 'Ad Spend Optimiser AI', industry: 'Marketing',
    blurb: "Shifts ad budget toward what's converting and pauses what's bleeding spend, daily.",
    intro: "Automatically check campaign performance daily and reallocate budget toward what's converting — instead of waiting for a weekly review to catch the waste.",
    roleDescription: "Ad budgets usually get reviewed once a week, which means a campaign can burn through days of spend on something that stopped converting before anyone notices.\n\nBhumi checks performance daily, shifts budget toward what's working, and pauses what isn't — automatically.\n\nThe business value: wasted spend caught in a day instead of a week, and budget that's always weighted toward what's actually bringing in business.",
    steps: [{icon:'📊',label:'Daily Performance Check'},{icon:'🔀',label:'Reallocate Budget'},{icon:'⏸️',label:'Pause Underperformers'}],
    time: '4 hrs/week', cost: '£640/mo',
  },
  'email-campaign-builder-ai': {
    id: 'email-campaign-builder-ai', firstName: 'Chirag', role: 'Email Campaign Builder AI', industry: 'Marketing',
    blurb: 'Builds and sends the email campaign the moment new content or an offer goes live.',
    intro: "Automatically build and send an email campaign the moment new content or an offer is ready — no waiting for someone to find time to draft it.",
    roleDescription: "A good offer or piece of content often sits unused because building the email around it is its own separate task, queued behind everything else.\n\nChirag builds it automatically the moment the trigger fires, pulls the right segment, and sends it out same day.\n\nThe business value: content and offers actually reach the inbox while they're still relevant, instead of going out a week late.",
    steps: [{icon:'⚡',label:'Content/Offer Live'},{icon:'📧',label:'Campaign Built'},{icon:'📤',label:'Sent to List'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'lead-magnet-delivery-ai': {
    id: 'lead-magnet-delivery-ai', firstName: 'Devika', role: 'Lead Magnet Delivery AI', industry: 'Marketing',
    blurb: 'Delivers the right lead magnet the second someone opts in, no manual email needed.',
    intro: 'Automatically deliver the correct lead magnet the instant someone submits the opt-in form — instead of leaving them waiting on a manual follow-up.',
    roleDescription: "The gap between someone opting in and actually receiving what they signed up for is where interest cools off fastest.\n\nDevika closes that gap completely — the moment the form's submitted, the right asset goes out and the lead's logged in the CRM.\n\nThe business value: instant delivery that keeps the lead warm, with zero manual email sending required.",
    steps: [{icon:'✅',label:'Opt-In Submitted'},{icon:'📦',label:'Asset Delivered'},{icon:'📋',label:'Lead Logged'}],
    time: '1 hr/week', cost: '£160/mo',
  },
  'review-response-ai': {
    id: 'review-response-ai', firstName: 'Esha', role: 'Review Response AI', industry: 'Marketing',
    blurb: 'Drafts a response to every new review so nothing sits unanswered for days.',
    intro: "Automatically draft a response the moment a new review comes in — so nothing sits unanswered while a customer's watching.",
    roleDescription: "An unanswered review, good or bad, says more to prospective customers than the review itself — it signals whether anyone's actually paying attention.\n\nEsha drafts a response the moment a review lands, matched to its tone, ready for a quick approve-and-post.\n\nThe business value: every review gets acknowledged fast, which matters more for reputation than people tend to assume.",
    steps: [{icon:'⭐',label:'New Review Posted'},{icon:'✍️',label:'Draft Response'},{icon:'📤',label:'Posted/Flagged'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  /* ── Customer Support Automation ── */
  'ticket-router-ai': {
    id: 'ticket-router-ai', firstName: 'Gaurav', role: 'Ticket Router AI', industry: 'Customer Support',
    blurb: 'Routes every support ticket to the right team based on issue type, the moment it lands.',
    intro: 'Automatically classify and route every incoming support ticket to the correct team — no manual triage queue.',
    roleDescription: "Tickets landing in one shared inbox usually mean someone has to read each one just to work out who should actually handle it, before any real support work starts.\n\nGaurav reads the ticket, classifies the issue, and routes it straight to the right team the moment it arrives.\n\nThe business value: response time starts from zero instead of from whenever triage gets done.",
    steps: [{icon:'📥',label:'Ticket Received'},{icon:'🔀',label:'Classify & Route'},{icon:'👤',label:'Assigned to Team'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'faq-responder-ai': {
    id: 'faq-responder-ai', firstName: 'Harini', role: 'FAQ Responder AI', industry: 'Customer Support',
    blurb: 'Answers common support questions instantly, before a human even opens the ticket.',
    intro: "Automatically answer common, repeatable support questions the instant they come in — freeing the team for the questions that actually need a person.",
    roleDescription: "A large share of support tickets are the same handful of questions asked over and over, each one still taking a human to read, recognise, and answer.\n\nHarini matches incoming questions against known answers and replies instantly, only escalating what's genuinely new.\n\nThe business value: faster answers for customers and far fewer repetitive tickets clogging the team's queue.",
    steps: [{icon:'❓',label:'Question Received'},{icon:'🤖',label:'Match to FAQ'},{icon:'📤',label:'Instant Reply'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'csat-survey-ai': {
    id: 'csat-survey-ai', firstName: 'Indira', role: 'CSAT Survey AI', industry: 'Customer Support',
    blurb: 'Sends the satisfaction survey the moment a ticket closes and flags low scores for follow-up.',
    intro: "Automatically send a satisfaction survey the moment a ticket's marked resolved, and flag any low score for immediate follow-up.",
    roleDescription: "Feedback collected weeks after a ticket closes barely reflects how the customer actually felt at the time — by then they've half-forgotten the interaction.\n\nIndira sends the survey the moment the ticket closes, while it's fresh, and flags anything scoring low so someone can step back in fast.\n\nThe business value: feedback that's actually accurate, and unhappy customers caught before they quietly churn.",
    steps: [{icon:'✅',label:'Ticket Closed'},{icon:'📋',label:'Survey Sent'},{icon:'🚩',label:'Low Score Flagged'}],
    time: '1 hr/week', cost: '£160/mo',
  },
  'escalation-alert-ai': {
    id: 'escalation-alert-ai', firstName: 'Jaya', role: 'Escalation Alert AI', industry: 'Customer Support',
    blurb: 'Flags any ticket open past SLA and alerts the right manager before the customer has to chase.',
    intro: "Automatically track every ticket against its SLA and alert a manager the moment it's at risk of breaching — before the customer has to ask what's going on.",
    roleDescription: "SLA breaches usually get noticed by the customer first, which is the worst possible way to find out support's fallen behind.\n\nJaya watches every open ticket against its deadline and alerts the manager directly as it approaches the line, not after it's crossed.\n\nThe business value: breaches caught and fixed internally, instead of becoming a complaint.",
    steps: [{icon:'⏱️',label:'SLA Timer Running'},{icon:'🚨',label:'Breach Detected'},{icon:'🔔',label:'Manager Alerted'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'churn-risk-ai': {
    id: 'churn-risk-ai', firstName: 'Kabir', role: 'Churn Risk AI', industry: 'Customer Support',
    blurb: 'Flags customers showing churn signals — repeated complaints, falling usage — for proactive outreach.',
    intro: "Automatically flag customers showing early churn signals — repeated tickets, dropping usage — so someone can reach out before they leave, not after.",
    roleDescription: "By the time a customer actually cancels, the warning signs were usually there weeks earlier — just scattered across tickets and usage data nobody was cross-referencing.\n\nKabir watches for that pattern continuously and flags at-risk accounts the moment the signal's clear enough to act on.\n\nThe business value: retention conversations that happen while there's still something to save.",
    steps: [{icon:'📉',label:'Signals Detected'},{icon:'🎯',label:'Risk Scored'},{icon:'🔔',label:'Rep Alerted'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  /* ── HR & Recruitment Automation ── */
  'candidate-screener-ai': {
    id: 'candidate-screener-ai', firstName: 'Lakshmi', role: 'Candidate Screener AI', industry: 'HR & Recruitment',
    blurb: 'Screens every CV against the job spec and ranks candidates before a human reviews them.',
    intro: 'Automatically score every incoming CV against the job spec and rank candidates — so the first human review starts with a shortlist, not a pile.',
    roleDescription: "Screening a stack of CVs against a job spec by hand eats hours, and the candidates that get read first often aren't the strongest, just the ones that landed early.\n\nLakshmi scores every CV against the spec the moment it arrives and ranks the list automatically.\n\nThe business value: hiring managers start with the best candidates already surfaced, not buried in a pile.",
    steps: [{icon:'📥',label:'CV Received'},{icon:'🤖',label:'Score Against Spec'},{icon:'📊',label:'Ranked List'}],
    time: '4 hrs/week', cost: '£640/mo',
  },
  'interview-scheduler-ai': {
    id: 'interview-scheduler-ai', firstName: 'Madhav', role: 'Interview Scheduler AI', industry: 'HR & Recruitment',
    blurb: 'Finds a slot, books the interview, and sends the calendar invite — no email back-and-forth.',
    intro: "Automatically find an available slot and book the interview the moment a candidate's shortlisted — no email chain to agree a time.",
    roleDescription: "Scheduling an interview usually means three or four emails just to land on a time that works for everyone, and that delay alone can lose a strong candidate to a faster-moving competitor.\n\nMadhav checks calendars, books the slot, and sends the invite automatically the moment someone's shortlisted.\n\nThe business value: interviews booked same-day, with no back-and-forth to slow the process down.",
    steps: [{icon:'✅',label:'Candidate Shortlisted'},{icon:'📅',label:'Slot Booked'},{icon:'📧',label:'Invite Sent'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'onboarding-checklist-ai': {
    id: 'onboarding-checklist-ai', firstName: 'Nandini', role: 'Onboarding Checklist AI', industry: 'HR & Recruitment',
    blurb: "Triggers every onboarding step — IT access, paperwork, welcome email — the moment someone's hired.",
    intro: "Automatically trigger every onboarding step the moment a new hire's confirmed — IT access requested, paperwork sent, welcome email out — so day one actually feels ready.",
    roleDescription: "Onboarding usually depends on several different people each remembering their own piece of it, and when one forgets, the new hire's first day shows it.\n\nNandini triggers every step automatically the moment a hire's confirmed, and tracks what's done against what's still outstanding.\n\nThe business value: a consistent first day for every hire, without chasing five different people to make it happen.",
    steps: [{icon:'⚡',label:'New Hire Confirmed'},{icon:'✅',label:'Tasks Triggered'},{icon:'📋',label:'Progress Tracked'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'leave-approval-ai': {
    id: 'leave-approval-ai', firstName: 'Om', role: 'Leave Approval AI', industry: 'HR & Recruitment',
    blurb: 'Routes leave requests to the right manager and updates the team calendar once approved.',
    intro: "Automatically route a leave request to the correct manager and update the shared calendar the moment it's approved — no manual diary updates.",
    roleDescription: "Leave requests sitting in someone's inbox waiting for approval is a small thing until it's the reason a team's short-staffed on a day nobody planned for.\n\nOm routes the request to the right manager instantly and updates the calendar the second it's approved.\n\nThe business value: the team calendar is always accurate, and nobody finds out about a gap on the day itself.",
    steps: [{icon:'📥',label:'Request Submitted'},{icon:'🔀',label:'Routed to Manager'},{icon:'📅',label:'Calendar Updated'}],
    time: '1 hr/week', cost: '£160/mo',
  },
  'employee-feedback-ai': {
    id: 'employee-feedback-ai', firstName: 'Pranav', role: 'Employee Feedback AI', industry: 'HR & Recruitment',
    blurb: 'Sends the pulse survey on schedule and flags any concerning response for HR to see immediately.',
    intro: "Automatically send the scheduled employee pulse survey and flag any concerning response straight to HR — instead of waiting for the next review cycle to surface it.",
    roleDescription: "A lot of employee feedback only gets seen at the next formal review, by which point a concern that was fixable weeks ago has had time to grow.\n\nPranav sends the survey on schedule and routes any flagged response to HR the same day.\n\nThe business value: concerns reach someone while they're still small, not after they've become a resignation.",
    steps: [{icon:'📅',label:'Survey Scheduled'},{icon:'📤',label:'Sent to Team'},{icon:'🚩',label:'Concern Flagged'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  /* ── IT & Security Automation ── */
  'ticket-triage-ai': {
    id: 'ticket-triage-ai', firstName: 'Radhika', role: 'Ticket Triage AI', industry: 'IT & Security',
    blurb: 'Triages incoming IT tickets by urgency and routes them to the right engineer.',
    intro: 'Automatically score every incoming IT ticket by urgency and route it to the right engineer — no manual queue sorting.',
    roleDescription: "An IT queue treated first-in-first-out means a critical outage can sit behind ten password resets just because it landed second.\n\nRadhika scores urgency the moment a ticket comes in and routes it to the right engineer immediately.\n\nThe business value: the issues that actually matter get picked up first, every time, not whenever someone happens to scroll down the list.",
    steps: [{icon:'📥',label:'Ticket Logged'},{icon:'🎯',label:'Urgency Scored'},{icon:'👤',label:'Engineer Assigned'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'access-revoke-ai': {
    id: 'access-revoke-ai', firstName: 'Saurabh', role: 'Access Revoke AI', industry: 'IT & Security',
    blurb: "Revokes system access the moment someone's marked as left, across every connected tool.",
    intro: "Automatically revoke a leaver's access across every connected system the moment they're marked as left — no manual checklist to work through.",
    roleDescription: "Offboarding access by hand means going through each system one at a time, and it's exactly the kind of task that gets half-finished when someone's busy.\n\nSaurabh revokes access across every connected tool the moment HR marks someone as left, and logs it for audit.\n\nThe business value: no lingering access after someone's gone, and a clean record if anyone ever needs to check.",
    steps: [{icon:'⚡',label:'Leaver Marked'},{icon:'🔒',label:'Access Revoked'},{icon:'✅',label:'Logged for Audit'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'uptime-alert-ai': {
    id: 'uptime-alert-ai', firstName: 'Tara', role: 'Uptime Alert AI', industry: 'IT & Security',
    blurb: 'Alerts the right person the second a monitored system goes down — no waiting for someone to notice.',
    intro: "Automatically alert the right person the instant a monitored system goes down — instead of waiting for a customer to report it first.",
    roleDescription: "Finding out about downtime from a customer complaint is the most expensive way possible to learn something's broken.\n\nTara monitors every connected system continuously and alerts the right person the moment something goes down.\n\nThe business value: fixes start before customers even notice, instead of after they've already been frustrated by it.",
    steps: [{icon:'📡',label:'System Monitored'},{icon:'🚨',label:'Downtime Detected'},{icon:'🔔',label:'Team Alerted'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'patch-reminder-ai': {
    id: 'patch-reminder-ai', firstName: 'Uday', role: 'Patch Reminder AI', industry: 'IT & Security',
    blurb: 'Tracks which systems are overdue for a security patch and flags them before they become a risk.',
    intro: "Automatically track patch status across every system and flag anything overdue — before it becomes the gap something gets in through.",
    roleDescription: "Security patches are easy to fall behind on quietly — nothing breaks the day you miss one, which is exactly what makes it dangerous.\n\nUday tracks patch status across every system and flags anything overdue automatically.\n\nThe business value: gaps get closed on a schedule, not discovered after something's already exploited them.",
    steps: [{icon:'📅',label:'Patch Due'},{icon:'🔔',label:'Reminder Sent'},{icon:'✅',label:'Status Tracked'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'backup-verification-ai': {
    id: 'backup-verification-ai', firstName: 'Vidya', role: 'Backup Verification AI', industry: 'IT & Security',
    blurb: 'Checks every scheduled backup actually completed and flags failures the same day.',
    intro: "Automatically verify that every scheduled backup actually completed successfully — and flag failures the same day, not the day you need the backup.",
    roleDescription: "A backup job can fail silently for weeks, and the only time anyone finds out is the day they actually need it to work.\n\nVidya checks every scheduled backup's completion status and flags failures immediately.\n\nThe business value: backup failures get caught and fixed the same day, not discovered during an actual emergency.",
    steps: [{icon:'💾',label:'Backup Runs'},{icon:'✅',label:'Verify Completion'},{icon:'🚩',label:'Failure Flagged'}],
    time: '1 hr/week', cost: '£160/mo',
  },
  /* ── Sales Automation Batch 3 ── */
  'quote-builder-ai': {
    id: 'quote-builder-ai', firstName: 'Advait', role: 'Quote Builder AI', industry: 'Sales & CRM',
    blurb: 'Builds and sends a formatted quote the moment a rep marks the deal ready — no manual document work.',
    intro: 'Automatically generate a branded quote from deal data and send it the moment a rep marks the deal ready to quote.',
    roleDescription: "Building a quote by hand means pulling pricing, formatting a document, and proofreading it before it goes anywhere — minutes that add up across a busy pipeline.\n\nAdvait builds it automatically from the deal data and sends it out the same moment, formatted and consistent every time.\n\nThe business value: quotes reach the prospect while the conversation's still fresh, not a day later.",
    steps: [{icon:'⚡',label:'Deal Marked Ready'},{icon:'📄',label:'Quote Built'},{icon:'📧',label:'Sent to Prospect'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'meeting-no-show-ai': {
    id: 'meeting-no-show-ai', firstName: 'Akshay', role: 'Meeting No-Show AI', industry: 'Sales & CRM',
    blurb: 'Re-books a meeting automatically the moment a prospect no-shows, before the lead goes cold.',
    intro: 'Automatically detect a meeting no-show and send a re-booking email with new available slots — no manual chasing.',
    roleDescription: "A no-show usually means the rep has to remember to follow up later, and 'later' often means never.\n\nAkshay catches the no-show immediately and sends a re-booking email with fresh slots before the moment's lost.\n\nThe business value: fewer no-shows turning into dead leads, with zero manual follow-up required.",
    steps: [{icon:'🚫',label:'No-Show Detected'},{icon:'📧',label:'Re-Book Email Sent'},{icon:'📅',label:'New Slot Offered'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'proposal-follow-up-ai': {
    id: 'proposal-follow-up-ai', firstName: 'Alok', role: 'Proposal Follow-Up AI', industry: 'Sales & CRM',
    blurb: "Follows up on a sent proposal automatically if there's no response within a set number of days.",
    intro: "Automatically send a follow-up if a proposal goes unanswered past a set number of days — so silence doesn't mean the deal's forgotten.",
    roleDescription: "A proposal sitting unanswered usually just sits there until a rep happens to remember it exists.\n\nAlok tracks every sent proposal and sends a follow-up automatically once the wait period passes.\n\nThe business value: nothing goes quiet by accident, and reps spend their time on the deals actually responding.",
    steps: [{icon:'📤',label:'Proposal Sent'},{icon:'⏱️',label:'Wait Period'},{icon:'📧',label:'Auto Follow-Up'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'lead-scoring-ai': {
    id: 'lead-scoring-ai', firstName: 'Amara', role: 'Lead Scoring AI', industry: 'Sales & CRM',
    blurb: 'Scores every inbound lead automatically so reps know exactly who to call first.',
    intro: 'Automatically score every new lead against your ideal customer profile the moment it comes in — so reps work the best ones first.',
    roleDescription: "Without scoring, every lead looks the same on a rep's list, and the strongest ones get the same priority as a long shot.\n\nAmara scores each lead the instant it arrives based on fit and intent signals.\n\nThe business value: reps spend their first calls on the leads most likely to close, not whichever came in first.",
    steps: [{icon:'⚡',label:'Lead Captured'},{icon:'🎯',label:'Score Calculated'},{icon:'📊',label:'Priority Set'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  /* ── Customer Journey Batch 3 ── */
  'welcome-sequence-ai': {
    id: 'welcome-sequence-ai', firstName: 'Amit', role: 'Welcome Sequence AI', industry: 'Customer Journey',
    blurb: 'Triggers the full welcome sequence automatically the moment a new customer signs.',
    intro: "Automatically kick off the welcome email sequence the moment a deal's marked won — first impressions handled without a manual trigger.",
    roleDescription: "A new customer's first week sets the tone for the whole relationship, and that's exactly the week a manual process is most likely to slip.\n\nAmit triggers the full sequence automatically the moment the deal closes.\n\nThe business value: every new customer gets the same strong start, regardless of how busy the team is that week.",
    steps: [{icon:'✅',label:'Signed'},{icon:'📧',label:'Welcome Sequence'},{icon:'🎯',label:'Engagement Tracked'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'milestone-celebration-ai': {
    id: 'milestone-celebration-ai', firstName: 'Amrita', role: 'Milestone Celebration AI', industry: 'Customer Journey',
    blurb: 'Sends a message automatically when a customer hits a usage milestone, keeping the relationship warm.',
    intro: 'Automatically send a recognition message the moment a customer hits a meaningful usage milestone — a touchpoint that costs nothing to send and means a lot to receive.',
    roleDescription: "Milestones pass unnoticed more often than not, and a customer who's quietly become your biggest user rarely hears about it.\n\nAmrita tracks usage and sends the message automatically the moment the milestone's hit.\n\nThe business value: a relationship-building touchpoint that happens reliably, instead of only when someone remembers.",
    steps: [{icon:'📊',label:'Usage Tracked'},{icon:'🎉',label:'Milestone Hit'},{icon:'📧',label:'Message Sent'}],
    time: '1 hr/week', cost: '£160/mo',
  },
  'feedback-loop-ai': {
    id: 'feedback-loop-ai', firstName: 'Anika', role: 'Feedback Loop AI', industry: 'Customer Journey',
    blurb: 'Asks for feedback at the right moment in the customer journey, not a random one.',
    intro: 'Automatically request feedback at a meaningful point in the customer journey — after onboarding, after a support resolution — instead of a generic blanket survey.',
    roleDescription: "A feedback request sent at the wrong moment gets ignored, or worse, gets an answer that doesn't actually reflect the experience.\n\nAnika triggers the request at the right moment specifically, when the experience is still fresh and relevant.\n\nThe business value: feedback that's actually useful, because it's asked for at the moment it means something.",
    steps: [{icon:'🎯',label:'Trigger Point Reached'},{icon:'📋',label:'Feedback Requested'},{icon:'📊',label:'Logged'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'referral-prompt-ai': {
    id: 'referral-prompt-ai', firstName: 'Anvi', role: 'Referral Prompt AI', industry: 'Customer Journey',
    blurb: 'Asks happy customers for a referral automatically, right after a positive interaction.',
    intro: "Automatically prompt a referral request right after a positive signal — a great review, a renewed contract — when the customer's goodwill is at its peak.",
    roleDescription: "Referral requests sent at random rarely land, but the same ask right after a great interaction converts far better — and that timing is hard to catch manually every time.\n\nAnvi catches the moment automatically and sends the ask while the goodwill's fresh.\n\nThe business value: more referrals, simply from asking at the right second instead of a random one.",
    steps: [{icon:'🎯',label:'Positive Signal'},{icon:'📧',label:'Referral Ask Sent'},{icon:'📋',label:'Tracked'}],
    time: '1 hr/week', cost: '£160/mo',
  },
  'contract-renewal-prep-ai': {
    id: 'contract-renewal-prep-ai', firstName: 'Arnav', role: 'Contract Renewal Prep AI', industry: 'Customer Journey',
    blurb: 'Prepares renewal paperwork automatically weeks before the contract date, not the week of.',
    intro: 'Automatically prepare the renewal paperwork weeks ahead of the contract date — so the conversation starts early instead of as a last-minute scramble.',
    roleDescription: "Renewal paperwork pulled together the week the contract's due puts the whole conversation on the back foot.\n\nArnav prepares it automatically weeks in advance and hands the rep a ready package.\n\nThe business value: renewal conversations that start from a position of preparation, not panic.",
    steps: [{icon:'📅',label:'Renewal Approaching'},{icon:'📄',label:'Paperwork Prepped'},{icon:'👤',label:'Rep Notified'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  /* ── Finance Batch 3 ── */
  'tax-summary-ai': {
    id: 'tax-summary-ai', firstName: 'Avani', role: 'Tax Summary AI', industry: 'Telecom & Subscription',
    blurb: 'Compiles a tax-ready summary of invoices and expenses automatically each quarter.',
    intro: 'Automatically compile a tax-ready summary of every invoice and expense each quarter — no scrambling through records when the deadline hits.',
    roleDescription: "Pulling together quarterly figures by hand usually happens right before the deadline, under pressure, with room for mistakes.\n\nAvani compiles the summary automatically as the quarter closes, accurate and ready ahead of time.\n\nThe business value: tax prep that starts from a finished summary, not a scramble through twelve weeks of records.",
    steps: [{icon:'📅',label:'Quarter End'},{icon:'📊',label:'Data Compiled'},{icon:'📄',label:'Summary Ready'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'credit-control-ai': {
    id: 'credit-control-ai', firstName: 'Bhavya', role: 'Credit Control AI', industry: 'Telecom & Subscription',
    blurb: 'Flags accounts past their credit limit automatically before a new order goes through.',
    intro: "Automatically check an account's outstanding balance against their credit limit before a new order's confirmed — catching exposure before it grows.",
    roleDescription: "Without an automatic check, an account can keep ordering well past where it should've been flagged, and the exposure only gets noticed once it's already a problem.\n\nBhavya checks every new order against the limit instantly and holds anything over.\n\nThe business value: credit exposure caught before it grows, not discovered at write-off time.",
    steps: [{icon:'📊',label:'Order Placed'},{icon:'🚩',label:'Credit Checked'},{icon:'⛔',label:'Hold if Over Limit'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'refund-processor-ai': {
    id: 'refund-processor-ai', firstName: 'Chetan', role: 'Refund Processor AI', industry: 'Telecom & Subscription',
    blurb: 'Processes approved refunds automatically and updates the accounting record.',
    intro: "Automatically process a refund the moment it's approved and update the accounting record — no manual entry to keep books in sync.",
    roleDescription: "An approved refund still needs someone to actually process it and log it correctly, and that gap is where errors and delays creep in.\n\nChetan processes it the moment approval comes through and logs it automatically.\n\nThe business value: refunds that go out fast and books that stay accurate without manual reconciliation.",
    steps: [{icon:'✅',label:'Refund Approved'},{icon:'💳',label:'Processed'},{icon:'📋',label:'Logged'}],
    time: '1 hr/week', cost: '£160/mo',
  },
  'budget-alert-ai': {
    id: 'budget-alert-ai', firstName: 'Darshan', role: 'Budget Alert AI', industry: 'Telecom & Subscription',
    blurb: 'Alerts a manager automatically when departmental spend approaches the budget cap.',
    intro: "Automatically track departmental spend against budget and alert the manager as it approaches the cap — before the overspend's already happened.",
    roleDescription: "Budget overruns are usually discovered at month-end review, by which point the spend's already happened and there's nothing left to do but explain it.\n\nDarshan tracks spend continuously and alerts the manager as the threshold approaches.\n\nThe business value: overspend caught while there's still time to course-correct, not after the fact.",
    steps: [{icon:'📊',label:'Spend Tracked'},{icon:'🎯',label:'Threshold Approaching'},{icon:'🔔',label:'Manager Alerted'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'multi-currency-sync-ai': {
    id: 'multi-currency-sync-ai', firstName: 'Gauri', role: 'Multi-Currency Sync AI', industry: 'Telecom & Subscription',
    blurb: 'Converts and reconciles invoices across currencies automatically at the correct daily rate.',
    intro: 'Automatically apply the correct daily exchange rate to every cross-currency invoice and reconcile it — no manual rate lookups.',
    roleDescription: "Manually applying exchange rates invoice by invoice is slow and exactly the kind of task where a stale rate slips through unnoticed.\n\nGauri pulls the correct daily rate automatically and reconciles the invoice against it.\n\nThe business value: accurate cross-currency books without anyone needing to check a rate by hand.",
    steps: [{icon:'📄',label:'Invoice Raised'},{icon:'💱',label:'Rate Applied'},{icon:'✅',label:'Reconciled'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  /* ── Reporting Batch 3 ── */
  'weekly-digest-ai': {
    id: 'weekly-digest-ai', firstName: 'Harsh', role: 'Weekly Digest AI', industry: 'Reporting',
    blurb: 'Compiles and sends the weekly performance digest automatically, no manual pulling of numbers.',
    intro: 'Automatically compile and send a weekly performance digest pulling from every connected system — ready in inboxes Monday morning.',
    roleDescription: "Pulling together a weekly digest by hand means logging into several systems and copy-pasting numbers into a doc, every single week.\n\nHarsh pulls everything automatically and sends the digest out on schedule.\n\nThe business value: leadership starts the week with the numbers already in hand, not waiting on someone to compile them.",
    steps: [{icon:'📅',label:'Week Ends'},{icon:'📊',label:'Numbers Pulled'},{icon:'📧',label:'Digest Sent'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'kpi-alert-ai': {
    id: 'kpi-alert-ai', firstName: 'Ila', role: 'KPI Alert AI', industry: 'Reporting',
    blurb: 'Alerts leadership automatically the moment a key metric crosses a defined threshold.',
    intro: 'Automatically monitor key metrics continuously and alert leadership the instant one crosses a defined threshold — good or bad.',
    roleDescription: "Important shifts in a key number usually only get noticed at the next scheduled review, by which point the trend's already well underway.\n\nIla watches the metric continuously and alerts the right person the moment it crosses the line.\n\nThe business value: leadership reacts to what's happening now, not what happened weeks ago.",
    steps: [{icon:'📊',label:'Metric Monitored'},{icon:'🎯',label:'Threshold Crossed'},{icon:'🔔',label:'Leadership Alerted'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'rep-leaderboard-ai': {
    id: 'rep-leaderboard-ai', firstName: 'Jatin', role: 'Rep Leaderboard AI', industry: 'Reporting',
    blurb: 'Updates the sales leaderboard in real time automatically as deals close.',
    intro: "Automatically update the live sales leaderboard the instant a deal closes — no manual spreadsheet to refresh.",
    roleDescription: "A leaderboard that's only updated occasionally loses the competitive energy that makes it work in the first place.\n\nJatin updates it the moment a deal closes, so the ranking's always current.\n\nThe business value: a leaderboard reps actually trust and check, because it's never stale.",
    steps: [{icon:'✅',label:'Deal Closed'},{icon:'📊',label:'Leaderboard Updated'},{icon:'🏆',label:'Ranking Refreshed'}],
    time: '1 hr/week', cost: '£160/mo',
  },
  'churn-report-ai': {
    id: 'churn-report-ai', firstName: 'Kajal', role: 'Churn Report AI', industry: 'Reporting',
    blurb: 'Compiles a churn report automatically each month, broken down by reason.',
    intro: 'Automatically compile a monthly churn report broken down by reason — no manual digging through cancellation notes.',
    roleDescription: "Understanding why customers actually leave usually means someone manually reading through cancellation notes and tagging patterns by hand.\n\nKajal compiles the report automatically each month, categorised and ready to act on.\n\nThe business value: churn patterns visible every month, not discovered a year later in a retrospective.",
    steps: [{icon:'📅',label:'Month End'},{icon:'📊',label:'Churn Compiled'},{icon:'📄',label:'Report Ready'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'pipeline-snapshot-ai': {
    id: 'pipeline-snapshot-ai', firstName: 'Kartik', role: 'Pipeline Snapshot AI', industry: 'Reporting',
    blurb: 'Generates a pipeline snapshot automatically every Monday morning before the sales meeting.',
    intro: 'Automatically generate and send a fresh pipeline snapshot every Monday morning — ready before the sales meeting starts, not pulled together during it.',
    roleDescription: "Building the pipeline view live in a Monday meeting wastes the meeting's actual time on data-pulling instead of discussion.\n\nKartik generates the snapshot automatically before anyone's even logged in.\n\nThe business value: meetings that start with discussion, not data assembly.",
    steps: [{icon:'📅',label:'Monday Trigger'},{icon:'📊',label:'Pipeline Pulled'},{icon:'📧',label:'Snapshot Sent'}],
    time: '1 hr/week', cost: '£160/mo',
  },
  'expense-report-ai': {
    id: 'expense-report-ai', firstName: 'Lavanya', role: 'Expense Report AI', industry: 'Reporting',
    blurb: 'Compiles departmental expense reports automatically at month end.',
    intro: "Automatically compile every department's expense report at month end and send it to the right manager — no manual collation.",
    roleDescription: "Collating expenses across a department by hand at month end is tedious work that eats a full afternoon for no real benefit.\n\nLavanya compiles it automatically and routes it to the right manager.\n\nThe business value: month-end reporting that's done before anyone's even thought to start it.",
    steps: [{icon:'📅',label:'Month End'},{icon:'📊',label:'Expenses Compiled'},{icon:'📄',label:'Report Sent'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'board-deck-data-ai': {
    id: 'board-deck-data-ai', firstName: 'Manav', role: 'Board Deck Data AI', industry: 'Reporting',
    blurb: 'Pulls the latest metrics into the board deck template automatically before every meeting.',
    intro: 'Automatically pull the latest figures into the board deck template ahead of every board meeting — no last-minute scramble to update slides.',
    roleDescription: "Updating a board deck the night before is a familiar kind of stress, and it's exactly the moment a wrong number is most likely to slip through.\n\nManav refreshes the deck's data automatically as the meeting approaches.\n\nThe business value: board materials that are accurate and ready well ahead of time, not assembled in a rush.",
    steps: [{icon:'📅',label:'Meeting Scheduled'},{icon:'📊',label:'Metrics Pulled'},{icon:'📄',label:'Deck Updated'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'customer-health-dashboard-ai': {
    id: 'customer-health-dashboard-ai', firstName: 'Mira', role: 'Customer Health Dashboard AI', industry: 'Reporting',
    blurb: 'Updates a live customer health dashboard automatically from usage and support data.',
    intro: 'Automatically calculate and update a live customer health score from usage and support data — so account risk is visible before a crisis.',
    roleDescription: "Customer health is usually assessed informally, from a rep's gut feel, which means real risk can sit invisible until a churn conversation's already happening.\n\nMira calculates and updates the score continuously from real usage and support signals.\n\nThe business value: account risk visible on a dashboard, not discovered after the customer's already decided to leave.",
    steps: [{icon:'📊',label:'Usage Tracked'},{icon:'🎯',label:'Score Calculated'},{icon:'📈',label:'Dashboard Updated'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'revenue-forecast-report-ai': {
    id: 'revenue-forecast-report-ai', firstName: 'Mohit', role: 'Revenue Forecast Report AI', industry: 'Reporting',
    blurb: 'Compiles a rolling revenue forecast report automatically from current pipeline data.',
    intro: "Automatically compile a rolling revenue forecast report from live pipeline data — current every time it's opened, not stale by the time it's read.",
    roleDescription: "A forecast report built manually is out of date the moment a deal moves, which makes it a snapshot of the past by the time anyone reads it.\n\nMohit compiles it from live data continuously, so the report's always current.\n\nThe business value: a forecast leadership can actually trust the moment they open it.",
    steps: [{icon:'📊',label:'Pipeline Data Pulled'},{icon:'🔮',label:'Forecast Modelled'},{icon:'📄',label:'Report Compiled'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  /* ── CRM Optimisation Batch 3 ── */
  'tag-cleanup-ai': {
    id: 'tag-cleanup-ai', firstName: 'Naina', role: 'Tag Cleanup AI', industry: 'Sales & CRM',
    blurb: 'Standardises inconsistent tags and labels automatically across the CRM.',
    intro: 'Automatically scan and standardise inconsistent tags across the CRM — so filtering and segmentation actually work the way they should.',
    roleDescription: "Tags pile up inconsistently over time — three different spellings of the same label, capitalisation that doesn't match — until segmentation and reporting both start producing wrong results.\n\nNaina scans and standardises them automatically.\n\nThe business value: filters and segments that actually return what they're supposed to, instead of missing records due to a tag typo.",
    steps: [{icon:'🔍',label:'Tags Scanned'},{icon:'🔀',label:'Inconsistencies Found'},{icon:'♻️',label:'Standardised'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'activity-logger-ai': {
    id: 'activity-logger-ai', firstName: 'Nidhi', role: 'Activity Logger AI', industry: 'Sales & CRM',
    blurb: 'Logs call and email activity automatically against the right CRM record, no manual note-taking.',
    intro: 'Automatically log every call and email against the correct CRM record — so activity history is complete without a rep typing it in.',
    roleDescription: "Manual activity logging is the first thing a busy rep skips, which leaves the CRM with a partial, unreliable history of what's actually happened on an account.\n\nNidhi logs every interaction automatically the moment it happens.\n\nThe business value: a CRM that reflects what's actually been done, not just what someone remembered to write down.",
    steps: [{icon:'📞',label:'Call/Email Happens'},{icon:'🔗',label:'Matched to Record'},{icon:'📋',label:'Logged'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'ownership-reassignment-ai': {
    id: 'ownership-reassignment-ai', firstName: 'Nikita', role: 'Ownership Reassignment AI', industry: 'Sales & CRM',
    blurb: 'Reassigns CRM records automatically when a rep leaves or territories change.',
    intro: 'Automatically reassign every affected CRM record when a rep leaves or territories shift — no records left orphaned with an inactive owner.',
    roleDescription: "A rep change usually means someone has to manually find and reassign every record they owned, and it's easy to miss some in the process.\n\nNikita reassigns every affected record automatically the moment the change is confirmed.\n\nThe business value: no orphaned accounts sitting unowned and unworked after a team change.",
    steps: [{icon:'⚡',label:'Rep Change Detected'},{icon:'🔀',label:'Records Reassigned'},{icon:'✅',label:'Confirmed'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'lead-source-tracker-ai': {
    id: 'lead-source-tracker-ai', firstName: 'Nimisha', role: 'Lead Source Tracker AI', industry: 'Sales & CRM',
    blurb: 'Tags every new lead automatically with its true source, even across multi-touch journeys.',
    intro: "Automatically trace and tag a lead's true original source, even when it's touched multiple channels before converting — so marketing attribution is actually accurate.",
    roleDescription: "Lead source is often logged as whatever channel happened to be last touched, which credits the wrong campaign and skews where budget gets spent.\n\nNimisha traces the full touchpoint history and tags the true source automatically.\n\nThe business value: marketing spend decisions based on what actually worked, not what happened to be the last click.",
    steps: [{icon:'⚡',label:'Lead Created'},{icon:'🔍',label:'Source Traced'},{icon:'🏷️',label:'Tagged'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'custom-field-audit-ai': {
    id: 'custom-field-audit-ai', firstName: 'Pankaj', role: 'Custom Field Audit AI', industry: 'Sales & CRM',
    blurb: 'Audits custom fields automatically for blanks and inconsistencies, flagging records that need fixing.',
    intro: 'Automatically audit custom fields across the CRM for blanks and inconsistent values, flagging the records that need a human fix.',
    roleDescription: "Custom fields drift out of consistency as different people fill them in differently, or not at all, and that drift quietly erodes report accuracy over time.\n\nPankaj scans the fields regularly and flags exactly what needs fixing.\n\nThe business value: a CRM that stays trustworthy, with data-quality issues caught early instead of compounding for months.",
    steps: [{icon:'🔍',label:'Fields Scanned'},{icon:'🚩',label:'Gaps Found'},{icon:'📋',label:'Flagged for Review'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  /* ── Bespoke / Operations Batch 3 ── */
  'approval-chain-ai': {
    id: 'approval-chain-ai', firstName: 'Parth', role: 'Approval Chain AI', industry: 'Operations & HR',
    blurb: 'Routes any document automatically through a custom multi-step approval chain.',
    intro: 'Automatically route a document through whatever multi-step approval chain your business needs, built entirely to your structure — not a rigid out-of-the-box flow.',
    roleDescription: "Off-the-shelf approval tools rarely match a business's actual sign-off structure, which means someone ends up manually chasing the steps the software can't handle.\n\nParth handles the full chain exactly as specified, however many steps and approvers it takes.\n\nThe business value: approvals that follow your actual process, not a generic template forced to fit.",
    steps: [{icon:'📥',label:'Document Submitted'},{icon:'🔀',label:'Multi-Step Routing'},{icon:'✅',label:'Final Approval'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'data-backup-sync-ai': {
    id: 'data-backup-sync-ai', firstName: 'Pratham', role: 'Data Backup Sync AI', industry: 'Operations & HR',
    blurb: 'Syncs and backs up business data automatically across systems on a set schedule.',
    intro: 'Automatically sync and back up business-critical data across systems on a schedule — built around exactly which systems and data matter to you.',
    roleDescription: "Backup processes that depend on someone manually exporting and storing data are exactly the kind of task that gets skipped when things get busy.\n\nPratham runs the sync and backup on schedule, every time, without anyone needing to remember.\n\nThe business value: data that's actually protected, on a schedule that doesn't depend on anyone's memory.",
    steps: [{icon:'📅',label:'Scheduled Trigger'},{icon:'💾',label:'Data Synced'},{icon:'✅',label:'Backup Confirmed'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'multi-system-sync-ai': {
    id: 'multi-system-sync-ai', firstName: 'Raghav', role: 'Multi-System Sync AI', industry: 'Operations & HR',
    blurb: 'Keeps records aligned automatically across two or more disconnected systems in real time.',
    intro: "Automatically keep records aligned in real time across two or more systems that don't natively talk to each other — built to your exact stack.",
    roleDescription: "Disconnected systems drift out of sync constantly, and reconciling them by hand means someone's always working from data that's slightly out of date.\n\nRaghav syncs the relevant fields the moment either system updates, keeping both aligned continuously.\n\nThe business value: one accurate version of the truth, regardless of how many systems the business actually runs on.",
    steps: [{icon:'⚡',label:'Record Updated'},{icon:'🔄',label:'Synced Across Systems'},{icon:'✅',label:'Aligned'}],
    time: '4 hrs/week', cost: '£640/mo',
  },
  'document-merge-ai': {
    id: 'document-merge-ai', firstName: 'Rajat', role: 'Document Merge AI', industry: 'Operations & HR',
    blurb: 'Merges CRM data into branded document templates automatically on demand.',
    intro: "Automatically merge live CRM data into a branded document template the moment it's triggered — contracts, reports, letters, built to your exact format.",
    roleDescription: "Manually pulling data into a document template means copy-pasting fields one at a time and hoping nothing's missed.\n\nRajat merges the data automatically into the correct template, formatted and ready.\n\nThe business value: consistent, error-free documents generated in seconds instead of assembled by hand.",
    steps: [{icon:'⚡',label:'Trigger Fired'},{icon:'📄',label:'Data Merged'},{icon:'✅',label:'Document Ready'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'webhook-router-ai': {
    id: 'webhook-router-ai', firstName: 'Raman', role: 'Webhook Router AI', industry: 'Operations & HR',
    blurb: 'Routes incoming webhooks automatically to the right internal system based on payload type.',
    intro: "Automatically classify and route every incoming webhook to the correct internal system based on what it actually contains — the connective layer most off-the-shelf tools don't handle.",
    roleDescription: "When multiple tools fire webhooks into one place, someone usually has to build custom logic just to figure out where each one should actually go.\n\nRaman classifies the payload and routes it to the right destination automatically.\n\nThe business value: every system gets exactly the data it needs, without a developer hand-building the routing logic each time something changes.",
    steps: [{icon:'📥',label:'Webhook Received'},{icon:'🔀',label:'Payload Classified'},{icon:'➡️',label:'Routed to System'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  'error-monitor-ai': {
    id: 'error-monitor-ai', firstName: 'Ravi', role: 'Error Monitor AI', industry: 'Operations & HR',
    blurb: 'Monitors every automation for failures automatically and alerts before a silent break causes damage.',
    intro: 'Automatically monitor every automation in your stack for failures and alert the team the moment one breaks — before a silent failure causes real damage downstream.',
    roleDescription: "Automations fail silently more often than people expect, and the first sign is usually a customer or a manager noticing something didn't happen.\n\nRavi watches every connected automation continuously and alerts the team the instant something breaks.\n\nThe business value: failures caught and fixed in minutes, not discovered weeks later when the damage has already compounded.",
    steps: [{icon:'⚡',label:'Automation Runs'},{icon:'🔍',label:'Failure Detected'},{icon:'🔔',label:'Team Alerted'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'custom-report-builder-ai': {
    id: 'custom-report-builder-ai', firstName: 'Reet', role: 'Custom Report Builder AI', industry: 'Operations & HR',
    blurb: 'Builds a fully custom report to spec automatically, on whatever schedule the business needs.',
    intro: 'Automatically build a fully custom report exactly to your spec, pulling from whatever systems hold the data, on whatever schedule you need it.',
    roleDescription: "Off-the-shelf reporting tools rarely show the exact combination of numbers a specific business actually needs, leaving someone to assemble it manually every cycle.\n\nReet builds the report to the agreed spec automatically, every time it's due.\n\nThe business value: the exact report you need, generated automatically, instead of a generic dashboard that's almost right.",
    steps: [{icon:'📋',label:'Spec Defined'},{icon:'📊',label:'Data Pulled'},{icon:'📄',label:'Report Built'}],
    time: '3 hrs/week', cost: '£480/mo',
  },
  /* ── Marketing Batch 3 ── */
  'landing-page-ab-test-ai': {
    id: 'landing-page-ab-test-ai', firstName: 'Riya', role: 'Landing Page A/B Test AI', industry: 'Marketing',
    blurb: 'Rotates landing page variants automatically and reports which one converts better.',
    intro: "Automatically rotate landing page variants and report which one's converting better — no manual split-test tracking in a spreadsheet.",
    roleDescription: "Running an A/B test properly means tracking traffic and conversions across variants consistently, which is easy to do badly by hand.\n\nRiya rotates the variants and tracks performance automatically, reporting the winner clearly.\n\nThe business value: decisions based on real conversion data, not a gut feel about which page looks better.",
    steps: [{icon:'🔀',label:'Variants Live'},{icon:'📊',label:'Performance Tracked'},{icon:'🏆',label:'Winner Reported'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'content-repurposer-ai': {
    id: 'content-repurposer-ai', firstName: 'Roshni', role: 'Content Repurposer AI', industry: 'Marketing',
    blurb: 'Repurposes a long-form piece of content automatically into shorter posts across channels.',
    intro: "Automatically break a long-form piece of content into shorter posts for other channels the moment it's published — getting more reach from work already done.",
    roleDescription: "A long article or video usually gets published once and then sits there, even though it could fuel a week of social content with almost no extra effort.\n\nRoshni repurposes it into shorter pieces automatically and queues them for distribution.\n\nThe business value: more reach from the same content, without anyone having to manually chop it up.",
    steps: [{icon:'📝',label:'Long-Form Published'},{icon:'✂️',label:'Repurposed'},{icon:'📤',label:'Distributed'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'competitor-monitor-ai': {
    id: 'competitor-monitor-ai', firstName: 'Sahil', role: 'Competitor Monitor AI', industry: 'Marketing',
    blurb: 'Tracks competitor pricing and offers automatically, alerting when something changes.',
    intro: 'Automatically track competitor pricing and offers and alert the team the moment something changes — instead of finding out from a customer.',
    roleDescription: "Competitor moves are usually noticed by accident, often after a prospect mentions a better deal they've already been offered elsewhere.\n\nSahil monitors competitor pages continuously and alerts the team the moment something shifts.\n\nThe business value: pricing and positioning decisions made proactively, not in reaction to a lost deal.",
    steps: [{icon:'🔍',label:'Competitor Tracked'},{icon:'🚩',label:'Change Detected'},{icon:'🔔',label:'Team Alerted'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'webinar-followup-ai': {
    id: 'webinar-followup-ai', firstName: 'Sanya', role: 'Webinar Follow-Up AI', industry: 'Marketing',
    blurb: 'Sends the right follow-up sequence automatically based on whether someone attended the webinar.',
    intro: 'Automatically send a different follow-up sequence depending on whether someone attended the webinar live, watched the replay, or missed it entirely.',
    roleDescription: "A single generic follow-up email sent to everyone who registered ignores the fact that attendees and no-shows need completely different messages.\n\nSanya checks attendance automatically and sends the right sequence to each segment.\n\nThe business value: follow-up that actually matches where someone is in their interest, instead of one email trying to fit everyone.",
    steps: [{icon:'🎥',label:'Webinar Ends'},{icon:'🔀',label:'Attendance Checked'},{icon:'📧',label:'Right Sequence Sent'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'seo-content-brief-ai': {
    id: 'seo-content-brief-ai', firstName: 'Sarika', role: 'SEO Content Brief AI', industry: 'Marketing',
    blurb: 'Builds an SEO content brief automatically from keyword research, ready for a writer.',
    intro: 'Automatically pull keyword research and competitor analysis into a structured content brief — ready to hand straight to a writer.',
    roleDescription: "Building a content brief from scratch means researching keywords, checking what's already ranking, and structuring it all into something a writer can actually use.\n\nSarika compiles that research automatically into a ready brief.\n\nThe business value: writers start with a clear brief instead of losing half a day to research before writing a word.",
    steps: [{icon:'🔍',label:'Keyword Researched'},{icon:'📋',label:'Brief Built'},{icon:'📤',label:'Sent to Writer'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  /* ── Customer Support Batch 3 ── */
  'live-chat-handoff-ai': {
    id: 'live-chat-handoff-ai', firstName: 'Sejal', role: 'Live Chat Handoff AI', industry: 'Customer Support',
    blurb: "Hands a live chat over to a human automatically the moment the bot can't resolve it.",
    intro: "Automatically detect when a chatbot's stuck and hand the conversation to a human instantly — no customer left talking to a bot going in circles.",
    roleDescription: "A customer stuck with a bot that can't answer their question is one of the fastest ways to lose patience with a brand.\n\nSejal detects the stall and hands off to a human the moment it happens, with full context carried over.\n\nThe business value: customers reach a person fast when they need one, without repeating themselves.",
    steps: [{icon:'💬',label:'Bot Engaged'},{icon:'🤔',label:"Can't Resolve"},{icon:'👤',label:'Handed to Human'}],
    time: '1 hr/week', cost: '£160/mo',
  },
  'refund-request-ai': {
    id: 'refund-request-ai', firstName: 'Shaurya', role: 'Refund Request AI', industry: 'Customer Support',
    blurb: 'Processes simple refund requests automatically against policy, escalating anything outside the rules.',
    intro: 'Automatically check a refund request against policy and process it instantly if it qualifies — escalating only the ones that genuinely need a human decision.',
    roleDescription: "Most refund requests are straightforward and policy-compliant, yet still go through the same manual review as the complicated edge cases.\n\nShaurya checks each request against policy and processes the clear-cut ones instantly, flagging only what genuinely needs judgement.\n\nThe business value: faster refunds for customers and less time spent reviewing requests that didn't need a human at all.",
    steps: [{icon:'📥',label:'Request Received'},{icon:'📋',label:'Checked Against Policy'},{icon:'✅',label:'Processed or Escalated'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'macro-suggestion-ai': {
    id: 'macro-suggestion-ai', firstName: 'Shivani', role: 'Macro Suggestion AI', industry: 'Customer Support',
    blurb: "Suggests the right canned response automatically based on the ticket's content.",
    intro: 'Automatically read an incoming ticket and suggest the best-matching response template — the agent reviews and sends, instead of starting from a blank reply.',
    roleDescription: "Agents often know the right answer exists somewhere in a library of templates but waste time searching for the right one.\n\nShivani reads the ticket and surfaces the best match automatically, ready to send.\n\nThe business value: faster replies with consistent quality, without an agent hunting through a template library.",
    steps: [{icon:'📥',label:'Ticket Read'},{icon:'🤖',label:'Match Found'},{icon:'💬',label:'Response Suggested'}],
    time: '1 hr/week', cost: '£160/mo',
  },
  'support-volume-forecast-ai': {
    id: 'support-volume-forecast-ai', firstName: 'Sneha', role: 'Support Volume Forecast AI', industry: 'Customer Support',
    blurb: "Forecasts next week's ticket volume automatically so staffing can be planned ahead.",
    intro: "Automatically forecast next week's expected ticket volume from historical patterns — so staffing decisions are made ahead of time, not in reaction to a backlog.",
    roleDescription: "Support teams usually find out they're understaffed by watching the queue grow, which is the most stressful way possible to manage capacity.\n\nSneha forecasts expected volume from historical patterns and flags it before the week starts.\n\nThe business value: staffing planned proactively, with fewer surprise backlog days.",
    steps: [{icon:'📊',label:'Historical Data Analysed'},{icon:'🔮',label:'Volume Forecast'},{icon:'📋',label:'Staffing Suggested'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'multi-channel-merge-ai': {
    id: 'multi-channel-merge-ai', firstName: 'Sohan', role: 'Multi-Channel Merge AI', industry: 'Customer Support',
    blurb: "Merges a customer's email, chat, and social messages automatically into one ticket thread.",
    intro: "Automatically merge a customer's messages across email, chat, and social into a single ticket thread — so no agent answers the same question twice in two channels.",
    roleDescription: "The same customer messaging across email and chat about the same issue often gets treated as two separate tickets by two different agents.\n\nSohan matches the customer and merges everything into one thread automatically.\n\nThe business value: one consistent conversation per customer, instead of fragmented, duplicated effort across channels.",
    steps: [{icon:'📧',label:'Multiple Channels'},{icon:'🔗',label:'Customer Matched'},{icon:'🧵',label:'Merged into One Thread'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  /* ── HR & Recruitment Batch 3 ── */
  'reference-check-ai': {
    id: 'reference-check-ai', firstName: 'Suhana', role: 'Reference Check AI', industry: 'HR & Recruitment',
    blurb: 'Sends and chases reference check requests automatically once a candidate accepts an offer.',
    intro: "Automatically send the reference request the moment an offer's accepted, and chase it automatically until it comes back.",
    roleDescription: "Reference checks often stall simply because nobody followed up a second time when the first request went unanswered.\n\nSuhana sends the request immediately and keeps chasing automatically until it's received.\n\nThe business value: references actually collected before the start date, not chased after someone's already begun.",
    steps: [{icon:'✅',label:'Offer Accepted'},{icon:'📧',label:'Reference Requested'},{icon:'📋',label:'Chased Until Received'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'contract-generation-hr-ai': {
    id: 'contract-generation-hr-ai', firstName: 'Sumit', role: 'Contract Generation AI', industry: 'HR & Recruitment',
    blurb: 'Generates the employment contract automatically from the agreed offer details.',
    intro: 'Automatically generate the employment contract from the agreed offer terms and send it for signature — no manual drafting from a template each time.',
    roleDescription: "Drafting a contract by hand from a template means manually swapping in salary, title, and start date, and double-checking nothing's been missed.\n\nSumit generates it automatically from the agreed terms and sends it out for signature.\n\nThe business value: accurate contracts out the same day an offer's agreed, not days later.",
    steps: [{icon:'✅',label:'Offer Agreed'},{icon:'📄',label:'Contract Generated'},{icon:'📧',label:'Sent for Signature'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'probation-review-reminder-ai': {
    id: 'probation-review-reminder-ai', firstName: 'Tejas', role: 'Probation Review Reminder AI', industry: 'HR & Recruitment',
    blurb: "Reminds a manager automatically when a new hire's probation review is due.",
    intro: "Automatically track every new hire's probation timeline and remind the manager when the review's due — so it never quietly gets missed.",
    roleDescription: "A probation review missed entirely is a genuine risk, and it happens more often than it should when it depends purely on a manager's memory.\n\nTejas tracks the timeline automatically and reminds the manager with enough notice to prepare.\n\nThe business value: every probation review happens on time, protecting both the employee and the business.",
    steps: [{icon:'📅',label:'Start Date Logged'},{icon:'⏱️',label:'Review Due'},{icon:'🔔',label:'Manager Reminded'}],
    time: '1 hr/week', cost: '£160/mo',
  },
  'exit-interview-ai': {
    id: 'exit-interview-ai', firstName: 'Trisha', role: 'Exit Interview AI', industry: 'HR & Recruitment',
    blurb: "Schedules and sends the exit interview automatically the moment someone resigns.",
    intro: "Automatically schedule the exit interview the moment a resignation's logged — capturing honest feedback while it's still front of mind.",
    roleDescription: "Exit interviews scheduled late, or skipped entirely under time pressure, mean losing feedback that could've improved retention for the next person.\n\nTrisha schedules it automatically the moment a resignation comes in.\n\nThe business value: consistent exit feedback captured every time, instead of only when HR has a spare slot.",
    steps: [{icon:'📥',label:'Resignation Logged'},{icon:'📅',label:'Interview Scheduled'},{icon:'📋',label:'Notes Captured'}],
    time: '1 hr/week', cost: '£160/mo',
  },
  'training-completion-tracker-ai': {
    id: 'training-completion-tracker-ai', firstName: 'Urvi', role: 'Training Completion Tracker AI', industry: 'HR & Recruitment',
    blurb: 'Tracks mandatory training completion automatically and chases anyone overdue.',
    intro: "Automatically track mandatory training completion against deadlines and chase anyone overdue — no manual spreadsheet of who's done what.",
    roleDescription: "Compliance training tracked in a spreadsheet inevitably falls behind, and the gap usually only surfaces during an audit.\n\nUrvi tracks every employee's status automatically and chases anyone overdue.\n\nThe business value: compliance that's actually current, not discovered to be lapsed when it's already a problem.",
    steps: [{icon:'📚',label:'Training Assigned'},{icon:'📅',label:'Deadline Tracked'},{icon:'🔔',label:'Overdue Chased'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  /* ── IT & Security Batch 3 ── */
  'password-reset-ai': {
    id: 'password-reset-ai', firstName: 'Vansh', role: 'Password Reset AI', industry: 'IT & Security',
    blurb: 'Handles routine password reset requests automatically without a ticket needing a human.',
    intro: "Automatically handle a routine password reset request end-to-end once identity's verified — no ticket sitting in an engineer's queue for something this simple.",
    roleDescription: "A huge share of IT tickets are password resets, and each one still takes an engineer's attention even though the process is identical every time.\n\nVansh verifies identity and completes the reset automatically, every time.\n\nThe business value: instant resolution for the most common ticket type, freeing engineers for problems that actually need a person.",
    steps: [{icon:'📥',label:'Reset Requested'},{icon:'✅',label:'Identity Verified'},{icon:'🔓',label:'Reset Completed'}],
    time: '1 hr/week', cost: '£160/mo',
  },
  'license-usage-audit-ai': {
    id: 'license-usage-audit-ai', firstName: 'Yash', role: 'License Usage Audit AI', industry: 'IT & Security',
    blurb: "Audits software license usage automatically and flags seats nobody's using.",
    intro: "Automatically audit software license usage across the business and flag seats that haven't been touched in weeks — money sitting unused until someone checks.",
    roleDescription: "Unused software seats quietly keep getting paid for because nobody's actively checking usage against the licence count.\n\nYash audits usage continuously and flags idle seats automatically.\n\nThe business value: licence spend that actually matches real usage, instead of paying for seats nobody's logged into in months.",
    steps: [{icon:'📊',label:'Usage Tracked'},{icon:'🔍',label:'Idle Seats Found'},{icon:'📋',label:'Flagged for Review'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'device-onboarding-ai': {
    id: 'device-onboarding-ai', firstName: 'Yamini', role: 'Device Onboarding AI', industry: 'IT & Security',
    blurb: "Provisions a new employee's devices and accounts automatically the moment they're hired.",
    intro: "Automatically provision a new hire's devices and software accounts the moment they're confirmed — so day one starts with everything ready, not a help-desk ticket.",
    roleDescription: "New starters showing up to a laptop that isn't set up yet is a bad first impression that's entirely avoidable.\n\nYamini provisions devices and accounts automatically the moment the hire's confirmed.\n\nThe business value: a smooth first day, every time, without IT scrambling the morning someone starts.",
    steps: [{icon:'⚡',label:'New Hire Confirmed'},{icon:'💻',label:'Devices Provisioned'},{icon:'✅',label:'Accounts Created'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'suspicious-login-alert-ai': {
    id: 'suspicious-login-alert-ai', firstName: 'Zara', role: 'Suspicious Login Alert AI', industry: 'IT & Security',
    blurb: 'Alerts security automatically the moment a login looks out of pattern.',
    intro: "Automatically flag a login that doesn't match normal patterns — unusual location, unusual time — and alert security immediately.",
    roleDescription: "Suspicious logins are easy to miss in a sea of normal activity unless something's actively watching for the pattern that doesn't fit.\n\nZara checks every login against normal behaviour and alerts security the moment something looks off.\n\nThe business value: security threats caught in real time, not discovered after the damage is done.",
    steps: [{icon:'🔐',label:'Login Attempted'},{icon:'🚩',label:'Pattern Checked'},{icon:'🔔',label:'Security Alerted'}],
    time: '2 hrs/week', cost: '£320/mo',
  },
  'data-retention-cleanup-ai': {
    id: 'data-retention-cleanup-ai', firstName: 'Aditi', role: 'Data Retention Cleanup AI', industry: 'IT & Security',
    blurb: 'Deletes or archives data automatically once it passes the retention policy deadline.',
    intro: 'Automatically check data against the retention policy and archive or delete it once the deadline passes — keeping the business compliant without a manual review.',
    roleDescription: "Data retention compliance usually depends on someone remembering to run a manual cleanup, which means policy violations build up quietly in the background.\n\nAditi checks every record against the policy automatically and actions it the moment it's due.\n\nThe business value: compliance that's maintained continuously, not caught up on in a panic before an audit.",
    steps: [{icon:'📅',label:'Retention Period Checked'},{icon:'🗑️',label:'Data Flagged'},{icon:'✅',label:'Archived or Deleted'}],
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
    automationIds: ['lead-router-ai', 'win-back-campaign-ai', 'deal-recovery-ai', 'renewal-reminder-ai', 'upsell-builder-ai', 'email-tracker-ai'],
  },
  {
    id: 'customer-journey', name: 'Customer Journey Automation', icon: '🚀', color: '#c9963a',
    label: 'CUSTOMER JOURNEY · AI AUTOMATION',
    sub: 'Win to delivery — zero manual steps.',
    descPre: 'From signed contract to onboarding to review request — ',
    descEm: 'the entire post-sale chain handled automatically.',
    description: 'Onboarding, contracts, orders, and reviews — handled automatically from win to delivery.',
    automationIds: ['contract-generator-ai', 'document-filing-ai', 'order-form-builder-ai', 'review-collector-ai', 'onboarding-ai'],
  },
  {
    id: 'finance-automation', name: 'Finance & Invoice Automation', icon: '💰', color: '#9b2c2c',
    label: 'FINANCE · AI AUTOMATION',
    sub: 'Invoices sent before you remember to.',
    descPre: 'Billing, invoicing, and payment tracking — ',
    descEm: 'kept on schedule without anyone chasing it manually.',
    description: 'Billing, invoicing, and payment tracking — kept on schedule without manual chasing.',
    automationIds: ['invoice-generator-ai', 'payment-reminder-ai', 'payment-reconciliation-ai', 'recurring-billing-ai', 'expense-approval-ai'],
  },
  {
    id: 'reporting-dashboards', name: 'Reporting & Dashboards', icon: '📊', color: '#a07828',
    label: 'REPORTING · AI AUTOMATION',
    sub: 'Numbers in your inbox every morning.',
    descPre: 'Call activity, revenue figures, and operations data compiled overnight — ',
    descEm: 'ready before the office opens.',
    description: 'Management, sales, and operations reports delivered automatically to your inbox every morning.',
    automationIds: ['sales-dashboard-ai'],
  },
  {
    id: 'crm-optimisation', name: 'CRM Optimisation', icon: '🛠️', color: '#8b6f5e',
    label: 'CRM · AI AUTOMATION',
    sub: 'Clean data. Clear pipeline. Real forecasts.',
    descPre: 'Audit, restructure, or set up your CRM from scratch — ',
    descEm: 'so your pipeline data actually works for you.',
    description: 'Audit, restructure, or set up your CRM from scratch so your pipeline data actually works for you.',
    automationIds: ['duplicate-cleaner-ai', 'data-enrichment-ai', 'pipeline-health-ai', 'field-mapping-ai', 'forecast-sync-ai'],
  },
  {
    id: 'bespoke', name: 'Workflow Automation & Bespoke', icon: '🧩', color: '#5c3d2e',
    label: 'BESPOKE · AI AUTOMATION',
    sub: 'Any process. Any system. Automated.',
    descPre: "Custom workflows and system integration for anything that doesn't fit a standard category — ",
    descEm: 'built exactly to your spec.',
    description: 'System integration and custom workflows for any process that doesn\'t fit a standard category.',
    automationIds: ['data-sync-ai', 'field-update-tracker-ai', 'deal-won-orchestrator-ai'],
  },
  {
    id: 'marketing-automation', name: 'Marketing Automation', icon: '📢', color: '#b5651d',
    label: 'MARKETING · AI AUTOMATION',
    sub: 'Content, campaigns, and outreach that run themselves.',
    descPre: 'Social posting, ad spend, email campaigns, and lead delivery — ',
    descEm: 'running automatically across every channel.',
    description: 'Social posting, ad spend, email campaigns, and lead delivery — running automatically across every channel.',
    automationIds: ['social-post-scheduler-ai', 'ad-spend-optimiser-ai', 'email-campaign-builder-ai', 'lead-magnet-delivery-ai', 'review-response-ai'],
  },
  {
    id: 'customer-support-automation', name: 'Customer Support Automation', icon: '🎧', color: '#6f4e37',
    label: 'SUPPORT · AI AUTOMATION',
    sub: 'Faster answers, fewer dropped tickets.',
    descPre: 'Every ticket routed, every question answered, every SLA tracked — ',
    descEm: 'without anyone managing the queue manually.',
    description: 'Ticket routing, FAQ responses, satisfaction surveys, and SLA alerts — handled automatically without manual triage.',
    automationIds: ['ticket-router-ai', 'faq-responder-ai', 'csat-survey-ai', 'escalation-alert-ai', 'churn-risk-ai'],
  },
  {
    id: 'hr-recruitment-automation', name: 'HR & Recruitment Automation', icon: '👥', color: '#8a6d3a',
    label: 'HR & RECRUITMENT · AI AUTOMATION',
    sub: 'Hiring and people-ops admin, handled automatically.',
    descPre: 'From CV screening to day one onboarding — ',
    descEm: 'every hiring and people-ops step automated end to end.',
    description: 'CV screening, interview scheduling, onboarding, leave approvals, and employee feedback — automated from first application to day one.',
    automationIds: ['candidate-screener-ai', 'interview-scheduler-ai', 'onboarding-checklist-ai', 'leave-approval-ai', 'employee-feedback-ai'],
  },
  {
    id: 'it-security-automation', name: 'IT & Security Automation', icon: '🔐', color: '#4a2c2a',
    label: 'IT & SECURITY · AI AUTOMATION',
    sub: 'The checks that should never depend on someone remembering.',
    descPre: 'Access control, uptime monitoring, patch tracking, and backups — ',
    descEm: 'verified automatically, whether anyone remembers or not.',
    description: 'Ticket triage, access revocation, uptime monitoring, patch tracking, and backup verification — handled without manual oversight.',
    automationIds: ['ticket-triage-ai', 'access-revoke-ai', 'uptime-alert-ai', 'patch-reminder-ai', 'backup-verification-ai'],
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
                { to: 130, suffix: '', label: 'Hours Saved / Week' },
                { to: 20800, prefix: '£', label: 'Saved / Month' },
                { to: 249600, prefix: '£', label: 'Saved / Year' },
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
