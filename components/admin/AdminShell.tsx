'use client'
import { useState } from 'react'
import Icon from '@/components/Icon'

export type Me = { id: number; name: string; email: string; role: string } | null

const NAV: { key: string; label: string; href: string }[] = [
  { key: 'leads', label: 'Leads', href: '/admin' },
  { key: 'reviews', label: 'Reviews', href: '/admin/testimonials' },
  { key: 'offers', label: 'Offers', href: '/admin/offers' },
  { key: 'team', label: 'Team', href: '/admin/team' },
]

const pill = (activeColor: boolean): React.CSSProperties => ({
  padding: '7px 14px', borderRadius: 100, fontSize: 15, fontWeight: 700, textDecoration: 'none',
  color: activeColor ? '#0a0a0a' : 'rgba(255,255,255,0.6)', background: activeColor ? '#fff000' : 'rgba(255,255,255,0.04)',
})

// Shared admin chrome: email/password login, identity-aware header + nav.
// Renders the login screen when not authed; children when authed.
export default function AdminShell({
  active, me, authed, checking, onAuth, onLogout, onRefresh, auto, setAuto, children,
}: {
  active: 'leads' | 'reviews' | 'offers' | 'team'
  me: Me
  authed: boolean
  checking?: boolean
  onAuth: () => void
  onLogout?: () => void
  onRefresh?: () => void
  auto?: boolean
  setAuto?: (v: boolean) => void
  children?: React.ReactNode
}) {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function login() {
    if (!email.trim() || !pw) return
    setBusy(true); setError('')
    try {
      const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email.trim(), password: pw }) })
      if (!res.ok) { const d = await res.json().catch(() => ({})); setError(d.error || 'Invalid email or password.'); setBusy(false); return }
      setPw(''); onAuth()
    } catch { setError('Connection failed.'); setBusy(false) }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {})
    if (onLogout) onLogout(); else window.location.href = '/admin'
  }

  if (checking) return <main style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', fontFamily: "'Abel',sans-serif" }}>Loading…</main>

  if (!authed) return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Abel',sans-serif", padding: 20 }}>
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,240,0,0.18)', borderRadius: 20, padding: 44, width: '100%', maxWidth: 400, textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(255,240,0,0.1)', border: '1px solid rgba(255,240,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#fff000' }}><Icon name="lock" size={28} /></div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff000', marginBottom: 6, fontFamily: "'Urbanist',sans-serif" }}>Turkenya CRM</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, marginBottom: 26 }}>Sign in to your account</p>
        {error && <div style={{ background: 'rgba(255,60,60,0.1)', border: '1px solid rgba(255,60,60,0.3)', color: '#ff6b6b', padding: 10, borderRadius: 8, fontSize: 15, marginBottom: 16 }}>{error}</div>}
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} placeholder="Email" autoComplete="username" style={inp} />
        <input type="password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} placeholder="Password" autoComplete="current-password" style={{ ...inp, marginBottom: 16 }} />
        <button onClick={login} disabled={busy} className="glass-cta" style={{ width: '100%', padding: 14, fontWeight: 800, fontSize: 15, letterSpacing: 2, borderRadius: 100, cursor: busy ? 'wait' : 'pointer', opacity: busy ? 0.6 : 1 }}>{busy ? 'SIGNING IN…' : 'LOG IN'}</button>
      </div>
    </main>
  )

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Abel',sans-serif", color: '#fff' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(13,13,13,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,240,0,0.12)', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60, gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0 }}>
          <span style={{ width: 30, height: 30, borderRadius: 8, background: '#fff000', color: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontFamily: "'Urbanist',sans-serif", flexShrink: 0 }}>T</span>
          <span style={{ fontWeight: 800, fontSize: 18, fontFamily: "'Urbanist',sans-serif", flexShrink: 0 }} className="desktop-nav">Turkenya <span style={{ color: '#fff000' }}>CRM</span></span>
          <nav style={{ display: 'flex', gap: 6, overflowX: 'auto' }}>
            {NAV.filter(n => n.key !== 'team' || me?.role === 'admin').map(n => (
              n.key === active
                ? <span key={n.key} style={{ ...pill(true), flexShrink: 0 }}>{n.label}</span>
                : <a key={n.key} href={n.href} style={{ ...pill(false), flexShrink: 0 }}>{n.label}</a>
            ))}
            <a href="/" target="_blank" rel="noopener noreferrer" style={{ ...pill(false), flexShrink: 0 }}>View Site ↗</a>
          </nav>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
          {me && <span className="desktop-nav" style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>{me.name.split(' ')[0]} · <span style={{ color: me.role === 'admin' ? '#fff000' : 'rgba(255,255,255,0.55)' }}>{me.role}</span></span>}
          {setAuto && <button onClick={() => setAuto(!auto)} title="Toggle auto-refresh (60s)" style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.65)', padding: '8px 14px', borderRadius: 100, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}><span className={auto ? 'admin-live' : ''} style={{ width: 8, height: 8, borderRadius: '50%', background: auto ? '#22c55e' : '#6b7280', display: 'inline-block' }} />{auto ? 'Live' : 'Paused'}</button>}
          {onRefresh && <button onClick={onRefresh} className="glass-ghost" style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 16px', borderRadius: 100, cursor: 'pointer', fontSize: 15, fontWeight: 600 }}><Icon name="refresh" size={15} /> <span className="desktop-nav">Refresh</span></button>}
          <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,60,60,0.1)', border: '1px solid rgba(255,60,60,0.3)', color: '#ff6b6b', padding: '8px 16px', borderRadius: 100, cursor: 'pointer', fontSize: 15, fontWeight: 600 }}><Icon name="logout" size={15} /> <span className="desktop-nav">Logout</span></button>
        </div>
      </header>
      {children}
    </main>
  )
}

const inp: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '13px 16px', color: '#fff', fontSize: 16, outline: 'none', boxSizing: 'border-box', marginBottom: 12, fontFamily: "'Abel',sans-serif" }
