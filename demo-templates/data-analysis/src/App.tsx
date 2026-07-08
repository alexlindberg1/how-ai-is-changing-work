"use client"

import { useMemo, useState } from "react"
import "./App.css"

type MonthRow = {
  month: string
  invoices: number
  revenue: number
  outstanding: number
  avgInvoice: number
}

type RankedItem = {
  name: string
  revenue: number
  count: number
  average: number
}

type DeclineItem = {
  name: string
  previous: number
  recent: number
  change: number
  pct: number
}

const monthly: MonthRow[] = [
  { month: "2025-07", invoices: 10, revenue: 16560, outstanding: 0, avgInvoice: 1656 },
  { month: "2025-08", invoices: 9, revenue: 10145, outstanding: 0, avgInvoice: 1127 },
  { month: "2025-09", invoices: 10, revenue: 11795, outstanding: 0, avgInvoice: 1180 },
  { month: "2025-10", invoices: 11, revenue: 7175, outstanding: 0, avgInvoice: 652 },
  { month: "2025-11", invoices: 13, revenue: 10085, outstanding: 1610, avgInvoice: 776 },
  { month: "2025-12", invoices: 15, revenue: 15070, outstanding: 0, avgInvoice: 1005 },
  { month: "2026-01", invoices: 16, revenue: 21955, outstanding: 0, avgInvoice: 1372 },
  { month: "2026-02", invoices: 14, revenue: 17225, outstanding: 0, avgInvoice: 1230 },
  { month: "2026-03", invoices: 11, revenue: 14995, outstanding: 1830, avgInvoice: 1363 },
  { month: "2026-04", invoices: 9, revenue: 14825, outstanding: 185, avgInvoice: 1647 },
  { month: "2026-05", invoices: 10, revenue: 23390, outstanding: 7395, avgInvoice: 2339 },
  { month: "2026-06", invoices: 12, revenue: 25445, outstanding: 9595, avgInvoice: 2120 },
]

const topCustomers: RankedItem[] = [
  { name: "Fern Valley Farms", revenue: 18220, count: 9, average: 2024 },
  { name: "Summit Office Park", revenue: 16795, count: 7, average: 2399 },
  { name: "Copper Kettle Bakery", revenue: 14815, count: 7, average: 2116 },
  { name: "Metro Print Shop", revenue: 13595, count: 5, average: 2719 },
  { name: "Cedar Ridge HOA", revenue: 13445, count: 14, average: 960 },
  { name: "Stonebridge Realty", revenue: 12805, count: 5, average: 2561 },
  { name: "Oak & Iron Brewing", revenue: 11030, count: 9, average: 1226 },
]

const topServices: RankedItem[] = [
  { name: "Repipe (partial)", revenue: 88315, count: 17, average: 5195 },
  { name: "Water heater install", revenue: 40370, count: 19, average: 2125 },
  { name: "Maintenance contract", revenue: 18045, count: 15, average: 1203 },
  { name: "Emergency call-out", revenue: 10570, count: 14, average: 755 },
  { name: "Fixture replacement", revenue: 8920, count: 15, average: 595 },
  { name: "Drain cleaning", revenue: 7520, count: 23, average: 327 },
]

const serviceDeclines: DeclineItem[] = [
  { name: "Maintenance contract", previous: 9930, recent: 990, change: -8940, pct: -90 },
  { name: "Emergency call-out", previous: 5575, recent: 1310, change: -4265, pct: -77 },
  { name: "Drain cleaning", previous: 2005, recent: 650, change: -1355, pct: -68 },
  { name: "Backflow testing", previous: 1115, recent: 945, change: -170, pct: -15 },
]

const customerDeclines: DeclineItem[] = [
  { name: "Ridgeline Outfitters", previous: 6395, recent: 0, change: -6395, pct: -100 },
  { name: "Fern Valley Farms", previous: 7150, recent: 825, change: -6325, pct: -88 },
  { name: "Willow Creek Church", previous: 6125, recent: 815, change: -5310, pct: -87 },
  { name: "Bright Path Daycare", previous: 4245, recent: 170, change: -4075, pct: -96 },
  { name: "Bluewater Hotel", previous: 2990, recent: 0, change: -2990, pct: -100 },
]

const outliers = [
  { invoice: "INV-2160", month: "2026-05", customer: "Copper Kettle Bakery", service: "Repipe", amount: 6295, status: "Sent" },
  { invoice: "INV-2176", month: "2026-06", customer: "Metro Print Shop", service: "Repipe", amount: 6145, status: "Paid" },
  { invoice: "INV-2118", month: "2026-01", customer: "Summit Office Park", service: "Repipe", amount: 6080, status: "Paid" },
  { invoice: "INV-2139", month: "2026-03", customer: "Fern Valley Farms", service: "Repipe", amount: 6070, status: "Paid" },
  { invoice: "INV-2179", month: "2026-06", customer: "Summit Office Park", service: "Repipe", amount: 6030, status: "Overdue" },
]

