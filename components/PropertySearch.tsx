'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const propertyTypes = ['Any Type', 'House', 'Condo', 'Townhouse', 'Semi-Detached', 'Land']
const priceRanges   = ['Any Price', 'Under $500K', '$500K–$750K', '$750K–$1M', '$1M–$1.5M', '$1.5M+']
const neighbourhoods = ['Glebe', 'Westboro', 'Kanata', 'Barrhaven', 'Centretown', 'Orleans', 'Hintonburg', 'Stittsville']

export function PropertySearch() {
  const [query, setQuery]   = useState('')
  const [type,  setType]    = useState('Any Type')
  const [price, setPrice]   = useState('Any Price')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Scroll to listings — wire to real IDX/MLS API when ready
    document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="w-full max-w-[780px]">
      {/* Search box */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row bg-white/[0.08] backdrop-blur-md border border-white/[0.12]"
      >
        {/* Location input */}
        <div className="flex items-center flex-1 gap-3 px-5 py-4 border-b sm:border-b-0 sm:border-r border-white/[0.08]">
          <svg className="shrink-0 text-gold-500" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ottawa neighbourhood, address, or postal code…"
            className="flex-1 bg-transparent text-white placeholder:text-white/35 text-[13px] outline-none min-w-0"
          />
        </div>

        {/* Type select */}
        <div className="flex items-center px-5 py-4 border-b sm:border-b-0 sm:border-r border-white/[0.08] gap-2">
          <svg className="shrink-0 text-white/30" width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M3 21V10L12 3l9 7v11" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="search-select text-[13px] pr-4"
          >
            {propertyTypes.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        {/* Price range select */}
        <div className="flex items-center px-5 py-4 border-b sm:border-b-0 sm:border-r border-white/[0.08] gap-2">
          <svg className="shrink-0 text-white/30" width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M12 7v1m0 8v1M9.5 9.5C9.5 8.67 10.67 8 12 8s2.5.67 2.5 1.5-1 1.5-2.5 1.5-2.5.83-2.5 1.5S10.67 14 12 14s2.5-.67 2.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="search-select text-[13px] pr-4"
          >
            {priceRanges.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-gold-500 text-ink-950 px-7 py-4 text-[11px] font-semibold tracking-[0.16em] uppercase hover:bg-gold-300 transition-colors duration-200 shrink-0"
        >
          Search
        </button>
      </form>

      {/* Neighbourhood tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {neighbourhoods.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setQuery(n)}
            className="text-[10px] font-medium tracking-[0.1em] text-white/40 hover:text-white border border-white/[0.08] hover:border-white/25 px-3 py-1.5 transition-all duration-200"
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  )
}
