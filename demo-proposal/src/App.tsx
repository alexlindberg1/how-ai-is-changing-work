import { type CSSProperties, type MouseEvent, useMemo, useState } from 'react'
import heroImage from './assets/hotel-repipe-hero.png'
import './App.css'

const sourceProposalPdf = new URL('../source/summit-plumbing-proposal.pdf', import.meta.url).href

/** Smooth-scroll to a section. Avoids Firefox hash-nav failures when an
 *  ancestor is treated as a scroll container (e.g. overflow-x:hidden). */
function scrollToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
  const target = document.getElementById(id)
  if (!target) return
  event.preventDefault()
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.pushState(null, '', `#${id}`)
}

const scopeGroups = [
  {
    title: 'Distribution repipe',
    tag: 'Core system replacement',
    outcome: 'Replace the failing domestic water backbone serving the east wing.',
    summary: 'Approximately 1,850 linear feet of domestic hot, cold, and recirculation piping.',
    details: [
      'Serves floors 2-4 and 48 guest rooms in the east wing.',
      'Type L copper mains with PEX-A branch distribution.',
      'Floor-by-floor execution keeps the hotel operational.',
    ],
  },
  {
    title: 'Isolation and zone control',
    tag: 'Future serviceability',
    outcome: 'Contain future service work to smaller guest-room groups.',
    summary: 'New isolation valves at each floor and each guest-room group.',
    details: [
      'Creates 12 service zones total.',
      'Avoids wing-wide shutdowns for future repairs.',
      'Limits water interruptions to the active zone with 48 hours advance notice.',
    ],
  },
  {
    title: 'Recirculation performance',
    tag: 'Guest comfort',
    outcome: 'Restore balanced hot-water delivery and improve system efficiency.',
    summary: 'Replace the east-wing recirculation pump and balancing valves.',
    details: [
      'Re-insulate all new piping to current energy code.',
      'Balance the new system before returning zones to service.',
      'Pressure test and disinfect each zone before turnover.',
    ],
  },
  {
    title: 'Access, patch, and finish',
    tag: 'Occupied hotel execution',
    outcome: 'Open only the access points required to complete the repipe cleanly.',
    summary: 'Corridor ceiling and select room-wall access with paint-ready patching.',
    details: [
      'Licensed drywall subcontractor provides paint-ready finish.',
      'Corridor ceiling access panels may be reused where undamaged.',
      'Finish painting is excluded and handled by hotel staff or others.',
    ],
  },
  {
    title: 'Close-out deliverables',
    tag: 'Turnover package',
    outcome: 'Leave Bluewater with usable documentation for future maintenance.',
    summary: 'Testing records, as-built riser diagrams, and valve schedule.',
    details: [
      'Provide as-built riser diagrams at close-out.',
      'Deliver a valve schedule for future maintenance.',
      'Dedicated foreman provides weekly written progress reports.',
    ],
  },
]

const timeline = [
  {
    phase: 'Mobilization',
    area: 'Materials and project setup',
    duration: '2 weeks',
    rooms: '0 rooms offline',
    detail: 'Submittals, procurement, scheduling, and site preparation before guest-room work begins.',
  },
  {
    phase: 'Phase 1',
    area: 'Floor 2, rooms 201-216',
    duration: '3 weeks',
    rooms: '8 rooms at a time',
    detail: 'Active-zone work begins on the second floor while the remaining rooms stay operational.',
  },
  {
    phase: 'Phase 2',
    area: 'Floor 3, rooms 301-316',
    duration: '3 weeks',
    rooms: '8 rooms at a time',
    detail: 'The same zone rhythm moves to floor three after testing and turnover of floor two.',
  },
  {
    phase: 'Phase 3',
    area: 'Floor 4, rooms 401-416',
    duration: '3 weeks',
    rooms: '8 rooms at a time',
    detail: 'Final guest-room floor is repiped, tested, disinfected, and returned to service.',
  },
  {
    phase: 'Close-out',
    area: 'Documentation and turnover',
    duration: '1 week',
    rooms: '0 rooms offline',
    detail: 'Valve schedule, as-built riser diagrams, final walk-through, and close-out package.',
  },
]

