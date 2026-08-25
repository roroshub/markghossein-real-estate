import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealWrapper } from '@/components/RevealWrapper'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Mark Ghossein Real Estate Advisors collects, uses, and protects your personal information, including cookies and the Follow Up Boss client system.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Privacy Policy | Mark Ghossein',
    description:
      'How Mark Ghossein Real Estate Advisors collects, uses, and protects your personal information.',
    url: '/privacy',
  },
}

const LAST_UPDATED = 'August 25, 2026'

type Section = {
  heading: string
  paras?: string[]
  bullets?: string[]
}

const sections: Section[] = [
  {
    heading: 'Who we are',
    paras: [
      'This website is operated by Mark Ghossein, a licensed real estate Salesperson with eXp Realty, Brokerage, serving Ottawa and the surrounding area in Ontario, Canada. In this policy, “we,” “us,” and “our” refer to Mark Ghossein Real Estate Advisors.',
      'We are committed to protecting your privacy and handling your personal information in accordance with Canada’s Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable Ontario privacy law.',
    ],
  },
  {
    heading: 'Information we collect',
    paras: ['We collect personal information in two ways:'],
    bullets: [
      'Information you give us — when you submit a contact form, request a callback, download a guide, or use a tool such as the home evaluation or mortgage calculator, we collect the details you provide (for example your name, email address, phone number, and any message or property interest you share).',
      'Information collected automatically — when you browse the site we may collect technical and usage data such as your IP address, browser type, pages viewed, referring source, and interactions with the site. This is collected through cookies and similar technologies, and only after you accept cookies (see below).',
    ],
  },
  {
    heading: 'Cookies and tracking',
    paras: [
      'When you first visit the site you are asked to accept or decline cookies. If you decline, no analytics or lead-tracking cookies are set and the tracking pixel described below does not load — the site remains fully usable.',
      'If you accept, we use the Follow Up Boss Pixel (provided through widgetbe.com) to understand how visitors find and move through our site and to connect your enquiries with our client follow-up system. This helps Mark respond to you personally and in context.',
      'You can change your choice at any time by clearing this site’s cookies and stored data in your browser, which will bring the consent banner back on your next visit. Most browsers also let you block or delete cookies through their settings.',
    ],
  },
  {
    heading: 'How we use your information',
    paras: ['We use the personal information we collect to:'],
    bullets: [
      'Respond to your enquiries, callback requests, and form submissions;',
      'Provide the real estate services, guides, and tools you request;',
      'Follow up with you about buying, selling, or valuing a property;',
      'Understand how our website is used so we can improve it;',
      'Meet our legal, regulatory, and professional obligations as a licensed real estate professional.',
    ],
  },
  {
    heading: 'How we share your information',
    paras: [
      'We do not sell your personal information. We share it only as needed to provide our services and operate this site, including with:',
    ],
    bullets: [
      'eXp Realty, Brokerage, the brokerage under which Mark is licensed, where required to facilitate a transaction or meet regulatory obligations;',
      'Follow Up Boss, our client relationship management and follow-up system, which stores enquiry and contact details;',
      'Service providers that help us operate the site and communicate with you, such as our email delivery provider (Resend) and hosting infrastructure;',
      'Authorities or regulators where required by law or by real estate industry rules.',
    ],
  },
  {
    heading: 'Data retention',
    paras: [
      'We keep personal information only as long as necessary to fulfil the purposes described in this policy, to maintain our client relationship with you, and to meet legal, regulatory, and professional record-keeping requirements. When it is no longer needed, we take reasonable steps to securely delete or anonymize it.',
    ],
  },
  {
    heading: 'Your rights and choices',
    paras: [
      'Under Canadian privacy law you have the right to access the personal information we hold about you, to ask that we correct it, and to withdraw your consent to our use of it, subject to legal and contractual limits. You can also unsubscribe from our communications at any time.',
      'To exercise any of these rights, contact us using the details below and we will respond within a reasonable time.',
    ],
  },
  {
    heading: 'Third-party links',
    paras: [
      'Our site may link to third-party websites and services, including social media and property search platforms. This policy does not apply to those sites, and we are not responsible for their privacy practices. We encourage you to review the privacy policy of any site you visit.',
    ],
  },
  {
    heading: 'Changes to this policy',
    paras: [
      'We may update this policy from time to time to reflect changes in our practices or legal requirements. The date at the top of this page shows when it was last revised. Material changes will be reflected on this page.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <section className="relative bg-ink-950 pt-40 pb-24 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(70% 90% at 70% 0%, rgba(201,169,110,0.12) 0%, transparent 62%)' }}
        />
        <div className="relative z-10 max-w-[1320px] mx-auto px-8 md:px-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="block w-8 h-px bg-gold-500 shrink-0" />
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-gold-500">
              Legal · Your Privacy
            </p>
          </div>
          <h1 className="font-serif text-[clamp(44px,6.5vw,92px)] font-normal leading-[0.95] text-white tracking-tight mb-6">
            Privacy <em className="italic text-gold-500">Policy.</em>
          </h1>
          <p className="text-[16px] font-light text-white/55 max-w-[560px] leading-[1.9]">
            How we collect, use, and protect your personal information — and the choices you have.
          </p>
          <p className="text-[11px] font-light tracking-[0.14em] uppercase text-white/40 mt-6">
            Last updated {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="bg-ink-900 py-20">
        <div className="max-w-[820px] mx-auto px-8 md:px-12">
          <div className="flex flex-col gap-14">
            {sections.map((section, i) => (
              <RevealWrapper key={section.heading} delay={i * 40}>
                <div>
                  <h2 className="font-serif text-[clamp(24px,2.6vw,34px)] font-normal text-white leading-tight mb-5">
                    {section.heading}
                  </h2>
                  {section.paras?.map((p, pi) => (
                    <p key={pi} className="text-[14px] font-light text-white/60 leading-[1.9] mb-4">
                      {p}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="flex flex-col gap-3 mt-2">
                      {section.bullets.map((b, bi) => (
                        <li key={bi} className="flex gap-3 text-[14px] font-light text-white/60 leading-[1.8]">
                          <span aria-hidden="true" className="mt-2.5 block w-1.5 h-1.5 bg-gold-500 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </RevealWrapper>
            ))}

            <RevealWrapper delay={sections.length * 40}>
              <div className="border-t border-white/[0.08] pt-10">
                <h2 className="font-serif text-[clamp(24px,2.6vw,34px)] font-normal text-white leading-tight mb-5">
                  Contact us
                </h2>
                <p className="text-[14px] font-light text-white/60 leading-[1.9] mb-4">
                  If you have questions about this policy or how we handle your personal information,
                  please reach out:
                </p>
                <p className="text-[14px] font-light text-white/60 leading-[1.9]">
                  Mark Ghossein, Salesperson · eXp Realty, Brokerage<br />
                  Ottawa, Ontario, Canada<br />
                  <a href="mailto:mark@markghossein.com" className="text-gold-500 hover:text-gold-300 transition-colors">
                    mark@markghossein.com
                  </a>
                  {' · '}
                  <a href="tel:+16137897653" className="text-gold-500 hover:text-gold-300 transition-colors">
                    (613) 789-7653
                  </a>
                </p>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      <section className="bg-gold-500 py-20">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-normal text-ink-950 leading-tight">
              Ready to make your move?
            </h2>
            <p className="text-ink-950/80 text-[14px] mt-2">Get in touch — no pressure, no obligation.</p>
          </div>
          <Link href="/#contact" className="inline-flex items-center px-8 py-4 bg-ink-950 text-white text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-ink-800 transition-colors duration-300 shrink-0">
            Get in Touch
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
