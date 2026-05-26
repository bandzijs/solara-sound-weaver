import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

const BARS = [
  { h: 12, color: '#1591DC' },
  { h: 20, color: '#4BB8FA' },
  { h: 15, color: '#1591DC' },
  { h: 24, color: '#4BB8FA' },
  { h: 14, color: '#1591DC' },
]

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: '#0a0a1a',
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        borderRadius: 6,
      }}
    >
      {BARS.map(({ h, color }, i) => (
        <div
          key={i}
          style={{
            width: 3,
            height: h,
            background: color,
            borderRadius: 2,
          }}
        />
      ))}
    </div>,
    { width: 32, height: 32 }
  )
}
