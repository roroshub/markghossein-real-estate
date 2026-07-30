// Builds Agent Locator (search.markghossein.com) URLs.
// Confirmed filter format: /search?FilterItems=<json>&viewType=0&orderBy=0
// where FilterItems is an array of { FilterName, FilterOperator, FilterValues }.

export const AL_SEARCH = 'https://search.markghossein.com/search'
export const AL_COMMUNITIES = 'https://search.markghossein.com/communities'

type Filter = { FilterName: string; FilterOperator: string; FilterValues: string }

export function buildSearchUrl(
  opts: { q?: string; type?: string; priceMin?: number; priceMax?: number; beds?: number; baths?: number } = {},
): string {
  const filters: Filter[] = [{ FilterName: 'Sale_Lease', FilterOperator: '=', FilterValues: 'Sale' }]
  // "Common" is AL's keyword filter — address, MLS#, community, or location text.
  if (opts.q)        filters.push({ FilterName: 'Common',     FilterOperator: '=',  FilterValues: opts.q })
  if (opts.type)     filters.push({ FilterName: 'ALHomeType', FilterOperator: '=',  FilterValues: opts.type })
  if (opts.priceMin) filters.push({ FilterName: 'List_Price', FilterOperator: '>=', FilterValues: String(opts.priceMin) })
  if (opts.priceMax) filters.push({ FilterName: 'List_Price', FilterOperator: '<=', FilterValues: String(opts.priceMax) })
  if (opts.beds)     filters.push({ FilterName: 'Bedrooms',   FilterOperator: '>=', FilterValues: String(opts.beds) })
  if (opts.baths)    filters.push({ FilterName: 'Bathrooms',  FilterOperator: '>=', FilterValues: String(opts.baths) })
  // encodeURIComponent (not URLSearchParams) so spaces are %20, matching AL.
  return `${AL_SEARCH}?FilterItems=${encodeURIComponent(JSON.stringify(filters))}&viewType=0&orderBy=0`
}

// Real Agent Locator community slugs, keyed by the ways a visitor might type them.
const COMMUNITY_SLUGS: Record<string, string> = {
  'downtown': 'downtown',
  'gloucester': 'gloucester',
  'glebe': 'glebe', 'the glebe': 'glebe',
  'nepean': 'nepean',
  'barrhaven': 'barrhaven',
  'riverside south': 'riverside-south',
  'russell': 'russell-embrun', 'embrun': 'russell-embrun', 'russell/embrun': 'russell-embrun',
  'carleton place': 'carleton-place',
  'vanier': 'vanier',
  'orleans': 'orleans',
  'the south': 'the-south',
  'kanata': 'kanata-stittsville', 'stittsville': 'kanata-stittsville', 'kanata/stittsville': 'kanata-stittsville',
  'manotick': 'manotick-greely', 'greely': 'manotick-greely', 'manotick/greely': 'manotick-greely',
  'rockland': 'rockland',
  'kemptville': 'kemptville',
  'westboro': 'westboro',
}

export function communitySlug(text: string): string | null {
  const key = text.trim().toLowerCase().replace(/\s+/g, ' ')
  return COMMUNITY_SLUGS[key] ?? null
}

export function communityUrl(slug: string): string {
  return `${AL_COMMUNITIES}/${slug}`
}
