'use client'

import { useState } from 'react'
import type { Banner } from '@/lib/types'
import { createClient } from '@/lib/supabase/client'

interface Props {
  banner: Banner | null
  onSaved: (banner: Banner, isNew: boolean) => void
  onDeleted: (id: string) => void
  onClose: () => void
}

export default function BannerModal({ banner, onSaved, onDeleted, onClose }: Props) {
  const isNew = banner === null
  const [form, setForm] = useState({
    image_url: banner?.image_url ?? '',
    link_url:  banner?.link_url  ?? '',
    is_active: banner?.is_active ?? true,
  })
  const [saving, setSaving]     = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError]       = useState('')

  async function handleSave() {
    if (!form.image_url.trim()) {
      setError('Image URL is required.')
      return
    }
    setSaving(true)
    setError('')
    const supabase = createClient()
    if (isNew) {
      const { data, error: err } = await supabase.from('banners').insert([form]).select().single()
      if (err || !data) { setError(err?.message ?? 'Insert failed'); setSaving(false); return }
      onSaved(data as Banner, true)
    } else {
      const { data, error: err } = await supabase.from('banners').update(form).eq('id', banner.id).select().single()
      if (err || !data) { setError(err?.message ?? 'Update failed'); setSaving(false); return }
      onSaved(data as Banner, false)
    }
  }

  async function handleDelete() {
    if (!banner) return
    if (!confirm('Delete this banner? This cannot be undone.')) return
    setDeleting(true)
    const supabase = createClient()
    const { error: err } = await supabase.from('banners').delete().eq('id', banner.id)
    if (err) { setError(err.message); setDeleting(false); return }
    onDeleted(banner.id)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-navy3 border border-k1/25 rounded-2xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-k1/20">
          <h2 className="font-syne font-bold text-white text-lg">{isNew ? 'Add banner' : 'Edit banner'}</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Preview */}
          {form.image_url && (
            <div className="w-full h-32 rounded-xl overflow-hidden bg-navy">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.image_url} alt="" className="w-full h-full object-cover" />
            </div>
          )}

          <div>
            <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-2">Image URL</label>
            <input
              type="url"
              value={form.image_url}
              onChange={(e) => setForm((p) => ({ ...p, image_url: e.target.value }))}
              placeholder="https://…"
              className="w-full bg-navy2 border border-k1/20 focus:border-k2 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 outline-none transition-colors duration-150"
            />
          </div>

          <div>
            <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-2">Link URL <span className="normal-case text-white/30">(optional)</span></label>
            <input
              type="url"
              value={form.link_url}
              onChange={(e) => setForm((p) => ({ ...p, link_url: e.target.value }))}
              placeholder="https://…"
              className="w-full bg-navy2 border border-k1/20 focus:border-k2 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 outline-none transition-colors duration-150"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-navy2 border border-k1/30 rounded-full peer-checked:bg-k2 transition-colors duration-150" />
              <div className="absolute top-1 left-1 w-4 h-4 bg-white/40 rounded-full peer-checked:translate-x-4 peer-checked:bg-white transition-all duration-150" />
            </div>
            <span className="text-white/60 text-sm group-hover:text-white/80 transition-colors">Active (show on site)</span>
          </label>

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
              {deleting ? 'Deleting…' : 'Delete banner'}
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
              {saving ? 'Saving…' : isNew ? 'Add banner' : 'Save changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
