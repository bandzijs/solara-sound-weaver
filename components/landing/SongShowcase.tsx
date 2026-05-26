import type { Song } from '@/lib/types'

const STYLE_LABELS: Record<string, string> = {
  'love-ballad':  'Love Ballad',
  'rock-ballad':  'Rock Ballad',
  'club-remix':   'Club Remix',
  'dance':        'Dance',
  'folk-rock':    'Folk Rock',
}

interface SongShowcaseProps {
  songs: Song[]
}

export default function SongShowcase({ songs }: SongShowcaseProps) {
  return (
    <section id="showcase" className="bg-navy2 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-k3 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Real songs, real stories
          </p>
          <h2 className="font-syne font-bold text-white text-3xl sm:text-4xl mb-4">
            Hear what we&apos;ve made
          </h2>
          <p className="text-white/45 text-base max-w-xl mx-auto">
            Every song below was created from someone&apos;s words — a birthday message,
            a wedding vow, a memory. Click any card to listen on YouTube.
          </p>
        </div>

        {songs.length === 0 ? (
          <p className="text-center text-white/30 py-16">No songs yet — check back soon.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {songs.map((song) => (
                <a
                  key={song.id}
                  href={`https://www.youtube.com/watch?v=${song.youtube_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-left bg-navy3 border border-k1/15 rounded-2xl overflow-hidden hover:border-k1/40 hover:shadow-[0_0_30px_rgba(21,145,220,0.12)] transition-all duration-300 cursor-pointer block"
                >
                  {/* Thumbnail */}
                  <div className="relative w-full aspect-video bg-navy overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${song.youtube_id}/hqdefault.jpg`}
                      alt={song.title_en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full bg-k2/90 flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-syne font-semibold text-white text-sm leading-snug group-hover:text-k3 transition-colors">
                        {song.title_en}
                      </h3>
                      <span className="shrink-0 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-k2/15 text-k3 border border-k3/25 whitespace-nowrap">
                        {STYLE_LABELS[song.style] ?? song.style}
                      </span>
                    </div>
                    <p className="text-white/35 text-xs">{song.badge_en}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center mt-10">
              <a
                href="https://www.youtube.com/@SolaraFlames"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-k3 hover:text-white text-sm font-medium border border-k3/30 hover:border-k3/60 px-6 py-2.5 rounded-full transition-all duration-200"
              >
                Browse all songs →
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
