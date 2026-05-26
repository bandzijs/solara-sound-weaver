import { createAdminClient } from '@/lib/supabase/admin'
import BannersClient from './BannersClient'
import type { Banner } from '@/lib/types'

export const revalidate = 0

export default async function AdminBannersPage() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .order('created_at', { ascending: false })

  const banners: Banner[] = error ? [] : (data ?? [])

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-syne font-bold text-white text-2xl">Banners</h1>
          <p className="text-white/40 text-sm mt-1">{banners.length} total</p>
        </div>
      </div>
      <BannersClient initialBanners={banners} />
    </div>
  )
}
