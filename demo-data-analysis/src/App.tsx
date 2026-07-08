"use client"

import { useMemo, useState } from 'react'
import './App.css'

type MonthRecord = {
  month: string
  invoices: number
  revenue: number
  outstanding: number
  avgInvoice: number
}

type SeriesRecord = {
  name: string
  values: number[]
  total: number
  latest: number
  previous: number
  change: number
}

type CustomerAccount = {
  name: string
  invoices: number
  revenue: number
  paid: number
  outstanding: number
  lastJob: string
}

type ViewKey = 'overview' | 'customers' | 'services' | 'risks'
type RangeKey = '12m' | '6m' | '3m' | 'latest'
type Tone = 'good' | 'bad' | 'neutral'

const months: MonthRecord[] = [
  { month: '2025-07', invoices: 10, revenue: 16560, outstanding: 0, avgInvoice: 1656 },
  { month: '2025-08', invoices: 9, revenue: 10145, outstanding: 0, avgInvoice: 1127 },
  { month: '2025-09', invoices: 10, revenue: 11795, outstanding: 0, avgInvoice: 1180 },
  { month: '2025-10', invoices: 11, revenue: 7175, outstanding: 0, avgInvoice: 652 },
  { month: '2025-11', invoices: 13, revenue: 10085, outstanding: 1610, avgInvoice: 776 },
  { month: '2025-12', invoices: 15, revenue: 15070, outstanding: 0, avgInvoice: 1005 },
  { month: '2026-01', invoices: 16, revenue: 21955, outstanding: 0, avgInvoice: 1372 },
  { month: '2026-02', invoices: 14, revenue: 17225, outstanding: 0, avgInvoice: 1230 },
  { month: '2026-03', invoices: 11, revenue: 14995, outstanding: 1830, avgInvoice: 1363 },
  { month: '2026-04', invoices: 9, revenue: 14825, outstanding: 185, avgInvoice: 1647 },
  { month: '2026-05', invoices: 10, revenue: 23390, outstanding: 7395, avgInvoice: 2339 },
  { month: '2026-06', invoices: 12, revenue: 25445, outstanding: 9595, avgInvoice: 2120 },
]

const services: SeriesRecord[] = [
  {
    name: 'Repipe (partial)',
    values: [5645, 4345, 8375, 0, 0, 3195, 10575, 5940, 6070, 8665, 17465, 18040],
    total: 88315,
    latest: 18040,
    previous: 17465,
    change: 575,
  },
  {
    name: 'Water heater install',
    values: [5680, 2220, 0, 1940, 3855, 6895, 4415, 2545, 2215, 2215, 3640, 4750],
    total: 40370,
    latest: 4750,
    previous: 3640,
    change: 1110,
  },
  {
    name: 'Maintenance contract',
    values: [3060, 1995, 0, 0, 1230, 840, 895, 4745, 4290, 990, 0, 0],
    total: 18045,
    latest: 0,
    previous: 0,
    change: 0,
  },
  {
    name: 'Emergency call-out',
    values: [1020, 0, 0, 1725, 940, 0, 2735, 2015, 825, 730, 580, 0],
    total: 10570,
    latest: 0,
    previous: 580,
    change: -580,
  },
  {
    name: 'Fixture replacement',
    values: [605, 1025, 810, 765, 1230, 870, 885, 0, 735, 1545, 0, 450],
    total: 8920,
    latest: 450,
    previous: 0,
    change: 450,
  },
  {
    name: 'Drain cleaning',
    values: [0, 405, 2175, 1395, 190, 700, 0, 1780, 225, 0, 305, 345],
    total: 7520,
    latest: 345,
    previous: 305,
    change: 40,
  },
  {
    name: 'Sewer line inspection',
    values: [550, 0, 435, 1195, 1650, 625, 1080, 0, 0, 495, 0, 860],
    total: 6890,
    latest: 860,
    previous: 0,
    change: 860,
  },
  {
    name: 'Leak repair',
    values: [0, 0, 0, 0, 415, 1780, 765, 0, 325, 0, 1115, 525],
    total: 4925,
    latest: 525,
    previous: 1115,
    change: -590,
  },
  {
    name: 'Backflow testing',
    values: [0, 155, 0, 155, 575, 165, 605, 200, 310, 185, 285, 475],
    total: 3110,
    latest: 475,
    previous: 285,
    change: 190,
  },
]

