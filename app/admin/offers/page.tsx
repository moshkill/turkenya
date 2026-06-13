'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, useCallback } from 'react'
import Icon from '@/components/Icon'
import AdminShell, { Me } from '@/components/admin/AdminShell'
import Dropdown from '@/components/admin/Dropdown'

type Offer = { id: number; title: string; category: string; image: string; price: string; duration: string; tagline: string; highlights: string; featured: boolean; active: boolean; sort: number; created_at: string }
type Draft = Omit<Offer, 'id' | 'created_at'>

const CATEGORIES = ['Safari', 'International']
const empty: Draft = { title: '', category: 'Safari', image: '', price: '', duration: '', tagline: '', highlights: '', featured: false, active: true, sort: 0 }
const input: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '11px 14px', color: '#fff', fontSize: 16, outline: 'none', boxSizing: 'border-box', fontFamily: "'Abel',sans-serif" }
const label: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: 1.5, marginBottom: 6, textTransform: 'uppercase' }

export default function AdminOffers() {
  const [me, setMe] = useState<Me>(null)
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [error, setError] = useState('')
  const [items, setItems] = useState<Offer[]>([])
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState<number | 'new' | null>(null)
  const [draft, setDraft] = useState<Draft>(empty)
  const [saving, setSaving] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [r, mr] = await Promise.all([fetch('/api/admin/offers'), fetch('/api/admin/me')])
      if (r.status === 401) { setAuthed(false); setLoading(false); return }
      const d = await r.json(); const md = await mr.json().catch(() => ({}))
      setItems(d.offers || []); setMe(md.user || null); setAuthed(true)
    } catch { /* ignore */ }
    setLoading(false)
  }, [])

  useEffect(() => { (async () => { await fetchData(); setChecking(false) })() }, [fetchData])

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

  if (checking || !authed) return <AdminShell active="offers" me={me} authed={authed} checking={checking} onAuth={() => fetchData()} />

  return (
    <AdminShell active="offers" me={me} authed onAuth={() => fetchData()} onRefresh={fetchData} onLogout={() => { setAuthed(false); setMe(null) }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '30px 30px 60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, gap: 12, flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: 22, fontWeight: 900, margin: 0, fontFamily: "'Urbanist',sans-serif" }}>Offers &amp; Packages</h1>
          <button onClick={startNew} className="glass-cta" style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 100, cursor: 'pointer', fontSize: 16, fontWeight: 800 }}><Icon name="plus" size={15} /> New Offer</button>
        </div>

        {editing !== null && (
          <div className="glass-card" style={{ border: '1px solid rgba(255,240,0,0.28)', padding: 28, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h2 style={{ fontSize: 19, fontWeight: 900, margin: 0, fontFamily: "'Urbanist',sans-serif" }}>{editing === 'new' ? 'New offer' : 'Edit offer'}</h2>
              <button onClick={() => setEditing(null)} aria-label="Close" style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="close" size={15} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 14 }}>
              <div style={{ gridColumn: '1 / -1' }}><span style={label}>Title *</span><input style={input} value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} placeholder="e.g. Maasai Mara Classic" /></div>
              <div><span style={label}>Category</span>
                <Dropdown full value={draft.category} onChange={v => setDraft({ ...draft, category: v })} options={CATEGORIES.map(c => ({ value: c, label: c }))} />
              </div>
              <div><span style={label}>Price (display) *</span><input style={input} value={draft.price} onChange={e => setDraft({ ...draft, price: e.target.value })} placeholder="From KES 45,000" /></div>
              <div><span style={label}>Duration</span><input style={input} value={draft.duration} onChange={e => setDraft({ ...draft, duration: e.target.value })} placeholder="3D / 2N" /></div>
              <div><span style={label}>Sort (lower first)</span><input type="number" style={input} value={draft.sort} onChange={e => setDraft({ ...draft, sort: parseInt(e.target.value || '0', 10) })} /></div>
              <div style={{ gridColumn: '1 / -1' }}><span style={label}>Image URL *</span><input style={input} value={draft.image} onChange={e => setDraft({ ...draft, image: e.target.value })} placeholder="https://…" /></div>
              <div style={{ gridColumn: '1 / -1' }}><span style={label}>Tagline</span><input style={input} value={draft.tagline} onChange={e => setDraft({ ...draft, tagline: e.target.value })} placeholder="One line that sells it" /></div>
              <div style={{ gridColumn: '1 / -1' }}><span style={label}>Highlights — one per line</span><textarea rows={4} style={{ ...input, resize: 'vertical' }} value={draft.highlights} onChange={e => setDraft({ ...draft, highlights: e.target.value })} placeholder={'Big Five game drives\nLuxury tented camp\nBush breakfast'} /></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 18 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, color: 'rgba(255,255,255,0.75)', cursor: 'pointer' }}><input type="checkbox" checked={draft.featured} onChange={e => setDraft({ ...draft, featured: e.target.checked })} /> ★ Best Value badge</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, color: 'rgba(255,255,255,0.75)', cursor: 'pointer' }}><input type="checkbox" checked={draft.active} onChange={e => setDraft({ ...draft, active: e.target.checked })} /> Active (visible on site)</label>
            </div>
            {draft.image.trim() && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={draft.image} alt="preview" style={{ width: 160, aspectRatio: '4 / 5', objectFit: 'cover', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', marginBottom: 18 }} onError={e => { e.currentTarget.style.display = 'none' }} />
            )}
            {error && <div style={{ background: 'rgba(255,60,60,0.08)', border: '1px solid rgba(255,60,60,0.2)', color: '#ff6b6b', padding: '10px 14px', borderRadius: 10, fontSize: 16, marginBottom: 14 }}>{error}</div>}
            <button onClick={save} disabled={saving} className="glass-cta" style={{ padding: '13px 34px', borderRadius: 100, fontSize: 16, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', cursor: saving ? 'wait' : 'pointer', opacity: saving ? 0.6 : 1 }}>{saving ? 'Saving…' : editing === 'new' ? 'Create Offer' : 'Save Changes'}</button>
          </div>
        )}

        {loading && items.length === 0 ? <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>Loading…</div>
          : items.length === 0 ? (
            <div style={{ padding: 60, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
              No offers yet — the site shows its built-in packages until you create some.<br />
              <button onClick={startNew} className="glass-cta" style={{ marginTop: 18, padding: '12px 28px', borderRadius: 100, fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>Create your first offer</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
              {items.map(o => (
                <div key={o.id} className="glass-card" style={{ borderRadius: 18, overflow: 'hidden', opacity: o.active ? 1 : 0.6, ...(o.active ? {} : { border: '1px solid rgba(255,60,60,0.3)' }) }}>
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
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 700, marginRight: 'auto' }}>{o.category}{o.duration ? ' · ' + o.duration : ''}</span>
                    <button onClick={() => startEdit(o)} title="Edit" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.75)', padding: '6px 12px', borderRadius: 100, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => toggle(o, 'active')} style={{ background: o.active ? 'rgba(255,255,255,0.06)' : 'rgba(34,197,94,0.15)', border: '1px solid ' + (o.active ? 'rgba(255,255,255,0.12)' : 'rgba(34,197,94,0.4)'), color: o.active ? 'rgba(255,255,255,0.75)' : '#22c55e', padding: '6px 12px', borderRadius: 100, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>{o.active ? 'Hide' : 'Publish'}</button>
                    <button onClick={() => remove(o.id)} title="Delete" style={{ background: 'none', border: '1px solid rgba(255,60,60,0.3)', color: '#ff6b6b', padding: '6px 10px', borderRadius: 100, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Icon name="trash" size={13} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </AdminShell>
  )
}
