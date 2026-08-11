import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { testimonials } from "@/lib/site";

function Stars() {
  return (
    <div className="flex gap-1 text-gold-bright" aria-label="Five star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-aegean py-28 text-cream md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <SectionHeading
          numeral="V"
          label="In their words"
          title="Clients say it"
          titleItalic="best."
          tone="dark"
        />

        <div className="mt-16 grid gap-8 md:mt-24 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Reveal
              key={testimonial.author}
              delay={i * 130}
              className="flex flex-col justify-between border border-cream/15 bg-aegean-deep/60 p-10"
            >
              <div>
                <span className="font-display text-7xl leading-none text-gold-bright/70" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className="mt-2 font-display text-xl italic leading-relaxed text-cream/90">
                  {testimonial.quote}
                </blockquote>
              </div>
              <footer className="mt-10 border-t border-cream/15 pt-6">
                <Stars />
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em]">{testimonial.author}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cream/50">{testimonial.role}</p>
              </footer>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-14 text-center text-sm text-cream/60">
          Rated 5.0 on Google by the people we build for.
        </Reveal>
      </div>
    </section>
  );
}
