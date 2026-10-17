import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/** Foto com anel de degradê girando, inclinação 3D com o mouse e brilho que acompanha o cursor. */
export default function Portrait({ caption }: { caption: string }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 160, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 160, damping: 18 })
  const glowX = useTransform(mx, [-0.5, 0.5], ['0%', '100%'])
  const glowY = useTransform(my, [-0.5, 0.5], ['0%', '100%'])

  return (
    <motion.figure
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onMouseLeave={() => { mx.set(0); my.set(0) }}
      className="group relative mx-auto w-56 sm:w-64 md:w-72"
    >
      <div aria-hidden className="absolute -inset-[3px] overflow-hidden rounded-[1.4rem]">
        <div
          className="absolute left-1/2 top-1/2 h-[170%] w-[170%] -translate-x-1/2 -translate-y-1/2"
          style={{ background: 'conic-gradient(from 0deg, rgb(var(--accent)), rgb(var(--accent2)), transparent 55%, rgb(var(--accent)))', animation: 'spin 7s linear infinite' }}
        />
      </div>
      <div className="relative overflow-hidden rounded-[1.25rem] bg-surface">
        <img
          src="/tm.jpg" srcSet="/tm-small.jpg 360w, /tm.jpg 720w" sizes="(min-width: 768px) 288px, 256px"
          width={720} height={900} loading="lazy" decoding="async"
          alt="Foto de Thiago Mateus (TM)"
          className="block h-auto w-full transition duration-500 group-hover:scale-105"
        />
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: useTransform([glowX, glowY], ([x, y]) => `radial-gradient(260px circle at ${x} ${y}, rgb(var(--accent) / .22), transparent 70%)`) }} />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
        <figcaption className="absolute bottom-3 left-3 right-3 flex items-center gap-2 font-mono text-xs text-white">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />{caption}
        </figcaption>
      </div>
    </motion.figure>
  )
}
