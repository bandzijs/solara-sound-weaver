const deliveryDateEn = new Date(Date.now() + 2 * 86400000).toLocaleDateString('en-US', {
  weekday: 'short', month: 'short', day: 'numeric',
})
const deliveryDateLv = new Date(Date.now() + 2 * 86400000).toLocaleDateString('lv-LV', {
  weekday: 'short', month: 'short', day: 'numeric',
})

const servicesEn = ['Personal — $49', 'Premium — $99', 'Business — $249+', 'Gift cards']
const servicesLv = ['Personal — $49', 'Premium — $99', 'Business — $249+', 'Dāvanu kartes']

const legalEn = ['Privacy policy', 'Terms of service', 'Refund policy', 'License terms']
const legalLv = ['Privātuma politika', 'Pakalpojumu noteikumi', 'Atmaksas politika', 'Licences noteikumi']

export default function Footer() {
  return (
    <>
      {/* ── CTA Banner ── */}
      <section className="bg-k1 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-syne font-bold text-white text-2xl sm:text-3xl mb-2">
                <span x-show="$store.lang.current === 'en'" x-cloak="">Ready to order your song?</span>
                <span x-show="$store.lang.current === 'lv'" x-cloak="">Gatavs pasūtīt dziesmu?</span>
              </h2>
              <p className="text-white/70 text-base">
                <span x-show="$store.lang.current === 'en'" x-cloak="">Write your words today. Delivered in 48 hours.</span>
                <span x-show="$store.lang.current === 'lv'" x-cloak="">Uzraksti savus vārdus šodien. Piegādāts 48 stundās.</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <span className="text-white/60 text-sm whitespace-nowrap">
                <span x-show="$store.lang.current === 'en'" x-cloak="">
                  Order now · Ready by{' '}
                  <strong className="text-white">{deliveryDateEn}</strong>
                </span>
                <span x-show="$store.lang.current === 'lv'" x-cloak="">
                  Pasūtīt · Gatavs{' '}
                  <strong className="text-white">{deliveryDateLv}</strong>
                </span>
              </span>
              <a
                href="#order"
                className="whitespace-nowrap bg-white text-k1 font-bold px-7 py-3.5 rounded-xl text-sm hover:bg-k4 transition-colors duration-200"
              >
                <span x-show="$store.lang.current === 'en'" x-cloak="">Order a song — from $49 →</span>
                <span x-show="$store.lang.current === 'lv'" x-cloak="">Pasūtīt dziesmu — no $49 →</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#05050f] border-t border-k1/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex items-end gap-[3px]">
                  {([14, 22, 17, 26, 16] as number[]).map((h, i) => (
                    <div
                      key={i}
                      className={`w-[3px] rounded-full ${i % 2 === 0 ? 'bg-k2' : 'bg-k3'}`}
                      style={{ height: h }}
                    />
                  ))}
                </div>
                <span className="font-syne font-bold text-white text-base tracking-wide">
                  Solara Flames
                </span>
              </div>
              <p className="text-white/35 text-sm leading-relaxed mb-5 max-w-[220px]">
                <span x-show="$store.lang.current === 'en'" x-cloak="">Your words. A real song. In 48 hours.</span>
                <span x-show="$store.lang.current === 'lv'" x-cloak="">Tavi vārdi. Īsta dziesma. 48 stundās.</span>
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3">
                {[
                  {
                    label: 'Instagram',
                    href: '#',
                    icon: (
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" />
                    ),
                  },
                  {
                    label: 'TikTok',
                    href: '#',
                    icon: (
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
                    ),
                  },
                  {
                    label: 'YouTube',
                    href: '#',
                    icon: (
                      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                    ),
                  },
                  {
                    label: 'X',
                    href: '#',
                    icon: (
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    ),
                  },
                ].map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-4 h-4 text-white/50 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      {icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-syne font-semibold text-white text-sm mb-4 tracking-wide">
                <span x-show="$store.lang.current === 'en'" x-cloak="">Services</span>
                <span x-show="$store.lang.current === 'lv'" x-cloak="">Pakalpojumi</span>
              </h4>
              {/* EN */}
              <ul className="space-y-2.5" x-show="$store.lang.current === 'en'" x-cloak="">
                {servicesEn.map((item) => (
                  <li key={item}>
                    <a href="#order" className="text-white/35 hover:text-white/70 text-sm transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
              {/* LV */}
              <ul className="space-y-2.5" x-show="$store.lang.current === 'lv'" x-cloak="">
                {servicesLv.map((item) => (
                  <li key={item}>
                    <a href="#order" className="text-white/35 hover:text-white/70 text-sm transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-syne font-semibold text-white text-sm mb-4 tracking-wide">
                <span x-show="$store.lang.current === 'en'" x-cloak="">Legal</span>
                <span x-show="$store.lang.current === 'lv'" x-cloak="">Juridiskā info</span>
              </h4>
              {/* EN */}
              <ul className="space-y-2.5" x-show="$store.lang.current === 'en'" x-cloak="">
                {legalEn.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/35 hover:text-white/70 text-sm transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
              {/* LV */}
              <ul className="space-y-2.5" x-show="$store.lang.current === 'lv'" x-cloak="">
                {legalLv.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/35 hover:text-white/70 text-sm transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-syne font-semibold text-white text-sm mb-4 tracking-wide">
                <span x-show="$store.lang.current === 'en'" x-cloak="">Contact</span>
                <span x-show="$store.lang.current === 'lv'" x-cloak="">Kontakti</span>
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="mailto:hello@solaraflames.com" className="text-white/35 hover:text-white/70 text-sm transition-colors">
                    hello@solaraflames.com
                  </a>
                </li>
                <li><a href="#" className="text-white/35 hover:text-white/70 text-sm transition-colors">WhatsApp</a></li>
                <li><a href="#" className="text-white/35 hover:text-white/70 text-sm transition-colors">Instagram</a></li>
                <li><a href="#" className="text-white/35 hover:text-white/70 text-sm transition-colors">TikTok</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/20 text-xs">
              <span x-show="$store.lang.current === 'en'" x-cloak="">© 2025 Solara Flames. All rights reserved.</span>
              <span x-show="$store.lang.current === 'lv'" x-cloak="">© 2025 Solara Flames. Visas tiesības aizsargātas.</span>
            </p>
            <p className="text-white/15 text-xs">
              <span x-show="$store.lang.current === 'en'" x-cloak="">Custom songs · 48-hour delivery · Worldwide</span>
              <span x-show="$store.lang.current === 'lv'" x-cloak="">Individuālas dziesmas · 48h piegāde · Visā pasaulē</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
