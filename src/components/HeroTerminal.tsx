import { useEffect, useRef, useState } from 'react'
import { links, projects, stack, t, type Lang } from '../data/content'

type Line = { kind: 'in' | 'out' | 'ok' | 'err'; text: string }

const ALIASES: Record<string, string> = {
  ajuda: 'help', help: 'help', '?': 'help',
  sobre: 'about', about: 'about', whoami: 'about',
  projetos: 'projects', projects: 'projects', ls: 'projects',
  stack: 'stack',
  contato: 'contact', contact: 'contact',
  tema: 'theme', theme: 'theme',
  limpar: 'clear', clear: 'clear', cls: 'clear',
  'sudo contratar': 'hire', 'sudo hire': 'hire', 'sudo hire-me': 'hire',
}

/** Terminal de verdade no herói: o visitante digita comandos e explora o portfólio. */
export default function HeroTerminal({ lang, onTheme }: { lang: Lang; onTheme: () => void }) {
  const tx = t[lang].term
  const [lines, setLines] = useState<Line[]>([{ kind: 'out', text: tx.hello }])
  const [value, setValue] = useState('')
  const [hist, setHist] = useState<string[]>([])
  const [hi, setHi] = useState(-1)
  const input = useRef<HTMLInputElement>(null)
  const body = useRef<HTMLDivElement>(null)

  useEffect(() => { setLines([{ kind: 'out', text: tx.hello }]) }, [tx.hello])
  useEffect(() => { body.current?.scrollTo({ top: body.current.scrollHeight, behavior: 'smooth' }) }, [lines])

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    setHist((h) => [cmd, ...h].slice(0, 20)); setHi(-1)
    const out = (kind: Line['kind'], arr: string[]) => arr.map((text) => ({ kind, text }))
    let res: Line[]
    switch (ALIASES[cmd]) {
      case 'help': res = out('out', tx.help); break
      case 'about': res = out('out', tx.about); break
      case 'projects': res = out('out', projects.map((p, i) => `0${i + 1}  ${p.name.padEnd(20)} ${p[lang].tagline}`)); break
      case 'stack': res = out('out', stack[lang].map((g) => `${g.group}: ${g.items.join(', ')}`)); break
      case 'contact': res = out('out', [`e-mail    ${links.email}`, `linkedin  ${links.linkedin.replace('https://www.', '')}`, `github    ${links.github.replace('https://', '')}`]); break
      case 'theme': onTheme(); res = out('ok', [tx.theme]); break
      case 'hire': res = out('ok', tx.hire); break
      case 'clear': setLines([]); return
      default: res = out('err', [`${tx.notFound} ${cmd}`])
    }
    setLines((l) => [...l, { kind: 'in' as const, text: cmd }, ...res].slice(-40))
  }

  const color = { in: 'text-ink', out: 'text-mute', ok: 'text-accent', err: 'text-rose-400' }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-line bg-surface/80 shadow-2xl shadow-black/30 backdrop-blur-md" onClick={() => input.current?.focus()} data-cursor="" data-nofx>
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" /><span className="h-3 w-3 rounded-full bg-[#febc2e]" /><span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-mute">{tx.title}</span>
      </div>
      <div ref={body} className="h-56 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed sm:h-64" aria-live="polite">
        {lines.map((l, i) => (
          <p key={i} className={'whitespace-pre-wrap break-words ' + color[l.kind]}>
            {l.kind === 'in' && <span className="text-accent">❯ </span>}{l.text}
          </p>
        ))}
        <form onSubmit={(e) => { e.preventDefault(); run(value); setValue('') }} className="flex items-center gap-2">
          <span className="font-mono text-accent">❯</span>
          <input
            ref={input} value={value} onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowUp' && hist.length) { e.preventDefault(); const n = Math.min(hi + 1, hist.length - 1); setHi(n); setValue(hist[n]) }
              if (e.key === 'ArrowDown') { e.preventDefault(); const n = hi - 1; setHi(n); setValue(n >= 0 ? hist[n] : '') }
            }}
            aria-label="terminal" autoComplete="off" spellCheck={false} autoCapitalize="none"
            className="w-full bg-transparent font-mono text-[13px] text-ink caret-accent outline-none focus-visible:outline-none"
          />
        </form>
      </div>
      <div className="flex flex-wrap gap-1.5 border-t border-line px-3 py-2.5">
        {tx.quick.map((q) => (
          <button key={q} onClick={(e) => { e.stopPropagation(); run(q) }} className="rounded-md border border-line px-2 py-1 font-mono text-[11px] text-mute transition hover:border-accent hover:text-accent active:scale-95">
            {q}
          </button>
        ))}
      </div>
    </div>
  )
}
