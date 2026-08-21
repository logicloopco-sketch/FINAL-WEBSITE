import { useState } from 'react'
import { Plus } from 'lucide-react'

/**
 * Accessible FAQ accordion. `items` = [{ q, a }].
 * Emits FAQPage JSON-LD via the caller (see Pricing page).
 */
export default function FAQAccordion({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="faq-list">
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={it.q} className={`faq-item ${isOpen ? 'open' : ''}`}>
            <button
              className="faq-q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{it.q}</span>
              <Plus className="faq-icon" />
            </button>
            <div className="faq-a" style={{ maxHeight: isOpen ? '400px' : '0' }}>
              <p>{it.a}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
