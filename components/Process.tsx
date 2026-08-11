import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { process } from "@/lib/site";

export default function Process() {
  return (
    <section id="process" className="relative bg-cream py-28 md:py-40">
      <div className="meander absolute inset-x-0 top-0 text-ink/15" aria-hidden="true" />
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <SectionHeading numeral="IV" label="The method" title="Come" titleItalic="lavoriamo." />
        <Reveal delay={150} className="mt-6 max-w-xl text-base leading-relaxed text-stone">
          How we work. Four movements, from first conversation to launch day, each one
          finished before the next begins.
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
          {process.map((step, i) => (
            <Reveal
              key={step.italian}
              delay={i * 120}
              className="arch group flex min-h-[26rem] flex-col border border-ink/20 bg-parchment px-8 pb-10 pt-20 text-center transition-colors duration-700 hover:bg-aegean-deep hover:border-aegean-deep"
            >
              <span className="font-display text-2xl italic text-terracotta transition-colors duration-700 group-hover:text-gold-bright">
                {step.numeral}.
              </span>
              <h3 className="mt-6 font-display text-4xl font-medium text-ink transition-colors duration-700 group-hover:text-cream">
                {step.italian}
              </h3>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.3em] text-stone transition-colors duration-700 group-hover:text-cream/60">
                {step.english}
              </p>
              <p className="mt-8 text-sm leading-relaxed text-stone transition-colors duration-700 group-hover:text-cream/75">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
