import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

type Params = { params: Promise<{ id: string }> }

// ── PUT /api/songs/[id] — admin only ─────────────────────────────────────────
export async function PUT(request: NextRequest, { params }: Params) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json().catch(() => null)

  if (!body) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { title_lv, title_en, youtube_id, style, badge_lv, badge_en } = body

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('songs')
    .update({
      title_lv: title_lv?.trim(),
      title_en: title_en?.trim(),
      youtube_id: youtube_id?.trim(),
      style: style?.trim(),
      badge_lv: badge_lv?.trim(),
      badge_en: badge_en?.trim(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// ── DELETE /api/songs/[id] — admin only ──────────────────────────────────────
export async function DELETE(_request: NextRequest, { params }: Params) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const admin = createAdminClient()
  const { error } = await admin.from('songs').delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
