import { motion, useReducedMotion, type Variants } from 'motion/react'
import { SlideShell } from '../components/SlideShell'

interface SlideProps {
  step: number
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.08 },
  },
}

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}

const lineReveal: Variants = {
  hidden: { y: '115%' },
  show: {
    y: '0%',
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
  },
}

const draw: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
}

export function Slide01Opening(_: SlideProps) {
  const reduceMotion = useReducedMotion()
  const initial = reduceMotion ? 'show' : 'hidden'

  return (
    <SlideShell>
      <motion.div
        variants={container}
        initial={initial}
        animate="show"
        className="relative flex min-h-[68vh] flex-col justify-center"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 top-1/2 -z-10 hidden -translate-y-1/2 select-none font-display font-semibold leading-none text-accent/[0.04] lg:block"
          style={{ fontSize: 'clamp(12rem, 26vw, 24rem)' }}
        >
          AI
        </div>

        <motion.div
          variants={rise}
          className="mb-10 flex items-center justify-between border-b border-border pb-4 font-mono text-kicker uppercase tracking-[0.22em] text-text-dim"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          <span>July 9th, 2026</span>
        </motion.div>

        <h1
          className="font-display font-semibold leading-[0.94] tracking-[-0.03em] text-text"
          style={{ fontSize: 'clamp(2.6rem, 8vw, 6.25rem)' }}
        >
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span variants={lineReveal} className="block">
              How AI Is Changing
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span variants={lineReveal} className="block">
              <motion.span
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    'linear-gradient(100deg, #c95555 0%, #d97070 30%, #e8a598 50%, #d97070 70%, #c95555 100%)',
                  backgroundSize: '220% 100%',
                }}
                animate={reduceMotion ? undefined : { backgroundPosition: ['0% 50%', '220% 50%'] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
              >
                How Work Gets Done
              </motion.span>
            </motion.span>
          </span>
        </h1>

        <motion.div
          variants={draw}
          className="mt-8 h-[3px] w-full max-w-md origin-left rounded-full bg-gradient-to-r from-accent via-accent-bright to-transparent"
        />

        <motion.div
          variants={rise}
          className="mt-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-6"
        >
          <div>
            <p className="mb-2 font-mono text-kicker uppercase tracking-[0.22em] text-text-dim">
              Presented by
            </p>
            <p className="font-display text-display-md font-semibold leading-none text-text">
              Alex Lindberg
            </p>
            <p className="mt-2 font-mono text-body text-accent">Elite AI</p>
          </div>

          <p className="max-w-sm text-body-lg leading-snug text-text-muted sm:text-right">
            A practical look at how AI is reshaping business operations.
          </p>
        </motion.div>
      </motion.div>
    </SlideShell>
  )
}
