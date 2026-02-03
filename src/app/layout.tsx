import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Biology-Aware RAG | Target Discovery Platform',
  description: 'AI-powered insights for In Vivo workflow data and therapeutic target validation',
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
