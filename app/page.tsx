import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Marquee } from '@/components/Marquee'
import { About } from '@/components/About'
import { Manifesto } from '@/components/Manifesto'
import { Services } from '@/components/Services'
import { Listings } from '@/components/Listings'
import { BrowseHomes } from '@/components/BrowseHomes'
import { Probate } from '@/components/Probate'
import { Tools } from '@/components/Tools'
import { Testimonials } from '@/components/Testimonials'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import {
  getServices,
  getListings,
  getTestimonials,
  getTools,
} from '@/lib/content'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://markghossein-next.vercel.app'

export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
}

// JSON-LD structured data — helps Google show rich results for local real estate searches
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Mark Ghossein Real Estate Advisors',
  description:
    'Ottawa real estate advisor specialising in buyer representation, seller strategy, and upsizing. eXp Realty agent serving Ottawa, Kanata, Barrhaven, Westboro, Orleans and all of Ontario.',
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
    'Property Investment',
    'Ottawa Housing Market',
    'Mortgage Pre-Approval',
    'Upsizing',
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
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Upsizing Consultation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Valuation' } },
    ],
  },
}

export default async function HomePage() {
  const [services, listings, testimonials, tools] = await Promise.all([
    getServices(),
    getListings(),
    getTestimonials(),
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
        <About />
        <Manifesto />
        <Services services={services} />
        <Listings listings={listings} />
        <BrowseHomes />
        <Probate />
        <Tools tools={tools} />
        <Testimonials testimonials={testimonials} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
