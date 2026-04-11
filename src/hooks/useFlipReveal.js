/**
 * useFlipReveal — Animation 4
 * Observes every .flip-reveal element. When it enters the viewport,
 * adds .in-view with a staggered delay based on its index among siblings.
 * Uses IntersectionObserver — no jQuery, no GSAP.
 */
import { useEffect } from 'react'

export default function useFlipReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.flip-reveal')
    if (!els.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          // Stagger by position among siblings with same class
          const parent   = entry.target.parentElement
          const siblings = parent
            ? [...parent.querySelectorAll('.flip-reveal')]
            : [entry.target]
          const idx = siblings.indexOf(entry.target)

          setTimeout(() => {
            entry.target.classList.add('in-view')
          }, idx * 180)          // 180ms between each card

          obs.unobserve(entry.target)   // fire once only
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  })
}
