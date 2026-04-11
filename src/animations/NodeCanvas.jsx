/**
 * NodeCanvas — Animation 1
 * Floating connected nodes on a canvas, simulating 3D depth via z-scaling.
 * Gold/white color palette. Runs at 60fps via requestAnimationFrame.
 * Zero dependencies — pure Canvas 2D API.
 */
import { useEffect, useRef } from 'react'

const GOLD  = [212, 175, 55]   // #D4AF37
const WHITE = [255, 255, 255]

function rgba([r, g, b], a) {
  return `rgba(${r},${g},${b},${a.toFixed(3)})`
}

export default function NodeCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId = null

    /* ── Resize to fill parent ─────────────────────────── */
    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    /* ── Node count: fewer on mobile for perf ─────────── */
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const COUNT = isMobile ? 22 : 48
    const CONNECT_DIST = isMobile ? 120 : 160

    /* ── Spawn nodes ──────────────────────────────────── */
    const nodes = Array.from({ length: COUNT }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      z:  Math.random(),                    // 0 = far, 1 = near
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r:  Math.random() * 1.8 + 0.8,       // base radius
    }))

    /* ── Main render loop ─────────────────────────────── */
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      /* Update positions */
      nodes.forEach(n => {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1
        if (n.y < 0 || n.y > canvas.height)  n.vy *= -1
      })

      /* Draw connecting lines */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x
          const dy   = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist >= CONNECT_DIST) continue

          // Line alpha: stronger when close + front nodes
          const proximity  = 1 - dist / CONNECT_DIST
          const depthFactor = (nodes[i].z + nodes[j].z) / 2
          const alpha       = proximity * 0.35 * depthFactor

          ctx.beginPath()
          ctx.strokeStyle = rgba(GOLD, alpha)
          ctx.lineWidth   = 0.6
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.stroke()
        }
      }

      /* Draw nodes */
      nodes.forEach(n => {
        const apparentR = n.r * (0.4 + n.z * 0.9) // depth scaling
        const alpha     = 0.25 + n.z * 0.75
        const color     = n.z > 0.55 ? WHITE : GOLD

        // Glow halo
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, apparentR * 5)
        glow.addColorStop(0, rgba(GOLD, alpha * 0.45))
        glow.addColorStop(1, rgba(GOLD, 0))
        ctx.beginPath()
        ctx.arc(n.x, n.y, apparentR * 5, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(n.x, n.y, apparentR, 0, Math.PI * 2)
        ctx.fillStyle = rgba(color, alpha)
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="node-canvas"
      aria-hidden="true"
    />
  )
}
