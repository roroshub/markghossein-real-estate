import Link from 'next/link'
import { RevealWrapper } from './RevealWrapper'
import { Magnetic } from './Magnetic'

export function About() {
  return (
    <section id="about" className="py-32 bg-ink-950 overflow-hidden">
      <div className="mx-auto max-w-[1320px] px-8 md:px-12">

        {/* Section label */}
        <RevealWrapper>
          <div className="flex items-center gap-4 mb-20">
            <span className="block w-8 h-px bg-gold-500 shrink-0" />
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-gold-500">About Mark</p>
          </div>
        </RevealWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">

          {/* ── Visual column ── */}
          <RevealWrapper>
            <div className="relative">
              {/* Portrait card */}
              <div
                className="relative bg-ink-900 overflow-hidden"
                style={{ aspectRatio: '3/4', maxWidth: '480px' }}
              >
                {/* Monogram */}
                <div className="absolute inset-0 flex items-center justify-center select-none">
                  <span className="font-serif text-[120px] font-normal text-ink-800 leading-none">MG</span>
                </div>
              </div>

              {/* Pull quote */}
              <blockquote className="mt-10 pl-6 border-l border-gold-500/30">
                <p className="font-serif text-[18px] italic text-white/40 leading-relaxed">
                  "Buyers don't buy walls — they buy how they believe their life will look."
                </p>
              </blockquote>
            </div>
          </RevealWrapper>

          {/* ── Text column ── */}
          <RevealWrapper delay={120}>
            <h2 className="font-serif text-[clamp(38px,4.5vw,68px)] font-normal leading-[0.97] text-white mb-10 tracking-tight">
              Your Forever<br />
              Agent.<br />
              <em className="italic text-gold-500">Your Advisor.</em>
            </h2>

            <p className="text-[15px] font-light text-white/45 leading-[1.95] mb-5">
              If you're looking for an agent genuinely invested in helping your family build
              generational wealth through real estate, you've found your guy. Mark brings a
              strategic, data-driven approach to every transaction — combining deep market knowledge
              with an unwavering commitment to his clients' long-term financial wellbeing.
            </p>
            <p className="text-[15px] font-light text-white/45 leading-[1.95] mb-14">
              Based in Ottawa and affiliated with eXp Realty, Mark has helped hundreds of families
              navigate buying, selling, and upsizing — cutting through the noise to deliver real,
              measurable results.
            </p>

            <Magnetic>
              <Link
                href="#contact"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-ink-950 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-gold-300 transition-colors duration-300"
              >
                Work With Mark
              </Link>
            </Magnetic>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}
