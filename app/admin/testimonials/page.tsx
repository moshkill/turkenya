'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, useCallback } from 'react'
import Icon from '@/components/Icon'
import AdminShell, { Me } from '@/components/admin/AdminShell'

type T = { id: number; name: string; location: string; service: string; rating: number; message: string; approved: boolean; featured: boolean; created_at: string }

function timeAgo(s: string) {
  const diff = (Date.now() - new Date(s).getTime()) / 1000
  if (diff < 3600) return Math.max(1, Math.floor(diff / 60)) + 'm ago'
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago'
  return Math.floor(diff / 86400) + 'd ago'
}

export default function AdminTestimonials() {
  const [me, setMe] = useState<Me>(null)
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<'pending' | 'approved' | 'all'>('pending')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [r, mr] = await Promise.all([fetch('/api/admin/testimonials'), fetch('/api/admin/me')])
      if (r.status === 401) { setAuthed(false); setLoading(false); return }
      const d = await r.json(); const md = await mr.json().catch(() => ({}))
      setItems(d.testimonials || []); setMe(md.user || null); setAuthed(true)
    } catch { /* ignore */ }
    setLoading(false)
  }, [])

  useEffect(() => { (async () => { await fetchData(); setChecking(false) })() }, [fetchData])

  async function patch(id: number, body: { approved?: boolean; featured?: boolean }) {
    await fetch('/api/admin/testimonials/' + id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).catch(() => {})
    fetchData()
  }
  async function remove(id: number) {
    if (!confirm('Delete this review permanently?')) return
    await fetch('/api/admin/testimonials/' + id, { method: 'DELETE' }).catch(() => {})
    setItems(prev => prev.filter(t => t.id !== id))
  }

  if (checking || !authed) return <AdminShell active="reviews" me={me} authed={authed} checking={checking} onAuth={() => fetchData()} />

  const pending = items.filter(t => !t.approved)
  const shown = tab === 'pending' ? pending : tab === 'approved' ? items.filter(t => t.approved) : items

  return (
    <AdminShell active="reviews" me={me} authed onAuth={() => fetchData()} onRefresh={fetchData} onLogout={() => { setAuthed(false); setMe(null) }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '30px 30px 60px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {([['pending', `Pending ${pending.length}`], ['approved', 'Approved'], ['all', 'All']] as const).map(([k, lbl]) => (
            <button key={k} onClick={() => setTab(k)} style={{ background: tab === k ? '#fff000' : 'rgba(255,255,255,0.05)', color: tab === k ? '#0a0a0a' : 'rgba(255,255,255,0.7)', border: 'none', padding: '8px 16px', borderRadius: 100, cursor: 'pointer', fontSize: 16, fontWeight: 700 }}>{lbl}</button>
          ))}
        </div>

        {loading && items.length === 0 ? <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>Loading…</div>
          : shown.length === 0 ? <div style={{ padding: 60, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>Nothing here.</div>
          : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {shown.map(t => (
                <div key={t.id} className="glass-card" style={{ borderRadius: 20, padding: 24, ...(t.featured ? { border: '1px solid rgba(255,240,0,0.4)' } : {}) }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ display: 'flex', gap: 2 }}>{Array.from({ length: 5 }, (_, i) => <span key={i} style={{ color: i < t.rating ? '#fff000' : 'rgba(255,255,255,0.18)', display: 'flex' }}><Icon name="star" size={14} /></span>)}</div>
                      <span style={{ fontWeight: 800, fontSize: 16 }}>{t.name}</span>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16 }}>{[t.location, t.service].filter(Boolean).join(' · ')}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {t.approved && <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 700 }}>Approved</span>}
                      {t.featured && <span style={{ fontSize: 12, color: '#fff000', fontWeight: 700 }}>★ Featured</span>}
                      <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.3)' }}>{timeAgo(t.created_at)}</span>
                    </div>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 16, lineHeight: 1.6, margin: '0 0 16px', fontStyle: 'italic' }}>&ldquo;{t.message}&rdquo;</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button onClick={() => patch(t.id, { approved: !t.approved })} style={{ display: 'flex', alignItems: 'center', gap: 6, background: t.approved ? 'rgba(255,255,255,0.06)' : 'rgba(34,197,94,0.15)', border: '1px solid ' + (t.approved ? 'rgba(255,255,255,0.12)' : 'rgba(34,197,94,0.4)'), color: t.approved ? 'rgba(255,255,255,0.75)' : '#22c55e', padding: '8px 14px', borderRadius: 100, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}><Icon name="check" size={14} />{t.approved ? 'Unapprove' : 'Approve'}</button>
                    <button onClick={() => patch(t.id, { featured: !t.featured })} style={{ display: 'flex', alignItems: 'center', gap: 6, background: t.featured ? 'rgba(255,240,0,0.14)' : 'rgba(255,255,255,0.06)', border: '1px solid ' + (t.featured ? 'rgba(255,240,0,0.4)' : 'rgba(255,255,255,0.12)'), color: t.featured ? '#fff000' : 'rgba(255,255,255,0.75)', padding: '8px 14px', borderRadius: 100, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}><Icon name="star" size={14} />{t.featured ? 'Unfeature' : 'Feature on homepage'}</button>
                    <button onClick={() => remove(t.id)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: '1px solid rgba(255,60,60,0.3)', color: '#ff6b6b', padding: '8px 14px', borderRadius: 100, fontSize: 16, fontWeight: 600, cursor: 'pointer', marginLeft: 'auto' }}><Icon name="trash" size={14} />Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </AdminShell>
  )
}
