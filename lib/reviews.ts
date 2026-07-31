import type { Testimonial } from '@/lib/schemas'
import { getTestimonials } from '@/lib/content'

const WIDGET_ID = process.env.FEATURABLE_WIDGET_ID
const API_KEY = process.env.FEATURABLE_API_KEY

// How many reviews to surface on the homepage (grid is 3-up, so multiples of 3 look best).
const MAX_REVIEWS = 6
// Trim very long reviews so the cards stay balanced.
const MAX_QUOTE = 280

type FeaturableReview = {
  id: string
  rating?: { value?: number; max?: number }
  author?: { name?: string | null; avatarUrl?: string | null }
  text?: string | null
  publishedAt?: string
}

type FeaturableResponse = {
  success?: boolean
  widget?: { reviews?: FeaturableReview[] }
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const str = ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase()
  return str || '★'
}

function clampRating(value: number | undefined): number {
  const n = Math.round(value ?? 5)
  return Math.min(5, Math.max(1, Number.isFinite(n) ? n : 5))
}

function trim(text: string): string {
  const t = text.trim()
  if (t.length <= MAX_QUOTE) return t
  return t.slice(0, MAX_QUOTE).replace(/\s+\S*$/, '') + '…'
}

function toTestimonial(r: FeaturableReview): Testimonial {
  const name = (r.author?.name ?? '').trim() || 'Google Reviewer'
  return {
    id: r.id,
    quote: trim(r.text ?? ''),
    name,
    detail: 'Verified Google Review',
    initials: initials(name),
    rating: clampRating(r.rating?.value),
  }
}

// In-memory cache, scoped to the Worker isolate, so Featurable is hit at most
// once an hour per isolate rather than on every request.
let cache: { data: Testimonial[]; expiry: number } | null = null
const TTL_MS = 60 * 60 * 1000

/**
 * Live Google reviews via Featurable, memoized for 1h.
 * Falls back to the curated `testimonials` JSON if the widget/key is unset,
 * the request fails, or no usable reviews come back — so the section never breaks.
 */
export async function getReviews(): Promise<Testimonial[]> {
  if (!WIDGET_ID || !API_KEY) return getTestimonials()
  if (cache && cache.expiry > Date.now()) return cache.data

  try {
    const res = await fetch(`https://api.featurable.com/v2/widgets/${WIDGET_ID}`, {
      headers: { 'X-API-Key': API_KEY },
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(`Featurable responded ${res.status}`)

    const data = (await res.json()) as FeaturableResponse
    const mapped = (data.widget?.reviews ?? [])
      .filter((r) => (r.text ?? '').trim().length > 20 && clampRating(r.rating?.value) >= 4)
      .map(toTestimonial)
      .slice(0, MAX_REVIEWS)

    if (mapped.length) {
      cache = { data: mapped, expiry: Date.now() + TTL_MS }
      return mapped
    }
    return getTestimonials()
  } catch (err) {
    console.error('[Reviews] Featurable fetch failed, using fallback:', err)
    return getTestimonials()
  }
}
