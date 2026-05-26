const NAV_EN: [string, string][] = [
  ['How it works', '#how-it-works'],
  ['Listen',       '#showcase'],
  ['Pricing',      '#pricing'],
  ['FAQ',          '#faq'],
  ['For business', '#order'],
]

const NAV_LV: [string, string][] = [
  ['Kā tas darbojas', '#how-it-works'],
  ['Klausīties',      '#showcase'],
  ['Cenas',           '#pricing'],
  ['BUJ',             '#faq'],
  ['Uzņēmumiem',      '#order'],
]

export default function Nav() {
  return (
    <nav
      className="sticky top-0 z-50 bg-navy2 border-b border-k1/20"
      x-data="{ menuOpen: false }"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="/" className="flex items-center gap-3 shrink-0">
            <div className="flex items-end gap-[3px]">
              {([16, 26, 20, 30, 18] as number[]).map((h, i) => (
                <div
                  key={i}
                  className={`w-[3px] rounded-full ${i % 2 === 0 ? 'bg-k2' : 'bg-k3'}`}
                  style={{ height: h }}
                />
              ))}
            </div>
            <span className="font-syne font-bold text-white text-lg tracking-wide">
              Solara Flames
            </span>
          </a>

          {/* Desktop links — EN */}
          <div
            className="hidden md:flex items-center gap-7"
            x-show="$store.lang.current === 'en'"
            x-cloak=""
          >
            {NAV_EN.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm text-white/55 hover:text-white transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Desktop links — LV */}
          <div
            className="hidden md:flex items-center gap-7"
            x-show="$store.lang.current === 'lv'"
            x-cloak=""
          >
            {NAV_LV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm text-white/55 hover:text-white transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language pill — functional */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-0.5 text-xs font-medium select-none">
              <span
                className="px-3 py-1 rounded-full cursor-pointer transition-colors"
                {...{'x-bind:class': "$store.lang.current === 'en' ? 'bg-k2 text-white' : 'text-white/40 hover:text-white/60'"}}
                {...{'x-on:click': "$store.lang.set('en')"}}
              >EN</span>
              <span
                className="px-3 py-1 rounded-full cursor-pointer transition-colors"
                {...{'x-bind:class': "$store.lang.current === 'lv' ? 'bg-k2 text-white' : 'text-white/40 hover:text-white/60'"}}
                {...{'x-on:click': "$store.lang.set('lv')"}}
              >LV</span>
            </div>

            {/* CTA */}
            <a
              href="#order"
              className="bg-k2 hover:bg-k1 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors duration-200"
            >
              <span x-show="$store.lang.current === 'en'" x-cloak="">Order a song</span>
              <span x-show="$store.lang.current === 'lv'" x-cloak="">Pasūtīt dziesmu</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
            {...{'x-on:click': 'menuOpen = !menuOpen'}}
            aria-label="Toggle navigation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden border-t border-k1/20 bg-navy2 px-4 pb-5"
        x-show="menuOpen"
        x-cloak=""
      >
        <div className="flex flex-col pt-3 gap-0.5">

          {/* Mobile links — EN */}
          <div x-show="$store.lang.current === 'en'" x-cloak="">
            {NAV_EN.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-white/70 hover:text-white text-sm py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors block"
                {...{'x-on:click': 'menuOpen = false'}}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Mobile links — LV */}
          <div x-show="$store.lang.current === 'lv'" x-cloak="">
            {NAV_LV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-white/70 hover:text-white text-sm py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors block"
                {...{'x-on:click': 'menuOpen = false'}}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="pt-4 mt-2 border-t border-k1/20 flex items-center justify-between">
            {/* Mobile lang pill */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-0.5 text-xs font-medium select-none">
              <span
                className="px-3 py-1 rounded-full cursor-pointer transition-colors"
                {...{'x-bind:class': "$store.lang.current === 'en' ? 'bg-k2 text-white' : 'text-white/40'"}}
                {...{'x-on:click': "$store.lang.set('en')"}}
              >EN</span>
              <span
                className="px-3 py-1 rounded-full cursor-pointer transition-colors"
                {...{'x-bind:class': "$store.lang.current === 'lv' ? 'bg-k2 text-white' : 'text-white/40'"}}
                {...{'x-on:click': "$store.lang.set('lv')"}}
              >LV</span>
            </div>
            <a
              href="#order"
              className="bg-k2 text-white text-sm font-semibold px-5 py-2 rounded-lg"
              {...{'x-on:click': 'menuOpen = false'}}
            >
              <span x-show="$store.lang.current === 'en'" x-cloak="">Order a song</span>
              <span x-show="$store.lang.current === 'lv'" x-cloak="">Pasūtīt dziesmu</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
