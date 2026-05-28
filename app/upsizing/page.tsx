import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealWrapper } from '@/components/RevealWrapper'

export const metadata: Metadata = {
  title: 'Upsizing Your Home',
  description:
    'Ready for more space? Mark Ghossein helps Ottawa families upsize smoothly — selling your current home and buying your next one without the stress.',
  alternates: { canonical: '/upsizing' },
  openGraph: {
    title: 'Upsizing Your Home | Mark Ghossein',
    description:
      'Ready for more space? Mark Ghossein helps Ottawa families upsize smoothly — selling your current home and buying your next one without the stress.',
    url: '/upsizing',
  },
}

const points = [
  { t: 'Buy or Sell First?', d: 'We build a strategy around your finances and the market so you’re never caught with two homes — or none.' },
  { t: 'Bridge Financing', d: 'I connect you with lenders who can bridge the gap between closing dates so your upsize stays seamless.' },
  { t: 'Maximize Your Sale', d: 'Strategic prep and pricing on your current home funds the down payment on your bigger one.' },
  { t: 'Room to Grow', d: 'More bedrooms, home offices, yards for the kids — we target homes that fit your family’s next decade.' },
]

export default function UpsizingPage() {
  return (
    <>
      <Navbar />

      <section className="relative bg-ink-950 pt-40 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />
        <div className="relative z-10 max-w-[1320px] mx-auto px-8 md:px-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="block w-8 h-px bg-gold-500 shrink-0" />
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-gold-500">My Move · Upsizing</p>
          </div>
          <h1 className="font-serif text-[clamp(44px,6.5vw,92px)] font-normal leading-[0.95] text-white tracking-tight mb-6">
            Room to <em className="italic text-gold-500">Grow.</em>
          </h1>
          <p className="text-[16px] font-light text-white/50 max-w-[560px] leading-[1.9]">
            Your family outgrew the house — congratulations. Now let&apos;s make the move to something
            bigger feel effortless, financially and logistically.
          </p>
        </div>
      </section>

      <section className="bg-ink-900 py-24">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12">
          <RevealWrapper>
            <div className="mb-14">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gold-500 mb-4">
                How I Help
              </p>
              <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-normal text-white leading-tight">
                Upsizing, Without the Chaos
              </h2>
            </div>
          </RevealWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.05]">
            {points.map((p, i) => (
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
              Ready for more space?
            </h2>
            <p className="text-ink-950/60 text-[14px] mt-2">Let&apos;s map out your upsize, step by step.</p>
          </div>
          <div className="flex gap-4 shrink-0">
            <Link href="/#contact" className="inline-flex items-center px-8 py-4 bg-ink-950 text-white text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-ink-800 transition-colors duration-300">
              Book a Consultation
            </Link>
            <Link href="/downsizing" className="inline-flex items-center px-8 py-4 border border-ink-950/30 text-ink-950 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-ink-950/10 transition-colors duration-300">
              Downsizing instead →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
