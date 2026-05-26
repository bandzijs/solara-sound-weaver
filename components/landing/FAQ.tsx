const faqsEn = [
  {
    q: 'How long does it take?',
    a: 'Standard delivery is 48 hours from the moment we receive your words and payment. Premium orders are delivered within 24 hours. We work around the clock so your deadline is our deadline.',
  },
  {
    q: 'Can I request revisions?',
    a: 'Yes — every order includes at least one revision round. Personal orders get 1 round, Premium orders get 3. We want your song to feel exactly right, so we work with you until it does.',
  },
  {
    q: 'What files do I receive?',
    a: 'All orders include a high-quality MP3 and a lossless WAV file delivered directly to your inbox. Premium and Business orders also receive individual stems (separate vocal, instrumental tracks) for maximum flexibility.',
  },
  {
    q: 'Do I own the rights to my song?',
    a: 'Personal and Premium orders come with a full personal-use license — you can play it at events, share it online, and keep it forever. Business orders include a broadcast license for commercial use. You own your song.',
  },
  {
    q: 'Do you deliver worldwide?',
    a: 'Absolutely. We work with customers in every country and can write songs in any language. Just include your preferred language when you submit your order and our composers will match it.',
  },
]

const faqsLv = [
  {
    q: 'Cik ilgi tas aizņem?',
    a: 'Standarta piegāde ir 48 stundas no brīža, kad saņemam tavus vārdus un maksājumu. Premium pasūtījumi tiek piegādāti 24 stundu laikā. Mēs strādājam visu diennakti, lai tavs termiņš būtu arī mūsējais.',
  },
  {
    q: 'Vai varu pieprasīt labojumus?',
    a: 'Jā — katrs pasūtījums iekļauj vismaz vienu labojumu kārtu. Personal pasūtījumi saņem 1 kārtu, Premium saņem 3. Mēs gribam, lai tava dziesma jūtas tieši pareizi, tāpēc strādājam kopā ar tevi, līdz tā ir.',
  },
  {
    q: 'Kādus failus es saņemu?',
    a: 'Visi pasūtījumi iekļauj augstas kvalitātes MP3 un bezraudes WAV failu, kas tiek piegādāts tieši uz tavu e-pastu. Premium un Business pasūtījumi saņem arī individuālus stiebrus (atsevišķus vokāla un instrumentālos ierakstus) maksimālai elastībai.',
  },
  {
    q: 'Vai man pieder autortiesības uz dziesmu?',
    a: 'Personal un Premium pasūtījumi nāk ar pilnu personīgās lietošanas licenci — vari to atskaņot pasākumos, kopīgot tiešsaistē un paturēt uz mūžiem. Business pasūtījumi iekļauj apraides licenci komerciālai izmantošanai. Dziesma pieder tev.',
  },
  {
    q: 'Vai jūs piegādājat visā pasaulē?',
    a: 'Noteikti. Mēs strādājam ar klientiem visās valstīs un varam rakstīt dziesmas jebkurā valodā. Vienkārši norādi savu vēlamo valodu, iesniedzot pasūtījumu, un mūsu komponisti to ievēros.',
  },
]

function FaqList({ faqs }: { faqs: typeof faqsEn }) {
  return (
    <div className="space-y-2">
      {faqs.map(({ q, a }) => (
        <div
          key={q}
          className="border border-k1/20 rounded-xl overflow-hidden"
          x-data="{ open: false }"
        >
          <button
            className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-k1/5 transition-colors duration-150"
            {...{'x-on:click': 'open = !open'}}
          >
            <span className="font-syne font-semibold text-white text-sm sm:text-base">{q}</span>
            <span
              className="shrink-0 w-6 h-6 rounded-full bg-k2/15 border border-k3/20 flex items-center justify-center transition-transform duration-300"
              {...{'x-bind:class': "open ? 'rotate-180' : ''"}}
            >
              <svg className="w-3 h-3 text-k3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          <div
            className="faq-body"
            {...{'x-bind:class': "open ? 'open' : ''"}}
          >
            <div>
              <p className="px-6 pb-5 text-white/50 text-sm leading-relaxed">{a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="bg-navy py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-k3 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            <span x-show="$store.lang.current === 'en'" x-cloak="">Got questions?</span>
            <span x-show="$store.lang.current === 'lv'" x-cloak="">Ir jautājumi?</span>
          </p>
          <h2 className="font-syne font-bold text-white text-3xl sm:text-4xl">
            <span x-show="$store.lang.current === 'en'" x-cloak="">Frequently asked</span>
            <span x-show="$store.lang.current === 'lv'" x-cloak="">Biežāk uzdotie</span>
          </h2>
        </div>

        {/* EN faqs */}
        <div x-show="$store.lang.current === 'en'" x-cloak="">
          <FaqList faqs={faqsEn} />
        </div>

        {/* LV faqs */}
        <div x-show="$store.lang.current === 'lv'" x-cloak="">
          <FaqList faqs={faqsLv} />
        </div>

        {/* Still have questions */}
        <div className="mt-10 text-center">
          <p className="text-white/35 text-sm mb-3">
            <span x-show="$store.lang.current === 'en'" x-cloak="">Still have questions?</span>
            <span x-show="$store.lang.current === 'lv'" x-cloak="">Vēl jautājumi?</span>
          </p>
          <a
            href="mailto:hello@solaraflames.com"
            className="text-k3 hover:text-white text-sm font-medium transition-colors"
          >
            hello@solaraflames.com →
          </a>
        </div>
      </div>
    </section>
  )
}
