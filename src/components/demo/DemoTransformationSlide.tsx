import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { SlideShell } from '../SlideShell'
import { Kicker } from '../Kicker'
import { InsightCard } from '../workModel/InsightCard'
import { AI_COLOR, AI_COLOR_GLOW, AI_COLOR_SOFT } from '../workModel/stageLayout'
import type { DemoArtifactConfig } from '../../content/demoArtifacts'
import { launchCodex } from './launchCodex'
import { ArtifactCard } from './ArtifactCard'
import { AfterExperienceCard } from './AfterExperienceCard'
import { ArtifactPreviewModal } from './ArtifactPreviewModal'
import { XlsxPreview } from './XlsxPreview'
import { PdfPreview } from './PdfPreview'
import { DemoToast } from './DemoToast'

interface DemoTransformationSlideProps {
  step: number
  kicker: string
  title: string
  subtitle: string
  config: DemoArtifactConfig
  /** e.g. "Preview Source Workbook" */
  previewButtonLabel: string
  /** Label under the "Before" kicker, e.g. "XLSX workbook". */
  beforeCaption: string
  /** Label under the "After" kicker, e.g. "Interactive AI dashboard". */
  afterCaption: string
  /** Fake address shown in the after-card browser chrome. */
  afterAddress: string
  /** Mock of the AI-generated experience. */
  afterMock: ReactNode
  insight: ReactNode
}

function SparkIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2.5c.5 3.6 2.4 5.5 6 6-3.6.5-5.5 2.4-6 6-.5-3.6-2.4-5.5-6-6 3.6-.5 5.5-2.4 6-6Z"
        fill="currentColor"
      />
    </svg>
  )
}

const TOAST_MS = 3800

/**
 * Shared layout for the two demo launchpad slides: a real "before" artifact
 * (inspectable in-slide), a transformation arrow, an "after" experience mock,
 * and the live-demo launch actions with reliable fallbacks.
 */
export function DemoTransformationSlide({
  step,
  kicker,
  title,
  subtitle,
  config,
  previewButtonLabel,
  beforeCaption,
  afterCaption,
  afterAddress,
  afterMock,
  insight,
}: DemoTransformationSlideProps) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  const showToast = useCallback((message: string) => {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), TOAST_MS)
  }, [])

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  const handleLaunch = useCallback(async () => {
    const result = await launchCodex(config)
    showToast(result.message)
  }, [config, showToast])

  const showBefore = step >= 1
  const showPreviewButton = step >= 2
  const showArrow = step >= 3
  const showAfter = step >= 4
  const showActions = step >= 5

  return (
    <SlideShell align="start" wide>
      <Kicker visible={step >= 0}>{kicker}</Kicker>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: step >= 0 ? 1 : 0, y: step >= 0 ? 0 : 16 }}
        className="font-display text-display-lg font-semibold"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: step >= 0 ? 1 : 0, y: step >= 0 ? 0 : 12 }}
        transition={{ delay: 0.05 }}
        className="mt-3 mb-8 max-w-3xl text-body-lg text-text-muted"
      >
        {subtitle}
      </motion.p>

      <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1.2fr] lg:gap-8">
        {/* Before */}
        <div className="flex flex-col gap-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showBefore ? 1 : 0 }}
            className="flex items-baseline gap-3"
          >
            <p className="font-mono text-kicker uppercase tracking-[0.14em] text-text-dim">
              Before
            </p>
            <p className="font-display text-[0.95rem] text-text-muted">{beforeCaption}</p>
          </motion.div>
          <div className="flex-1">
            <ArtifactCard
              sourceType={config.sourceType}
              label={config.sourceLabel}
              meta={config.sourceMeta}
              downloadUrl={config.sourceFile}
              visible={showBefore}
              showButton={showPreviewButton}
              buttonLabel={previewButtonLabel}
              onPreview={() => setPreviewOpen(true)}
            />
          </div>
        </div>

        {/* Transformation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: showArrow ? 1 : 0, scale: showArrow ? 1 : 0.85 }}
          transition={{ duration: 0.5 }}
          className="hidden flex-col items-center justify-center gap-2 lg:flex"
          aria-hidden="true"
        >
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ background: AI_COLOR_SOFT, color: AI_COLOR }}
          >
            <SparkIcon />
          </span>
          <svg width="52" height="20" viewBox="0 0 52 20" fill="none">
            <line
              x1="2"
              y1="10"
              x2="42"
              y2="10"
              stroke={AI_COLOR}
              strokeOpacity="0.45"
              strokeWidth="1.6"
              strokeDasharray="3 5"
            />
            <path
              d="M40 4 L48 10 L40 16"
              stroke={AI_COLOR}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {showArrow && (
              <circle r="3" cy="10" fill={AI_COLOR}>
                <animate
                  attributeName="cx"
                  values="2;48"
                  dur="1.6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.15;0.8;1"
                  dur="1.6s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </svg>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em]" style={{ color: AI_COLOR }}>
            AI rebuilds it
          </span>
        </motion.div>

        {/* After */}
        <div className="flex flex-col gap-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showAfter ? 1 : 0 }}
            className="flex items-baseline gap-3"
          >
            <p
              className="font-mono text-kicker uppercase tracking-[0.14em]"
              style={{ color: AI_COLOR }}
            >
              After
            </p>
            <p className="font-display text-[0.95rem] text-text-muted">{afterCaption}</p>
          </motion.div>

          <div className="flex-1">
            <AfterExperienceCard title={afterAddress} visible={showAfter}>
              {afterMock}
            </AfterExperienceCard>
          </div>

          {/* Launch actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: showActions ? 1 : 0, y: showActions ? 0 : 10 }}
            transition={{ duration: 0.45 }}
            className="flex flex-wrap items-center gap-3"
            style={{ pointerEvents: showActions ? 'auto' : 'none' }}
          >
            <button
              type="button"
              onClick={handleLaunch}
              className="cursor-pointer rounded-full border-none px-6 py-3 font-display text-[0.95rem] font-semibold text-white transition-transform hover:scale-[1.03]"
              style={{ background: AI_COLOR, boxShadow: `0 4px 24px ${AI_COLOR_GLOW}` }}
            >
              Build Interactive Version
            </button>
            <p className="w-full font-mono text-[0.62rem] uppercase tracking-[0.1em] text-text-dim">
              {config.launchHint}
            </p>
          </motion.div>
        </div>
      </div>

      <InsightCard visible={step >= 6}>{insight}</InsightCard>

      <ArtifactPreviewModal
        open={previewOpen}
        title={config.sourceLabel}
        subtitle={config.sourceMeta}
        onClose={() => setPreviewOpen(false)}
      >
        {config.sourceType === 'xlsx' ? (
          <XlsxPreview file={config.sourceFile} />
        ) : (
          <PdfPreview file={config.sourceFile} />
        )}
      </ArtifactPreviewModal>

      <DemoToast message={toast} />
    </SlideShell>
  )
}
