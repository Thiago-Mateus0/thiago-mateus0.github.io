import { timeline, t, type Lang } from '../data/content'
import Reveal from './Reveal'

export default function Timeline({ lang }: { lang: Lang }) {
  const tx = t[lang].path
  return (
    <section id="path" className="section">
      <Reveal>
        <p className="eyebrow">{tx.eyebrow}</p>
        <h2 className="h2">{tx.title}</h2>
      </Reveal>
      <ol className="relative ml-2 border-l border-line">
        {timeline[lang].map((e, i) => (
          <li key={e.title} className="pb-10 pl-8 last:pb-0">
            <Reveal delay={i * 0.08}>
              <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
              <p className="font-mono text-xs text-mute">{e.when}</p>
              <h3 className="mt-1 text-lg font-medium">{e.title}</h3>
              <p className="text-sm text-mute">{e.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
