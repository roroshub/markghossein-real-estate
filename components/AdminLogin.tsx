'use client'

import { useState } from 'react'

export function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        window.location.href = '/admin'
      } else {
        const j = await res.json().catch(() => ({}))
        setError(j.error || 'Login failed')
      }
    } catch {
      setError('Network error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="min-h-screen bg-ink-950 flex items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-[380px]">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gold-500 flex items-center justify-center">
            <span className="font-serif text-ink-950 text-sm font-semibold tracking-wider">MG</span>
          </div>
          <div>
            <p className="font-serif text-white text-[18px] leading-none">Blog Admin</p>
            <p className="text-white/40 text-[11px] tracking-wider uppercase mt-1">Mark Ghossein</p>
          </div>
        </div>

        <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="w-full bg-ink-850 border border-white/10 text-white px-4 py-3.5 text-[14px] outline-none focus:border-gold-500 transition-colors"
        />

        {error && <p className="text-red-400 text-[12px] mt-3">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="w-full mt-6 bg-gold-500 text-ink-950 py-3.5 text-[12px] font-semibold tracking-[0.14em] uppercase hover:bg-gold-300 transition-colors disabled:opacity-60"
        >
          {busy ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </main>
  )
}
