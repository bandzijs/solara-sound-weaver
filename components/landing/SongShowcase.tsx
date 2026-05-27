'use client'

import { useState } from 'react'
import type { Song } from '@/lib/types'

const PAGE_SIZE = 8

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
  const [page, setPage]           = useState(1)
  const [playingId, setPlayingId] = useState<string | null>(null)

  const totalPages = Math.ceil(songs.length / PAGE_SIZE)
  const pageSongs  = songs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function goTo(p: number) {
    setPage(p)
    setPlayingId(null)
    document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="showcase" className="bg-navy2 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-k3 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            <span x-show="$store.lang.current === 'en'" x-cloak="">Real songs, real stories</span>
            <span x-show="$store.lang.current === 'lv'" x-cloak="">Īstas dziesmas, īsti stāsti</span>
          </p>
          <h2 className="font-syne font-bold text-white text-3xl sm:text-4xl mb-4">
            <span x-show="$store.lang.current === 'en'" x-cloak="">Hear what we&apos;ve made</span>
            <span x-show="$store.lang.current === 'lv'" x-cloak="">Klausies, ko esam radījuši</span>
          </h2>
          <p className="text-white/45 text-base max-w-xl mx-auto">
            <span x-show="$store.lang.current === 'en'" x-cloak="">
              Every song below was created from someone&apos;s words — a birthday message,
              a wedding vow, a memory. Click any card to listen.
            </span>
            <span x-show="$store.lang.current === 'lv'" x-cloak="">
              Katra zemāk esošā dziesma ir radīta no kāda vārdiem — dzimšanas dienas vēstījuma,
              kāzu solījuma, atmiņas. Noklikšķini uz jebkuras kartes, lai klausītos.
            </span>
          </p>
        </div>

        {songs.length === 0 ? (
          <p className="text-center text-white/30 py-16">
            <span x-show="$store.lang.current === 'en'" x-cloak="">No songs yet — check back soon.</span>
            <span x-show="$store.lang.current === 'lv'" x-cloak="">Dziesmu vēl nav — atnāc drīzumā.</span>
          </p>
        ) : (
          <>
            {/* Song grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {pageSongs.map((song) => {
                const isPlaying = playingId === song.youtube_id
                return (
                  <div
                    key={song.id}
                    onClick={() => setPlayingId(song.youtube_id)}
                    className={`group text-left bg-navy3 border rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(21,145,220,0.12)] transition-all duration-300 cursor-pointer ${
                      isPlaying
                        ? 'border-k2 ring-2 ring-k2'
                        : 'border-k1/15 hover:border-k1/40'
                    }`}
                  >
                    {/* Thumbnail or iframe */}
                    <div className="relative w-full aspect-video bg-navy overflow-hidden">
                      {isPlaying ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${song.youtube_id}?autoplay=1`}
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          className="w-full aspect-video"
                        />
                      ) : (
                        <>
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
                        </>
                      )}
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
                  </div>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-3 mt-10">
                <div className="flex items-center gap-2">
                  {/* Prev */}
                  <button
                    onClick={() => goTo(page - 1)}
                    disabled={page === 1}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-k1/20 text-k3 hover:border-k3/50 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-150"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => goTo(p)}
                      className={`w-9 h-9 rounded-xl text-sm font-semibold border transition-all duration-150 ${
                        p === page
                          ? 'bg-k2 border-k2 text-white shadow-[0_0_12px_rgba(21,145,220,0.5)]'
                          : 'border-k1/20 text-k3 hover:border-k3/50'
                      }`}
                    >
                      {p}
                    </button>
                  ))}

                  {/* Next */}
                  <button
                    onClick={() => goTo(page + 1)}
                    disabled={page === totalPages}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-k1/20 text-k3 hover:border-k3/50 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-150"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <p className="text-white/25 text-xs">
                  Page {page} of {totalPages}
                </p>
              </div>
            )}

            {/* Browse all link */}
            <div className="text-center mt-10">
              <a
                href="https://www.youtube.com/channel/UC6AqtJ20Juy5xH6YdfNGuhw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-k3 hover:text-white text-sm font-medium border border-k3/30 hover:border-k3/60 px-6 py-2.5 rounded-full transition-all duration-200"
              >
                <span x-show="$store.lang.current === 'en'" x-cloak="">Browse all songs →</span>
                <span x-show="$store.lang.current === 'lv'" x-cloak="">Skatīt visas dziesmas →</span>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
