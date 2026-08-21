/* Shared content for pricing, services, FAQs, and case studies. */

export const PLANS = [
  {
    plan: 'Starter',
    price: '£800',
    featured: false,
    tagline: 'For a first automation you can rely on.',
    items: ['1 live workflow', 'Hosting included', 'Monthly optimisation', '48h email support'],
  },
  {
    plan: 'Growth',
    price: '£1,500',
    featured: true,
    tagline: 'For teams automating across the business.',
    items: ['5 live workflows', 'Hosting included', 'Monthly optimisation + strategy call', '24h priority support'],
  },
  {
    plan: 'Scale',
    price: '£2,500',
    featured: false,
    tagline: 'For automation-first operations at scale.',
    items: ['Unlimited workflows', 'Hosting included', 'Weekly optimisation + dedicated PM', '4h priority support'],
  },
]

export const INCLUDED = [
  'Custom workflow build',
  'Managed hosting on our servers',
  '24/7 monitoring & alerts',
  'Automatic error handling & retries',
  'Monthly optimisation',
  'Priority issue fixes',
  'Backups & version history',
  'Security patches & updates',
  'Direct WhatsApp & email support',
  'No setup or hidden fees',
]

export const FAQS = [
  { q: "What's included in the monthly price?", a: 'Everything: the workflow build, managed hosting on our servers, 24/7 monitoring, monthly optimisation, and priority fixes. One price — no setup fees and no surprise invoices.' },
  { q: 'Do you charge setup fees?', a: 'No. Your monthly plan covers the build and everything after it. You only start paying once we begin work, and there are no separate onboarding charges.' },
  { q: 'Can I cancel anytime?', a: 'Yes. Plans are month-to-month. If you cancel, we help you export your workflows so nothing is lost — no lock-in.' },
  { q: 'What if I need more workflows?', a: 'You can add workflows to any plan, or move up a tier. If you outgrow Scale, we build a custom arrangement around your volume.' },
  { q: 'Do you offer custom AI development?', a: 'Yes. Beyond no-code automations we build custom AI agents and integrations using OpenAI, Anthropic, and your own data. We scope these on the discovery call.' },
  { q: 'Where do you host the automations?', a: 'On our own managed servers (n8n, Make.com, and custom runtimes). You never touch a server, deal with uptime, or manage infrastructure — that is the whole point of managed hosting.' },
  { q: 'What tools do you work with?', a: 'Make.com, n8n, and Zapier for automation; Airtable, Pipedrive, HubSpot, Google Workspace, Slack, WhatsApp, and OpenAI among others. If your stack is not listed, we almost certainly still integrate with it.' },
  { q: 'Do you offer refunds?', a: "If we can't deliver what we agreed in the discovery call, you don't pay for that build. For ongoing months, cancel anytime — you're never tied in." },
]

export const SERVICES = [
  {
    id: 'lead',
    tag: 'Lead Automation',
    title: 'Capture and follow up with every lead — automatically',
    body: 'Every enquiry from your website, ads, inbox, or WhatsApp is captured, qualified, and followed up without anyone lifting a finger. Leads land in your CRM tagged and scored, and the right follow-up goes out on time, every time.',
    uses: ['Website & ad form capture', 'AI lead scoring & tagging', 'Instant WhatsApp / email replies', 'Automated follow-up sequences'],
    tools: ['Make.com', 'Pipedrive', 'HubSpot', 'WhatsApp'],
    img: '/automations/ai-lead-nurture-ai.png',
    imgAlt: 'Real lead nurture automation built by Logic Loops AI',
  },
  {
    id: 'ops',
    tag: 'Operations Automation',
    title: 'Remove the repetitive admin behind your operations',
    body: "The copy-paste work between your tools disappears. We connect the apps your team already uses so data flows automatically — no more manual re-entry between spreadsheets, CRMs, invoicing, and finance systems.",
    uses: ['Data sync across tools', 'Invoice & finance automation', 'Reporting & dashboards', 'Internal approval flows'],
    tools: ['n8n', 'Airtable', 'Google Workspace', 'Xero'],
    img: '/automations/airtable-hubspot-sync-ai.png',
    imgAlt: 'Real Airtable-to-HubSpot data sync automation built by Logic Loops AI',
  },
  {
    id: 'agents',
    tag: 'AI Agents',
    title: 'AI workers that handle conversations and tasks 24/7',
    body: 'Give your business AI assistants trained on your own data. They answer customers, book appointments, qualify leads, and handle repetitive tasks around the clock — escalating to a human only when it matters.',
    uses: ['Support & FAQ chatbots', 'Booking & scheduling agents', 'Meeting notes & summaries', 'Research & drafting agents'],
    tools: ['OpenAI', 'Anthropic', 'Slack', 'n8n'],
    img: '/automations/email-responder-ai.png',
    imgAlt: 'Real AI email responder agent built by Logic Loops AI',
  },
  {
    id: 'crm',
    tag: 'CRM Integration',
    title: 'Your CRM, finally working the way it should',
    body: 'We wire your CRM into everything else so it stays accurate on its own — deals move stages automatically, contacts stay updated, and your pipeline reflects reality without manual upkeep.',
    uses: ['Automated deal & stage updates', 'Contact enrichment', 'Pipeline reporting', 'Two-way tool sync'],
    tools: ['Pipedrive', 'HubSpot', 'GoHighLevel', 'Salesforce'],
    img: '/automations/deal-distributor-ai.png',
    imgAlt: 'Real CRM deal distribution automation built by Logic Loops AI',
  },
]

export const TOOLS = [
  { name: 'Make.com', slug: 'make' },
  { name: 'n8n', slug: 'n8n' },
  { name: 'Zapier', slug: 'zapier' },
  { name: 'Airtable', slug: 'airtable' },
  { name: 'Pipedrive', slug: 'pipedrive' },
  { name: 'HubSpot', slug: 'hubspot' },
  { name: 'Google Workspace', slug: 'google' },
  { name: 'Slack', slug: 'slack' },
  { name: 'WhatsApp', slug: 'whatsapp' },
  { name: 'OpenAI', slug: 'openai' },
]

export const CASES = [
  {
    industry: 'E-commerce',
    title: 'Order fulfilment automation',
    challenge: 'A growing D2C brand was manually processing orders across Shopify, their 3PL, and email — hours of copy-paste every day and frequent mistakes.',
    solution: 'We built and now host an automation that syncs every order, triggers fulfilment, updates inventory, and notifies customers — with error handling and 24/7 monitoring.',
    results: [{ n: '18h', l: 'Saved per week' }, { n: '94%', l: 'Fewer errors' }],
    img: '/automations/order-fulfil-ai.png',
  },
  {
    industry: 'SaaS',
    title: 'Lead qualification AI agent',
    challenge: 'A SaaS startup was drowning in inbound demo requests and responding too slowly to close them.',
    solution: 'An AI agent now qualifies every inbound lead, scores it, books demos automatically, and routes hot leads to sales instantly — hosted and managed by us.',
    results: [{ n: '3×', l: 'Qualified leads' }, { n: '60%', l: 'Faster response' }],
    img: '/automations/lead-router-gpt-ai.png',
  },
  {
    industry: 'Property',
    title: 'Contract & CRM automation',
    challenge: 'A property firm handled contracts, client data, and follow-ups by hand across disconnected tools.',
    solution: 'We automated contract generation, CRM updates, and client follow-ups into one monitored workflow that runs on our servers.',
    results: [{ n: '22h', l: 'Saved per week' }, { n: '£2,400', l: 'Saved per month' }],
    img: '/automations/contract-generator-ai.png',
  },
]
