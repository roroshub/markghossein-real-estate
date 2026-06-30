import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealWrapper } from '@/components/RevealWrapper'
import { HomeValueEstimator } from '@/components/HomeValueEstimator'

export const metadata: Metadata = {
  title: 'Home Evaluation',
  description:
    'Get a quick estimate of your Ottawa home value, then request a free, accurate HomeWorth valuation from Mark Ghossein, eXp Realty.',
  alternates: { canonical: '/home-evaluation' },
  openGraph: {
    title: 'Home Evaluation | Mark Ghossein',
    description: 'Estimate your Ottawa home value, then get a free HomeWorth valuation.',
    url: '/home-evaluation',
  },
}

export default function HomeEvaluationPage() {
  return (
    <>
      <Navbar />

      <section className="relative bg-ink-950 pt-40 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(70% 90% at 70% 0%, rgba(201,169,110,0.12) 0%, transparent 62%)' }}
        />
        <div className="relative z-10 max-w-[1320px] mx-auto px-8 md:px-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="block w-8 h-px bg-gold-500 shrink-0" />
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-gold-500">
              Free Tool · Home Evaluation
            </p>
          </div>
          <h1 className="font-serif text-[clamp(44px,6.5vw,92px)] font-normal leading-[0.95] text-white tracking-tight mb-6">
            What&apos;s Your Home <em className="italic text-gold-500">Worth?</em>
          </h1>
          <p className="text-[16px] font-light text-white/50 max-w-[560px] leading-[1.9]">
            Get a quick, instant ballpark on your Ottawa home, then request a free, accurate
            HomeWorth valuation built on real comparable sales.
          </p>
        </div>
      </section>

      <section className="bg-ink-900 py-24">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12">
          <RevealWrapper>
            <div className="mb-12">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gold-500 mb-4">Instant Estimate</p>
              <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-normal text-white leading-tight">
                Home Value Calculator
              </h2>
            </div>
          </RevealWrapper>
          <RevealWrapper delay={100}>
            <HomeValueEstimator />
          </RevealWrapper>
        </div>
      </section>

      <section className="bg-gold-500 py-20">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-normal text-ink-950 leading-tight">
              Want the accurate number?
            </h2>
            <p className="text-ink-950/60 text-[14px] mt-2">A full HomeWorth report is free and built around your exact home.</p>
          </div>
          <div className="flex gap-4 shrink-0">
            <Link href="/#contact" className="inline-flex items-center px-8 py-4 bg-ink-950 text-white text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-ink-800 transition-colors duration-300">
              Request HomeWorth Report
            </Link>
            <Link href="/sellers" className="inline-flex items-center px-8 py-4 border border-ink-950/30 text-ink-950 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-ink-950/10 transition-colors duration-300">
              Thinking of selling? →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
