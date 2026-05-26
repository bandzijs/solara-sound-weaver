import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

// Sender address — comes from OWNER_EMAIL in .env.local
export const SENDER_EMAIL = process.env.OWNER_EMAIL ?? 'hello@solaraflames.com'
