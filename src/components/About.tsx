import { t, type Lang } from '../data/content'
import Reveal from './Reveal'

export default function About({ lang }: { lang: Lang }) {
  const tx = t[lang].about
  return (
    <section id="about" className="section">
      <Reveal>
        <p className="eyebrow">{tx.eyebrow}</p>
        <h2 className="h2">{tx.title}</h2>
      </Reveal>
      <div className="grid gap-10 md:grid-cols-2">
        <Reveal delay={0.1} className="space-y-4 text-mute">
          <p>{tx.p1}</p>
          <p>{tx.p2}</p>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2">
          {tx.skills.map((s, i) => (
            <Reveal key={s.t} delay={0.1 + i * 0.08}>
              <div className="h-full rounded-xl border border-line bg-surface p-4 transition hover:-translate-y-1 hover:border-accent/60">
                <h3 className="font-medium">{s.t}</h3>
                <p className="mt-1 text-sm text-mute">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
