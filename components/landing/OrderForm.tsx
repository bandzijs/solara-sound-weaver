const moodsEn = [
  'Birthday',
  'Wedding',
  'Sorority',
  'Anniversary',
  'Brand jingle',
  'Memorial',
  'Just because',
]

const moodsLv = [
  'Dzimšanas diena',
  'Kāzas',
  'Korporācija',
  'Jubileja',
  'Zīmola dziesma',
  'Piemiņa',
  'Vienkārši tā',
]

const genresEn = [
  'Hip-Hop / Rap',
  'Pop',
  'Rock',
  'Latin',
  'Country',
  'EDM',
  'R&B / Soul',
  'Folk music',
]

const genresLv = [
  'Hiphops / Reps',
  'Pops',
  'Roks',
  'Latīņu',
  'Kantri',
  'EDM',
  'R&B / Soul',
  'Folklora',
]

const formData = `{
  mood: '',
  genre: '',
  name: '',
  email: '',
  poem_text: '',
  loading: false,
  success: false,
  error: '',
  deliveryDate: '',
  async submit(e) {
    e.preventDefault()
    if (!this.mood || !this.genre || !this.name.trim() || !this.email.trim() || !this.poem_text.trim()) {
      this.error = $store.lang.current === 'lv'
        ? 'Lūdzu aizpildi visus laukus un izvēlies noskaņu un žanru.'
        : 'Please fill in all fields and select a mood and genre.'
      return
    }
    this.loading = true
    this.error = ''
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.name.trim(),
          email: this.email.trim(),
          poem_text: this.poem_text.trim(),
          mood: this.mood,
          genre: this.genre.trim()
        })
      })
      const data = await res.json()
      if (!res.ok) {
        this.error = data.error || ($store.lang.current === 'lv'
          ? 'Kaut kas nogāja greizi. Lūdzu mēģini vēlreiz.'
          : 'Something went wrong. Please try again.')
      } else {
        this.success = true
        this.deliveryDate = data.deliveryDate
      }
    } catch {
      this.error = $store.lang.current === 'lv'
        ? 'Tīkla kļūda. Lūdzu pārbaudi savienojumu un mēģini vēlreiz.'
        : 'Network error. Please check your connection and try again.'
    } finally {
      this.loading = false
    }
  }
}`

