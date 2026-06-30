import { RevealWrapper } from './RevealWrapper'
import type { Testimonial } from '@/lib/schemas'

const reviewBadges = [
  { score: '5.0',  source: 'Google Reviews' },
  { score: '4.9',  source: 'Realtor.ca' },
  { score: '100%', source: 'Recommendation Rate' },
]

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section id="testimonials" className="relative py-32 bg-ink-950 overflow-hidden">
      {/* Ghost label */}
      <p
        aria-hidden="true"
        className="absolute -top-2 left-0 font-serif font-normal select-none pointer-events-none"
        style={{ fontSize: 'clamp(80px,14vw,200px)', color: 'rgba(255,255,255,0.022)', lineHeight: 1, letterSpacing: '-0.02em' }}
      >
        Reviews
      </p>
      <div className="mx-auto max-w-[1320px] px-8 md:px-12">
        <RevealWrapper className="mb-20">
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gold-500 mb-5">
            Client Stories
          </p>
          <h2 className="font-serif text-[clamp(34px,3.5vw,52px)] font-normal leading-[1.1] text-white">
            Real Results.<br />Real Families.
          </h2>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <RevealWrapper key={t.id} delay={i * 70}>
              <article className="group border border-white/[0.06] p-10 hover:border-gold-500/25 hover:-translate-y-1 transition-all duration-300">
                <div className="text-gold-500 tracking-[3px] text-[12px] mb-6">
                  {'★'.repeat(t.rating)}
                </div>
                <blockquote className="font-serif text-[18px] font-normal italic text-white/75 leading-[1.7] mb-8">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-4 pt-6 border-t border-white/[0.06]">
                  <div className="w-10 h-10 bg-ink-800 border border-white/[0.06] flex items-center justify-center text-[10px] font-semibold text-gold-500 tracking-wider shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-white">{t.name}</p>
                    <p className="text-[11px] font-light text-white/55">{t.detail}</p>
                  </div>
                </div>
              </article>
            </RevealWrapper>
          ))}
        </div>

        {/* Rating badges */}
        <RevealWrapper>
          <div className="border-t border-white/[0.06] pt-12 flex flex-wrap items-center justify-center gap-20">
            {reviewBadges.map(({ score, source }) => (
              <div key={source} className="flex flex-col items-center gap-2">
                <span className="font-serif text-[42px] font-normal text-white leading-none">{score}</span>
                <div className="text-gold-500 tracking-[3px] text-[11px]">★★★★★</div>
                <span className="text-[9px] tracking-[0.2em] uppercase text-white/55">{source}</span>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
