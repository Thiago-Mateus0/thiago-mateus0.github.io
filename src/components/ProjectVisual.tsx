import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { t, type Lang, type Project } from '../data/content'

/** Lifetrailer: a comanda passando pelos estados, um de cada vez. */
function Fsm({ lang }: { lang: Lang }) {
  const steps = t[lang].projects.fsm
  const [i, setI] = useState(0)
  useEffect(() => { const id = setInterval(() => setI((v) => (v + 1) % steps.length), 1100); return () => clearInterval(id) }, [steps.length])
  return (
    <div className="flex items-center gap-1.5 font-mono text-[11px] sm:gap-2">
      {steps.map((s, k) => (
        <div key={s} className="flex items-center gap-1.5 sm:gap-2">
          <motion.span
            animate={{ backgroundColor: k === i ? 'rgb(var(--accent))' : 'rgb(var(--bg) / .55)', color: k === i ? 'rgb(var(--bg))' : 'rgb(var(--ink) / .7)', scale: k === i ? 1.08 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="rounded-md border border-white/10 px-2 py-1"
          >
            {s}
          </motion.span>
          {k < steps.length - 1 && <span className={'transition-colors ' + (k < i ? 'text-accent' : 'text-ink/30')}>→</span>}
        </div>
      ))}
    </div>
  )
}

/** Arkhé: gasto acumulado do mês contra o mês anterior (curvas ilustrativas, sem valores). */
function Chart() {
  const now = 'M0,70 C20,66 30,58 45,55 S70,40 90,36 S120,24 140,20 S170,12 200,8'
  const prev = 'M0,72 C25,70 40,64 60,60 S95,52 120,46 S160,38 200,32'
  return (
    <svg viewBox="0 0 200 80" className="h-20 w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="g-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="rgb(var(--accent))" stopOpacity=".35" /><stop offset="1" stopColor="rgb(var(--accent))" stopOpacity="0" /></linearGradient>
      </defs>
      <path d={prev} fill="none" stroke="rgb(var(--ink) / .3)" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
      <motion.path d={`${now} L200,80 L0,80 Z`} fill="url(#g-area)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }} />
      <motion.path d={now} fill="none" stroke="rgb(var(--accent))" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.4, ease: 'easeInOut' }} />
    </svg>
  )
}

/** Study Track: o terminal do primeiro código. */
function Term() {
  const lines = ['$ python main.py', '> tópico: python', '> minutos: 25', '> meta diária ✓']
  const [n, setN] = useState(0)
  useEffect(() => { const id = setInterval(() => setN((v) => (v >= lines.length + 2 ? 0 : v + 1)), 650); return () => clearInterval(id) }, [lines.length])
  return (
    <div className="font-mono text-[11px] leading-5 text-ink/80">
      {lines.slice(0, Math.min(n, lines.length)).map((l, i) => <p key={i} className={i === lines.length - 1 ? 'text-accent' : ''}>{l}</p>)}
      {n < lines.length && <span className="inline-block h-3 w-1.5 animate-pulse bg-accent" />}
    </div>
  )
}

export default function ProjectVisual({ p, lang }: { p: Project; lang: Lang }) {
  if (p.visual === 'fsm') return <Fsm lang={lang} />
  if (p.visual === 'chart') return <Chart />
  return <Term />
}
