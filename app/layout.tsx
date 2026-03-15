import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SYSTM8 — IB Dashboard',
  description: '1Move × PrimeVerse IB Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "'Outfit', 'Raleway', sans-serif", background: '#0A0806', color: '#F0E8D0' }}>
        {children}
      </body>
    </html>
  )
}
