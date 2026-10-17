import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { t, type Lang } from '../data/content'

interface Props { lang: Lang; onLang: () => void; onTheme: () => void }

export default function CommandPalette({ lang, onLang, onTheme }: Props) {
  const tx = t[lang]
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const input = useRef<HTMLInputElement>(null)

  const actions = useMemo(
    () => [
      ...(['about', 'projects', 'stack', 'path', 'contact'] as const).map((id) => ({
        label: tx.nav[id],
        run: () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }),
      })),
      { label: tx.palette.theme, run: onTheme },
      { label: tx.palette.lang, run: onLang },
    ],
    [tx, onLang, onTheme],
  )
  const list = actions.filter((a) => a.label.toLowerCase().includes(q.toLowerCase()))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o) }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => { if (open) { setQ(''); setTimeout(() => input.current?.focus(), 30) } }, [open])

  const go = (run: () => void) => { setOpen(false); run() }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-[18vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog" aria-modal="true" aria-label="Command palette"
        >
          <motion.div
            initial={{ y: -12, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: -12 }}
            className="w-full max-w-md overflow-hidden rounded-xl border border-line bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={input} value={q} onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && list[0]) go(list[0].run) }}
              placeholder={tx.palette.placeholder}
              className="w-full border-b border-line bg-transparent px-4 py-3 font-mono text-sm outline-none placeholder:text-mute"
            />
            <ul className="max-h-64 overflow-auto p-1">
              {list.length === 0 && <li className="px-3 py-2 text-sm text-mute">{tx.palette.empty}</li>}
              {list.map((a) => (
                <li key={a.label}>
                  <button onClick={() => go(a.run)} className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-accent/10 hover:text-accent">{a.label}</button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