const actions = [
  {
    title: "Protect the repipe surge",
    detail: "Partial repipes produced $44.2k in the last quarter, up 96% from the prior quarter. Create a dedicated estimate follow-up list and reserve crew capacity for these higher-ticket jobs.",
    value: "$21.6k recent lift",
  },
  {
    title: "Win back the quiet accounts",
    detail: "Five customers dropped by $25.1k combined from the prior quarter. Call them with inspection bundles before slower months refill the calendar.",
    value: "5 accounts",
  },
  {
    title: "Tighten collections on large jobs",
    detail: "Outstanding balances climbed to $9.6k in June, including a $6.0k overdue repipe. Ask for deposits on repipes and same-week payment follow-up.",
    value: "$9.6k open",
  },
]

const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value)

const compactMoney = (value: number) =>
  new Intl.NumberFormat("en-US", { notation: "compact", style: "currency", currency: "USD", maximumFractionDigits: 1 }).format(value)

const monthLabel = (value: string) => {
  const [year, month] = value.split("-").map(Number)
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", { month: "short", year: "2-digit" })
}

function total(rows: MonthRow[], key: keyof Pick<MonthRow, "revenue" | "outstanding" | "invoices">) {
  return rows.reduce((sum, row) => sum + row[key], 0)
}

function rankShare(item: RankedItem, max: number) {
  return `${Math.max(6, Math.round((item.revenue / max) * 100))}%`
}

