import Link from 'next/link'
import { RevealWrapper } from './RevealWrapper'

const pillars = [
  { title: 'Strategic Pricing',  body: 'Data over emotion — every single time.' },
  { title: 'Long-Term Equity',   body: 'Building wealth that outlasts the transaction.' },
  { title: 'Full Transparency',  body: 'No hidden agendas, no commission games.' },
]

export function About() {
  return (
    <section id="about" className="py-32 bg-white">
      <div className="mx-auto max-w-[1320px] px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">

          {/* Image column */}
          <RevealWrapper>
            <div className="relative">
              {/* Main portrait card */}
              <div
                className="relative bg-ink-100 overflow-hidden"
                style={{ aspectRatio: '3/4', maxWidth: '480px' }}
              >
                {/* Placeholder — replace with <Image> */}
                <div className="absolute inset-0 bg-ink-800 flex items-center justify-center">
                  <span className="font-serif text-[110px] font-normal select-none text-ink-700">
                    MG
                  </span>
                </div>

                {/* Credential badge */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm px-7 py-5 flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-semibold text-ink-900 tracking-wide">Century 21</p>
                    <p className="text-[11px] text-ink-400 tracking-widest uppercase mt-0.5">Certified Advisor</p>
                  </div>
                  <span className="text-gold-500 text-xl">★</span>
                </div>
              </div>

              {/* Pull quote */}
              <div className="mt-8 border-l-2 border-gold-500 pl-6">
                <p className="font-serif text-[20px] italic text-ink-600 leading-snug">
                  "Buyers don't buy walls — they buy how they believe their life will look."
                </p>
              </div>
            </div>
          </RevealWrapper>

          {/* Text column */}
          <RevealWrapper delay={100}>
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gold-500 mb-5">
              About Mark
            </p>
            <h2 className="font-serif text-[clamp(34px,3.5vw,52px)] font-normal leading-[1.1] text-ink-900 mb-7">
              Your Forever Agent.<br />Your Trusted Advisor.
            </h2>
            <p className="text-[15px] font-light text-ink-500 leading-[1.9] mb-5">
              If you're looking for an agent genuinely invested in helping your family build
              generational wealth through real estate, you've found your guy. Mark Ghossein brings
              a strategic, data-driven approach to every transaction — combining deep market knowledge
              with an unwavering commitment to his clients' long-term financial wellbeing.
            </p>
            <p className="text-[15px] font-light text-ink-500 leading-[1.9] mb-12">
              Based in Ontario and affiliated with Century 21, Mark has helped hundreds of families
              navigate buying, selling, and upsizing — cutting through the noise to deliver real,
              measurable results.
            </p>

            {/* Pillars */}
            <div className="flex flex-col divide-y divide-ink-100">
              {pillars.map(({ title, body }) => (
                <div key={title} className="flex gap-5 items-start py-5">
                  <span className="text-gold-500 text-sm mt-0.5 shrink-0">—</span>
                  <div>
                    <p className="text-[13px] font-semibold text-ink-900 mb-1 tracking-wide">{title}</p>
                    <p className="text-[13px] font-light text-ink-400">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="#contact"
              className="inline-flex items-center mt-10 px-8 py-4 bg-ink-900 text-white text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-ink-700 transition-all duration-300 hover:-translate-y-px"
            >
              Work With Mark
            </Link>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}
