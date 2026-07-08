import { motion } from 'motion/react'
import { SlideShell } from '../components/SlideShell'
import { Kicker } from '../components/Kicker'
import { AnimatedArrow } from '../components/AnimatedArrow'
import { InsightCard } from '../components/workModel/InsightCard'
import { AI_COLOR, AI_COLOR_SOFT } from '../components/workModel/stageLayout'

interface SlideProps {
  step: number
}

interface Stage {
  index: string
  label: string
  tagline: string
  chips: string[]
  /** Visual treatment progresses from neutral → accent → AI blue. */
  tone: 'fixed' | 'interactive' | 'adaptive'
}

const stages: Stage[] = [
  {
    index: '01',
    label: 'Fixed Artifact',
    tagline: 'A static file. Everyone gets the same thing.',
    chips: ['PDF', 'XLSX', 'DOCX'],
    tone: 'fixed',
  },
  {
    index: '02',
    label: 'Interactive Artifact',
    tagline: 'An experience. The reader explores it.',
    chips: ['Filters', 'Selectable options', 'Drill-downs', 'Dynamic pricing', 'Embedded actions'],
    tone: 'interactive',
  },
  {
    index: '03',
    label: 'Adaptive Experience',
    tagline: 'It responds. Shaped to each person.',
    chips: [
      'Personalized content',
      'Different views per user',
      'AI-generated explanations',
      'Recommendations',
      'Behavior-aware follow-up',
    ],
    tone: 'adaptive',
  },
]

/** Muted versions of the familiar file-type brand colors. */
const fileTypeColors: Record<string, string> = {
  PDF: '#c0392b',
  XLSX: '#1e7145',
  DOCX: '#2b579a',
}

function FileIcon({ color }: { color: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 2.75h8L19.25 8v12A1.25 1.25 0 0 1 18 21.25H6A1.25 1.25 0 0 1 4.75 20V4A1.25 1.25 0 0 1 6 2.75Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M14 2.75V8h5.25" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 13h8M8 16.5h5.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

const toneStyles = {
  fixed: {
    labelColor: 'var(--color-text-dim)',
    cardStyle: {},
    chipStyle: {
      borderColor: 'var(--color-border-bright)',
      color: 'var(--color-text-muted)',
      background: 'transparent',
    },
  },
  interactive: {
    labelColor: 'var(--color-accent)',
    cardStyle: { borderColor: 'rgba(201, 85, 85, 0.25)' },
    chipStyle: {
      borderColor: 'rgba(201, 85, 85, 0.3)',
      color: 'var(--color-accent)',
      background: 'var(--color-accent-soft)',
    },
  },
  adaptive: {
    labelColor: AI_COLOR,
    cardStyle: {
      borderColor: 'rgba(76, 141, 255, 0.3)',
      boxShadow: '0 0 32px rgba(76, 141, 255, 0.14), 0 8px 40px rgba(76, 141, 255, 0.08)',
    },
    chipStyle: {
      borderColor: 'rgba(76, 141, 255, 0.3)',
      color: AI_COLOR,
      background: AI_COLOR_SOFT,
    },
  },
} as const

function StageCard({ stage, visible, delay }: { stage: Stage; visible: boolean; delay: number }) {
  const tone = toneStyles[stage.tone]
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
      transition={{ duration: 0.5, delay }}
      className="glass flex h-full flex-col rounded-2xl border p-6"
      style={tone.cardStyle}
    >
      <p className="font-mono text-kicker tracking-widest" style={{ color: tone.labelColor }}>
        {stage.index}
      </p>
      <h3 className="mt-2 font-display text-display-md font-semibold leading-tight text-text">
        {stage.label}
      </h3>
      <p className="mt-1.5 mb-5 font-display text-[0.95rem] text-text-muted">{stage.tagline}</p>
      <div className="mt-auto flex flex-wrap gap-2">
        {stage.chips.map((chip, i) => {
          const fileColor = stage.tone === 'fixed' ? fileTypeColors[chip] : undefined
          return (
            <motion.span
              key={chip}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.9 }}
              transition={{ duration: 0.35, delay: delay + 0.25 + i * 0.07 }}
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.08em]"
              style={tone.chipStyle}
            >
              {fileColor && <FileIcon color={fileColor} />}
              {chip}
            </motion.span>
          )
        })}
      </div>
    </motion.div>
  )
}

export function Slide05ArtifactSpectrum({ step }: SlideProps) {
  const visible = step >= 0

  return (
    <SlideShell align="start" wide>
      <Kicker visible={visible}>The Output</Kicker>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
        className="font-display text-display-lg font-semibold"
      >
        The Artifact Itself Is Changing
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
        transition={{ delay: 0.05 }}
        className="mt-3 mb-8 max-w-3xl text-body-lg text-text-muted"
      >
        Business outputs used to be fixed files. AI makes it easy to turn them into flexible,
        interactive experiences.
      </motion.p>

      <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-3">
        <StageCard stage={stages[0]} visible={visible} delay={0.1} />
        <div className="hidden items-center lg:flex">
          <AnimatedArrow direction="right" active={visible} delay={0.45} />
        </div>
        <StageCard stage={stages[1]} visible={visible} delay={0.35} />
        <div className="hidden items-center lg:flex">
          <AnimatedArrow direction="right" active={visible} delay={0.7} />
        </div>
        <StageCard stage={stages[2]} visible={visible} delay={0.6} />
      </div>

      <InsightCard visible={visible}>
        The expertise and the data stay the same.
        <br />
        <span className="text-accent-bright">The form of the output changes.</span>
      </InsightCard>
    </SlideShell>
  )
}