const customers: SeriesRecord[] = [
  { name: 'Fern Valley Farms', values: [0, 4800, 4505, 0, 940, 0, 1080, 0, 6070, 825, 0, 0], total: 18220, latest: 0, previous: 0, change: 0 },
  { name: 'Summit Office Park', values: [550, 0, 435, 0, 0, 590, 6080, 855, 0, 0, 0, 8285], total: 16795, latest: 8285, previous: 0, change: 8285 },
  { name: 'Copper Kettle Bakery', values: [2415, 885, 0, 0, 0, 2995, 0, 1415, 810, 0, 6295, 0], total: 14815, latest: 0, previous: 6295, change: -6295 },
  { name: 'Metro Print Shop', values: [0, 0, 0, 0, 0, 625, 0, 0, 960, 0, 0, 12010], total: 13595, latest: 12010, previous: 0, change: 12010 },
  { name: 'Cedar Ridge HOA', values: [6080, 0, 0, 560, 275, 590, 295, 3760, 0, 495, 890, 500], total: 13445, latest: 500, previous: 890, change: -390 },
  { name: 'Stonebridge Realty', values: [0, 185, 0, 565, 0, 0, 0, 6700, 0, 0, 5355, 0], total: 12805, latest: 0, previous: 5355, change: -5355 },
  { name: 'Oak & Iron Brewing', values: [0, 0, 705, 2570, 0, 2155, 545, 0, 0, 4475, 580, 0], total: 11030, latest: 0, previous: 580, change: -580 },
  { name: 'Willow Creek Church', values: [0, 220, 425, 0, 0, 3195, 3605, 305, 2215, 0, 815, 0], total: 10780, latest: 0, previous: 815, change: -815 },
  { name: 'Harbor Fitness', values: [0, 0, 0, 155, 785, 235, 0, 425, 1265, 990, 2050, 2495], total: 8400, latest: 2495, previous: 2050, change: 445 },
  { name: 'Maple Street Clinic', values: [0, 725, 3870, 765, 0, 290, 1070, 340, 610, 720, 0, 0], total: 8390, latest: 0, previous: 0, change: 0 },
  { name: 'Ridgeline Outfitters', values: [585, 0, 0, 1070, 300, 0, 6395, 0, 0, 0, 0, 0], total: 8350, latest: 0, previous: 0, change: 0 },
  { name: 'Sunrise Assisted Living', values: [0, 0, 0, 0, 1610, 165, 0, 280, 0, 0, 5815, 0], total: 7870, latest: 0, previous: 5815, change: -5815 },
  { name: 'Pinnacle Auto Body', values: [0, 0, 435, 0, 640, 0, 1225, 0, 0, 4920, 0, 305], total: 7525, latest: 305, previous: 0, change: 305 },
  { name: 'Grove Elementary PTA', values: [1805, 2220, 0, 415, 900, 690, 0, 0, 325, 0, 0, 525], total: 6880, latest: 525, previous: 0, change: 525 },
  { name: 'Lakeside Property Mgmt', values: [605, 0, 0, 0, 2435, 2160, 310, 0, 0, 0, 0, 810], total: 6320, latest: 810, previous: 0, change: 810 },
  { name: 'North End Diner', values: [2900, 1110, 205, 0, 415, 0, 0, 0, 0, 0, 1590, 0], total: 6220, latest: 0, previous: 1590, change: -1590 },
  { name: 'Bright Path Daycare', values: [0, 0, 0, 655, 555, 540, 1100, 3145, 0, 0, 0, 170], total: 6165, latest: 170, previous: 0, change: 170 },
  { name: 'River Caf\u00e9', values: [1620, 0, 405, 0, 1230, 0, 0, 0, 0, 2400, 0, 345], total: 6000, latest: 345, previous: 0, change: 345 },
  { name: 'Bluewater Hotel', values: [0, 0, 810, 0, 0, 840, 250, 0, 2740, 0, 0, 0], total: 4640, latest: 0, previous: 0, change: 0 },
  { name: 'Hilltop Dental Group', values: [0, 0, 0, 420, 0, 0, 0, 0, 0, 0, 0, 0], total: 420, latest: 0, previous: 0, change: 0 },
]

const customerAccounts: CustomerAccount[] = [
  { name: 'Fern Valley Farms', invoices: 9, revenue: 18220, paid: 18220, outstanding: 0, lastJob: '2026-04-24' },
  { name: 'Summit Office Park', invoices: 7, revenue: 16795, paid: 8510, outstanding: 8285, lastJob: '2026-06-26' },
  { name: 'Copper Kettle Bakery', invoices: 7, revenue: 14815, paid: 8520, outstanding: 6295, lastJob: '2026-05-21' },
  { name: 'Metro Print Shop', invoices: 5, revenue: 13595, paid: 13370, outstanding: 225, lastJob: '2026-06-28' },
  { name: 'Cedar Ridge HOA', invoices: 14, revenue: 13445, paid: 12660, outstanding: 785, lastJob: '2026-06-14' },
  { name: 'Stonebridge Realty', invoices: 5, revenue: 12805, paid: 12805, outstanding: 0, lastJob: '2026-05-26' },
  { name: 'Oak & Iron Brewing', invoices: 9, revenue: 11030, paid: 11030, outstanding: 0, lastJob: '2026-05-23' },
  { name: 'Willow Creek Church', invoices: 9, revenue: 10780, paid: 9965, outstanding: 815, lastJob: '2026-05-25' },
  { name: 'Harbor Fitness', invoices: 8, revenue: 8400, paid: 8400, outstanding: 0, lastJob: '2026-06-03' },
  { name: 'Maple Street Clinic', invoices: 9, revenue: 8390, paid: 8390, outstanding: 0, lastJob: '2026-04-23' },
  { name: 'Ridgeline Outfitters', invoices: 5, revenue: 8350, paid: 8350, outstanding: 0, lastJob: '2026-01-22' },
  { name: 'Sunrise Assisted Living', invoices: 4, revenue: 7870, paid: 6260, outstanding: 1610, lastJob: '2026-05-04' },
  { name: 'Pinnacle Auto Body', invoices: 6, revenue: 7525, paid: 7525, outstanding: 0, lastJob: '2026-06-08' },
  { name: 'Grove Elementary PTA', invoices: 9, revenue: 6880, paid: 6880, outstanding: 0, lastJob: '2026-06-07' },
  { name: 'Lakeside Property Mgmt', invoices: 7, revenue: 6320, paid: 5510, outstanding: 810, lastJob: '2026-06-03' },
  { name: 'North End Diner', invoices: 6, revenue: 6220, paid: 6220, outstanding: 0, lastJob: '2026-05-21' },
  { name: 'Bright Path Daycare', invoices: 8, revenue: 6165, paid: 6165, outstanding: 0, lastJob: '2026-06-28' },
  { name: 'River Caf\u00e9', invoices: 6, revenue: 6000, paid: 5815, outstanding: 185, lastJob: '2026-06-06' },
  { name: 'Bluewater Hotel', invoices: 6, revenue: 4640, paid: 3035, outstanding: 1605, lastJob: '2026-03-26' },
  { name: 'Hilltop Dental Group', invoices: 1, revenue: 420, paid: 420, outstanding: 0, lastJob: '2025-10-11' },
]

