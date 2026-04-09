import { useEffect } from 'react'

/**
 * Attaches mouse-tracking 3D perspective tilt to every element
 * that has the class `tilt3d` at mount time.
 */
export default function useTilt3D(intensity = 12) {
  useEffect(() => {
    const els = document.querySelectorAll('.tilt3d')
    const cleanup = []

    els.forEach(el => {
      el.style.transition = 'transform 0.28s cubic-bezier(0.16,1,0.3,1)'
      el.style.transformStyle = 'preserve-3d'
      el.style.willChange = 'transform'

      const onMove = (e) => {
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width  - 0.5
        const y = (e.clientY - r.top)  / r.height - 0.5
        el.style.transform = `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.03,1.03,1.03)`
        el.style.zIndex = '2'
      }
      const onLeave = () => {
        el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
        el.style.zIndex = ''
      }

      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      cleanup.push(() => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => cleanup.forEach(fn => fn())
  }, [intensity])
}
