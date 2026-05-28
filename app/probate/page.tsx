import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealWrapper } from '@/components/RevealWrapper'

export const metadata: Metadata = {
  title: 'Probate & Estate Real Estate',
  description:
    'Certified Probate Real Estate Specialist in Ottawa. Compassionate, expert guidance for executors and families selling probate and inherited properties.',
}

const steps = [
  {
    num: '01',
    title: 'Initial Consultation',
    body: "We meet to understand the estate, the property, and your family's wishes — no pressure, no obligation. I explain the probate process in plain language.",
  },
  {
    num: '02',
    title: 'Coordinate With Counsel',
    body: 'I work directly with the estate lawyer to confirm the executor’s authority to sell and align on timelines, the Certificate of Appointment, and any court requirements.',
  },
  {
    num: '03',
    title: 'Prepare the Property',
    body: 'Cleanouts, repairs, staging, and valuation — I manage trusted vendors to present the home at its best while respecting the estate’s budget.',
  },
  {
    num: '04',
    title: 'Strategic Pricing',
    body: 'A data-driven market valuation ensures the property sells for its true worth — protecting the proceeds owed to every beneficiary.',
  },
  {
    num: '05',
    title: 'Market & Negotiate',
    body: 'Full marketing exposure, qualified buyers, and assertive negotiation — with every offer reviewed against the estate’s best interest.',
  },
  {
    num: '06',
    title: 'Close With Care',
    body: 'I coordinate lawyers, lenders, and movers through closing so the estate is settled smoothly and your family can move forward.',
  },
]

const faqs = [
  {
    q: 'What is a probate sale?',
    a: 'A probate sale is the sale of real estate that belonged to someone who has passed away. The court-appointed executor sells the property as part of settling the estate, often once the Certificate of Appointment of Estate Trustee has been granted.',
  },
  {
    q: 'Do I need probate before I can sell?',
    a: 'In most Ontario cases the executor needs the Certificate of Appointment before transferring title. I work with your estate lawyer to time the listing and closing correctly so there are no surprises.',
  },
  {
    q: 'What does “Certified Probate Specialist” mean?',
    a: 'It means I’ve completed dedicated training in the legal, financial, and emotional aspects of estate sales — so I can guide executors and beneficiaries through a process most agents rarely handle.',
  },
  {
    q: 'How are the proceeds handled?',
    a: 'Net proceeds flow to the estate and are distributed to beneficiaries per the will, after debts and expenses. I focus on maximizing the sale price; your estate lawyer handles distribution.',
  },
]

export default function ProbatePage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative bg-ink-950 pt-40 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />
        <div className="relative z-10 max-w-[1320px] mx-auto px-8 md:px-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="block w-8 h-px bg-gold-500 shrink-0" />
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-gold-500">
              Certified Probate Real Estate Specialist
            </p>
          </div>
          <h1 className="font-serif text-[clamp(44px,6.5vw,92px)] font-normal leading-[0.95] text-white tracking-tight mb-6">
            Probate &amp; <em className="italic text-gold-500">Estate Sales</em>
          </h1>
          <p className="text-[16px] font-light text-white/50 max-w-[560px] leading-[1.9]">
            Compassionate, expert guidance for Ottawa executors and families selling probate or
            inherited property — handled with patience, discretion, and a clear plan.
          </p>
        </div>
      </section>

      {/* ── Intro / certified ── */}
      <section className="bg-ink-900 py-24">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-start">
          <RevealWrapper>
            <h2 className="font-serif text-[clamp(28px,3.2vw,44px)] font-normal text-white leading-tight mb-6">
              You don&apos;t have to navigate this alone.
            </h2>
            <p className="text-[15px] font-light text-white/45 leading-[1.95] mb-5">
              Selling an estate property comes with legal deadlines, family dynamics, and emotional
              weight that an ordinary sale never carries. As a <span className="text-white/70">Certified
              Probate Real Estate Specialist</span>, I&apos;ve been trained specifically to manage this —
              working hand-in-hand with your estate lawyer every step of the way.
            </p>
            <p className="text-[15px] font-light text-white/45 leading-[1.95]">
              Whether the home needs a full cleanout and renovation or is ready to list tomorrow, I take
              the real estate burden off your shoulders so your family can focus on what matters.
            </p>
          </RevealWrapper>
          <RevealWrapper delay={100}>
            <div className="border border-gold-500/20 bg-gold-500/[0.04] p-10">
              <p className="font-serif text-[20px] italic text-white/80 leading-relaxed mb-6">
                &ldquo;My job is to make the hardest sale you&apos;ll ever make feel as light as possible.&rdquo;
              </p>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-gold-500">— Mark Ghossein</p>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="bg-ink-950 py-24">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12">
          <RevealWrapper>
            <div className="mb-14">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gold-500 mb-4">
                The Process
              </p>
              <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-normal text-white leading-tight">
                A Clear Path Through Probate
              </h2>
            </div>
          </RevealWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05]">
            {steps.map((step, i) => (
              <RevealWrapper key={step.num} delay={i * 60} className="h-full">
                <div className="bg-ink-950 p-10 h-full group hover:bg-ink-900 transition-colors duration-300">
                  <p className="font-serif text-[42px] text-white/[0.06] leading-none mb-6 group-hover:text-gold-500/20 transition-colors duration-300">
                    {step.num}
                  </p>
                  <h3 className="text-[13px] font-semibold tracking-[0.1em] uppercase text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-white/40 leading-relaxed">{step.body}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-ink-900 py-24">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12">
          <RevealWrapper>
            <div className="mb-14">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gold-500 mb-4">
                Common Questions
              </p>
              <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-normal text-white leading-tight">
                Probate FAQ
              </h2>
            </div>
          </RevealWrapper>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/[0.05]">
            {faqs.map((faq, i) => (
              <RevealWrapper key={faq.q} delay={i * 80} className="h-full">
                <div className="bg-ink-900 p-10 h-full">
                  <p className="text-[13px] font-semibold text-white mb-3 leading-snug">{faq.q}</p>
                  <p className="text-[13px] text-white/40 leading-relaxed">{faq.a}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gold-500 py-20">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-normal text-ink-950 leading-tight">
              Need help with an estate property?
            </h2>
            <p className="text-ink-950/60 text-[14px] mt-2">
              Reach out for a private, no-obligation conversation.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <Link
              href="/#contact"
              className="inline-flex items-center px-8 py-4 bg-ink-950 text-white text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-ink-800 transition-colors duration-300"
            >
              Book a Consultation
            </Link>
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 border border-ink-950/30 text-ink-950 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-ink-950/10 transition-colors duration-300"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
