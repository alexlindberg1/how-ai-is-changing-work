import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'

interface ArtifactPreviewModalProps {
  open: boolean
  title: string
  subtitle?: string
  onClose: () => void
  children: ReactNode
}

/**
 * In-slide overlay for inspecting a source artifact without leaving the deck.
 * Escape and backdrop-click close it. While open, a capture-phase listener
 * swallows the deck's navigation keys so arrows/space scroll the preview
 * instead of changing slides.
 */
export function ArtifactPreviewModal({
  open,
  title,
  subtitle,
  onClose,
  children,
}: ArtifactPreviewModalProps) {
  useEffect(() => {
    if (!open) return
    const swallow = (e: KeyboardEvent) => {
      const deckKeys = [
        'ArrowRight',
        'ArrowLeft',
        ' ',
        'PageDown',
        'PageUp',
        'Home',
        'End',
        'Escape',
      ]
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (deckKeys.includes(e.key)) {
        // Keep the key for the preview (scrolling) but stop the deck handler.
        e.stopPropagation()
      }
    }
    window.addEventListener('keydown', swallow, { capture: true })
    return () => window.removeEventListener('keydown', swallow, { capture: true })
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-10"
        >
          {/* Backdrop — deck stays visible behind it */}
          <button
            type="button"
            aria-label="Close preview"
            onClick={onClose}
            className="absolute inset-0 cursor-default border-none bg-black/35 backdrop-blur-[6px]"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-[min(78vh,900px)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl glass-bright shadow-2xl"
          >
            <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
              <div className="min-w-0">
                <p className="truncate font-display text-[1.15rem] font-semibold leading-tight text-text">
                  {title}
                </p>
                {subtitle && (
                  <p className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-text-dim">
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 shrink-0 cursor-pointer items-center gap-2 rounded-full border border-border bg-surface px-4 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-text-muted transition-colors hover:text-text"
              >
                Close
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            <div className="min-h-0 flex-1">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
