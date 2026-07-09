'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

// Resource & guide routes where the callback CTA should appear.
const RESOURCE_ROUTES = [
  '/buyers',
  '/sellers',
  '/upsizing',
  '/downsizing',
  '/investment',
  '/probate',
  '/mortgage-calculator',
  '/home-evaluation',
  '/nosey-neighbour',
  '/faq',
]

const times = ['Morning', 'Afternoon', 'Evening']

export function CallbackPopup() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [f, setF] = useState({ firstName: '', lastName: '', phone: '', email: '', time: 'Morning' })

  if (!RESOURCE_ROUTES.includes(pathname ?? '')) return null

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
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
          phone: f.phone,
          message: `Callback requested. Best time to call: ${f.time}.`,
        }),
      })
      if (!res.ok) throw new Error('failed')
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again or call directly.')
    } finally {
      setSubmitting(false)
    }
  }

  const field =
    'w-full bg-white border border-ink-150 text-ink-900 placeholder-ink-300 px-4 py-3 text-[14px] outline-none focus:border-gold-500 transition-colors'

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 bg-gold-500 text-ink-950 px-6 py-4 text-[12px] font-semibold tracking-[0.12em] uppercase shadow-2xl shadow-black/30 hover:bg-gold-300 transition-colors duration-300"
        aria-haspopup="dialog"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 5c0 8.284 6.716 15 15 15v-3.5a1.5 1.5 0 00-1.2-1.47l-2.7-.54a1.5 1.5 0 00-1.5.64l-.7 1.05a11 11 0 01-4.43-4.43l1.05-.7a1.5 1.5 0 00.64-1.5l-.54-2.7A1.5 1.5 0 007.5 4H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
        Request a Callback
      </button>

      {/* Modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Request a callback"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm" onClick={() => setOpen(false)} />

          <div className="relative w-full max-w-[440px] bg-cream border border-ink-150 shadow-2xl shadow-black/40 p-8 sm:p-10">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-5 right-5 text-ink-400 hover:text-ink-900 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>

            {sent ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-gold-500/15 border border-gold-500/40 flex items-center justify-center text-gold-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 className="font-serif text-[26px] text-ink-900 mb-2">You&apos;re all set.</h3>
                <p className="text-[14px] text-ink-500 leading-relaxed">
                  Mark will call you back at your requested time. Talk soon.
                </p>
              </div>
            ) : (
              <>
                <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-gold-700 mb-3">
                  No Obligation
                </p>
                <h3 className="font-serif text-[28px] leading-tight text-ink-900 mb-2">Request a Callback</h3>
                <p className="text-[13px] text-ink-500 leading-relaxed mb-6">
                  Leave your details and Mark will personally call you back, no pressure, no pitch.
                </p>

                <form onSubmit={submit} className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input aria-label="First name" placeholder="First name" required value={f.firstName} onChange={set('firstName')} className={field} />
                    <input aria-label="Last name" placeholder="Last name" required value={f.lastName} onChange={set('lastName')} className={field} />
                  </div>
                  <input aria-label="Phone number" type="tel" placeholder="Phone number" required value={f.phone} onChange={set('phone')} className={field} />
                  <input aria-label="Email address" type="email" placeholder="Email address" required value={f.email} onChange={set('email')} className={field} />
                  <label className="text-[10px] font-semibold tracking-[0.18em] uppercase text-ink-400 mt-1">Best time to call</label>
                  <select aria-label="Best time to call" value={f.time} onChange={set('time')} className={`${field} cursor-pointer`}>
                    {times.map((t) => <option key={t}>{t}</option>)}
                  </select>

                  {error && <p className="text-[12px] text-red-500">{error}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 bg-gold-500 text-ink-950 py-4 text-[12px] font-semibold tracking-[0.14em] uppercase hover:bg-gold-300 transition-colors duration-300 disabled:opacity-60"
                  >
                    {submitting ? 'Sending…' : 'Request My Callback'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
