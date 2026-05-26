import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

// ── GET /api/songs — public ───────────────────────────────────────────────────
export async function GET() {
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('songs')
    .select('id, title_lv, title_en, youtube_id, style, badge_lv, badge_en')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// ── POST /api/songs — admin only ──────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { title_lv, title_en, youtube_id, style, badge_lv, badge_en } = body

  if (!title_lv?.trim() || !title_en?.trim() || !youtube_id?.trim() || !style?.trim()) {
    return NextResponse.json(
      { error: 'title_lv, title_en, youtube_id, and style are required' },
      { status: 400 }
    )
  }

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('songs')
    .insert([{
      title_lv: title_lv.trim(),
      title_en: title_en.trim(),
      youtube_id: youtube_id.trim(),
      style: style.trim(),
      badge_lv: badge_lv?.trim() || 'Original song',
      badge_en: badge_en?.trim() || 'Original song',
    }])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
