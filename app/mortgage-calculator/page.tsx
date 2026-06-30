import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { MortgageCalculator } from '@/components/MortgageCalculator'
import { RevealWrapper } from '@/components/RevealWrapper'

export const metadata: Metadata = {
  title: 'Mortgage Calculator',
  description:
    'Free Ottawa mortgage calculator with Canadian semi-annual compounding. Estimate your monthly payment, total interest, and CMHC insurance in seconds.',
  alternates: { canonical: '/mortgage-calculator' },
  openGraph: {
    title: 'Mortgage Calculator | Mark Ghossein',
    description:
      'Free Ottawa mortgage calculator with Canadian semi-annual compounding. Estimate your monthly payment, total interest, and CMHC insurance in seconds.',
    url: '/mortgage-calculator',
  },
}

const tips = [
  { t: '20% Down Avoids CMHC', d: 'Putting 20% or more down means no mortgage default insurance, saving thousands over your term.' },
  { t: 'Stress Test', d: 'Lenders qualify you at the higher of your rate + 2% or 5.25%. Budget with a buffer in mind.' },
  { t: 'Accelerated Payments', d: 'Switching to accelerated bi-weekly payments can shave years off your amortization.' },
]

export default function MortgageCalculatorPage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative bg-ink-950 pt-40 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(70% 90% at 70% 0%, rgba(201,169,110,0.12) 0%, transparent 62%)',
          }}
        />
        <div className="relative z-10 max-w-[1320px] mx-auto px-8 md:px-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="block w-8 h-px bg-gold-500 shrink-0" />
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-gold-500">
              Ottawa Real Estate · Tools
            </p>
          </div>
          <h1 className="font-serif text-[clamp(44px,6.5vw,92px)] font-normal leading-[0.95] text-white tracking-tight mb-6">
            Mortgage <em className="italic text-gold-500">Calculator</em>
          </h1>
          <p className="text-[16px] font-light text-white/55 max-w-[540px] leading-[1.9]">
            Model any scenario with accurate Canadian semi-annual compounding. Adjust the sliders to see
            your payment, total interest, and whether CMHC insurance applies.
          </p>
        </div>
      </section>

      {/* ── Calculator ── */}
      <section className="bg-ink-900 pb-24 pt-4">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12">
          <RevealWrapper>
            <MortgageCalculator />
          </RevealWrapper>
        </div>
      </section>

      {/* ── Tips ── */}
      <section className="bg-ink-950 py-24">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12">
          <RevealWrapper>
            <div className="mb-14">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gold-500 mb-4">
                Good to Know
              </p>
              <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-normal text-white leading-tight">
                Smart Financing Tips
              </h2>
            </div>
          </RevealWrapper>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.05]">
            {tips.map((tip, i) => (
              <RevealWrapper key={tip.t} delay={i * 70}>
                <div className="bg-ink-950 p-10 h-full">
                  <h3 className="text-[13px] font-semibold tracking-[0.1em] uppercase text-white mb-3">{tip.t}</h3>
                  <p className="text-[13px] text-white/55 leading-relaxed">{tip.d}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gold-500 py-20">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-normal text-ink-950 leading-tight">
              Ready for a real pre-approval?
            </h2>
            <p className="text-ink-950/60 text-[14px] mt-2">
              I&apos;ll connect you with Ottawa&apos;s top mortgage brokers to lock in your budget.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <Link
              href="/#contact"
              className="inline-flex items-center px-8 py-4 bg-ink-950 text-white text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-ink-800 transition-colors duration-300"
            >
              Book a Consultation
            </Link>
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 border border-ink-950/30 text-ink-950 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-ink-950/10 transition-colors duration-300"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
