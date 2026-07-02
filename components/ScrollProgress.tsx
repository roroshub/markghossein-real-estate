'use client'

import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let max = 1
    let ticking = false

    // Cache the scrollable height; only re-measure on resize (and once after
    // load) instead of forcing a reflow on every scroll frame.
    const measure = () => {
      const el = document.documentElement
      max = Math.max(el.scrollHeight - el.clientHeight, 1)
    }
    measure()

    const update = () => {
      ticking = false
      const bar = barRef.current
      if (bar) bar.style.transform = `scaleX(${Math.min(window.scrollY / max, 1)})`
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    window.addEventListener('load', measure)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[99999] h-[2px] bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-gold-500 origin-left"
        style={{ transform: 'scaleX(0)', transition: 'transform 0.1s linear' }}
      />
    </div>
  )
}
