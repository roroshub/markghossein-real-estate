import Link from 'next/link'
import Image from 'next/image'
import { RevealWrapper } from './RevealWrapper'
import { Magnetic } from './Magnetic'

const specializations = [
  'Buying',
  'Selling',
  'Upsizing',
  'Downsizing',
  'Investment',
  'Probate & Estates',
]

const credentials = [
  { t: 'eXp Realty', d: 'Ottawa & surrounding area' },
  { t: 'Probate Specialist', d: 'Estate & inherited property sales' },
  { t: 'Data-Driven Strategy', d: 'Pricing and negotiation backed by numbers' },
]

export function About() {
  return (
    <section id="about" className="py-32 bg-ink-900 overflow-hidden">
      <div className="mx-auto max-w-[1320px] px-8 md:px-12">

        {/* Section label */}
        <RevealWrapper>
          <div className="flex items-center gap-4 mb-16">
            <span className="block w-8 h-px bg-gold-500 shrink-0" />
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-gold-500">About Mark</p>
          </div>
        </RevealWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center">

          {/* ── Text column ── */}
          <RevealWrapper>
            <h2 className="font-serif text-[clamp(36px,4.4vw,64px)] font-normal leading-[1.0] text-white mb-10 tracking-tight">
              Your Forever Agent.<br />
              <em className="italic text-gold-500">Your Advisor.</em>
            </h2>

            <p className="text-[15px] font-light text-white/55 leading-[1.95] mb-5">
              Mark Ghossein is an Ottawa real estate advisor known for a strategic, data-driven
              approach and a genuine commitment to getting the details right. He works with clients
              at every stage, from sellers looking to maximize their return to families upsizing,
              downsizing, or buying their first home, pairing deep local market knowledge with a
              client-first approach.
            </p>
            <p className="text-[15px] font-light text-white/55 leading-[1.95] mb-12">
              Specializing in probate-related sales, Mark takes the weight of the property off
              executors&apos; and families&apos; shoulders. Through his <span className="text-white/80">Estate
              Property Concierge Service</span>, his team coordinates cleanouts, repairs, and staging with a
              trusted vendor network, guiding families through the sale with patience and discretion so the
              process feels as smooth as possible during an already difficult time. Partnered with eXp Realty,
              he&apos;s helped Ottawa families move forward with clarity and confidence, no matter where they
              are in life.
            </p>

            {/* Specialization chips */}
            <div className="flex flex-wrap gap-2.5 mb-12">
              {specializations.map((s) => (
                <span
                  key={s}
                  className="text-[10px] font-medium tracking-[0.12em] uppercase text-white/55 border border-white/[0.12] px-3.5 py-2"
                >
                  {s}
                </span>
              ))}
            </div>

            <Magnetic>
              <Link
                href="#contact"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-ink-950 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-gold-300 transition-colors duration-300"
              >
                Work With Mark
              </Link>
            </Magnetic>
          </RevealWrapper>

          {/* ── Visual / credentials column ── */}
          <RevealWrapper delay={120}>
            <div className="relative">
              {/* Portrait card */}
              <div
                className="relative bg-ink-950 overflow-hidden mb-px"
                style={{ aspectRatio: '3/4' }}
              >
                <Image
                  src="/images/mark-ghossein.jpg"
                  alt="Mark Ghossein, Ottawa real estate advisor with eXp Realty"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(90% 70% at 70% 10%, rgba(201,169,110,0.14) 0%, transparent 60%)' }}
                />
              </div>

              {/* Credentials list */}
              <div className="border border-white/[0.07] divide-y divide-white/[0.07]">
                {credentials.map(({ t, d }) => (
                  <div key={t} className="flex items-start gap-4 p-6 bg-ink-950">
                    <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                    <div>
                      <p className="text-[13px] font-semibold text-white tracking-wide">{t}</p>
                      <p className="text-[12px] font-light text-white/55 mt-1">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}
