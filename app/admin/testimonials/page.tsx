'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Icon from '@/components/Icon'

type T = { id: number; name: string; location: string; service: string; rating: number; message: string; approved: boolean; featured: boolean; created_at: string }

function timeAgo(s: string) {
  const diff = (Date.now() - new Date(s).getTime()) / 1000
  if (diff < 3600) return Math.max(1, Math.floor(diff / 60)) + 'm ago'
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago'
  return Math.floor(diff / 86400) + 'd ago'
}

export default function AdminTestimonials() {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<'pending' | 'approved' | 'all'>('pending')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/admin/testimonials')
      if (r.status === 401) { setAuthed(false); setLoading(false); return }
      const d = await r.json()
      setItems(d.testimonials || []); setAuthed(true)
    } catch { setError('Connection failed') }
    setLoading(false)
  }, [])

  useEffect(() => { (async () => { await fetchData(); setChecking(false) })() }, [fetchData])

  async function login() {
    if (!input.trim()) return
    setError('')
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: input.trim() }) })
    if (!res.ok) { setError('Invalid password'); return }
    setInput(''); await fetchData()
  }

  async function patch(id: number, body: { approved?: boolean; featured?: boolean }) {
    await fetch('/api/admin/testimonials/' + id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).catch(() => {})
    fetchData()
  }
  async function remove(id: number) {
    if (!confirm('Delete this review permanently?')) return
    await fetch('/api/admin/testimonials/' + id, { method: 'DELETE' }).catch(() => {})
    setItems(prev => prev.filter(t => t.id !== id))
  }

  if (checking) return <main style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', fontFamily: "'Abel',sans-serif" }}>Loading…</main>

  if (!authed) return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Abel',sans-serif", padding: 20 }}>
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,240,0,0.18)', borderRadius: 20, padding: 44, width: '100%', maxWidth: 400, textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(255,240,0,0.1)', border: '1px solid rgba(255,240,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#fff000' }}><Icon name="lock" size={28} /></div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#fff000', marginBottom: 24, fontFamily: "'Urbanist',sans-serif" }}>Reviews — Admin</h1>
        {error && <div style={{ background: 'rgba(255,60,60,0.1)', border: '1px solid rgba(255,60,60,0.3)', color: '#ff6b6b', padding: 10, borderRadius: 8, fontSize: 14, marginBottom: 16 }}>{error}</div>}
        <input type="password" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} placeholder="Admin password" style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '13px 16px', color: '#fff', fontSize: 16, outline: 'none', boxSizing: 'border-box', marginBottom: 14, fontFamily: "'Abel',sans-serif" }} />
        <button onClick={login} className="glass-cta" style={{ width: '100%', padding: 14, fontWeight: 800, fontSize: 15, letterSpacing: 2, borderRadius: 100, cursor: 'pointer' }}>LOG IN</button>
      </div>
    </main>
  )

  const pending = items.filter(t => !t.approved)
  const shown = tab === 'pending' ? pending : tab === 'approved' ? items.filter(t => t.approved) : items

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Abel',sans-serif", color: '#fff' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(13,13,13,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,240,0,0.12)', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ fontWeight: 800, fontSize: 18, fontFamily: "'Urbanist',sans-serif" }}>Turkenya <span style={{ color: '#fff000' }}>CRM</span></span>
          <nav style={{ display: 'flex', gap: 6 }}>
            <Link href="/admin" style={{ padding: '7px 14px', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none', color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.04)' }}>Leads</Link>
            <span style={{ padding: '7px 14px', borderRadius: 100, fontSize: 14, fontWeight: 700, color: '#0a0a0a', background: '#fff000' }}>Reviews</span>
            <Link href="/admin/offers" style={{ padding: '7px 14px', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none', color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.04)' }}>Offers</Link>
          </nav>
        </div>
        <button onClick={() => fetchData()} className="glass-ghost" style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 16px', borderRadius: 100, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}><Icon name="refresh" size={15} /> Refresh</button>
      </header>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {([['pending', `Pending ${pending.length}`], ['approved', 'Approved'], ['all', 'All']] as const).map(([k, lbl]) => (
            <button key={k} onClick={() => setTab(k)} style={{ background: tab === k ? '#fff000' : 'rgba(255,255,255,0.05)', color: tab === k ? '#0a0a0a' : 'rgba(255,255,255,0.7)', border: 'none', padding: '8px 16px', borderRadius: 100, cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>{lbl}</button>
          ))}
        </div>

        {loading && items.length === 0 ? <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>Loading…</div>
          : shown.length === 0 ? <div style={{ padding: 60, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>Nothing here.</div>
          : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {shown.map(t => (
                <div key={t.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid ' + (t.featured ? 'rgba(255,240,0,0.35)' : 'rgba(255,255,255,0.07)'), borderRadius: 16, padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ display: 'flex', gap: 2 }}>{Array.from({ length: 5 }, (_, i) => <span key={i} style={{ color: i < t.rating ? '#fff000' : 'rgba(255,255,255,0.18)', display: 'flex' }}><Icon name="star" size={14} /></span>)}</div>
                      <span style={{ fontWeight: 800, fontSize: 16 }}>{t.name}</span>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>{[t.location, t.service].filter(Boolean).join(' · ')}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {t.approved && <span style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>Approved</span>}
                      {t.featured && <span style={{ fontSize: 11, color: '#fff000', fontWeight: 700 }}>★ Featured</span>}
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{timeAgo(t.created_at)}</span>
                    </div>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 16, lineHeight: 1.6, margin: '0 0 16px', fontStyle: 'italic' }}>&ldquo;{t.message}&rdquo;</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button onClick={() => patch(t.id, { approved: !t.approved })} style={{ display: 'flex', alignItems: 'center', gap: 6, background: t.approved ? 'rgba(255,255,255,0.06)' : 'rgba(34,197,94,0.15)', border: '1px solid ' + (t.approved ? 'rgba(255,255,255,0.12)' : 'rgba(34,197,94,0.4)'), color: t.approved ? 'rgba(255,255,255,0.75)' : '#22c55e', padding: '8px 14px', borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}><Icon name="check" size={14} />{t.approved ? 'Unapprove' : 'Approve'}</button>
                    <button onClick={() => patch(t.id, { featured: !t.featured })} style={{ display: 'flex', alignItems: 'center', gap: 6, background: t.featured ? 'rgba(255,240,0,0.14)' : 'rgba(255,255,255,0.06)', border: '1px solid ' + (t.featured ? 'rgba(255,240,0,0.4)' : 'rgba(255,255,255,0.12)'), color: t.featured ? '#fff000' : 'rgba(255,255,255,0.75)', padding: '8px 14px', borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}><Icon name="star" size={14} />{t.featured ? 'Unfeature' : 'Feature on homepage'}</button>
                    <button onClick={() => remove(t.id)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: '1px solid rgba(255,60,60,0.3)', color: '#ff6b6b', padding: '8px 14px', borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: 'pointer', marginLeft: 'auto' }}><Icon name="trash" size={14} />Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </main>
  )
}
