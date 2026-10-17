import { useEffect, useState } from 'react'
import type { Lang } from '../data/content'

type Theme = 'dark' | 'light'

function read<T extends string>(key: string, fallback: T, ok: readonly T[]): T {
  try {
    const v = localStorage.getItem(key)
    return v && (ok as readonly string[]).includes(v) ? (v as T) : fallback
  } catch {
    return fallback
  }
}

export function usePrefs() {
  const [lang, setLang] = useState<Lang>(() => read('lang', 'pt', ['pt', 'en']))
  const [theme, setTheme] = useState<Theme>(() => read('theme', 'dark', ['dark', 'light']))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    try {
      localStorage.setItem('theme', theme)
      localStorage.setItem('lang', lang)
    } catch {
      /* sem storage: segue sem lembrar */
    }
  }, [theme, lang])

  return {
    lang,
    theme,
    toggleLang: () => setLang((l) => (l === 'pt' ? 'en' : 'pt')),
    toggleTheme: () => setTheme((x) => (x === 'dark' ? 'light' : 'dark')),
  }
}
