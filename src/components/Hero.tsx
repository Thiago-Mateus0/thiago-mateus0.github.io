import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { t, type Lang } from '../data/content'
import Magnetic from './Magnetic'

function useTyping(text: string, speed = 55) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setN(text.length); return }
    setN(0)
    const id = setInterval(() => setN((v) => (v >= text.length ? (clearInterval(id), v) : v + 1)), speed)
    return () => clearInterval(id)
  }, [text, speed])
  return text.slice(0, n)
}

export default function Hero({ lang }: { lang: Lang }) {
  const tx = t[lang].hero
  const typed = useTyping('Thiago Mateus Soares Cerqueira Filho')
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="section relative !py-32">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="eyebrow">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent align-middle" />
          {tx.status}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-6xl font-bold tracking-tight sm:text-8xl">
          TM<span className="text-accent">.</span>
        </motion.h1>
        <p className="mt-3 min-h-[1.75rem] font-mono text-sm text-mute sm:text-base" aria-label="Thiago Mateus Soares Cerqueira Filho">
          <span className="text-accent">&gt; </span>
          <span className="caret">{typed}</span>
        </p>
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 text-xl font-medium sm:text-2xl">
          {tx.role}
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-4 max-w-xl text-mute">
          {tx.lead}
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-10 flex flex-wrap gap-3">
          <Magnetic href="#projects" primary>{tx.cta1}</Magnetic>
          <Magnetic href="#contact">{tx.cta2}</Magnetic>
        </motion.div>
        <p className="mt-10 hidden font-mono text-xs text-mute md:block">{tx.cmd}</p>
      </div>
    </section>
  )
}
