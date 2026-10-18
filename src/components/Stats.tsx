import { useEffect, useRef } from 'react'
import { animate, useInView } from 'framer-motion'
import { projects, t, type Lang } from '../data/content'

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => { if (ref.current) ref.current.textContent = String(Math.round(v)) } })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>0</span>
}

export default function Stats({ lang }: { lang: Lang }) {
  const tx = t[lang].stats
  const data = [
    { n: projects.length, l: tx.projects },
    { n: new Set(projects.flatMap((p) => p.tags)).size, l: tx.tech },
    { n: projects.filter((p) => p.live).length, l: tx.live },
  ]
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-3 gap-3 px-4 sm:px-6">
      {data.map((d) => (
        <div key={d.l} className="rounded-2xl border border-line bg-surface/70 p-5 text-center backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_10px_40px_-12px_rgb(var(--accent)/.35)]">
          <p className="font-display bg-gradient-to-br from-ink to-accent bg-clip-text text-4xl font-bold text-transparent sm:text-6xl"><Counter to={d.n} /></p>
          <p className="mt-1 font-mono text-xs text-mute">{d.l}</p>
        </div>
      ))}
    </div>
  )
}
