import { createAdminClient } from '@/lib/supabase/admin'
import type { Song, Banner } from '@/lib/types'

import Nav            from '@/components/landing/Nav'
import BannerStrip    from '@/components/landing/BannerStrip'
import Hero           from '@/components/landing/Hero'
import OccasionsStrip from '@/components/landing/OccasionsStrip'
import HowItWorks     from '@/components/landing/HowItWorks'
import SongShowcase   from '@/components/landing/SongShowcase'
import Pricing        from '@/components/landing/Pricing'
import Testimonials   from '@/components/landing/Testimonials'
import FAQ            from '@/components/landing/FAQ'
import OrderForm      from '@/components/landing/OrderForm'
import Footer         from '@/components/landing/Footer'

// Revalidate every 60 seconds — songs/banners update infrequently
export const revalidate = 60

async function getSongs(): Promise<Song[]> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('songs')
      .select('id, title_lv, title_en, youtube_id, style, badge_lv, badge_en, poem_en, poem_lv')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[page] songs fetch error:', error.message)
      return []
    }
    return data ?? []
  } catch (err) {
    console.error('[page] songs fetch exception:', err)
    return []
  }
}

async function getActiveBanners(): Promise<Banner[]> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[page] banners fetch error:', error.message)
      return []
    }
    return data ?? []
  } catch (err) {
    console.error('[page] banners fetch exception:', err)
    return []
  }
}

export default async function HomePage() {
  // Fetch in parallel
  const [songs, banners] = await Promise.all([getSongs(), getActiveBanners()])

  return (
    <main>
      <Nav />
      <BannerStrip banners={banners} />
      <Hero />
      <OccasionsStrip />
      <HowItWorks />
      <SongShowcase songs={songs} />
      <Pricing />
      <Testimonials />
      <FAQ />
      <OrderForm />
      <Footer />
    </main>
  )
}
