'use client'

import { useState } from 'react'
import type { Song } from '@/lib/types'
import SongModal from './SongModal'

const STYLE_LABELS: Record<string, string> = {
  'love-ballad': 'Love Ballad',
  'rock-ballad': 'Rock Ballad',
  'club-remix':  'Club Remix',
  'dance':       'Dance',
  'folk-rock':   'Folk Rock',
}

interface Props {
  initialSongs: Song[]
}

export default function SongsClient({ initialSongs }: Props) {
  const [songs, setSongs] = useState<Song[]>(initialSongs)
  const [modalSong, setModalSong] = useState<Song | 'new' | null>(null)

  function handleSaved(song: Song, isNew: boolean) {
    setSongs((prev) =>
      isNew ? [song, ...prev] : prev.map((s) => (s.id === song.id ? song : s))
    )
    setModalSong(null)
  }

  function handleDeleted(id: string) {
    setSongs((prev) => prev.filter((s) => s.id !== id))
    setModalSong(null)
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setModalSong('new')}
          className="bg-k2 hover:bg-k1 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-150 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add song
        </button>
      </div>

      {songs.length === 0 ? (
        <div className="text-center py-20 text-white/30">No songs yet.</div>
      ) : (
        <div className="bg-navy3 border border-k1/20 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-k1/20">
                <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">Thumbnail</th>
                <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">Title</th>
                <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">Style</th>
                <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">YouTube ID</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {songs.map((song, idx) => (
                <tr
                  key={song.id}
                  className={`hover:bg-k1/5 transition-colors ${idx !== songs.length - 1 ? 'border-b border-k1/10' : ''}`}
                >
                  <td className="px-5 py-3">
                    <img
                      src={`https://img.youtube.com/vi/${song.youtube_id}/default.jpg`}
                      alt={song.title_en}
                      className="w-16 h-10 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-white font-medium">{song.title_en}</p>
                    <p className="text-white/40 text-xs mt-0.5">{song.title_lv}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-k2/15 text-k3 border border-k3/25">
                      {STYLE_LABELS[song.style] ?? song.style}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-white/50 font-mono text-xs">{song.youtube_id}</td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => setModalSong(song)}
                      className="text-k3 hover:text-white text-xs font-medium transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalSong !== null && (
        <SongModal
          song={modalSong === 'new' ? null : modalSong}
          onSaved={handleSaved}
          onDeleted={handleDeleted}
          onClose={() => setModalSong(null)}
        />
      )}
    </>
  )
}
