import './App.css'

const scopeItems = [
  {
    title: 'Distribution repipe',
    detail:
      'Replace approximately 1,850 linear feet of domestic hot, cold, and recirculation piping serving the east wing with Type L copper mains and PEX-A branch distribution.',
  },
  {
    title: 'Control and isolation',
    detail:
      'Install new isolation valves at each floor and each guest-room group, creating 12 zones so future service can happen without wing-wide shutdowns.',
  },
  {
    title: 'Mechanical upgrades',
    detail:
      'Replace the east wing recirculation pump, install balancing valves, reinsulate new piping to current energy code, then pressure test and disinfect each zone.',
  },
  {
    title: 'Access, restoration, and close-out',
    detail:
      'Open and patch corridor ceiling and select room-wall access points to a paint-ready finish, then deliver as-built riser diagrams and a valve schedule.',
  },
]

const timeline = [
  { phase: 'Mobilization', area: 'Materials and kickoff', duration: '2 weeks', rooms: '0 rooms offline' },
  { phase: 'Phase 1', area: 'Floor 2, rooms 201-216', duration: '3 weeks', rooms: '8 at a time' },
  { phase: 'Phase 2', area: 'Floor 3, rooms 301-316', duration: '3 weeks', rooms: '8 at a time' },
  { phase: 'Phase 3', area: 'Floor 4, rooms 401-416', duration: '3 weeks', rooms: '8 at a time' },
  { phase: 'Close-out', area: 'Testing and documentation', duration: '1 week', rooms: '0 rooms offline' },
]

const investment = [
  ['Labor - licensed plumbers, 2 crews', '$96,400'],
  ['Materials - copper mains, PEX-A, valves, insulation', '$61,250'],
  ['Recirculation pump and balancing', '$8,300'],
  ['Drywall access and patching', '$14,800'],
  ['Permits, testing and disinfection', '$4,950'],
]

const assumptions = [
  'Hotel provides access to guest rooms per the agreed phasing schedule.',
  'Existing mechanical-room shut-off valves function adequately for tie-ins; allowance includes two valve replacements if required.',
  'No asbestos-containing materials are present in work areas.',
  'Corridor ceiling access panels may be reused where undamaged.',
  'Guest room finishes beyond paint-ready patching are handled by hotel staff or others.',
]

export function App() {
  return (
    <main>
      <nav className="topbar" aria-label="Proposal sections">
        <a href="#overview">Overview</a>
        <a href="#scope">Scope</a>
        <a href="#timeline">Timeline</a>
        <a href="#investment">Investment</a>
        <a href="#next">Next steps</a>
      </nav>

      <section className="hero" id="overview">
        <div className="heroCopy">
          <p className="eyebrow">Proposal #2026-047 - valid through July 31, 2026</p>
          <h1>Domestic Water Repipe for Bluewater Hotel & Conference Center</h1>
          <p className="lead">
            A phased east-wing repipe designed to stop recurring pinhole leaks while keeping
            hotel operations moving floor by floor.
          </p>
          <div className="heroActions">
            <a className="primaryButton" href="#investment">Review investment</a>
            <a className="secondaryButton" href="#next">Plan acceptance</a>
          </div>
        </div>

        <aside className="brief" aria-label="Proposal snapshot">
          <div>
            <span>Prepared by</span>
            <strong>Dan Kowalski, Owner</strong>
          </div>
          <div>
            <span>System served</span>
            <strong>East wing, floors 2-4, 48 rooms</strong>
          </div>
          <div>
            <span>Operating plan</span>
            <strong>Only 8 rooms offline at a time</strong>
          </div>
          <div>
            <span>Total duration</span>
            <strong>Approximately 12 weeks</strong>
          </div>
        </aside>
      </section>

      <section className="problemBand">
        <div>
          <p className="eyebrow">Why now</p>
          <h2>Leak frequency has accelerated</h2>
        </div>
        <p>
          The original 1998 copper domestic water distribution system has moved from two repair
          events in 2024 to seven events in the past twelve months, creating guest relocations,
          drywall repairs, and rising emergency-service costs.
        </p>
      </section>

      <section className="section" id="scope">
        <div className="sectionIntro">
          <p className="eyebrow">Scope and deliverables</p>
          <h2>Built around reliability, access, and controlled shutdowns</h2>
        </div>
        <div className="scopeGrid">
          {scopeItems.map((item, index) => (
            <details key={item.title} open={index === 0}>
              <summary>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item.title}
              </summary>
              <p>{item.detail}</p>
            </details>
          ))}
        </div>
        <p className="exclusions">
          Exclusions: fixture replacement, water heater plant, fire protection piping, hazardous
          material abatement, and finish painting.
        </p>
      </section>

      <section className="section timelineSection" id="timeline">
        <div className="sectionIntro">
          <p className="eyebrow">Phasing and timeline</p>
          <h2>Occupied-building sequence with 48-hour shutdown notices</h2>
        </div>
        <div className="timeline">
          {timeline.map((item) => (
            <article className="phase" key={item.phase}>
              <div className="phaseDot" aria-hidden="true" />
              <p>{item.phase}</p>
              <h3>{item.area}</h3>
              <div className="phaseMeta">
                <span>{item.duration}</span>
                <span>{item.rooms}</span>
              </div>
            </article>
          ))}
        </div>
        <p className="workHours">
          Work hours: 8:00 AM-4:30 PM, Monday-Friday. Water shutdowns are limited to the active
          zone and announced 48 hours in advance.
        </p>
      </section>

      <section className="investmentSection" id="investment">
        <div className="investmentHeadline">
          <p className="eyebrow">Investment</p>
          <h2>$185,700</h2>
          <p>
            Firm for work commencing on or before September 1, 2026. Payment schedule: 20% at
            mobilization, 25% at completion of each floor phase, and 5% at close-out.
          </p>
        </div>
        <div className="investmentTable" aria-label="Investment breakdown">
          {investment.map(([label, amount]) => (
            <div className="investmentRow" key={label}>
              <span>{label}</span>
              <strong>{amount}</strong>
            </div>
          ))}
          <div className="investmentRow total">
            <span>Total investment</span>
            <strong>$185,700</strong>
          </div>
        </div>
      </section>

      <section className="section split">
        <div>
          <p className="eyebrow">Assumptions</p>
          <h2>What the plan relies on</h2>
          <ul className="checkList">
            {assumptions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Why Summit</p>
          <h2>Commercial repipe experience</h2>
          <div className="proofGrid">
            <span>22 years serving commercial and hospitality clients</span>
            <span>Occupied-building repipes for Cedar Ridge HOA and Sunrise Assisted Living</span>
            <span>Licensed, bonded, insured, with $2M GL and $5M umbrella</span>
            <span>Dedicated foreman plus weekly written progress reports</span>
          </div>
        </div>
      </section>

      <section className="nextStep" id="next">
        <div>
          <p className="eyebrow">Next steps</p>
          <h2>Confirm the preferred start window</h2>
          <p>
            Review the proposal, sign and return the acceptance page, or contact Summit with
            questions. A pre-construction walkthrough will be scheduled within 10 business days
            of acceptance.
          </p>
        </div>
        <a className="primaryButton" href="mailto:office@summitplumbing.example?subject=Bluewater%20Hotel%20Proposal%202026-047">
          Contact Summit
        </a>
      </section>

      <footer>
        Summit Plumbing & Mechanical - 1420 Industrial Pkwy - (555) 014-2200 -
        office@summitplumbing.example
      </footer>
    </main>
  )
}
