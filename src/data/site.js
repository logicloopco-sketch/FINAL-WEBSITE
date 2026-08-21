/* Central site config — swap the placeholders when real details are ready. */
export const SITE = {
  name: 'Logic Loops AI',
  email: 'admin@logicloopsai.com',
  // WhatsApp in international format, no '+'. 91 = India country code.
  whatsapp: '919669996748',
  phoneDisplay: '+91 96699 96748',
  whatsappMsg: "Hi, I'd like to know more about your AI automation services.",
  // Calendly booking link.
  bookingUrl: 'https://calendly.com/logicloop-co/30min',
  // PLACEHOLDER Formspree endpoint — replace xxxxxxxx with your real form ID.
  formEndpoint: 'https://formspree.io/f/xxxxxxxx',
  regions: ['UK', 'US', 'AU', 'CA'],
}

export const waLink = () =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMsg)}`
