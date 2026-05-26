import { createAdminClient } from '@/lib/supabase/admin'
import SongsClient from './SongsClient'
import type { Song } from '@/lib/types'

export const revalidate = 0

export default async function AdminSongsPage() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false })

  const songs: Song[] = error ? [] : (data ?? [])

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-syne font-bold text-white text-2xl">Songs</h1>
          <p className="text-white/40 text-sm mt-1">{songs.length} total</p>
        </div>
      </div>
      <SongsClient initialSongs={songs} />
    </div>
  )
}
