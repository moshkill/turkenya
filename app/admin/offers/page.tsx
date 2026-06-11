'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Icon from '@/components/Icon'

type Offer = { id: number; title: string; category: string; image: string; price: string; duration: string; tagline: string; highlights: string; featured: boolean; active: boolean; sort: number; created_at: string }
type Draft = Omit<Offer, 'id' | 'created_at'>

const CATEGORIES = ['Safari', 'International']
const empty: Draft = { title: '', category: 'Safari', image: '', price: '', duration: '', tagline: '', highlights: '', featured: false, active: true, sort: 0 }
const input: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '11px 14px', color: '#fff', fontSize: 15, outline: 'none', boxSizing: 'border-box', fontFamily: "'Abel',sans-serif" }
const label: React.CSSProperties = { display: 'block', fontSize: 10.5, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: 1.5, marginBottom: 6, textTransform: 'uppercase' }

export default function AdminOffers() {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [items, setItems] = useState<Offer[]>([])
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState<number | 'new' | null>(null)
  const [draft, setDraft] = useState<Draft>(empty)
  const [saving, setSaving] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/admin/offers')
      if (r.status === 401) { setAuthed(false); setLoading(false); return }
      const d = await r.json()
      setItems(d.offers || []); setAuthed(true)
    } catch { setError('Connection failed') }
    setLoading(false)
  }, [])

  useEffect(() => { (async () => { await fetchData(); setChecking(false) })() }, [fetchData])

  async function login() {
    if (!pw.trim()) return
    setError('')
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw.trim() }) })
    if (!res.ok) { setError('Invalid password'); return }
    setPw(''); await fetchData()
  }

  function startNew() { setDraft(empty); setEditing('new'); setError('') }
  function startEdit(o: Offer) { const { id: _id, created_at: _c, ...rest } = o; setDraft(rest); setEditing(o.id); setError('') }

  async function save() {
    if (!draft.title.trim() || !draft.image.trim() || !draft.price.trim()) { setError('Title, image URL and price are required.'); return }
    setSaving(true); setError('')
    const isNew = editing === 'new'
    const res = await fetch(isNew ? '/api/admin/offers' : '/api/admin/offers/' + editing, {
      method: isNew ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(draft),
    }).catch(() => null)
    setSaving(false)
    if (!res || !res.ok) { setError('Save failed — try again.'); return }
    setEditing(null); fetchData()
  }

  async function toggle(o: Offer, field: 'active' | 'featured') {
    await fetch('/api/admin/offers/' + o.id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ [field]: !o[field] }) }).catch(() => {})
    fetchData()
  }
  async function remove(id: number) {
    if (!confirm('Delete this offer permanently?')) return
    await fetch('/api/admin/offers/' + id, { method: 'DELETE' }).catch(() => {})
    setItems(prev => prev.filter(o => o.id !== id))
  }

  if (checking) return <main style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', fontFamily: "'Abel',sans-serif" }}>Loading…</main>

  if (!authed) return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Abel',sans-serif", padding: 20 }}>
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,240,0,0.18)', borderRadius: 20, padding: 44, width: '100%', maxWidth: 400, textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(255,240,0,0.1)', border: '1px solid rgba(255,240,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#fff000' }}><Icon name="lock" size={28} /></div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#fff000', marginBottom: 24, fontFamily: "'Urbanist',sans-serif" }}>Offers — Admin</h1>
        {error && <div style={{ background: 'rgba(255,60,60,0.1)', border: '1px solid rgba(255,60,60,0.3)', color: '#ff6b6b', padding: 10, borderRadius: 8, fontSize: 14, marginBottom: 16 }}>{error}</div>}
        <input type="password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} placeholder="Admin password" style={{ ...input, marginBottom: 14 }} />
        <button onClick={login} className="glass-cta" style={{ width: '100%', padding: 14, fontWeight: 800, fontSize: 15, letterSpacing: 2, borderRadius: 100, cursor: 'pointer' }}>LOG IN</button>
      </div>
    </main>
  )

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Abel',sans-serif", color: '#fff' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(13,13,13,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,240,0,0.12)', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ fontWeight: 800, fontSize: 18, fontFamily: "'Urbanist',sans-serif" }}>Turkenya <span style={{ color: '#fff000' }}>CRM</span></span>
          <nav style={{ display: 'flex', gap: 6 }}>
            <Link href="/admin" style={{ padding: '7px 14px', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none', color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.04)' }}>Leads</Link>
            <Link href="/admin/testimonials" style={{ padding: '7px 14px', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none', color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.04)' }}>Reviews</Link>
            <span style={{ padding: '7px 14px', borderRadius: 100, fontSize: 14, fontWeight: 700, color: '#0a0a0a', background: '#fff000' }}>Offers</span>
          </nav>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={startNew} className="glass-cta" style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 18px', borderRadius: 100, cursor: 'pointer', fontSize: 14, fontWeight: 800 }}><Icon name="plus" size={15} /> New Offer</button>
          <button onClick={() => fetchData()} className="glass-ghost" style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 16px', borderRadius: 100, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}><Icon name="refresh" size={15} /> Refresh</button>
        </div>
      </header>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
        {/* editor */}
        {editing !== null && (
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,240,0,0.25)', borderRadius: 18, padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h2 style={{ fontSize: 19, fontWeight: 900, margin: 0, fontFamily: "'Urbanist',sans-serif" }}>{editing === 'new' ? 'New offer' : 'Edit offer'}</h2>
              <button onClick={() => setEditing(null)} aria-label="Close" style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="close" size={15} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 14 }}>
              <div style={{ gridColumn: '1 / -1' }}><span style={label}>Title *</span><input style={input} value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} placeholder="e.g. Maasai Mara Classic" /></div>
              <div><span style={label}>Category</span>
                <select className="tk-select" style={input} value={draft.category} onChange={e => setDraft({ ...draft, category: e.target.value })}>{CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select>
              </div>
              <div><span style={label}>Price (display) *</span><input style={input} value={draft.price} onChange={e => setDraft({ ...draft, price: e.target.value })} placeholder="From KES 45,000" /></div>
              <div><span style={label}>Duration</span><input style={input} value={draft.duration} onChange={e => setDraft({ ...draft, duration: e.target.value })} placeholder="3D / 2N" /></div>
              <div><span style={label}>Sort (lower first)</span><input type="number" style={input} value={draft.sort} onChange={e => setDraft({ ...draft, sort: parseInt(e.target.value || '0', 10) })} /></div>
              <div style={{ gridColumn: '1 / -1' }}><span style={label}>Image URL *</span><input style={input} value={draft.image} onChange={e => setDraft({ ...draft, image: e.target.value })} placeholder="https://…" /></div>
              <div style={{ gridColumn: '1 / -1' }}><span style={label}>Tagline</span><input style={input} value={draft.tagline} onChange={e => setDraft({ ...draft, tagline: e.target.value })} placeholder="One line that sells it" /></div>
              <div style={{ gridColumn: '1 / -1' }}><span style={label}>Highlights — one per line</span><textarea rows={4} style={{ ...input, resize: 'vertical' }} value={draft.highlights} onChange={e => setDraft({ ...draft, highlights: e.target.value })} placeholder={'Big Five game drives\nLuxury tented camp\nBush breakfast'} /></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 18 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, color: 'rgba(255,255,255,0.75)', cursor: 'pointer' }}><input type="checkbox" checked={draft.featured} onChange={e => setDraft({ ...draft, featured: e.target.checked })} /> ★ Best Value badge</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, color: 'rgba(255,255,255,0.75)', cursor: 'pointer' }}><input type="checkbox" checked={draft.active} onChange={e => setDraft({ ...draft, active: e.target.checked })} /> Active (visible on site)</label>
            </div>
            {draft.image.trim() && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={draft.image} alt="preview" style={{ width: 160, aspectRatio: '4 / 5', objectFit: 'cover', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', marginBottom: 18 }} onError={e => { e.currentTarget.style.display = 'none' }} />
            )}
            {error && <div style={{ background: 'rgba(255,60,60,0.08)', border: '1px solid rgba(255,60,60,0.2)', color: '#ff6b6b', padding: '10px 14px', borderRadius: 10, fontSize: 14, marginBottom: 14 }}>{error}</div>}
            <button onClick={save} disabled={saving} className="glass-cta" style={{ padding: '13px 34px', borderRadius: 100, fontSize: 15, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', cursor: saving ? 'wait' : 'pointer', opacity: saving ? 0.6 : 1 }}>{saving ? 'Saving…' : editing === 'new' ? 'Create Offer' : 'Save Changes'}</button>
          </div>
        )}

        {/* list */}
        {loading && items.length === 0 ? <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>Loading…</div>
          : items.length === 0 ? (
            <div style={{ padding: 60, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
              No offers yet — the site shows its built-in packages until you create some.<br />
              <button onClick={startNew} className="glass-cta" style={{ marginTop: 18, padding: '12px 28px', borderRadius: 100, fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>Create your first offer</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
              {items.map(o => (
                <div key={o.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid ' + (o.active ? 'rgba(255,255,255,0.08)' : 'rgba(255,60,60,0.25)'), borderRadius: 16, overflow: 'hidden', opacity: o.active ? 1 : 0.6 }}>
                  <div style={{ position: 'relative', height: 120 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={o.image} alt={o.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.currentTarget.style.opacity = '0' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.85), transparent 60%)' }} />
                    <div style={{ position: 'absolute', left: 12, bottom: 10, right: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 8 }}>
                      <span style={{ fontWeight: 900, fontSize: 16, fontFamily: "'Urbanist',sans-serif" }}>{o.title}</span>
                      <span style={{ color: '#fff000', fontWeight: 800, fontSize: 12.5, whiteSpace: 'nowrap' }}>{o.price}</span>
                    </div>
                    {o.featured && <span style={{ position: 'absolute', top: 10, right: 10, background: '#fff000', color: '#0a0a0a', fontSize: 9, fontWeight: 900, letterSpacing: 1, borderRadius: 6, padding: '3px 8px', textTransform: 'uppercase' }}>★ Featured</span>}
                  </div>
                  <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 700, marginRight: 'auto' }}>{o.category}{o.duration ? ' · ' + o.duration : ''}</span>
                    <button onClick={() => startEdit(o)} title="Edit" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.75)', padding: '6px 12px', borderRadius: 100, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => toggle(o, 'active')} style={{ background: o.active ? 'rgba(255,255,255,0.06)' : 'rgba(34,197,94,0.15)', border: '1px solid ' + (o.active ? 'rgba(255,255,255,0.12)' : 'rgba(34,197,94,0.4)'), color: o.active ? 'rgba(255,255,255,0.75)' : '#22c55e', padding: '6px 12px', borderRadius: 100, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{o.active ? 'Hide' : 'Publish'}</button>
                    <button onClick={() => remove(o.id)} title="Delete" style={{ background: 'none', border: '1px solid rgba(255,60,60,0.3)', color: '#ff6b6b', padding: '6px 10px', borderRadius: 100, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Icon name="trash" size={13} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </main>
  )
}
