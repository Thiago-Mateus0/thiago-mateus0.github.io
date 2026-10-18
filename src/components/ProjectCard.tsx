import { useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { t, type Lang, type Project } from '../data/content'
import ProjectVisual from './ProjectVisual'

const ANGLES = [135, 215, 45]

export default function ProjectCard({ p, lang, index, wide }: { p: Project; lang: Lang; index: number; wide: boolean }) {
  const [open, setOpen] = useState(false)
  const tx = t[lang].projects
  const c = p[lang]
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 20 })
  const [spot, setSpot] = useState({ x: 50, y: 50, on: false })

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1], layout: { duration: 0.4, delay: 0 } }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
        setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, on: true })
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); setSpot((s) => ({ ...s, on: false })) }}
      onClick={() => setOpen((o) => !o)}
      data-cursor={open ? '✕' : t[lang].misc.open} data-nofx
      className={'group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,opacity] duration-300 hover:border-accent/60 ' + (wide ? 'md:col-span-2' : '')}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300" style={{ opacity: spot.on ? 1 : 0, background: `radial-gradient(360px circle at ${spot.x}px ${spot.y}px, rgb(var(--accent) / .12), transparent 70%)` }} />

      <div className="relative flex h-40 flex-col justify-between overflow-hidden border-b border-line p-4" style={{ background: `linear-gradient(${ANGLES[index % 3]}deg, rgb(var(--accent) / .22), rgb(var(--accent2) / .22))` }}>
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-white/40" /><i className="h-2.5 w-2.5 rounded-full bg-white/25" /><i className="h-2.5 w-2.5 rounded-full bg-white/15" /></div>
          {p.live && (
            <span className="flex items-center gap-1.5 rounded-full bg-bg/60 px-2 py-0.5 font-mono text-[10px] text-accent backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />{tx.live}
            </span>
          )}
        </div>
        <div className="transition-transform duration-500 group-hover:-translate-y-1"><ProjectVisual p={p} lang={lang} /></div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl font-semibold tracking-tight">
            <span className="mr-2 font-mono text-sm text-accent">0{index + 1}</span>{p.name}
          </h3>
          <span className="font-mono text-xs text-mute">{p.year}</span>
        </div>
        <p className="mt-2 text-mute">{c.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((tag) => (
            <li key={tag} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-mute transition-colors group-hover:border-accent/30">{tag}</li>
          ))}
        </ul>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
              <p className="mt-5 text-sm">{c.description}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-mute">
                {c.highlights.map((h, i) => (
                  <motion.li key={h} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.06 }} className="flex gap-2">
                    <span className="text-accent">→</span>{h}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-20 mt-auto flex flex-wrap items-center gap-4 pt-5 text-sm" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="group/btn inline-flex items-center gap-1 font-medium text-accent">
            {open ? tx.less : tx.more}
            <span className={'transition-transform duration-300 ' + (open ? 'rotate-45' : 'group-hover/btn:rotate-90')}>+</span>
          </button>
          {p.private ? (
            <span className="text-mute">🔒 {tx.private}</span>
          ) : (
            <a href={p.repo} target="_blank" rel="noreferrer" className="group/a inline-flex items-center gap-1 text-mute hover:text-ink">
              {tx.repo}<span className="transition-transform group-hover/a:-translate-y-0.5 group-hover/a:translate-x-0.5">↗</span>
            </a>
          )}
          {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="text-mute hover:text-ink">{tx.demo} ↗</a>}
        </div>
      </div>
    </motion.article>
  )
}
