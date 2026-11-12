import Link from 'next/link'

// SMS / A2P 10DLC opt-in disclosure, worded exactly as Follow Up Boss's business
// registration review requires. Shown above the submit button of every form
// that collects a phone number. Don't reword it without re-checking with them.
export function SmsConsent({ tone = 'dark', className = '' }: { tone?: 'dark' | 'light'; className?: string }) {
  const text = tone === 'dark' ? 'text-white/55' : 'text-ink-500'
  const link = tone === 'dark' ? 'text-gold-500 hover:text-gold-300' : 'text-ink-900 underline hover:text-gold-600'
  return (
    <p className={`text-[11px] font-light leading-relaxed ${text} ${className}`}>
      I agree to be contacted by Mark Ghossein Realty Inc. via call, email, and text for real estate services.
      To opt out, you can reply &lsquo;stop&rsquo; at any time or reply &lsquo;help&rsquo; for assistance. You can
      also click the unsubscribe link in the emails. Message and data rates may apply. Message frequency may vary.{' '}
      <Link href="/privacy#sms-terms" className={`${link} transition-colors`}>Privacy Policy</Link>
    </p>
  )
}
