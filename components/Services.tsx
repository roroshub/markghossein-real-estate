import Link from 'next/link'
import { RevealWrapper } from './RevealWrapper'
import type { Service } from '@/lib/schemas'

const icons: Record<string, React.ReactNode> = {
  buyer: (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <path d="M4 28V14L16 4l12 10v14H20v-8h-8v8H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  seller: (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <path d="M6 26l4-12 6 4 6-8 4 16H6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="24" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  upsizing: (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <path d="M8 24V12l4-4h8l4 4v12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 24v-6h8v6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M4 24h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  investment: (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="14" r="6" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 28c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
}

export function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="py-32 bg-ink-950">
      <div className="mx-auto max-w-[1320px] px-8 md:px-12">
        <RevealWrapper className="mb-20">
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gold-500 mb-5">
            What I Offer
          </p>
          <h2 className="font-serif text-[clamp(34px,3.5vw,52px)] font-normal leading-[1.1] text-white">
            Full-Service Real Estate,<br />Done Right.
          </h2>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 divide-x divide-y divide-white/[0.05] border border-white/[0.05]">
          {services.map((svc, i) => (
            <RevealWrapper key={svc.id} delay={i * 60}>
              <div className="group p-10 flex flex-col h-full hover:bg-ink-900 transition-colors duration-300">
                <div className="text-gold-500 mb-8">
                  {icons[svc.id] ?? icons['buyer']}
                </div>

                <h3 className="font-serif text-[22px] font-normal text-white mb-3 leading-tight">
                  {svc.title}
                </h3>
                <p className="text-[13px] font-light text-white/40 leading-[1.85] mb-8 flex-1">
                  {svc.description}
                </p>

                <ul className="flex flex-col gap-2.5 mb-9">
                  {svc.bullets.map((b) => (
                    <li key={b} className="text-[12px] font-light text-white/35 pl-4 relative">
                      <span className="absolute left-0 text-gold-500/60 text-[9px] top-[2px]">—</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <Link
                  href={svc.cta.href}
                  className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gold-500 hover:tracking-[0.26em] transition-all duration-300"
                >
                  {svc.cta.label} →
                </Link>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
