// Browser-only helpers: shrink an image and convert it to WebP before upload.

const MAX_WIDTH = 1920
const QUALITY = 0.82

export type PreparedImage = { file: File; width: number; height: number }

async function decode(file: File): Promise<{ source: CanvasImageSource; width: number; height: number }> {
  if ('createImageBitmap' in window) {
    const bmp = await createImageBitmap(file)
    return { source: bmp, width: bmp.width, height: bmp.height }
  }
  const url = URL.createObjectURL(file)
  try {
    const img = new Image()
    img.src = url
    await img.decode()
    return { source: img, width: img.naturalWidth, height: img.naturalHeight }
  } finally {
    URL.revokeObjectURL(url)
  }
}

/** Resize to at most 1920px wide and re-encode as WebP (JPEG where the browser can't make WebP). */
export async function prepareImage(file: File): Promise<PreparedImage> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) throw new Error('Please choose a JPG, PNG or WebP image')
  const { source, width, height } = await decode(file)
  const scale = Math.min(1, MAX_WIDTH / width)
  const w = Math.round(width * scale)
  const h = Math.round(height * scale)
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('This browser cannot process images')
  ctx.drawImage(source, 0, 0, w, h)

  const toBlob = (type: string) => new Promise<Blob | null>((res) => canvas.toBlob(res, type, QUALITY))
  let blob = await toBlob('image/webp')
  if (!blob || blob.type !== 'image/webp') blob = await toBlob('image/jpeg') // older Safari can't encode WebP
  if (!blob) throw new Error('Could not compress the image')

  // An already-small WebP that re-encoding made bigger: keep the original.
  if (scale === 1 && file.type === 'image/webp' && blob.size >= file.size) return { file, width: w, height: h }

  const ext = blob.type === 'image/webp' ? 'webp' : 'jpg'
  const name = file.name.replace(/\.[a-z0-9]+$/i, '') + '.' + ext
  return { file: new File([blob], name, { type: blob.type }), width: w, height: h }
}

export async function uploadImage(file: File, alt: string): Promise<{ url: string; width: number; height: number }> {
  const prepared = await prepareImage(file)
  const fd = new FormData()
  fd.append('file', prepared.file)
  fd.append('alt', alt)
  fd.append('width', String(prepared.width))
  fd.append('height', String(prepared.height))
  const res = await fetch('/api/admin/images', { method: 'POST', body: fd })
  const j = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(j.error || 'Upload failed')
  return { url: j.url, width: prepared.width, height: prepared.height }
}
