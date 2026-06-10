'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, useCallback, useMemo } from 'react'

type Lead = { id: number; name: string; email: string; phone: string; service: string; message: string; travel_dates: string; source: string; status: string; created_at: string }
type Stats = Record<string, number>
const STATUS_COLORS: Record<string, string> = { new: '#fff000', contacted: '#3b82f6', converted: '#22c55e', closed: '#9ca3af', lost: '#ef4444' }
const STATUSES = ['new', 'contacted', 'converted', 'closed', 'lost']

function timeAgo(s: string) {
  const d = new Date(s); const diff = (Date.now() - d.getTime()) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago'
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago'
  if (diff < 604800) return Math.floor(diff / 86400) + 'd ago'
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
const waLink = (p: string) => 'https://wa.me/' + p.replace(/[^0-9]/g, '')

// Friendly label + icon + colour for each lead source written by the site.
function sourceMeta(s: string): { label: string; icon: string; color: string } {
  const map: Record<string, { label: string; icon: string; color: string }> = {
    contact: { label: 'Contact Form', icon: '✉️', color: '#3b82f6' },
    quote: { label: 'Quote Builder', icon: '🧮', color: '#a855f7' },
    'smartbook-flights': { label: 'Smart · Flights', icon: '✈️', color: '#fff000' },
    'smartbook-car-hire': { label: 'Smart · Car Hire', icon: '🚗', color: '#22c55e' },
    'smartbook-safari': { label: 'Smart · Safari', icon: '🦁', color: '#f59e0b' },
    'smartbook-international': { label: 'Smart · International', icon: '🌍', color: '#06b6d4' },
    'smartbook-logistics': { label: 'Smart · Logistics', icon: '🚛', color: '#ef4444' },
  }
  return map[s] || { label: s || 'Other', icon: '•', color: '#9ca3af' }
}

function dayBucket(s: string) {
  const d = new Date(s).getTime(); const now = new Date()
  const day = 86400000
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  if (d >= startToday) return 'Today'
  if (d >= startToday - day) return 'Yesterday'
  if (d >= startToday - 6 * day) return 'This week'
  if (d >= startToday - 29 * day) return 'This month'
  return 'Earlier'
}
const isToday = (s: string) => dayBucket(s) === 'Today'
const within7 = (s: string) => { const now = new Date(); const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(); return new Date(s).getTime() >= startToday - 6 * 86400000 }

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [input, setInput] = useState('')
  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<Stats>({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [srcFilter, setSrcFilter] = useState('all')
  const [sort, setSort] = useState<'new' | 'old'>('new')
  const [search, setSearch] = useState('')
  const [updating, setUpdating] = useState<number | null>(null)
  const [selected, setSelected] = useState<Lead | null>(null)
  const [auto, setAuto] = useState(true)
  const [toast, setToast] = useState('')

  const fetchData = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const [lr, sr] = await Promise.all([fetch('/api/admin/leads'), fetch('/api/admin/stats')])
      if (lr.status === 401) { setAuthed(false); setLoading(false); return false }
      const ld = await lr.json(); const sd = await sr.json()
      setLeads(ld.leads || [])
      const sm: Stats = {}
      if (Array.isArray(sd)) sd.forEach((x: { status: string; count: string }) => { sm[x.status] = parseInt(x.count) })
      setStats(sm); setAuthed(true); setLoading(false); return true
    } catch { setError('Connection failed'); setLoading(false); return false }
  }, [])

  useEffect(() => { (async () => { await fetchData(); setChecking(false) })() }, [fetchData])

  // keep the open lead in sync after a refresh; drop it if it was deleted elsewhere
  useEffect(() => {
    setSelected(prev => prev ? (leads.find(l => l.id === prev.id) || null) : prev)
  }, [leads])

  // auto-refresh while the tab is visible
  useEffect(() => {
    if (!authed || !auto) return
    const id = setInterval(() => { if (!document.hidden) fetchData() }, 60000)
    return () => clearInterval(id)
  }, [authed, auto, fetchData])

  const displayed = useMemo(() => {
    const q = search.trim().toLowerCase()
    const arr = leads
      .filter(l => filter === 'all' || l.status === filter)
      .filter(l => srcFilter === 'all' || l.source === srcFilter)
      .filter(l => !q || [l.name, l.phone, l.email, l.service, l.message, sourceMeta(l.source).label].some(v => (v || '').toLowerCase().includes(q)))
    arr.sort((a, b) => sort === 'new'
      ? +new Date(b.created_at) - +new Date(a.created_at)
      : +new Date(a.created_at) - +new Date(b.created_at))
    return arr
  }, [leads, filter, srcFilter, search, sort])

  // keyboard navigation: ↑/↓ move between leads, Esc closes
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName
      if (e.key === 'Escape') { setSelected(null); return }
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
      e.preventDefault()
      if (!displayed.length) return
      const i = selected ? displayed.findIndex(l => l.id === selected.id) : -1
      let ni = e.key === 'ArrowDown' ? i + 1 : i - 1
      ni = Math.max(0, Math.min(displayed.length - 1, ni))
      setSelected(displayed[ni])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [displayed, selected])

  async function login() {
    if (!input.trim()) return
    setError('')
    try {
      const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: input.trim() }) })
      if (!res.ok) { setError('Invalid password'); return }
      setInput(''); await fetchData()
    } catch { setError('Connection failed') }
  }
  async function logout() { await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {}); setAuthed(false); setLeads([]); setStats({}); setSelected(null) }

  async function updateStatus(id: number, status: string) {
    setUpdating(id)
    await fetch('/api/admin/leads/' + id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) }).catch(() => {})
    const old = leads.find(l => l.id === id)?.status || 'new'
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
    setSelected(prev => prev && prev.id === id ? { ...prev, status } : prev)
    setStats(prev => ({ ...prev, [old]: Math.max(0, (prev[old] || 1) - 1), [status]: (prev[status] || 0) + 1 }))
    setUpdating(null)
  }

  async function deleteLead(id: number) {
    if (!confirm('Delete this lead permanently?')) return
    await fetch('/api/admin/leads/' + id, { method: 'DELETE' }).catch(() => {})
    const s = leads.find(l => l.id === id)?.status
    setLeads(prev => prev.filter(l => l.id !== id))
    if (s) setStats(prev => ({ ...prev, [s]: Math.max(0, (prev[s] || 1) - 1) }))
    setSelected(null)
  }

  function flash(msg: string) { setToast(msg); window.setTimeout(() => setToast(''), 1800) }
  async function copy(text: string, label: string) {
    try { await navigator.clipboard.writeText(text); flash(label + ' copied') } catch { flash('Copy failed') }
  }

  function exportCSV() {
    const cols: (keyof Lead)[] = ['id', 'name', 'phone', 'email', 'service', 'source', 'status', 'travel_dates', 'created_at', 'message']
    const esc = (v: unknown) => '"' + String(v ?? '').replace(/"/g, '""') + '"'
    const rows = [cols.join(',')].concat(displayed.map(l => cols.map(c => esc(l[c])).join(',')))
    const blob = new Blob([rows.join('\r\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'turkenya-leads-' + new Date().toISOString().slice(0, 10) + '.csv'
    a.click(); URL.revokeObjectURL(url)
    flash(displayed.length + ' leads exported')
  }

  const total = leads.length
  const todayCount = leads.filter(l => isToday(l.created_at)).length
  const weekCount = leads.filter(l => within7(l.created_at)).length

  // distinct sources present, for the filter dropdown
  const sources = Array.from(new Set(leads.map(l => l.source).filter(Boolean)))

  // ---------- loading / login ----------
  if (checking) return <main style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', fontFamily: "'Abel',sans-serif" }}>Loading…</main>

  if (!authed) return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Abel',sans-serif", padding: 20 }}>
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,240,0,0.18)', borderRadius: 20, padding: 44, width: '100%', maxWidth: 400, textAlign: 'center' }}>
        <div style={{ fontSize: 44, marginBottom: 14 }}>🔐</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff000', marginBottom: 6, fontFamily: "'Urbanist',sans-serif" }}>Turkenya CRM</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, marginBottom: 28 }}>Admin access</p>
        {error && <div style={{ background: 'rgba(255,60,60,0.1)', border: '1px solid rgba(255,60,60,0.3)', color: '#ff6b6b', padding: 10, borderRadius: 8, fontSize: 13, marginBottom: 16 }}>{error}</div>}
        <input type="password" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} placeholder="Enter admin password" style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '13px 16px', color: '#fff', fontSize: 15, outline: 'none', boxSizing: 'border-box', marginBottom: 14, fontFamily: "'Abel',sans-serif" }} />
        <button onClick={login} className="glass-cta" style={{ width: '100%', padding: 14, fontWeight: 800, fontSize: 14, letterSpacing: 2, borderRadius: 100, cursor: 'pointer' }}>LOG IN</button>
      </div>
    </main>
  )

  const tiles = [
    { label: 'Total', value: total, color: '#fff000' },
    { label: 'New', value: stats.new || 0, color: '#fff000' },
    { label: 'Today', value: todayCount, color: '#06b6d4' },
    { label: 'This Week', value: weekCount, color: '#3b82f6' },
    { label: 'Converted', value: stats.converted || 0, color: '#22c55e' },
    { label: 'Conv. Rate', value: total > 0 ? Math.round(((stats.converted || 0) / total) * 100) + '%' : '0%', color: '#a855f7' },
  ]

  const selSrc = selected ? sourceMeta(selected.source) : null

  // build the list with date-group headers
  const listItems: React.ReactNode[] = []
  let lastBucket = ''
  displayed.forEach(l => {
    const b = dayBucket(l.created_at)
    if (b !== lastBucket) {
      listItems.push(<div key={'b-' + b} style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', padding: '12px 6px 6px' }}>{b}</div>)
      lastBucket = b
    }
    const sm = sourceMeta(l.source)
    listItems.push(
      <button key={l.id} onClick={() => setSelected(l)} className={'admin-lead' + (selected?.id === l.id ? ' active' : '')} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '12px 14px', marginBottom: 8, cursor: 'pointer', color: '#fff', transition: 'all 0.15s' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <span style={{ fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.name || 'Unknown'}</span>
          <span style={{ flexShrink: 0, width: 8, height: 8, borderRadius: '50%', background: STATUS_COLORS[l.status] || '#888' }} />
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 4, display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <span style={{ color: '#fff000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.service || '—'}</span>
          <span style={{ flexShrink: 0 }}>{timeAgo(l.created_at)}</span>
        </div>
        <div style={{ marginTop: 7, display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10.5, fontWeight: 700, color: sm.color, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 100, padding: '2px 8px' }}>
          <span>{sm.icon}</span>{sm.label}
        </div>
      </button>
    )
  })

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Abel',sans-serif", color: '#fff' }}>
      {/* top bar */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(13,13,13,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,240,0,0.12)', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 30, height: 30, borderRadius: 8, background: '#fff000', color: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontFamily: "'Urbanist',sans-serif" }}>T</span>
          <span style={{ fontWeight: 800, fontSize: 18, fontFamily: "'Urbanist',sans-serif" }}>Turkenya <span style={{ color: '#fff000' }}>CRM</span></span>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button onClick={() => setAuto(a => !a)} title="Toggle auto-refresh (60s)" style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.65)', padding: '8px 14px', borderRadius: 100, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
            <span className={auto ? 'admin-live' : ''} style={{ width: 8, height: 8, borderRadius: '50%', background: auto ? '#22c55e' : '#6b7280', display: 'inline-block' }} />
            {auto ? 'Live' : 'Paused'}
          </button>
          <button onClick={() => fetchData()} className="glass-ghost" style={{ padding: '8px 16px', borderRadius: 100, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>↻ Refresh</button>
          <button onClick={logout} style={{ background: 'rgba(255,60,60,0.1)', border: '1px solid rgba(255,60,60,0.3)', color: '#ff6b6b', padding: '8px 16px', borderRadius: 100, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Logout</button>
        </div>
      </header>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px' }}>
        {/* stat tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 14, marginBottom: 24 }}>
          {tiles.map(t => (
            <div key={t.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '20px 22px' }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: t.color, lineHeight: 1, fontFamily: "'Urbanist',sans-serif" }}>{loading && !total ? '…' : t.value}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 8, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600 }}>{t.label}</div>
            </div>
          ))}
        </div>

        <div className="admin-split">
          {/* LIST */}
          <aside className="admin-list" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 12 }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, phone, service, source…" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '11px 14px', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box', marginBottom: 10, fontFamily: "'Abel',sans-serif" }} />

            {/* status chips */}
            <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8, marginBottom: 8 }}>
              {['all', ...STATUSES].map(s => (
                <button key={s} onClick={() => setFilter(s)} style={{ flexShrink: 0, background: filter === s ? '#fff000' : 'rgba(255,255,255,0.05)', color: filter === s ? '#0a0a0a' : 'rgba(255,255,255,0.7)', border: 'none', padding: '6px 12px', borderRadius: 100, cursor: 'pointer', fontSize: 12, fontWeight: 700, textTransform: 'capitalize', whiteSpace: 'nowrap' }}>
                  {s}{s === 'all' ? ` ${total}` : stats[s] ? ` ${stats[s]}` : ''}
                </button>
              ))}
            </div>

            {/* source + sort + export */}
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 10, flexWrap: 'wrap' }}>
              <select value={srcFilter} onChange={e => setSrcFilter(e.target.value)} style={{ flex: 1, minWidth: 120, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '8px 10px', color: '#fff', fontSize: 12, outline: 'none', fontFamily: "'Abel',sans-serif", cursor: 'pointer' }}>
                <option value="all">All sources</option>
                {sources.map(s => <option key={s} value={s}>{sourceMeta(s).label}</option>)}
              </select>
              <button onClick={() => setSort(s => s === 'new' ? 'old' : 'new')} title="Toggle sort order" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', borderRadius: 8, padding: '8px 10px', cursor: 'pointer', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>
                {sort === 'new' ? '↓ Newest' : '↑ Oldest'}
              </button>
              <button onClick={exportCSV} title="Export filtered leads to CSV" style={{ background: 'rgba(255,240,0,0.08)', border: '1px solid rgba(255,240,0,0.25)', color: '#fff000', borderRadius: 8, padding: '8px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>⬇ CSV</button>
            </div>

            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', padding: '0 4px 6px' }}>{displayed.length} showing{displayed.length !== total ? ` of ${total}` : ''}</div>

            {loading && !total ? (
              <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>Loading…</div>
            ) : displayed.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>No leads found.</div>
            ) : listItems}
          </aside>

          {/* DETAIL */}
          <section className={'admin-detail' + (selected ? '' : ' empty')} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: selected ? 28 : 60, minHeight: 400 }}>
            {!selected ? (
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.35)', paddingTop: 60 }}>
                <div style={{ fontSize: 48, marginBottom: 14 }}>📨</div>
                <p style={{ fontSize: 15 }}>Select a lead to see the full enquiry.</p>
                <p style={{ fontSize: 12, marginTop: 8, color: 'rgba(255,255,255,0.25)' }}>Tip: use ↑ / ↓ to move between leads, Esc to close.</p>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
                  <div>
                    <h2 style={{ fontSize: 26, fontWeight: 900, margin: 0, fontFamily: "'Urbanist',sans-serif" }}>{selected.name || 'Unknown'}</h2>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>#{selected.id} · {timeAgo(selected.created_at)} · {new Date(selected.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                  <button onClick={() => setSelected(null)} aria-label="Close" style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: 16, cursor: 'pointer' }}>✕</button>
                </div>

                {/* contact actions */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, margin: '18px 0 24px', alignItems: 'center' }}>
                  {selected.phone && <a href={waLink(selected.phone)} target="_blank" rel="noopener noreferrer" className="glass-wa" style={{ padding: '10px 18px', borderRadius: 100, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>WhatsApp</a>}
                  {selected.phone && <a href={'tel:' + selected.phone} className="glass-ghost" style={{ padding: '10px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>📞 {selected.phone}</a>}
                  {selected.phone && <button onClick={() => copy(selected.phone, 'Phone')} title="Copy number" style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: 14 }}>⧉</button>}
                  {selected.email && <a href={'mailto:' + selected.email} className="glass-ghost" style={{ padding: '10px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>✉ Email</a>}
                  {selected.email && <button onClick={() => copy(selected.email, 'Email')} title="Copy email" style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: 14 }}>⧉</button>}
                </div>

                {/* meta */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
                  <span style={{ background: 'rgba(255,240,0,0.1)', color: '#fff000', border: '1px solid rgba(255,240,0,0.3)', padding: '6px 14px', borderRadius: 100, fontSize: 13, fontWeight: 700 }}>{selected.service || 'General'}</span>
                  {selSrc && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.05)', color: selSrc.color, border: '1px solid rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: 100, fontSize: 13, fontWeight: 700 }}>{selSrc.icon} {selSrc.label}</span>}
                  {selected.travel_dates && <span style={{ background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: 100, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>📅 {selected.travel_dates}</span>}
                </div>

                {/* formatted enquiry */}
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Enquiry details</div>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 18, marginBottom: 26 }}>
                  {(selected.message || '—').split('\n').map((line, i) => {
                    const idx = line.indexOf(': ')
                    if (i === 0 && idx < 0) return <div key={i} style={{ fontWeight: 800, color: '#fff000', fontSize: 13, letterSpacing: 1, marginBottom: 10, fontFamily: "'Urbanist',sans-serif" }}>{line}</div>
                    if (idx > 0) return (
                      <div key={i} style={{ display: 'flex', gap: 12, padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ minWidth: 110, color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>{line.slice(0, idx)}</span>
                        <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{line.slice(idx + 2)}</span>
                      </div>
                    )
                    return <div key={i} style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.7 }}>{line}</div>
                  })}
                </div>

                {/* status control */}
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Status</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                  {STATUSES.map(s => (
                    <button key={s} disabled={updating === selected.id} onClick={() => updateStatus(selected.id, s)} style={{ padding: '9px 16px', borderRadius: 100, fontSize: 13, fontWeight: 700, textTransform: 'capitalize', cursor: 'pointer', border: '1px solid ' + (selected.status === s ? (STATUS_COLORS[s] || '#fff') : 'rgba(255,255,255,0.12)'), background: selected.status === s ? (STATUS_COLORS[s] || '#fff') : 'transparent', color: selected.status === s ? '#0a0a0a' : 'rgba(255,255,255,0.7)' }}>{s}</button>
                  ))}
                </div>

                <button onClick={() => deleteLead(selected.id)} style={{ background: 'none', border: '1px solid rgba(255,60,60,0.3)', color: '#ff6b6b', padding: '10px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Delete lead</button>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 200, background: 'rgba(20,20,20,0.96)', border: '1px solid rgba(255,240,0,0.3)', color: '#fff', padding: '11px 22px', borderRadius: 100, fontSize: 13, fontWeight: 600, boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>{toast}</div>
      )}
    </main>
  )
}
