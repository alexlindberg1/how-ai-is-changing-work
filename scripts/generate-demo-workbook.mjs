/**
 * Generates the sample "before" workbook for the data-analysis demo slide:
 * a believable small-business financials export with multiple sheets.
 *
 * Run: node scripts/generate-demo-workbook.mjs
 * Output: public/demo/summit-plumbing-financials.xlsx
 */
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import * as XLSX from 'xlsx'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

// Deterministic pseudo-random so the workbook is stable across runs.
let seed = 42
function rand() {
  seed = (seed * 1103515245 + 12345) % 2147483648
  return seed / 2147483648
}
function pick(arr) {
  return arr[Math.floor(rand() * arr.length)]
}

const customers = [
  'Lakeside Property Mgmt', 'Hilltop Dental Group', 'River Café', 'Bright Path Daycare',
  'Oak & Iron Brewing', 'Cedar Ridge HOA', 'Maple Street Clinic', 'Harbor Fitness',
  'Stonebridge Realty', 'Willow Creek Church', 'North End Diner', 'Pinnacle Auto Body',
  'Fern Valley Farms', 'Sunrise Assisted Living', 'Metro Print Shop', 'Bluewater Hotel',
  'Grove Elementary PTA', 'Ridgeline Outfitters', 'Copper Kettle Bakery', 'Summit Office Park',
]

const services = [
  ['Drain cleaning', 180, 450],
  ['Water heater install', 1400, 2600],
  ['Leak repair', 220, 780],
  ['Backflow testing', 150, 320],
  ['Repipe (partial)', 2800, 6500],
  ['Fixture replacement', 240, 900],
  ['Sewer line inspection', 350, 650],
  ['Emergency call-out', 400, 1200],
  ['Maintenance contract', 600, 1800],
]

const months = [
  '2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12',
  '2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06',
]

// Seasonal-ish activity per month (winter spikes, spring dip).
const monthActivity = [10, 9, 10, 11, 13, 15, 16, 14, 11, 9, 10, 12]

const invoiceRows = [['Invoice #', 'Date', 'Customer', 'Service', 'Amount', 'Status', 'Paid Date']]
let invoiceNum = 2041
const monthlyTotals = new Map(months.map((m) => [m, { revenue: 0, invoices: 0, outstanding: 0 }]))
const customerTotals = new Map()

for (let mi = 0; mi < months.length; mi++) {
  const month = months[mi]
  const count = monthActivity[mi]
  for (let i = 0; i < count; i++) {
    const day = String(1 + Math.floor(rand() * 28)).padStart(2, '0')
    const date = `${month}-${day}`
    const customer = pick(customers)
    const [service, lo, hi] = pick(services)
    const amount = Math.round((lo + rand() * (hi - lo)) / 5) * 5
    // Recent months carry more unpaid/overdue invoices.
    const unpaidChance = mi >= 10 ? 0.45 : mi >= 8 ? 0.2 : 0.05
    const isPaid = rand() > unpaidChance
    const status = isPaid ? 'Paid' : mi <= 9 ? 'Overdue' : rand() > 0.5 ? 'Sent' : 'Overdue'
    const paidDate = isPaid ? `${month}-${String(Math.min(28, Number(day) + 14)).padStart(2, '0')}` : ''
    invoiceRows.push([`INV-${invoiceNum++}`, date, customer, service, amount, status, paidDate])

    const mt = monthlyTotals.get(month)
    mt.revenue += amount
    mt.invoices += 1
    if (!isPaid) mt.outstanding += amount
    customerTotals.set(customer, (customerTotals.get(customer) ?? 0) + amount)
  }
}

const customerRows = [['Customer', 'Contact', 'Type', 'First Job', 'Lifetime Revenue']]
const types = ['Commercial', 'Commercial', 'HOA / Multi-unit', 'Non-profit']
for (const [name, total] of [...customerTotals.entries()].sort((a, b) => b[1] - a[1])) {
  const first = `20${22 + Math.floor(rand() * 4)}-${String(1 + Math.floor(rand() * 12)).padStart(2, '0')}`
  customerRows.push([
    name,
    `${name.split(' ')[0].toLowerCase()}@example.com`,
    pick(types),
    first,
    total,
  ])
}

const summaryRows = [['Month', 'Invoices', 'Revenue', 'Outstanding', 'Avg Invoice']]
for (const month of months) {
  const { revenue, invoices, outstanding } = monthlyTotals.get(month)
  summaryRows.push([month, invoices, revenue, outstanding, Math.round(revenue / invoices)])
}

const wb = XLSX.utils.book_new()
const wsInvoices = XLSX.utils.aoa_to_sheet(invoiceRows)
wsInvoices['!cols'] = [{ wch: 10 }, { wch: 11 }, { wch: 24 }, { wch: 22 }, { wch: 10 }, { wch: 9 }, { wch: 11 }]
const wsCustomers = XLSX.utils.aoa_to_sheet(customerRows)
wsCustomers['!cols'] = [{ wch: 24 }, { wch: 26 }, { wch: 16 }, { wch: 10 }, { wch: 16 }]
const wsSummary = XLSX.utils.aoa_to_sheet(summaryRows)
wsSummary['!cols'] = [{ wch: 10 }, { wch: 9 }, { wch: 10 }, { wch: 12 }, { wch: 11 }]

XLSX.utils.book_append_sheet(wb, wsInvoices, 'Invoices')
XLSX.utils.book_append_sheet(wb, wsCustomers, 'Customers')
XLSX.utils.book_append_sheet(wb, wsSummary, 'Monthly Summary')

mkdirSync(join(root, 'public', 'demo'), { recursive: true })
const out = join(root, 'public', 'demo', 'summit-plumbing-financials.xlsx')
XLSX.writeFile(wb, out)
console.log(`Wrote ${out} (${invoiceRows.length - 1} invoices, ${customerRows.length - 1} customers)`)
