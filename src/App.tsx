import { t } from './data/content'
import { usePrefs } from './hooks/usePrefs'
import About from './components/About'
import CommandPalette from './components/CommandPalette'
import Contact from './components/Contact'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Projects from './components/Projects'
import ScrollProgress from './components/ScrollProgress'
import Stack from './components/Stack'
import Timeline from './components/Timeline'

export default function App() {
  const { lang, theme, toggleLang, toggleTheme } = usePrefs()
  return (
    <>
      <ScrollProgress />
      <Nav lang={lang} theme={theme} onLang={toggleLang} onTheme={toggleTheme} />
      <CommandPalette lang={lang} onLang={toggleLang} onTheme={toggleTheme} />
      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Projects lang={lang} />
        <Stack lang={lang} />
        <Timeline lang={lang} />
        <Contact lang={lang} />
      </main>
      <footer className="border-t border-line py-8 text-center font-mono text-xs text-mute">{t[lang].footer}</footer>
    </>
  )
}
