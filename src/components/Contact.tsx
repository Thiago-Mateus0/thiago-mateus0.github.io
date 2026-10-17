import { links, t, type Lang } from '../data/content'
import Reveal from './Reveal'

export default function Contact({ lang }: { lang: Lang }) {
  const tx = t[lang].contact
  const items = [
    { label: 'GitHub', href: links.github },
    { label: 'LinkedIn', href: links.linkedin },
    { label: 'E-mail', href: links.email ? `mailto:${links.email}` : '' },
  ]
  return (
    <section id="contact" className="section">
      <Reveal>
        <p className="eyebrow">{tx.eyebrow}</p>
        <h2 className="h2">{tx.title}</h2>
        <p className="mb-8 max-w-xl text-mute">{tx.text}</p>
        <div className="flex flex-wrap gap-3">
          {items.map((i) =>
            i.href ? (
              <a key={i.label} href={i.href} target="_blank" rel="noreferrer" className="rounded-lg border border-line px-5 py-2.5 text-sm transition hover:border-accent hover:text-accent">
                {i.label} ↗
              </a>
            ) : null,
          )}
          {links.cv ? (
            <a href={links.cv} download className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-bg hover:opacity-90">{tx.cv}</a>
          ) : (
            <span className="rounded-lg border border-dashed border-line px-5 py-2.5 text-sm text-mute">{tx.cv} · {tx.soon}</span>
          )}
        </div>
      </Reveal>
    </section>
  )
}
