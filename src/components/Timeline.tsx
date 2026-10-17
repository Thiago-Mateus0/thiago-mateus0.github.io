import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { timeline, t, type Lang } from '../data/content'
import Reveal from './Reveal'
import ScrambleText from './ScrambleText'

export default function Timeline({ lang }: { lang: Lang }) {
  const tx = t[lang].path
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 24 })
  return (
    <section id="path" className="section">
      <Reveal>
        <p className="eyebrow">{tx.eyebrow}</p>
        <h2 className="h2"><ScrambleText text={tx.title} /></h2>
      </Reveal>
      <ol ref={ref} className="relative ml-2">
        <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-line" />
        <motion.span aria-hidden className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gradient-to-b from-accent to-accent2" style={{ scaleY }} />
        {timeline[lang].map((e, i) => (
          <li key={e.title} className="pb-10 pl-8 last:pb-0">
            <Reveal delay={i * 0.08}>
              <span className="absolute -left-[6px] mt-1.5 h-3 w-3 rounded-full bg-accent shadow-[0_0_0_4px_rgb(var(--accent)/.18)]" aria-hidden />
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
