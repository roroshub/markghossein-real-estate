'use client'

import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      setProgress(window.scrollY / (el.scrollHeight - el.clientHeight))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[99999] h-[2px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gold-500 origin-left"
        style={{ transform: `scaleX(${progress})`, transition: 'transform 0.1s linear' }}
      />
    </div>
  )
}
