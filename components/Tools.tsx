import Link from 'next/link'
import { RevealWrapper } from './RevealWrapper'
import type { Tool } from '@/lib/schemas'

const toolIcons: Record<string, React.ReactNode> = {
  homeworth: (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <rect x="6" y="8" width="28" height="24" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M13 20h14M13 26h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="20" cy="14" r="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  'nosey-neighbour': (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <path d="M20 6C13.373 6 8 11.373 8 18c0 9 12 16 12 16s12-7 12-16c0-6.627-5.373-12-12-12z" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="20" cy="18" r="4" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  'buyer-checklist': (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <rect x="8" y="6" width="24" height="28" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M14 14h12M14 20h12M14 26h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  'seller-checklist': (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <rect x="9" y="7" width="22" height="27" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="15" y="4" width="10" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M14 18l2.5 2.5L21 15M14 26l2.5 2.5L21 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'mortgage-calculator': (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <rect x="9" y="5" width="22" height="30" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="13" y="9" width="14" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M14 22h.5M20 22h.5M26 22h.5M14 27h.5M20 27h.5M26 27h.5M14 32h.5M20 32h.5M26 32h.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
}

// Where each tool's CTA leads (defaults to the contact section).
const toolLinks: Record<string, string> = {
  homeworth: 'https://search.markghossein.com/homeworth',
  'nosey-neighbour': 'https://search.markghossein.com/streetmatch',
  'mortgage-calculator': '/mortgage-calculator',
}

export function Tools({ tools }: { tools: Tool[] }) {
  return (
    <section id="tools" className="py-32 bg-cream">
      <div className="mx-auto max-w-[1320px] px-8 md:px-12">
        <RevealWrapper className="mb-20">
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gold-700 mb-5">
            Free Resources
          </p>
          <h2 className="font-serif text-[clamp(34px,3.5vw,52px)] font-normal leading-[1.1] text-ink-900">
            Tools at Your Fingertips
          </h2>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-100 border border-ink-100">
          {tools.map((tool, i) => {
            const href = toolLinks[tool.id] ?? '#contact'
            const external = href.startsWith('http')
            const ctaClass = 'text-[12px] font-semibold tracking-[0.16em] uppercase text-ink-900 hover:text-gold-600 transition-colors duration-200'
            return (
              <RevealWrapper key={tool.id} delay={i * 70}>
                <div className="group h-full bg-cream p-12 flex flex-col hover:bg-white transition-colors duration-300">
                  <div className="text-ink-300 mb-8 group-hover:text-gold-600 transition-colors duration-300">
                    {toolIcons[tool.id] ?? toolIcons['homeworth']}
                  </div>
                  <h3 className="font-serif text-[24px] font-normal text-ink-900 mb-3">{tool.title}</h3>
                  <p className="text-[14px] font-light text-ink-500 leading-[1.85] mb-10 flex-1">{tool.description}</p>
                  {external ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className={ctaClass}>
                      {tool.cta} →
                    </a>
                  ) : (
                    <Link href={href} className={ctaClass}>
                      {tool.cta} →
                    </Link>
                  )}
                </div>
              </RevealWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
