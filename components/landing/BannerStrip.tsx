import type { Banner } from '@/lib/types'

interface BannerStripProps {
  banners: Banner[]
}

export default function BannerStrip({ banners }: BannerStripProps) {
  if (!banners.length) return null

  return (
    <div>
      {banners.map((banner) => (
        <div
          key={banner.id}
          className="relative bg-k1/20 border-b border-k1/30"
          {...{
            'x-data': '{ dismissed: false }',
            'x-show': '!dismissed',
            'x-cloak': '',
          }}
        >
          <a
            href={banner.link_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {banner.image_url.startsWith('http') ? (
              <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={banner.image_url}
                  alt="Promotion"
                  className="h-10 w-auto object-contain"
                />
              </div>
            ) : (
              <div className="max-w-7xl mx-auto px-4 py-2.5 text-center">
                <p className="text-sm text-k4 font-medium">{banner.image_url}</p>
              </div>
            )}
          </a>

          {/* Dismiss button */}
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors p-1"
            aria-label="Dismiss banner"
            {...{ 'x-on:click': 'dismissed = true; $event.stopPropagation()' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}
