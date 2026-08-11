import Counter from "./Counter";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { ColumnCapital } from "./Ornaments";
import { stats } from "@/lib/site";

export default function Studio() {
  return (
    <section id="studio" className="bg-parchment py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <SectionHeading numeral="I" label="The studio" title="Old world patience," titleItalic="new world speed." />

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <p className="drop-cap max-w-2xl text-lg leading-[1.9] text-ink-soft md:text-xl">
                SARO is an Ottawa web studio that helps clients succeed by creating brand
                identities, digital experiences, and website functionality that communicate
                clearly, achieve marketing goals, and look fantastic. We revitalize existing
                websites and craft brand new ones from inception to launch, so your online
                presence reflects your vision.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-8 max-w-2xl text-lg leading-[1.9] text-stone">
                We take our cues from the builders of the Mediterranean, where nothing was
                rushed and everything was made to last. Every project gets a craftsman&rsquo;s
                attention: custom design, clean code, and a partner who picks up the phone.
              </p>
            </Reveal>

            <Reveal delay={250} className="mt-14 grid grid-cols-3 gap-6 border-t border-ink/15 pt-10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-5xl font-medium text-ink md:text-6xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.24em] text-stone">
                    {stat.label}
                  </div>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="relative md:col-span-5">
            <Reveal delay={200} variant="tilt" className="relative">
              <div className="arch relative overflow-hidden border border-ink/20 bg-cream px-10 pb-12 pt-24 text-center">
                <ColumnCapital className="mx-auto h-28 text-terracotta" />
                <p className="mt-10 font-display text-3xl italic leading-snug text-ink">
                  &ldquo;Beauty is function.&rdquo;
                </p>
                <p className="mx-auto mt-8 max-w-xs text-sm leading-relaxed text-stone">
                  Our founding belief. A website should be beautiful the way a well built
                  bridge is beautiful, because every part of it works.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
