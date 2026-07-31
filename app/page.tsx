import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Marquee } from '@/components/Marquee'
import { About } from '@/components/About'
import { Services } from '@/components/Services'
import { BrowseHomes } from '@/components/BrowseHomes'
import { Probate } from '@/components/Probate'
import { Tools } from '@/components/Tools'
import { Testimonials } from '@/components/Testimonials'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import {
  getServices,
  getTools,
} from '@/lib/content'
import { getReviews } from '@/lib/reviews'

// Render on the Worker at request time so runtime secrets (Featurable reviews) are available.
export const dynamic = 'force-dynamic'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://markghossein-next.vercel.app'

export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
}

// JSON-LD structured data, helps Google show rich results for local real estate searches
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Mark Ghossein Real Estate Advisors',
  description:
    'Ottawa real estate advisor specializing in buying, selling, upsizing, downsizing, investment, and probate & estate sales. eXp Realty agent serving Ottawa, Kanata, Barrhaven, Westboro, Orleans and surrounding communities.',
  url: siteUrl,
  email: 'mark@markghossein.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ottawa',
    addressRegion: 'ON',
    addressCountry: 'CA',
  },
  areaServed: [
    { '@type': 'City', name: 'Ottawa' },
    { '@type': 'City', name: 'Kanata' },
    { '@type': 'City', name: 'Barrhaven' },
    { '@type': 'City', name: 'Westboro' },
    { '@type': 'City', name: 'Orleans' },
    { '@type': 'AdministrativeArea', name: 'Ontario' },
  ],
  knowsAbout: [
    'Residential Real Estate',
    'Home Buying',
    'Home Selling',
    'Upsizing',
    'Downsizing',
    'Property Investment',
    'Probate and Estate Sales',
    'Ottawa Housing Market',
  ],
  memberOf: {
    '@type': 'Organization',
    name: 'eXp Realty Canada',
    url: 'https://exprealty.com/ca/',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Real Estate Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Buyer Representation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Seller Representation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Upsizing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Downsizing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Investment Strategy' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Probate & Estate Sales' } },
    ],
  },
}

export default async function HomePage() {
  const [services, testimonials, tools] = await Promise.all([
    getServices(),
    getReviews(),
    getTools(),
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services services={services} />
        <BrowseHomes />
        <Probate />
        <Tools tools={tools} />
        <About />
        <Testimonials testimonials={testimonials} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
