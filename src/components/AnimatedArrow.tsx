import { motion } from 'motion/react'

interface AnimatedArrowProps {
  direction?: 'down' | 'right'
  active?: boolean
  delay?: number
}

export function AnimatedArrow({ direction = 'down', active = false, delay = 0 }: AnimatedArrowProps) {
  const isDown = direction === 'down'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0.2 }}
      transition={{ duration: 0.4, delay }}
      className={`relative flex items-center justify-center ${isDown ? 'py-2' : 'px-2'}`}
    >
      <motion.svg
        width={isDown ? 24 : 32}
        height={isDown ? 32 : 24}
        viewBox="0 0 24 24"
        fill="none"
        className={active ? 'text-accent' : 'text-text-dim'}
      >
        {isDown ? (
          <>
            <motion.line
              x1="12" y1="4" x2="12" y2="18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: active ? 1 : 0.3 }}
              transition={{ duration: 0.6, delay }}
            />
            <motion.path
              d="M6 14 L12 20 L18 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: active ? 1 : 0.3 }}
              transition={{ duration: 0.4, delay: delay + 0.2 }}
            />
          </>
        ) : (
          <>
            <motion.line
              x1="4" y1="12" x2="18" y2="12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: active ? 1 : 0.3 }}
              transition={{ duration: 0.6, delay }}
            />
            <motion.path
              d="M14 6 L20 12 L14 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: active ? 1 : 0.3 }}
              transition={{ duration: 0.4, delay: delay + 0.2 }}
            />
          </>
        )}
      </motion.svg>
      {active && (
        <motion.div
          className={`absolute ${isDown ? 'w-[2px] h-3 bg-accent rounded-full' : 'h-[2px] w-3 bg-accent rounded-full'}`}
          animate={isDown ? { y: [0, 8, 0] } : { x: [0, 8, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </motion.div>
  )
}
