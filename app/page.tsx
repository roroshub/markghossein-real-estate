import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Marquee } from '@/components/Marquee'
import { About } from '@/components/About'
import { Manifesto } from '@/components/Manifesto'
import { Services } from '@/components/Services'
import { Listings } from '@/components/Listings'
import { SmoothMoveSystem } from '@/components/SmoothMoveSystem'
import { Tools } from '@/components/Tools'
import { Testimonials } from '@/components/Testimonials'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import {
  getServices,
  getListings,
  getTestimonials,
  getTools,
  getSteps,
} from '@/lib/content'

export default async function HomePage() {
  const [services, listings, testimonials, tools, steps] = await Promise.all([
    getServices(),
    getListings(),
    getTestimonials(),
    getTools(),
    getSteps(),
  ])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Manifesto />
        <Services services={services} />
        <Listings listings={listings} />
        <SmoothMoveSystem steps={steps} />
        <Tools tools={tools} />
        <Testimonials testimonials={testimonials} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
