import { useMemo, useState, type MouseEvent } from 'react'
import './App.css'

/** Smooth-scroll to a section. Avoids Firefox hash-nav failures when an
 *  ancestor is treated as a scroll container (e.g. overflow-x:hidden). */
function scrollToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
  const target = document.getElementById(id)
  if (!target) return
  event.preventDefault()
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.pushState(null, '', `#${id}`)
}

type WorkstreamKey = 'replace' | 'control' | 'performance' | 'restore'

const workstreams: Record<
  WorkstreamKey,
  {
    label: string
    title: string
    value: string
    deliverables: string[]
  }
> = {
  replace: {
    label: 'Reliability',
    title: 'Replace the failing east-wing distribution system',
    value:
      'Summit will replace approximately 1,850 linear feet of domestic hot, cold, and recirculation piping serving floors 2-4 and 48 guest rooms.',
    deliverables: ['Type L copper mains', 'PEX-A branch distribution', 'New pipe insulation', 'Floor-by-floor execution'],
  },
  control: {
    label: 'Shutdown Control',
    title: 'Create 12 smaller isolation zones',
    value:
      'New isolation valves at each floor and guest-room group allow future repairs without wing-wide shutdowns.',
    deliverables: ['Floor isolation valves', 'Guest-room group valves', '48-hour shutdown notices', 'Active-zone shutdowns only'],
  },
  performance: {
    label: 'System Performance',
    title: 'Renew circulation and verify every zone',
    value:
      'The east-wing recirculation pump and balancing valves will be replaced, then each zone will be pressure tested and disinfected before return to service.',
    deliverables: ['Recirculation pump replacement', 'Balancing valves', 'Pressure testing', 'Disinfection before turnover'],
  },
  restore: {
    label: 'Turnover',
    title: 'Patch access areas and hand off usable documentation',
    value:
      'Summit will open and patch corridor ceilings and select room walls to a paint-ready finish, then provide as-built riser diagrams and a valve schedule.',
    deliverables: ['Licensed drywall subcontractor', 'Paint-ready patching', 'As-built riser diagrams', 'Valve schedule'],
  },
}

const phases = [
  {
    name: 'Mobilization',
    area: 'Materials, access, kickoff',
    duration: '2 weeks',
    rooms: '0',
    detail:
      'Submittals, material staging, crew planning, and the floor-by-floor room release plan are coordinated before field work starts.',
  },
  {
    name: 'Phase 1',
    area: 'Floor 2, rooms 201-216',
    duration: '3 weeks',
    rooms: '8 at a time',
    detail:
      'The second-floor zone establishes the operating rhythm for room access, water shutdown notices, corridor openings, testing, and turnover.',
  },
  {
    name: 'Phase 2',
    area: 'Floor 3, rooms 301-316',
    duration: '3 weeks',
    rooms: '8 at a time',
    detail:
      'Crews continue the same controlled approach on the third floor while the rest of the east wing remains operational.',
  },
  {
    name: 'Phase 3',
    area: 'Floor 4, rooms 401-416',
    duration: '3 weeks',
    rooms: '8 at a time',
    detail:
      'Final guest-room piping replacement is completed, insulated, tested, disinfected, and returned in managed blocks.',
  },
  {
    name: 'Close-out',
    area: 'Documentation and owner handoff',
    duration: '1 week',
    rooms: '0',
    detail:
      'Summit completes final walkthrough items, provides as-built riser diagrams, and turns over the close-out valve schedule.',
  },
]

const pricing = [
  ['Labor - licensed plumbers, 2 crews', 96400],
  ['Materials - copper mains, PEX-A, valves, insulation', 61250],
  ['Recirculation pump and balancing', 8300],
  ['Drywall access and patching', 14800],
  ['Permits, testing and disinfection', 4950],
] as const

const assumptions = [
  'Bluewater provides guest-room access per the agreed phasing schedule.',
  'Existing mechanical-room shut-off valves function adequately for tie-ins; two replacements are included if required.',
  'No asbestos-containing materials are present in work areas.',
  'Undamaged corridor ceiling access panels may be reused.',
  'Guest room finishes beyond paint-ready patching are handled by hotel staff or others.',
]

