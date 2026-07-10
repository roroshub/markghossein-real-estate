import { NextRequest, NextResponse } from 'next/server'
import { isAuthed } from '@/lib/admin-auth'
import { updatePost, deletePost } from '@/lib/blog'
import { parseInput } from '@/lib/blog-input'

export const dynamic = 'force-dynamic'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const numId = Number(id)
  if (!Number.isInteger(numId)) return NextResponse.json({ error: 'Bad id' }, { status: 400 })

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const parsed = parseInput(body)
  if ('error' in parsed) return NextResponse.json({ error: parsed.error }, { status: 422 })
  try {
    const post = await updatePost(numId, parsed)
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ post })
  } catch (err) {
    const msg = err instanceof Error && /duplicate|unique/i.test(err.message)
      ? 'A post with that slug already exists'
      : 'Could not save the post'
    console.error('[PUT /api/admin/posts/:id]', err)
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const numId = Number(id)
  if (!Number.isInteger(numId)) return NextResponse.json({ error: 'Bad id' }, { status: 400 })
  await deletePost(numId)
  return NextResponse.json({ success: true })
}
