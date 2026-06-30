'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only enable on non-touch devices with a fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let x = mouseX
    let y = mouseY
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      const dot = dotRef.current
      if (dot) {
        // Light smoothing so the dot feels fluid without lagging behind
        x += (mouseX - x) * 0.35
        y += (mouseY - y) * 0.35
        dot.style.transform = `translate(${x}px, ${y}px)`
      }
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)
    window.addEventListener('mousemove', onMove)

    // Grow + soften the dot over interactive elements
    const setHover   = () => dotRef.current?.classList.add('is-hovering')
    const unsetHover = () => dotRef.current?.classList.remove('is-hovering')

    const bindHovers = () => {
      document.querySelectorAll('a, button, input, select, textarea, [data-cursor-hover]').forEach((el) => {
        el.addEventListener('mouseenter', setHover)
        el.addEventListener('mouseleave', unsetHover)
      })
    }
    bindHovers()

    const observer = new MutationObserver(bindHovers)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
}
