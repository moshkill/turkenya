'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, useCallback, useMemo } from 'react'
import Icon, { IconName } from '@/components/Icon'
import AdminShell, { Me } from '@/components/admin/AdminShell'

type Lead = { id: number; name: string; email: string; phone: string; service: string; message: string; travel_dates: string; source: string; status: string; assigned_to_id: number | null; assigned_to_name: string; created_at: string }
type Staff = { id: number; name: string; email: string; role: string; active: boolean }
type Stats = Record<string, number>
const STATUS_COLORS: Record<string, string> = { new: '#fff000', contacted: '#3b82f6', converted: '#22c55e', closed: '#9ca3af', lost: '#ef4444' }
const STATUSES = ['new', 'contacted', 'converted', 'closed', 'lost']
const SVC_ICON: Record<string, IconName> = { 'Air Ticketing': 'plane', 'Car Hire': 'car', Safari: 'compass', International: 'globe', Logistics: 'truck', 'Hotel Booking': 'bed', 'Airport Transfers': 'car', Conferences: 'users', 'Pilgrimage Tours': 'compass', 'Pilgrimage': 'compass' }

function timeAgo(s: string) {
  const d = new Date(s); const diff = (Date.now() - d.getTime()) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago'
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago'
  if (diff < 604800) return Math.floor(diff / 86400) + 'd ago'
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
const waLink = (p: string) => 'https://wa.me/' + p.replace(/[^0-9]/g, '')
const firstName = (n: string) => (n || '').trim().split(/\s+/)[0] || ''

function sourceMeta(s: string): { label: string; icon: IconName; color: string } {
  const map: Record<string, { label: string; icon: IconName; color: string }> = {
    contact: { label: 'Contact Form', icon: 'mail', color: '#3b82f6' },
    quote: { label: 'Quote Builder', icon: 'file-text', color: '#a855f7' },
    'smartbook-flights': { label: 'Smart · Flights', icon: 'plane', color: '#fff000' },
    'smartbook-car-hire': { label: 'Smart · Car Hire', icon: 'car', color: '#22c55e' },
    'smartbook-safari': { label: 'Smart · Safari', icon: 'compass', color: '#f59e0b' },
    'smartbook-international': { label: 'Smart · International', icon: 'globe', color: '#06b6d4' },
    'smartbook-logistics': { label: 'Smart · Logistics', icon: 'truck', color: '#ef4444' },
  }
  return map[s] || { label: s || 'Other', icon: 'sparkle', color: '#9ca3af' }
}

function dayBucket(s: string) {
  const d = new Date(s).getTime(); const now = new Date(); const day = 86400000
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  if (d >= startToday) return 'Today'
  if (d >= startToday - day) return 'Yesterday'
  if (d >= startToday - 6 * day) return 'This week'
  if (d >= startToday - 29 * day) return 'This month'
  return 'Earlier'
}
const within7 = (s: string) => { const now = new Date(); const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(); return new Date(s).getTime() >= startToday - 6 * 86400000 }

const CARD: React.CSSProperties = { background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 22 }
const CARD_LABEL: React.CSSProperties = { fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }

function Donut({ data, total }: { data: { key: string; value: number; color: string }[]; total: number }) {
  const R = 54, S = 15, C = 2 * Math.PI * R; let acc = 0
  return (
    <svg viewBox="0 0 140 140" style={{ width: 134, height: 134, flexShrink: 0 }}>
      <circle cx={70} cy={70} r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={S} />
      {data.map(d => { const frac = total ? d.value / total : 0; const dash = frac * C; const el = <circle key={d.key} cx={70} cy={70} r={R} fill="none" stroke={d.color} strokeWidth={S} strokeDasharray={`${dash} ${C - dash}`} strokeDashoffset={-acc} transform="rotate(-90 70 70)" />; acc += dash; return el })}
      <text x={70} y={66} textAnchor="middle" fontSize={32} fontWeight={900} fill="#fff" fontFamily="'Urbanist',sans-serif">{total}</text>
      <text x={70} y={86} textAnchor="middle" fontSize={10} fill="rgba(255,255,255,0.45)" letterSpacing={2}>LEADS</text>
    </svg>
  )
}
function Sparkline({ values, color = '#fff000' }: { values: number[]; color?: string }) {
  const w = 260, h = 72, max = Math.max(1, ...values), n = Math.max(1, values.length - 1)
  const pts = values.map((v, i) => [(i / n) * w, h - (v / max) * (h - 14) - 6] as [number, number])
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: '100%', height: 72, display: 'block' }}>
      <defs><linearGradient id="sparkfill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.32" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <path d={`${line} L${w},${h} L0,${h} Z`} fill="url(#sparkfill)" />
      <path d={line} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 3.5 : 2.2} fill={color} />)}
    </svg>
  )
}

