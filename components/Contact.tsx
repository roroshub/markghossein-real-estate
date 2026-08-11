import ContactForm from "./ContactForm";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { OliveBranch } from "./Ornaments";
import { site } from "@/lib/site";

export default function Contact() {
  return (
    <section id="contact" className="relative bg-parchment py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <SectionHeading numeral="VI" label="Get in touch" title="Let&rsquo;s talk" titleItalic="about your project." />
        <Reveal delay={150} className="mt-6 max-w-xl text-base leading-relaxed text-stone">
          If you would like to work with us, or just want to reach out, we would love
          to hear from you.
        </Reveal>

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12">
          <Reveal delay={100} className="md:col-span-7">
            <ContactForm />
          </Reveal>

          <Reveal delay={250} className="md:col-span-4 md:col-start-9">
            <div className="space-y-10 border-l border-ink/15 pl-8">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone">Telephone</p>
                <a href={site.phoneHref} className="draw-link mt-2 inline-block font-display text-2xl text-ink">
                  {site.phone}
                </a>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone">Studio</p>
                <p className="mt-2 font-display text-2xl leading-snug text-ink">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.region} {site.address.postal}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone">Hours</p>
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  Monday to Friday, 9 to 5.
                  <br />
                  The coffee is always on.
                </p>
              </div>
              <OliveBranch className="h-32 text-olive/70" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
