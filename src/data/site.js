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
  // Make.com webhook that receives contact-form submissions.
  webhookUrl: 'https://hook.eu2.make.com/u29nnwprpsk7c3zujr4aih8pbj32ntuj',
  regions: ['UK', 'US', 'AU', 'CA'],
}

export const waLink = () =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMsg)}`
