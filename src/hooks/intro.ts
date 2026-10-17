export type IntroVariant = 'terminal' | 'scramble' | 'curtain' | 'matrix'

export const INTRO_VARIANTS: IntroVariant[] = ['terminal', 'scramble', 'curtain', 'matrix']

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Sorteia a abertura, nunca repetindo a última. `?intro=matrix` força uma; `?intro=off` pula. */
export function pickIntro(): IntroVariant | null {
  if (reducedMotion()) return null
  const q = new URLSearchParams(location.search).get('intro')
  if (q === 'off') return null
  if (INTRO_VARIANTS.includes(q as IntroVariant)) return q as IntroVariant
  let last: string | null = null
  try { last = localStorage.getItem('introLast') } catch { /* sem storage */ }
  const pool = INTRO_VARIANTS.filter((v) => v !== last)
  const pick = pool[Math.floor(Math.random() * pool.length)]
  try { localStorage.setItem('introLast', pick) } catch { /* sem storage */ }
  return pick
}
