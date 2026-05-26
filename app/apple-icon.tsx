import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

const BARS = [
  { h: 68,  color: '#1591DC' },
  { h: 112, color: '#4BB8FA' },
  { h: 84,  color: '#1591DC' },
  { h: 135, color: '#4BB8FA' },
  { h: 79,  color: '#1591DC' },
]

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        background: '#0a0a1a',
        width: 180,
        height: 180,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        borderRadius: 40,
      }}
    >
      {BARS.map(({ h, color }, i) => (
        <div
          key={i}
          style={{
            width: 18,
            height: h,
            background: color,
            borderRadius: 9,
          }}
        />
      ))}
    </div>,
    { width: 180, height: 180 }
  )
}
