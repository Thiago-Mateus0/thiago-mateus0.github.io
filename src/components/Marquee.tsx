import { projects, stack } from '../data/content'

const items = [...new Set([...projects.flatMap((p) => p.tags), ...stack.pt.flatMap((g) => g.items)])]
const half = Math.ceil(items.length / 2)

function Row({ list, rev }: { list: string[]; rev?: boolean }) {
  const loop = [...list, ...list]
  return (
    <div className="marquee overflow-hidden py-1.5" aria-hidden>
      <div className={'marquee-track ' + (rev ? 'rev' : '')}>
        {loop.map((x, i) => (
          <span key={i} className="whitespace-nowrap rounded-full border border-line bg-surface/60 px-4 py-1.5 font-mono text-sm text-mute transition hover:border-accent hover:text-accent">{x}</span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="py-6">
      <Row list={items.slice(0, half)} />
      <Row list={items.slice(half)} rev />
    </div>
  )
}
