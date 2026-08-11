"use client";

import { useEffect, useRef } from "react";
import GoldShader from "./GoldShader";
import { OliveBranch } from "./Ornaments";

const brand = ["S", "A", "R", "O"];

export default function Hero() {
  const sunRef = useRef<HTMLDivElement>(null);
  const branchRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      if (y > vh * 1.4) return;

      if (sunRef.current) sunRef.current.style.transform = `translateY(${y * 0.42}px)`;
      if (branchRef.current) branchRef.current.style.transform = `translateY(${y * 0.22}px) rotate(${y * 0.02}deg)`;
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${y * 0.16}px)`;
        contentRef.current.style.opacity = `${Math.max(0, 1 - y / (vh * 0.7))}`;
      }
      letterRefs.current.forEach((el, i) => {
        if (!el) return;
        const speed = 0.06 + i * 0.05;
        el.style.transform = `translateY(${-y * speed}px) rotate(${(i - 1.5) * y * 0.004}deg)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden bg-parchment">
      {/* Molten gold sun, rising behind the horizon */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div ref={sunRef} className="absolute left-[72%] top-[9%] -translate-x-1/2 md:left-[63%]">
          <div className="hero-sun h-[38vmin] w-[38vmin] overflow-hidden rounded-full shadow-[0_40px_120px_-20px_rgba(168,132,44,0.55)]">
            <GoldShader />
          </div>
        </div>
        <div className="absolute left-0 right-0 top-[calc(9%+19vmin)] h-px bg-ink/15" />
        <div className="absolute left-[8%] right-[8%] top-[calc(9%+19vmin+10px)] h-px bg-ink/10" />
        <div ref={branchRef} className="absolute right-[6%] top-[20%] hidden md:block">
          <OliveBranch className="float-slow h-56 text-olive" />
        </div>
      </div>

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 pt-32 md:px-12"
      >
        <p
          className="hero-fade text-[11px] font-medium uppercase tracking-[0.4em] text-ink-soft"
          style={{ "--d": "300ms" } as React.CSSProperties}
        >
          Web design and development studio &middot; Ottawa, Canada
        </p>

        <h1 className="mt-8 max-w-5xl font-display text-[clamp(3rem,8.5vw,8rem)] font-medium leading-[0.95] tracking-tight text-ink">
          <span className="hero-fade block" style={{ "--d": "450ms" } as React.CSSProperties}>
            Websites built
          </span>
          <span
            className="hero-fade block italic text-terracotta"
            style={{ "--d": "650ms" } as React.CSSProperties}
          >
            like works of art.
          </span>
        </h1>

        <div
          className="hero-fade mt-10 flex max-w-xl flex-col gap-8 md:max-w-none md:flex-row md:items-end md:justify-between"
          style={{ "--d": "850ms" } as React.CSSProperties}
        >
          <p className="max-w-md text-base leading-relaxed text-stone md:text-lg">
            SARO crafts brand identities, digital experiences, and website functionality
            that communicate clearly, achieve marketing goals, and look fantastic.
          </p>
          <div className="flex items-center gap-8">
            <a
              href="#works"
              className="group inline-flex items-center gap-3 border border-ink px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink transition-colors duration-500 hover:bg-ink hover:text-parchment"
            >
              Selected works
              <span className="transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
            </a>
            <a href="#contact" className="draw-link text-[11px] font-semibold uppercase tracking-[0.28em] text-ink">
              Start a project
            </a>
          </div>
        </div>
      </div>

      {/* Monumental wordmark, letters drift apart as you scroll */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-12" aria-hidden="true">
        <div className="flex items-end justify-between border-t border-ink/15 pb-2 pt-4 font-display text-[clamp(6rem,21vw,22rem)] font-semibold leading-[0.8] text-ink">
          {brand.map((letter, i) => (
            <span
              key={letter}
              ref={(el) => {
                letterRefs.current[i] = el;
              }}
              className="inline-block will-change-transform"
            >
              <span
                className="hero-letter"
                style={{ "--d": `${1000 + i * 120}ms` } as React.CSSProperties}
              >
                {letter}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="meander relative z-10 w-full text-ink/25" aria-hidden="true" />
    </section>
  );
}
