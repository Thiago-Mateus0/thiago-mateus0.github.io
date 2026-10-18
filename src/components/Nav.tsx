import { useEffect, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { t, type Lang } from '../data/content'

interface Props { lang: Lang; theme: 'dark' | 'light'; onLang: () => void; onTheme: () => void }

const ids = ['about', 'projects', 'stack', 'path', 'contact'] as const

function useMaceioTime() {
  const fmt = () => new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Maceio', hour: '2-digit', minute: '2-digit' }).format(new Date())
  const [now, setNow] = useState(fmt)
  useEffect(() => { const id = setInterval(() => setNow(fmt()), 15000); return () => clearInterval(id) }, [])
  return now
}

export default function Nav({ lang, theme, onLang, onTheme }: Props) {
  const tx = t[lang]
  const [active, setActive] = useState('')
  const [hover, setHover] = useState<string | null>(null)
  const [hidden, setHidden] = useState(false)
  const time = useMaceioTime()
  const { scrollY } = useScroll()

  // some ao rolar para baixo, volta ao rolar para cima
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 300)
  })

  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    ;['top', ...ids].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  const pill = hover ?? active
  return (
    <motion.header
      animate={{ y: hidden ? -90 : 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-3 z-40 px-3"
    >
      <nav className="mx-auto flex h-12 max-w-5xl items-center justify-between rounded-full border border-line/70 bg-bg/60 pl-5 pr-2 shadow-lg shadow-black/10 backdrop-blur-xl" aria-label="principal">
        <a href="#top" className="group font-mono text-sm font-medium" data-cursor="">
          <span className="text-accent transition-colors group-hover:text-accent2">~/</span>tm
        </a>
        <ul className="hidden text-sm text-mute md:flex" onMouseLeave={() => setHover(null)}>
          {ids.map((id) => (
            <li key={id} className="relative" onMouseEnter={() => setHover(id)}>
              {pill === id && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-accent/10" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
              <a href={`#${id}`} className={'relative block px-3.5 py-1.5 transition-colors hover:text-ink ' + (active === id ? 'text-accent' : '')}>{tx.nav[id]}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <span className="mr-2 hidden items-center gap-1.5 text-mute lg:flex" title="America/Maceio">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />{tx.misc.local} {time}
          </span>
          <button onClick={onLang} className="h-8 rounded-full border border-line px-3 text-mute transition hover:border-accent hover:text-ink active:scale-90" aria-label={tx.palette.lang}>
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
          <button onClick={onTheme} className="relative h-8 w-8 overflow-hidden rounded-full border border-line text-mute transition hover:border-accent hover:text-ink active:scale-90" aria-label={tx.palette.theme}>
            <motion.span key={theme} initial={{ y: 20, rotate: -90, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="absolute inset-0 flex items-center justify-center">
              {theme === 'dark' ? '☀' : '☾'}
            </motion.span>
          </button>
        </div>
      </nav>
    </motion.header>
  )
}
