'use client'

import { useState, useMemo } from 'react'

const fmt = (n: number) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n)

const amortOptions = [5, 10, 15, 20, 25, 30]

export function MortgageCalculator() {
  const [homePrice,     setHomePrice]     = useState(750_000)
  const [downPct,       setDownPct]       = useState(20)
  const [downMode,      setDownMode]      = useState<'pct' | 'amt'>('pct')
  const [downAmt,       setDownAmt]       = useState(150_000)
  const [rate,          setRate]          = useState(5.25)
  const [amort,         setAmort]         = useState(25)
  const [frequency,     setFrequency]     = useState<'monthly' | 'biweekly' | 'weekly'>('monthly')

  // Keep pct/amt in sync when mode switches
  const dp = downMode === 'pct' ? (homePrice * downPct) / 100 : downAmt
  const dpPct = homePrice > 0 ? (dp / homePrice) * 100 : 0

  // Canadian semi-annual compounding: r = (1 + rate/200)^(1/6) - 1
  const results = useMemo(() => {
    const principal = Math.max(homePrice - dp, 0)
    if (principal <= 0 || rate <= 0) return null

    const periodsPerYear = frequency === 'monthly' ? 12 : frequency === 'biweekly' ? 26 : 52
    const r = Math.pow(1 + rate / 200, 1 / 6) - 1
    // Convert to per-period rate
    const rp = Math.pow(1 + r, 12 / periodsPerYear) - 1
    const n  = amort * periodsPerYear

    const payment     = principal * (rp * Math.pow(1 + rp, n)) / (Math.pow(1 + rp, n) - 1)
    const totalPaid   = payment * n
    const totalInterest = totalPaid - principal
    const principalPct = (principal / totalPaid) * 100

    return { payment, totalPaid, totalInterest, principal, principalPct }
  }, [homePrice, dp, rate, amort, frequency])

  const needsCMHC = dpPct < 20

  const freqLabel: Record<typeof frequency, string> = {
    monthly: 'month', biweekly: '2 weeks', weekly: 'week',
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-px bg-white/[0.07]">

      {/* ── Inputs ── */}
      <div className="bg-ink-850 p-10 lg:p-14 flex flex-col gap-8">

        {/* Home Price */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40">Home Price</label>
            <span className="font-serif text-[18px] text-white">{fmt(homePrice)}</span>
          </div>
          <input
            type="range" className="calc-slider"
            min={100_000} max={3_000_000} step={10_000}
            value={homePrice}
            onChange={(e) => {
              const v = Number(e.target.value)
              setHomePrice(v)
              if (downMode === 'pct') setDownAmt((v * downPct) / 100)
              else setDownPct((downAmt / v) * 100)
            }}
          />
          <div className="flex justify-between mt-2 text-[10px] text-white/25">
            <span>$100K</span><span>$3M</span>
          </div>
        </div>

        {/* Down Payment */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40">Down Payment</label>
            <div className="flex items-center gap-3">
              <span className="font-serif text-[18px] text-white">
                {downMode === 'pct' ? `${downPct.toFixed(0)}%` : fmt(downAmt)}
              </span>
              <div className="flex border border-white/10 text-[9px] font-semibold tracking-widest">
                <button
                  onClick={() => setDownMode('pct')}
                  className={`px-2.5 py-1 transition-colors ${downMode === 'pct' ? 'bg-gold-500 text-ink-950' : 'text-white/40 hover:text-white'}`}
                >%</button>
                <button
                  onClick={() => setDownMode('amt')}
                  className={`px-2.5 py-1 transition-colors ${downMode === 'amt' ? 'bg-gold-500 text-ink-950' : 'text-white/40 hover:text-white'}`}
                >$</button>
              </div>
            </div>
          </div>
          {downMode === 'pct' ? (
            <>
              <input
                type="range" className="calc-slider"
                min={5} max={50} step={1}
                value={downPct}
                onChange={(e) => { const v = Number(e.target.value); setDownPct(v); setDownAmt((homePrice * v) / 100) }}
              />
              <div className="flex justify-between mt-2 text-[10px] text-white/25"><span>5%</span><span>50%</span></div>
            </>
          ) : (
            <input
              type="number"
              className="field-input mt-1"
              value={downAmt}
              min={0} max={homePrice}
              onChange={(e) => { const v = Number(e.target.value); setDownAmt(v); setDownPct((v / homePrice) * 100) }}
            />
          )}
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40">Interest Rate</label>
            <span className="font-serif text-[18px] text-white">{rate.toFixed(2)}%</span>
          </div>
          <input
            type="range" className="calc-slider"
            min={1} max={12} step={0.05}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
          <div className="flex justify-between mt-2 text-[10px] text-white/25"><span>1%</span><span>12%</span></div>
        </div>

        {/* Amortization + Frequency */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-2">Amortization</label>
            <select
              className="field-input"
              value={amort}
              onChange={(e) => setAmort(Number(e.target.value))}
            >
              {amortOptions.map((y) => <option key={y} value={y}>{y} years</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-2">Frequency</label>
            <select
              className="field-input"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as typeof frequency)}
            >
              <option value="monthly">Monthly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="bg-ink-900 p-10 lg:p-14 flex flex-col justify-between">
        {results ? (
          <>
            {/* Main payment */}
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-2">
                Estimated Payment
              </p>
              <p className="font-serif text-[clamp(44px,6vw,72px)] font-normal text-white leading-none mb-1">
                {fmt(results.payment)}
              </p>
              <p className="text-[12px] text-white/30 mb-10">per {freqLabel[frequency]}</p>

              {/* Breakdown bar */}
              <div className="mb-3 h-2 bg-white/[0.07] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold-500 rounded-full transition-all duration-700"
                  style={{ width: `${results.principalPct}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-white/40 mb-10">
                <span><span className="text-gold-500 mr-1">●</span>Principal {results.principalPct.toFixed(0)}%</span>
                <span><span className="text-white/20 mr-1">●</span>Interest {(100 - results.principalPct).toFixed(0)}%</span>
              </div>

              {/* Numbers */}
              <div className="flex flex-col divide-y divide-white/[0.05]">
                {[
                  { label: 'Loan Amount',     val: results.principal },
                  { label: 'Total Interest',  val: results.totalInterest },
                  { label: 'Total Cost',      val: results.totalPaid },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between items-center py-3.5">
                    <span className="text-[12px] text-white/40">{label}</span>
                    <span className="font-serif text-[17px] text-white">{fmt(val)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CMHC note */}
            <div className="mt-8">
              {needsCMHC && (
                <p className="text-[11px] text-gold-500/70 bg-gold-500/[0.06] border border-gold-500/15 px-4 py-3 leading-relaxed mb-4">
                  ⚠ Down payment under 20%, CMHC mortgage insurance applies and will be added to your loan.
                </p>
              )}
              <p className="text-[10px] text-white/20 leading-relaxed">
                Estimates are based on Canadian semi-annual compounding. Actual rates and payments vary. Contact Mark for a personalized pre-approval strategy.
              </p>
            </div>
          </>
        ) : (
          <p className="text-white/30 text-sm">Enter a valid home price and down payment to see your estimate.</p>
        )}
      </div>
    </div>
  )
}