const invoiceOutliers = [
  { invoice: 'INV-2160', month: '2026-05', customer: 'Copper Kettle Bakery', service: 'Repipe (partial)', amount: 6295, status: 'Sent' },
  { invoice: 'INV-2176', month: '2026-06', customer: 'Metro Print Shop', service: 'Repipe (partial)', amount: 6145, status: 'Paid' },
  { invoice: 'INV-2118', month: '2026-01', customer: 'Summit Office Park', service: 'Repipe (partial)', amount: 6080, status: 'Paid' },
  { invoice: 'INV-2139', month: '2026-03', customer: 'Fern Valley Farms', service: 'Repipe (partial)', amount: 6070, status: 'Paid' },
  { invoice: 'INV-2179', month: '2026-06', customer: 'Summit Office Park', service: 'Repipe (partial)', amount: 6030, status: 'Overdue' },
  { invoice: 'INV-2133', month: '2026-02', customer: 'Stonebridge Realty', service: 'Repipe (partial)', amount: 5940, status: 'Paid' },
  { invoice: 'INV-2171', month: '2026-06', customer: 'Metro Print Shop', service: 'Repipe (partial)', amount: 5865, status: 'Paid' },
  { invoice: 'INV-2164', month: '2026-05', customer: 'Sunrise Assisted Living', service: 'Repipe (partial)', amount: 5815, status: 'Paid' },
]

const statusMix = [
  { name: 'Paid', invoices: 127, revenue: 168050 },
  { name: 'Overdue', invoices: 8, revenue: 12665 },
  { name: 'Sent', invoices: 5, revenue: 7950 },
]

const serviceNotes: Record<string, string> = {
  'Repipe (partial)': 'Highest-ticket work and the main growth engine.',
  'Water heater install': 'Healthy repeatable project work with June momentum.',
  'Maintenance contract': 'Recurring base went quiet in May and June.',
  'Emergency call-out': 'Dropped to zero in June after steady prior activity.',
  'Fixture replacement': 'Small-ticket work returned after a soft May.',
  'Drain cleaning': 'Low but stable add-on demand.',
  'Sewer line inspection': 'Recovered in June after two quiet months.',
  'Leak repair': 'Pulled back sharply in June.',
  'Backflow testing': 'Small, consistent compliance work.',
}

const openBalances = [
  { customer: 'Summit Office Park', status: 'Overdue', amount: 8285 },
  { customer: 'Copper Kettle Bakery', status: 'Sent', amount: 6295 },
  { customer: 'Sunrise Assisted Living', status: 'Overdue', amount: 1610 },
  { customer: 'Bluewater Hotel', status: 'Overdue', amount: 1605 },
  { customer: 'Cedar Ridge HOA', status: 'Sent', amount: 785 },
  { customer: 'Willow Creek Church', status: 'Mixed open', amount: 815 },
  { customer: 'Lakeside Property Mgmt', status: 'Mixed open', amount: 810 },
  { customer: 'Metro Print Shop', status: 'Overdue', amount: 225 },
  { customer: 'River Café', status: 'Overdue', amount: 185 },
]

const workbookStats = {
  invoices: 140,
  customers: 20,
  services: 9,
}

const rangeOptions: { key: RangeKey; label: string; count: number }[] = [
  { key: '12m', label: '12 months', count: 12 },
  { key: '6m', label: '6 months', count: 6 },
  { key: '3m', label: '3 months', count: 3 },
  { key: 'latest', label: 'June', count: 1 },
]

const views: { key: ViewKey; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'customers', label: 'Customers' },
  { key: 'services', label: 'Services' },
  { key: 'risks', label: 'Risks' },
]

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const compactMoney = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
})

const percent = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 1,
})

function labelMonth(month: string) {
  const [year, monthNumber] = month.split('-').map(Number)
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(
    new Date(year, monthNumber - 1),
  )
}

function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0)
}

function rangeIndexes(range: RangeKey) {
  const count = rangeOptions.find((option) => option.key === range)?.count ?? 12
  const start = months.length - count
  return Array.from({ length: count }, (_, index) => start + index)
}

function seriesValueInRange(series: SeriesRecord, indexes: number[]) {
  return indexes.reduce((total, index) => total + series.values[index], 0)
}

function monthOverMonth(index: number) {
  if (index === 0) return null
  const previous = months[index - 1].revenue
  return (months[index].revenue - previous) / previous
}

function signedMoney(value: number) {
  const prefix = value > 0 ? '+' : value < 0 ? '-' : ''
  return `${prefix}${money.format(Math.abs(value))}`
}

function share(value: number, total: number) {
  return percent.format(value / Math.max(total, 1))
}

function linePath(points: { x: number; y: number }[]) {
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
}

