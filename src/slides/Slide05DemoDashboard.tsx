import { motion } from 'motion/react'
import { DemoTransformationSlide } from '../components/demo/DemoTransformationSlide'
import { demoArtifacts } from '../content/demoArtifacts'
import { AI_COLOR } from '../components/workModel/stageLayout'

interface SlideProps {
  step: number
}

const kpis = [
  { label: 'Revenue (12 mo)', value: '$248K', note: '+9% vs prior' },
  { label: 'Outstanding', value: '$31K', note: '11 invoices' },
  { label: 'Top customer', value: 'Bluewater', note: '14% of revenue' },
]

const trendBars = [42, 38, 44, 50, 58, 68, 74, 62, 48, 40, 45, 55]

/** Mock of the AI-generated executive dashboard shown in the "after" card. */
function DashboardMock({ animate }: { animate: boolean }) {
  return (
    <div className="flex h-full flex-col gap-3">
      {/* KPI row */}
      <div className="grid grid-cols-3 gap-2">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-lg border p-2.5"
            style={{ borderColor: 'rgba(76, 141, 255, 0.22)', background: 'rgba(76, 141, 255, 0.05)' }}
          >
            <p className="font-mono text-[0.52rem] uppercase tracking-[0.08em] text-text-dim">
              {kpi.label}
            </p>
            <p className="mt-0.5 font-display text-[1.05rem] font-semibold leading-none text-text">
              {kpi.value}
            </p>
            <p className="mt-1 font-mono text-[0.52rem]" style={{ color: AI_COLOR }}>
              {kpi.note}
            </p>
          </div>
        ))}
      </div>

      {/* Trend chart */}
      <div className="rounded-lg border border-border p-2.5">
        <p className="mb-1.5 font-mono text-[0.52rem] uppercase tracking-[0.08em] text-text-dim">
          Monthly revenue
        </p>
        <div className="flex h-14 items-end gap-1">
          {trendBars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t"
              style={{ background: i >= 9 ? 'rgba(76, 141, 255, 0.85)' : 'rgba(76, 141, 255, 0.35)' }}
              initial={{ height: 0 }}
              animate={{ height: animate ? `${h}%` : 0 }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>
      </div>

      {/* Insights + actions */}
      <div className="grid flex-1 grid-cols-[3fr_2fr] gap-2">
        <div className="rounded-lg border border-border p-2.5">
          <p className="mb-1.5 font-mono text-[0.52rem] uppercase tracking-[0.08em] text-text-dim">
            Key insights
          </p>
          <ul className="space-y-1 font-body text-[0.68rem] leading-snug text-text-muted">
            <li>· Winter emergency work drove the Dec–Jan peak</li>
            <li>· Unpaid invoices doubled in the last 60 days</li>
            <li>· Two top-5 customers are slowing down</li>
          </ul>
        </div>
        <div
          className="rounded-lg border p-2.5"
          style={{ borderColor: 'rgba(76, 141, 255, 0.3)', background: 'rgba(76, 141, 255, 0.06)' }}
        >
          <p className="mb-1.5 font-mono text-[0.52rem] uppercase tracking-[0.08em]" style={{ color: AI_COLOR }}>
            Recommended actions
          </p>
          <p className="font-display text-[0.72rem] font-medium leading-snug text-text">
            3 next steps, ranked by impact →
          </p>
        </div>
      </div>
    </div>
  )
}

export function Slide05DemoDashboard({ step }: SlideProps) {
  return (
    <DemoTransformationSlide
      step={step}
      kicker="Demo · Data Analysis"
      title="From Spreadsheet to Decision Tool"
      subtitle="The same data. A completely different way to use it."
      config={demoArtifacts.dataAnalysis}
      previewButtonLabel="Preview Source Workbook"
      beforeCaption="XLSX workbook"
      afterCaption="Interactive AI dashboard"
      afterAddress="summit-plumbing-dashboard.app"
      afterMock={<DashboardMock animate={step >= 4} />}
      insight={
        <>
          The spreadsheet stores the data.
          <br />
          <span className="text-accent-bright">
            The interactive experience helps someone decide.
          </span>
        </>
      }
    />
  )
}
