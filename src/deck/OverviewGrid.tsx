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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Slide overview"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-8 overflow-auto"
            onClick={onClose}
          >
            <div className="mb-4 flex items-center justify-between gap-4 max-w-6xl mx-auto">
              <span className="font-mono text-kicker text-text-dim tracking-widest">
                Overview · click a slide or outside to close
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1.5 font-mono text-kicker tracking-widest text-text-dim transition-colors hover:border-border-bright hover:bg-surface-hover hover:text-text"
              >
                <span>Esc</span>
                <span>Close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelect(i)
                  }}
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
