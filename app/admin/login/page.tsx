'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError(authError.message)
      setLoading(false)
    } else {
      router.push('/admin/songs')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="flex items-end gap-[3px]">
            {([16, 26, 20, 30, 18] as number[]).map((h, i) => (
              <div
                key={i}
                className={`w-[3px] rounded-full ${i % 2 === 0 ? 'bg-k2' : 'bg-k3'}`}
                style={{ height: h }}
              />
            ))}
          </div>
          <span className="font-syne font-bold text-white text-xl tracking-wide">
            Solara Flames
          </span>
        </div>

        <div className="bg-navy3 border border-k1/20 rounded-2xl p-8">
          <h1 className="font-syne font-bold text-white text-2xl mb-1">Admin login</h1>
          <p className="text-white/40 text-sm mb-8">Sign in to manage songs, banners & orders.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@solaraflames.com"
                className="w-full bg-navy2 border border-k1/20 focus:border-k2 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 outline-none transition-colors duration-150"
                required
              />
            </div>

            <div>
              <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-navy2 border border-k1/20 focus:border-k2 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 outline-none transition-colors duration-150"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-300 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-k2 hover:bg-k1 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              )}
              {loading ? 'Signing in…' : 'Sign in →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
