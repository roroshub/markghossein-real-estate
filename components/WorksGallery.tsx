"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { works, type Work } from "@/lib/site";

function WorkCard({ work }: { work: Work }) {
  const body = (
    <>
      <span
        className="pointer-events-none absolute -right-6 -top-10 select-none font-display text-[11rem] italic leading-none opacity-25"
        style={{ color: work.palette[1] }}
        aria-hidden="true"
      >
        {work.index}
      </span>
      <div className="relative flex h-full flex-col justify-between p-8">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: work.palette[1] }}>
          <span>{work.sector}</span>
          <span className="font-display text-sm italic normal-case tracking-normal">{work.year}</span>
        </div>
        <div>
          <span
            className="font-display text-7xl italic leading-none"
            style={{ color: work.palette[1] }}
            aria-hidden="true"
          >
            {work.name
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </span>
          <h3 className="mt-6 font-display text-4xl font-medium leading-[1.05] text-cream">
            {work.name}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-cream/75">{work.note}</p>
          {work.url ? (
            <span
              className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: work.palette[1] }}
            >
              Visit site {"↗"}
            </span>
          ) : null}
        </div>
      </div>
    </>
  );

  const cardClasses =
    "work-card relative block h-[30rem] w-[21rem] shrink-0 overflow-hidden border border-ink/10 shadow-[0_30px_80px_-30px_rgba(33,27,18,0.5)] md:h-[34rem] md:w-[24rem]";
  const style = {
    background: `linear-gradient(150deg, ${work.palette[0]} 0%, ${work.palette[0]} 60%, ${work.palette[1]} 175%)`,
  };

  return work.url ? (
    <a href={work.url} target="_blank" rel="noopener noreferrer" className={cardClasses} style={style} data-cursor="link">
      {body}
    </a>
  ) : (
    <div className={cardClasses} style={style}>
      {body}
    </div>
  );
}

export default function WorksGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const update = () => setPinned(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    if (!section || !track) return;

    let frame = 0;
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".work-card"));

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)));

      const distance = track.scrollWidth - window.innerWidth + window.innerWidth * 0.12;
      track.style.transform = `translateX(${(-progress * distance).toFixed(1)}px)`;
      if (bar) bar.style.transform = `scaleX(${progress})`;

      // 3D: cards rotate toward the viewer as they pass center
      const mid = window.innerWidth / 2;
      for (const card of cards) {
        const r = card.getBoundingClientRect();
        const offset = (r.left + r.width / 2 - mid) / mid;
        const rotate = Math.max(-16, Math.min(16, offset * 14));
        const depth = Math.abs(offset) * -70;
        card.style.transform = `perspective(1200px) rotateY(${rotate.toFixed(2)}deg) translateZ(${depth.toFixed(1)}px)`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pinned]);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative bg-parchment"
      style={pinned ? { height: `${works.length * 55 + 100}vh` } : undefined}
    >
      <div className={pinned ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-28 md:py-40"}>
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading numeral="III" label="Selected works" title="The" titleItalic="gallery." />
            <Reveal delay={200} className="pb-2 text-sm text-stone">
              {pinned ? "Keep scrolling, the gallery moves with you." : "A selection from the studio's collection."}
            </Reveal>
          </div>
        </div>

        <div className={pinned ? "mt-14 pl-6 md:pl-12" : "mt-14 px-6 md:px-12"}>
          <div
            ref={trackRef}
            className={
              pinned
                ? "flex gap-8 will-change-transform"
                : "mx-auto grid max-w-[1600px] gap-8 sm:grid-cols-2 xl:grid-cols-4"
            }
            style={pinned ? { transformStyle: "preserve-3d" } : undefined}
          >
            {works.map((work) => (
              <Reveal key={work.name} delay={pinned ? 0 : 80} variant={pinned ? "none" : "fade"}>
                <WorkCard work={work} />
              </Reveal>
            ))}
            {pinned ? (
              <a
                href="#contact"
                data-cursor="link"
                className="flex h-[30rem] w-[21rem] shrink-0 flex-col items-center justify-center gap-6 border border-ink/25 text-center transition-colors duration-500 hover:bg-cream md:h-[34rem] md:w-[24rem]"
              >
                <span className="font-display text-5xl italic text-terracotta">Yours next?</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-ink">
                  Start a project {"→"}
                </span>
              </a>
            ) : null}
          </div>
        </div>

        {pinned ? (
          <div className="mx-auto mt-14 w-full max-w-[1600px] px-6 md:px-12">
            <div className="h-px w-full bg-ink/15">
              <div ref={barRef} className="h-px origin-left bg-terracotta" style={{ transform: "scaleX(0)" }} />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
