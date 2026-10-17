import { t, type Lang } from '../data/content'

interface Props { lang: Lang; theme: 'dark' | 'light'; onLang: () => void; onTheme: () => void }

const ids = ['about', 'projects', 'stack', 'path', 'contact'] as const

export default function Nav({ lang, theme, onLang, onTheme }: Props) {
  const tx = t[lang]
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/60 bg-bg/70 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6" aria-label="principal">
        <a href="#top" className="font-mono text-sm font-medium">
          <span className="text-accent">~/</span>tm
        </a>
        <ul className="hidden gap-6 text-sm text-mute md:flex">
          {ids.map((id) => (
            <li key={id}>
              <a href={`#${id}`} className="transition-colors hover:text-ink">{tx.nav[id]}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 font-mono text-xs">
          <button onClick={onLang} className="rounded-md border border-line px-2.5 py-1 text-mute transition hover:border-accent hover:text-ink" aria-label={tx.palette.lang}>
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
          <button onClick={onTheme} className="rounded-md border border-line px-2.5 py-1 text-mute transition hover:border-accent hover:text-ink" aria-label={tx.palette.theme}>
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>
      </nav>
    </header>
  )
}
