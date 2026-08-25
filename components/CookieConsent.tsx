'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'

const STORAGE_KEY = 'mg-cookie-consent'
type Consent = 'accepted' | 'declined'

function readConsent(): Consent | null {
  if (typeof window === 'undefined') return null
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    return v === 'accepted' || v === 'declined' ? v : null
  } catch {
    return null
  }
}

function writeConsent(value: Consent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* storage unavailable — session-only consent */
  }
}

/**
 * Cookie consent banner that gates the Follow Up Boss (widgetbe.com) tracking
 * pixel. The pixel — which sets cookies to attribute leads — only loads once
 * the visitor has explicitly accepted.
 */
export function CookieConsent() {
  // choice: the stored decision (null until read/made). visible: whether to
  // show the banner — true only when no prior choice exists.
  const [choice, setChoice] = useState<Consent | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const existing = readConsent()
    if (existing) {
      setChoice(existing)
    } else {
      setVisible(true)
    }
  }, [])

  const decide = (value: Consent) => {
    writeConsent(value)
    setChoice(value)
    setVisible(false)
  }

  return (
    <>
      {/* Follow Up Boss Pixel — loads only after cookie acceptance */}
      {choice === 'accepted' && (
        <Script id="fub-widget-tracker" strategy="afterInteractive">
          {`(function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
{(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
(t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
e.parentNode.insertBefore(t,e);})
(window,"https://widgetbe.com/agent",document,"widgetTracker");
window.widgetTracker("create", "WT-MCFTUJYN");
window.widgetTracker("send", "pageview");`}
        </Script>
      )}

      {visible && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[60] bg-ink-950/95 backdrop-blur-md border-t border-white/[0.08]"
        >
          <div className="mx-auto max-w-[1320px] px-6 sm:px-8 md:px-12 py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <p className="text-[12.5px] font-light leading-relaxed text-white/70 flex-1">
              We use cookies to understand how visitors find us and to connect enquiries with our
              client follow-up system (Follow Up Boss). Accept to help Mark follow up with you
              personally, or decline to browse without tracking. See our{' '}
              <Link href="/privacy" className="text-gold-500 hover:text-gold-300 underline underline-offset-2 transition-colors">
                privacy policy
              </Link>
              .
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => decide('declined')}
                className="px-5 py-3 text-[11px] font-semibold tracking-[0.12em] uppercase text-white/60 border border-white/[0.12] hover:text-white hover:border-white/30 transition-colors duration-200"
              >
                Decline
              </button>
              <button
                onClick={() => decide('accepted')}
                className="px-6 py-3 text-[11px] font-semibold tracking-[0.12em] uppercase bg-gold-500 text-ink-950 hover:bg-gold-300 transition-colors duration-200"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
