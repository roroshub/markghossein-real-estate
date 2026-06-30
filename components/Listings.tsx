import Link from 'next/link'
import { RevealWrapper } from './RevealWrapper'
import type { Listing } from '@/lib/schemas'

const statusConfig = {
  'for-sale': { label: 'For Sale',    cls: 'text-white/50    border-white/20' },
  'new':      { label: 'New Listing', cls: 'text-gold-500    border-gold-500/50' },
  'sold':     { label: 'Sold',        cls: 'text-ink-400     border-ink-400/40' },
}

function PlaceholderArt({ variant }: { variant: 0 | 1 | 2 }) {
  if (variant === 0) return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.055]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="p0" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
          <line x1="0" y1="0" x2="48" y2="0" stroke="white" strokeWidth="0.6"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#p0)"/>
    </svg>
  )
  if (variant === 1) return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="p1" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="36" height="36" fill="none" stroke="white" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#p1)"/>
    </svg>
  )
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="p2" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="24" y2="0" stroke="white" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#p2)"/>
    </svg>
  )
}

export function Listings({ listings }: { listings: Listing[] }) {
  const [featured, ...rest] = listings as [Listing, ...Listing[]]

  return (
    <section id="listings" className="py-32 bg-ink-950">
      <div className="mx-auto max-w-[1320px] px-8 md:px-12">

        <RevealWrapper>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gold-500 mb-5">Properties</p>
              <h2 className="font-serif text-[clamp(34px,3.5vw,52px)] font-normal leading-[1.1] text-white">
                Featured Listings
              </h2>
            </div>
            <Link
              href="#contact"
              className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/25 hover:text-gold-500 transition-colors duration-200 shrink-0"
            >
              View All →
            </Link>
          </div>
        </RevealWrapper>

        {/* Asymmetric editorial grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-px bg-white/[0.06]">

          {/* Featured card, tall left column */}
          {featured && (
            <RevealWrapper>
              <article className="group relative bg-ink-900 flex flex-col h-full min-h-[580px]">
                {/* Image */}
                <div className="relative flex-1 bg-ink-800 overflow-hidden min-h-[360px]">
                  <PlaceholderArt variant={0} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />

                  <span className={`absolute top-6 left-6 text-[9px] font-semibold tracking-[0.22em] uppercase border px-3 py-1.5 ${statusConfig[featured.status].cls}`}>
                    {statusConfig[featured.status].label}
                  </span>

                  {/* Hover inquire overlay */}
                  <div className="absolute inset-0 bg-ink-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <Link
                      href="#contact"
                      className="bg-gold-500 text-ink-950 text-[10px] font-semibold tracking-[0.18em] uppercase px-8 py-3.5 hover:bg-gold-300 transition-colors duration-200"
                    >
                      Inquire
                    </Link>
                  </div>
                </div>

                {/* Info */}
                <div className="p-9">
                  <p className="font-serif text-[42px] font-normal text-white leading-none mb-4 tracking-tight">
                    {featured.price}
                  </p>
                  <h3 className="text-[13px] font-medium text-white/60 mb-1 tracking-wide">{featured.address}</h3>
                  <p className="text-[11px] text-white/25 mb-7">{featured.city}</p>
                  <div className="flex items-center gap-6 text-[10px] font-medium tracking-[0.12em] uppercase text-white/20 border-t border-white/[0.06] pt-5">
                    <span>{featured.beds} Beds</span>
                    <span>{featured.baths} Baths</span>
                    <span>{featured.sqft.toLocaleString()} sqft</span>
                  </div>
                </div>
              </article>
            </RevealWrapper>
          )}

          {/* Right column, two stacked cards */}
          <div className="flex flex-col gap-px bg-white/[0.06]">
            {rest.map((listing, i) => (
              <RevealWrapper key={listing.id} delay={(i + 1) * 90}>
                <article className="group relative bg-ink-900 flex flex-col h-full">
                  {/* Image */}
                  <div className="relative bg-ink-800 overflow-hidden" style={{ minHeight: '220px', flex: 1 }}>
                    <PlaceholderArt variant={((i + 1) % 3) as 0 | 1 | 2} />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />

                    <span className={`absolute top-5 left-5 text-[9px] font-semibold tracking-[0.22em] uppercase border px-3 py-1.5 ${statusConfig[listing.status].cls}`}>
                      {statusConfig[listing.status].label}
                    </span>

                    <div className="absolute inset-0 bg-ink-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link
                        href="#contact"
                        className="bg-gold-500 text-ink-950 text-[10px] font-semibold tracking-[0.18em] uppercase px-7 py-3 hover:bg-gold-300 transition-colors duration-200"
                      >
                        Inquire
                      </Link>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-7">
                    <p className="font-serif text-[30px] font-normal text-white leading-none mb-3 tracking-tight">
                      {listing.price}
                    </p>
                    <h3 className="text-[12px] font-medium text-white/55 mb-1 tracking-wide">{listing.address}</h3>
                    <p className="text-[11px] text-white/22 mb-5">{listing.city}</p>
                    <div className="flex items-center gap-5 text-[10px] font-medium tracking-[0.12em] uppercase text-white/18 border-t border-white/[0.06] pt-4">
                      <span>{listing.beds} Beds</span>
                      <span>{listing.baths} Baths</span>
                      <span>{listing.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>
                </article>
              </RevealWrapper>
            ))}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <RevealWrapper>
          <div className="mt-14 pt-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="font-serif text-[20px] italic text-white/25">
              Looking for something specific?
            </p>
            <Link
              href="#contact"
              className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white border border-white/15 px-7 py-3.5 hover:border-gold-500 hover:text-gold-500 transition-all duration-300"
            >
              Tell Me What You Need
            </Link>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
