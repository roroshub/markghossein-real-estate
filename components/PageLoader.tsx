'use client'

import { useEffect, useState } from 'react'

export function PageLoader() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'gone'>('visible')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fading'), 1400)
    const t2 = setTimeout(() => setPhase('gone'),   2000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'gone') return null

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[99999] bg-ink-950 flex flex-col items-center justify-center"
      style={{
        opacity:    phase === 'fading' ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: phase === 'fading' ? 'none' : 'all',
      }}
    >
      {/* Logo mark */}
      <div
        style={{
          transform: phase === 'fading' ? 'scale(0.92) translateY(-8px)' : 'scale(1) translateY(0)',
          transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
        }}
        className="flex flex-col items-center gap-6"
      >
        <div className="w-16 h-16 bg-gold-500 flex items-center justify-center">
          <span className="font-serif text-ink-950 text-2xl font-semibold tracking-wider">MG</span>
        </div>

        {/* Progress line */}
        <div className="w-16 h-px bg-white/10 overflow-hidden">
          <div className="h-full bg-gold-500 loader-line" />
        </div>
      </div>
    </div>
  )
}
