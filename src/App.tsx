import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { t } from './data/content'
import { pickIntro, type IntroVariant } from './hooks/intro'
import { usePrefs } from './hooks/usePrefs'
import About from './components/About'
import BackToTop from './components/BackToTop'
import Backdrop from './components/Backdrop'
import ClickFx from './components/ClickFx'
import CommandPalette from './components/CommandPalette'
import Contact from './components/Contact'
import Cursor from './components/Cursor'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Marquee from './components/Marquee'
import Nav from './components/Nav'
import Projects from './components/Projects'
import ScrollProgress from './components/ScrollProgress'
import Stack from './components/Stack'
import Stats from './components/Stats'
import Timeline from './components/Timeline'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export default function App() {
  const { lang, theme, toggleLang, toggleTheme } = usePrefs()
  const [intro, setIntro] = useState<IntroVariant | null>(() => pickIntro())
  const [introKey, setIntroKey] = useState(0)
  const [tag, setTag] = useState<string | null>(null)
  const play = useCallback((v: IntroVariant) => { window.scrollTo(0, 0); setIntro(v); setIntroKey((k) => k + 1) }, [])
  const done = useCallback(() => setIntro(null), [])

  // Konami: ↑↑↓↓←→←→BA chama a chuva de código
  useEffect(() => {
    let i = 0
    const key = (e: KeyboardEvent) => {
      i = e.key.toLowerCase() === KONAMI[i].toLowerCase() ? i + 1 : e.key === KONAMI[0] ? 1 : 0
      if (i === KONAMI.length) { i = 0; play('matrix') }
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [play])

  return (
    <div className="grain">
      <AnimatePresence>{intro && <Intro key={introKey} variant={intro} lang={lang} onDone={done} />}</AnimatePresence>
      <Backdrop />
      <Cursor />
      <ClickFx />
      <ScrollProgress />
      <Nav lang={lang} theme={theme} onLang={toggleLang} onTheme={toggleTheme} />
      <CommandPalette lang={lang} onLang={toggleLang} onTheme={toggleTheme} onIntro={play} />
      <main>
        <Hero lang={lang} ready={intro === null} onTheme={toggleTheme} />
        <Marquee />
        <Stats lang={lang} />
        <About lang={lang} />
        <Projects lang={lang} tag={tag} onTag={setTag} />
        <Stack lang={lang} onTag={setTag} />
        <Timeline lang={lang} />
        <Contact lang={lang} />
      </main>
      <BackToTop label={t[lang].misc.top} />
      <footer className="border-t border-line py-8 text-center font-mono text-xs text-mute">{t[lang].footer}</footer>
    </div>
  )
}
