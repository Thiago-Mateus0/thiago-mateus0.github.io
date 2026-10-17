import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { t, type Lang } from '../data/content'
import type { IntroVariant } from '../hooks/intro'

interface Props { variant: IntroVariant; lang: Lang; onDone: () => void }

const GLYPHS = '01<>/{}[]#$%&*+=?'
const NAME = 'THIAGO MATEUS'

function Terminal({ lines, finish }: { lines: string[]; finish: () => void }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const id = setTimeout(n >= lines.length ? finish : () => setN(n + 1), n >= lines.length ? 600 : n === 0 ? 250 : 380)
    return () => clearTimeout(id)
  }, [n, lines.length, finish])
  return (
    <div className="w-full max-w-lg px-6 font-mono text-sm sm:text-base">
      <div className="mb-4 flex gap-1.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" /><span className="h-3 w-3 rounded-full bg-[#febc2e]" /><span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>
      {lines.slice(0, n).map((l, i) => (
        <p key={i} className={i === n - 1 && n === lines.length ? 'text-accent' : 'text-white/80'}>{l}</p>
      ))}
      <span className="inline-block h-4 w-2 animate-pulse bg-accent align-middle" />
    </div>
  )
}

function Scramble({ role, finish }: { role: string; finish: () => void }) {
  const [txt, setTxt] = useState(NAME.replace(/\S/g, '·'))
  useEffect(() => {
    const t0 = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 1500, 1)
      const solved = Math.floor(p * NAME.length)
      setTxt(NAME.split('').map((c, i) => (c === ' ' ? ' ' : i < solved ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join(''))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(finish, 750)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [finish])
  return (
    <div className="px-6 text-center">
      <p className="font-mono text-3xl font-bold tracking-[0.2em] text-white sm:text-6xl" aria-label={NAME}>{txt}</p>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-4 font-mono text-sm text-accent">{role}</motion.p>
    </div>
  )
}

function Curtain({ finish }: { finish: () => void }) {
  const [pct, setPct] = useState(0)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const id = setInterval(() => setPct((v) => Math.min(v + 3, 100)), 40)
    return () => clearInterval(id)
  }, [])
  useEffect(() => {
    if (pct < 100) return
    const a = setTimeout(() => setOpen(true), 250)
    const b = setTimeout(finish, 1250)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [pct, finish])
  const half = 'absolute left-0 right-0 h-1/2 bg-[#050607]'
  return (
    <>
      <motion.div className={half + ' top-0'} animate={{ y: open ? '-100%' : 0 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} />
      <motion.div className={half + ' bottom-0'} animate={{ y: open ? '100%' : 0 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} />
      <motion.div className="relative text-center" animate={{ opacity: open ? 0 : 1, scale: open ? 1.4 : 1 }} transition={{ duration: 0.5 }}>
        <p className="text-8xl font-bold tracking-tight text-white sm:text-9xl">TM<span className="text-accent">.</span></p>
        <p className="mt-4 font-mono text-sm text-white/60">{pct}%</p>
        <div className="mx-auto mt-3 h-px w-48 bg-white/15"><div className="h-px bg-accent" style={{ width: `${pct}%` }} /></div>
      </motion.div>
    </>
  )
}

function Matrix({ finish }: { finish: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [fade, setFade] = useState(false)
  useEffect(() => {
    const c = ref.current!
    const ctx = c.getContext('2d')!
    c.width = innerWidth; c.height = innerHeight
    const size = 16
    const drops = Array.from({ length: Math.ceil(c.width / size) }, () => Math.random() * -40)
    const id = setInterval(() => {
      ctx.fillStyle = 'rgba(5,6,7,0.14)'
      ctx.fillRect(0, 0, c.width, c.height)
      ctx.fillStyle = '#5eead4'
      ctx.font = `${size}px monospace`
      drops.forEach((y, i) => {
        ctx.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], i * size, y * size)
        drops[i] = y * size > c.height && Math.random() > 0.96 ? 0 : y + 1
      })
    }, 45)
    const a = setTimeout(() => setFade(true), 1500)
    const b = setTimeout(finish, 2700)
    return () => { clearInterval(id); clearTimeout(a); clearTimeout(b) }
  }, [finish])
  return (
    <>
      <motion.canvas ref={ref} className="absolute inset-0" animate={{ opacity: fade ? 0.12 : 1 }} transition={{ duration: 0.8 }} />
      <motion.p initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: fade ? 1 : 0, scale: fade ? 1 : 0.7 }} transition={{ duration: 0.7 }} className="relative text-8xl font-bold text-white sm:text-9xl">
        TM<span className="text-accent">.</span>
      </motion.p>
    </>
  )
}

export default function Intro({ variant, lang, onDone }: Props) {
  const tx = t[lang].intro
  const done = useRef(false)
  const finish = useRef(() => {
    if (done.current) return
    done.current = true
    onDone()
  }).current

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape' || e.key === 'Enter') finish() }
    window.addEventListener('keydown', key)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', key) }
  }, [finish])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center overflow-hidden bg-[#050607]"
      style={{ background: variant === 'curtain' ? 'transparent' : undefined }}
      exit={{ opacity: 0, filter: 'blur(12px)' }}
      transition={{ duration: 0.55 }}
      onClick={finish}
      role="dialog" aria-label="abertura"
    >
      {variant === 'terminal' && <Terminal lines={tx.lines} finish={finish} />}
      {variant === 'scramble' && <Scramble role={tx.role} finish={finish} />}
      {variant === 'curtain' && <Curtain finish={finish} />}
      {variant === 'matrix' && <Matrix finish={finish} />}
      <p className="absolute bottom-6 font-mono text-xs text-white/40">{tx.skip}</p>
    </motion.div>
  )
}
