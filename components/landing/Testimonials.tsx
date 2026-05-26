const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Birthday gift',
    quote:
      'I ordered a birthday song for my mum. She cried. I cried. Worth every penny.',
    stars: 5,
  },
  {
    name: 'James K.',
    role: 'Brand jingle',
    quote:
      'Our brand jingle from Solara Flames was better than anything our agency pitched. Delivered in 36 hours.',
    stars: 5,
  },
  {
    name: 'Alyssa L.',
    role: 'Sorority anthem',
    quote:
      'Our sorority anthem was exactly what we needed for recruitment week. Every sister loves it.',
    stars: 5,
  },
  {
    name: 'Nina R.',
    role: 'Anniversary',
    quote:
      'I sent a poem. They sent back a folk song that played at our anniversary dinner. Absolutely magical.',
    stars: 5,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-k3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="bg-navy2 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-k3 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            <span x-show="$store.lang.current === 'en'" x-cloak="">What people say</span>
            <span x-show="$store.lang.current === 'lv'" x-cloak="">Ko saka cilvēki</span>
          </p>
          <h2 className="font-syne font-bold text-white text-3xl sm:text-4xl">
            <span x-show="$store.lang.current === 'en'" x-cloak="">Real stories, real songs</span>
            <span x-show="$store.lang.current === 'lv'" x-cloak="">Īsti stāsti, īstas dziesmas</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map(({ name, role, quote, stars }) => (
            <div
              key={name}
              className="flex flex-col bg-navy3 border border-k1/15 rounded-2xl p-6 hover:border-k1/35 transition-colors duration-200"
            >
              <Stars count={stars} />
              <blockquote className="text-white/65 text-sm leading-relaxed flex-1 mb-5">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-syne font-semibold text-white text-sm">{name}</p>
                <p className="text-k3/70 text-xs mt-0.5">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
