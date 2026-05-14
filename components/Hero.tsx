'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

const stats = [
  { num: '500+', label: 'Families Served' },
  { num: '$2B+', label: 'In Transactions' },
  { num: '15+',  label: 'Years Experience' },
]

export function Hero() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (gridRef.current) {
        gridRef.current.style.transform = `translateY(${window.scrollY * 0.2}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-ink-950">

      {/* Subtle grid */}
      <div ref={gridRef} className="absolute inset-0 will-change-transform opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(9,9,9,0.7) 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-8 md:px-12 pt-44 pb-28">

        {/* Eyebrow */}
        <p className="flex items-center gap-4 text-[10px] font-medium tracking-[0.3em] uppercase text-gold-500 mb-8">
          <span className="block w-8 h-px bg-gold-500" />
          Ontario's Premier Real Estate Advisor
        </p>

        {/* Headline */}
        <h1 className="font-serif text-[clamp(60px,9vw,120px)] font-normal leading-[0.95] text-white mb-8 tracking-tight">
          Make The<br />
          <em className="italic text-gold-500">Right Move.</em>
        </h1>

        {/* Sub */}
        <p className="text-[16px] font-light text-white/50 max-w-[460px] leading-[1.9] mb-14 tracking-wide">
          Whether you're buying, selling, or upsizing — I'm invested in helping
          your family build generational wealth through real estate.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-24">
          <Link
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-gold-500 text-ink-950 text-[11px] font-semibold tracking-[0.12em] uppercase hover:bg-gold-300 transition-all duration-300 hover:-translate-y-px"
          >
            Book a Consultation
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center px-8 py-4 text-white text-[11px] font-semibold tracking-[0.12em] uppercase border border-white/20 hover:border-white/50 hover:bg-white/[0.04] transition-all duration-300"
          >
            Explore Services
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-12">
          {stats.map(({ num, label }, i) => (
            <div key={label} className="flex items-center gap-12">
              {i > 0 && <div className="hidden sm:block w-px h-10 bg-white/10" />}
              <div>
                <p className="font-serif text-[36px] font-normal text-white leading-none mb-1.5">{num}</p>
                <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/30">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hidden md:flex absolute bottom-10 right-12 flex-col items-center gap-3 text-white/25">
        <span className="text-[8px] font-semibold tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-14 bg-gradient-to-b from-white/25 to-transparent scroll-pulse" />
      </div>
    </section>
  )
}
