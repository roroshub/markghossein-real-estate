import type { Metadata } from 'next'
import Link from 'next/link'
import { MortgageCalculator } from '@/components/MortgageCalculator'
import { Navbar } from '@/components/Navbar'
import { RevealWrapper } from '@/components/RevealWrapper'

export const metadata: Metadata = {
  title: "Buyer's Guide",
  description:
    'Everything Ottawa home buyers need, mortgage calculator, neighbourhood guides, and a proven process to find your perfect home.',
  alternates: { canonical: '/buyers' },
  openGraph: {
    title: "Buyer's Guide | Mark Ghossein",
    description:
      'Everything Ottawa home buyers need, mortgage calculator, neighbourhood guides, and a proven process to find your perfect home.',
    url: '/buyers',
  },
}

const steps = [
  {
    num: '01',
    title: 'Get Pre-Approved',
    body: "Before you tour a single home, know exactly what you can afford. I'll connect you with Ottawa's top mortgage brokers to lock in your budget and strengthen every offer you make.",
  },
  {
    num: '02',
    title: 'Define Your Vision',
    body: "Location, layout, lifestyle, we'll map out your non-negotiables versus nice-to-haves so every showing is a valuable use of your time.",
  },
  {
    num: '03',
    title: 'Tour With Purpose',
    body: 'I curate properties that actually match your criteria, then walk every showing with a trained eye for hidden value and red flags others miss.',
  },
  {
    num: '04',
    title: 'Offer & Negotiate',
    body: 'Data-driven pricing strategy, firm deadlines, and assertive negotiation, I protect your interests at every clause of the Agreement of Purchase and Sale.',
  },
  {
    num: '05',
    title: 'Due Diligence',
    body: 'Home inspection, title search, status certificate (for condos), financing confirmation, every box checked before you waive a single condition.',
  },
  {
    num: '06',
    title: 'Close & Celebrate',
    body: "Keys in hand. I coordinate with lawyers, lenders, and moving teams so your closing day feels effortless, and I'm still one call away after you're in.",
  },
]

const faqs = [
  {
    q: 'How much do I need for a down payment in Ottawa?',
    a: 'Minimum 5% on homes under $500K, 5% on the first $500K + 10% on the remainder up to $999,999. Homes $1M+ require 20%. Under 20% triggers CMHC mortgage insurance.',
  },
  {
    q: "What's the difference between a fixed and variable rate?",
    a: 'Fixed rates lock your payment for the term (typically 5 years). Variable rates move with the Bank of Canada prime rate, historically lower on average but with payment risk if rates rise.',
  },
  {
    q: 'Who pays the realtor commission?',
    a: 'In Ontario the seller pays both agent commissions as part of their sale proceeds. Buyers pay nothing out of pocket for professional representation.',
  },
  {
    q: 'How long does closing typically take?',
    a: 'Most Ottawa purchases close in 30 to 90 days. We can negotiate the timeline that works for your situation, shorter for competitive offers, longer for renovation prep.',
  },
]

export default function BuyersPage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative bg-ink-950 pt-40 pb-24 overflow-hidden">
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
              Ottawa Real Estate · Buyer Resources
            </p>
          </div>
          <h1 className="font-serif text-[clamp(48px,7vw,96px)] font-normal leading-[0.93] text-white tracking-tight mb-6">
            Your Path to{' '}
            <em className="italic text-gold-500">Home Ownership</em>
          </h1>
          <p className="text-[16px] font-light text-white/55 max-w-[500px] leading-[1.9]">
            From pre-approval to possession day, a proven process that puts Ottawa families in the right home at the right price.
          </p>
        </div>
      </section>

      {/* ── Mortgage Calculator ── */}
      <section className="bg-ink-900 py-24">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12">
          <RevealWrapper>
            <div className="mb-14">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gold-500 mb-4">
                Mortgage Calculator
              </p>
              <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-normal text-white leading-tight">
                Know Your Numbers
              </h2>
              <p className="text-[14px] text-white/55 mt-3 max-w-[480px] leading-relaxed">
                Canadian semi-annual compounding. Adjust the sliders to model any scenario, then let's talk strategy.
              </p>
            </div>
          </RevealWrapper>
          <RevealWrapper delay={100}>
            <MortgageCalculator />
          </RevealWrapper>
        </div>
      </section>

      {/* ── Buyer Process ── */}
      <section className="bg-ink-950 py-24">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12">
          <RevealWrapper>
            <div className="mb-14">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gold-500 mb-4">
                The Process
              </p>
              <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-normal text-white leading-tight">
                Six Steps to Your Keys
              </h2>
            </div>
          </RevealWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05]">
            {steps.map((step, i) => (
              <RevealWrapper key={step.num} delay={i * 60}>
                <div className="bg-ink-950 p-10 group hover:bg-ink-900 transition-colors duration-300">
                  <p className="font-serif text-[42px] text-white/[0.06] leading-none mb-6 group-hover:text-gold-500/20 transition-colors duration-300">
                    {step.num}
                  </p>
                  <h3 className="text-[13px] font-semibold tracking-[0.1em] uppercase text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-white/55 leading-relaxed">{step.body}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-ink-900 py-24">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12">
          <RevealWrapper>
            <div className="mb-14">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gold-500 mb-4">
                Common Questions
              </p>
              <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-normal text-white leading-tight">
                Buyer FAQ
              </h2>
            </div>
          </RevealWrapper>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/[0.05]">
            {faqs.map((faq, i) => (
              <RevealWrapper key={faq.q} delay={i * 80}>
                <div className="bg-ink-900 p-10">
                  <p className="text-[13px] font-semibold text-white mb-3 leading-snug">{faq.q}</p>
                  <p className="text-[13px] text-white/55 leading-relaxed">{faq.a}</p>
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
              Ready to start your search?
            </h2>
            <p className="text-ink-950/60 text-[14px] mt-2">
              Let's find you the right home in Ottawa, at the right price.
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
    </>
  )
}
