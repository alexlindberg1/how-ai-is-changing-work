import { motion, AnimatePresence } from 'motion/react'
import { slides } from '../content/slides'

interface OverviewGridProps {
  visible: boolean
  currentIndex: number
  onSelect: (index: number) => void
  onClose: () => void
}

export function OverviewGrid({ visible, currentIndex, onSelect, onClose }: OverviewGridProps) {
  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-8 z-[95] overflow-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => onSelect(i)}
                  className={`glass rounded-xl p-5 text-left transition-all cursor-pointer hover:bg-surface-hover border-none ${
                    i === currentIndex ? 'ring-2 ring-accent glow-accent' : ''
                  }`}
                >
                  <span className="font-mono text-kicker text-text-dim block mb-2">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-body font-medium text-text">
                    {slide.title}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
