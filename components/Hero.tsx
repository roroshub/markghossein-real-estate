import { OliveBranch } from "./Ornaments";

const brand = ["S", "A", "R", "O"];

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden bg-parchment">
      {/* Aegean sun, rising behind the horizon */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="hero-sun absolute left-1/2 top-[16%] h-[34vmin] w-[34vmin] -translate-x-1/2 rounded-full bg-gold-bright/80" />
        <div className="absolute left-1/2 top-[16%] h-[34vmin] w-[34vmin] -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />
        {/* Horizon rules */}
        <div className="absolute left-0 right-0 top-[calc(16%+17vmin)] h-px bg-ink/15" />
        <div className="absolute left-[8%] right-[8%] top-[calc(16%+17vmin+10px)] h-px bg-ink/10" />
        {/* Olive branch, right margin */}
        <OliveBranch className="float-slow absolute right-[6%] top-[22%] hidden h-56 text-olive md:block" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 pt-32 md:px-12">
        <p
          className="hero-fade text-[11px] font-medium uppercase tracking-[0.4em] text-ink-soft"
          style={{ "--d": "300ms" } as React.CSSProperties}
        >
          Studio di sviluppo web &middot; Ottawa, Canada
        </p>

        <h1 className="mt-8 max-w-5xl font-display text-[clamp(3rem,8.5vw,8rem)] font-medium leading-[0.95] tracking-tight text-ink">
          <span
            className="hero-fade block"
            style={{ "--d": "450ms" } as React.CSSProperties}
          >
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
          className="hero-fade mt-10 flex max-w-xl flex-col gap-8 md:flex-row md:items-end md:justify-between md:max-w-none"
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

      {/* Monumental wordmark on the hero's plinth */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-12" aria-hidden="true">
        <div className="flex items-end justify-between border-t border-ink/15 pt-4 pb-2 font-display text-[clamp(6rem,21vw,22rem)] font-semibold leading-[0.8] text-ink">
          {brand.map((letter, i) => (
            <span
              key={letter}
              className="hero-letter"
              style={{ "--d": `${1000 + i * 120}ms` } as React.CSSProperties}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      <div className="meander relative z-10 w-full text-ink/25" aria-hidden="true" />
    </section>
  );
}
