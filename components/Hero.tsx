'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

const stats = [
  { num: '500+', label: 'Families Served' },
  { num: '$2B+', label: 'In Transactions' },
  { num: '15+',  label: 'Years Experience' },
]

function WordReveal({ words, baseDelay = 0 }: { words: string[]; baseDelay?: number }) {
  return (
    <>
      {words.map((word, i) => (
        <span key={word} className="word-reveal-wrap mr-[0.22em]">
          <span
            className="word-reveal-inner"
            style={{ animationDelay: `${baseDelay + i * 110}ms` }}
          >
            {word}
          </span>
        </span>
      ))}
    </>
  )
}

export function Hero() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (gridRef.current) {
        gridRef.current.style.transform = `translateY(${window.scrollY * 0.18}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-ink-950">

      {/* Subtle grid parallax */}
      <div ref={gridRef} className="absolute inset-0 will-change-transform">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(9,9,9,0.75) 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-8 md:px-12 pt-44 pb-28">

        {/* Eyebrow */}
        <div
          className="flex items-center gap-4 mb-8 overflow-hidden"
          style={{ animation: 'word-up 0.8s cubic-bezier(0.16,1,0.3,1) 100ms both' }}
        >
          <span className="block w-8 h-px bg-gold-500 shrink-0" />
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-gold-500">
            Ontario's Premier Real Estate Advisor
          </p>
        </div>

        {/* Headline — word-by-word reveal */}
        <h1 className="font-serif text-[clamp(60px,9vw,122px)] font-normal leading-[0.93] text-white mb-8 tracking-tight">
          <span className="block">
            <WordReveal words={['Make', 'The']} baseDelay={200} />
          </span>
          <em className="italic text-gold-500 block">
            <WordReveal words={['Right', 'Move.']} baseDelay={420} />
          </em>
        </h1>

        {/* Sub */}
        <p
          className="text-[16px] font-light text-white/50 max-w-[440px] leading-[1.9] mb-14 tracking-wide"
          style={{ animation: 'word-up 0.9s cubic-bezier(0.16,1,0.3,1) 700ms both' }}
        >
          Whether you're buying, selling, or upsizing — I'm invested in helping
          your family build generational wealth through real estate.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-4 mb-24"
          style={{ animation: 'word-up 0.9s cubic-bezier(0.16,1,0.3,1) 820ms both' }}
        >
          <Link
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-gold-500 text-ink-950 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-gold-300 transition-all duration-300 hover:-translate-y-px"
          >
            Book a Consultation
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center px-8 py-4 text-white text-[11px] font-semibold tracking-[0.14em] uppercase border border-white/20 hover:border-white/50 hover:bg-white/[0.04] transition-all duration-300"
          >
            Explore Services
          </Link>
        </div>

        {/* Stats */}
        <div
          className="flex flex-wrap items-center gap-12"
          style={{ animation: 'word-up 0.9s cubic-bezier(0.16,1,0.3,1) 940ms both' }}
        >
          {stats.map(({ num, label }, i) => (
            <div key={label} className="flex items-center gap-12">
              {i > 0 && <div className="hidden sm:block w-px h-10 bg-white/10" />}
              <div>
                <p className="font-serif text-[36px] font-normal text-white leading-none mb-1.5">{num}</p>
                <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-white/30">{label}</p>
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
