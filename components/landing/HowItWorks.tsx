const steps = [
  {
    n: '01',
    title: 'Write your words',
    desc: 'Share a memory, a poem, a few sentences — anything that captures what you feel. Takes about 5 minutes.',
  },
  {
    n: '02',
    title: 'We compose your song',
    desc: 'Our composers turn your words into a fully produced original track. Vocals, instruments, mixing — all included.',
  },
  {
    n: '03',
    title: 'You review and approve',
    desc: 'Listen to your song and request any changes. We want it to be exactly right.',
  },
  {
    n: '04',
    title: 'You own it forever',
    desc: 'Download your MP3 and WAV files immediately. Full personal license included — play it anywhere.',
  },
]

const benefits = [
  'Professionally produced, not AI-generated',
  'Real vocalists and live instruments',
  'MP3 + WAV delivered to your inbox',
  'Revisions included with every order',
  'Secure payment, money-back guarantee',
  'Worldwide delivery, every language',
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-navy py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-k3 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Simple process
          </p>
          <h2 className="font-syne font-bold text-white text-3xl sm:text-4xl">
            How it works
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — steps */}
          <div className="space-y-8">
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="flex gap-5">
                {/* Number circle */}
                <div className="shrink-0 w-12 h-12 rounded-full bg-k2/20 border border-k3/30 flex items-center justify-center">
                  <span className="font-syne font-bold text-k3 text-sm">{n}</span>
                </div>
                <div className="pt-1">
                  <h3 className="font-syne font-semibold text-white text-lg mb-1.5">
                    {title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right — benefits + CTA */}
          <div className="lg:pt-2">
            <div className="bg-navy2 border border-k1/20 rounded-2xl p-8">
              <h3 className="font-syne font-bold text-white text-xl mb-6">
                What&apos;s included in every order
              </h3>
              <ul className="space-y-3.5 mb-8">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-k2/20 border border-k3/30 flex items-center justify-center mt-0.5">
                      <svg className="w-2.5 h-2.5 text-k3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-white/65 text-sm leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#order"
                className="block w-full text-center bg-k2 hover:bg-k1 text-white font-semibold py-3.5 rounded-xl transition-colors duration-200"
              >
                Start your song →
              </a>
            </div>

            {/* Delivery callout */}
            <div className="mt-4 flex items-center gap-3 bg-k3/8 border border-k3/20 rounded-xl px-5 py-3.5">
              <span className="text-xl">⚡</span>
              <p className="text-k4 text-sm">
                <strong className="text-white">48-hour delivery</strong> — order today, receive your song by{' '}
                <strong className="text-k3">
                  {new Date(Date.now() + 2 * 86400000).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                  })}
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
