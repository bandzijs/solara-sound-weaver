const occasions = [
  {
    emoji: '🎂',
    title: 'Birthday',
    desc: 'A song that says more than any card ever could.',
  },
  {
    emoji: '💍',
    title: 'Wedding',
    desc: 'Your vows, your story — set to music forever.',
  },
  {
    emoji: '🎀',
    title: 'Sorority',
    desc: 'An anthem your chapter will sing for years.',
  },
  {
    emoji: '🎙️',
    title: 'Brand jingle',
    desc: 'Music that makes your brand unforgettable.',
  },
]

export default function OccasionsStrip() {
  return (
    <section className="bg-navy2 py-16 border-y border-k1/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <p className="text-center text-white/40 text-xs font-medium tracking-[0.2em] uppercase mb-10">
          Every occasion, one song
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {occasions.map(({ emoji, title, desc }) => (
            <a
              key={title}
              href="#order"
              className="group flex flex-col items-center text-center p-6 rounded-2xl border border-k1/15 hover:border-k1/40 hover:bg-k1/10 transition-all duration-200 cursor-pointer"
            >
              <span className="text-3xl mb-3">{emoji}</span>
              <h3 className="font-syne font-semibold text-white text-base mb-1.5 group-hover:text-k3 transition-colors">
                {title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
