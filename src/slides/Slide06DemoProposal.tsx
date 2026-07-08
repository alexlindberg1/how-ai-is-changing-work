import { motion } from 'motion/react'
import { DemoTransformationSlide } from '../components/demo/DemoTransformationSlide'
import { demoArtifacts } from '../content/demoArtifacts'
import { AI_COLOR } from '../components/workModel/stageLayout'

interface SlideProps {
  step: number
}

const navSections = ['Overview', 'Scope', 'Timeline', 'Investment', 'Next Steps']
const timelinePhases = ['Mobilize', 'Floor 2', 'Floor 3', 'Floor 4', 'Close-out']

/** Mock of the AI-generated interactive proposal shown in the "after" card. */
function ProposalSiteMock({ animate }: { animate: boolean }) {
  return (
    <div className="flex h-full flex-col gap-3">
      {/* Section navigation */}
      <div className="flex flex-wrap gap-1.5">
        {navSections.map((s, i) => (
          <span
            key={s}
            className="rounded-full border px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.06em]"
            style={
              i === 1
                ? { borderColor: 'rgba(76, 141, 255, 0.45)', background: 'rgba(76, 141, 255, 0.08)', color: AI_COLOR }
                : { borderColor: 'var(--color-border)', color: 'var(--color-text-dim)' }
            }
          >
            {s}
          </span>
        ))}
      </div>

      {/* Expandable scope sections */}
      <div className="space-y-1.5">
        <div
          className="rounded-lg border p-2.5"
          style={{ borderColor: 'rgba(76, 141, 255, 0.3)', background: 'rgba(76, 141, 255, 0.05)' }}
        >
          <div className="flex items-center justify-between">
            <p className="font-display text-[0.72rem] font-semibold text-text">
              Repipe east wing — 1,850 ft
            </p>
            <span className="font-mono text-[0.6rem]" style={{ color: AI_COLOR }}>
              −
            </span>
          </div>
          <p className="mt-1 font-body text-[0.62rem] leading-snug text-text-muted">
            Floor-by-floor phasing keeps rooms open. 12 isolation zones for future repairs.
          </p>
        </div>
        {['New recirculation pump & balancing', 'Access, patching & paint-ready finish'].map(
          (label) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-lg border border-border px-2.5 py-2"
            >
              <p className="font-display text-[0.7rem] font-medium text-text-muted">{label}</p>
              <span className="font-mono text-[0.6rem] text-text-dim">+</span>
            </div>
          ),
        )}
      </div>

      {/* Visual timeline */}
      <div className="rounded-lg border border-border p-2.5">
        <p className="mb-2 font-mono text-[0.52rem] uppercase tracking-[0.08em] text-text-dim">
          12-week timeline
        </p>
        <div className="flex items-center gap-1">
          {timelinePhases.map((phase, i) => (
            <div key={phase} className="flex flex-1 flex-col items-center gap-1">
              <motion.div
                className="h-1.5 w-full rounded-full"
                style={{ background: 'rgba(76, 141, 255, 0.3)', transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: animate ? 1 : 0 }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.4 }}
              />
              <span className="font-mono text-[0.5rem] text-text-dim">{phase}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Investment + CTA */}
      <div className="grid flex-1 grid-cols-[3fr_2fr] items-stretch gap-2">
        <div
          className="flex flex-col justify-center rounded-lg border p-2.5"
          style={{ borderColor: 'rgba(76, 141, 255, 0.3)', background: 'rgba(76, 141, 255, 0.06)' }}
        >
          <p className="font-mono text-[0.52rem] uppercase tracking-[0.08em] text-text-dim">
            Total investment
          </p>
          <p className="font-display text-[1.15rem] font-semibold leading-tight text-text">
            $185,700
          </p>
          <p className="font-mono text-[0.52rem]" style={{ color: AI_COLOR }}>
            phased · 20% to mobilize
          </p>
        </div>
        <div
          className="flex items-center justify-center rounded-lg p-2.5 text-center"
          style={{ background: AI_COLOR }}
        >
          <p className="font-display text-[0.72rem] font-semibold leading-snug text-white">
            Approve & schedule walkthrough →
          </p>
        </div>
      </div>
    </div>
  )
}

export function Slide06DemoProposal({ step }: SlideProps) {
  return (
    <DemoTransformationSlide
      step={step}
      kicker="Demo · Proposals"
      title="From PDF to Interactive Experience"
      subtitle="Same expertise. Better client experience."
      config={demoArtifacts.proposal}
      previewButtonLabel="Preview Source Proposal"
      beforeCaption="Static PDF proposal"
      afterCaption="Interactive web proposal"
      afterAddress="bluewater-proposal.summitplumbing.app"
      afterMock={<ProposalSiteMock animate={step >= 4} />}
      insight={
        <>
          The PDF communicates information.
          <br />
          <span className="text-accent-bright">
            The interactive experience helps the client engage with it.
          </span>
        </>
      }
    />
  )
}
