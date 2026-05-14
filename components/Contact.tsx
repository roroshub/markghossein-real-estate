'use client'

import { useState } from 'react'
import { useForm } from '@/lib/useForm'
import { RevealWrapper } from './RevealWrapper'
import { interestValues } from '@/lib/schemas'

const socialLinks = [
  { label: 'Instagram', abbr: 'IG', href: '#' },
  { label: 'Facebook',  abbr: 'FB', href: '#' },
  { label: 'LinkedIn',  abbr: 'LI', href: '#' },
  { label: 'YouTube',   abbr: 'YT', href: '#' },
]

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const { fields, errors, handleChange, handleSubmit, isSubmitting } = useForm()

  const onSubmit = async (data: typeof fields) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) setSubmitted(true)
  }

  return (
    <section id="contact" className="py-32 bg-ink-50">
      <div className="mx-auto max-w-[1320px] px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-16 lg:gap-28 items-start">

          {/* Left */}
          <RevealWrapper>
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gold-500 mb-5">
              Get In Touch
            </p>
            <h2 className="font-serif text-[clamp(34px,3.5vw,52px)] font-normal leading-[1.1] text-ink-900 mb-6">
              Ready to Make<br />Your Move?
            </h2>
            <p className="text-[15px] font-light text-ink-500 leading-[1.9] mb-12 max-w-sm">
              Whether you're ready to buy, thinking about selling, or just want to know what
              your home is worth — let's talk. No pressure, no pitch.
            </p>

            <div className="flex flex-col gap-5 mb-12">
              <a href="mailto:mark.ghossein@c21.ca" className="flex items-center gap-5 group">
                <div className="w-10 h-10 border border-ink-200 flex items-center justify-center text-ink-300 text-sm group-hover:border-gold-500 group-hover:text-gold-500 transition-all duration-200">
                  ✉
                </div>
                <span className="text-[14px] text-ink-600 group-hover:text-ink-900 transition-colors duration-200">mark.ghossein@c21.ca</span>
              </a>
              <a href="#contact" className="flex items-center gap-5 group">
                <div className="w-10 h-10 border border-ink-200 flex items-center justify-center text-ink-300 text-sm group-hover:border-gold-500 group-hover:text-gold-500 transition-all duration-200">
                  ✆
                </div>
                <span className="text-[14px] text-ink-600 group-hover:text-ink-900 transition-colors duration-200">Book a Call</span>
              </a>
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 border border-ink-200 flex items-center justify-center text-ink-300 text-sm">◉</div>
                <span className="text-[14px] text-ink-600">Ontario, Canada</span>
              </div>
            </div>

            <div className="flex gap-2.5 flex-wrap">
              {socialLinks.map(({ label, abbr, href }) => (
                <a
                  key={abbr}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 border border-ink-200 text-[10px] font-bold tracking-wider text-ink-400 flex items-center justify-center hover:border-ink-900 hover:text-ink-900 transition-all duration-200"
                >
                  {abbr}
                </a>
              ))}
            </div>
          </RevealWrapper>

          {/* Right: form */}
          <RevealWrapper delay={100}>
            <div className="bg-ink-950 p-12">
              {submitted ? (
                <div className="flex flex-col items-center text-center gap-5 py-8">
                  <div className="w-14 h-14 border border-gold-500/60 flex items-center justify-center text-gold-500 text-xl">✓</div>
                  <h3 className="font-serif text-[26px] font-normal text-white">Message Received!</h3>
                  <p className="text-[14px] font-light text-white/40">Mark will be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Field label="First Name" error={errors.firstName}>
                      <input name="firstName" placeholder="Jane" value={fields.firstName} onChange={handleChange} className="field-input" required />
                    </Field>
                    <Field label="Last Name" error={errors.lastName}>
                      <input name="lastName" placeholder="Doe" value={fields.lastName} onChange={handleChange} className="field-input" required />
                    </Field>
                  </div>
                  <Field label="Email Address" error={errors.email} className="mb-4">
                    <input type="email" name="email" placeholder="jane@example.com" value={fields.email} onChange={handleChange} className="field-input" required />
                  </Field>
                  <Field label="Phone" error={errors.phone} className="mb-4">
                    <input type="tel" name="phone" placeholder="+1 (416) 000-0000" value={fields.phone} onChange={handleChange} className="field-input" />
                  </Field>
                  <Field label="I'm interested in…" error={errors.interest} className="mb-4">
                    <select name="interest" value={fields.interest} onChange={handleChange} className="field-input cursor-pointer">
                      <option value="">Select one</option>
                      {interestValues.map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </Field>
                  <Field label="Message" error={errors.message} className="mb-8">
                    <textarea name="message" rows={4} placeholder="Tell me a bit about what you're looking for…" value={fields.message} onChange={handleChange} className="field-input resize-y" />
                  </Field>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gold-500 text-ink-950 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-gold-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending…' : 'Send Message'}
                  </button>

                  <p className="text-[10px] font-light text-white/20 text-center leading-relaxed mt-5">
                    Your information is never shared. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}

function Field({
  label, error, children, className = '',
}: {
  label: string; error?: string; children: React.ReactNode; className?: string
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white/35">{label}</label>
      {children}
      {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
  )
}
