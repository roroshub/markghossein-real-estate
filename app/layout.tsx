import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Mark Ghossein | Real Estate Advisors',
    template: '%s | Mark Ghossein Real Estate',
  },
  description:
    'Mark Ghossein Real Estate Advisors — Make the right move. Premium buyer, seller, and upsizing services across Ontario, Canada.',
  keywords: ['real estate', 'Ontario', 'buy home', 'sell home', 'upsizing', 'Mark Ghossein', 'Century 21'],
  authors: [{ name: 'Mark Ghossein Real Estate Advisors' }],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    title: 'Mark Ghossein | Real Estate Advisors',
    description: 'Make the right move. Premium real estate services in Ontario, Canada.',
    siteName: 'Mark Ghossein Real Estate Advisors',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mark Ghossein | Real Estate Advisors',
    description: 'Make the right move. Premium real estate services in Ontario, Canada.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#090909',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
