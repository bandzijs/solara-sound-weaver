const moods = [
  'Birthday',
  'Wedding',
  'Sorority',
  'Anniversary',
  'Brand jingle',
  'Memorial',
  'Just because',
]

const formData = `{
  mood: '',
  name: '',
  email: '',
  poem_text: '',
  loading: false,
  success: false,
  error: '',
  deliveryDate: '',
  async submit(e) {
    e.preventDefault()
    if (!this.mood || !this.name.trim() || !this.email.trim() || !this.poem_text.trim()) {
      this.error = 'Please fill in all fields and select a mood.'
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
          mood: this.mood
        })
      })
      const data = await res.json()
      if (!res.ok) {
        this.error = data.error || 'Something went wrong. Please try again.'
      } else {
        this.success = true
        this.deliveryDate = data.deliveryDate
      }
    } catch {
      this.error = 'Network error. Please check your connection and try again.'
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
            Start here
          </p>
          <h2 className="font-syne font-bold text-white text-3xl sm:text-4xl mb-4">
            Order your song
          </h2>
          <p className="text-white/45 text-base">
            Write your words below. We handle the rest — music, vocals, production.
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
              You&apos;re all set! 🎵
            </h3>
            <p className="text-white/60 text-base mb-2">
              Your order is confirmed. Check your inbox for a confirmation email.
            </p>
            <p className="text-k4 text-sm">
              Estimated delivery:{' '}
              <strong className="text-k3" x-text="deliveryDate" />
            </p>
            <p className="text-white/35 text-xs mt-4">
              A payment link will arrive shortly at your email address.
            </p>
          </div>

          {/* ── Form ── */}
          <form
            className="space-y-6"
            x-show="!success"
            {...{'x-on:submit': 'submit($event)'}}
            noValidate
          >
            {/* Mood chips */}
            <div>
              <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-3">
                Occasion / Mood
              </label>
              <div className="flex flex-wrap gap-2">
                {moods.map((m) => (
                  <button
                    key={m}
                    type="button"
                    className="px-4 py-2 rounded-full border text-sm font-medium transition-all duration-150"
                    {...{
                      'x-on:click': `mood = mood === '${m}' ? '' : '${m}'`,
                      'x-bind:class': `mood === '${m}'
                        ? 'border-k3 bg-k3/15 text-k3'
                        : 'border-k1/25 bg-transparent text-white/50 hover:border-k1/50 hover:text-white/80'`,
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-2">
                Your name
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
                Email address
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
                Your words, poem or story
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
              {...{ 'x-bind:disabled': 'loading' }}
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
              <span x-text="loading ? 'Sending your order…' : 'Send my words →'" />
            </button>

            <p className="text-center text-white/25 text-xs">
              No payment needed now — we&apos;ll send a secure payment link after reviewing your brief.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
