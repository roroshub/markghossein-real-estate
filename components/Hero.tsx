'use client'

import { useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Magnetic } from './Magnetic'
import { PropertySearch } from './PropertySearch'

function WordReveal({ words, baseDelay = 0 }: { words: string[]; baseDelay?: number }) {
  return (
    <>
      {words.map((word, i) => (
        <span key={word} className="word-reveal-wrap mr-[0.22em]">
          <span className="word-reveal-inner" style={{ animationDelay: `${baseDelay + i * 90}ms` }}>
            {word}
          </span>
        </span>
      ))}
    </>
  )
}

const trustSignals = ['5-Star Rated', 'eXp Realty', 'Ottawa & Area']

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  const tryPlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {})
  }, [])

  useEffect(() => {
    // Respect reduced-motion: leave the video on its poster frame instead of playing.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    tryPlay()
    // Mobile browsers often need a gesture before muted autoplay is allowed.
    document.addEventListener('touchstart', tryPlay, { once: true })
    document.addEventListener('click',      tryPlay, { once: true })
    return () => {
      document.removeEventListener('touchstart', tryPlay)
      document.removeEventListener('click',      tryPlay)
    }
  }, [tryPlay])

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-ink-950">

      {/* ── Video background (all devices; poster paints instantly) ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/videos/hero-poster.jpg"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Base + gradient backdrop (also the full mobile background) */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to right, rgba(9,9,9,0.92) 0%, rgba(9,9,9,0.55) 60%, rgba(9,9,9,0.3) 100%),
            linear-gradient(to top,   rgba(9,9,9,0.8)  0%, transparent 50%)
          `,
        }}
      />

      {/* Soft gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 55% at 50% 10%, rgba(201,169,110,0.14) 0%, transparent 68%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-8 md:px-12 pt-44 pb-28 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <div
          className="flex items-center justify-center gap-4 mb-8"
          style={{ animation: 'word-up 0.7s cubic-bezier(0.16,1,0.3,1) 60ms both' }}
        >
          <span className="block w-8 h-px bg-gold-500 shrink-0" />
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-gold-500">
            Ottawa Real Estate · Make the Right Move
          </p>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-[clamp(56px,8.5vw,115px)] font-normal leading-[0.93] text-white mb-8 tracking-tight">
          <span className="block">
            <WordReveal words={['Make', 'The']} baseDelay={40} />
          </span>
          <em className="italic text-gold-500 block">
            <WordReveal words={['Right', 'Move.']} baseDelay={160} />
          </em>
        </h1>

        {/* Sub */}
        <p
          className="text-[16px] font-light text-white/55 max-w-[460px] mx-auto leading-[1.9] mb-10 tracking-wide"
          style={{ animation: 'word-up 0.7s cubic-bezier(0.16,1,0.3,1) 300ms both' }}
        >
          Whether you&apos;re buying, selling, upsizing, or downsizing, I help Ottawa
          families make confident, well-advised moves in any market.
        </p>

        {/* Property search bar */}
        <div
          className="mb-12 w-full flex justify-center"
          style={{ animation: 'word-up 0.7s cubic-bezier(0.16,1,0.3,1) 360ms both' }}
        >
          <PropertySearch />
        </div>

        {/* CTAs */}
        <div
          className="flex flex-wrap justify-center gap-4 mb-20"
          style={{ animation: 'word-up 0.7s cubic-bezier(0.16,1,0.3,1) 420ms both' }}
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
              View Services
            </Link>
          </Magnetic>
        </div>

        {/* Trust signals */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
          style={{ animation: 'word-up 0.7s cubic-bezier(0.16,1,0.3,1) 480ms both' }}
        >
          {trustSignals.map((signal, i) => (
            <div key={signal} className="flex items-center gap-10">
              {i > 0 && <div className="hidden sm:block w-px h-5 bg-white/15" />}
              <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-white/65">
                {signal}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hidden md:flex absolute bottom-10 right-12 flex-col items-center gap-3 text-white/55">
        <span className="text-[8px] font-semibold tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-14 bg-gradient-to-b from-white/40 to-transparent scroll-pulse" />
      </div>
    </section>
  )
}
