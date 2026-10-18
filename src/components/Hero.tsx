import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { t, type Lang } from '../data/content'
import HeroTerminal from './HeroTerminal'
import Magnetic from './Magnetic'
import ParticleField from './ParticleField'

const FULL = 'Thiago Mateus Soares Cerqueira Filho'

function useTyping(text: string, run: boolean, speed = 45) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(text.length); return }
    setN(0)
    const id = setInterval(() => setN((v) => (v >= text.length ? (clearInterval(id), v) : v + 1)), speed)
    return () => clearInterval(id)
  }, [text, run, speed])
  return text.slice(0, n)
}

export default function Hero({ lang, ready, onTheme }: { lang: Lang; ready: boolean; onTheme: () => void }) {
  const tx = t[lang].hero
  const typed = useTyping(FULL, ready)
  const [role, setRole] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setRole((r) => (r + 1) % tx.roles.length), 2200)
    return () => clearInterval(id)
  }, [tx.roles.length])

  // o "TM." inclina com o mouse; o terminal flutua no sentido oposto
  const mx = useMotionValue(0), my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 90, damping: 18 }), sy = useSpring(my, { stiffness: 90, damping: 18 })
  const rotY = useTransform(sx, [-1, 1], [-14, 14]), rotX = useTransform(sy, [-1, 1], [10, -10])
  const tX = useTransform(sx, [-1, 1], [10, -10]), tY = useTransform(sy, [-1, 1], [8, -8])
  useEffect(() => {
    const move = (e: PointerEvent) => { mx.set((e.clientX / innerWidth) * 2 - 1); my.set((e.clientY / innerHeight) * 2 - 1) }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [mx, my])

  const show = { opacity: ready ? 1 : 0, y: ready ? 0 : 20 }
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <ParticleField />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-20 pt-28 sm:px-6 lg:grid-cols-[1.15fr_1fr]">
        <div className="pointer-events-none">
          <motion.p animate={show} transition={{ delay: 0.1 }} className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-accent" /></span>
            {tx.status}
          </motion.p>
          <motion.h1
            animate={show} transition={{ duration: 0.8 }}
            style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 800 }}
            className="font-display w-fit text-[6rem] font-bold leading-[0.9] tracking-tighter sm:text-[10rem]"
          >
            <span className="bg-gradient-to-br from-ink via-ink to-accent bg-clip-text text-transparent">TM</span><span className="text-accent">.</span>
          </motion.h1>
          <p className="mt-4 min-h-[1.75rem] font-mono text-sm text-mute sm:text-base" aria-label={FULL}>
            <span className="text-accent">&gt; </span><span className="caret">{typed}</span>
          </p>
          <motion.div animate={show} transition={{ delay: 0.4 }} className="font-display mt-7 flex flex-wrap items-center gap-x-3 text-2xl font-medium sm:text-4xl">
            <span>{lang === 'pt' ? 'Desenvolvedor' : 'Developer'}</span>
            <span className="relative inline-block h-[1.2em] min-w-[8ch] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={tx.roles[role]}
                  initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }} animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }} exit={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-0 whitespace-nowrap"
                >
                  <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">{tx.roles[role]}</span>
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>
          <motion.p animate={show} transition={{ delay: 0.6 }} className="mt-5 max-w-lg text-mute">{tx.lead}</motion.p>
          <motion.div animate={show} transition={{ delay: 0.8 }} className="pointer-events-auto mt-9 flex flex-wrap gap-3">
            <Magnetic href="#projects" primary>{tx.cta1} →</Magnetic>
            <Magnetic href="#contact">{tx.cta2}</Magnetic>
          </motion.div>
          <p className="mt-8 hidden font-mono text-xs text-mute md:block">{tx.cmd}</p>
        </div>
        <motion.div animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 0.96 }} transition={{ delay: 1, duration: 0.8 }}>
          <motion.div style={{ x: tX, y: tY }}>
            <HeroTerminal lang={lang} onTheme={onTheme} />
          </motion.div>
        </motion.div>
      </div>
      <div aria-hidden className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <div className="flex h-9 w-5 justify-center rounded-full border border-mute/50 pt-1.5"><span className="h-2 w-1 animate-bounce rounded-full bg-accent" /></div>
      </div>
    </section>
  )
}
