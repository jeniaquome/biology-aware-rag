import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Helix | Biology-Aware Target Discovery',
  description: 'AI-powered spatial transcriptomics analysis for therapeutic target validation and In Vivo workflow insights',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
