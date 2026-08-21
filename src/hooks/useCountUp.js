import { useEffect, useRef, useState } from 'react'

/**
 * Animate a number from 0 → target once the element scrolls into view.
 * Returns [ref, value]. Respects prefers-reduced-motion (snaps to target).
 */
export default function useCountUp(target, { duration = 1600, decimals = 0 } = {}) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setVal(target); return }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting || done.current) return
        done.current = true
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
          setVal(target * eased)
          if (p < 1) requestAnimationFrame(tick)
          else setVal(target)
        }
        requestAnimationFrame(tick)
      })
    }, { threshold: 0.4 })

    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString()
  return [ref, display]
}
