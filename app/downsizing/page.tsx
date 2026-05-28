import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealWrapper } from '@/components/RevealWrapper'

export const metadata: Metadata = {
  title: 'Downsizing Your Home',
  description:
    'Ready for less house and more freedom? Mark Ghossein helps Ottawa empty-nesters and retirees downsize with care — unlocking equity and simplifying life.',
}

const points = [
  { t: 'Unlock Your Equity', d: 'Decades of ownership built real wealth — I help you convert it into freedom, travel, or your retirement plan.' },
  { t: 'Right-Size, Don’t Settle', d: 'Bungalows, condos, low-maintenance living — we find a home that fits the life you want now.' },
  { t: 'Compassionate Pace', d: 'Sorting a lifetime of belongings is emotional. I move at your speed and connect you with trusted help.' },
  { t: 'Time the Market', d: 'A clear sell-and-buy strategy so you’re never rushed into a decision or stuck between homes.' },
]

export default function DownsizingPage() {
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
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-gold-500">My Move · Downsizing</p>
          </div>
          <h1 className="font-serif text-[clamp(44px,6.5vw,92px)] font-normal leading-[0.95] text-white tracking-tight mb-6">
            Less House, <em className="italic text-gold-500">More Life.</em>
          </h1>
          <p className="text-[16px] font-light text-white/50 max-w-[560px] leading-[1.9]">
            The big house did its job. Now it&apos;s time to unlock your equity and simplify — on your
            terms, at your pace, with someone who gets it.
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
                Downsizing, Done Gently
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
              Ready to simplify?
            </h2>
            <p className="text-ink-950/60 text-[14px] mt-2">Let&apos;s talk about your next chapter.</p>
          </div>
          <div className="flex gap-4 shrink-0">
            <Link href="/#contact" className="inline-flex items-center px-8 py-4 bg-ink-950 text-white text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-ink-800 transition-colors duration-300">
              Book a Consultation
            </Link>
            <Link href="/upsizing" className="inline-flex items-center px-8 py-4 border border-ink-950/30 text-ink-950 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-ink-950/10 transition-colors duration-300">
              Upsizing instead →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
