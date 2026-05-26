import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

type Params = { params: Promise<{ id: string }> }

// ── PUT /api/banners/[id] — admin only ───────────────────────────────────────
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

  const { image_url, link_url, is_active } = body

  const updatePayload: Record<string, unknown> = {}
  if (image_url !== undefined) updatePayload.image_url = image_url?.trim()
  if (link_url !== undefined) updatePayload.link_url = link_url?.trim()
  if (is_active !== undefined) updatePayload.is_active = Boolean(is_active)

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('banners')
    .update(updatePayload)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// ── DELETE /api/banners/[id] — admin only ────────────────────────────────────
export async function DELETE(_request: NextRequest, { params }: Params) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const admin = createAdminClient()
  const { error } = await admin.from('banners').delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
