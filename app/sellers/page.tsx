import type { Metadata } from 'next'
import Link from 'next/link'
import { MortgageCalculator } from '@/components/MortgageCalculator'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealWrapper } from '@/components/RevealWrapper'
import { RelatedBlogs } from '@/components/RelatedBlogs'

export const metadata: Metadata = {
  title: "Seller's Guide",
  description:
    'Everything Ottawa home sellers need, a free HomeWorth valuation, strategic pricing, professional staging, and a proven process to sell for top dollar.',
  alternates: { canonical: '/sellers' },
  openGraph: {
    title: "Seller's Guide | Mark Ghossein",
    description:
      'Everything Ottawa home sellers need, a free HomeWorth valuation, strategic pricing, professional staging, and a proven process to sell for top dollar.',
    url: '/sellers',
  },
}

const steps = [
  {
    num: '01',
    title: 'Strategic Pricing',
    body: "Pricing wins or loses the sale. I build a data-driven comparative market analysis on your home and your block, not a guess, so we list at the number that attracts the most buyers and the strongest offers.",
  },
  {
    num: '02',
    title: 'Prepare & Stage',
    body: 'Decluttering, repairs, and professional staging guidance that make buyers fall in love the moment they walk in. Small, targeted investments routinely return many times their cost.',
  },
  {
    num: '03',
    title: 'Professional Marketing',
    body: 'Magazine-quality photography, video, floor plans, and a targeted digital campaign that puts your listing in front of qualified Ottawa buyers, not just whoever happens to drive by.',
  },
  {
    num: '04',
    title: 'Showings & Open Houses',
    body: 'Coordinated private showings and high-impact open houses, with feedback gathered after every visit so we can adjust strategy in real time.',
  },
  {
    num: '05',
    title: 'Offers & Negotiation',
    body: 'When offers arrive, I negotiate assertively on price, conditions, and closing terms, protecting your bottom line at every clause of the Agreement of Purchase and Sale.',
  },
  {
    num: '06',
    title: 'Close With Confidence',
    body: "I coordinate with lawyers, lenders, and the buyer's agent so your closing is smooth and on time, and I'm still one call away after the sold sign goes up.",
  },
]

const faqs = [
  {
    q: 'How long does it take to sell a home in Ottawa?',
    a: 'Well-priced, well-prepared homes in Ottawa often sell within 1 to 3 weeks, though it varies by neighbourhood, price point, and season. Strategic pricing and presentation are the biggest levers on time-on-market.',
  },
  {
    q: 'What does it cost to sell my home?',
    a: 'In Ontario the seller pays both agent commissions out of the sale proceeds, plus legal fees and any prep costs. I walk you through a clear net-proceeds estimate up front so there are no surprises at closing.',
  },
  {
    q: 'Should I stage my home before listing?',
    a: 'Almost always, yes. Staged homes photograph better and consistently sell faster and for more. I provide a room-by-room plan and connect you with trusted stagers when it makes sense.',
  },
  {
    q: 'Should I sell or buy first?',
    a: "It depends on your finances, the market, and your risk tolerance. We'll map out a strategy, including bridge financing options, so you're never caught carrying two homes or scrambling for one.",
  },
]

export default function SellersPage() {
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
              Ottawa Real Estate · Seller Resources
            </p>
          </div>
          <h1 className="font-serif text-[clamp(48px,7vw,96px)] font-normal leading-[0.93] text-white tracking-tight mb-6">
            Sell for{' '}
            <em className="italic text-gold-500">Top Dollar</em>
          </h1>
          <p className="text-[16px] font-light text-white/55 max-w-[500px] leading-[1.9]">
            Strategic pricing, standout marketing, and assertive negotiation, a proven process that sells Ottawa homes faster and for more.
          </p>
        </div>
      </section>

      {/* ── HomeWorth valuation CTA ── */}
      <section className="bg-gold-500 py-16">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-ink-950/80 mb-3">
              Step One · Know Your Number
            </p>
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-normal text-ink-950 leading-tight">
              What&apos;s your home worth today?
            </h2>
            <p className="text-ink-950/80 text-[14px] mt-2 max-w-[460px]">
              Get a free, no-obligation HomeWorth valuation report tailored to your neighbourhood.
            </p>
          </div>
          <Link
            href="/#tools"
            className="inline-flex items-center px-8 py-4 bg-ink-950 text-white text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-ink-800 transition-colors duration-300 shrink-0"
          >
            Get My HomeWorth Valuation →
          </Link>
        </div>
      </section>

      {/* ── Net-Proceeds / Mortgage Calculator ── */}
      <section className="bg-ink-900 py-24">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12">
          <RevealWrapper>
            <div className="mb-14">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gold-500 mb-4">
                Plan Your Next Move
              </p>
              <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-normal text-white leading-tight">
                Run the Numbers
              </h2>
              <p className="text-[14px] text-white/55 mt-3 max-w-[480px] leading-relaxed">
                Selling and buying next? Model the mortgage on your move-up home, Canadian semi-annual compounding, adjust any scenario.
              </p>
            </div>
          </RevealWrapper>
          <RevealWrapper delay={100}>
            <MortgageCalculator />
          </RevealWrapper>
        </div>
      </section>

      {/* ── Seller Process ── */}
      <section className="bg-ink-950 py-24">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12">
          <RevealWrapper>
            <div className="mb-14">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gold-500 mb-4">
                The Process
              </p>
              <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-normal text-white leading-tight">
                Six Steps to Sold
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
                Seller FAQ
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
              Thinking of selling?
            </h2>
            <p className="text-ink-950/80 text-[14px] mt-2">
              Let&apos;s talk strategy, and what your Ottawa home could sell for.
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
              href="/buyers"
              className="inline-flex items-center px-8 py-4 border border-ink-950/30 text-ink-950 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-ink-950/10 transition-colors duration-300"
            >
              Buying instead? →
            </Link>
          </div>
        </div>
      </section>

      <RelatedBlogs page="sellers" />
      <Footer />
    </>
  )
}