const investmentItems = [
  { item: 'Labor - licensed plumbers, 2 crews', amount: 96400 },
  { item: 'Materials - copper mains, PEX-A, valves, insulation', amount: 61250 },
  { item: 'Drywall access and patching, subcontracted', amount: 14800 },
  { item: 'Recirculation pump and balancing', amount: 8300 },
  { item: 'Permits, testing, and disinfection', amount: 4950 },
]

const paymentSchedule = [
  { label: 'Mobilization', value: '20%' },
  { label: 'Floor 2 complete', value: '25%' },
  { label: 'Floor 3 complete', value: '25%' },
  { label: 'Floor 4 complete', value: '25%' },
  { label: 'Close-out', value: '5%' },
]

const assumptions = [
  'Hotel provides access to guest rooms per the agreed phasing schedule.',
  'Existing shut-off valves at the mechanical room function adequately for tie-ins; allowance included for two valve replacements if required.',
  'No asbestos-containing materials are present in work areas.',
  'Corridor ceiling access panels may be reused where undamaged.',
  'Guest room finishes beyond paint-ready patching are handled by hotel staff or others.',
]

const exclusions = [
  'Fixture replacement',
  'Water heater plant',
  'Fire protection piping',
  'Hazardous material abatement',
  'Finish painting',
]

const decisionHighlights = [
  {
    label: 'Operational approach',
    value: 'Occupied-building phasing',
    note: 'Eight rooms offline at a time while the hotel remains open.',
  },
  {
    label: 'System outcome',
    value: 'New mains, branches, pump, valves',
    note: 'Core distribution work plus recirculation balancing and insulation.',
  },
  {
    label: 'Commercial terms',
    value: 'Valid through July 31',
    note: 'Pricing is firm for work commencing on or before September 1, 2026.',
  },
]

const proofPoints = [
  '22 years serving commercial and hospitality clients in the region.',
  'Occupied-building repipe references available: Cedar Ridge HOA (2024) and Sunrise Assisted Living (2025).',
  'Licensed, bonded, and insured with $2M general liability and $5M umbrella coverage.',
  'Dedicated project foreman on site daily with weekly written progress reports.',
]

const nextSteps = [
  'Review this proposal and confirm the preferred start window.',
  'Sign and return the acceptance page, or contact Summit with questions.',
  'Summit will schedule a pre-construction walkthrough within 10 business days of acceptance.',
]

const totalInvestment = 185700

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)

