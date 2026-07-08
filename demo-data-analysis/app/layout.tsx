import type { Metadata } from "next"
import "../src/App.css"

export const metadata: Metadata = {
  title: "Summit Plumbing - Executive Dashboard",
  description: "Interactive executive dashboard for Summit Plumbing financials.",
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
