import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Muslim Success Path',
  description: 'Faith-centered resources for learning, creating, and living with intention.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
