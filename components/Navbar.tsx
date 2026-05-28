'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'About',       href: '#about' },
  { label: 'Services',    href: '#services' },
  { label: 'Listings',    href: '#listings' },
  { label: 'Smooth Move', href: '#system' },
  { label: 'Reviews',     href: '#testimonials' },
  { label: 'Buyers',      href: '/buyers' },
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
        <Link href="/" onClick={closeMenu} className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gold-500 flex items-center justify-center shrink-0">
            <span className="font-serif text-ink-950 text-base font-semibold tracking-wider">MG</span>
          </div>
          <div className="text-white">
            <p className="text-[13px] font-medium tracking-[0.08em] uppercase leading-none">Mark Ghossein</p>
            <p className="text-[10px] tracking-[0.16em] opacity-40 uppercase mt-1">Real Estate Advisors</p>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-10">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={resolveHref(href)}
                className={`text-[11px] font-medium tracking-[0.14em] uppercase transition-colors duration-200 ${
                  href === '/buyers' && pathname === '/buyers'
                    ? 'text-gold-500'
                    : 'text-white/55 hover:text-white'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={resolveHref('#contact')}
              className="text-[11px] font-medium tracking-[0.14em] uppercase text-gold-500 border border-gold-500/60 px-5 py-2.5 hover:bg-gold-500 hover:text-ink-950 transition-all duration-200"
            >
              Let's Talk
            </Link>
          </li>
        </ul>

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
        className={`lg:hidden bg-ink-950 border-t border-white/[0.06] overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        {[...navLinks, { label: "Let's Talk", href: '#contact' }].map(({ label, href }) => (
          <Link
            key={href}
            href={resolveHref(href)}
            onClick={closeMenu}
            className="block px-8 py-4 text-[11px] font-medium tracking-[0.14em] uppercase text-white/50 hover:text-gold-500 border-b border-white/[0.04] transition-colors duration-200"
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  )
}
