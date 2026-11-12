'use client'

import { useRef, useState } from 'react'
import { uploadImage } from '@/lib/image-client'

/**
 * Alt text + file picker. Compresses the image in the browser (WebP, max 1920px),
 * uploads it to /api/admin/images and hands back the URL on this site's domain.
 */
export function ImageUpload({
  onUploaded,
  buttonLabel,
  inputClass,
  buttonClass,
}: {
  onUploaded: (img: { url: string; alt: string; width: number; height: number }) => void
  buttonLabel: string
  inputClass: string
  buttonClass: string
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [alt, setAlt] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function pick(file: File | undefined) {
    if (!file) return
    setError('')
    setBusy(true)
    try {
      const img = await uploadImage(file, alt.trim())
      onUploaded({ ...img, alt: alt.trim() })
      setAlt('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setBusy(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  function choose() {
    setError('')
    if (!alt.trim()) {
      setError('Write the alt text first: a short description of the image for screen readers and Google.')
      return
    }
    fileRef.current?.click()
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          className={`${inputClass} flex-1`}
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          placeholder="Alt text, e.g. Brick bungalow in Westboro with a For Sale sign"
          aria-label="Alt text"
        />
        <button type="button" disabled={busy} onClick={choose} className={`${buttonClass} shrink-0 disabled:opacity-60`}>
          {busy ? 'Uploading…' : buttonLabel}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => pick(e.target.files?.[0])}
        />
      </div>
      {error && <p className="text-[12px] text-red-400">{error}</p>}
    </div>
  )
}
