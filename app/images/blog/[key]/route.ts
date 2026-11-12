import { loadImage } from '@/lib/blog-images'

export const dynamic = 'force-dynamic'

// Serves uploaded blog images from this domain. Keys are unique and never
// reused, so responses are cached for a year at the browser and Cloudflare edge.
export async function GET(_req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params
  if (!/^[a-z0-9-]+\.(webp|jpg|png)$/.test(key)) return new Response('Not found', { status: 404 })
  let img = null
  try {
    img = await loadImage(key)
  } catch (err) {
    console.error('[GET /images/blog]', err)
    return new Response('Unavailable', { status: 503 })
  }
  if (!img) return new Response('Not found', { status: 404 })
  return new Response(new Uint8Array(img.data), {
    headers: {
      'Content-Type': img.mime,
      'Content-Length': String(img.data.byteLength),
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
