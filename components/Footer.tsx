import Link from 'next/link'
import Image from 'next/image'

const quickLinks = [
  { label: 'Services',       href: '/#services' },
  { label: 'Browse Homes',   href: '/#browse' },
  { label: 'About Mark',     href: '/#about' },
  { label: 'Client Stories', href: '/#testimonials' },
  { label: 'Contact',        href: '/#contact' },
]

const serviceLinks = [
  { label: "Buyer's Guide",        href: '/buyers' },
  { label: "Seller's Guide",       href: '/sellers' },
  { label: 'Mortgage Calculator',  href: '/mortgage-calculator' },
  { label: 'Home Evaluation',      href: '/home-evaluation' },
  { label: 'Probate & Estates',    href: '/probate' },
  { label: 'Real Estate FAQ',      href: '/faq' },
]

const socialLinks = [
  { label: 'Instagram', abbr: 'IG', href: '#' },
  { label: 'Facebook',  abbr: 'FB', href: '#' },
  { label: 'LinkedIn',  abbr: 'LI', href: '#' },
  { label: 'YouTube',   abbr: 'YT', href: '#' },
]

export function Footer() {
  return (
    <footer className="bg-ink-950 border-t border-white/[0.05]">
      <div className="mx-auto max-w-[1320px] px-8 md:px-12 pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div>
            <Image
              src="/images/logo.png"
              alt="Mark Ghossein Real Estate"
              width={768}
              height={623}
              className="h-16 w-auto mb-6"
            />
            <p className="font-serif text-[20px] italic text-white/55 mb-3">Make the right move.</p>
            <p className="text-[11px] font-light text-white/55 leading-relaxed">
              Mark Ghossein, Salesperson<br />
              eXp Realty, Brokerage<br />
              Ottawa, Ontario, Canada
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-[9px] font-semibold tracking-[0.24em] uppercase text-white/55 mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-3.5">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-[13px] font-light text-white/55 hover:text-gold-500 transition-colors duration-200">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[9px] font-semibold tracking-[0.24em] uppercase text-white/55 mb-6">Services</h3>
            <ul className="flex flex-col gap-3.5">
              {serviceLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-[13px] font-light text-white/55 hover:text-gold-500 transition-colors duration-200">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[9px] font-semibold tracking-[0.24em] uppercase text-white/55 mb-6">Contact</h3>
            <a href="mailto:mark@markghossein.com" className="block text-[13px] font-light text-white/55 hover:text-gold-500 transition-colors duration-200 mb-2">
              mark@markghossein.com
            </a>
            <p className="text-[13px] font-light text-white/55 mb-7">Ontario, Canada</p>
            <div className="flex gap-2.5 flex-wrap">
              {socialLinks.map(({ label, abbr, href }) => (
                <a
                  key={abbr}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-white/[0.07] text-[9px] font-bold tracking-wider text-white/55 flex items-center justify-center hover:border-gold-500/60 hover:text-gold-500 transition-all duration-200"
                >
                  {abbr}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Compliance disclosure */}
        <div className="border-t border-white/[0.05] pt-8 pb-2">
          <p className="text-[10px] font-light text-white/40 leading-[1.7] max-w-[980px]">
            Mark Ghossein is a licensed real estate Salesperson with eXp Realty, Brokerage, serving
            Ottawa and the surrounding area. The trademarks REALTOR®, REALTORS®, and the REALTOR® logo
            are controlled by The Canadian Real Estate Association (CREA) and identify real estate
            professionals who are members of CREA. The trademarks MLS®, Multiple Listing Service®, and
            the associated logos identify professional services rendered by REALTOR® members of CREA to
            effect the purchase, sale, and lease of real estate as part of a cooperative selling system.
            Not intended to solicit buyers or sellers currently under contract with a brokerage.
          </p>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.05] py-7 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] font-light text-white/55">
            © {new Date().getFullYear()} Mark Ghossein Real Estate Advisors. All rights reserved.
          </p>
          <p className="text-[11px] font-light text-white/55">
            eXp Realty, Brokerage
          </p>
        </div>
      </div>
    </footer>
  )
}
