import { useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { links, t, type Lang } from '../data/content'
import Magnetic from './Magnetic'
import Reveal from './Reveal'
import ScrambleText from './ScrambleText'

export default function Contact({ lang }: { lang: Lang }) {
  const tx = t[lang].contact
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(links.email) } catch { /* sem permissão: o mailto continua valendo */ }
    setCopied(true); setTimeout(() => setCopied(false), 1800)
  }
  return (
    <section id="contact" className="section">
      <Reveal>
        <p className="eyebrow">{tx.eyebrow}</p>
        <h2 className="h2"><ScrambleText text={tx.title} /></h2>
        <p className="mb-8 max-w-xl text-mute">{tx.text}</p>
        {links.email && (
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <a href={`mailto:${links.email}`} className="font-display group relative break-all text-2xl font-semibold sm:text-5xl" data-cursor="✉"><span className="bg-gradient-to-r from-ink to-accent bg-clip-text text-transparent">{links.email}</span><span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" /></a>
            <button onClick={copy} className="rounded-md border border-line px-3 py-1.5 font-mono text-xs text-mute transition hover:border-accent hover:text-accent">
              {copied ? '✓' : t[lang].copy.idle}
            </button>
          </div>
        )}
        {createPortal(<AnimatePresence>
          {copied && (
            <motion.div role="status" style={{ x: '-50%' }} initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }}
              className="fixed bottom-6 left-1/2 z-50 rounded-full border border-accent/40 bg-surface px-4 py-2 font-mono text-sm text-accent shadow-xl">
              {t[lang].copy.done}
            </motion.div>
          )}
        </AnimatePresence>, document.body)}
        <div className="flex flex-wrap gap-3">
          {links.github && <Magnetic href={links.github}>GitHub ↗</Magnetic>}
          {links.linkedin && <Magnetic href={links.linkedin}>LinkedIn ↗</Magnetic>}
          {links.cv ? (
            <Magnetic href={links.cv} primary>{tx.cv}</Magnetic>
          ) : (
            <span className="rounded-lg border border-dashed border-line px-5 py-2.5 text-sm text-mute">{tx.cv} · {tx.soon}</span>
          )}
        </div>
      </Reveal>
    </section>
  )
}
