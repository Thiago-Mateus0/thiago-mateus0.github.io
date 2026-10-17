import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { t, type Lang } from '../data/content'
import Magnetic from './Magnetic'
import ParticleField from './ParticleField'

const FULL = 'Thiago Mateus Soares Cerqueira Filho'
const CHIPS = [
  { t: 'GET /transacoes → 200', c: 'left-[58%] top-[18%]', d: 0, depth: 22 },
  { t: 'SELECT * FROM comandas;', c: 'left-[70%] top-[42%]', d: 1.2, depth: -30 },
  { t: 'pytest · passed ✓', c: 'left-[56%] top-[66%]', d: 2.1, depth: 40 },
  { t: 'git push origin main', c: 'left-[74%] top-[78%]', d: 0.6, depth: -18 },
]

function useTyping(text: string, run: boolean, speed = 50) {
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

export default function Hero({ lang, ready }: { lang: Lang; ready: boolean }) {
  const tx = t[lang].hero
  const typed = useTyping(FULL, ready)
  const [role, setRole] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setRole((r) => (r + 1) % tx.roles.length), 2200)
    return () => clearInterval(id)
  }, [tx.roles.length])

  // parallax: o "TM." inclina e os chips flutuam em profundidades diferentes
  const mx = useMotionValue(0), my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 90, damping: 18 }), sy = useSpring(my, { stiffness: 90, damping: 18 })
  const rotY = useTransform(sx, [-1, 1], [-14, 14]), rotX = useTransform(sy, [-1, 1], [10, -10])
  useEffect(() => {
    const move = (e: PointerEvent) => { mx.set((e.clientX / innerWidth) * 2 - 1); my.set((e.clientY / innerHeight) * 2 - 1) }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [mx, my])

  const show = { opacity: ready ? 1 : 0, y: ready ? 0 : 20 }
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <ParticleField />
      {CHIPS.map((c) => <Chip key={c.t} {...c} sx={sx} sy={sy} ready={ready} />)}
      <div className="section pointer-events-none relative !py-32">
        <motion.p animate={show} transition={{ delay: 0.1 }} className="eyebrow">
          <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-accent align-middle" />
          {tx.status}
        </motion.p>
        <motion.h1
          animate={show} transition={{ duration: 0.8 }}
          style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 800 }}
          className="text-gradient w-fit text-[5.5rem] font-bold leading-none tracking-tight sm:text-[10rem]"
        >
          TM<span className="text-accent" style={{ WebkitTextFillColor: 'rgb(var(--accent))' }}>.</span>
        </motion.h1>
        <p className="mt-4 min-h-[1.75rem] font-mono text-sm text-mute sm:text-base" aria-label={FULL}>
          <span className="text-accent">&gt; </span><span className="caret">{typed}</span>
        </p>
        <motion.div animate={show} transition={{ delay: 0.4 }} className="mt-8 flex items-center gap-3 text-2xl font-medium sm:text-3xl">
          <span>{lang === 'pt' ? 'Desenvolvedor' : 'Developer'}</span>
          <span className="relative inline-block h-[1.3em] min-w-[7ch] overflow-hidden text-accent">
            <AnimatePresence mode="wait">
              <motion.span key={tx.roles[role]} initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-100%', opacity: 0 }} transition={{ duration: 0.35 }} className="absolute left-0 top-0 whitespace-nowrap">
                {tx.roles[role]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>
        <motion.p animate={show} transition={{ delay: 0.6 }} className="mt-4 max-w-xl text-mute">{tx.lead}</motion.p>
        <motion.div animate={show} transition={{ delay: 0.8 }} className="pointer-events-auto mt-10 flex flex-wrap gap-3">
          <Magnetic href="#projects" primary>{tx.cta1}</Magnetic>
          <Magnetic href="#contact">{tx.cta2}</Magnetic>
        </motion.div>
        <p className="mt-10 hidden font-mono text-xs text-mute md:block">{tx.cmd}</p>
      </div>
      <div aria-hidden className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <div className="flex h-9 w-5 justify-center rounded-full border border-mute/50 pt-1.5"><span className="h-2 w-1 animate-bounce rounded-full bg-accent" /></div>
      </div>
    </section>
  )
}

function Chip({ t: text, c, d, depth, sx, sy, ready }: { t: string; c: string; d: number; depth: number; sx: ReturnType<typeof useSpring>; sy: ReturnType<typeof useSpring>; ready: boolean }) {
  const x = useTransform(sx, [-1, 1], [-depth, depth]), y = useTransform(sy, [-1, 1], [-depth, depth])
  return (
    <motion.div style={{ x, y }} animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: 1 + d * 0.3 }} className={`pointer-events-none absolute hidden lg:block ${c}`}>
      <div className="rounded-lg border border-line bg-surface/70 px-3 py-2 font-mono text-xs text-mute shadow-lg backdrop-blur" style={{ animation: `floaty ${5 + d}s ease-in-out ${d}s infinite` }}>
        <span className="text-accent">●</span> {text}
      </div>
    </motion.div>
  )
}
