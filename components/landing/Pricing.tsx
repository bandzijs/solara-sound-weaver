const tiersEn = [
  {
    name: 'Personal',
    price: '$25',
    desc: 'Perfect for gifts, birthdays, and personal moments.',
    features: [
      '1 original song',
      '1 revision round',
      '48-hour delivery',
      'MP3 + WAV files',
      'Personal use license',
    ],
    cta: 'Order Personal',
    popular: false,
  },
  {
    name: 'Premium',
    price: '$45',
    desc: 'For weddings, anniversaries, and unforgettable occasions.',
    features: [
      '1 original song',
      '3 revision rounds',
      '24-hour delivery',
      'MP3 + WAV + stems',
      'Commercial license',
      'Priority support',
    ],
    cta: 'Order Premium',
    popular: true,
  },
  {
    name: 'Business',
    price: '$100+',
    desc: 'Brand jingles, broadcast spots, and custom briefs.',
    features: [
      'Brand jingle or spot',
      'Unlimited revisions',
      'Custom brief session',
      'Broadcast license',
      'Invoice billing',
      'Dedicated composer',
    ],
    cta: 'Get a quote',
    popular: false,
  },
]

const tiersLv = [
  {
    name: 'Personal',
    price: '€25',
    desc: 'Ideāli dāvanām, dzimšanas dienām un personīgiem brīžiem.',
    features: [
      '1 oriģināldziesma',
      '1 labojumu kārta',
      '48h piegāde',
      'MP3 + WAV faili',
      'Personīgā licence',
    ],
    cta: 'Pasūtīt Personal',
    popular: false,
  },
  {
    name: 'Premium',
    price: '€45',
    desc: 'Kāzām, jubilejām un neaizmirstamiem brīžiem.',
    features: [
      '1 oriģināldziesma',
      '3 labojumu kārtas',
      '24h piegāde',
      'MP3 + WAV + stiebri',
      'Komerciāla licence',
      'Prioritārs atbalsts',
    ],
    cta: 'Pasūtīt Premium',
    popular: true,
  },
  {
    name: 'Business',
    price: '€100+',
    desc: 'Zīmola dziesmas, reklāmas un individuāli uzdevumi.',
    features: [
      'Zīmola dziesma vai reklāma',
      'Neierobežoti labojumi',
      'Individuāla prasību sesija',
      'Apraides licence',
      'Rēķinu norēķini',
      'Veltīts komponists',
    ],
    cta: 'Saņemt piedāvājumu',
    popular: false,
  },
]

function TierCards({ tiers, badgeLabel, perSong }: {
  tiers: typeof tiersEn
  badgeLabel: string
  perSong: string
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-200 ${
            tier.popular
              ? 'bg-navy2 border-k2/50 shadow-[0_0_40px_rgba(21,145,220,0.15)]'
              : 'bg-navy2/60 border-k1/20 hover:border-k1/40'
          }`}
        >
          {tier.popular && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="bg-k2 text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1 rounded-full">
                {badgeLabel}
              </span>
            </div>
          )}

          <div className="mb-6">
            <h3 className="font-syne font-bold text-white text-xl mb-1">{tier.name}</h3>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="font-syne font-bold text-white text-4xl">{tier.price}</span>
              {!tier.price.includes('+') && (
                <span className="text-white/35 text-sm">{perSong}</span>
              )}
            </div>
            <p className="text-white/45 text-sm leading-relaxed">{tier.desc}</p>
          </div>

          <ul className="space-y-3 mb-8 flex-1">
            {tier.features.map((f) => (
              <li key={f} className="flex items-center gap-2.5">
                <span className="shrink-0 w-4 h-4 rounded-full bg-k2/20 border border-k3/30 flex items-center justify-center">
                  <svg className="w-2 h-2 text-k3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-white/60 text-sm">{f}</span>
              </li>
            ))}
          </ul>

          <a
            href="#order"
            className={`block text-center font-semibold py-3 rounded-xl text-sm transition-colors duration-200 ${
              tier.popular
                ? 'bg-k2 hover:bg-k1 text-white'
                : 'bg-white/8 hover:bg-white/15 text-white border border-white/10'
            }`}
          >
            {tier.cta}
          </a>
        </div>
      ))}
    </div>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="bg-navy py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-k3 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            <span x-show="$store.lang.current === 'en'" x-cloak="">Simple pricing</span>
            <span x-show="$store.lang.current === 'lv'" x-cloak="">Vienkāršas cenas</span>
          </p>
          <h2 className="font-syne font-bold text-white text-3xl sm:text-4xl mb-4">
            <span x-show="$store.lang.current === 'en'" x-cloak="">Pick your plan</span>
            <span x-show="$store.lang.current === 'lv'" x-cloak="">Izvēlies plānu</span>
          </h2>
          <p className="text-white/45 text-base max-w-md mx-auto">
            <span x-show="$store.lang.current === 'en'" x-cloak="">No subscriptions, no hidden fees. Pay once, own your song forever.</span>
            <span x-show="$store.lang.current === 'lv'" x-cloak="">Bez abonementiem, bez slēptām maksām. Maksā reizi, pieder tev uz mūžiem.</span>
          </p>
        </div>

        {/* EN tiers */}
        <div x-show="$store.lang.current === 'en'" x-cloak="">
          <TierCards tiers={tiersEn} badgeLabel="Most Popular" perSong="/ song" />
        </div>

        {/* LV tiers */}
        <div x-show="$store.lang.current === 'lv'" x-cloak="">
          <TierCards tiers={tiersLv} badgeLabel="Populārākais" perSong="/ dziesma" />
        </div>

        <p className="text-center text-white/30 text-xs mt-8">
          <span x-show="$store.lang.current === 'en'" x-cloak="">All plans include a satisfaction guarantee. Not happy? We&apos;ll make it right.</span>
          <span x-show="$store.lang.current === 'lv'" x-cloak="">Visi plāni iekļauj apmierinātības garantiju. Nav apmierināts? Mēs to labosim.</span>
        </p>
      </div>
    </section>
  )
}
