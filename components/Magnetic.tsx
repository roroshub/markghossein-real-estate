'use client'

import { useRef, type ReactNode } from 'react'

interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
}

export function Magnetic({ children, strength = 0.28, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  // Measure once on enter instead of every mousemove — getBoundingClientRect
  // inside mousemove forces a layout reflow per event.
  const rectRef = useRef<DOMRect | null>(null)

  const onEnter = () => {
    rectRef.current = ref.current?.getBoundingClientRect() ?? null
  }

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    const rect = rectRef.current
    if (!el || !rect) return
    const x = (e.clientX - rect.left - rect.width  / 2) * strength
    const y = (e.clientY - rect.top  - rect.height / 2) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  const onLeave = () => {
    rectRef.current = null
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block ${className}`}
      style={{ transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)' }}
    >
      {children}
    </div>
  )
}
