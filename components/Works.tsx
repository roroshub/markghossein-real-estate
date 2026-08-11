import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { works, type Work } from "@/lib/site";

function WorkRow({ work, delay }: { work: Work; delay: number }) {
  const inner = (
    <div className="grid items-center gap-3 py-9 md:grid-cols-12 md:gap-6 md:py-11">
      <span className="font-display text-lg italic text-stone md:col-span-1">{work.index}</span>
      <h3 className="work-title font-display text-4xl font-medium leading-none tracking-tight md:col-span-5 md:text-6xl">
        {work.name}
      </h3>
      <p className="hidden max-w-sm text-sm leading-relaxed text-stone md:col-span-4 md:block">
        {work.note}
      </p>
      <div className="flex items-center gap-6 text-[11px] font-medium uppercase tracking-[0.24em] text-stone md:col-span-2 md:justify-end">
        <span>{work.sector}</span>
        <span className="font-display text-base italic normal-case tracking-normal">{work.year}</span>
        {work.url ? <span aria-hidden="true">{"↗"}</span> : null}
      </div>
    </div>
  );

  return (
    <Reveal delay={delay}>
      <div className="work-row relative">
        {/* Floating peek card, revealed on hover */}
        <div
          className="work-peek pointer-events-none absolute right-[16%] top-1/2 z-10 hidden h-44 w-64 -mt-[5.5rem] items-center justify-center border border-ink/10 shadow-2xl lg:flex"
          style={{
            background: `linear-gradient(135deg, ${work.palette[0]} 0%, ${work.palette[0]} 55%, ${work.palette[1]} 140%)`,
          }}
          aria-hidden="true"
        >
          <span className="font-display text-6xl italic" style={{ color: work.palette[1] }}>
            {work.name
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </span>
          <span
            className="absolute bottom-3 right-4 text-[10px] font-medium uppercase tracking-[0.3em]"
            style={{ color: work.palette[1] }}
          >
            {work.sector}
          </span>
        </div>

        {work.url ? (
          <a
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-t border-ink/15 transition-colors duration-500 hover:bg-cream"
          >
            {inner}
          </a>
        ) : (
          <div className="border-t border-ink/15 transition-colors duration-500 hover:bg-cream">{inner}</div>
        )}
      </div>
    </Reveal>
  );
}

export default function Works() {
  return (
    <section id="works" className="bg-parchment py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading numeral="III" label="Selected works" title="The" titleItalic="gallery." />
          <Reveal delay={200} className="pb-2 text-sm text-stone">
            A selection from the studio&rsquo;s collection, 2019 to today.
          </Reveal>
        </div>

        <div className="mt-16 border-b border-ink/15 md:mt-24">
          {works.map((work, i) => (
            <WorkRow key={work.name} work={work} delay={Math.min(i * 60, 240)} />
          ))}
        </div>

        <Reveal delay={100} className="mt-12 flex justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 border border-ink px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink transition-colors duration-500 hover:bg-terracotta hover:border-terracotta hover:text-cream"
          >
            Commission the next one
            <span className="transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
