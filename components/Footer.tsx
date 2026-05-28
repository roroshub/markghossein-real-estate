import Link from 'next/link'

const quickLinks = [
  { label: 'About Mark',         href: '#about' },
  { label: 'Services',           href: '#services' },
  { label: 'Listings',           href: '#listings' },
  { label: 'Smooth Move System', href: '#system' },
  { label: 'Client Stories',     href: '#testimonials' },
  { label: 'Contact',            href: '#contact' },
]

const serviceLinks = [
  { label: 'Buyer Representation',  href: '#services' },
  { label: 'Seller Representation', href: '#services' },
  { label: 'Upsizing',              href: '#services' },
  { label: 'HomeWorth Valuation',   href: '#tools' },
  { label: 'Nosey Neighbour',       href: '#tools' },
  { label: 'Buyer Checklist',       href: '#tools' },
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
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 bg-gold-500 flex items-center justify-center shrink-0">
                <span className="font-serif text-ink-950 text-sm font-semibold tracking-wider">MG</span>
              </div>
              <div className="text-white">
                <p className="text-[12px] font-medium tracking-[0.1em] uppercase">Mark Ghossein</p>
                <p className="text-[9px] tracking-[0.2em] opacity-35 uppercase mt-1">Real Estate Advisors</p>
              </div>
            </div>
            <p className="font-serif text-[20px] italic text-white/30 mb-3">Make the right move.</p>
            <p className="text-[11px] font-light text-white/20 leading-relaxed">
              Affiliated with eXp Realty<br />Ottawa, Ontario, Canada
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[9px] font-semibold tracking-[0.24em] uppercase text-white/25 mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3.5">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-[13px] font-light text-white/45 hover:text-gold-500 transition-colors duration-200">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[9px] font-semibold tracking-[0.24em] uppercase text-white/25 mb-6">Services</h4>
            <ul className="flex flex-col gap-3.5">
              {serviceLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-[13px] font-light text-white/45 hover:text-gold-500 transition-colors duration-200">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[9px] font-semibold tracking-[0.24em] uppercase text-white/25 mb-6">Contact</h4>
            <a href="mailto:mark@markghossein.com" className="block text-[13px] font-light text-white/45 hover:text-gold-500 transition-colors duration-200 mb-2">
              mark@markghossein.com
            </a>
            <p className="text-[13px] font-light text-white/45 mb-7">Ontario, Canada</p>
            <div className="flex gap-2.5 flex-wrap">
              {socialLinks.map(({ label, abbr, href }) => (
                <a
                  key={abbr}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-white/[0.07] text-[9px] font-bold tracking-wider text-white/30 flex items-center justify-center hover:border-gold-500/60 hover:text-gold-500 transition-all duration-200"
                >
                  {abbr}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.05] py-7 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] font-light text-white/20">
            © {new Date().getFullYear()} Mark Ghossein Real Estate Advisors. All rights reserved.
          </p>
          <p className="text-[11px] font-light text-white/15">
            Not intended to solicit buyers or sellers currently under contract.
          </p>
        </div>
      </div>
    </footer>
  )
}
