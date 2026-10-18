import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'

/** Botão de voltar ao topo com anel que mostra quanto da página já foi lida. */
export default function BackToTop({ label }: { label: string }) {
  const { scrollYProgress } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setShow(v > 0.15))
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
          whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label={label} title={label}
          className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-line bg-bg/70 text-accent backdrop-blur"
        >
          <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden>
            <motion.circle cx="24" cy="24" r="22" fill="none" stroke="rgb(var(--accent))" strokeWidth="2" style={{ pathLength: scrollYProgress }} />
          </svg>
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  )
}