function StatCard({ label, value, context, tone = "neutral" }: { label: string; value: string; context: string; tone?: "neutral" | "good" | "risk" }) {
  return (
    <article className={`stat-card ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{context}</p>
    </article>
  )
}

function TrendChart({ rows }: { rows: MonthRow[] }) {
  const width = 840
  const height = 280
  const pad = 34
  const maxRevenue = Math.max(...rows.map((row) => row.revenue))
  const maxOutstanding = Math.max(...rows.map((row) => row.outstanding), 1)
  const points = rows
    .map((row, index) => {
      const x = pad + (index * (width - pad * 2)) / Math.max(1, rows.length - 1)
      const y = height - pad - (row.revenue / maxRevenue) * (height - pad * 2)
      return `${x},${y}`
    })
    .join(" ")

  return (
    <div className="trend-shell" aria-label="Monthly revenue trend">
      <svg viewBox={`0 0 ${width} ${height}`} role="img">
        <line x1={pad} x2={width - pad} y1={height - pad} y2={height - pad} />
        <line x1={pad} x2={pad} y1={pad} y2={height - pad} />
        <polyline points={points} />
        {rows.map((row, index) => {
          const x = pad + (index * (width - pad * 2)) / Math.max(1, rows.length - 1)
          const y = height - pad - (row.revenue / maxRevenue) * (height - pad * 2)
          const barHeight = (row.outstanding / maxOutstanding) * 58
          return (
            <g key={row.month}>
              <rect className="open-bar" x={x - 11} y={height - pad - barHeight} width="22" height={barHeight} rx="4" />
              <circle cx={x} cy={y} r="6" />
              <text x={x} y={height - 8}>
                {monthLabel(row.month)}
              </text>
              <title>{`${monthLabel(row.month)}: ${money(row.revenue)} revenue, ${money(row.outstanding)} outstanding`}</title>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export function App() {
  const [range, setRange] = useState("12")
  const [ranking, setRanking] = useState<"customers" | "services">("customers")
  const [declineView, setDeclineView] = useState<"services" | "customers">("services")

  const visibleMonths = useMemo(() => monthly.slice(-Number(range)), [range])
  const revenue = total(visibleMonths, "revenue")
  const invoices = total(visibleMonths, "invoices")
  const outstanding = total(visibleMonths, "outstanding")
  const first = visibleMonths[0]
  const last = visibleMonths[visibleMonths.length - 1]
  const periodChange = ((last.revenue - first.revenue) / first.revenue) * 100
  const priorMonth = monthly[monthly.findIndex((row) => row.month === last.month) - 1]
  const momChange = priorMonth ? ((last.revenue - priorMonth.revenue) / priorMonth.revenue) * 100 : 0
  const list = ranking === "customers" ? topCustomers : topServices
  const maxRank = Math.max(...list.map((item) => item.revenue))
  const declineList = declineView === "services" ? serviceDeclines : customerDeclines
  const bestMonth = visibleMonths.reduce((best, row) => (row.revenue > best.revenue ? row : best), visibleMonths[0])
  const worstMonth = visibleMonths.reduce((worst, row) => (row.revenue < worst.revenue ? row : worst), visibleMonths[0])

  return (
    <main className="dashboard">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Summit Plumbing executive dashboard</p>
          <h1>{money(revenue)} revenue in view</h1>
          <p>
            A decision tool for spotting where revenue is coming from, what is slipping, and what to do next.
          </p>
        </div>
        <div className="controls" aria-label="Dashboard period">
          {["3", "6", "12"].map((months) => (
            <button className={range === months ? "active" : ""} key={months} onClick={() => setRange(months)}>
              {months} mo
            </button>
          ))}
        </div>
      </section>

      <section className="stats-grid">
        <StatCard label="Total revenue" value={money(revenue)} context={`${invoices} invoices from ${monthLabel(first.month)} to ${monthLabel(last.month)}`} tone="good" />
        <StatCard label="Latest month" value={money(last.revenue)} context={`${momChange >= 0 ? "+" : ""}${momChange.toFixed(1)}% vs prior month`} tone={momChange >= 0 ? "good" : "risk"} />
        <StatCard label="Avg invoice" value={money(Math.round(revenue / invoices))} context={`${money(bestMonth.revenue)} peak in ${monthLabel(bestMonth.month)}`} />
        <StatCard label="Outstanding" value={money(outstanding)} context={`${money(last.outstanding)} still open in ${monthLabel(last.month)}`} tone={outstanding > 12000 ? "risk" : "neutral"} />
      </section>

      <section className="panel trend-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Month-over-month trend</p>
            <h2>Revenue recovered from {money(worstMonth.revenue)} to {money(bestMonth.revenue)}</h2>
          </div>
          <div className={`delta ${periodChange >= 0 ? "up" : "down"}`}>{periodChange >= 0 ? "+" : ""}{periodChange.toFixed(1)}%</div>
        </div>
        <TrendChart rows={visibleMonths} />
        <div className="legend">
          <span><i className="line-swatch" /> revenue line</span>
          <span><i className="bar-swatch" /> outstanding balance</span>
        </div>
      </section>

      <section className="split">
        <div className="panel">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Top revenue sources</p>
              <h2>{ranking === "customers" ? "Customers" : "Products and services"}</h2>
            </div>
            <div className="segmented">
              <button className={ranking === "customers" ? "active" : ""} onClick={() => setRanking("customers")}>Customers</button>
              <button className={ranking === "services" ? "active" : ""} onClick={() => setRanking("services")}>Services</button>
            </div>
          </div>
          <div className="rank-list">
            {list.map((item) => (
              <article key={item.name} className="rank-row">
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.count} invoices · {money(item.average)} avg</span>
                </div>
                <b>{money(item.revenue)}</b>
                <div className="bar-track"><div style={{ width: rankShare(item, maxRank) }} /></div>
              </article>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Areas of decline</p>
              <h2>{declineView === "services" ? "Service lines" : "Customers"}</h2>
            </div>
            <div className="segmented">
              <button className={declineView === "services" ? "active" : ""} onClick={() => setDeclineView("services")}>Services</button>
              <button className={declineView === "customers" ? "active" : ""} onClick={() => setDeclineView("customers")}>Customers</button>
            </div>
          </div>
          <div className="decline-list">
            {declineList.map((item) => (
              <article key={item.name} className="decline-row">
                <div>
                  <strong>{item.name}</strong>
                  <span>{money(item.previous)} prior qtr to {money(item.recent)} recent qtr</span>
                </div>
                <b>{money(item.change)}</b>
                <small>{item.pct}%</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="split bottom">
        <div className="panel">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Unusual changes</p>
              <h2>Large invoice outliers</h2>
            </div>
            <span className="pill">{compactMoney(6295)} max invoice</span>
          </div>
          <div className="outlier-table">
            {outliers.map((item) => (
              <article key={item.invoice}>
                <span>{item.invoice}</span>
                <strong>{item.customer}</strong>
                <em>{item.service} · {item.month}</em>
                <b>{money(item.amount)}</b>
                <i className={item.status.toLowerCase()}>{item.status}</i>
              </article>
            ))}
          </div>
        </div>

        <div className="actions-panel">
          <p className="eyebrow">Recommended actions</p>
          <h2>Next three moves</h2>
          {actions.map((action, index) => (
            <article key={action.title} className="action">
              <span>{index + 1}</span>
              <div>
                <strong>{action.title}</strong>
                <p>{action.detail}</p>
              </div>
              <b>{action.value}</b>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
