import type { Metadata } from "next"
import "../src/App.css"

export const metadata: Metadata = {
  title: "Summit Plumbing — Executive Dashboard",
  description: "Codex will build an interactive dashboard from the source workbook.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
