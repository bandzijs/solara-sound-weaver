import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { resend, SENDER_EMAIL } from '@/lib/resend'
import { OrderConfirmationEmail } from '@/lib/email-templates/order-confirmation'
import { render } from '@react-email/render'

function deliveryDate(): string {
  const d = new Date()
  d.setHours(d.getHours() + 48)
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

export async function POST(request: Request) {
  let body: { name?: string; email?: string; poem_text?: string; mood?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, email, poem_text, mood } = body
  if (!name?.trim() || !email?.trim() || !poem_text?.trim() || !mood?.trim()) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 422 })
  }

  const supabase = createAdminClient()
  const { error: dbError } = await supabase
    .from('submissions')
    .insert([{ name: name.trim(), email: email.trim(), poem_text: poem_text.trim(), mood: mood.trim() }])

  if (dbError) {
    console.error('[orders] Supabase insert error:', dbError)
    return NextResponse.json({ error: 'Failed to save order. Please try again.' }, { status: 500 })
  }

  const estDelivery = deliveryDate()

  try {
    const html = await render(
      OrderConfirmationEmail({
        customerName: name.trim(),
        mood: mood.trim(),
        deliveryDate: estDelivery,
        replyTo: SENDER_EMAIL,
      })
    )
    await resend.emails.send({
      from: `Solara Flames <${SENDER_EMAIL}>`,
      to: email.trim(),
      subject: 'Your song order is confirmed',
      html,
      replyTo: SENDER_EMAIL,
    })
  } catch (emailErr) {
    console.error('[orders] Resend error (non-fatal):', emailErr)
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `New song order!\nName: ${name.trim()}\nEmail: ${email.trim()}\nMood: ${mood.trim()}\nPoem:\n${poem_text.trim().slice(0, 500)}`,
        }),
      })
    } catch (discordErr) {
      console.error('[orders] Discord webhook error (non-fatal):', discordErr)
    }
  }

  return NextResponse.json({ ok: true, deliveryDate: estDelivery })
}