export function App() {
  const [activePhase, setActivePhase] = useState(1)
  const [selectedScope, setSelectedScope] = useState(0)
  const currentPhase = timeline[activePhase]

  const subtotalLabel = useMemo(() => {
    const majorItems = investmentItems.slice(0, 2).reduce((sum, line) => sum + line.amount, 0)
    return formatCurrency(majorItems)
  }, [])

  return (
    <main id="top">
      <nav className="topbar" aria-label="Proposal sections">
        <a className="brand" href="#top" aria-label="Summit Plumbing proposal home" onClick={(e) => scrollToSection(e, 'top')}>
          <span className="brandMark">SP</span>
          <span>Summit Plumbing</span>
        </a>
        <div className="navLinks">
          <a href="#overview" onClick={(e) => scrollToSection(e, 'overview')}>Overview</a>
          <a href="#scope" onClick={(e) => scrollToSection(e, 'scope')}>Scope</a>
          <a href="#timeline" onClick={(e) => scrollToSection(e, 'timeline')}>Timeline</a>
          <a href="#investment" onClick={(e) => scrollToSection(e, 'investment')}>Investment</a>
          <a href="#next" onClick={(e) => scrollToSection(e, 'next')}>Next</a>
        </div>
      </nav>

      <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="heroOverlay" />
        <div className="heroContent">
          <p className="eyebrow">Proposal #2026-047 | Prepared June 12, 2026</p>
          <h1>Domestic Water Repipe Proposal</h1>
          <p className="heroLead">
            A phased east-wing repipe for Bluewater Hotel & Conference Center, designed to stop recurring
            pinhole leaks while protecting guest operations floor by floor.
          </p>
          <div className="heroActions">
            <a className="primaryAction" href="#investment" onClick={(e) => scrollToSection(e, 'investment')}>
              Review investment
            </a>
            <a className="secondaryAction" href="#scope" onClick={(e) => scrollToSection(e, 'scope')}>
              Explore scope
            </a>
          </div>
          <div className="heroFacts" aria-label="Proposal highlights">
            <span>48 rooms</span>
            <span>12 weeks</span>
            <span>12 zones</span>
          </div>
        </div>
        <aside className="proposalCard" aria-label="Proposal summary">
          <div>
            <span>Prepared by</span>
            <strong>Dan Kowalski, Owner</strong>
          </div>
          <div>
            <span>Total investment</span>
            <strong>{formatCurrency(totalInvestment)}</strong>
          </div>
          <div>
            <span>Project rhythm</span>
            <strong>12 weeks | 8 rooms offline at a time</strong>
          </div>
        </aside>
      </section>

      <section className="section overviewGrid" id="overview">
        <div>
          <p className="sectionKicker">Project overview</p>
          <h2>Replace the aging east-wing water system without taking the hotel offline.</h2>
          <p>
            Bluewater Hotel & Conference Center has experienced recurring pinhole leaks in the original
            1998 copper domestic water distribution system serving the east wing, floors 2-4 and 48 guest
            rooms. Repair frequency has increased from two events in 2024 to seven events in the past
            twelve months, resulting in guest relocations, drywall repairs, and rising emergency service
            costs.
          </p>
          <p>
            Summit Plumbing & Mechanical proposes Type L copper mains and PEX-A branch distribution,
            executed floor by floor so daily hotel operations can continue throughout the project.
          </p>
        </div>
        <div className="impactPanel" aria-label="Project impact highlights">
          <div>
            <span>48</span>
            <p>guest rooms served by the east-wing system</p>
          </div>
          <div>
            <span>7</span>
            <p>leak events in the past twelve months</p>
          </div>
          <div>
            <span>12</span>
            <p>future isolation zones for targeted service</p>
          </div>
        </div>
      </section>

      <section className="decisionBand" aria-label="Proposal decision snapshot">
        {decisionHighlights.map((highlight) => (
          <div key={highlight.label}>
            <span>{highlight.label}</span>
            <strong>{highlight.value}</strong>
            <p>{highlight.note}</p>
          </div>
        ))}
      </section>

      <section className="section" id="scope">
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Scope and deliverables</p>
            <h2>Choose a workstream to see what Bluewater receives.</h2>
          </div>
          <p>
            Tap each workstream to inspect the deliverables, operating impact, and close-out value.
            Exclusions are listed separately so the decision boundary is clear.
          </p>
        </div>
        <div className="scopeExperience">
          <div className="scopeAccordion" aria-label="Expandable scope workstreams">
            {scopeGroups.map((group, index) => (
              <article className={index === selectedScope ? 'scopeCard active' : 'scopeCard'} key={group.title}>
                <button
                  className="scopeSummary"
                  onClick={() => setSelectedScope(index)}
                  aria-expanded={index === selectedScope}
                  aria-controls={`scope-panel-${index}`}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{group.title}</strong>
                  <small>{group.tag}</small>
                </button>
                <div
                  className="scopePanel"
                  id={`scope-panel-${index}`}
                  hidden={index !== selectedScope}
                >
                  <p>{group.summary}</p>
                  <ul>
                    {group.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <aside className="exclusionPanel">
            <p className="sectionKicker">Not included</p>
            <h3>Clear exclusions keep the investment comparable.</h3>
            <ul>
              {exclusions.map((exclusion) => (
                <li key={exclusion}>{exclusion}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section timelineSection" id="timeline">
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Phasing and timeline</p>
            <h2>Approximately 12 weeks from notice to proceed.</h2>
          </div>
          <p>
            Work hours are 8:00 AM-4:30 PM, Monday-Friday. Water shutdowns stay limited to the active zone
            and are announced 48 hours in advance.
          </p>
        </div>
        <div className="timelineShell">
          <div className="phaseRail" role="tablist" aria-label="Project phases">
            {timeline.map((phase, index) => (
              <button
                className={index === activePhase ? 'phaseButton active' : 'phaseButton'}
                key={phase.phase}
                onClick={() => setActivePhase(index)}
                role="tab"
                aria-selected={index === activePhase}
                style={{ '--phase-progress': `${((index + 1) / timeline.length) * 100}%` } as CSSProperties}
              >
                <span>{phase.duration}</span>
                {phase.phase}
              </button>
            ))}
          </div>
          <article className="phaseDetail">
            <p>{currentPhase.duration}</p>
            <h3>{currentPhase.phase}</h3>
            <dl>
              <div>
                <dt>Area</dt>
                <dd>{currentPhase.area}</dd>
              </div>
              <div>
                <dt>Rooms offline</dt>
                <dd>{currentPhase.rooms}</dd>
              </div>
            </dl>
            <p>{currentPhase.detail}</p>
            <div className="timelineMeter" aria-label={`Timeline progress ${activePhase + 1} of ${timeline.length}`}>
              <span style={{ width: `${((activePhase + 1) / timeline.length) * 100}%` }} />
            </div>
          </article>
        </div>
      </section>

      <section className="section investmentSection" id="investment">
        <div className="investmentHero">
          <p className="sectionKicker">Investment</p>
          <h2>{formatCurrency(totalInvestment)}</h2>
          <p>
            Includes labor, materials, drywall access and patching, pump and balancing, permits, testing,
            and disinfection.
          </p>
          <div className="investmentMetric">
            <span>Labor and materials</span>
            <strong>{subtotalLabel}</strong>
          </div>
          <div className="investmentMetric">
            <span>Commercial certainty</span>
            <strong>Firm before Sep. 1</strong>
          </div>
        </div>
        <div className="costBreakdown" aria-label="Investment breakdown">
          {investmentItems.map((line) => {
            const share = (line.amount / totalInvestment) * 100
            return (
              <div className="costRow" key={line.item}>
                <div>
                  <span>{line.item}</span>
                  <strong>{formatCurrency(line.amount)}</strong>
                </div>
                <div className="barTrack" aria-hidden="true">
                  <span style={{ width: `${share}%` }} />
                </div>
              </div>
            )
          })}
        </div>
        <div className="paymentSchedule">
          <h3>Payment schedule</h3>
          <div className="paymentSteps">
            {paymentSchedule.map((step) => (
              <span key={step.label}>
                <strong>{step.value}</strong>
                {step.label}
              </span>
            ))}
          </div>
          <p>20% at mobilization, 25% after each floor phase, and 5% at close-out.</p>
        </div>
      </section>

      <section className="section assuranceGrid">
        <div>
          <p className="sectionKicker">Assumptions</p>
          <h2>Shared conditions for a smooth occupied-building project.</h2>
          <ul className="checkList">
            {assumptions.map((assumption) => (
              <li key={assumption}>{assumption}</li>
            ))}
          </ul>
        </div>
        <div className="proofPanel">
          <p className="sectionKicker">Why Summit</p>
          <h2>Built for commercial and hospitality work.</h2>
          <ul className="checkList dark">
            {proofPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section nextSection" id="next">
        <div>
          <p className="sectionKicker">Next steps</p>
          <h2>Move from proposal to pre-construction.</h2>
          <p>
            Summit appreciates the opportunity to earn Bluewater's business and can adjust phasing or
            scope to fit operational needs.
          </p>
        </div>
        <ol className="nextList">
          {nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className="ctaPanel">
          <div>
            <span>Summit Plumbing & Mechanical</span>
            <strong>(555) 014-2200</strong>
            <span>office@summitplumbing.example | 1420 Industrial Pkwy</span>
          </div>
          <div className="ctaActions">
            <a
              className="primaryAction"
              href="mailto:office@summitplumbing.example?subject=Acceptance%20-%20Bluewater%20Hotel%20Proposal%20%232026-047"
            >
              Accept proposal
            </a>
            <a
              className="primaryAction alt"
              href="mailto:office@summitplumbing.example?subject=Bluewater%20Hotel%20Proposal%20%232026-047"
            >
              Email questions
            </a>
            <a className="secondaryAction light" href={sourceProposalPdf}>
              Open source PDF
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
