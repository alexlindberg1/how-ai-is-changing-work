import { motion } from 'motion/react'
import { RELAY_CYCLE, RELAY_STAGGER, RELAY_TRAVEL, artifacts } from './stageLayout'

interface CompletionFlyoffProps {
  active: boolean
}

const DURATION = 2.2

/**
 * After the relay packet from the orb lands on a tile (see stageLayout
 * relay clock), the completed artifact launches from that tile row and
 * flies off the right edge of the screen.
 */
export function CompletionFlyoff({ active }: CompletionFlyoffProps) {
  if (!active) return null

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
      {artifacts.map((art, i) => (
        <motion.div
          key={art.id}
          className="absolute left-1/2 flex -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-3 py-1.5 font-mono text-[0.68rem] text-white shadow-lg"
          style={{ top: `${((i + 0.5) * 100) / artifacts.length}%` }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: ['0vw', '1vw', '32vw', '62vw'],
            scale: [0.7, 1.05, 1, 0.95],
          }}
          transition={{
            duration: DURATION,
            times: [0, 0.15, 0.7, 1],
            ease: 'easeIn',
            repeat: Infinity,
            repeatDelay: RELAY_CYCLE - DURATION,
            delay: i * RELAY_STAGGER + RELAY_TRAVEL + 0.35,
          }}
        >
          <span className="font-bold">✓</span>
          {art.completion}
        </motion.div>
      ))}
    </div>
  )
}
