import { ImageResponse } from 'next/og'

export const runtime     = 'edge'
export const alt         = 'Mark Ghossein Real Estate Advisors — Ottawa'
export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#090909',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px 88px',
          position: 'relative',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Subtle grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
        }} />

        {/* Gold accent line */}
        <div style={{ width: 52, height: 2, background: '#c9a96e', marginBottom: 28 }} />

        {/* Eyebrow */}
        <p style={{ fontSize: 14, color: '#c9a96e', letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 28, fontFamily: 'sans-serif', fontWeight: 500 }}>
          Ottawa Real Estate · Make the Right Move
        </p>

        {/* Name */}
        <p style={{ fontSize: 76, color: '#ffffff', fontWeight: 400, lineHeight: 1, marginBottom: 10 }}>
          Mark Ghossein
        </p>

        {/* Subtitle italic */}
        <p style={{ fontSize: 44, color: '#c9a96e', fontStyle: 'italic', fontWeight: 400, marginBottom: 44, lineHeight: 1 }}>
          Real Estate Advisors
        </p>

        {/* Tagline */}
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.35)', fontFamily: 'sans-serif', fontWeight: 300, letterSpacing: '0.04em' }}>
          Buying · Selling · Upsizing · eXp Realty · Ottawa, Ontario
        </p>

        {/* MG badge */}
        <div style={{
          position: 'absolute',
          right: 88,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 130,
          height: 130,
          background: '#c9a96e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 44,
          color: '#090909',
          fontWeight: 600,
          letterSpacing: '0.08em',
        }}>
          MG
        </div>

        {/* Bottom border */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: '#c9a96e' }} />
      </div>
    ),
    { ...size },
  )
}
