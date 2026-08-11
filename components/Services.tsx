import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { services } from "@/lib/site";

export default function Services() {
  return (
    <section id="services" className="bg-aegean-deep py-28 text-cream md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <SectionHeading
          numeral="II"
          label="What we do"
          title="Four crafts,"
          titleItalic="one atelier."
          tone="dark"
        />

        <div className="mt-16 md:mt-24">
          {services.map((service, i) => (
            <Reveal
              key={service.title}
              delay={i * 90}
              variant="tilt"
              className="group grid gap-6 border-t border-cream/15 py-12 last:border-b md:grid-cols-12 md:items-baseline md:py-14"
            >
              <div className="md:col-span-2">
                <span className="font-display text-xl italic text-gold-bright">{service.numeral}.</span>
                <span className="ml-3 text-[11px] font-medium uppercase tracking-[0.3em] text-cream/50">
                  {service.label}
                </span>
              </div>
              <h3 className="font-display text-3xl font-medium leading-tight transition-transform duration-700 group-hover:translate-x-3 md:col-span-4 md:text-4xl">
                {service.title}
              </h3>
              <p className="max-w-md text-base leading-relaxed text-cream/70 md:col-span-4">
                {service.description}
              </p>
              <ul className="space-y-1.5 text-[13px] uppercase tracking-[0.14em] text-cream/45 md:col-span-2">
                {service.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
