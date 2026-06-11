const stepsEn = [
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

const stepsLv = [
  {
    n: '01',
    title: 'Uzraksti savus vārdus',
    desc: 'Dalies ar atmiņu, dzejoli vai dažiem teikumiem — kas vien tver to, ko jūti. Aizņem apmēram 5 minūtes.',
  },
  {
    n: '02',
    title: 'Mēs komponējam tavu dziesmu',
    desc: 'Mūsu komponisti pārvērš tavus vārdus pilnībā producētā oriģināldziesmas ierakstā. Vokāls, instrumenti, miksāža — viss iekļauts.',
  },
  {
    n: '03',
    title: 'Tu pārskata un apstiprina',
    desc: 'Ieklausies savā dziesmā un pieprasi jebkādas izmaiņas. Mēs gribam, lai tas ir tieši pareizi.',
  },
  {
    n: '04',
    title: 'Tava dziesma uz mūžiem',
    desc: 'Lejupielādē MP3 un WAV failus nekavējoties. Pilna personīgā licence iekļauta — atskaņo to jebkur.',
  },
]

const benefitsEn = [
  'Powered by AI — from composition to vocals',
  'Multilingual, any genre, fully produced',
  'MP3 + WAV delivered to your inbox',
  'Revisions included with every order',
  'Worldwide delivery, every language',
]

const benefitsLv = [
  'Darbināts ar AI — no kompozīcijas līdz vokālam',
  'Daudzvalodu, jebkurš žanrs, pilnībā producēts',
  'MP3 + WAV piegādāts uz tavu e-pastu',
  'Labojumi iekļauti ar katru pasūtījumu',
  'Piegāde visā pasaulē, jebkurā valodā',
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-navy py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-k3 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            <span x-show="$store.lang.current === 'en'" x-cloak="">Simple process</span>
            <span x-show="$store.lang.current === 'lv'" x-cloak="">Vienkāršs process</span>
          </p>
          <h2 className="font-syne font-bold text-white text-3xl sm:text-4xl">
            <span x-show="$store.lang.current === 'en'" x-cloak="">How it works</span>
            <span x-show="$store.lang.current === 'lv'" x-cloak="">Kā tas darbojas</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — steps EN */}
          <div
            className="space-y-8"
            x-show="$store.lang.current === 'en'"
            x-cloak=""
          >
            {stepsEn.map(({ n, title, desc }) => (
              <div key={n} className="flex gap-5">
                <div className="shrink-0 w-12 h-12 rounded-full bg-k2/20 border border-k3/30 flex items-center justify-center">
                  <span className="font-syne font-bold text-k3 text-sm">{n}</span>
                </div>
                <div className="pt-1">
                  <h3 className="font-syne font-semibold text-white text-lg mb-1.5">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Left — steps LV */}
          <div
            className="space-y-8"
            x-show="$store.lang.current === 'lv'"
            x-cloak=""
          >
            {stepsLv.map(({ n, title, desc }) => (
              <div key={n} className="flex gap-5">
                <div className="shrink-0 w-12 h-12 rounded-full bg-k2/20 border border-k3/30 flex items-center justify-center">
                  <span className="font-syne font-bold text-k3 text-sm">{n}</span>
                </div>
                <div className="pt-1">
                  <h3 className="font-syne font-semibold text-white text-lg mb-1.5">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right — benefits + CTA */}
          <div className="lg:pt-2">
            <div className="bg-navy2 border border-k1/20 rounded-2xl p-8">
              <h3 className="font-syne font-bold text-white text-xl mb-6">
                <span x-show="$store.lang.current === 'en'" x-cloak="">What&apos;s included in every order</span>
                <span x-show="$store.lang.current === 'lv'" x-cloak="">Kas iekļauts katrā pasūtījumā</span>
              </h3>

              {/* Benefits EN */}
              <ul
                className="space-y-3.5 mb-8"
                x-show="$store.lang.current === 'en'"
                x-cloak=""
              >
                {benefitsEn.map((b) => (
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

              {/* Benefits LV */}
              <ul
                className="space-y-3.5 mb-8"
                x-show="$store.lang.current === 'lv'"
                x-cloak=""
              >
                {benefitsLv.map((b) => (
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
                <span x-show="$store.lang.current === 'en'" x-cloak="">Start your song →</span>
                <span x-show="$store.lang.current === 'lv'" x-cloak="">Sākt dziesmu →</span>
              </a>
            </div>

            {/* Delivery callout */}
            <div className="mt-4 flex items-center gap-3 bg-k3/8 border border-k3/20 rounded-xl px-5 py-3.5">
              <span className="text-xl">⚡</span>
              <p className="text-k4 text-sm">
                {/* EN */}
                <span x-show="$store.lang.current === 'en'" x-cloak="">
                  <strong className="text-white">48-hour delivery</strong>
                  {' — order today, receive your song by '}
                  <strong className="text-k3">
                    {new Date(Date.now() + 2 * 86400000).toLocaleDateString('en-US', {
                      weekday: 'long', month: 'short', day: 'numeric',
                    })}
                  </strong>
                </span>
                {/* LV */}
                <span x-show="$store.lang.current === 'lv'" x-cloak="">
                  <strong className="text-white">48 stundu piegāde</strong>
                  {' — pasūti šodien, saņem dziesmu līdz '}
                  <strong className="text-k3">
                    {new Date(Date.now() + 2 * 86400000).toLocaleDateString('lv-LV', {
                      weekday: 'long', month: 'short', day: 'numeric',
                    })}
                  </strong>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
