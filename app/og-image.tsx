import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'TIMEOUT Travel Agency - Hotel Booking System'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Decorative Grid */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            background: 'linear-gradient(#C9A56B 1px, transparent 1px) 0 0 / 50px 50px, linear-gradient(90deg, #C9A56B 1px, transparent 1px) 0 0 / 50px 50px',
          }}
        />

        {/* Compass Icon */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: '50px',
            right: '50px',
            opacity: 0.2,
          }}
        >
          <svg width="200" height="200" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="26" stroke="#C9A56B" strokeWidth="2" fill="none"/>
            <circle cx="32" cy="32" r="20" stroke="#C9A56B" strokeWidth="1" fill="none" opacity="0.5"/>
            <path d="M32 8 L32 14" stroke="#C9A56B" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M32 12 L36 32 L32 52 L28 32 Z" fill="#C9A56B" opacity="0.9"/>
            <circle cx="32" cy="32" r="3" fill="#C9A56B"/>
          </svg>
        </div>

        {/* Logo/Brand */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              fontSize: '100px',
              fontWeight: 'bold',
              color: '#C9A56B',
              fontFamily: 'serif',
              letterSpacing: '0.1em',
              marginBottom: '20px',
            }}
          >
            TIMEOUT
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#D1D5DB',
              fontFamily: 'sans-serif',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Travel Agency
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '36px',
            color: '#F3F4F6',
            fontFamily: 'serif',
            fontStyle: 'italic',
            textAlign: 'center',
            marginTop: '20px',
          }}
        >
          adventure time is today
        </div>

        {/* Bottom text */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '24px',
            color: '#9CA3AF',
            fontFamily: 'sans-serif',
          }}
        >
          Hotel Booking System • Luxury • Comfort
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
