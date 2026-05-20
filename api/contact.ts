import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, text, mood } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  try {
    await resend.emails.send({
      from: "Solara <onboarding@resend.dev>",
      to: process.env.OWNER_EMAIL!,
      subject: `New submission from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${text ? `<p><strong>Text:</strong></p><p style="white-space:pre-wrap">${text}</p>` : ""}
        ${mood ? `<p><strong>Mood:</strong> ${mood}</p>` : ""}
      `,
    });

    await resend.emails.send({
      from: "Solara <onboarding@resend.dev>",
      to: email,
      subject: "We received your message",
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for reaching out. We've received your details and will be in touch soon.</p>
        <p>— The Solara Team</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return res.status(500).json({ error: "Failed to send email." });
  }
}
