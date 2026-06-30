import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealWrapper } from '@/components/RevealWrapper'

export const metadata: Metadata = {
  title: 'Nosey Neighbour',
  description:
    'Get instant alerts when homes sell on your street in Ottawa. Track your neighbourhood, know your equity, and stay ahead of the market.',
  alternates: { canonical: '/nosey-neighbour' },
  openGraph: {
    title: 'Nosey Neighbour | Mark Ghossein',
    description: 'Get instant alerts when homes sell on your street in Ottawa.',
    url: '/nosey-neighbour',
  },
}

const perks = [
  { t: 'Sold Alerts on Your Street', d: 'The moment a home near you sells, you will know what it listed for and what it actually closed at.' },
  { t: 'Know Your Equity', d: 'Local sales are the clearest signal of what your own home is worth right now, no guesswork.' },
  { t: 'Ahead of the News', d: 'See real activity before it shows up in headlines or quarterly market reports.' },
  { t: 'Zero Spam', d: 'Just the sales that matter to you, as often or as rarely as your neighbourhood turns over.' },
]

export default function NoseyNeighbourPage() {
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
              Free Tool · Neighbourhood Alerts
            </p>
          </div>
          <h1 className="font-serif text-[clamp(44px,6.5vw,92px)] font-normal leading-[0.95] text-white tracking-tight mb-6">
            Nosey <em className="italic text-gold-500">Neighbour.</em>
          </h1>
          <p className="text-[16px] font-light text-white/50 max-w-[560px] leading-[1.9]">
            Curious what the house down the street sold for? Get instant alerts every time a home
            sells in your Ottawa neighbourhood, and always know where your equity stands.
          </p>
        </div>
      </section>

      <section className="bg-ink-900 py-24">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12">
          <RevealWrapper>
            <div className="mb-14">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gold-500 mb-4">Why Sign Up</p>
              <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-normal text-white leading-tight">
                Your Street, In Real Time
              </h2>
            </div>
          </RevealWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.05]">
            {perks.map((p, i) => (
              <RevealWrapper key={p.t} delay={i * 70}>
                <div className="bg-ink-900 p-10 h-full">
                  <h3 className="text-[13px] font-semibold tracking-[0.1em] uppercase text-white mb-3">{p.t}</h3>
                  <p className="text-[13px] text-white/40 leading-relaxed">{p.d}</p>
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
              Set up your alerts
            </h2>
            <p className="text-ink-950/60 text-[14px] mt-2">Tell me your neighbourhood and I will set you up, free.</p>
          </div>
          <div className="flex gap-4 shrink-0">
            <Link href="/#contact" className="inline-flex items-center px-8 py-4 bg-ink-950 text-white text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-ink-800 transition-colors duration-300">
              Set Up My Alerts
            </Link>
            <Link href="/home-evaluation" className="inline-flex items-center px-8 py-4 border border-ink-950/30 text-ink-950 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-ink-950/10 transition-colors duration-300">
              What&apos;s my home worth? →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
