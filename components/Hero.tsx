'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { Magnetic } from './Magnetic'
import { PropertySearch } from './PropertySearch'

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
  { target: 500, suffix: '+',  label: 'Families Served',   prefix: ''  },
  { target: 2,   suffix: 'B+', label: 'In Transactions',   prefix: '$' },
  { target: 15,  suffix: '+',  label: 'Years Experience',  prefix: ''  },
]

export function Hero() {
  const s0 = useCounter(500, 1800, '+')
  const s1 = useCounter(2,   1400, 'B+')
  const s2 = useCounter(15,  1600, '+')
  const counters = [s0, s1, s2]
  const videoRef = useRef<HTMLVideoElement>(null)

  // Mobile browsers require a programmatic .play() call even when
  // autoPlay + muted + playsInline are all set — the declarative
  // attribute is often ignored by mobile Safari / Android Chrome.
  const tryPlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true          // must be set in JS too for iOS
    v.play().catch(() => {  // silently swallow autoplay-policy rejections
      // Video stays hidden behind the dark overlay — no visible impact
    })
  }, [])

  useEffect(() => {
    tryPlay()
    // Also retry on any user gesture in case the first attempt was blocked
    document.addEventListener('touchstart', tryPlay, { once: true })
    document.addEventListener('click',      tryPlay, { once: true })
    return () => {
      document.removeEventListener('touchstart', tryPlay)
      document.removeEventListener('click',      tryPlay)
    }
  }, [tryPlay])

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-ink-950">

      {/* ── Video background ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay — ensures text legibility over any video */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to right, rgba(9,9,9,0.92) 0%, rgba(9,9,9,0.55) 60%, rgba(9,9,9,0.3) 100%),
            linear-gradient(to top,   rgba(9,9,9,0.8)  0%, transparent 50%)
          `,
        }}
      />

      {/* Subtle grid on top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-8 md:px-12 pt-44 pb-28">

        {/* Eyebrow */}
        <div
          className="flex items-center gap-4 mb-8"
          style={{ animation: 'word-up 0.8s cubic-bezier(0.16,1,0.3,1) 100ms both' }}
        >
          <span className="block w-8 h-px bg-gold-500 shrink-0" />
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-gold-500">
            Ottawa Real Estate · Make the Right Move
          </p>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-[clamp(56px,8.5vw,115px)] font-normal leading-[0.93] text-white mb-8 tracking-tight">
          <span className="block">
            <WordReveal words={['Make', 'The']} baseDelay={200} />
          </span>
          <em className="italic text-gold-500 block">
            <WordReveal words={['Right', 'Move.']} baseDelay={420} />
          </em>
        </h1>

        {/* Sub */}
        <p
          className="text-[16px] font-light text-white/50 max-w-[420px] leading-[1.9] mb-10 tracking-wide"
          style={{ animation: 'word-up 0.9s cubic-bezier(0.16,1,0.3,1) 680ms both' }}
        >
          Whether you're buying, selling, or upsizing — I help Ottawa families
          build generational wealth through real estate.
        </p>

        {/* Property search bar */}
        <div
          className="mb-12"
          style={{ animation: 'word-up 0.9s cubic-bezier(0.16,1,0.3,1) 780ms both' }}
        >
          <PropertySearch />
        </div>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-4 mb-20"
          style={{ animation: 'word-up 0.9s cubic-bezier(0.16,1,0.3,1) 880ms both' }}
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
              href="/buyers"
              className="inline-flex items-center px-8 py-4 text-white text-[11px] font-semibold tracking-[0.14em] uppercase border border-white/20 hover:border-white/50 hover:bg-white/[0.04] transition-all duration-300"
            >
              Buyer's Guide →
            </Link>
          </Magnetic>
        </div>

        {/* Stats */}
        <div
          className="flex flex-wrap items-center gap-12"
          style={{ animation: 'word-up 0.9s cubic-bezier(0.16,1,0.3,1) 960ms both' }}
        >
          {statsConfig.map(({ label, prefix }, i) => {
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
