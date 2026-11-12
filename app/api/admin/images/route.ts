import { NextRequest, NextResponse } from 'next/server'
import { isAuthed } from '@/lib/admin-auth'
import { ALLOWED_TYPES, MAX_IMAGE_BYTES, imageKey, saveImage } from '@/lib/blog-images'

export const dynamic = 'force-dynamic'

const int = (v: FormDataEntryValue | null) => {
  const n = Number(v)
  return Number.isFinite(n) && n > 0 ? Math.round(n) : null
}

// Upload one blog image (multipart: file, alt, width, height). Returns its public URL.
export async function POST(req: NextRequest) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Expected a file upload' }, { status: 400 })
  }
  const file = form.get('file')
  if (!(file instanceof File)) return NextResponse.json({ error: 'No file received' }, { status: 400 })
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: 'Only JPG, PNG or WebP images can be uploaded' }, { status: 415 })
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return NextResponse.json({ error: 'Image is larger than 4 MB after compression' }, { status: 413 })
  }
  const alt = String(form.get('alt') ?? '').trim().slice(0, 300)
  const key = imageKey(file.name, file.type)
  try {
    await saveImage({
      key,
      mime: file.type,
      bytes: new Uint8Array(await file.arrayBuffer()),
      alt,
      width: int(form.get('width')),
      height: int(form.get('height')),
    })
  } catch (err) {
    console.error('[POST /api/admin/images]', err)
    return NextResponse.json({ error: 'Could not save the image' }, { status: 500 })
  }
  return NextResponse.json({ url: `/images/blog/${key}`, alt }, { status: 201 })
}
