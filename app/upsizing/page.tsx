import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealWrapper } from '@/components/RevealWrapper'
import { RelatedBlogs } from '@/components/RelatedBlogs'

export const metadata: Metadata = {
  title: 'Upsizing & the Smooth Move System',
  description:
    'Ready for more space? Mark Ghossein helps Ottawa families upsize smoothly with the Smooth Move System, selling your current home and buying your next one without the stress.',
  alternates: { canonical: '/upsizing' },
  openGraph: {
    title: 'Upsizing & the Smooth Move System | Mark Ghossein',
    description:
      'Ready for more space? Upsize smoothly with the Smooth Move System, selling and buying without the stress.',
    url: '/upsizing',
  },
}

const points = [
  { t: 'Buy or Sell First?', d: 'We build a strategy around your finances and the market so you are never caught with two homes, or none.' },
  { t: 'Bridge Financing', d: 'I connect you with lenders who can bridge the gap between closing dates so your upsize stays seamless.' },
  { t: 'Maximize Your Sale', d: 'Strategic prep and pricing on your current home funds the down payment on your bigger one.' },
  { t: 'Room to Grow', d: 'More bedrooms, home offices, yards for the kids. We target homes that fit your family for the next decade.' },
]

const system = [
  { n: '01', t: 'Understanding Your Vision', d: 'We map your timeline, budget, and must-haves before anything goes on the market.' },
  { n: '02', t: 'Prepare', d: 'Your current home gets prepped and priced to sell strong and fund the next purchase.' },
  { n: '03', t: 'Execute', d: 'Your property hits the market and we secure your new home.' },
  { n: '04', t: 'Transition', d: 'We coordinate sale and purchase closings so you move once, not twice.' },
  { n: '05', t: 'Celebrate', d: 'Keys to your bigger home in hand, with the financing and logistics handled.' },
]

export default function UpsizingPage() {
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
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-gold-500">Services · Upsizing</p>
          </div>
          <h1 className="font-serif text-[clamp(44px,6.5vw,92px)] font-normal leading-[0.95] text-white tracking-tight mb-6">
            Room to <em className="italic text-gold-500">Grow.</em>
          </h1>
          <p className="text-[16px] font-light text-white/55 max-w-[560px] leading-[1.9]">
            Your family outgrew the house, and that is worth celebrating. Now let us make the move to
            something bigger feel effortless, both financially and logistically.
          </p>
        </div>
      </section>

      {/* ── Smooth Move System ── */}
      <section className="bg-cream py-24">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12">
          <RevealWrapper>
            <div className="mb-14">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gold-700 mb-4">My Framework</p>
              <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-normal text-ink-900 leading-tight">
                The Smooth Move System
              </h2>
              <p className="text-[14px] text-ink-500 mt-3 max-w-[520px] leading-relaxed">
                My proprietary process for selling and buying at the same time, so the transition
                feels seamless instead of overwhelming.
              </p>
            </div>
          </RevealWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-black/[0.06]">
            {system.map((s, i) => (
              <RevealWrapper key={s.n} delay={i * 60}>
                <div className="bg-white p-10 h-full group hover:bg-cream-deep transition-colors duration-300">
                  <p className="font-serif text-[42px] text-black/[0.06] leading-none mb-6 group-hover:text-gold-500/25 transition-colors duration-300">{s.n}</p>
                  <h3 className="text-[13px] font-semibold tracking-[0.1em] uppercase text-ink-900 mb-3">{s.t}</h3>
                  <p className="text-[13px] text-ink-500 leading-relaxed">{s.d}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── How I Help ── */}
      <section className="bg-ink-950 py-24">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12">
          <RevealWrapper>
            <div className="mb-14">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gold-500 mb-4">How I Help</p>
              <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-normal text-white leading-tight">
                Upsizing, Without the Chaos
              </h2>
            </div>
          </RevealWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.05]">
            {points.map((p, i) => (
              <RevealWrapper key={p.t} delay={i * 70}>
                <div className="bg-ink-950 p-10 h-full">
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
              Ready for more space?
            </h2>
            <p className="text-ink-950/80 text-[14px] mt-2">Let us map out your upsize, step by step.</p>
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

      <RelatedBlogs page="upsizing" />
      <Footer />
    </>
  )
}