export default function AdminLeadsPage() {
  const [me, setMe] = useState<Me | null>(null)
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [leads, setLeads] = useState<Lead[]>([])
  const [users, setUsers] = useState<Staff[]>([])
  const [stats, setStats] = useState<Stats>({})
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('all')
  const [svc, setSvc] = useState('all')
  const [srcFilter, setSrcFilter] = useState('all')
  const [scope, setScope] = useState<'all' | 'mine' | 'unassigned'>('all')
  const [sort, setSort] = useState<'new' | 'old'>('new')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 25
  const [selected, setSelected] = useState<Lead | null>(null)
  const [auto, setAuto] = useState(true)
  const [toast, setToast] = useState('')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [lr, sr, mr, ur] = await Promise.all([
        fetch('/api/admin/leads'), fetch('/api/admin/stats'), fetch('/api/admin/me'), fetch('/api/admin/users'),
      ])
      if (lr.status === 401) { setAuthed(false); setLoading(false); return }
      const ld = await lr.json(); const sd = await sr.json()
      const md = await mr.json().catch(() => ({})); const ud = await ur.json().catch(() => ({}))
      setLeads(ld.leads || [])
      const sm: Stats = {}
      if (Array.isArray(sd)) sd.forEach((x: { status: string; count: string }) => { sm[x.status] = parseInt(x.count) })
      setStats(sm); setMe(md.user || null); setUsers(ud.users || []); setAuthed(true)
    } catch { /* ignore */ }
    setLoading(false)
  }, [])

  useEffect(() => { (async () => { await fetchData(); setChecking(false) })() }, [fetchData])
  useEffect(() => { setSelected(prev => prev ? (leads.find(l => l.id === prev.id) || null) : prev) }, [leads])
  useEffect(() => {
    if (!authed || !auto) return
    const id = setInterval(() => { if (!document.hidden) fetchData() }, 60000)
    return () => clearInterval(id)
  }, [authed, auto, fetchData])

  const displayed = useMemo(() => {
    const q = search.trim().toLowerCase()
    const arr = leads
      .filter(l => status === 'all' || l.status === status)
      .filter(l => svc === 'all' || (l.service || 'Other') === svc)
      .filter(l => srcFilter === 'all' || l.source === srcFilter)
      .filter(l => scope === 'all' || (scope === 'mine' ? (me && l.assigned_to_id === me.id) : !l.assigned_to_id))
      .filter(l => !q || [l.name, l.phone, l.email, l.service, l.message, l.assigned_to_name].some(v => (v || '').toLowerCase().includes(q)))
    arr.sort((a, b) => sort === 'new' ? +new Date(b.created_at) - +new Date(a.created_at) : +new Date(a.created_at) - +new Date(b.created_at))
    return arr
  }, [leads, status, svc, srcFilter, scope, search, sort, me])

  // back to page 1 whenever the filter set changes — never strand the user on an empty page
  useEffect(() => { setPage(1) }, [status, svc, srcFilter, scope, search, sort])
  const pageCount = Math.max(1, Math.ceil(displayed.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const pageStart = (safePage - 1) * PAGE_SIZE
  const pageItems = displayed.slice(pageStart, pageStart + PAGE_SIZE)

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
      setPage(Math.floor(ni / PAGE_SIZE) + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [displayed, selected])

  async function updateStatus(id: number, st: string) {
    await fetch('/api/admin/leads/' + id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: st }) }).catch(() => {})
    const old = leads.find(l => l.id === id)?.status || 'new'
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: st } : l))
    setSelected(prev => prev && prev.id === id ? { ...prev, status: st } : prev)
    setStats(prev => ({ ...prev, [old]: Math.max(0, (prev[old] || 1) - 1), [st]: (prev[st] || 0) + 1 }))
  }

  async function assign(id: number, assignedToId: number | null) {
    await fetch('/api/admin/leads/' + id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ assignedToId }) }).catch(() => {})
    const name = assignedToId ? (users.find(u => u.id === assignedToId)?.name || '') : ''
    setLeads(prev => prev.map(l => l.id === id ? { ...l, assigned_to_id: assignedToId, assigned_to_name: name } : l))
    setSelected(prev => prev && prev.id === id ? { ...prev, assigned_to_id: assignedToId, assigned_to_name: name } : prev)
    flash(assignedToId ? 'Assigned to ' + firstName(name) : 'Unassigned')
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
  async function copy(text: string, label: string) { try { await navigator.clipboard.writeText(text); flash(label + ' copied') } catch { flash('Copy failed') } }

  function exportCSV() {
    const cols: (keyof Lead)[] = ['id', 'name', 'phone', 'email', 'service', 'source', 'status', 'assigned_to_name', 'travel_dates', 'created_at', 'message']
    const esc = (v: unknown) => '"' + String(v ?? '').replace(/"/g, '""') + '"'
    const rows = [cols.join(',')].concat(displayed.map(l => cols.map(c => esc(l[c])).join(',')))
    const blob = new Blob([rows.join('\r\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob); const a = document.createElement('a')
    a.href = url; a.download = 'turkenya-leads-' + new Date().toISOString().slice(0, 10) + '.csv'; a.click(); URL.revokeObjectURL(url)
    flash(displayed.length + ' leads exported')
  }

  if (checking || !authed) return <AdminShell active="leads" me={me} onAuth={() => fetchData()} authed={authed} checking={checking} />

  const total = leads.length
  const weekCount = leads.filter(l => within7(l.created_at)).length
  const todayCount = leads.filter(l => dayBucket(l.created_at) === 'Today').length
  const unassignedCount = leads.filter(l => !l.assigned_to_id).length
  const mineCount = me ? leads.filter(l => l.assigned_to_id === me.id).length : 0
  const sources = Array.from(new Set(leads.map(l => l.source).filter(Boolean)))
  const servicesList = Array.from(new Set(leads.map(l => l.service || 'Other').filter(Boolean))).sort()

  // analytics
  const statusData = STATUSES.map(s => ({ key: s, value: leads.filter(l => l.status === s).length, color: STATUS_COLORS[s] })).filter(d => d.value > 0)
  const now2 = new Date(); const startToday2 = new Date(now2.getFullYear(), now2.getMonth(), now2.getDate()).getTime()
  const days = Array.from({ length: 7 }, (_, k) => { const ts = startToday2 - (6 - k) * 86400000; return { ts, label: new Date(ts).toLocaleDateString('en-GB', { weekday: 'short' }).charAt(0) } })
  const dayCounts = days.map(d => leads.filter(l => { const t = new Date(l.created_at).getTime(); return t >= d.ts && t < d.ts + 86400000 }).length)
  const convRate = total > 0 ? Math.round(((stats.converted || 0) / total) * 100) : 0
  const selSrc = selected ? sourceMeta(selected.source) : null
  const activeStaff = users.filter(u => u.active)

  // service category tabs (primary organizer) — show every category we offer,
  // even at zero, plus any unexpected services that appear in the data.
  const CANON_SERVICES = ['Air Ticketing', 'Safari', 'International', 'Car Hire', 'Logistics', 'Hotel Booking', 'Pilgrimage', 'Conferences', 'Airport Transfers']
  const tabServices = [...CANON_SERVICES, ...servicesList.filter(s => !CANON_SERVICES.includes(s))]
  const svcTabs = [{ key: 'all', label: 'All Services', icon: 'sparkle' as IconName, n: total }]
    .concat(tabServices.map(s => ({ key: s, label: s, icon: (SVC_ICON[s] || 'sparkle') as IconName, n: leads.filter(l => (l.service || 'Other') === s).length })))
  const myNew = me ? leads.filter(l => l.assigned_to_id === me.id && l.status === 'new').length : 0

  // list with date-group headers
  const listItems: React.ReactNode[] = []
  let lastBucket = ''
  pageItems.forEach(l => {
    const b = dayBucket(l.created_at)
    if (b !== lastBucket) { listItems.push(<div key={'b-' + b} style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', padding: '12px 6px 6px' }}>{b}</div>); lastBucket = b }
    const sm = sourceMeta(l.source)
    listItems.push(
      <button key={l.id} onClick={() => setSelected(l)} className={'admin-lead' + (selected?.id === l.id ? ' active' : '')} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '12px 14px', marginBottom: 8, cursor: 'pointer', color: '#fff', transition: 'all 0.15s' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <span style={{ fontWeight: 700, fontSize: 16, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.name || 'Unknown'}</span>
          <span style={{ flexShrink: 0, width: 8, height: 8, borderRadius: '50%', background: STATUS_COLORS[l.status] || '#888' }} />
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4, display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <span style={{ color: '#fff000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.service || '—'}</span>
          <span style={{ flexShrink: 0 }}>{timeAgo(l.created_at)}</span>
        </div>
        <div style={{ marginTop: 7, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10.5, fontWeight: 700, color: sm.color, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 100, padding: '2px 8px' }}><Icon name={sm.icon} size={12} />{sm.label}</span>
          {l.assigned_to_id ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10.5, fontWeight: 700, color: '#22c55e', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 100, padding: '2px 8px' }}><Icon name="users" size={11} />{firstName(l.assigned_to_name)}</span>
          ) : (
            <span style={{ fontSize: 10.5, fontWeight: 700, color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 100, padding: '2px 8px' }}>Unassigned</span>
          )}
        </div>
      </button>
    )
  })

  const scopeTabs: [typeof scope, string, number][] = [['all', 'All Leads', total], ['mine', 'My Leads', mineCount], ['unassigned', 'Unassigned', unassignedCount]]

  return (
    <AdminShell active="leads" me={me} authed onAuth={() => fetchData()} auto={auto} setAuto={setAuto} onRefresh={fetchData} onLogout={() => { setAuthed(false); setLeads([]); setMe(null) }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '22px 24px 40px' }}>
        {/* analytics */}
        <div className="admin-bento">
          <div style={CARD}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={CARD_LABEL}>Pipeline</span>
              <span style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>{convRate}% converted</span>
            </div>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
              <Donut data={statusData} total={total} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 9, minWidth: 0 }}>
                {STATUSES.map(s => (
                  <button key={s} onClick={() => setStatus(status === s ? 'all' : s)} style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>
                    <span style={{ width: 9, height: 9, borderRadius: 3, background: STATUS_COLORS[s], flexShrink: 0 }} />
                    <span style={{ fontSize: 15, color: status === s ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: status === s ? 800 : 600, textTransform: 'capitalize', flex: 1 }}>{s}</span>
                    <span style={{ fontSize: 15, color: '#fff', fontWeight: 800, fontFamily: "'Urbanist',sans-serif" }}>{leads.filter(l => l.status === s).length}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={CARD}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <span style={CARD_LABEL}>Last 7 days</span><span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Today {todayCount}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 38, fontWeight: 900, color: '#fff', lineHeight: 1, fontFamily: "'Urbanist',sans-serif" }}>{weekCount}</span>
              <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)' }}>new leads</span>
            </div>
            <Sparkline values={dayCounts} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>{days.map((d, i) => <span key={i} style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', flex: 1, textAlign: 'center' }}>{d.label}</span>)}</div>
          </div>
          <button onClick={() => { setStatus('new'); setScope('all'); setSvc('all') }} style={{ ...CARD, background: 'linear-gradient(140deg, #fff000 0%, #f5c400 100%)', border: 'none', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 150 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ ...CARD_LABEL, color: 'rgba(0,0,0,0.55)' }}>Needs action</span>
              <span style={{ color: '#0a0a0a' }}><Icon name="bell" size={20} /></span>
            </div>
            <div>
              <div style={{ fontSize: 52, fontWeight: 900, color: '#0a0a0a', lineHeight: 1, fontFamily: "'Urbanist',sans-serif" }}>{stats.new || 0}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 15, color: 'rgba(0,0,0,0.7)', fontWeight: 700, marginTop: 6 }}>new · awaiting first contact <Icon name="arrow-right" size={14} /></div>
            </div>
          </button>
        </div>

        {/* SERVICE CATEGORY TABS — primary organizer */}
        <div style={{ ...CARD, padding: '12px 14px', marginBottom: 14 }}>
          <div style={{ ...CARD_LABEL, marginBottom: 10, paddingLeft: 2 }}>Quotes by service</div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {svcTabs.map(tab => (
              <button key={tab.key} onClick={() => setSvc(tab.key)} style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 15px', borderRadius: 12, cursor: 'pointer', fontSize: 13.5, fontWeight: 700, whiteSpace: 'nowrap', transition: 'all 0.15s', border: '1px solid ' + (svc === tab.key ? 'rgba(255,240,0,0.5)' : 'rgba(255,255,255,0.08)'), background: svc === tab.key ? 'rgba(255,240,0,0.12)' : 'rgba(255,255,255,0.02)', color: svc === tab.key ? '#fff000' : 'rgba(255,255,255,0.7)' }}>
                <Icon name={tab.icon} size={15} />{tab.label}
                <span style={{ fontSize: 13, fontWeight: 800, fontFamily: "'Urbanist',sans-serif", background: svc === tab.key ? 'rgba(255,240,0,0.2)' : 'rgba(255,255,255,0.08)', borderRadius: 100, padding: '1px 8px' }}>{tab.n}</span>
              </button>
            ))}
          </div>
        </div>

        {/* scope toggle */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
          {scopeTabs.map(([key, lbl, n]) => (
            <button key={key} onClick={() => setScope(key)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 16px', borderRadius: 100, cursor: 'pointer', fontSize: 13.5, fontWeight: 700, border: 'none', background: scope === key ? '#fff000' : 'rgba(255,255,255,0.05)', color: scope === key ? '#0a0a0a' : 'rgba(255,255,255,0.7)' }}>
              {key === 'mine' && myNew > 0 && <span className="admin-live" style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} title={`${myNew} new assigned to you`} />}
              {lbl}<span style={{ fontSize: 13, fontWeight: 800, opacity: 0.7 }}>{n}</span>
            </button>
          ))}
        </div>

        <div className="admin-split">
          {/* LIST */}
          <aside className="admin-list" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 12 }}>
            <div style={{ position: 'relative', marginBottom: 10 }}>
              <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', pointerEvents: 'none' }}><Icon name="search" size={16} /></span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, phone, agent…" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '11px 14px 11px 38px', color: '#fff', fontSize: 15, outline: 'none', boxSizing: 'border-box', fontFamily: "'Abel',sans-serif" }} />
            </div>
            <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8, marginBottom: 8 }}>
              {['all', ...STATUSES].map(s => (
                <button key={s} onClick={() => setStatus(s)} style={{ flexShrink: 0, background: status === s ? '#fff000' : 'rgba(255,255,255,0.05)', color: status === s ? '#0a0a0a' : 'rgba(255,255,255,0.7)', border: 'none', padding: '6px 12px', borderRadius: 100, cursor: 'pointer', fontSize: 13, fontWeight: 700, textTransform: 'capitalize', whiteSpace: 'nowrap' }}>{s}{s === 'all' ? ` ${total}` : stats[s] ? ` ${stats[s]}` : ''}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 10, flexWrap: 'wrap' }}>
              <select value={srcFilter} onChange={e => setSrcFilter(e.target.value)} className="tk-select" style={{ flex: 1, minWidth: 120, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '8px 10px', color: '#fff', fontSize: 13, outline: 'none', fontFamily: "'Abel',sans-serif", cursor: 'pointer' }}>
                <option value="all">All sources</option>
                {sources.map(s => <option key={s} value={s}>{sourceMeta(s).label}</option>)}
              </select>
              <button onClick={() => setSort(s => s === 'new' ? 'old' : 'new')} title="Toggle sort order" style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', borderRadius: 8, padding: '8px 10px', cursor: 'pointer', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}><Icon name="filter" size={13} />{sort === 'new' ? 'Newest' : 'Oldest'}</button>
              <button onClick={exportCSV} title="Export filtered leads to CSV" style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,240,0,0.08)', border: '1px solid rgba(255,240,0,0.25)', color: '#fff000', borderRadius: 8, padding: '8px 12px', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}><Icon name="download" size={13} />CSV</button>
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', padding: '0 4px 6px' }}>
              {displayed.length === 0 ? '0 leads' : `${pageStart + 1}–${Math.min(pageStart + PAGE_SIZE, displayed.length)} of ${displayed.length}`}
              {displayed.length !== total ? ` · ${total} total` : ''}
            </div>
            {loading && !total ? <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>Loading…</div>
              : displayed.length === 0 ? <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>No leads here.</div>
              : listItems}
            {pageCount > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={safePage <= 1} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: safePage <= 1 ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.8)', borderRadius: 8, padding: '7px 12px', cursor: safePage <= 1 ? 'default' : 'pointer', fontSize: 13, fontWeight: 700 }}><Icon name="arrow-left" size={13} />Prev</button>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 700, fontFamily: "'Urbanist',sans-serif" }}>Page {safePage} / {pageCount}</span>
                <button onClick={() => setPage(p => Math.min(pageCount, p + 1))} disabled={safePage >= pageCount} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: safePage >= pageCount ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.8)', borderRadius: 8, padding: '7px 12px', cursor: safePage >= pageCount ? 'default' : 'pointer', fontSize: 13, fontWeight: 700 }}>Next<Icon name="arrow-right" size={13} /></button>
              </div>
            )}
          </aside>

          {/* DETAIL */}
          <section className={'admin-detail' + (selected ? '' : ' empty')} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: selected ? 28 : 60, minHeight: 400 }}>
            {!selected ? (
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.35)', paddingTop: 60 }}>
                <div style={{ display: 'inline-flex', marginBottom: 14, color: 'rgba(255,255,255,0.25)' }}><Icon name="inbox" size={48} stroke={1.5} /></div>
                <p style={{ fontSize: 16 }}>Select a quote to see the full enquiry.</p>
                <p style={{ fontSize: 13, marginTop: 8, color: 'rgba(255,255,255,0.25)' }}>Tip: ↑ / ↓ to move, Esc to close.</p>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
                  <div>
                    <h2 style={{ fontSize: 26, fontWeight: 900, margin: 0, fontFamily: "'Urbanist',sans-serif" }}>{selected.name || 'Unknown'}</h2>
                    <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>#{selected.id} · {timeAgo(selected.created_at)} · {new Date(selected.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                  <button onClick={() => setSelected(null)} aria-label="Close" style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="close" size={16} /></button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, margin: '18px 0 24px', alignItems: 'center' }}>
                  {selected.phone && <a href={waLink(selected.phone)} target="_blank" rel="noopener noreferrer" className="glass-wa" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '10px 18px', borderRadius: 100, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}><Icon name="whatsapp" size={15} /> WhatsApp</a>}
                  {selected.phone && <a href={'tel:' + selected.phone} className="glass-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '10px 18px', borderRadius: 100, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}><Icon name="phone" size={14} /> {selected.phone}</a>}
                  {selected.phone && <button onClick={() => copy(selected.phone, 'Phone')} title="Copy number" style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="copy" size={15} /></button>}
                  {selected.email && <a href={'mailto:' + selected.email} className="glass-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '10px 18px', borderRadius: 100, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}><Icon name="mail" size={14} /> Email</a>}
                </div>

                {/* assignment */}
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Assigned agent</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginBottom: 26 }}>
                  {me?.role === 'admin' ? (
                    <select value={selected.assigned_to_id ?? ''} onChange={e => assign(selected.id, e.target.value ? parseInt(e.target.value, 10) : null)} className="tk-select" style={{ minWidth: 220, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 10, padding: '11px 14px', color: '#fff', fontSize: 15, outline: 'none', fontFamily: "'Abel',sans-serif", cursor: 'pointer' }}>
                      <option value="">— Unassigned —</option>
                      {activeStaff.map(u => <option key={u.id} value={u.id}>{u.name}{u.role === 'admin' ? ' (admin)' : ''}</option>)}
                    </select>
                  ) : (
                    <>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: selected.assigned_to_id ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)', border: '1px solid ' + (selected.assigned_to_id ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.12)'), color: selected.assigned_to_id ? '#22c55e' : 'rgba(255,255,255,0.6)', borderRadius: 100, padding: '9px 16px', fontSize: 15, fontWeight: 700 }}><Icon name="users" size={14} />{selected.assigned_to_id ? (selected.assigned_to_id === me?.id ? 'You' : selected.assigned_to_name) : 'Unassigned'}</span>
                      {selected.assigned_to_id !== me?.id && <button onClick={() => assign(selected.id, me!.id)} className="glass-cta" style={{ padding: '9px 18px', borderRadius: 100, fontSize: 14, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer' }}>Claim</button>}
                      {selected.assigned_to_id === me?.id && <button onClick={() => assign(selected.id, null)} className="glass-ghost" style={{ padding: '9px 18px', borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Release</button>}
                    </>
                  )}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
                  <span style={{ background: 'rgba(255,240,0,0.1)', color: '#fff000', border: '1px solid rgba(255,240,0,0.3)', padding: '6px 14px', borderRadius: 100, fontSize: 15, fontWeight: 700 }}>{selected.service || 'General'}</span>
                  {selSrc && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.05)', color: selSrc.color, border: '1px solid rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: 100, fontSize: 15, fontWeight: 700 }}><Icon name={selSrc.icon} size={14} /> {selSrc.label}</span>}
                  {selected.travel_dates && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: 100, fontSize: 15, color: 'rgba(255,255,255,0.7)' }}><Icon name="calendar" size={14} /> {selected.travel_dates}</span>}
                </div>

                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Enquiry details</div>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 18, marginBottom: 26 }}>
                  {(selected.message || '—').split('\n').map((line, i) => {
                    const idx = line.indexOf(': ')
                    if (i === 0 && idx < 0) return <div key={i} style={{ fontWeight: 800, color: '#fff000', fontSize: 15, letterSpacing: 1, marginBottom: 10, fontFamily: "'Urbanist',sans-serif" }}>{line}</div>
                    if (idx > 0) return (<div key={i} style={{ display: 'flex', gap: 12, padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><span style={{ minWidth: 110, color: 'rgba(255,255,255,0.45)', fontSize: 15 }}>{line.slice(0, idx)}</span><span style={{ color: '#fff', fontSize: 15, fontWeight: 600 }}>{line.slice(idx + 2)}</span></div>)
                    return <div key={i} style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.7 }}>{line}</div>
                  })}
                </div>

                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Status</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                  {STATUSES.map(s => (
                    <button key={s} onClick={() => updateStatus(selected.id, s)} style={{ padding: '9px 16px', borderRadius: 100, fontSize: 15, fontWeight: 700, textTransform: 'capitalize', cursor: 'pointer', border: '1px solid ' + (selected.status === s ? (STATUS_COLORS[s] || '#fff') : 'rgba(255,255,255,0.12)'), background: selected.status === s ? (STATUS_COLORS[s] || '#fff') : 'transparent', color: selected.status === s ? '#0a0a0a' : 'rgba(255,255,255,0.7)' }}>{s}</button>
                  ))}
                </div>

                <button onClick={() => deleteLead(selected.id)} style={{ background: 'none', border: '1px solid rgba(255,60,60,0.3)', color: '#ff6b6b', padding: '10px 18px', borderRadius: 100, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Delete lead</button>
              </div>
            )}
          </section>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 200, background: 'rgba(20,20,20,0.96)', border: '1px solid rgba(255,240,0,0.3)', color: '#fff', padding: '11px 22px', borderRadius: 100, fontSize: 15, fontWeight: 600, boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>{toast}</div>}
    </AdminShell>
  )
}
