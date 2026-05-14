'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Magnetic } from './Magnetic'

function useCounter(target: number, duration = 1800, suffix = '') {
  const [display, setDisplay] = useState('0' + suffix)
  const [triggered, setTriggered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry?.isIntersecting) { setTriggered(true); observer.disconnect() } },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!triggered) return
    let start: number
    const step = (ts: number) => {
      if (!start) start = ts
      const pct = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - pct, 3)
      setDisplay(String(Math.floor(eased * target)) + suffix)
      if (pct < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [triggered, target, duration, suffix])

  return { display, ref }
}

function WordReveal({ words, baseDelay = 0 }: { words: string[]; baseDelay?: number }) {
  return (
    <>
      {words.map((word, i) => (
        <span key={word} className="word-reveal-wrap mr-[0.22em]">
          <span className="word-reveal-inner" style={{ animationDelay: `${baseDelay + i * 110}ms` }}>
            {word}
          </span>
        </span>
      ))}
    </>
  )
}

const statsConfig = [
  { target: 500, suffix: '+', label: 'Families Served' },
  { target: 2,   suffix: 'B+', label: 'In Transactions', prefix: '$' },
  { target: 15,  suffix: '+', label: 'Years Experience' },
]

export function Hero() {
  const gridRef = useRef<HTMLDivElement>(null)
  const s0 = useCounter(statsConfig[0]!.target, 1800, statsConfig[0]!.suffix)
  const s1 = useCounter(statsConfig[1]!.target, 1400, statsConfig[1]!.suffix)
  const s2 = useCounter(statsConfig[2]!.target, 1600, statsConfig[2]!.suffix)
  const counters = [s0, s1, s2]

  useEffect(() => {
    const onScroll = () => {
      if (gridRef.current)
        gridRef.current.style.transform = `translateY(${window.scrollY * 0.18}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-ink-950">
      {/* Parallax grid */}
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

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(9,9,9,0.75) 100%)' }}
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

        {/* Headline */}
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
          <Magnetic>
            <Link
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-gold-500 text-ink-950 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-gold-300 transition-colors duration-300"
            >
              Book a Consultation
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="#services"
              className="inline-flex items-center px-8 py-4 text-white text-[11px] font-semibold tracking-[0.14em] uppercase border border-white/20 hover:border-white/50 hover:bg-white/[0.04] transition-all duration-300"
            >
              Explore Services
            </Link>
          </Magnetic>
        </div>

        {/* Animated stats */}
        <div
          className="flex flex-wrap items-center gap-12"
          style={{ animation: 'word-up 0.9s cubic-bezier(0.16,1,0.3,1) 940ms both' }}
        >
          {statsConfig.map(({ label, prefix = '' }, i) => {
            const { display, ref } = counters[i]!
            return (
              <div key={label} ref={ref} className="flex items-center gap-12">
                {i > 0 && <div className="hidden sm:block w-px h-10 bg-white/10" />}
                <div>
                  <p className="font-serif text-[36px] font-normal text-white leading-none mb-1.5 tabular-nums">
                    {prefix}{display}
                  </p>
                  <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-white/30">{label}</p>
                </div>
              </div>
            )
          })}
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
