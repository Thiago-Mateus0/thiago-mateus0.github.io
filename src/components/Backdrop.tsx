import { useEffect, useRef } from 'react'

/** Aurora que flutua no fundo + brilho que segue o cursor. */
export default function Backdrop() {
  const glow = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (matchMedia('(pointer: coarse)').matches) return
    let x = innerWidth / 2, y = innerHeight / 3, raf = 0
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; glow.current?.style.setProperty('transform', `translate3d(${x - 260}px, ${y - 260}px, 0)`) })
    }
    window.addEventListener('pointermove', move)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', move) }
  }, [])
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-[10vw] top-[8vh] h-[55vw] w-[55vw] max-w-[640px] rounded-full opacity-[.16] blur-[110px]" style={{ background: 'rgb(var(--accent))', animation: 'drift 22s ease-in-out infinite' }} />
      <div className="absolute -right-[10vw] top-[40vh] h-[50vw] w-[50vw] max-w-[600px] rounded-full opacity-[.16] blur-[110px]" style={{ background: 'rgb(var(--accent2))', animation: 'drift 28s ease-in-out infinite reverse' }} />
      <div ref={glow} className="absolute left-0 top-0 hidden h-[520px] w-[520px] rounded-full md:block" style={{ background: 'radial-gradient(circle, rgb(var(--accent) / .10), transparent 62%)', willChange: 'transform' }} />
    </div>
  )
}
