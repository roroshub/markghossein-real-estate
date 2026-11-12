import { NextRequest, NextResponse } from 'next/server'

// Send every request to the one canonical origin, https://markghossein.com,
// with a single 301 that keeps the path and query:
//   - www.markghossein.com -> markghossein.com
//   - http:// on either host -> https://
// Other hosts (localhost, *.workers.dev previews) are left alone.
const CANONICAL_HOST = 'markghossein.com'
const OUR_HOSTS = new Set([CANONICAL_HOST, `www.${CANONICAL_HOST}`])

// Only trust explicit scheme headers (cf-visitor from Cloudflare, x-forwarded-proto
// from other proxies). If neither is present we never force https, so a request
// the Worker sees internally as http:// can't cause a redirect loop.
function isPlainHttp(req: NextRequest): boolean {
  const visitor = req.headers.get('cf-visitor')
  if (visitor) return /"scheme"\s*:\s*"http"/.test(visitor)
  return (req.headers.get('x-forwarded-proto') ?? '').toLowerCase() === 'http'
}

export function middleware(req: NextRequest) {
  const host = (req.headers.get('host') ?? '').toLowerCase().split(':')[0] ?? ''
  if (!OUR_HOSTS.has(host)) return NextResponse.next()

  if (host !== CANONICAL_HOST || isPlainHttp(req)) {
    const url = new URL(req.url)
    url.protocol = 'https:'
    url.host = CANONICAL_HOST
    url.port = ''
    return NextResponse.redirect(url, 301)
  }
  return NextResponse.next()
}

export const config = {
  // Skip build assets; everything else (pages, API, sitemap, robots, images) redirects.
  matcher: ['/((?!_next/static|_next/image).*)'],
}
