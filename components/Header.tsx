"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#studio", label: "Studio" },
  { href: "#services", label: "Services" },
  { href: "#works", label: "Works" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setHidden(y > 120 && y > last);
        last = y;
        frame = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ mixBlendMode: "difference" }}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 text-[#f2ecdf] md:px-12">
        <a href="#top" className="font-display text-2xl font-semibold tracking-[0.35em]">
          SARO
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="draw-link text-[11px] font-medium uppercase tracking-[0.28em]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="draw-link text-[11px] font-medium uppercase tracking-[0.28em] md:hidden"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
