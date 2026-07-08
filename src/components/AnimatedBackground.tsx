import { motion } from 'motion/react'

interface AnimatedBackgroundProps {
  variant?: number
}

export function AnimatedBackground({ variant = 0 }: AnimatedBackgroundProps) {
  const accentOpacity = 0.05 + (variant % 3) * 0.015
  const warmOpacity = 0.03 + (variant % 2) * 0.015

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -top-1/4 -left-1/4 h-[60vh] w-[60vw] rounded-full blur-[120px]"
        style={{ background: `rgba(201, 85, 85, ${accentOpacity})` }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 h-[50vh] w-[50vw] rounded-full blur-[100px]"
        style={{ background: `rgba(232, 165, 152, ${warmOpacity})` }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 20, -30, 0],
          scale: [1, 0.9, 1.05, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40vh] w-[40vw] rounded-full blur-[80px]"
        style={{ background: 'rgba(201, 85, 85, 0.03)' }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