export default function OrderForm() {
  return (
    <section id="order" className="bg-navy2 py-20 sm:py-28">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-k3 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            <span x-show="$store.lang.current === 'en'" x-cloak="">Start here</span>
            <span x-show="$store.lang.current === 'lv'" x-cloak="">Sāc šeit</span>
          </p>
          <h2 className="font-syne font-bold text-white text-3xl sm:text-4xl mb-4">
            <span x-show="$store.lang.current === 'en'" x-cloak="">Order your song</span>
            <span x-show="$store.lang.current === 'lv'" x-cloak="">Pasūtīt dziesmu</span>
          </h2>
          <p className="text-white/45 text-base">
            <span x-show="$store.lang.current === 'en'" x-cloak="">Write your words below. We handle the rest — music, vocals, production.</span>
            <span x-show="$store.lang.current === 'lv'" x-cloak="">Uzraksti savus vārdus zemāk. Mēs parūpēsimies par pārējo — mūziku, vokālu, produkciju.</span>
          </p>
        </div>

        <div x-data={formData}>

          {/* ── Success state ── */}
          <div
            className="text-center py-16 px-8 bg-navy3 border border-k3/30 rounded-2xl"
            x-show="success"
            x-cloak=""
          >
            <div className="w-16 h-16 rounded-full bg-k2/20 border border-k3/30 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-k3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-syne font-bold text-white text-2xl mb-3">
              <span x-show="$store.lang.current === 'en'" x-cloak="">You&apos;re all set! 🎵</span>
              <span x-show="$store.lang.current === 'lv'" x-cloak="">Viss kārtībā! 🎵</span>
            </h3>
            <p className="text-white/60 text-base mb-2">
              <span x-show="$store.lang.current === 'en'" x-cloak="">Your order is confirmed. Check your inbox for a confirmation email.</span>
              <span x-show="$store.lang.current === 'lv'" x-cloak="">Tavs pasūtījums ir apstiprināts. Pārbaudi savu e-pastu apstiprinājuma vēstulei.</span>
            </p>
            <p className="text-k4 text-sm">
              <span x-show="$store.lang.current === 'en'" x-cloak="">Estimated delivery: </span>
              <span x-show="$store.lang.current === 'lv'" x-cloak="">Paredzamā piegāde: </span>
              <strong className="text-k3" x-text="deliveryDate" />
            </p>
            <p className="text-white/35 text-xs mt-4">
              <span x-show="$store.lang.current === 'en'" x-cloak="">A payment link will arrive shortly at your email address.</span>
              <span x-show="$store.lang.current === 'lv'" x-cloak="">Maksājuma saite drīzumā tiks nosūtīta uz tavu e-pasta adresi.</span>
            </p>
          </div>

          {/* ── Form ── */}
          <form
            className="space-y-6"
            x-show="!success"
            {...{'x-on:submit': 'submit($event)'}}
            noValidate
          >
            {/* Occasion/Mood + Genre — side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Occasion / Mood */}
              <div>
                <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-3">
                  <span x-show="$store.lang.current === 'en'" x-cloak="">Occasion / Mood</span>
                  <span x-show="$store.lang.current === 'lv'" x-cloak="">Notikums / Noskaņa</span>
                </label>

                {/* EN mood dropdown */}
                <select
                  x-show="$store.lang.current === 'en'"
                  x-cloak=""
                  x-model="mood"
                  className="w-full bg-navy3 border border-k1/20 focus:border-k2 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors duration-150 appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select occasion / mood</option>
                  {moodsEn.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>

                {/* LV mood dropdown */}
                <select
                  x-show="$store.lang.current === 'lv'"
                  x-cloak=""
                  x-model="mood"
                  className="w-full bg-navy3 border border-k1/20 focus:border-k2 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors duration-150 appearance-none cursor-pointer"
                >
                  <option value="" disabled>Izvēlies notikumu / noskaņu</option>
                  {moodsLv.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              {/* Music Genre */}
              <div>
                <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-3">
                  <span x-show="$store.lang.current === 'en'" x-cloak="">Music Genre</span>
                  <span x-show="$store.lang.current === 'lv'" x-cloak="">Mūzikas žanrs</span>
                </label>

                {/* EN genre dropdown */}
                <select
                  x-show="$store.lang.current === 'en'"
                  x-cloak=""
                  x-model="genre"
                  className="w-full bg-navy3 border border-k1/20 focus:border-k2 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors duration-150 appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select genre</option>
                  {genresEn.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>

                {/* LV genre dropdown */}
                <select
                  x-show="$store.lang.current === 'lv'"
                  x-cloak=""
                  x-model="genre"
                  className="w-full bg-navy3 border border-k1/20 focus:border-k2 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors duration-150 appearance-none cursor-pointer"
                >
                  <option value="" disabled>Izvēlies žanru</option>
                  {genresLv.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

            </div>

            {/* Name */}
            <div>
              <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-2">
                <span x-show="$store.lang.current === 'en'" x-cloak="">Your name</span>
                <span x-show="$store.lang.current === 'lv'" x-cloak="">Tavs vārds</span>
              </label>
              <input
                type="text"
                placeholder="First name is fine"
                className="w-full bg-navy3 border border-k1/20 focus:border-k2 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 outline-none transition-colors duration-150"
                x-model="name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-2">
                <span x-show="$store.lang.current === 'en'" x-cloak="">Email address</span>
                <span x-show="$store.lang.current === 'lv'" x-cloak="">E-pasta adrese</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-navy3 border border-k1/20 focus:border-k2 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 outline-none transition-colors duration-150"
                x-model="email"
                required
              />
            </div>

            {/* Poem / words */}
            <div>
              <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-2">
                <span x-show="$store.lang.current === 'en'" x-cloak="">Your words, poem or story</span>
                <span x-show="$store.lang.current === 'lv'" x-cloak="">Tavi vārdi, dzejolis vai stāsts</span>
              </label>
              <textarea
                rows={6}
                placeholder="Write anything — a memory, a poem, a few sentences about the person or moment. The more you share, the better your song."
                className="w-full bg-navy3 border border-k1/20 focus:border-k2 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 outline-none transition-colors duration-150 resize-y"
                x-model="poem_text"
                required
              />
            </div>

            {/* Error message */}
            <div
              className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-300 text-sm"
              x-show="error"
              x-text="error"
              x-cloak=""
            />

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-k2 hover:bg-k1 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl text-base transition-all duration-200 glow-k2 flex items-center justify-center gap-2"
              {...{'x-bind:disabled': 'loading'}}
            >
              {/* Spinner */}
              <svg
                className="w-4 h-4 animate-spin"
                x-show="loading"
                x-cloak=""
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <span x-text={`loading
                ? ($store.lang.current === 'lv' ? 'Sūta pasūtījumu…' : 'Sending your order…')
                : ($store.lang.current === 'lv' ? 'Sūtīt vārdus →' : 'Send my words →')`}>
                Send my words →
              </span>
            </button>

            <p className="text-center text-white/25 text-xs">
              <span x-show="$store.lang.current === 'en'" x-cloak="">No payment needed now — we&apos;ll send a secure payment link after reviewing your brief.</span>
              <span x-show="$store.lang.current === 'lv'" x-cloak="">Maksājums nav nepieciešams tagad — mēs nosūtīsim drošu maksājuma saiti pēc tava pieprasījuma izskatīšanas.</span>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
