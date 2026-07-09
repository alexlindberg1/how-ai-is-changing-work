"use client"

import { useMemo, useState } from "react"
import "./App.css"

type Month = {
  month: string
  invoices: number
  revenue: number
  outstanding: number
  avgInvoice: number
  mom: number | null
  delta: number | null
}

type Rank = {
  name: string
  revenue: number
  invoices: number
  share: number
}

const months: Month[] = [
  { month: "2025-07", invoices: 10, revenue: 16560, outstanding: 0, avgInvoice: 1656, mom: null, delta: null },
  { month: "2025-08", invoices: 9, revenue: 10145, outstanding: 0, avgInvoice: 1127, mom: -0.3873792270531401, delta: -6415 },
  { month: "2025-09", invoices: 10, revenue: 11795, outstanding: 0, avgInvoice: 1180, mom: 0.1626416954164613, delta: 1650 },
  { month: "2025-10", invoices: 11, revenue: 7175, outstanding: 0, avgInvoice: 652, mom: -0.3916913946587537, delta: -4620 },
  { month: "2025-11", invoices: 13, revenue: 10085, outstanding: 1610, avgInvoice: 776, mom: 0.40557491289198605, delta: 2910 },
  { month: "2025-12", invoices: 15, revenue: 15070, outstanding: 0, avgInvoice: 1005, mom: 0.49429846306395636, delta: 4985 },
  { month: "2026-01", invoices: 16, revenue: 21955, outstanding: 0, avgInvoice: 1372, mom: 0.4568679495686795, delta: 6885 },
  { month: "2026-02", invoices: 14, revenue: 17225, outstanding: 0, avgInvoice: 1230, mom: -0.21544067410612616, delta: -4730 },
  { month: "2026-03", invoices: 11, revenue: 14995, outstanding: 1830, avgInvoice: 1363, mom: -0.12946298984034832, delta: -2230 },
  { month: "2026-04", invoices: 9, revenue: 14825, outstanding: 185, avgInvoice: 1647, mom: -0.011337112370790263, delta: -170 },
  { month: "2026-05", invoices: 10, revenue: 23390, outstanding: 7395, avgInvoice: 2339, mom: 0.5777403035413153, delta: 8565 },
  { month: "2026-06", invoices: 12, revenue: 25445, outstanding: 9595, avgInvoice: 2120, mom: 0.08785805899957247, delta: 2055 },
]

const topCustomers: Rank[] = [
  { name: "Fern Valley Farms", revenue: 18220, invoices: 9, share: 0.0965732912834919 },
  { name: "Summit Office Park", revenue: 16795, invoices: 7, share: 0.08902022102668751 },
  { name: "Copper Kettle Bakery", revenue: 14815, invoices: 7, share: 0.07852542866986457 },
  { name: "Metro Print Shop", revenue: 13595, invoices: 5, share: 0.07205894045000398 },
  { name: "Cedar Ridge HOA", revenue: 13445, invoices: 14, share: 0.07126388042297194 },
  { name: "Stonebridge Realty", revenue: 12805, invoices: 5, share: 0.06787162430763523 },
  { name: "Oak & Iron Brewing", revenue: 11030, invoices: 9, share: 0.05846341398775608 },
  { name: "Willow Creek Church", revenue: 10780, invoices: 9, share: 0.057138313942702676 },
]

const topServices: Rank[] = [
  { name: "Repipe (partial)", revenue: 88315, invoices: 17, share: 0.4681048419155646 },
  { name: "Water heater install", revenue: 40370, invoices: 19, share: 0.2139771552752233 },
  { name: "Maintenance contract", revenue: 18045, invoices: 15, share: 0.09564572125195452 },
  { name: "Emergency call-out", revenue: 10570, invoices: 14, share: 0.056025229904857816 },
  { name: "Fixture replacement", revenue: 8920, invoices: 15, share: 0.047279569607505366 },
  { name: "Drain cleaning", revenue: 7520, invoices: 23, share: 0.03985900935520632 },
]