const exclusions = ['Fixture replacement', 'Water heater plant', 'Fire protection piping', 'Hazardous material abatement', 'Finish painting']

const money = (amount: number) =>
  new Intl.NumberFormat('en-US', { currency: 'USD', maximumFractionDigits: 0, style: 'currency' }).format(amount)

export function App() {
  const [activeWorkstream, setActiveWorkstream] = useState<WorkstreamKey>('replace')
  const [activePhase, setActivePhase] = useState(1)
  const total = useMemo(() => pricing.reduce((sum, [, amount]) => sum + amount, 0), [])
  const workstream = workstreams[activeWorkstream]
  const phase = phases[activePhase]

  return (
    <main>
      <nav className="nav" aria-label="Proposal navigation">
        <a href="#overview" onClick={(e) => scrollToSection(e, 'overview')}>Overview</a>
        <a href="#scope" onClick={(e) => scrollToSection(e, 'scope')}>Scope</a>
        <a href="#timeline" onClick={(e) => scrollToSection(e, 'timeline')}>Timeline</a>
        <a href="#investment" onClick={(e) => scrollToSection(e, 'investment')}>Investment</a>
        <a href="#next" onClick={(e) => scrollToSection(e, 'next')}>Next Steps</a>
      </nav>

      <section className="hero" id="overview">
        <div className="heroText">
          <p className="eyebrow">Summit Plumbing & Mechanical / Proposal #2026-047</p>
          <h1>East-wing domestic water repipe</h1>
          <p className="lead">
            A phased replacement plan for Bluewater Hotel & Conference Center's original 1998 copper
            domestic water system, built to reduce recurring leaks while keeping hotel operations moving.
          </p>
          <div className="heroActions">
            <a className="button primary" href="#scope" onClick={(e) => scrollToSection(e, 'scope')}>Explore scope</a>
            <a className="button secondary" href="#investment" onClick={(e) => scrollToSection(e, 'investment')}>View investment</a>
          </div>
        </div>

        <div className="heroBoard" aria-label="Proposal summary">
          <div className="metric featured">
            <span>Total investment</span>
            <strong>{money(total)}</strong>
          </div>
          <div className="metric">
            <span>Rooms served</span>
            <strong>48</strong>
          </div>
          <div className="metric">
            <span>Isolation zones</span>
            <strong>12</strong>
          </div>
          <div className="metric">
            <span>Project duration</span>
            <strong>12 weeks</strong>
          </div>
          <div className="pipeMap" aria-hidden="true">
            <span className="line lineA" />
            <span className="line lineB" />
            <span className="line lineC" />
            <span className="riser riserA" />
            <span className="riser riserB" />
            <span className="node n1">2</span>
            <span className="node n2">3</span>
            <span className="node n3">4</span>
          </div>
        </div>
      </section>

      <section className="brief">
        <div>
          <p className="eyebrow">Why this work matters</p>
          <h2>Recurring pinhole leaks have become an operating risk.</h2>
        </div>
        <p>
          Bluewater has seen repair frequency rise from two events in 2024 to seven events in the past
          twelve months, driving guest relocations, drywall repairs, and emergency service costs.
          Summit's plan replaces the affected east-wing system floor by floor, with shutdowns limited
          to the active zone and announced 48 hours in advance.
        </p>
      </section>

      <section className="section" id="scope">
        <div className="sectionIntro">
          <p className="eyebrow">Scope and deliverables</p>
          <h2>Review the work by the decision Bluewater needs to make.</h2>
        </div>

        <div className="scopeGrid">
          <div className="scopeMenu" role="tablist" aria-label="Scope workstreams">
            {(Object.keys(workstreams) as WorkstreamKey[]).map((key) => (
              <button
                key={key}
                className={activeWorkstream === key ? 'active' : ''}
                onClick={() => setActiveWorkstream(key)}
                role="tab"
                aria-selected={activeWorkstream === key}
              >
                <span>{workstreams[key].label}</span>
                {workstreams[key].title}
              </button>
            ))}
          </div>

          <article className="scopePanel" aria-live="polite">
            <p className="eyebrow">{workstream.label}</p>
            <h3>{workstream.title}</h3>
            <p>{workstream.value}</p>
            <div className="deliverables">
              {workstream.deliverables.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        </div>

        <div className="exclusions">
          <strong>Excluded</strong>
          <div>
            {exclusions.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section timeline" id="timeline">
        <div className="sectionIntro">
          <p className="eyebrow">Phasing and timeline</p>
          <h2>A controlled 12-week plan around occupied rooms.</h2>
          <p>Work hours are Monday-Friday, 8:00 AM-4:30 PM.</p>
        </div>

        <div className="timelineRail">
          {phases.map((item, index) => (
            <button
              key={item.name}
              className={activePhase === index ? 'phase active' : 'phase'}
              onClick={() => setActivePhase(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item.name}</strong>
              <small>{item.duration}</small>
            </button>
          ))}
        </div>

        <article className="phaseDetail" aria-live="polite">
          <div>
            <p className="eyebrow">Selected phase</p>
            <h3>{phase.name}</h3>
            <p>{phase.detail}</p>
          </div>
          <dl>
            <div>
              <dt>Area</dt>
              <dd>{phase.area}</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>{phase.duration}</dd>
            </div>
            <div>
              <dt>Rooms offline</dt>
              <dd>{phase.rooms}</dd>
            </div>
          </dl>
        </article>
      </section>

      <section className="investment" id="investment">
        <div className="investmentSummary">
          <p className="eyebrow">Investment</p>
          <h2>{money(total)}</h2>
          <p>
            Pricing is firm for work commencing on or before September 1, 2026. Proposal is valid
            through July 31, 2026.
          </p>
          <div className="payPlan">
            <span>20% mobilization</span>
            <span>25% floor 2</span>
            <span>25% floor 3</span>
            <span>25% floor 4</span>
            <span>5% close-out</span>
          </div>
        </div>

        <div className="priceTable">
          {pricing.map(([label, amount]) => (
            <div className="priceRow" key={label}>
              <span>{label}</span>
              <strong>{money(amount)}</strong>
            </div>
          ))}
          <div className="priceRow total">
            <span>Total investment</span>
            <strong>{money(total)}</strong>
          </div>
        </div>
      </section>

      <section className="section confidence">
        <div>
          <p className="eyebrow">Assumptions</p>
          <h2>Conditions behind the schedule and price.</h2>
          <ul className="assumptions">
            {assumptions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Why Summit</p>
          <h2>Experienced in occupied commercial repipes.</h2>
          <div className="proof">
            <span>22 years serving commercial and hospitality clients in the region</span>
            <span>Recent occupied-building repipes: Cedar Ridge HOA and Sunrise Assisted Living</span>
            <span>Licensed, bonded, insured: $2M general liability and $5M umbrella</span>
            <span>Dedicated daily foreman with weekly written progress reports</span>
          </div>
        </div>
      </section>

      <section className="next" id="next">
        <div>
          <p className="eyebrow">Next steps</p>
          <h2>Confirm the preferred start window.</h2>
          <p>
            Review the proposal, sign and return the acceptance page, or contact Summit with questions.
            A pre-construction walkthrough will be scheduled within 10 business days of acceptance.
          </p>
        </div>
        <aside className="contactCard">
          <strong>Dan Kowalski, Owner</strong>
          <span>(555) 014-2200</span>
          <a className="button primary" href="mailto:office@summitplumbing.example?subject=Bluewater%20Hotel%20Proposal%202026-047">
            Email acceptance
          </a>
        </aside>
      </section>

      <footer>
        Summit Plumbing & Mechanical / 1420 Industrial Pkwy / office@summitplumbing.example / Prepared June 12, 2026
      </footer>
    </main>
  )
}
