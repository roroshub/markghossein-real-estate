import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#c9a96e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#090909',
          fontSize: 16,
          fontWeight: 700,
          fontFamily: 'Georgia, serif',
          letterSpacing: '0.02em',
        }}
      >
        MG
      </div>
    ),
    { ...size },
  )
}
