import type { Metadata } from 'next'
import {
  Fraunces,
  Cormorant_Garamond,
  Playfair_Display,
  DM_Serif_Display,
  Marcellus,
  Space_Grotesk,
  Hedvig_Letters_Serif,
  Bodoni_Moda,
  Archivo,
  Albert_Sans,
  Hanken_Grotesk,
  Jost,
  Inter,
  DM_Sans,
  Work_Sans,
} from 'next/font/google'

export const metadata: Metadata = {
  title: 'Style Explorer',
  robots: { index: false, follow: false },
}

/* ── Fonts (each gets its own CSS variable) ───────────────────────────────── */
const fraunces   = Fraunces({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--f-fraunces' })
const cormorant  = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--f-cormorant' })
const playfair   = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--f-playfair' })
const dmSerif    = DM_Serif_Display({ subsets: ['latin'], weight: ['400'], variable: '--f-dmserif' })
const marcellus  = Marcellus({ subsets: ['latin'], weight: ['400'], variable: '--f-marcellus' })
const spaceGro   = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--f-space' })
const hedvig     = Hedvig_Letters_Serif({ subsets: ['latin'], weight: ['400'], variable: '--f-hedvig' })

const bodoni   = Bodoni_Moda({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--f-bodoni' })
const archivo  = Archivo({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--f-archivo' })
const albert   = Albert_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--f-albert' })
const hanken   = Hanken_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--f-hanken' })
const jost     = Jost({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--f-jost' })

const inter    = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--f-inter' })
const dmSans   = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--f-dmsans' })
const workSans = Work_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--f-work' })

const fontVars = [
  fraunces, cormorant, playfair, dmSerif, marcellus, spaceGro, hedvig,
  bodoni, archivo, albert, hanken, jost,
  inter, dmSans, workSans,
].map((f) => f.variable).join(' ')

/* ── Theme definitions ────────────────────────────────────────────────────── */
type Theme = {
  name: string
  vibe: string
  bg: string
  surface: string
  text: string
  muted: string
  accent: string
  accentText: string
  displayFamily: string
  bodyFamily: string
  displayName: string
  bodyName: string
}

const themes: Theme[] = [
  {
    name: 'Onyx & Gold',
    vibe: 'Current site — dark, quiet luxury',
    bg: '#0f0f0f', surface: '#171717', text: '#f4f4f4', muted: '#9a9a9a',
    accent: '#c9a96e', accentText: '#0f0f0f',
    displayFamily: 'var(--f-hedvig)', bodyFamily: 'var(--f-inter)',
    displayName: 'Hedvig Letters Serif', bodyName: 'Inter',
  },
  {
    name: 'Emerald & Champagne',
    vibe: 'Heritage estate, refined and warm',
    bg: '#0c1f18', surface: '#112a20', text: '#f2efe6', muted: '#9fb0a6',
    accent: '#d9c08a', accentText: '#0c1f18',
    displayFamily: 'var(--f-cormorant)', bodyFamily: 'var(--f-inter)',
    displayName: 'Cormorant Garamond', bodyName: 'Inter',
  },
  {
    name: 'Navy & Brass',
    vibe: 'Classic, trustworthy, banker-blue',
    bg: '#0b1626', surface: '#101f34', text: '#eef2f7', muted: '#93a3b8',
    accent: '#c9a253', accentText: '#0b1626',
    displayFamily: 'var(--f-fraunces)', bodyFamily: 'var(--f-inter)',
    displayName: 'Fraunces', bodyName: 'Inter',
  },
  {
    name: 'Charcoal & Terracotta',
    vibe: 'Modern, warm, architectural',
    bg: '#1a1614', surface: '#231d19', text: '#f4ede6', muted: '#a89a90',
    accent: '#c9663b', accentText: '#ffffff',
    displayFamily: 'var(--f-dmserif)', bodyFamily: 'var(--f-dmsans)',
    displayName: 'DM Serif Display', bodyName: 'DM Sans',
  },
  {
    name: 'Ivory & Sage',
    vibe: 'Bright, fresh, editorial (light theme)',
    bg: '#f3f1ea', surface: '#ffffff', text: '#232323', muted: '#6f6f6f',
    accent: '#5c7a63', accentText: '#ffffff',
    displayFamily: 'var(--f-marcellus)', bodyFamily: 'var(--f-work)',
    displayName: 'Marcellus', bodyName: 'Work Sans',
  },
  {
    name: 'Slate & Sky',
    vibe: 'Clean, contemporary, minimal',
    bg: '#14171c', surface: '#1c2027', text: '#eef1f5', muted: '#98a2b0',
    accent: '#6aa7d8', accentText: '#0b1220',
    displayFamily: 'var(--f-space)', bodyFamily: 'var(--f-inter)',
    displayName: 'Space Grotesk', bodyName: 'Inter',
  },
  {
    name: 'Bone & Ink',
    vibe: 'High-contrast luxury magazine (light theme)',
    bg: '#f4f1ea', surface: '#ffffff', text: '#141414', muted: '#6b6b6b',
    accent: '#9c7a3c', accentText: '#ffffff',
    displayFamily: 'var(--f-playfair)', bodyFamily: 'var(--f-inter)',
    displayName: 'Playfair Display', bodyName: 'Inter',
  },
]

/* ── Flagship / fashion-house directions ──────────────────────────────────── */
const flagshipThemes: Theme[] = [
  {
    name: 'Éditorial',
    vibe: 'Vogue — black-on-cream Didone, high fashion',
    bg: '#faf8f4', surface: '#ffffff', text: '#100f0d', muted: '#6e6a63',
    accent: '#141414', accentText: '#ffffff',
    displayFamily: 'var(--f-bodoni)', bodyFamily: 'var(--f-jost)',
    displayName: 'Bodoni Moda', bodyName: 'Jost',
  },
  {
    name: 'Noir Couture',
    vibe: 'Runway black, Didone headlines, one bold red',
    bg: '#0a0a0a', surface: '#141414', text: '#f4f1ea', muted: '#8f8a82',
    accent: '#d5352b', accentText: '#ffffff',
    displayFamily: 'var(--f-bodoni)', bodyFamily: 'var(--f-jost)',
    displayName: 'Bodoni Moda', bodyName: 'Jost',
  },
  {
    name: 'Precision',
    vibe: 'Audi — engineered grayscale with a red edge',
    bg: '#f1f1f2', surface: '#ffffff', text: '#19191b', muted: '#76777b',
    accent: '#e40521', accentText: '#ffffff',
    displayFamily: 'var(--f-archivo)', bodyFamily: 'var(--f-archivo)',
    displayName: 'Archivo', bodyName: 'Archivo',
  },
  {
    name: 'Cupertino',
    vibe: 'Apple — ultra-minimal, soft grays, one clean sans',
    bg: '#fbfbfd', surface: '#ffffff', text: '#1d1d1f', muted: '#86868b',
    accent: '#0071e3', accentText: '#ffffff',
    displayFamily: 'var(--f-albert)', bodyFamily: 'var(--f-albert)',
    displayName: 'Albert Sans', bodyName: 'Albert Sans',
  },
  {
    name: 'Anthracite',
    vibe: 'Mercedes — understated dark luxury, platinum accent',
    bg: '#101114', surface: '#17181c', text: '#eef0f3', muted: '#9aa0a8',
    accent: '#c3c7cf', accentText: '#101114',
    displayFamily: 'var(--f-hanken)', bodyFamily: 'var(--f-hanken)',
    displayName: 'Hanken Grotesk', bodyName: 'Hanken Grotesk',
  },
]

/* ── One theme mockup card ────────────────────────────────────────────────── */
function ThemeCard({ t }: { t: Theme }) {
  const swatches: { label: string; value: string }[] = [
    { label: 'Base', value: t.bg },
    { label: 'Surface', value: t.surface },
    { label: 'Text', value: t.text },
    { label: 'Accent', value: t.accent },
  ]

  return (
    <div className="border border-black/10 overflow-hidden" style={{ background: t.bg, color: t.text }}>
      {/* Mockup */}
      <div className="p-8 sm:p-10">
        <p
          className="text-[10px] font-semibold uppercase mb-6"
          style={{ color: t.accent, fontFamily: t.bodyFamily, letterSpacing: '0.28em' }}
        >
          Ottawa Real Estate
        </p>

        <h3
          className="mb-5"
          style={{ fontFamily: t.displayFamily, fontSize: 'clamp(30px,3.4vw,46px)', lineHeight: 1.02, letterSpacing: '-0.01em' }}
        >
          Make the <span style={{ color: t.accent }}>Right Move.</span>
        </h3>

        <p
          className="text-[14px] mb-6 max-w-[42ch]"
          style={{ color: t.muted, fontFamily: t.bodyFamily, lineHeight: 1.75, fontWeight: 300 }}
        >
          Whether you&apos;re buying, selling, or upsizing, I help Ottawa families make
          confident, well-advised moves in any market.
        </p>

        {/* Sample listing line — numerals */}
        <div className="flex items-baseline gap-3 mb-8" style={{ borderTop: `1px solid ${t.accent}33`, paddingTop: '1rem' }}>
          <span style={{ fontFamily: t.displayFamily, fontSize: '26px' }}>$1,450,000</span>
          <span className="text-[11px] uppercase" style={{ color: t.muted, fontFamily: t.bodyFamily, letterSpacing: '0.14em' }}>
            42 Oakridge Cres · Westboro
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <span
            className="inline-flex items-center px-6 py-3.5 text-[11px] font-semibold uppercase"
            style={{ background: t.accent, color: t.accentText, fontFamily: t.bodyFamily, letterSpacing: '0.14em' }}
          >
            Book a Consultation
          </span>
          <span
            className="inline-flex items-center px-6 py-3.5 text-[11px] font-semibold uppercase"
            style={{ border: `1px solid ${t.accent}`, color: t.accent, fontFamily: t.bodyFamily, letterSpacing: '0.14em' }}
          >
            View Listings
          </span>
        </div>
      </div>

      {/* Meta bar: palette + fonts */}
      <div className="px-8 sm:px-10 py-6" style={{ background: t.surface, borderTop: `1px solid ${t.accent}22` }}>
        <div className="flex items-center gap-3 mb-5">
          {swatches.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1.5">
              <span className="block w-10 h-10 rounded-sm border border-white/10" style={{ background: s.value }} />
              <span className="text-[9px] uppercase tracking-wider" style={{ color: t.muted, fontFamily: t.bodyFamily }}>
                {s.value}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-1 text-[11px]" style={{ fontFamily: t.bodyFamily, color: t.muted }}>
          <span>Headings — <span style={{ color: t.text }}>{t.displayName}</span></span>
          <span>Body — <span style={{ color: t.text }}>{t.bodyName}</span></span>
        </div>
      </div>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function StylesPage() {
  return (
    <main className={`${fontVars} min-h-screen bg-[#0a0a0a] text-white`}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-20">
        {/* Header */}
        <div className="mb-16 max-w-[720px]">
          <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/40 mb-5" style={{ fontFamily: 'var(--f-inter)' }}>
            Mark Ghossein · Design Directions
          </p>
          <h1 className="text-[clamp(34px,5vw,60px)] leading-[1.02] tracking-tight mb-6" style={{ fontFamily: 'var(--f-fraunces)' }}>
            Font &amp; colour options
          </h1>
          <p className="text-[15px] text-white/55 leading-[1.85]" style={{ fontFamily: 'var(--f-inter)' }}>
            Each card below is the same content styled in a different palette and typeface pairing,
            so you can see how the brand feels in context. The first one, <em>Onyx &amp; Gold</em>, is the
            current live site. Pick whichever direction you like (or mix a palette from one with fonts
            from another) and I&apos;ll roll it across the whole site.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {themes.map((t) => (
            <ThemeCard key={t.name} t={t} />
          ))}
        </div>

        {/* Flagship / fashion-house set */}
        <div className="mt-24 mb-10 max-w-[720px]">
          <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/40 mb-4" style={{ fontFamily: 'var(--f-inter)' }}>
            Editorial &amp; flagship-brand directions
          </p>
          <h2 className="text-[clamp(26px,3.6vw,40px)] leading-[1.05] tracking-tight mb-4" style={{ fontFamily: 'var(--f-bodoni)' }}>
            The fashion-house tier
          </h2>
          <p className="text-[14px] text-white/50 leading-[1.8]" style={{ fontFamily: 'var(--f-inter)' }}>
            Inspired by the design languages of Vogue, Audi, Apple, and Mercedes — pared back,
            confident, and unmistakably premium. These lean harder into whitespace and a single
            hero typeface than the palettes above.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {flagshipThemes.map((t) => (
            <ThemeCard key={t.name} t={t} />
          ))}
        </div>

        <p className="mt-16 text-[13px] text-white/35 leading-relaxed max-w-[640px]" style={{ fontFamily: 'var(--f-inter)' }}>
          Note: these are quick previews of type and colour only. Applying a direction site-wide also
          carries the same imagery, spacing, and layout you already have. Tell me the number or name
          and I&apos;ll implement it.
        </p>
      </div>
    </main>
  )
}
