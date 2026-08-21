/**
 * HeroCanvas — the flagship hero background.
 * A living "automation graph": cream nodes drift over deep navy, connected by
 * faint edges, with bright data-pulses travelling along a subset of edges to
 * evoke workflows running 24/7. DPR-aware, mouse-parallax, reduced-motion safe.
 * Pure Canvas 2D — zero dependencies.
 */
import { useEffect, useRef } from 'react'

const CREAM = [243, 228, 201]
const WHITE = [255, 255, 255]

function rgba([r, g, b], a) {
  return `rgba(${r},${g},${b},${a.toFixed(3)})`
}

export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2)
    let animId = null
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }

    const resize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const COUNT = isMobile ? 26 : 54
    const CONNECT = isMobile ? 130 : 175

    const nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      z: Math.random(),
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.7 + 0.9,
      pulse: Math.random() * Math.PI * 2,
    }))

    /* Pre-pick a set of "active" edges that carry travelling pulses */
    const pulses = Array.from({ length: isMobile ? 6 : 12 }, () => ({
      a: (Math.random() * COUNT) | 0,
      b: (Math.random() * COUNT) | 0,
      t: Math.random(),
      speed: 0.0016 + Math.random() * 0.0022,
    }))

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouse.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    if (!isMobile) window.addEventListener('mousemove', onMove)

    let t = 0
    const draw = () => {
      t += 0.016
      ctx.clearRect(0, 0, W, H)

      /* ease parallax */
      mouse.x += (mouse.tx - mouse.x) * 0.04
      mouse.y += (mouse.ty - mouse.y) * 0.04

      /* move nodes */
      nodes.forEach((n) => {
        n.x += n.vx
        n.y += n.vy
        if (n.x < -20) n.x = W + 20
        if (n.x > W + 20) n.x = -20
        if (n.y < -20) n.y = H + 20
        if (n.y > H + 20) n.y = -20
      })

      /* parallax offset per node by depth */
      const px = (n) => n.x + mouse.x * (6 + n.z * 22)
      const py = (n) => n.y + mouse.y * (6 + n.z * 22)

      /* edges */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const ni = nodes[i], nj = nodes[j]
          const dx = px(ni) - px(nj)
          const dy = py(ni) - py(nj)
          const dist = Math.hypot(dx, dy)
          if (dist >= CONNECT) continue
          const proximity = 1 - dist / CONNECT
          const depth = (ni.z + nj.z) / 2
          ctx.beginPath()
          ctx.strokeStyle = rgba(CREAM, proximity * 0.16 * (0.5 + depth))
          ctx.lineWidth = 0.7
          ctx.moveTo(px(ni), py(ni))
          ctx.lineTo(px(nj), py(nj))
          ctx.stroke()
        }
      }

      /* travelling data pulses along active edges */
      if (!reduced) {
        pulses.forEach((p) => {
          const a = nodes[p.a], b = nodes[p.b]
          if (!a || !b || a === b) return
          const ax = px(a), ay = py(a), bx = px(b), by = py(b)
          const d = Math.hypot(ax - bx, ay - by)
          p.t += p.speed
          if (p.t > 1 || d > CONNECT * 1.7) {
            p.t = 0
            p.a = (Math.random() * COUNT) | 0
            p.b = (Math.random() * COUNT) | 0
            return
          }
          if (d > CONNECT * 1.7) return
          const cx = ax + (bx - ax) * p.t
          const cy = ay + (by - ay) * p.t
          /* faint trail line */
          ctx.beginPath()
          ctx.strokeStyle = rgba(CREAM, 0.10)
          ctx.lineWidth = 0.8
          ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke()
          /* the pulse */
          const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 9)
          glow.addColorStop(0, rgba(WHITE, 0.9))
          glow.addColorStop(0.4, rgba(CREAM, 0.5))
          glow.addColorStop(1, rgba(CREAM, 0))
          ctx.beginPath()
          ctx.fillStyle = glow
          ctx.arc(cx, cy, 9, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.fillStyle = rgba(WHITE, 0.95)
          ctx.arc(cx, cy, 1.7, 0, Math.PI * 2)
          ctx.fill()
        })
      }

      /* nodes */
      nodes.forEach((n) => {
        const x = px(n), y = py(n)
        const twinkle = reduced ? 1 : 0.72 + Math.sin(t * 1.3 + n.pulse) * 0.28
        const rr = n.r * (0.5 + n.z * 1.0)
        const alpha = (0.22 + n.z * 0.7) * twinkle
        const color = n.z > 0.62 ? WHITE : CREAM
        const glow = ctx.createRadialGradient(x, y, 0, x, y, rr * 6)
        glow.addColorStop(0, rgba(CREAM, alpha * 0.32))
        glow.addColorStop(1, rgba(CREAM, 0))
        ctx.beginPath()
        ctx.fillStyle = glow
        ctx.arc(x, y, rr * 6, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.fillStyle = rgba(color, alpha)
        ctx.arc(x, y, rr, 0, Math.PI * 2)
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    if (reduced && animId) { /* one frame is enough */ }

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
}
