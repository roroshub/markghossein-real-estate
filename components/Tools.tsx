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
}

export function Tools({ tools }: { tools: Tool[] }) {
  return (
    <section id="tools" className="py-32 bg-white">
      <div className="mx-auto max-w-[1320px] px-8 md:px-12">
        <RevealWrapper className="mb-20">
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gold-500 mb-5">
            Free Resources
          </p>
          <h2 className="font-serif text-[clamp(34px,3.5vw,52px)] font-normal leading-[1.1] text-ink-900">
            Tools at Your Fingertips
          </h2>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-ink-100 border border-ink-100">
          {tools.map((tool, i) => (
            <RevealWrapper key={tool.id} delay={i * 70}>
              <div className="group p-12 flex flex-col h-full hover:bg-ink-50 transition-colors duration-300">
                <div className="text-ink-300 mb-8 group-hover:text-gold-500 transition-colors duration-300">
                  {toolIcons[tool.id] ?? toolIcons['homeworth']}
                </div>
                <h3 className="font-serif text-[24px] font-normal text-ink-900 mb-3">{tool.title}</h3>
                <p className="text-[14px] font-light text-ink-400 leading-[1.85] mb-10 flex-1">{tool.description}</p>
                <Link
                  href="#contact"
                  className="text-[10px] font-semibold tracking-[0.18em] uppercase text-ink-900 hover:text-gold-500 transition-colors duration-200"
                >
                  {tool.cta} →
                </Link>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
