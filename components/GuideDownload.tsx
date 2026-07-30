'use client'

import { useState } from 'react'

type Props = {
  title: string        // e.g. "Home Buying Checklist"
  file: string         // e.g. "/guides/home-buying-checklist.pdf"
  label?: string       // trigger button text
  className?: string   // trigger button classes
  blurb?: string       // short line under the modal heading
}

export function GuideDownload({ title, file, label = 'Download Guide', className = '', blurb }: Props) {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [f, setF] = useState({ firstName: '', lastName: '', email: '' })

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: f.firstName,
          lastName: f.lastName,
          email: f.email,
          message: `Guide download: ${title}`,
        }),
      })
      if (!res.ok) throw new Error('failed')
      setSent(true)
      window.open(file, '_blank', 'noopener,noreferrer') // deliver the PDF
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const field =
    'w-full bg-white border border-ink-150 text-ink-900 placeholder-ink-300 px-4 py-3 text-[14px] outline-none focus:border-gold-500 transition-colors'

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
      </button>

      {open && (
        <div role="dialog" aria-modal="true" aria-label={`Download the ${title}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm" onClick={() => setOpen(false)} />

          <div className="relative w-full max-w-[440px] bg-cream border border-ink-150 shadow-2xl shadow-black/40 p-8 sm:p-10">
            <button onClick={() => setOpen(false)} aria-label="Close"
              className="absolute top-5 right-5 text-ink-400 hover:text-ink-900 transition-colors">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>

            {sent ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-gold-500/15 border border-gold-500/40 flex items-center justify-center text-gold-600">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 className="font-serif text-[24px] text-ink-900 mb-2">Enjoy the guide.</h3>
                <p className="text-[14px] text-ink-500 leading-relaxed mb-5">
                  Your download should have opened in a new tab. If it didn&apos;t, tap below.
                </p>
                <a href={file} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gold-500 text-ink-950 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-gold-300 transition-colors">
                  Download {title}
                </a>
              </div>
            ) : (
              <>
                <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-gold-700 mb-3">Free Download</p>
                <h3 className="font-serif text-[26px] leading-tight text-ink-900 mb-2">{title}</h3>
                <p className="text-[13px] text-ink-500 leading-relaxed mb-6">
                  {blurb || 'Enter your details and we’ll send you straight to the download.'}
                </p>

                <form onSubmit={submit} className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input aria-label="First name" placeholder="First name" required value={f.firstName} onChange={set('firstName')} className={field} />
                    <input aria-label="Last name" placeholder="Last name" required value={f.lastName} onChange={set('lastName')} className={field} />
                  </div>
                  <input aria-label="Email address" type="email" placeholder="Email address" required value={f.email} onChange={set('email')} className={field} />

                  {error && <p className="text-[12px] text-red-500">{error}</p>}

                  <button type="submit" disabled={submitting}
                    className="mt-2 bg-gold-500 text-ink-950 py-4 text-[12px] font-semibold tracking-[0.14em] uppercase hover:bg-gold-300 transition-colors duration-300 disabled:opacity-60">
                    {submitting ? 'Preparing…' : 'Get the Guide'}
                  </button>
                  <p className="text-[10px] text-ink-400 text-center leading-relaxed">No spam. Just the guide and the occasional useful update.</p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
