import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
} from '@react-email/components'

interface OrderConfirmationEmailProps {
  customerName: string
  mood: string
  deliveryDate: string
  replyTo: string
}

export function OrderConfirmationEmail({
  customerName,
  mood,
  deliveryDate,
  replyTo,
}: OrderConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Solara Flames song order is confirmed — ready by {deliveryDate}</Preview>
      <Body style={body}>
        <Container style={container}>

          {/* ── Logo / Wordmark ── */}
          <Section style={logoSection}>
            <table cellPadding={0} cellSpacing={0} style={{ margin: '0 auto' }}>
              <tbody>
                <tr>
                  {/* Waveform bars */}
                  {[18, 28, 22, 32, 20].map((h, i) => (
                    <td key={i} style={{ padding: '0 2px', verticalAlign: 'middle' }}>
                      <div
                        style={{
                          width: 4,
                          height: h,
                          borderRadius: 2,
                          background: i % 2 === 0 ? '#1591DC' : '#4BB8FA',
                          display: 'inline-block',
                        }}
                      />
                    </td>
                  ))}
                  <td style={{ paddingLeft: 10, verticalAlign: 'middle' }}>
                    <span style={logoText}>Solara Flames</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* ── Confirmed badge ── */}
          <Section style={{ textAlign: 'center', marginBottom: 8 }}>
            <span style={badge}>✓ Order Confirmed</span>
          </Section>

          {/* ── Heading ── */}
          <Heading style={heading}>Your song is on its way.</Heading>

          {/* ── Greeting ── */}
          <Text style={bodyText}>
            Hi <strong style={{ color: '#C4E2F5' }}>{customerName}</strong>,
          </Text>
          <Text style={bodyText}>
            We've received your order and our composers are already thinking about how to
            bring your words to life.
          </Text>

          {/* ── Order summary card ── */}
          <Section style={card}>
            <Text style={cardLabel}>OCCASION / MOOD</Text>
            <Text style={cardValue}>{mood}</Text>
            <Hr style={cardDivider} />
            <Text style={cardLabel}>ESTIMATED DELIVERY</Text>
            <Text style={cardValue}>{deliveryDate}</Text>
          </Section>

          {/* ── Payment note ── */}
          <Section style={highlightBox}>
            <Text style={{ ...bodyText, margin: 0, color: '#C4E2F5' }}>
              💳 We'll send you a <strong>secure payment link</strong> shortly at this
              email address. No payment is needed right now.
            </Text>
          </Section>

          <Text style={bodyText}>
            Once payment is complete, your song will be produced and delivered by{' '}
            <strong style={{ color: '#4BB8FA' }}>{deliveryDate}</strong> as an MP3 +
            WAV download.
          </Text>

          <Text style={bodyText}>
            Questions? Just reply to this email — we're here.
          </Text>

          {/* ── CTA ── */}
          <Section style={{ textAlign: 'center', margin: '32px 0' }}>
            <Link href={`mailto:${replyTo}`} style={ctaButton}>
              Reply to us
            </Link>
          </Section>

          <Hr style={divider} />

          {/* ── Footer ── */}
          <Text style={footer}>
            Solara Flames · Custom songs delivered in 48 hours
            <br />
            <Link href="https://solaraflames.com" style={footerLink}>
              solaraflames.com
            </Link>
            {' · '}
            <Link href={`mailto:${replyTo}`} style={footerLink}>
              {replyTo}
            </Link>
          </Text>
          <Text style={{ ...footer, marginTop: 8 }}>
            You're receiving this because you submitted an order on solaraflames.com.
          </Text>

        </Container>
      </Body>
    </Html>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  backgroundColor: '#0a0a1a',
  fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  margin: 0,
  padding: '40px 0',
}

const container: React.CSSProperties = {
  backgroundColor: '#0f0f2e',
  borderRadius: 12,
  border: '1px solid rgba(44, 94, 173, 0.3)',
  maxWidth: 560,
  margin: '0 auto',
  padding: '40px 48px',
}

const logoSection: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: 32,
}

const logoText: React.CSSProperties = {
  color: '#ffffff',
  fontSize: 20,
  fontWeight: 700,
  letterSpacing: '0.04em',
}

const badge: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: 'rgba(21, 145, 220, 0.15)',
  border: '1px solid rgba(75, 184, 250, 0.3)',
  borderRadius: 20,
  color: '#4BB8FA',
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.08em',
  padding: '4px 14px',
  textTransform: 'uppercase',
}

const heading: React.CSSProperties = {
  color: '#ffffff',
  fontSize: 26,
  fontWeight: 700,
  textAlign: 'center',
  margin: '24px 0 28px',
  lineHeight: '1.3',
}

const bodyText: React.CSSProperties = {
  color: '#94a3b8',
  fontSize: 15,
  lineHeight: '1.7',
  margin: '0 0 16px',
}

const card: React.CSSProperties = {
  backgroundColor: 'rgba(20, 20, 50, 0.8)',
  border: '1px solid rgba(44, 94, 173, 0.25)',
  borderRadius: 8,
  padding: '20px 24px',
  margin: '24px 0',
}

const cardLabel: React.CSSProperties = {
  color: '#4BB8FA',
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.1em',
  margin: '0 0 4px',
  textTransform: 'uppercase',
}

const cardValue: React.CSSProperties = {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: 600,
  margin: '0 0 4px',
}

const cardDivider: React.CSSProperties = {
  borderColor: 'rgba(44, 94, 173, 0.2)',
  margin: '14px 0',
}

const highlightBox: React.CSSProperties = {
  backgroundColor: 'rgba(21, 145, 220, 0.08)',
  border: '1px solid rgba(21, 145, 220, 0.25)',
  borderRadius: 8,
  padding: '16px 20px',
  margin: '0 0 20px',
}

const ctaButton: React.CSSProperties = {
  backgroundColor: '#1591DC',
  borderRadius: 8,
  color: '#ffffff',
  display: 'inline-block',
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: '0.04em',
  padding: '12px 32px',
  textDecoration: 'none',
}

const divider: React.CSSProperties = {
  borderColor: 'rgba(44, 94, 173, 0.2)',
  margin: '32px 0 24px',
}

const footer: React.CSSProperties = {
  color: '#475569',
  fontSize: 12,
  lineHeight: '1.6',
  margin: 0,
  textAlign: 'center',
}

const footerLink: React.CSSProperties = {
  color: '#2C5EAD',
  textDecoration: 'none',
}
