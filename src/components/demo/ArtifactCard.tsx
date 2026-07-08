import { motion } from 'motion/react'

interface ArtifactCardProps {
  sourceType: 'xlsx' | 'pdf'
  label: string
  meta: string
  /** Public URL of the source file for download. */
  downloadUrl: string
  visible: boolean
  /** Show and gently pulse the preview button. */
  showButton: boolean
  buttonLabel: string
  onPreview: () => void
}

const TYPE_STYLES = {
  xlsx: { badge: 'XLSX', color: '#15803d', soft: 'rgba(21, 128, 61, 0.1)' },
  pdf: { badge: 'PDF', color: '#b91c1c', soft: 'rgba(185, 28, 28, 0.08)' },
} as const

function XlsxThumb() {
  return (
    <div className="grid grid-cols-4 gap-px overflow-hidden rounded-md border border-border bg-border p-px">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className={`h-4 ${i < 4 ? 'bg-[rgba(21,128,61,0.14)]' : 'bg-white'}`}
        />
      ))}
    </div>
  )
}

function PdfThumb() {
  return (
    <div className="space-y-1.5 rounded-md border border-border bg-white px-3 py-2.5">
      <div className="h-1.5 w-1/2 rounded bg-skeleton-strong" />
      <div className="h-1 w-full rounded bg-skeleton" />
      <div className="h-1 w-full rounded bg-skeleton" />
      <div className="h-1 w-3/4 rounded bg-skeleton" />
      <div className="mt-2 h-1 w-full rounded bg-skeleton" />
      <div className="h-1 w-5/6 rounded bg-skeleton" />
    </div>
  )
}

/** The "before" artifact: a credible, real file card with a preview action. */
export function ArtifactCard({
  sourceType,
  label,
  meta,
  downloadUrl,
  visible,
  showButton,
  buttonLabel,
  onPreview,
}: ArtifactCardProps) {
  const t = TYPE_STYLES[sourceType]

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 18 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col rounded-2xl glass p-6"
    >
      <div className="mb-4 flex items-center gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg font-mono text-[0.6rem] font-bold tracking-wide"
          style={{ background: t.soft, color: t.color }}
        >
          {t.badge}
        </span>
        <div className="min-w-0">
          <p className="truncate font-mono text-[0.82rem] font-medium text-text">{label}</p>
          <p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-text-dim">
            {meta}
          </p>
        </div>
      </div>

      <div className="mb-5">{sourceType === 'xlsx' ? <XlsxThumb /> : <PdfThumb />}</div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 8 }}
        transition={{ duration: 0.4 }}
        className="mt-auto flex flex-wrap items-center gap-2.5"
        style={{ pointerEvents: showButton ? 'auto' : 'none' }}
      >
        <button
          type="button"
          onClick={onPreview}
          className="relative cursor-pointer rounded-full border border-border-bright bg-surface px-5 py-2.5 font-display text-[0.9rem] font-medium text-text transition-colors hover:border-accent/40 hover:text-accent"
        >
          {buttonLabel}
          {/* Gentle pulse to invite the click */}
          {showButton && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-accent/40"
              animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.08, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </button>
        <a
          href={downloadUrl}
          download={label}
          className="rounded-full border border-border bg-transparent px-5 py-2.5 font-display text-[0.9rem] font-medium text-text-muted no-underline transition-colors hover:border-accent/30 hover:text-text"
        >
          Download
        </a>
      </motion.div>
    </motion.div>
  )
}
