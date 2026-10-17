import { useEffect, useRef } from 'react'

type Kind = 'dot' | 'ring' | 'word' | 'ray' | 'conf'
interface Part {
  kind: Kind; x: number; y: number; vx: number; vy: number
  life: number; max: number; color: string; r?: number; text?: string; rot?: number; vr?: number; ang?: number; len?: number
}

const WORDS = ['{ }', '</>', 'git push', 'SELECT *', 'async', 'def main():', '200 OK', 'npm run dev', 'pytest ✓', 'import torch?', 'COMMIT', '$ sudo hire tm']
const rand = (a: number, b: number) => a + Math.random() * (b - a)

/** A cada clique, um efeito diferente: explosão, ondas, palavras de código, raios ou confete. */
export default function ClickFx() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const c = ref.current!
    const ctx = c.getContext('2d')!
    const dpr = Math.min(devicePixelRatio || 1, 2)
    let parts: Part[] = [], raf = 0, bag: number[] = []

    const size = () => { c.width = innerWidth * dpr; c.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }
    const colors = () => {
      const cs = getComputedStyle(document.documentElement)
      const get = (n: string) => `rgb(${cs.getPropertyValue(n).trim().replace(/\s+/g, ',')})`
      return [get('--accent'), get('--accent2'), get('--ink')]
    }

    const effects = [
      (x: number, y: number, col: string[]) => { // explosão
        for (let i = 0; i < 34; i++) { const a = rand(0, 6.283), s = rand(2, 7); parts.push({ kind: 'dot', x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0, max: rand(40, 70), color: col[i % 3], r: rand(1.5, 3.5) }) }
      },
      (x: number, y: number, col: string[]) => { // ondas
        for (let i = 0; i < 3; i++) parts.push({ kind: 'ring', x, y, vx: 0, vy: 0, life: -i * 9, max: 55, color: col[i % 2], r: 4 })
      },
      (x: number, y: number, col: string[]) => { // palavras de código
        for (let i = 0; i < 5; i++) parts.push({ kind: 'word', x: x + rand(-50, 50), y, vx: rand(-0.6, 0.6), vy: rand(-2.2, -1), life: -i * 4, max: 90, color: col[i % 3], text: WORDS[Math.floor(Math.random() * WORDS.length)] })
      },
      (x: number, y: number, col: string[]) => { // raios
        for (let i = 0; i < 16; i++) parts.push({ kind: 'ray', x, y, vx: 0, vy: 0, life: 0, max: 36, color: col[i % 2], ang: (i / 16) * 6.283, len: rand(60, 170) })
      },
      (x: number, y: number, col: string[]) => { // confete
        for (let i = 0; i < 46; i++) parts.push({ kind: 'conf', x, y, vx: rand(-6, 6), vy: rand(-10, -2), life: 0, max: rand(70, 110), color: col[i % 3], rot: rand(0, 6), vr: rand(-0.3, 0.3), r: rand(4, 8) })
      },
    ]

    const frame = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight)
      parts = parts.filter((p) => p.life < p.max)
      for (const p of parts) {
        p.life++
        if (p.life < 0) continue
        const k = p.life / p.max, a = 1 - k
        ctx.globalAlpha = Math.max(a, 0); ctx.fillStyle = ctx.strokeStyle = p.color
        if (p.kind === 'dot') { p.x += p.vx; p.y += p.vy; p.vx *= 0.95; p.vy *= 0.95; ctx.beginPath(); ctx.arc(p.x, p.y, p.r!, 0, 6.283); ctx.fill() }
        else if (p.kind === 'ring') { ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(p.x, p.y, p.r! + k * 150, 0, 6.283); ctx.stroke() }
        else if (p.kind === 'word') { p.x += p.vx; p.y += p.vy; ctx.font = '600 15px "JetBrains Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(p.text!, p.x, p.y) }
        else if (p.kind === 'ray') { const d = Math.sin(k * Math.PI) * p.len!; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(p.x + Math.cos(p.ang!) * d * 0.3, p.y + Math.sin(p.ang!) * d * 0.3); ctx.lineTo(p.x + Math.cos(p.ang!) * d, p.y + Math.sin(p.ang!) * d); ctx.stroke() }
        else { p.x += p.vx; p.y += p.vy; p.vy += 0.28; p.vx *= 0.985; p.rot! += p.vr!; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot!); ctx.fillRect(-p.r! / 2, -p.r! / 4, p.r!, p.r! / 2); ctx.restore() }
      }
      ctx.globalAlpha = 1
      raf = parts.length ? requestAnimationFrame(frame) : 0
    }

    const click = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('a,button,input,[role=dialog]')) return
      if (!bag.length) bag = effects.map((_, i) => i).sort(() => Math.random() - 0.5)
      effects[bag.pop()!](e.clientX, e.clientY, colors())
      if (!raf) raf = requestAnimationFrame(frame)
    }

    size()
    window.addEventListener('resize', size)
    window.addEventListener('pointerdown', click)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', size); window.removeEventListener('pointerdown', click) }
  }, [])

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[60] h-full w-full" />
}
