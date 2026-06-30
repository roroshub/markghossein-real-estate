'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

// Rough Ottawa price-per-square-foot anchors by area. These are ballpark only.
// A real valuation always comes from a full comparative market analysis.
const areas: Record<string, number> = {
  'Westboro':    520,
  'The Glebe':   540,
  'Hintonburg':  500,
  'Centretown':  470,
  'Kanata':      400,
  'Barrhaven':   380,
  'Orleans':     370,
  'Stittsville': 390,
  'Other Ottawa': 410,
}

const typeFactor: Record<string, number> = {
  'Detached':      1.0,
  'Semi-Detached': 0.9,
  'Townhouse':     0.82,
  'Condo':         0.78,
}

const conditionFactor: Record<string, number> = {
  'Move-in ready': 1.0,
  'Updated':       1.08,
  'Needs work':    0.88,
}

const fmt = (n: number) =>
  '$' + (Math.round(n / 1000) * 1000).toLocaleString('en-CA')

export function HomeValueEstimator() {
  const [area, setArea]   = useState('Westboro')
  const [type, setType]   = useState('Detached')
  const [cond, setCond]   = useState('Move-in ready')
  const [sqft, setSqft]   = useState(1800)
  const [beds, setBeds]   = useState(3)
  const [baths, setBaths] = useState(2)

  const { low, mid, high } = useMemo(() => {
    const base = (areas[area] ?? 410) * sqft
    const adjusted =
      base *
      (typeFactor[type] ?? 1) *
      (conditionFactor[cond] ?? 1) *
      (1 + (beds - 3) * 0.03) *
      (1 + (baths - 2) * 0.025)
    return { low: adjusted * 0.92, mid: adjusted, high: adjusted * 1.08 }
  }, [area, type, cond, sqft, beds, baths])

  const fieldWrap = 'flex flex-col gap-2'
  const labelCls  = 'text-[10px] font-semibold tracking-[0.18em] uppercase text-white/55'
  const inputCls  = 'field-input'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-px bg-white/[0.06] border border-white/[0.06]">
      {/* ── Inputs ── */}
      <div className="bg-ink-950 p-8 md:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className={fieldWrap}>
            <label className={labelCls}>Neighbourhood</label>
            <select value={area} onChange={(e) => setArea(e.target.value)} className={inputCls} aria-label="Neighbourhood">
              {Object.keys(areas).map((a) => <option key={a}>{a}</option>)}
            </select>
          </div>
          <div className={fieldWrap}>
            <label className={labelCls}>Property Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className={inputCls} aria-label="Property type">
              {Object.keys(typeFactor).map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className={fieldWrap}>
            <label className={labelCls}>Square Feet</label>
            <input
              type="number" min={300} max={12000} step={50}
              value={sqft}
              onChange={(e) => setSqft(Math.max(0, Number(e.target.value)))}
              className={inputCls}
              aria-label="Square feet"
            />
          </div>
          <div className={fieldWrap}>
            <label className={labelCls}>Condition</label>
            <select value={cond} onChange={(e) => setCond(e.target.value)} className={inputCls} aria-label="Condition">
              {Object.keys(conditionFactor).map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className={fieldWrap}>
            <label className={labelCls}>Bedrooms</label>
            <input
              type="number" min={0} max={12}
              value={beds}
              onChange={(e) => setBeds(Math.max(0, Number(e.target.value)))}
              className={inputCls}
              aria-label="Bedrooms"
            />
          </div>
          <div className={fieldWrap}>
            <label className={labelCls}>Bathrooms</label>
            <input
              type="number" min={0} max={12}
              value={baths}
              onChange={(e) => setBaths(Math.max(0, Number(e.target.value)))}
              className={inputCls}
              aria-label="Bathrooms"
            />
          </div>
        </div>
      </div>

      {/* ── Result ── */}
      <div className="bg-ink-900 p-8 md:p-10 flex flex-col justify-center">
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gold-500 mb-4">
          Estimated Value Range
        </p>
        <p className="font-serif text-[clamp(34px,4vw,52px)] font-normal text-white leading-none mb-2 tabular-nums">
          {fmt(low)} <span className="text-white/55">to</span> {fmt(high)}
        </p>
        <p className="text-[13px] font-light text-white/55 mb-8">
          Midpoint estimate <span className="text-white/70">{fmt(mid)}</span>
        </p>

        <p className="text-[12px] font-light text-white/55 leading-relaxed mb-8">
          This is a quick ballpark based on neighbourhood averages, not an appraisal. For an
          accurate, no-obligation HomeWorth valuation tailored to your exact home, let&apos;s talk.
        </p>

        <Link
          href="/#contact"
          className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-ink-950 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-gold-300 transition-colors duration-300"
        >
          Get My Real HomeWorth Report
        </Link>
      </div>
    </div>
  )
}
