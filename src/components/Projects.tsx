import { useMemo, useState } from 'react'
import { LayoutGroup } from 'framer-motion'
import { projects, t, type Lang } from '../data/content'
import ProjectCard from './ProjectCard'
import Reveal from './Reveal'
import ScrambleText from './ScrambleText'

export default function Projects({ lang }: { lang: Lang }) {
  const tx = t[lang].projects
  const [tag, setTag] = useState<string | null>(null)
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
              onClick={() => setTag(x)}
              aria-pressed={tag === x}
              className={'rounded-full border px-3 py-1 transition ' + (tag === x ? 'border-accent bg-accent/10 text-accent' : 'border-line text-mute hover:text-ink')}
            >
              {x ?? tx.all}
            </button>
          ))}
        </div>
      </Reveal>
      <LayoutGroup>
        <div className="grid items-start gap-5 md:grid-cols-2">
          {shown.map((p) => <ProjectCard key={p.id} p={p} lang={lang} index={projects.indexOf(p)} />)}
        </div>
      </LayoutGroup>
    </section>
  )
}
