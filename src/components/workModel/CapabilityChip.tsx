import { motion } from 'motion/react'
import { AI_COLOR, AI_COLOR_SOFT } from './stageLayout'

interface CapabilityChipProps {
  label: string
  visible?: boolean
  active?: boolean
  /** Reveal order, used to stagger the fade-in and float. */
  index?: number
}

/**
 * A single AI capability tag (Read, Draft, Analyze, …) that fades in around the
 * AI node and gently floats to feel alive without being busy.
 */
export function CapabilityChip({
  label,
  visible = true,
  active = true,
  index = 0,
}: CapabilityChipProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8, scale: 0.85 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 8,
        scale: visible ? 1 : 0.85,
      }}
      transition={{
        duration: 0.45,
        delay: visible ? index * 0.08 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-full border px-3 py-1.5 font-mono text-[0.72rem] font-medium leading-none"
      style={{
        borderColor: 'rgba(76, 141, 255, 0.35)',
        background: AI_COLOR_SOFT,
        color: AI_COLOR,
      }}
    >
      <motion.span
        className="inline-block"
        animate={
          visible && active ? { y: [0, -2.5, 0] } : {}
        }
        transition={{
          duration: 2.4 + (index % 3) * 0.4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.15,
        }}
      >
        {label}
      </motion.span>
    </motion.span>
  )
}
