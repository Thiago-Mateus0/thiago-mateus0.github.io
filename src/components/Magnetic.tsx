import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { ReactNode } from 'react'

/** Botão que "puxa" levemente em direção ao mouse. */
export default function Magnetic({ children, href, primary }: { children: ReactNode; href: string; primary?: boolean }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18 })
  const sy = useSpring(y, { stiffness: 220, damping: 18 })
  return (
    <motion.a
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25)
        y.set((e.clientY - (r.top + r.height / 2)) * 0.25)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className={
        'inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ' +
        (primary ? 'bg-accent text-bg hover:opacity-90' : 'border border-line text-ink hover:border-accent')
      }
    >
      {children}
    </motion.a>
  )
}
