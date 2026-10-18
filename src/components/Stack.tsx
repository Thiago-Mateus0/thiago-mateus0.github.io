import { motion } from 'framer-motion'
import { projects, stack, t, type Lang } from '../data/content'
import Reveal from './Reveal'
import ScrambleText from './ScrambleText'

const used = new Set(projects.flatMap((p) => p.tags))
const count = (tech: string) => projects.filter((p) => p.tags.includes(tech)).length

export default function Stack({ lang, onTag }: { lang: Lang; onTag: (t: string) => void }) {
  const tx = t[lang].stack
  const pick = (tech: string) => { onTag(tech); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }
  return (
    <section id="stack" className="section">
      <Reveal>
        <p className="eyebrow">{tx.eyebrow}</p>
        <h2 className="h2"><ScrambleText text={tx.title} /></h2>
        <p className="-mt-6 mb-8 text-sm text-mute">{tx.hint}</p>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stack[lang].map((g, i) => (
          <Reveal key={g.group} delay={i * 0.07} className={i === stack[lang].length - 1 ? 'lg:col-span-1' : ''}>
            <div className="group h-full rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/40">
              <h3 className="mb-3 flex items-center justify-between font-mono text-sm text-accent">
                {g.group}<span className="text-mute/60 transition-transform group-hover:rotate-90">+</span>
              </h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((it) =>
                  used.has(it) ? (
                    <li key={it}>
                      <motion.button
                        whileHover={{ y: -2 }} whileTap={{ scale: 0.94 }}
                        onClick={() => pick(it)} data-cursor={tx.see.split(' ')[0]}
                        title={`${tx.see}: ${it}`}
                        className="flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/5 px-2.5 py-1 text-sm transition-colors hover:border-accent hover:text-accent"
                      >
                        {it}<span className="rounded bg-accent/15 px-1 font-mono text-[10px] text-accent">{count(it)}</span>
                      </motion.button>
                    </li>
                  ) : (
                    <li key={it} className="rounded-md bg-bg px-2.5 py-1 text-sm text-ink/80">{it}</li>
                  ),
                )}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
