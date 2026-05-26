import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Solara Flames — Your words. A real song. In 48 hours.',
  description:
    'Turn your words, poem, or story into a professionally produced original song. Delivered in 48 hours. Personal, wedding, sorority, brand — from $49.',
  metadataBase: new URL('https://solaraflames.com'),
  openGraph: {
    title: 'Solara Flames — Custom Songs in 48 Hours',
    description:
      'Your words become a real song. Birthdays, weddings, brand jingles, memorials. Delivered in 48 hours from $49.',
    url: 'https://solaraflames.com',
    siteName: 'Solara Flames',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solara Flames — Custom Songs in 48 Hours',
    description: 'Your words. A real song. In 48 hours. From $49.',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <head />
      <body className="bg-navy text-white font-dm antialiased" x-data="{}">
        {children}

        {/* Alpine lang store — must register before Alpine CDN loads */}
        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('alpine:init', function() {
            Alpine.store('lang', {
              current: (typeof localStorage !== 'undefined' ? localStorage.getItem('sf_lang') : null) || 'lv',
              set: function(l) { this.current = l; localStorage.setItem('sf_lang', l); }
            })
          })
        ` }} />

        {/* Alpine.js v3.14.1 — afterInteractive so React hydrates before Alpine touches the DOM */}
        <Script
          src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
