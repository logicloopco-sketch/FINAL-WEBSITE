import { useRef } from 'react'

/**
 * Magnetic wrapper — child subtly follows the cursor within `strength` px.
 * Disabled on touch / reduced-motion. Renders a plain <span> wrapper.
 */
export default function Magnetic({ children, strength = 14, className = '' }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
    const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }
  const reset = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0,0)'
  }

  return (
    <span
      ref={ref}
      className={`magnetic ${className}`}
      style={{ display: 'inline-flex', transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)' }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </span>
  )
}
