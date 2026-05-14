const items = [
  'Buyer Representation',
  'Seller Representation',
  'Upsizing Consultation',
  'Home Valuation',
  'Investment Strategy',
  'Smooth Move System™',
  'Neighbourhood Alerts',
]

const doubled = [...items, ...items]

export function Marquee() {
  return (
    <div className="bg-gold-500 py-3 overflow-hidden whitespace-nowrap">
      <div className="marquee-track inline-flex gap-10">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-10">
            <span className="text-[9px] font-semibold tracking-[0.22em] uppercase text-ink-950">
              {item}
            </span>
            <span className="text-ink-950/25 text-xs">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
