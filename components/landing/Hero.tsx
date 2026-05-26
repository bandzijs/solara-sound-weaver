const heroData = `{
  phrases: [
    'your best friend\\'s birthday',
    'a wedding gift they\\'ll never forget',
    'your sorority chapter\\'s anthem',
    'a loved one\\'s anniversary',
    'a brand that wants to be remembered',
    'a memorial that speaks when words fall short'
  ],
  idx: 0,
  visible: true,
  init() {
    setInterval(() => {
      this.visible = false
      setTimeout(() => {
        this.idx = (this.idx + 1) % this.phrases.length
        this.visible = true
      }, 380)
    }, 2800)
  }
}`

export default function Hero() {
  return (
    <section className="relative bg-navy overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24">
      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-k1/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-k2/8 blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-k2/10 border border-k2/25 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-k3 animate-pulse" />
          <span className="text-k4 text-xs font-medium tracking-wider uppercase">
            Custom songs · 48-hour delivery
          </span>
        </div>

        {/* Main headline */}
        <h1 className="font-syne font-bold text-white leading-tight mb-6"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 3.5rem)' }}
        >
          Your words.{' '}
          <span className="text-k3 text-glow">A real song.</span>
          <br />
          In 48 hours.
        </h1>

        {/* Rotating subline */}
        <div
          className="h-10 flex items-center justify-center mb-10"
          x-data={heroData}
          x-init="init()"
        >
          <p className="text-white/55 text-lg sm:text-xl font-dm">
            {'The perfect song for '}
            <span
              className="text-k3 font-semibold transition-opacity duration-300"
              x-show="visible"
              x-text="phrases[idx]"
              x-cloak=""
            >
              your best friend&apos;s birthday
            </span>
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#order"
            className="w-full sm:w-auto bg-k2 hover:bg-k1 text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-all duration-200 glow-k2"
          >
            Order your song →
          </a>
          <a
            href="#showcase"
            className="w-full sm:w-auto bg-k2/85 hover:bg-k2 text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-all duration-200"
          >
            Hear an example
          </a>
        </div>

        {/* Stats strip */}
        <div className="border-t border-k1/20 pt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {([
            ['500+', 'Songs created'],
            ['48 h', 'Avg. delivery'],
            ['8',    'Genres'],
            ['$49',  'Starting from'],
          ] as [string, string][]).map(([value, label]) => (
            <div key={label} className="text-center">
              <div className="font-syne font-bold text-white text-2xl sm:text-3xl mb-1">
                {value}
              </div>
              <div className="text-white/45 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
