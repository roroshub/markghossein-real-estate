import Link from 'next/link'
import { RevealWrapper } from './RevealWrapper'
import type { Step } from '@/lib/schemas'

export function SmoothMoveSystem({ steps }: { steps: Step[] }) {
  return (
    <section id="system" className="py-32 bg-ink-900">
      <div className="mx-auto max-w-[1320px] px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-28 items-start">

          {/* Left */}
          <RevealWrapper>
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gold-500 mb-5">
              Signature Program
            </p>
            <h2 className="font-serif text-[clamp(34px,3.5vw,52px)] font-normal leading-[1.1] text-white mb-6">
              The Smooth Move<br />
              <em className="italic text-gold-500">System™</em>
            </h2>
            <p className="text-[15px] font-light text-white/45 leading-[1.9] mb-10 max-w-sm">
              Selling and buying simultaneously is one of the most complex moves in real estate.
              My step-by-step framework makes the transition seamless — financially and logistically.
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-gold-500 text-ink-950 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-gold-300 transition-all duration-300 hover:-translate-y-px"
            >
              Get the Free Guide
            </Link>
          </RevealWrapper>

          {/* Right: steps */}
          <RevealWrapper delay={100}>
            <div className="divide-y divide-white/[0.06]">
              {steps.map((step) => (
                <div key={step.number} className="step-row flex gap-8 py-8 cursor-default">
                  <div
                    className="step-num font-serif text-[44px] font-normal leading-none w-14 shrink-0 transition-colors duration-300"
                    style={{ color: 'rgba(201,169,110,0.15)' }}
                  >
                    {step.number}
                  </div>
                  <div className="pt-1.5">
                    <h4 className="text-[14px] font-semibold text-white mb-2 tracking-wide">{step.title}</h4>
                    <p className="text-[13px] font-light text-white/35 leading-[1.8]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}
