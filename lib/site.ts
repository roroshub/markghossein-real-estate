// Single source of truth for the public site address. NEXT_PUBLIC_SITE_URL can
// override it (e.g. for a preview), but the fallback must be the live domain:
// canonical tags, sitemap, robots, OG and JSON-LD URLs are all built from it.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://markghossein.com').replace(/\/+$/, '')

export const SITE_NAME = 'Mark Ghossein Real Estate Advisors'
export const PHONE = '+1-613-789-7653'

export const SOCIAL_PROFILES = [
  'https://www.instagram.com/markghossein/',
  'https://www.facebook.com/ghosseinmark/',
  'https://www.linkedin.com/in/mark-ghossein-4a219a284/',
  'https://www.youtube.com/@markghossein',
]

export const absoluteUrl = (path: string) =>
  /^https?:\/\//.test(path) ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`
