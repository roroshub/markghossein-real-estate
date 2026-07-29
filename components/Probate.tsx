import Link from 'next/link'
import { RevealWrapper } from './RevealWrapper'

export function Probate() {
  return (
    <section id="probate" className="py-32 bg-ink-950 overflow-hidden">
      <div className="mx-auto max-w-[1320px] px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-16 lg:gap-24 items-center">

          {/* ── Copy ── */}
          <RevealWrapper>
            <div className="flex items-center gap-4 mb-6">
              <span className="block w-8 h-px bg-gold-500 shrink-0" />
              <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gold-500">Probate & Estate Advisor</p>
            </div>
            <h2 className="font-serif text-[clamp(32px,3.8vw,56px)] font-normal leading-[1.05] text-white mb-7">
              Selling an Estate or<br />
              <em className="italic text-gold-500">Inherited Property?</em>
            </h2>
            <p className="text-[15px] font-light text-white/55 leading-[1.95] mb-5">
              Settling a loved one&apos;s estate is one of the hardest things a family can go through.
              As a <span className="text-white/70">Probate Real Estate Specialist</span>, I guide
              executors and beneficiaries through the sale of probate and inherited properties with
              patience, discretion, and a clear plan.
            </p>
            <p className="text-[15px] font-light text-white/55 leading-[1.95] mb-10">
              From coordinating with estate lawyers to preparing the home for market and maximizing its
              value, I handle the real estate side so you can focus on your family.
            </p>
            <Link
              href="/probate"
              className="inline-flex items-center px-8 py-4 bg-gold-500 text-ink-950 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-gold-300 transition-colors duration-300"
            >
              Learn About Probate Sales
            </Link>
          </RevealWrapper>

          {/* ── Highlights ── */}
          <RevealWrapper delay={120}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06]">
              {[
                { t: 'Probate Specialist', d: 'Experienced in the legal and financial nuances of probate & estate sales.' },
                { t: 'Executor Support',     d: 'I work alongside your estate lawyer and coordinate every deadline.' },
                { t: 'Discreet & Patient',   d: 'A compassionate, no-pressure process on your family’s timeline.' },
                { t: 'Maximized Value',      d: 'Strategic prep and pricing to protect the estate’s proceeds.' },
              ].map(({ t, d }) => (
                <div key={t} className="bg-ink-950 p-9">
                  <p className="text-[13px] font-semibold tracking-[0.08em] uppercase text-white mb-3">{t}</p>
                  <p className="text-[13px] font-light text-white/55 leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}