const declines = [
  { name: "Maintenance contract", current: 0, priorAvg: 1760, drop: -1760, dropPct: -1 },
  { name: "Emergency call-out", current: 0, priorAvg: 711.67, drop: -711.67, dropPct: -1 },
  { name: "Fixture replacement", current: 450, priorAvg: 760, drop: -310, dropPct: -0.4079 },
]

const outliers = [
  { label: "2026-06", metric: "Monthly revenue", value: 25445, note: "+1.8 sigma vs 12-month average", tone: "high" },
  { label: "2025-10", metric: "Monthly revenue", value: 7175, note: "-1.6 sigma vs 12-month average", tone: "low" },
  { label: "INV-2160", metric: "Copper Kettle Bakery", value: 6295, note: "Large repipe in May", tone: "high" },
  { label: "INV-2176", metric: "Metro Print Shop", value: 6145, note: "Large repipe in June", tone: "high" },
]

const totalRevenue = 188665
const invoiceCount = 140
const outstanding = 20615
const avgInvoice = totalRevenue / invoiceCount

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

const pct = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
})

function metricValue(month: Month, metric: "revenue" | "invoices" | "avgInvoice") {
  return month[metric]
}

function metricLabel(metric: "revenue" | "invoices" | "avgInvoice") {
  return metric === "revenue" ? "Revenue" : metric === "invoices" ? "Invoices" : "Avg invoice"
}

function formatMetric(value: number, metric: "revenue" | "invoices" | "avgInvoice") {
  return metric === "invoices" ? value.toLocaleString("en-US") : money.format(value)
}

