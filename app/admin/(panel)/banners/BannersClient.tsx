'use client'

import { useState } from 'react'
import type { Banner } from '@/lib/types'
import BannerModal from './BannerModal'
import { createClient } from '@/lib/supabase/client'

interface Props {
  initialBanners: Banner[]
}

export default function BannersClient({ initialBanners }: Props) {
  const [banners, setBanners] = useState<Banner[]>(initialBanners)
  const [modalBanner, setModalBanner] = useState<Banner | 'new' | null>(null)
  const [toggling, setToggling] = useState<string | null>(null)

  function handleSaved(banner: Banner, isNew: boolean) {
    setBanners((prev) =>
      isNew ? [banner, ...prev] : prev.map((b) => (b.id === banner.id ? banner : b))
    )
    setModalBanner(null)
  }

  function handleDeleted(id: string) {
    setBanners((prev) => prev.filter((b) => b.id !== id))
    setModalBanner(null)
  }

  async function handleToggle(banner: Banner) {
    setToggling(banner.id)
    const supabase = createClient()
    const { data, error } = await supabase
      .from('banners')
      .update({ is_active: !banner.is_active })
      .eq('id', banner.id)
      .select()
      .single()
    if (!error && data) {
      setBanners((prev) => prev.map((b) => (b.id === banner.id ? (data as Banner) : b)))
    }
    setToggling(null)
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setModalBanner('new')}
          className="bg-k2 hover:bg-k1 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-150 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add banner
        </button>
      </div>

      {banners.length === 0 ? (
        <div className="text-center py-20 text-white/30">No banners yet.</div>
      ) : (
        <div className="bg-navy3 border border-k1/20 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-k1/20">
                <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">Image</th>
                <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">Link URL</th>
                <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {banners.map((banner, idx) => (
                <tr
                  key={banner.id}
                  className={`hover:bg-k1/5 transition-colors ${idx !== banners.length - 1 ? 'border-b border-k1/10' : ''}`}
                >
                  <td className="px-5 py-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={banner.image_url}
                      alt=""
                      className="w-24 h-14 object-cover rounded-lg bg-navy"
                    />
                  </td>
                  <td className="px-5 py-3 text-white/50 text-xs font-mono max-w-xs truncate">
                    {banner.link_url || <span className="text-white/25 italic">No link</span>}
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => handleToggle(banner)}
                      disabled={toggling === banner.id}
                      className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-150 disabled:opacity-50 ${
                        banner.is_active
                          ? 'bg-green-500/15 text-green-400 border-green-500/30 hover:bg-green-500/25'
                          : 'bg-white/5 text-white/40 border-white/15 hover:bg-white/10'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${banner.is_active ? 'bg-green-400' : 'bg-white/30'}`} />
                      {toggling === banner.id ? '…' : banner.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => setModalBanner(banner)}
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

      {modalBanner !== null && (
        <BannerModal
          banner={modalBanner === 'new' ? null : modalBanner}
          onSaved={handleSaved}
          onDeleted={handleDeleted}
          onClose={() => setModalBanner(null)}
        />
      )}
    </>
  )
}
