import { NextRequest, NextResponse } from 'next/server'
import { listPublished } from '@/lib/blog'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page') || undefined
  try {
    const posts = await listPublished(page)
    // Trim the heavy HTML body for list responses.
    const list = posts.map(({ body_html, ...rest }) => rest)
    return NextResponse.json({ posts: list })
  } catch (err) {
    console.error('[GET /api/blog]', err)
    return NextResponse.json({ posts: [] })
  }
}
