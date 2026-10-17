import { useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { t, type Lang, type Project } from '../data/content'

export default function ProjectCard({ p, lang }: { p: Project; lang: Lang }) {
  const [open, setOpen] = useState(false)
  const tx = t[lang].projects
  const c = p[lang]
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 20 })

  return (
    <motion.article
      layout
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onMouseLeave={() => { mx.set(0); my.set(0) }}
      className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/60"
    >
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
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-5 text-sm">{c.description}</p>
            <ul className="mt-3 space-y-1.5 text-sm text-mute">
              {c.highlights.map((h) => (
                <li key={h} className="flex gap-2"><span className="text-accent">→</span>{h}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
        <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="font-medium text-accent hover:underline">
          {open ? tx.less : tx.more}
        </button>
        <a href={p.repo} target="_blank" rel="noreferrer" className="text-mute hover:text-ink">{tx.repo} ↗</a>
        {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="text-mute hover:text-ink">{tx.demo} ↗</a>}
      </div>
    </motion.article>
  )
}
