import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealWrapper } from '@/components/RevealWrapper'

export const metadata: Metadata = {
  title: 'Investment Strategy',
  description:
    'Build long-term wealth through Ottawa real estate. Mark Ghossein helps investors spot opportunities, analyze returns, and grow income-producing portfolios.',
  alternates: { canonical: '/investment' },
  openGraph: {
    title: 'Investment Strategy | Mark Ghossein',
    description:
      'Build long-term wealth through Ottawa real estate. Spot opportunities, analyze returns, and grow income-producing portfolios.',
    url: '/investment',
  },
}

const points = [
  { t: 'ROI & Cap Rate Analysis', d: 'We run the numbers on every prospect so you buy on fundamentals, not hype. Cash flow, cap rate, and total return, modeled before you offer.' },
  { t: 'Market Opportunity Spotting', d: 'Ottawa has pockets of strong rental demand and appreciation. I help you target the right neighbourhoods at the right time.' },
  { t: 'Multi-Property Planning', d: 'From your first rental to a growing portfolio, we sequence acquisitions and financing so each property strengthens the next.' },
  { t: 'Long-Term Equity Roadmap', d: 'A clear plan for refinancing, leveraging equity, and scaling, aligned with your timeline and risk tolerance.' },
]

export default function InvestmentPage() {
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
              Ottawa Real Estate · Investment Strategy
            </p>
          </div>
          <h1 className="font-serif text-[clamp(44px,6.5vw,92px)] font-normal leading-[0.95] text-white tracking-tight mb-6">
            Build Real <em className="italic text-gold-500">Wealth.</em>
          </h1>
          <p className="text-[16px] font-light text-white/55 max-w-[560px] leading-[1.9]">
            Real estate is one of the most powerful wealth-building tools available. I help Ottawa
            investors find the right opportunities, analyze returns with clear eyes, and grow
            portfolios that perform.
          </p>
        </div>
      </section>

      <section className="bg-ink-900 py-24">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12">
          <RevealWrapper>
            <div className="mb-14">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gold-500 mb-4">How I Help</p>
              <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-normal text-white leading-tight">
                Invest With a Plan
              </h2>
            </div>
          </RevealWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.05]">
            {points.map((p, i) => (
              <RevealWrapper key={p.t} delay={i * 70}>
                <div className="bg-ink-900 p-10 h-full">
                  <h3 className="text-[13px] font-semibold tracking-[0.1em] uppercase text-white mb-3">{p.t}</h3>
                  <p className="text-[13px] text-white/55 leading-relaxed">{p.d}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gold-500 py-20">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-normal text-ink-950 leading-tight">
              Ready to put your money to work?
            </h2>
            <p className="text-ink-950/60 text-[14px] mt-2">Let&apos;s map out an investment strategy built around your goals.</p>
          </div>
          <div className="flex gap-4 shrink-0">
            <Link href="/#contact" className="inline-flex items-center px-8 py-4 bg-ink-950 text-white text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-ink-800 transition-colors duration-300">
              Book a Consultation
            </Link>
            <Link href="/mortgage-calculator" className="inline-flex items-center px-8 py-4 border border-ink-950/30 text-ink-950 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-ink-950/10 transition-colors duration-300">
              Mortgage Calculator →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
