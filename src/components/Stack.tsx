import { stack, t, type Lang } from '../data/content'
import Reveal from './Reveal'
import ScrambleText from './ScrambleText'

export default function Stack({ lang }: { lang: Lang }) {
  const tx = t[lang].stack
  return (
    <section id="stack" className="section">
      <Reveal>
        <p className="eyebrow">{tx.eyebrow}</p>
        <h2 className="h2"><ScrambleText text={tx.title} /></h2>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stack[lang].map((g, i) => (
          <Reveal key={g.group} delay={i * 0.07}>
            <div className="h-full rounded-xl border border-line bg-surface p-5">
              <h3 className="mb-3 font-mono text-sm text-accent">{g.group}</h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <li key={it} className="rounded-md bg-bg px-2.5 py-1 text-sm transition hover:-translate-y-0.5 hover:text-accent">{it}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
