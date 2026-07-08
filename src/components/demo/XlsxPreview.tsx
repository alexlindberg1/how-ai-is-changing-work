import { useEffect, useMemo, useState } from 'react'

interface XlsxPreviewProps {
  /** Public URL of the workbook to fetch and render. */
  file: string
}

interface SheetData {
  name: string
  rows: Array<Array<string | number>>
}

/** Column letter for the Excel-style header row (A, B, … AA, AB…). */
function colLetter(i: number): string {
  let s = ''
  let n = i
  do {
    s = String.fromCharCode(65 + (n % 26)) + s
    n = Math.floor(n / 26) - 1
  } while (n >= 0)
  return s
}

function formatCell(value: string | number): string {
  if (typeof value === 'number' && Number.isFinite(value) && Math.abs(value) >= 1000) {
    return value.toLocaleString('en-US')
  }
  return String(value)
}

/**
 * Client-side spreadsheet preview: parses the workbook with SheetJS and
 * renders it Excel-style — column letters, row numbers, grid lines, and
 * sheet tabs along the bottom. Deliberately read-only and approximate.
 */
export function XlsxPreview({ file }: XlsxPreviewProps) {
  const [sheets, setSheets] = useState<SheetData[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeSheet, setActiveSheet] = useState(0)

  useEffect(() => {
    let cancelled = false
    setSheets(null)
    setError(null)
    // SheetJS is loaded on demand so the deck bundle stays small; the modal
    // is the only place that needs it.
    Promise.all([
      import('xlsx'),
      fetch(file).then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.arrayBuffer()
      }),
    ])
      .then(([XLSX, buf]) => {
        const wb = XLSX.read(buf, { type: 'array' })
        const parsed = wb.SheetNames.map((name) => ({
          name,
          rows: XLSX.utils.sheet_to_json<Array<string | number>>(wb.Sheets[name], {
            header: 1,
            defval: '',
          }),
        }))
        if (!cancelled) setSheets(parsed)
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load workbook')
      })
    return () => {
      cancelled = true
    }
  }, [file])

  const sheet = sheets?.[activeSheet]
  const colCount = useMemo(
    () => (sheet ? Math.max(...sheet.rows.map((r) => r.length), 1) : 0),
    [sheet],
  )

  if (error) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center">
        <p className="font-mono text-[0.75rem] text-text-muted">
          Could not load workbook: {error}
        </p>
      </div>
    )
  }

  if (!sheets || !sheet) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="animate-pulse font-mono text-[0.72rem] uppercase tracking-[0.12em] text-text-dim">
          Loading workbook…
        </p>
      </div>
    )
  }

  const [headerRow, ...dataRows] = sheet.rows

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Grid */}
      <div className="min-h-0 flex-1 overflow-auto">
        <table className="border-collapse font-mono text-[0.72rem] leading-none text-[#1f2937]">
          <thead>
            {/* Excel column letters */}
            <tr>
              <th className="sticky top-0 z-20 w-10 border border-[#d4d4d8] bg-[#e7e7ea] px-2 py-1.5 text-center font-normal text-[#6b7280]" />
              {Array.from({ length: colCount }).map((_, c) => (
                <th
                  key={c}
                  className="sticky top-0 z-10 border border-[#d4d4d8] bg-[#e7e7ea] px-3 py-1.5 text-center font-normal text-[#6b7280]"
                >
                  {colLetter(c)}
                </th>
              ))}
            </tr>
            {/* First worksheet row treated as the header */}
            {headerRow && (
              <tr>
                <th className="sticky top-[26px] z-20 border border-[#d4d4d8] bg-[#f4f4f5] px-2 py-1.5 text-center font-normal text-[#6b7280]">
                  1
                </th>
                {Array.from({ length: colCount }).map((_, c) => (
                  <th
                    key={c}
                    className="sticky top-[26px] z-10 whitespace-nowrap border border-[#d4d4d8] bg-[#f4f4f5] px-3 py-1.5 text-left font-semibold"
                  >
                    {formatCell(headerRow[c] ?? '')}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {dataRows.map((row, r) => (
              <tr key={r} className="odd:bg-white even:bg-[#fafafa]">
                <td className="border border-[#e4e4e7] bg-[#f4f4f5] px-2 py-1.5 text-center text-[#9ca3af]">
                  {r + 2}
                </td>
                {Array.from({ length: colCount }).map((_, c) => {
                  const value = row[c] ?? ''
                  return (
                    <td
                      key={c}
                      className={`whitespace-nowrap border border-[#e4e4e7] px-3 py-1.5 ${
                        typeof value === 'number' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {formatCell(value)}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Excel-style sheet tabs along the bottom */}
      <div className="flex shrink-0 items-center gap-1 border-t border-[#d4d4d8] bg-[#ececee] px-3 py-1.5">
        {sheets.map((s, i) => (
          <button
            key={s.name}
            type="button"
            onClick={() => setActiveSheet(i)}
            className={`cursor-pointer rounded-t border border-b-0 px-3.5 py-1.5 font-mono text-[0.68rem] transition-colors ${
              i === activeSheet
                ? 'border-[#c8c8cc] bg-white font-semibold text-[#15803d]'
                : 'border-transparent bg-transparent text-[#52525b] hover:bg-white/60'
            }`}
          >
            {s.name}
          </button>
        ))}
        <span className="ml-auto font-mono text-[0.6rem] text-[#9ca3af]">
          {dataRows.length.toLocaleString()} rows
        </span>
      </div>
    </div>
  )
}
