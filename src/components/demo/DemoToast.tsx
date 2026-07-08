import { AnimatePresence, motion } from 'motion/react'

interface DemoToastProps {
  message: string | null
}

/** Small status toast pinned above the bottom edge of the deck. */
export function DemoToast({ message }: DemoToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-8 left-1/2 z-[60] -translate-x-1/2 rounded-full glass-bright px-5 py-2.5 font-mono text-[0.72rem] text-text shadow-lg"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
