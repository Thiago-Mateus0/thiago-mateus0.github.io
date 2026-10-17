import { useEffect, useRef } from 'react'

interface P { x: number; y: number; vx: number; vy: number }

/** Rede de partículas que foge do mouse e se liga a ele. Clique no herói dá um empurrão. */
export default function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current!
    const ctx = c.getContext('2d')!
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(devicePixelRatio || 1, 2)
    let w = 0, h = 0, raf = 0, visible = true, frame = 0, rgb = '94,234,212'
    let pts: P[] = []
    const mouse = { x: -9999, y: -9999 }

    const readColor = () => {
      rgb = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim().replace(/\s+/g, ',') || rgb
    }
    const resize = () => {
      const r = c.parentElement!.getBoundingClientRect()
      w = r.width; h = r.height
      c.width = w * dpr; c.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.min(Math.floor((w * h) / 11000), 100)
      pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4 }))
    }
    const move = (e: PointerEvent) => {
      const r = c.getBoundingClientRect()
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top
    }
    const leave = () => { mouse.x = mouse.y = -9999 }
    const push = (e: PointerEvent) => {
      const r = c.getBoundingClientRect()
      const x = e.clientX - r.left, y = e.clientY - r.top
      if (x < 0 || y < 0 || x > w || y > h) return
      for (const p of pts) {
        const dx = p.x - x, dy = p.y - y, d = Math.hypot(dx, dy) || 1
        if (d < 260) { p.vx += (dx / d) * (260 - d) * 0.03; p.vy += (dy / d) * (260 - d) * 0.03 }
      }
    }

    const draw = () => {
      raf = requestAnimationFrame(draw)
      if (!visible) return
      if (frame++ % 120 === 0) readColor()
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy)
        if (d < 130) { p.vx += (dx / d) * 0.12; p.vy += (dy / d) * 0.12 }
        p.vx *= 0.985; p.vy *= 0.985
        const sp = Math.hypot(p.vx, p.vy)
        if (sp < 0.15) { p.vx *= 1.02; p.vy *= 1.02 }
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i]
        ctx.fillStyle = `rgba(${rgb},.8)`
        ctx.beginPath(); ctx.arc(a.x, a.y, 1.6, 0, 6.283); ctx.fill()
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 115) { ctx.strokeStyle = `rgba(${rgb},${0.22 * (1 - d / 115)})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke() }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (dm < 170) { ctx.strokeStyle = `rgba(${rgb},${0.55 * (1 - dm / 170)})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke() }
      }
    }

    readColor(); resize()
    const ro = new ResizeObserver(resize); ro.observe(c.parentElement!)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }); io.observe(c)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerdown', push)
    document.addEventListener('pointerleave', leave)
    if (reduce) draw() // um quadro estático
    else raf = requestAnimationFrame(draw)
    if (reduce) cancelAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect()
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerdown', push)
      document.removeEventListener('pointerleave', leave)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />
}