function TrendChart({
  activeMonth,
  metric,
  onSelect,
}: {
  activeMonth: string
  metric: "revenue" | "invoices" | "avgInvoice"
  onSelect: (month: string) => void
}) {
  const width = 900
  const height = 320
  const pad = 48
  const values = months.map((month) => metricValue(month, metric))
  const min = Math.min(...values) * 0.82
  const max = Math.max(...values) * 1.08
  const x = (index: number) => pad + (index * (width - pad * 2)) / (months.length - 1)
  const y = (value: number) => height - pad - ((value - min) / (max - min)) * (height - pad * 2)
  const path = months.map((month, index) => `${index === 0 ? "M" : "L"} ${x(index)} ${y(metricValue(month, metric))}`).join(" ")

  return (
    <div className="chart-shell">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${metricLabel(metric)} trend by month`}>
        {[0, 1, 2, 3].map((line) => {
          const gy = pad + line * ((height - pad * 2) / 3)
          return <line className="grid" key={line} x1={pad} x2={width - pad} y1={gy} y2={gy} />
        })}
        {months.map((month, index) => {
          const barHeight = (month.outstanding / outstanding) * 86
          return (
            <rect
              className="open-bar"
              height={barHeight}
              key={`${month.month}-open`}
              rx="5"
              width="18"
              x={x(index) - 9}
              y={height - pad - barHeight}
            />
          )
        })}
        <path className="line" d={path} />
        {months.map((month, index) => {
          const isSelected = month.month === activeMonth
          const isDown = month.mom !== null && month.mom < 0
          return (
            <g className="month-mark" key={month.month}>
              <button aria-label={`Select ${month.month}`} onClick={() => onSelect(month.month)}>
                <circle className={`dot ${isDown ? "down" : ""} ${isSelected ? "selected" : ""}`} cx={x(index)} cy={y(metricValue(month, metric))} r="9" />
              </button>
              <text className="axis x-axis" x={x(index)} y={height - 14}>
                {month.month.slice(5)}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function RankList({ rows }: { rows: Rank[] }) {
  const max = Math.max(...rows.map((row) => row.revenue))
  return (
    <div className="rank-list">
      {rows.map((row, index) => (
        <div className="rank-row" key={row.name}>
          <b>{index + 1}</b>
          <div>
            <strong>{row.name}</strong>
            <span>{row.invoices} invoices · {pct.format(row.share)} of revenue</span>
            <i style={{ width: `${(row.revenue / max) * 100}%` }} />
          </div>
          <em>{money.format(row.revenue)}</em>
        </div>
      ))}
    </div>
  )
}

export function App() {
  const [activeMonth, setActiveMonth] = useState("2026-06")
  const [metric, setMetric] = useState<"revenue" | "invoices" | "avgInvoice">("revenue")
  const [rankMode, setRankMode] = useState<"customers" | "services">("customers")

  const selected = useMemo(() => months.find((month) => month.month === activeMonth) ?? months[months.length - 1], [activeMonth])
  const lastQuarterRevenue = months.slice(-3).reduce((sum, month) => sum + month.revenue, 0)
  const firstQuarterRevenue = months.slice(0, 3).reduce((sum, month) => sum + month.revenue, 0)
  const topService = topServices[0]
  const rankRows = rankMode === "customers" ? topCustomers : topServices

  return (
    <main className="dashboard">
      <section className="hero">
        <div>
          <span className="eyebrow">Summit Plumbing · Executive dashboard</span>
          <h1>Revenue is peaking, but cash collection is becoming the constraint.</h1>
          <p>
            June is the strongest month in the workbook at {money.format(selected.revenue)}, up {pct.format(selected.mom ?? 0)} from May.
            The decision point is whether Summit can protect repipe demand while tightening outstanding balances.
          </p>
        </div>
        <aside className="hero-card">
          <span>Total revenue</span>
          <strong>{money.format(totalRevenue)}</strong>
          <div><i style={{ width: `${(lastQuarterRevenue / totalRevenue) * 100}%` }} /></div>
          <small>{pct.format(lastQuarterRevenue / totalRevenue)} of the year came from the last three months.</small>
        </aside>
      </section>

      <section className="stats-grid" aria-label="Executive metrics">
        <article className="stat good">
          <span>Revenue trend</span>
          <strong>{money.format(lastQuarterRevenue)}</strong>
          <p>Last 3 months vs {money.format(firstQuarterRevenue)} in the first 3 months.</p>
        </article>
        <article className="stat">
          <span>Average invoice</span>
          <strong>{money.format(avgInvoice)}</strong>
          <p>Large project work is lifting invoice value above routine service calls.</p>
        </article>
        <article className="stat warn">
          <span>Outstanding</span>
          <strong>{money.format(outstanding)}</strong>
          <p>{pct.format(outstanding / totalRevenue)} of recorded revenue is still open.</p>
        </article>
        <article className="stat good">
          <span>Top service</span>
          <strong>{pct.format(topService.share)}</strong>
          <p>{topService.name} generated {money.format(topService.revenue)}.</p>
        </article>
      </section>

      <section className="panel trend-panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Month-over-month trend</span>
            <h2>Click any month to inspect the operating signal behind it.</h2>
          </div>
          <div className="segmented" aria-label="Trend metric">
            {(["revenue", "invoices", "avgInvoice"] as const).map((item) => (
              <button className={metric === item ? "active" : ""} key={item} onClick={() => setMetric(item)}>
                {metricLabel(item)}
              </button>
            ))}
          </div>
        </div>
        <TrendChart activeMonth={activeMonth} metric={metric} onSelect={setActiveMonth} />
        <div className="month-strip">
          <div>
            <span>Selected month</span>
            <strong>{selected.month}</strong>
          </div>
          <div>
            <span>{metricLabel(metric)}</span>
            <strong>{formatMetric(metricValue(selected, metric), metric)}</strong>
          </div>
          <div>
            <span>MoM change</span>
            <strong className={(selected.delta ?? 0) >= 0 ? "positive" : "negative"}>
              {selected.delta === null ? "Start" : `${money.format(selected.delta)} (${pct.format(selected.mom ?? 0)})`}
            </strong>
          </div>
          <div>
            <span>Open balance</span>
            <strong className={selected.outstanding > 0 ? "negative" : "positive"}>{money.format(selected.outstanding)}</strong>
          </div>
        </div>
      </section>

      <section className="two-column">
        <article className="panel">
          <div className="section-heading compact">
            <div>
              <span className="eyebrow">Concentration</span>
              <h2>Who and what drives revenue?</h2>
            </div>
            <div className="segmented" aria-label="Ranking mode">
              <button className={rankMode === "customers" ? "active" : ""} onClick={() => setRankMode("customers")}>Customers</button>
              <button className={rankMode === "services" ? "active" : ""} onClick={() => setRankMode("services")}>Services</button>
            </div>
          </div>
          <RankList rows={rankRows} />
        </article>

        <article className="panel mix-panel">
          <span className="eyebrow">Service mix</span>
          <h2>Project work is carrying the business.</h2>
          <strong>{pct.format(topServices[0].share + topServices[1].share)}</strong>
          <p>Repipe and water heater jobs account for {money.format(topServices[0].revenue + topServices[1].revenue)} of revenue. That mix is powerful, but a softer project pipeline would show up quickly.</p>
          <div className="mix-meter"><i style={{ width: `${(topServices[0].share + topServices[1].share) * 100}%` }} /></div>
        </article>
      </section>

      <section className="three-column">
        <article className="panel">
          <span className="eyebrow">Areas of decline</span>
          <h2>Routine work faded in June.</h2>
          <div className="declines">
            {declines.map((row) => (
              <div className="decline-row" key={row.name}>
                <div>
                  <strong>{row.name}</strong>
                  <span>June vs prior 3-month average</span>
                </div>
                <em>{money.format(row.current)} now</em>
                <b>{pct.format(row.dropPct)}</b>
              </div>
            ))}
          </div>
        </article>

        <article className="panel status-panel">
          <span className="eyebrow">Cash risk</span>
          <h2>Outstanding balances are clustered in May and June.</h2>
          <div className="status-row">
            <span>June open balance</span>
            <strong>{money.format(9595)}</strong>
            <em>Highest open month in the file.</em>
          </div>
          <div className="status-row">
            <span>May open balance</span>
            <strong>{money.format(7395)}</strong>
            <em>Second-highest open month.</em>
          </div>
          <div className="status-row">
            <span>Collection priority</span>
            <strong>{money.format(16990)}</strong>
            <em>May plus June open balances.</em>
          </div>
        </article>

        <article className="panel">
          <span className="eyebrow">Outliers</span>
          <h2>Changes worth a second look.</h2>
          <p className="plain">June revenue is unusually high, October was unusually weak, and two large repipe invoices explain much of the recent lift.</p>
        </article>
      </section>

      <section className="outliers" aria-label="Unusual changes">
        {outliers.map((item) => (
          <article key={item.label}>
            <span>{item.metric}</span>
            <strong>{item.label}</strong>
            <em>{money.format(item.value)}</em>
            <p>{item.note}</p>
            <b className={item.tone === "low" ? "overdue" : ""}>{item.tone}</b>
          </article>
        ))}
      </section>

      <section className="actions">
        <article>
          <b>1</b>
          <span>Collect cash</span>
          <h2>Run a May/June receivables sprint.</h2>
          <p>Follow up on the {money.format(16990)} open from the two newest months before it ages. Tie deposits or progress billing to future project work.</p>
        </article>
        <article>
          <b>2</b>
          <span>Protect the engine</span>
          <h2>Keep repipe and water heater jobs booked.</h2>
          <p>They make up {pct.format(topServices[0].share + topServices[1].share)} of revenue. Ask top customers for referrals and schedule estimates before slower service months hit.</p>
        </article>
        <article>
          <b>3</b>
          <span>Stabilize base work</span>
          <h2>Restart maintenance contract outreach.</h2>
          <p>Maintenance and emergency work dropped to zero in June. Use that as a recurring-revenue recovery list, not just a service mix footnote.</p>
        </article>
      </section>
    </main>
  )
}
