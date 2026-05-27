'use client'

import { useState } from 'react'
import type { Song } from '@/lib/types'
import { createClient } from '@/lib/supabase/client'

const STYLES = [
  { value: 'love-ballad', label: 'Love Ballad' },
  { value: 'rock-ballad', label: 'Rock Ballad' },
  { value: 'club-remix',  label: 'Club Remix' },
  { value: 'dance',       label: 'Dance' },
  { value: 'folk-rock',   label: 'Folk Rock' },
]

interface Props {
  song: Song | null
  onSaved: (song: Song, isNew: boolean) => void
  onDeleted: (id: string) => void
  onClose: () => void
}

export default function SongModal({ song, onSaved, onDeleted, onClose }: Props) {
  const isNew = song === null
  const [form, setForm] = useState({
    title_en:   song?.title_en   ?? '',
    title_lv:   song?.title_lv   ?? '',
    youtube_id: song?.youtube_id ?? '',
    style:      song?.style      ?? 'love-ballad',
    badge_en:   song?.badge_en   ?? '',
    badge_lv:   song?.badge_lv   ?? '',
    poem_en:    song?.poem_en    ?? '',
    poem_lv:    song?.poem_lv    ?? '',
  })
  const [saving, setSaving]   = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError]     = useState('')

  function set(field: keyof typeof form, value: string) {
    if (field === 'youtube_id') {
      // Extract ID from full YouTube URLs
      try {
        const url = new URL(value)
        if (url.hostname.includes('youtube.com')) value = url.searchParams.get('v') ?? value
        else if (url.hostname === 'youtu.be') value = url.pathname.slice(1)
      } catch { /* not a URL, use as-is */ }
    }
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSave() {
    if (!form.title_en.trim() || !form.youtube_id.trim()) {
      setError('Title (EN) and YouTube ID are required.')
      return
    }
    setSaving(true)
    setError('')
    const supabase = createClient()
    if (isNew) {
      const { data, error: err } = await supabase.from('songs').insert([form]).select().single()
      if (err || !data) { setError(err?.message ?? 'Insert failed'); setSaving(false); return }
      onSaved(data as Song, true)
    } else {
      const { data, error: err } = await supabase.from('songs').update(form).eq('id', song.id).select().single()
      if (err || !data) { setError(err?.message ?? 'Update failed'); setSaving(false); return }
      onSaved(data as Song, false)
    }
  }

  async function handleDelete() {
    if (!song) return
    if (!confirm(`Delete "${song.title_en}"? This cannot be undone.`)) return
    setDeleting(true)
    const supabase = createClient()
    const { error: err } = await supabase.from('songs').delete().eq('id', song.id)
    if (err) { setError(err.message); setDeleting(false); return }
    onDeleted(song.id)
  }

  const ytId = form.youtube_id.trim()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-navy3 border border-k1/25 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-k1/20">
          <h2 className="font-syne font-bold text-white text-lg">{isNew ? 'Add song' : 'Edit song'}</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* YouTube preview */}
          {ytId && (
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-navy">
              <iframe
                src={`https://www.youtube.com/embed/${ytId}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Field label="Title (EN)" value={form.title_en} onChange={(v) => set('title_en', v)} />
            <Field label="Title (LV)" value={form.title_lv} onChange={(v) => set('title_lv', v)} />
          </div>

          <Field label="YouTube ID" value={form.youtube_id} onChange={(v) => set('youtube_id', v)} placeholder="dQw4w9WgXcQ" />

          <div>
            <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-2">Style</label>
            <select
              value={form.style}
              onChange={(e) => set('style', e.target.value)}
              className="w-full bg-navy2 border border-k1/20 focus:border-k2 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors duration-150"
            >
              {STYLES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Badge (EN)" value={form.badge_en} onChange={(v) => set('badge_en', v)} placeholder="For a wedding anniversary" />
            <Field label="Badge (LV)" value={form.badge_lv} onChange={(v) => set('badge_lv', v)} placeholder="Kāzu jubilejai" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <TextareaField label="Poem (EN)" value={form.poem_en} onChange={(v) => set('poem_en', v)} placeholder="Enter poem lyrics in English…" />
            <TextareaField label="Poem (LV)" value={form.poem_lv} onChange={(v) => set('poem_lv', v)} placeholder="Ievadiet dziesmas tekstu latviski…" />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-300 text-sm">{error}</div>
          )}
        </div>

        <div className="flex items-center justify-between px-6 py-5 border-t border-k1/20">
          {!isNew ? (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors disabled:opacity-50"
            >
              {deleting ? 'Deleting…' : 'Delete song'}
            </button>
          ) : <span />}
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="text-white/50 hover:text-white text-sm font-medium transition-colors px-4 py-2">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-k2 hover:bg-k1 disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-150"
            >
              {saving ? 'Saving…' : isNew ? 'Add song' : 'Save changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string
}) {
  return (
    <div>
      <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-navy2 border border-k1/20 focus:border-k2 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 outline-none transition-colors duration-150"
      />
    </div>
  )
}

function TextareaField({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string
}) {
  return (
    <div>
      <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-2">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        className="w-full bg-navy2 border border-k1/20 focus:border-k2 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 outline-none transition-colors duration-150 resize-y"
      />
    </div>
  )
}
