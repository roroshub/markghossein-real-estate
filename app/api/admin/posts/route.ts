import { NextRequest, NextResponse } from 'next/server'
import { isAuthed } from '@/lib/admin-auth'
import { listAll, createPost } from '@/lib/blog'
import { parseInput } from '@/lib/blog-input'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const posts = await listAll()
  return NextResponse.json({ posts })
}

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const parsed = parseInput(body)
  if ('error' in parsed) return NextResponse.json({ error: parsed.error }, { status: 422 })
  try {
    const post = await createPost(parsed)
    return NextResponse.json({ post }, { status: 201 })
  } catch (err) {
    const msg = err instanceof Error && /duplicate|unique/i.test(err.message)
      ? 'A post with that slug already exists'
      : 'Could not save the post'
    console.error('[POST /api/admin/posts]', err)
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}
