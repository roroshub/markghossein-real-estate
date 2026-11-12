import { db, ensureSchema } from './blog'

// Blog images live in Postgres (base64) and are served from this site's own
// domain at /images/blog/<key>. They are compressed to WebP in the browser
// before upload, so each is typically 20–200 KB.
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024
export const ALLOWED_TYPES = new Set(['image/webp', 'image/jpeg', 'image/png'])
const EXT: Record<string, string> = { 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/png': 'png' }

export type StoredImage = { key: string; mime: string; data: Buffer }

export function imageKey(originalName: string, mime: string): string {
  const base =
    originalName
      .replace(/\.[a-z0-9]+$/i, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 50) || 'image'
  const rand = crypto.getRandomValues(new Uint8Array(4))
  const suffix = Array.from(rand, (b) => b.toString(16).padStart(2, '0')).join('')
  return `${base}-${suffix}.${EXT[mime] ?? 'bin'}`
}

export async function saveImage(img: {
  key: string
  mime: string
  bytes: Uint8Array
  alt: string
  width: number | null
  height: number | null
}): Promise<void> {
  await ensureSchema()
  const b64 = Buffer.from(img.bytes).toString('base64')
  await db()`
    INSERT INTO blog_images (key, mime, data_b64, alt, width, height, bytes)
    VALUES (${img.key}, ${img.mime}, ${b64}, ${img.alt}, ${img.width}, ${img.height}, ${img.bytes.byteLength})
  `
}

export async function loadImage(key: string): Promise<StoredImage | null> {
  await ensureSchema()
  const rows = (await db()`SELECT key, mime, data_b64 FROM blog_images WHERE key = ${key} LIMIT 1`) as unknown as {
    key: string
    mime: string
    data_b64: string
  }[]
  const r = rows[0]
  return r ? { key: r.key, mime: r.mime, data: Buffer.from(r.data_b64, 'base64') } : null
}