function RevenueTrend({
  indexes,
  selectedIndex,
  onSelect,
}: {
  indexes: number[]
  selectedIndex: number
  onSelect: (index: number) => void
}) {
  const width = 720
  const height = 260
  const padding = { top: 24, right: 24, bottom: 48, left: 62 }
  const visible = indexes.map((index) => months[index])
  const maxRevenue = Math.max(...visible.map((month) => month.revenue)) * 1.1
  const minRevenue = Math.min(...visible.map((month) => month.revenue)) * 0.85
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  const points = indexes.map((index, pointIndex) => {
    const month = months[index]
    const x = padding.left + (chartWidth * pointIndex) / Math.max(indexes.length - 1, 1)
    const y =
      padding.top +
      chartHeight -
      ((month.revenue - minRevenue) / Math.max(maxRevenue - minRevenue, 1)) * chartHeight
    return { index, x, y, month }
  })
  const selectedPoint = points.find((point) => point.index === selectedIndex) ?? points.at(-1)

  return (
    <div className="chart-frame">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Monthly revenue trend">
        <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} className="axis" />
        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right}
          y2={height - padding.bottom}
          className="axis"
        />
        {[0, 0.5, 1].map((step) => {
          const y = padding.top + chartHeight * step
          const value = maxRevenue - (maxRevenue - minRevenue) * step
          return (
            <g key={step}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} className="grid-line" />
              <text x={padding.left - 12} y={y + 4} textAnchor="end" className="axis-label">
                {compactMoney.format(value)}
              </text>
            </g>
          )
        })}
        <path d={linePath(points)} className="revenue-line" />
        {points.map((point) => {
          const isSelected = point.index === selectedIndex
          const barHeight = height - padding.bottom - point.y
          return (
            <g
              key={point.month.month}
              role="button"
              tabIndex={0}
              aria-label={`${labelMonth(point.month.month)} ${money.format(point.month.revenue)}`}
              onClick={() => onSelect(point.index)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') onSelect(point.index)
              }}
              className="trend-hit"
            >
              <rect
                x={point.x - 10}
                y={point.y}
                width={20}
                height={barHeight}
                rx={4}
                className={isSelected ? 'trend-bar selected' : 'trend-bar'}
              />
              <circle cx={point.x} cy={point.y} r={isSelected ? 7 : 5} className={isSelected ? 'point selected' : 'point'} />
              <text x={point.x} y={height - 20} textAnchor="middle" className="month-tick">
                {point.month.month.slice(5)}
              </text>
            </g>
          )
        })}
        {selectedPoint ? (
          <g>
            <line
              x1={selectedPoint.x}
              y1={padding.top}
              x2={selectedPoint.x}
              y2={height - padding.bottom}
              className="selected-rule"
            />
            <text x={selectedPoint.x} y={selectedPoint.y - 14} textAnchor="middle" className="selected-label">
              {compactMoney.format(selectedPoint.month.revenue)}
            </text>
          </g>
        ) : null}
      </svg>
    </div>
  )
}

function MiniBars({ series, indexes }: { series: SeriesRecord; indexes: number[] }) {
  const values = indexes.map((index) => series.values[index])
  const maxValue = Math.max(...values, 1)

  return (
    <div className="mini-bars" aria-label={`${series.name} monthly revenue bars`}>
      {values.map((value, index) => (
        <span
          key={`${series.name}-${indexes[index]}`}
          style={{ height: `${Math.max(8, (value / maxValue) * 52)}px` }}
          title={`${labelMonth(months[indexes[index]].month)}: ${money.format(value)}`}
        />
      ))}
    </div>
  )
}

function RankedList({
  items,
  maxValue,
  selected,
  onSelect,
}: {
  items: { name: string; value: number; helper: string; tone?: 'good' | 'bad' | 'neutral' }[]
  maxValue: number
  selected?: string
  onSelect?: (name: string) => void
}) {
  return (
    <div className="ranked-list">
      {items.map((item, index) => {
        const width = `${Math.max(4, (item.value / Math.max(maxValue, 1)) * 100)}%`
        const Tag = onSelect ? 'button' : 'div'

        return (
          <Tag
            key={item.name}
            className={selected === item.name ? 'ranked-row active' : 'ranked-row'}
            onClick={onSelect ? () => onSelect(item.name) : undefined}
          >
            <span className="rank-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="rank-content">
              <span className="rank-name">{item.name}</span>
              <span className={`rank-helper ${item.tone ?? 'neutral'}`}>{item.helper}</span>
              <span className="rank-track">
                <span style={{ width }} />
              </span>
            </span>
            <strong>{money.format(item.value)}</strong>
          </Tag>
        )
      })}
    </div>
  )
}

function DeltaBadge({ value }: { value: number | null }) {
  if (value === null) return <span className="badge muted">New base</span>
  const tone = value >= 0 ? 'positive' : 'negative'

  return <span className={`badge ${tone}`}>{value >= 0 ? '+' : ''}{percent.format(value)}</span>
}

