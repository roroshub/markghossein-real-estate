'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Forward Lenis scroll events to native scroll listeners (for Navbar, etc.)
    lenis.on('scroll', () => {
      window.dispatchEvent(new Event('scroll'))
    })

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Make anchor links work with Lenis
    const handleAnchor = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]')
      if (!target) return
      e.preventDefault()
      const id = (target.getAttribute('href') ?? '').slice(1)
      const el = document.getElementById(id)
      if (el) lenis.scrollTo(el, { offset: -80 })
    }
    document.addEventListener('click', handleAnchor)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      document.removeEventListener('click', handleAnchor)
    }
  }, [])

  return null
}
