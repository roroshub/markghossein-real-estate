import type { Metadata, Viewport } from 'next'
import { Inter, Hedvig_Letters_Serif } from 'next/font/google'
import { SmoothScroll } from '@/components/SmoothScroll'
import { CustomCursor } from '@/components/CustomCursor'
import { PageLoader } from '@/components/PageLoader'
import { ScrollProgress } from '@/components/ScrollProgress'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const hedvig = Hedvig_Letters_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-hedvig',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://markghossein-next.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Mark Ghossein | Ottawa Real Estate Advisor',
    template: '%s | Mark Ghossein Real Estate',
  },
  description:
    'Mark Ghossein — Ottawa\'s trusted real estate advisor. Expert buyer representation, seller strategy, and upsizing guidance. eXp Realty agent serving Ottawa, Kanata, Barrhaven, Westboro & all of Ontario.',
  keywords: [
    'Ottawa real estate agent',
    'Ottawa realtor',
    'buy home Ottawa',
    'sell home Ottawa',
    'Ottawa homes for sale',
    'Kanata real estate',
    'Barrhaven homes',
    'Westboro realtor',
    'Orleans real estate',
    'Ottawa upsizing',
    'eXp Realty Ottawa',
    'Mark Ghossein',
    'Ottawa buyer agent',
    'first time home buyer Ottawa',
    'Ottawa home valuation',
  ],
  authors: [{ name: 'Mark Ghossein', url: siteUrl }],
  creator: 'Mark Ghossein Real Estate Advisors',
  alternates: { canonical: siteUrl },
  openGraph: {
    type: 'website',
    url: siteUrl,
    locale: 'en_CA',
    title: 'Mark Ghossein | Ottawa Real Estate Advisor',
    description: 'Make the right move. Expert real estate guidance for Ottawa families — buying, selling, and upsizing with eXp Realty.',
    siteName: 'Mark Ghossein Real Estate Advisors',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mark Ghossein | Ottawa Real Estate Advisor',
    description: 'Make the right move. Expert real estate guidance for Ottawa families.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

export const viewport: Viewport = {
  themeColor: '#090909',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${hedvig.variable}`}>
      <body>
        <PageLoader />
        <CustomCursor />
        <SmoothScroll />
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}
