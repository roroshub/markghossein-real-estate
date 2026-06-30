'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavChild = { label: string; href: string }
type NavItem = { label: string; href?: string; children?: NavChild[] }

const navLinks: NavItem[] = [
  { label: 'About', href: '#about' },
  {
    label: 'Services',
    children: [
      { label: 'Buyer Representation',  href: '/buyers' },
      { label: 'Seller Representation', href: '/sellers' },
      { label: 'Upsizing',              href: '/upsizing' },
      { label: 'Downsizing',            href: '/downsizing' },
      { label: 'Investment Strategy',   href: '/investment' },
      { label: 'Probate & Estate Sales', href: '/probate' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { label: "Buyer's Guide",            href: '/buyers' },
      { label: "Seller's Guide",           href: '/sellers' },
      { label: 'Mortgage Calculator',      href: '/mortgage-calculator' },
      { label: 'Probate Guide',            href: '/probate' },
      { label: 'Smooth Move System',       href: '/upsizing' },
      { label: 'Home Evaluation',          href: '/home-evaluation' },
      { label: 'Nosey Neighbour',          href: '/nosey-neighbour' },
      { label: 'Real Estate FAQ',          href: '/faq' },
    ],
  },
  { label: 'Reviews', href: '#testimonials' },
]

const socialLinks = [
  { label: 'Instagram', abbr: 'IG', href: 'https://instagram.com' },
  { label: 'Facebook',  abbr: 'FB', href: 'https://facebook.com' },
  { label: 'LinkedIn',  abbr: 'LI', href: 'https://linkedin.com' },
  { label: 'YouTube',   abbr: 'YT', href: 'https://youtube.com' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  // Prefix anchor-only hrefs with '/' when not on the home page
  const resolveHref = (href: string) =>
    href.startsWith('#') && !isHome ? `/${href}` : href

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink-950/95 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-[1320px] items-center justify-between px-8 md:px-12 h-[76px]">
        {/* Logo */}
        <Link href="/" onClick={closeMenu} className="flex items-center gap-4 shrink-0">
          <div className="w-10 h-10 bg-gold-500 flex items-center justify-center shrink-0">
            <span className="font-serif text-ink-950 text-base font-semibold tracking-wider">MG</span>
          </div>
          <div className="text-white">
            <p className="text-[13px] font-medium tracking-[0.08em] uppercase leading-none">Mark Ghossein</p>
            <p className="text-[10px] tracking-[0.16em] opacity-40 uppercase mt-1">Real Estate Advisors</p>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) =>
            item.children ? (
              <li key={item.label} className="relative group">
                <button
                  className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.14em] uppercase text-white/55 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none" className="opacity-50 transition-transform duration-200 group-hover:rotate-180">
                    <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {/* Dropdown */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                  <ul className="min-w-[200px] bg-ink-900 border border-white/[0.08] py-2 shadow-2xl shadow-black/50">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={resolveHref(child.href)}
                          className={`block px-5 py-3 text-[11px] font-medium tracking-[0.12em] uppercase transition-colors duration-200 ${
                            pathname === child.href ? 'text-gold-500' : 'text-white/55 hover:text-white hover:bg-white/[0.04]'
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={resolveHref(item.href!)}
                  className={`text-[11px] font-medium tracking-[0.14em] uppercase transition-colors duration-200 ${
                    item.href === pathname ? 'text-gold-500' : 'text-white/55 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        {/* Desktop right: socials + CTA */}
        <div className="hidden lg:flex items-center gap-5 shrink-0">
          <div className="flex items-center gap-2">
            {socialLinks.map(({ label, abbr, href }) => (
              <a
                key={abbr}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-7 h-7 border border-white/[0.1] text-[8px] font-bold tracking-wider text-white/40 flex items-center justify-center hover:border-gold-500/60 hover:text-gold-500 transition-all duration-200"
              >
                {abbr}
              </a>
            ))}
          </div>
          <Link
            href={resolveHref('#contact')}
            className="text-[11px] font-medium tracking-[0.14em] uppercase text-gold-500 border border-gold-500/60 px-5 py-2.5 hover:bg-gold-500 hover:text-ink-950 transition-all duration-200"
          >
            Let&apos;s Talk
          </Link>
        </div>

        {/* Burger */}
        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
          className="lg:hidden flex flex-col gap-[5px] p-1"
        >
          <span className={`block w-5 h-px bg-white transition-transform duration-300 ${menuOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
          <span className={`block w-5 h-px bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-white transition-transform duration-300 ${menuOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden bg-ink-950 border-t border-white/[0.06] overflow-y-auto transition-all duration-300 ${
          menuOpen ? 'max-h-[80vh]' : 'max-h-0'
        }`}
      >
        {navLinks.map((item) =>
          item.children ? (
            <div key={item.label} className="border-b border-white/[0.04]">
              <p className="px-8 pt-4 pb-2 text-[9px] font-semibold tracking-[0.24em] uppercase text-gold-500/70">
                {item.label}
              </p>
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={resolveHref(child.href)}
                  onClick={closeMenu}
                  className="block px-8 py-3 pl-12 text-[11px] font-medium tracking-[0.14em] uppercase text-white/50 hover:text-gold-500 transition-colors duration-200"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ) : (
            <Link
              key={item.href}
              href={resolveHref(item.href!)}
              onClick={closeMenu}
              className="block px-8 py-4 text-[11px] font-medium tracking-[0.14em] uppercase text-white/50 hover:text-gold-500 border-b border-white/[0.04] transition-colors duration-200"
            >
              {item.label}
            </Link>
          ),
        )}
        <Link
          href={resolveHref('#contact')}
          onClick={closeMenu}
          className="block px-8 py-4 text-[11px] font-medium tracking-[0.14em] uppercase text-gold-500 border-b border-white/[0.04] transition-colors duration-200"
        >
          Let&apos;s Talk
        </Link>
        {/* Mobile socials */}
        <div className="flex gap-2.5 px-8 py-5">
          {socialLinks.map(({ label, abbr, href }) => (
            <a
              key={abbr}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 border border-white/[0.1] text-[9px] font-bold tracking-wider text-white/40 flex items-center justify-center hover:border-gold-500/60 hover:text-gold-500 transition-all duration-200"
            >
              {abbr}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
