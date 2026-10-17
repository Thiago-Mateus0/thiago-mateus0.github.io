import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const CH = 'abcdefghijklmnopqrstuvwxyz#%&*+<>/'

/** Texto que "decodifica" ao entrar na tela e de novo ao passar o mouse. */
export default function ScrambleText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [out, setOut] = useState(text)
  const raf = useRef(0)

  const run = useCallback(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    cancelAnimationFrame(raf.current)
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 700, 1)
      const solved = Math.floor(p * text.length)
      setOut(text.split('').map((c, i) => (c === ' ' || i < solved ? c : CH[Math.floor(Math.random() * CH.length)])).join(''))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }, [text])

  useEffect(() => { if (inView) run(); return () => cancelAnimationFrame(raf.current) }, [inView, run])
  useEffect(() => { setOut(text) }, [text])

  return (
    <span ref={ref} onMouseEnter={run} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  )
}
