import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealWrapper } from '@/components/RevealWrapper'

export const metadata: Metadata = {
  title: 'Real Estate FAQ',
  description:
    'Common questions about buying and selling real estate in Ottawa and Ontario, answered by Mark Ghossein, eXp Realty.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'Real Estate FAQ | Mark Ghossein',
    description: 'Common questions about buying and selling real estate in Ottawa and Ontario.',
    url: '/faq',
  },
}

const faqGroups = [
  {
    heading: 'Getting Started',
    items: [
      {
        q: 'How much do I need for a down payment?',
        a: 'In Canada the minimum is 5% on the first $500,000, 10% on the portion from $500,000 to $999,999, and 20% on homes of $1 million or more. Putting down less than 20% means you will pay CMHC mortgage default insurance.',
      },
      {
        q: 'Should I get pre-approved before I start looking?',
        a: 'Yes. A pre-approval tells you exactly what you can afford, locks a rate for a set period, and makes your offers far more competitive. It is the first step I recommend for every buyer.',
      },
      {
        q: 'How much does it cost to work with a real estate agent?',
        a: 'In Ontario the seller typically pays both the listing and buyer agent commissions out of the sale proceeds. For buyers, professional representation usually costs nothing out of pocket.',
      },
    ],
  },
  {
    heading: 'Buying',
    items: [
      {
        q: 'What is the difference between a fixed and a variable rate?',
        a: 'A fixed rate locks your payment for the full term, usually five years. A variable rate moves with the Bank of Canada prime rate, historically lower on average but with the risk of rising payments. The right choice depends on your budget and risk tolerance.',
      },
      {
        q: 'What closing costs should I budget for?',
        a: 'Beyond the down payment, plan for land transfer tax, legal fees, a home inspection, title insurance, and any adjustments. A good rule of thumb is 1.5% to 4% of the purchase price.',
      },
      {
        q: 'How long does it take to close on a home?',
        a: 'Most Ottawa purchases close within 30 to 90 days. The timeline is negotiable, shorter for competitive offers, longer when you need time to prepare or sell another property.',
      },
    ],
  },
  {
    heading: 'Selling',
    items: [
      {
        q: 'How do you decide on a list price?',
        a: 'I build a comparative market analysis using recent sales of similar homes in your area, current competing listings, and market momentum. Pricing strategy, not guesswork, is what drives strong offers.',
      },
      {
        q: 'Is staging really worth it?',
        a: 'Almost always. Staged homes photograph better, show better, and consistently sell faster and for more. I provide a room-by-room plan and connect you with trusted stagers when it makes sense.',
      },
      {
        q: 'Should I buy or sell first?',
        a: 'It depends on your finances, the market, and your comfort with risk. We map out a strategy, including bridge financing where needed, so you are never caught carrying two homes or scrambling for one.',
      },
    ],
  },
  {
    heading: 'Working With Mark',
    items: [
      {
        q: 'What areas do you serve?',
        a: 'Ottawa and the surrounding communities, including Kanata, Barrhaven, Westboro, Orleans, the Glebe, Centretown, Hintonburg, and Stittsville.',
      },
      {
        q: 'Do you handle estate and probate sales?',
        a: 'Yes. I am a Certified Probate Specialist and guide executors and families through the sale of estate and inherited properties with patience and discretion.',
      },
    ],
  },
]

export default function FaqPage() {
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
              Ottawa Real Estate · Common Questions
            </p>
          </div>
          <h1 className="font-serif text-[clamp(44px,6.5vw,92px)] font-normal leading-[0.95] text-white tracking-tight mb-6">
            Real Estate <em className="italic text-gold-500">FAQ.</em>
          </h1>
          <p className="text-[16px] font-light text-white/55 max-w-[560px] leading-[1.9]">
            Straight answers to the questions Ottawa buyers and sellers ask most. Do not see yours?
            Reach out and I will walk you through it.
          </p>
        </div>
      </section>

      {faqGroups.map((group, gi) => (
        <section key={group.heading} className={gi % 2 === 0 ? 'bg-ink-900 py-20' : 'bg-ink-950 py-20'}>
          <div className="max-w-[1320px] mx-auto px-8 md:px-12">
            <RevealWrapper>
              <h2 className="font-serif text-[clamp(26px,3vw,40px)] font-normal text-white leading-tight mb-10">
                {group.heading}
              </h2>
            </RevealWrapper>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/[0.05]">
              {group.items.map((item, i) => (
                <RevealWrapper key={item.q} delay={i * 70}>
                  <div className={`${gi % 2 === 0 ? 'bg-ink-900' : 'bg-ink-950'} p-10 h-full`}>
                    <p className="text-[14px] font-semibold text-white mb-3 leading-snug">{item.q}</p>
                    <p className="text-[13px] text-white/55 leading-relaxed">{item.a}</p>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-gold-500 py-20">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-normal text-ink-950 leading-tight">
              Still have questions?
            </h2>
            <p className="text-ink-950/60 text-[14px] mt-2">Ask me anything, no pressure, no obligation.</p>
          </div>
          <Link href="/#contact" className="inline-flex items-center px-8 py-4 bg-ink-950 text-white text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-ink-800 transition-colors duration-300 shrink-0">
            Get in Touch
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
