import { RevealWrapper } from './RevealWrapper'

export function Manifesto() {
  return (
    <section className="relative py-40 bg-ink-950 overflow-hidden">
      {/* Oversized ghost label */}
      <p
        aria-hidden="true"
        className="absolute top-1/2 -translate-y-1/2 left-0 right-0 text-center font-serif font-normal select-none pointer-events-none"
        style={{
          fontSize: 'clamp(100px, 18vw, 240px)',
          color: 'rgba(255,255,255,0.025)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        Advisors
      </p>

      <div className="relative z-10 max-w-[1320px] mx-auto px-8 md:px-12">
        <RevealWrapper>
          <h2
            className="font-serif font-normal text-white leading-[1.08] tracking-tight"
            style={{ fontSize: 'clamp(36px, 5.5vw, 80px)' }}
          >
            Your home is the single<br />
            largest investment{' '}
            <em className="italic text-gold-500">you'll</em><br />
            ever make.
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={120}>
          <p
            className="font-serif font-normal text-white/40 leading-[1.08] tracking-tight mt-6"
            style={{ fontSize: 'clamp(36px, 5.5vw, 80px)' }}
          >
            It deserves more than{' '}
            <em className="italic text-gold-500/60">a sign</em><br />
            on the lawn.
          </p>
        </RevealWrapper>

        <RevealWrapper delay={240}>
          <div className="flex items-center gap-6 mt-16">
            <div className="w-12 h-px bg-gold-500" />
            <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-white/25">
              Mark Ghossein · Real Estate Advisor · Ontario
            </p>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
