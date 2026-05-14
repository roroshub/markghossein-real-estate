import Link from 'next/link'
import { RevealWrapper } from './RevealWrapper'
import type { Listing } from '@/lib/schemas'

const statusConfig = {
  'for-sale': { label: 'For Sale', cls: 'bg-ink-900 text-white' },
  'new':      { label: 'New',      cls: 'bg-gold-500 text-ink-950' },
  'sold':     { label: 'Sold',     cls: 'bg-ink-400 text-white' },
}

const cardTones = ['bg-ink-100', 'bg-ink-200', 'bg-ink-150']

export function Listings({ listings }: { listings: Listing[] }) {
  return (
    <section id="listings" className="py-32 bg-ink-50">
      <div className="mx-auto max-w-[1320px] px-8 md:px-12">
        <RevealWrapper className="mb-20">
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gold-500 mb-5">
            Properties
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2 className="font-serif text-[clamp(34px,3.5vw,52px)] font-normal leading-[1.1] text-ink-900">
              Featured Listings
            </h2>
            <Link
              href="#contact"
              className="text-[10px] font-semibold tracking-[0.18em] uppercase text-ink-400 hover:text-gold-500 transition-colors duration-200 shrink-0"
            >
              View All →
            </Link>
          </div>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {listings.map((listing, i) => {
            const { label, cls } = statusConfig[listing.status]
            const tone = cardTones[i % cardTones.length] ?? 'bg-ink-100'

            return (
              <RevealWrapper key={listing.id} delay={i * 70}>
                <article className="group bg-white border border-ink-100 hover:border-ink-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  {/* Image area */}
                  <div className={`relative overflow-hidden ${tone} ${listing.featured ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                    {/* House silhouette */}
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-1/2 opacity-10 bg-ink-900"
                      style={{ clipPath: 'polygon(50% 0%,0% 45%,10% 45%,10% 100%,40% 100%,40% 65%,60% 65%,60% 100%,90% 100%,90% 45%,100% 45%)' }}
                    />

                    <span className={`absolute top-4 left-4 text-[9px] font-semibold tracking-[0.18em] uppercase px-3 py-1.5 ${cls}`}>
                      {label}
                    </span>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-ink-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link
                        href="#contact"
                        className="border border-white text-white text-[10px] font-semibold tracking-[0.14em] uppercase px-6 py-3 hover:bg-white hover:text-ink-950 transition-colors duration-200"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <p className="font-serif text-[26px] font-normal text-ink-900 mb-1.5 leading-none">{listing.price}</p>
                    <h3 className="text-[14px] font-medium text-ink-800 mb-1">{listing.address}</h3>
                    <p className="text-[12px] text-ink-400 mb-4">{listing.city}</p>
                    <div className="flex items-center gap-2 text-[11px] font-medium text-ink-300 border-t border-ink-100 pt-4">
                      <span>{listing.beds} Bed</span>
                      <span className="opacity-50">·</span>
                      <span>{listing.baths} Bath</span>
                      <span className="opacity-50">·</span>
                      <span>{listing.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>
                </article>
              </RevealWrapper>
            )
          })}
        </div>

        <RevealWrapper className="pt-6 border-t border-ink-200 flex items-center justify-between">
          <p className="font-serif text-[18px] italic text-ink-400">
            Looking for something specific?
          </p>
          <Link
            href="#contact"
            className="text-[10px] font-semibold tracking-[0.18em] uppercase text-ink-900 border border-ink-900 px-6 py-3 hover:bg-ink-900 hover:text-white transition-all duration-300"
          >
            Tell Me What You Need
          </Link>
        </RevealWrapper>
      </div>
    </section>
  )
}
