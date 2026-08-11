import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-parchment">
      <div className="meander w-full text-parchment/20" aria-hidden="true" />
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-12">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-[clamp(3.5rem,8vw,7rem)] font-semibold leading-none tracking-[0.12em]">
              SARO
            </p>
            <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.32em] text-parchment/50">
              Website Development &middot; {site.address.city}, {site.address.country}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-10 gap-y-3 text-[11px] font-medium uppercase tracking-[0.28em]" aria-label="Footer">
            <a href="#studio" className="draw-link">Studio</a>
            <a href="#services" className="draw-link">Services</a>
            <a href="#works" className="draw-link">Works</a>
            <a href="#process" className="draw-link">Process</a>
            <a href="#contact" className="draw-link">Contact</a>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-parchment/15 pt-8 text-xs text-parchment/45 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {site.legalName}. All rights reserved.
          </p>
          <p className="font-display text-sm italic tracking-wide">Fatto a mano a Ottawa.</p>
        </div>
      </div>
    </footer>
  );
}
