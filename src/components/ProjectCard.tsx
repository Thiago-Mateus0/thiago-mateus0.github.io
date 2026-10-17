import { useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { t, type Lang, type Project } from '../data/content'

const ANGLES = [135, 215, 45]

export default function ProjectCard({ p, lang, index }: { p: Project; lang: Lang; index: number }) {
  const [open, setOpen] = useState(false)
  const tx = t[lang].projects
  const c = p[lang]
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 })
  const [spot, setSpot] = useState({ x: 50, y: 50, on: false })

  return (
    <motion.article
      layout
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
        setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, on: true })
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); setSpot((s) => ({ ...s, on: false })) }}
      className="group relative overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-accent/60"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300" style={{ opacity: spot.on ? 1 : 0, background: `radial-gradient(320px circle at ${spot.x}px ${spot.y}px, rgb(var(--accent) / .13), transparent 70%)` }} />

      <div className="relative h-28 overflow-hidden border-b border-line" style={{ background: `linear-gradient(${ANGLES[index % 3]}deg, rgb(var(--accent) / .28), rgb(var(--accent2) / .28))` }}>
        <span aria-hidden className="absolute -right-2 -top-4 select-none text-[7rem] font-bold leading-none text-white/10 transition-transform duration-500 group-hover:-translate-x-3 group-hover:scale-110">0{index + 1}</span>
        <div className="absolute left-4 top-3 flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-white/40" /><i className="h-2.5 w-2.5 rounded-full bg-white/25" /><i className="h-2.5 w-2.5 rounded-full bg-white/15" /></div>
        <div className="absolute bottom-3 left-4 space-y-0.5 font-mono text-[11px] text-ink/80">
          {p.snippet.map((l, i) => (
            <p key={l} className="translate-y-1 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100" style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="text-accent">›</span> {l}
            </p>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold">{p.name}</h3>
          <span className="font-mono text-xs text-mute">{p.year}</span>
        </div>
        <p className="mt-2 text-sm text-mute">{c.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((tag) => (
            <li key={tag} className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-mute">{tag}</li>
          ))}
        </ul>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <p className="mt-5 text-sm">{c.description}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-mute">
                {c.highlights.map((h) => (
                  <li key={h} className="flex gap-2"><span className="text-accent">→</span>{h}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-20 mt-5 flex flex-wrap items-center gap-4 text-sm">
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="font-medium text-accent hover:underline">
            {open ? tx.less : tx.more}
          </button>
          {p.private ? (
            <span className="text-mute">{tx.private}</span>
          ) : (
            <a href={p.repo} target="_blank" rel="noreferrer" className="text-mute hover:text-ink">{tx.repo} ↗</a>
          )}
          {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="text-mute hover:text-ink">{tx.demo} ↗</a>}
        </div>
      </div>
    </motion.article>
  )
}
