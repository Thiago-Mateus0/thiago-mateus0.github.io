import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/** Cursor próprio: ponto preciso + anel com mola, que cresce e mostra um rótulo sobre o que é clicável. */
export default function Cursor() {
  const [on, setOn] = useState(false)
  const [hover, setHover] = useState<string | null>(null)
  const [down, setDown] = useState(false)
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 380, damping: 30, mass: 0.6 }), ry = useSpring(y, { stiffness: 380, damping: 30, mass: 0.6 })

  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setOn(true)
    document.documentElement.classList.add('has-cursor')
    const pick = (target: Element | null) => {
      const el = target?.closest<HTMLElement>('[data-cursor],a,button')
      setHover(el ? el.dataset.cursor ?? '' : null)
    }
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); pick(e.target as Element) }
    // ao rolar sem mexer o mouse, o que está embaixo do cursor muda
    const scroll = () => pick(document.elementFromPoint(x.get(), y.get()))
    const d = () => setDown(true), u = () => setDown(false)
    window.addEventListener('pointermove', move)
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('pointerdown', d); window.addEventListener('pointerup', u)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move); window.removeEventListener('scroll', scroll); window.removeEventListener('pointerdown', d); window.removeEventListener('pointerup', u)
    }
  }, [x, y])

  if (!on) return null
  const big = hover !== null
  const label = hover || ''
  return (
    <>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full bg-accent" style={{ x, y, translateX: '-50%', translateY: '-50%' }} />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full border border-accent/70 font-mono text-[10px] font-medium uppercase tracking-wider text-bg"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: label ? 64 : big ? 44 : 30, height: label ? 64 : big ? 44 : 30,
          backgroundColor: label ? 'rgb(var(--accent))' : big ? 'rgb(var(--accent) / .12)' : 'rgba(0,0,0,0)',
          scale: down ? 0.82 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        {label}
      </motion.div>
    </>
  )
}
