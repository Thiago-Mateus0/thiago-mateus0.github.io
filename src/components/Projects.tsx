import { useMemo } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { projects, t, type Lang } from '../data/content'
import ProjectCard from './ProjectCard'
import Reveal from './Reveal'
import ScrambleText from './ScrambleText'

interface Props { lang: Lang; tag: string | null; onTag: (t: string | null) => void }

export default function Projects({ lang, tag, onTag }: Props) {
  const tx = t[lang].projects
  const tags = useMemo(() => [...new Set(projects.flatMap((p) => p.tags))], [])
  const shown = tag ? projects.filter((p) => p.tags.includes(tag)) : projects

  return (
    <section id="projects" className="section">
      <Reveal>
        <p className="eyebrow">{tx.eyebrow}</p>
        <h2 className="h2"><ScrambleText text={tx.title} /></h2>
        <div className="mb-8 flex flex-wrap gap-2 font-mono text-xs" role="group" aria-label="filtro">
          {[null, ...tags].map((x) => (
            <button
              key={x ?? 'all'}
              onClick={() => onTag(x)}
              aria-pressed={tag === x}
              className="relative rounded-full border border-ink/15 px-3 py-1 text-mute transition hover:border-ink/40 hover:text-ink active:scale-95"
            >
              {tag === x && <motion.span layoutId="chip" className="absolute inset-0 rounded-full border border-accent bg-accent/10" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span className={'relative ' + (tag === x ? 'text-accent' : '')}>{x ?? tx.all}</span>
            </button>
          ))}
        </div>
      </Reveal>
      <LayoutGroup>
        <motion.div layout className="grid gap-5 md:grid-cols-3 [&:has(>article:hover)>article:not(:hover)]:opacity-55">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => {
              const i = projects.indexOf(p)
              return <ProjectCard key={p.id} p={p} lang={lang} index={i} wide={!tag && i === 0} />
            })}
            {!tag && (
              <motion.article
                key="next" layout
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} exit={{ opacity: 0 }}
                className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-dashed border-line p-6 md:col-span-2"
              >
                <div aria-hidden className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(rgb(var(--line)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--line)) 1px, transparent 1px)', backgroundSize: '28px 28px', maskImage: 'radial-gradient(ellipse at center, #000 20%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse at center, #000 20%, transparent 75%)' }} />
                <p className="relative font-mono text-xs text-accent2">// {tx.next.tag}</p>
                <h3 className="font-display relative mt-2 text-2xl font-semibold">{tx.next.title}<span className="caret" /></h3>
                <p className="relative mt-2 max-w-md text-sm text-mute">{tx.next.text}</p>
              </motion.article>
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </section>
  )
}
