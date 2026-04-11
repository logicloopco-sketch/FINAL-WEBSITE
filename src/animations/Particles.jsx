/**
 * Particles — Animation 5
 * Pure CSS particle drift. Generates N particles via useMemo (stable across renders).
 * No JS animation loop — all motion via CSS @keyframes from animations.css.
 * Max 55 particles, hidden on mobile + prefers-reduced-motion (see CSS).
 */
import { useMemo } from 'react'

const COUNT = 55

export default function Particles() {
  const particles = useMemo(() => {
    return Array.from({ length: COUNT }, (_, i) => {
      const isGold = Math.random() > 0.45
      return {
        id:       i,
        left:     `${(Math.random() * 96 + 2).toFixed(2)}%`,
        top:      `${(Math.random() * 90 + 5).toFixed(2)}%`,
        size:     +(Math.random() * 2.8 + 0.8).toFixed(2),
        duration: `${(Math.random() * 9 + 6).toFixed(1)}s`,
        delay:    `${-(Math.random() * 12).toFixed(1)}s`,   // negative = already in flight
        bg:       isGold ? 'rgba(212,175,55,0.55)' : 'rgba(255,255,255,0.22)',
        glow:     isGold ? '0 0 5px rgba(212,175,55,0.35)' : 'none',
      }
    })
  }, [])

  return (
    <div className="particles-wrap" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle-dot"
          style={{
            left:              p.left,
            top:               p.top,
            width:             p.size,
            height:            p.size,
            background:        p.bg,
            boxShadow:         p.glow,
            animationDuration: p.duration,
            animationDelay:    p.delay,
          }}
        />
      ))}
    </div>
  )
}
