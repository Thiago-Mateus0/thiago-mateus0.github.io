import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })
  return <motion.div className="fixed left-0 right-0 top-0 z-50 h-0.5 origin-left bg-accent" style={{ scaleX }} />
}
