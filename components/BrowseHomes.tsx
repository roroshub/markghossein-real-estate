import { RevealWrapper } from './RevealWrapper'

const SEARCH_PORTAL    = 'https://search.markghossein.com'
const COMMUNITIES_URL  = 'https://search.markghossein.com/communities'

const priceRanges = [
  { label: 'Under $500K',    range: 'Condos & starter homes', href: `${SEARCH_PORTAL}/?price=Under%20%24500K` },
  { label: '$500K to $750K', range: 'Townhomes & semis',      href: `${SEARCH_PORTAL}/?price=%24500K%20to%20%24750K` },
  { label: '$750K to $1M',   range: 'Family detached',        href: `${SEARCH_PORTAL}/?price=%24750K%20to%20%241M` },
  { label: '$1M to $1.5M',   range: 'Premium detached',       href: `${SEARCH_PORTAL}/?price=%241M%20to%20%241.5M` },
  { label: '$1.5M to $2M',   range: 'Executive homes',        href: `${SEARCH_PORTAL}/?price=%241.5M%20to%20%242M` },
  { label: '$2M+',           range: 'Luxury estates',         href: `${SEARCH_PORTAL}/?price=%242M%2B` },
]

const neighbourhoods = [
  { name: 'Westboro',    note: 'Boutique village living' },
  { name: 'The Glebe',   note: 'Historic & walkable' },
  { name: 'Kanata',      note: 'Tech-corridor family hub' },
  { name: 'Barrhaven',   note: 'Fast-growing suburb' },
  { name: 'Centretown',  note: 'Downtown condos' },
  { name: 'Orleans',     note: 'East-end value' },
  { name: 'Hintonburg',  note: 'Arts & dining district' },
  { name: 'Stittsville', note: 'Small-town charm' },
]

export function BrowseHomes() {
  return (
    <section id="browse" className="py-32 bg-ink-900">
      <div className="mx-auto max-w-[1320px] px-8 md:px-12">

        <RevealWrapper>
          <div className="flex items-center gap-4 mb-5">
            <span className="block w-8 h-px bg-gold-500 shrink-0" />
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gold-500">Find Your Home</p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <h2 className="font-serif text-[clamp(34px,3.5vw,52px)] font-normal leading-[1.1] text-white">
              Browse by Price &amp; Neighbourhood
            </h2>
            <a
              href={COMMUNITIES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.14em] uppercase text-gold-500 border border-gold-500/40 px-7 py-4 hover:bg-gold-500 hover:text-ink-950 transition-all duration-300 shrink-0"
            >
              Explore all communities →
            </a>
          </div>
        </RevealWrapper>

        {/* ── Price ranges ── */}
        <RevealWrapper>
          <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-white/55 mb-6">By Price Range</p>
        </RevealWrapper>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] mb-20">
          {priceRanges.map(({ label, range, href }, i) => (
            <RevealWrapper key={label} delay={i * 50}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-ink-900 p-8 hover:bg-ink-850 transition-colors duration-300 h-full"
              >
                <p className="font-serif text-[26px] font-normal text-white leading-none mb-2 group-hover:text-gold-500 transition-colors duration-300">
                  {label}
                </p>
                <p className="text-[12px] font-light text-white/55">{range}</p>
              </a>
            </RevealWrapper>
          ))}
        </div>

        {/* ── Neighbourhoods ── */}
        <RevealWrapper>
          <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-white/55 mb-6">By Neighbourhood</p>
        </RevealWrapper>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06]">
          {neighbourhoods.map(({ name, note }, i) => (
            <RevealWrapper key={name} delay={i * 40}>
              <a
                href={`${COMMUNITIES_URL}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-ink-900 p-7 hover:bg-ink-850 transition-colors duration-300 h-full"
              >
                <div className="flex items-center gap-2 mb-2">
                  <svg className="shrink-0 text-gold-500/70" width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <p className="text-[14px] font-medium text-white group-hover:text-gold-500 transition-colors duration-300 tracking-wide">
                    {name}
                  </p>
                </div>
                <p className="text-[11px] font-light text-white/55 pl-[22px]">{note}</p>
              </a>
            </RevealWrapper>
          ))}
        </div>

        <RevealWrapper>
          <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="font-serif text-[20px] italic text-white/55">
              Don&apos;t see your area or budget?
            </p>
            <a
              href="#contact"
              className="text-[13px] font-semibold tracking-[0.14em] uppercase text-white border border-white/15 px-7 py-4 hover:border-gold-500 hover:text-gold-500 transition-all duration-300"
            >
              Tell Me What You Need
            </a>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