function InsightCard({
  label,
  value,
  detail,
  tone = 'neutral',
}: {
  label: string
  value: string
  detail: string
  tone?: Tone
}) {
  return (
    <article className={`insight-card ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  )
}

function DecisionMetric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="decision-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  )
}

function SignalTile({
  label,
  value,
  detail,
  tone = 'neutral',
}: {
  label: string
  value: string
  detail: string
  tone?: Tone
}) {
  return (
    <article className={`signal-tile ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  )
}

export function App() {
  const [range, setRange] = useState<RangeKey>('12m')
  const [view, setView] = useState<ViewKey>('overview')
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(months.length - 1)
  const [selectedCustomer, setSelectedCustomer] = useState('Summit Office Park')
  const [selectedService, setSelectedService] = useState('Repipe (partial)')

  const indexes = useMemo(() => rangeIndexes(range), [range])
  const selectedMonth = months[selectedMonthIndex]
  const rangeMonths = indexes.map((index) => months[index])
  const revenueInRange = sum(rangeMonths.map((month) => month.revenue))
  const invoicesInRange = sum(rangeMonths.map((month) => month.invoices))
  const outstandingInRange = sum(rangeMonths.map((month) => month.outstanding))
  const averageInvoice = revenueInRange / Math.max(invoicesInRange, 1)
  const rangeStart = months[indexes[0]]
  const rangeEnd = months[indexes[indexes.length - 1]]
  const topCustomerRows = customers
    .map((customer) => {
      const account = customerAccounts.find((candidate) => candidate.name === customer.name)
      return {
        ...customer,
        rangeValue: seriesValueInRange(customer, indexes),
        outstanding: account?.outstanding ?? 0,
        lastJob: account?.lastJob ?? '',
      }
    })
    .filter((customer) => customer.rangeValue > 0)
    .sort((a, b) => b.rangeValue - a.rangeValue)
  const topServiceRows = services
    .map((service) => ({
      ...service,
      rangeValue: seriesValueInRange(service, indexes),
      selectedMonthValue: service.values[selectedMonthIndex],
    }))
    .filter((service) => service.rangeValue > 0)
    .sort((a, b) => b.rangeValue - a.rangeValue)
  const selectedCustomerSeries = customers.find((customer) => customer.name === selectedCustomer) ?? customers[1]
  const selectedCustomerAccount = customerAccounts.find((account) => account.name === selectedCustomerSeries.name)
  const selectedServiceSeries = services.find((service) => service.name === selectedService) ?? services[0]
  const decliningCustomers = customers
    .map((customer) => ({
      name: customer.name,
      latest: customer.latest,
      previous: customer.previous,
      change: customer.change,
    }))
    .filter((customer) => customer.change < 0)
    .sort((a, b) => a.change - b.change)
  const decliningServices = services
    .map((service) => ({
      name: service.name,
      latest: service.latest,
      previous: service.previous,
      change: service.change,
    }))
    .filter((service) => service.change < 0)
    .sort((a, b) => a.change - b.change)
  const totalRevenue = sum(months.map((month) => month.revenue))
  const totalOutstanding = sum(statusMix.filter((status) => status.name !== 'Paid').map((status) => status.revenue))
  const repipeShare = services[0].total / totalRevenue
  const cashConversion = (totalRevenue - totalOutstanding) / totalRevenue
  const latestMom = monthOverMonth(months.length - 1)
  const selectedMom = monthOverMonth(selectedMonthIndex)
  const priorMonth = selectedMonthIndex > 0 ? months[selectedMonthIndex - 1] : null
  const topFiveCustomersRevenue = customers.slice(0, 5).reduce((total, customer) => total + customer.total, 0)
  const topOpenBalance = openBalances[0]
  const openBalanceCoverage = openBalances.slice(0, 2).reduce((total, balance) => total + balance.amount, 0)
  const largestMonthlyDrop = months
    .map((month, index) => ({ month, mom: monthOverMonth(index) }))
    .filter((item): item is { month: MonthRecord; mom: number } => item.mom !== null)
    .sort((a, b) => a.mom - b.mom)[0]
  const customerMovers = customers
    .filter((customer) => customer.change !== 0)
    .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
  const serviceMovers = services
    .filter((service) => service.change !== 0)
    .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
  const juneGrowth = months.at(-1)!.revenue - months.at(-2)!.revenue
  const bestMonth = [...months].sort((a, b) => b.revenue - a.revenue)[0]
  const positiveCustomerSwing = customerMovers
    .filter((customer) => customer.change > 0)
    .reduce((total, customer) => total + customer.change, 0)
  const negativeCustomerSwing = Math.abs(
    customerMovers.filter((customer) => customer.change < 0).reduce((total, customer) => total + customer.change, 0),
  )
  const juneRepipeShare = services[0].latest / Math.max(months.at(-1)!.revenue, 1)
  const juneOpenShare = months.at(-1)!.outstanding / Math.max(months.at(-1)!.revenue, 1)
  const revenueStreakMonths = months
    .slice()
    .reverse()
    .reduce((streak, month, reverseIndex, reversed) => {
      if (reverseIndex === 0) return 1
      const previousChronological = reversed[reverseIndex - 1]
      return streak === reverseIndex && previousChronological.revenue > month.revenue ? streak + 1 : streak
    }, 0)
  const selectedMonthServices = services
    .map((service) => ({ name: service.name, value: service.values[selectedMonthIndex] }))
    .filter((service) => service.value > 0)
    .sort((a, b) => b.value - a.value)
  const selectedMonthCustomers = customers
    .map((customer) => ({ name: customer.name, value: customer.values[selectedMonthIndex] }))
    .filter((customer) => customer.value > 0)
    .sort((a, b) => b.value - a.value)
  const selectedMonthOpenShare = selectedMonth.outstanding / Math.max(selectedMonth.revenue, 1)
  const openAccounts = customerAccounts.filter((account) => account.outstanding > 0).length
  const maxCustomerValue = Math.max(...topCustomerRows.slice(0, 8).map((customer) => customer.rangeValue), 1)
  const maxServiceValue = Math.max(...topServiceRows.slice(0, 8).map((service) => service.rangeValue), 1)

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Summit Plumbing Financials</p>
          <h1>Executive Revenue Dashboard</h1>
          <p className="header-copy">
            Interactive workbook analysis from {labelMonth(months[0].month)} through {labelMonth(months.at(-1)!.month)}
            , built around the decisions a business owner needs to make next.
          </p>
          <div className="source-strip" aria-label="Workbook coverage">
            <span>{workbookStats.invoices} invoices</span>
            <span>{workbookStats.customers} customers</span>
            <span>{workbookStats.services} services</span>
            <span>source/summit-plumbing-financials.xlsx</span>
          </div>
        </div>
        <div className="range-control" aria-label="Reporting period">
          {rangeOptions.map((option) => (
            <button
              key={option.key}
              className={range === option.key ? 'active' : ''}
              onClick={() => {
                setRange(option.key)
                setSelectedMonthIndex(months.length - 1)
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </header>

      <section className="kpi-grid" aria-label="Revenue highlights">
        <article className="kpi-card total">
          <span>Total revenue</span>
          <strong>{money.format(totalRevenue)}</strong>
          <small>{range === '12m' ? 'Full workbook period' : `${money.format(revenueInRange)} in selected range`}</small>
        </article>
        <article className="kpi-card">
          <span>Latest month</span>
          <strong>{money.format(months.at(-1)!.revenue)}</strong>
          <small><DeltaBadge value={latestMom} /> vs May 2026</small>
        </article>
        <article className="kpi-card warning">
          <span>Unpaid exposure</span>
          <strong>{money.format(totalOutstanding)}</strong>
          <small>{share(totalOutstanding, totalRevenue)} of revenue is not yet collected</small>
        </article>
        <article className="kpi-card">
          <span>Top revenue engine</span>
          <strong>{percent.format(repipeShare)}</strong>
          <small>of revenue from partial repipes</small>
        </article>
      </section>

      <nav className="view-tabs" aria-label="Dashboard views">
        {views.map((item) => (
          <button key={item.key} className={view === item.key ? 'active' : ''} onClick={() => setView(item.key)}>
            {item.label}
          </button>
        ))}
      </nav>

      <section className="decision-band">
        <div>
          <span>Recommended next move</span>
          <strong>Collect the largest unpaid balances before adding more June-sized jobs.</strong>
        </div>
        <p>
          {topOpenBalance.customer} alone has {money.format(topOpenBalance.amount)} open. The top two balances represent{' '}
          {share(openBalanceCoverage, totalOutstanding)} of all unpaid exposure, so one tight collection push can unlock most
          of the cash risk without distracting the crew from booked work.
        </p>
      </section>

      <section className="insight-grid" aria-label="Executive signals">
        <InsightCard
          label="June momentum"
          value={signedMoney(juneGrowth)}
          detail="Revenue grew again in June, but at a slower pace than the May surge."
          tone="good"
        />
        <InsightCard
          label="Customer concentration"
          value={share(topFiveCustomersRevenue, totalRevenue)}
          detail="The top five customers drive a meaningful share of total revenue."
        />
        <InsightCard
          label="Largest soft spot"
          value={`${labelMonth(largestMonthlyDrop.month.month)} ${percent.format(largestMonthlyDrop.mom)}`}
          detail="October was the steepest month-over-month drop in the workbook."
          tone="bad"
        />
      </section>

      <section className="signal-strip" aria-label="Decision diagnostics">
        <SignalTile
          label="June dependency"
          value={percent.format(juneRepipeShare)}
          detail="of June revenue came from partial repipes, so one large-job category is carrying the month."
        />
        <SignalTile
          label="June cash lag"
          value={percent.format(juneOpenShare)}
          detail={`${money.format(months.at(-1)!.outstanding)} of June revenue is still open.`}
          tone="bad"
        />
        <SignalTile
          label="Growth offset"
          value={money.format(positiveCustomerSwing)}
          detail={`New June lift overcame ${money.format(negativeCustomerSwing)} of customer declines.`}
          tone="good"
        />
        <SignalTile
          label="Revenue streak"
          value={`${revenueStreakMonths} months`}
          detail="April through June moved in the right direction after the February-March pullback."
          tone="good"
        />
      </section>

      <section className="workspace-grid">
        <article className="panel wide">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Revenue Trend</p>
              <h2>{labelMonth(rangeStart.month)} to {labelMonth(rangeEnd.month)}</h2>
            </div>
            <div className="panel-stat">
              <span>{money.format(revenueInRange)}</span>
              <small>{invoicesInRange} invoices</small>
            </div>
          </div>
          <RevenueTrend indexes={indexes} selectedIndex={selectedMonthIndex} onSelect={setSelectedMonthIndex} />
          <div className="month-summary">
            <div>
              <span>Selected month</span>
              <strong>{labelMonth(selectedMonth.month)}</strong>
            </div>
            <div>
              <span>Revenue</span>
              <strong>{money.format(selectedMonth.revenue)}</strong>
            </div>
            <div>
              <span>MoM change</span>
              <strong className={selectedMom !== null && selectedMom < 0 ? 'negative-text' : 'positive-text'}>
                {selectedMom === null ? 'First month' : `${selectedMom >= 0 ? '+' : ''}${percent.format(selectedMom)}`}
              </strong>
            </div>
            <div>
              <span>Prior month</span>
              <strong>{priorMonth ? money.format(priorMonth.revenue) : 'n/a'}</strong>
            </div>
            <div>
              <span>Outstanding</span>
              <strong>{money.format(selectedMonth.outstanding)}</strong>
            </div>
          </div>
          <div className="driver-grid" aria-label="Selected month drivers">
            <div>
              <span>Top customer in selected month</span>
              <strong>{selectedMonthCustomers[0]?.name ?? 'No revenue'}</strong>
              <small>{money.format(selectedMonthCustomers[0]?.value ?? 0)}</small>
            </div>
            <div>
              <span>Top service in selected month</span>
              <strong>{selectedMonthServices[0]?.name ?? 'No revenue'}</strong>
              <small>{money.format(selectedMonthServices[0]?.value ?? 0)}</small>
            </div>
            <div>
              <span>Cash pressure</span>
              <strong>{percent.format(selectedMonthOpenShare)}</strong>
              <small>of selected-month revenue remains open</small>
            </div>
          </div>
        </article>

        <article className="panel">
          <div className="panel-heading compact">
            <div>
              <p className="eyebrow">Three Actions</p>
              <h2>Owner Priorities</h2>
            </div>
          </div>
          <div className="priority-callout">
            <DecisionMetric
              label="Cash to collect"
              value={money.format(totalOutstanding)}
              detail={`${openAccounts} customer accounts with open balances`}
            />
            <DecisionMetric
              label="Cash conversion"
              value={percent.format(cashConversion)}
              detail="paid revenue across the workbook period"
            />
            <DecisionMetric
              label="Best month"
              value={labelMonth(bestMonth.month)}
              detail={`${money.format(bestMonth.revenue)} booked`}
            />
          </div>
          <div className="actions">
            <div className="action-row urgent">
              <span>1</span>
              <p><strong>Collect open invoices.</strong> Call Summit Office Park and Copper Kettle Bakery first; together they represent {share(openBalanceCoverage, totalOutstanding)} of unpaid revenue.</p>
            </div>
            <div className="action-row">
              <span>2</span>
              <p><strong>Attach recurring work to repipe jobs.</strong> Offer an inspection or maintenance plan after every repipe; repipes are {percent.format(repipeShare)} of revenue, while maintenance was $0 in May and June.</p>
            </div>
            <div className="action-row">
              <span>3</span>
              <p><strong>Rebuild quick-response demand.</strong> Leak repair and emergency call-outs both dropped in June; use service reminders and same-week availability to restore small-job flow.</p>
            </div>
          </div>
        </article>
      </section>

      {view === 'overview' ? (
        <section className="content-grid">
          <article className="panel">
            <div className="panel-heading compact">
              <div>
                <p className="eyebrow">Customer Mix</p>
                <h2>Top Customers</h2>
              </div>
              <span className="subtle">{rangeOptions.find((option) => option.key === range)?.label}</span>
            </div>
            <RankedList
              items={topCustomerRows.slice(0, 6).map((customer) => ({
                name: customer.name,
                value: customer.rangeValue,
                helper: customer.outstanding ? `${money.format(customer.outstanding)} open` : `Last job ${customer.lastJob}`,
                tone: customer.outstanding ? 'bad' : 'neutral',
              }))}
              maxValue={maxCustomerValue}
              selected={selectedCustomer}
              onSelect={(name) => {
                setSelectedCustomer(name)
                setView('customers')
              }}
            />
          </article>
          <article className="panel">
            <div className="panel-heading compact">
              <div>
                <p className="eyebrow">Service Mix</p>
                <h2>What Sold</h2>
              </div>
              <span className="subtle">Avg invoice {money.format(averageInvoice)}</span>
            </div>
            <RankedList
              items={topServiceRows.slice(0, 6).map((service) => ({
                name: service.name,
                value: service.rangeValue,
                helper: `${signedMoney(service.change)} vs May`,
                tone: service.change < 0 ? 'bad' : service.change > 0 ? 'good' : 'neutral',
              }))}
              maxValue={maxServiceValue}
              selected={selectedService}
              onSelect={(name) => {
                setSelectedService(name)
                setView('services')
              }}
            />
          </article>
        </section>
      ) : null}

      {view === 'overview' ? (
        <section className="content-grid">
          <article className="panel">
            <div className="panel-heading compact">
              <div>
                <p className="eyebrow">Why June Changed</p>
                <h2>Biggest Customer Swings</h2>
              </div>
            </div>
            <div className="movement-list">
              {customerMovers.slice(0, 6).map((customer) => (
                <button
                  className={customer.change < 0 ? 'movement-row down' : 'movement-row up'}
                  key={customer.name}
                  onClick={() => {
                    setSelectedCustomer(customer.name)
                    setView('customers')
                  }}
                >
                  <span>{customer.name}</span>
                  <strong>{signedMoney(customer.change)}</strong>
                  <small>{money.format(customer.previous)} in May to {money.format(customer.latest)} in June</small>
                </button>
              ))}
            </div>
          </article>
          <article className="panel">
            <div className="panel-heading compact">
              <div>
                <p className="eyebrow">Service Movement</p>
                <h2>What Needs Attention</h2>
              </div>
            </div>
            <div className="movement-list">
              {serviceMovers.slice(0, 6).map((service) => (
                <button
                  className={service.change < 0 ? 'movement-row down' : 'movement-row up'}
                  key={service.name}
                  onClick={() => {
                    setSelectedService(service.name)
                    setView('services')
                  }}
                >
                  <span>{service.name}</span>
                  <strong>{signedMoney(service.change)}</strong>
                  <small>{serviceNotes[service.name]}</small>
                </button>
              ))}
            </div>
          </article>
        </section>
      ) : null}

      {view === 'customers' ? (
        <section className="content-grid">
          <article className="panel">
            <div className="panel-heading compact">
              <div>
                <p className="eyebrow">Customers</p>
                <h2>Revenue Leaders</h2>
              </div>
            </div>
            <RankedList
              items={topCustomerRows.slice(0, 10).map((customer) => ({
                name: customer.name,
                value: customer.rangeValue,
                helper: customer.outstanding ? `${money.format(customer.outstanding)} open` : `Last job ${customer.lastJob}`,
                tone: customer.outstanding ? 'bad' : 'neutral',
              }))}
              maxValue={maxCustomerValue}
              selected={selectedCustomerSeries.name}
              onSelect={setSelectedCustomer}
            />
          </article>
          <article className="panel focus-panel">
            <div className="panel-heading compact">
              <div>
                <p className="eyebrow">Customer Detail</p>
                <h2>{selectedCustomerSeries.name}</h2>
              </div>
              <span className={selectedCustomerSeries.change < 0 ? 'change-pill down' : 'change-pill up'}>
                {signedMoney(selectedCustomerSeries.change)} in June
              </span>
            </div>
            <MiniBars series={selectedCustomerSeries} indexes={indexes} />
            <div className="detail-grid">
              <div>
                <span>Period revenue</span>
                <strong>{money.format(seriesValueInRange(selectedCustomerSeries, indexes))}</strong>
              </div>
              <div>
                <span>Open balance</span>
                <strong>{money.format(selectedCustomerAccount?.outstanding ?? 0)}</strong>
              </div>
              <div>
                <span>Invoices</span>
                <strong>{selectedCustomerAccount?.invoices ?? 0}</strong>
              </div>
              <div>
                <span>Last job</span>
                <strong>{selectedCustomerAccount?.lastJob ?? 'n/a'}</strong>
              </div>
            </div>
            <div className="owner-note">
              <span>Owner read</span>
              <p>
                {selectedCustomerAccount?.outstanding
                  ? `Prioritize collection before booking additional large work for this account. ${selectedCustomerSeries.name} has ${money.format(selectedCustomerAccount.outstanding)} open.`
                  : `${selectedCustomerSeries.name} is clean on collections; treat the next touchpoint as a chance to schedule recurring or preventive work.`}
              </p>
            </div>
          </article>
        </section>
      ) : null}

      {view === 'services' ? (
        <section className="content-grid">
          <article className="panel">
            <div className="panel-heading compact">
              <div>
                <p className="eyebrow">Products And Services</p>
                <h2>Revenue By Service</h2>
              </div>
            </div>
            <RankedList
              items={topServiceRows.slice(0, 9).map((service) => ({
                name: service.name,
                value: service.rangeValue,
                helper: `${money.format(service.selectedMonthValue)} in ${labelMonth(selectedMonth.month)}`,
                tone: service.change < 0 ? 'bad' : service.change > 0 ? 'good' : 'neutral',
              }))}
              maxValue={maxServiceValue}
              selected={selectedServiceSeries.name}
              onSelect={setSelectedService}
            />
          </article>
          <article className="panel focus-panel">
            <div className="panel-heading compact">
              <div>
                <p className="eyebrow">Service Detail</p>
                <h2>{selectedServiceSeries.name}</h2>
              </div>
              <span className={selectedServiceSeries.change < 0 ? 'change-pill down' : 'change-pill up'}>
                {signedMoney(selectedServiceSeries.change)} vs May
              </span>
            </div>
            <MiniBars series={selectedServiceSeries} indexes={indexes} />
            <div className="detail-grid">
              <div>
                <span>Full-period revenue</span>
                <strong>{money.format(selectedServiceSeries.total)}</strong>
              </div>
              <div>
                <span>Revenue share</span>
                <strong>{share(selectedServiceSeries.total, totalRevenue)}</strong>
              </div>
              <div>
                <span>Range revenue</span>
                <strong>{money.format(seriesValueInRange(selectedServiceSeries, indexes))}</strong>
              </div>
              <div>
                <span>June revenue</span>
                <strong>{money.format(selectedServiceSeries.latest)}</strong>
              </div>
              <div>
                <span>May revenue</span>
                <strong>{money.format(selectedServiceSeries.previous)}</strong>
              </div>
            </div>
            <div className="owner-note">
              <span>Owner read</span>
              <p>{serviceNotes[selectedServiceSeries.name]}</p>
            </div>
          </article>
        </section>
      ) : null}

      {view === 'risks' ? (
        <section className="content-grid risks-grid">
          <article className="panel">
            <div className="panel-heading compact">
              <div>
                <p className="eyebrow">Declines</p>
                <h2>June Soft Spots</h2>
              </div>
            </div>
            <div className="decline-list">
              {decliningCustomers.slice(0, 5).map((customer) => (
                <div className="decline-row" key={customer.name}>
                  <span>{customer.name}</span>
                  <strong>{signedMoney(customer.change)}</strong>
                  <small>{money.format(customer.previous)} in May to {money.format(customer.latest)} in June</small>
                </div>
              ))}
              {decliningServices.map((service) => (
                <div className="decline-row service" key={service.name}>
                  <span>{service.name}</span>
                  <strong>{signedMoney(service.change)}</strong>
                  <small>{money.format(service.previous)} in May to {money.format(service.latest)} in June</small>
                </div>
              ))}
            </div>
          </article>
          <article className="panel">
            <div className="panel-heading compact">
              <div>
                <p className="eyebrow">Outliers</p>
                <h2>Large Invoices</h2>
              </div>
              <span className="subtle">Above $3.4k outlier threshold</span>
            </div>
            <div className="outlier-list">
              {invoiceOutliers.map((invoice) => (
                <div className="outlier-row" key={invoice.invoice}>
                  <div>
                    <strong>{invoice.customer}</strong>
                    <span>{invoice.invoice} / {labelMonth(invoice.month)} / {invoice.service} / {invoice.status}</span>
                  </div>
                  <b>{money.format(invoice.amount)}</b>
                </div>
              ))}
            </div>
          </article>
          <article className="panel">
            <div className="panel-heading compact">
              <div>
                <p className="eyebrow">Cash Status</p>
                <h2>Invoice Collection</h2>
              </div>
            </div>
            <div className="status-bars">
              {statusMix.map((status) => (
                <div className="status-row" key={status.name}>
                  <div>
                    <span>{status.name}</span>
                    <strong>{money.format(status.revenue)}</strong>
                  </div>
                  <div className="status-track">
                    <span
                      className={status.name.toLowerCase()}
                      style={{ width: `${(status.revenue / totalRevenue) * 100}%` }}
                    />
                  </div>
                  <small>{status.invoices} invoices</small>
                </div>
              ))}
            </div>
          </article>
          <article className="panel">
            <div className="panel-heading compact">
              <div>
                <p className="eyebrow">Collection Targets</p>
                <h2>Open Balance Queue</h2>
              </div>
            </div>
            <div className="open-list">
              {openBalances.slice(0, 6).map((balance) => (
                <div className="open-row" key={`${balance.customer}-${balance.status}`}>
                  <div>
                    <strong>{balance.customer}</strong>
                    <span>{balance.status}</span>
                  </div>
                  <b>{money.format(balance.amount)}</b>
                </div>
              ))}
            </div>
          </article>
        </section>
      ) : null}
    </main>
  )
}
