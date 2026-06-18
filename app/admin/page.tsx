'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, useCallback, useMemo } from 'react'
import Icon, { IconName } from '@/components/Icon'
import AdminShell, { Me } from '@/components/admin/AdminShell'
import Dropdown, { DropOption } from '@/components/Dropdown'

type Lead = { id: number; name: string; email: string; phone: string; service: string; message: string; travel_dates: string; source: string; status: string; assigned_to_id: number | null; assigned_to_name: string; created_at: string }
type Staff = { id: number; name: string; email: string; role: string; active: boolean }
type Stats = Record<string, number>
const STATUS_COLORS: Record<string, string> = { new: '#fff000', contacted: '#3b82f6', converted: '#22c55e', closed: '#9ca3af', lost: '#ef4444' }
const STATUSES = ['new', 'contacted', 'converted', 'closed', 'lost']
const SVC_ICON: Record<string, IconName> = { 'Air Ticketing': 'plane', 'Car Hire': 'car', Safari: 'compass', International: 'globe', Logistics: 'truck', 'Hotel Booking': 'bed', 'Airport Transfers': 'car', Conferences: 'users', 'Pilgrimage Tours': 'compass', 'Pilgrimage': 'compass' }
// distinct colour per service so the table badges read apart at a glance
const SVC_COLOR: Record<string, string> = { 'Air Ticketing': '#38bdf8', Safari: '#f59e0b', International: '#a855f7', 'Car Hire': '#22c55e', Logistics: '#fb923c', 'Hotel Booking': '#f472b6', Pilgrimage: '#c084fc', 'Pilgrimage Tours': '#c084fc', Conferences: '#818cf8', 'Airport Transfers': '#2dd4bf' }
function serviceMeta(s: string): { label: string; icon: IconName; color: string } {
  return { label: s || 'General', icon: SVC_ICON[s] || 'sparkle', color: SVC_COLOR[s] || '#9ca3af' }
}
const ServiceBadge = ({ service }: { service: string }) => {
  const m = serviceMeta(service)
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, maxWidth: '100%', fontSize: 13, fontWeight: 700, color: m.color, background: m.color + '1f', border: '1px solid ' + m.color + '55', borderRadius: 100, padding: '4px 11px' }}><Icon name={m.icon} size={13} /><span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.label}</span></span>
}

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
const initials = (n: string) => (n || '?').trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() || '').join('') || '?'

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

const CARD: React.CSSProperties = { position: 'relative', background: 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.022) 46%, rgba(255,255,255,0.016) 100%)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24, padding: 32, backdropFilter: 'blur(4px) saturate(140%)', WebkitBackdropFilter: 'blur(4px) saturate(140%)', boxShadow: '0 14px 44px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.1)' }
const CARD_LABEL: React.CSSProperties = { fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }

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
  const [scope, setScope] = useState<'all' | 'mine' | 'unassigned'>('all')
  const [sort, setSort] = useState<'new' | 'old'>('new')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10
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
      .filter(l => scope === 'all' || (scope === 'mine' ? (me && l.assigned_to_id === me.id) : !l.assigned_to_id))
      .filter(l => !q || [l.name, l.phone, l.email, l.service, l.message, l.assigned_to_name].some(v => (v || '').toLowerCase().includes(q)))
    arr.sort((a, b) => sort === 'new' ? +new Date(b.created_at) - +new Date(a.created_at) : +new Date(a.created_at) - +new Date(b.created_at))
    return arr
  }, [leads, status, svc, scope, search, sort, me])

  // back to page 1 whenever the filter set changes — never strand the user on an empty page
  useEffect(() => { setPage(1) }, [status, svc, scope, search, sort])
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
  const prevWeekCount = leads.filter(l => { const t = +new Date(l.created_at); const n = Date.now(); return t < n - 7 * 86400000 && t >= n - 14 * 86400000 }).length
  const weekDelta = prevWeekCount ? Math.round(((weekCount - prevWeekCount) / prevWeekCount) * 100) : (weekCount > 0 ? 100 : 0)
  const todayCount = leads.filter(l => dayBucket(l.created_at) === 'Today').length
  const unassignedCount = leads.filter(l => !l.assigned_to_id).length
  const mineCount = me ? leads.filter(l => l.assigned_to_id === me.id).length : 0
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

  // full-width table rows (paginated)
  const rows = pageItems.map(l => {
    const sm = sourceMeta(l.source)
    return (
      <div key={l.id} role="button" tabIndex={0} onClick={() => setSelected(l)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(l) } }} className={'lead-row' + (selected?.id === l.id ? ' active' : '')}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <span style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, fontFamily: "'Urbanist',sans-serif", color: serviceMeta(l.service).color, background: serviceMeta(l.service).color + '22', border: '1px solid ' + serviceMeta(l.service).color + '44' }}>{initials(l.name)}</span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 16, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.name || 'Unknown'}</div>
            <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.phone || l.email || '—'}</div>
          </div>
        </div>
        <div className="lead-col-service" style={{ minWidth: 0 }}><ServiceBadge service={l.service} /></div>
        <div className="lead-col-source" style={{ minWidth: 0 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, fontWeight: 700, color: sm.color, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 100, padding: '3px 10px', maxWidth: '100%', overflow: 'hidden' }}><Icon name={sm.icon} size={12} /><span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sm.label}</span></span>
        </div>
        <div className="lead-col-status">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, textTransform: 'capitalize', color: STATUS_COLORS[l.status] || '#fff', background: (STATUS_COLORS[l.status] || '#888') + '1f', border: '1px solid ' + (STATUS_COLORS[l.status] || '#888') + '40', borderRadius: 100, padding: '4px 11px' }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: STATUS_COLORS[l.status] || '#888' }} />{l.status}</span>
        </div>
        <div className="lead-col-assigned" style={{ minWidth: 0 }}>
          {l.assigned_to_id
            ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, fontWeight: 700, color: '#22c55e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><Icon name="users" size={12} />{firstName(l.assigned_to_name)}</span>
            : <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.32)' }}>Unassigned</span>}
        </div>
        <div className="lead-col-time" style={{ textAlign: 'right', fontSize: 14, color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap' }}>{timeAgo(l.created_at)}</div>
        <div style={{ textAlign: 'right', color: 'rgba(255,255,255,0.28)', display: 'flex', justifyContent: 'flex-end' }}><Icon name="chevron-right" size={16} /></div>
      </div>
    )
  })

  const scopeTabs: [typeof scope, string, number][] = [['all', 'All Leads', total], ['mine', 'My Leads', mineCount], ['unassigned', 'Unassigned', unassignedCount]]

  return (
    <AdminShell active="leads" me={me} authed onAuth={() => fetchData()} auto={auto} setAuto={setAuto} onRefresh={fetchData} onLogout={() => { setAuthed(false); setLeads([]); setMe(null) }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '36px 40px 76px' }}>
        {/* SERVICE CATEGORY TABS — primary organizer (desktop); a compact dropdown replaces it on small screens */}
        <div className="svc-tabs-card" style={{ ...CARD, padding: '24px 26px', marginBottom: 30 }}>
          <div style={{ ...CARD_LABEL, marginBottom: 16, paddingLeft: 2 }}>Quotes by service</div>
          <div className="svc-grid">
            {svcTabs.map(tab => {
              const c = tab.key === 'all' ? '#fff000' : (SVC_COLOR[tab.key] || '#9ca3af')
              return (
                <button key={tab.key} onClick={() => setSvc(tab.key)} className="svc-tile" data-active={svc === tab.key}>
                  <span className="svc-icon" style={{ color: c, background: c + '22', border: '1px solid ' + c + '44' }}><Icon name={tab.icon} size={17} /></span>
                  <span className="svc-name">{tab.label}</span>
                  <span className="svc-count">{tab.n}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* analytics */}
        <div className="admin-bento">
          <div style={CARD}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <span style={{ width: 30, height: 30, borderRadius: 9, flexShrink: 0, background: 'rgba(255,240,0,0.12)', border: '1px solid rgba(255,240,0,0.25)', color: '#fff000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="trending-up" size={15} /></span>
                <span style={{ ...CARD_LABEL, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Pipeline</span>
              </span>
              <span style={{ flexShrink: 0, fontSize: 12, color: '#22c55e', fontWeight: 700, background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 100, padding: '3px 10px', whiteSpace: 'nowrap' }}>{convRate}% converted</span>
            </div>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
              <Donut data={statusData} total={total} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 9, minWidth: 0 }}>
                {STATUSES.map(s => (
                  <button key={s} onClick={() => setStatus(status === s ? 'all' : s)} style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>
                    <span style={{ width: 9, height: 9, borderRadius: 3, background: STATUS_COLORS[s], flexShrink: 0 }} />
                    <span style={{ fontSize: 16, color: status === s ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: status === s ? 800 : 600, textTransform: 'capitalize', flex: 1 }}>{s}</span>
                    <span style={{ fontSize: 16, color: '#fff', fontWeight: 800, fontFamily: "'Urbanist',sans-serif" }}>{leads.filter(l => l.status === s).length}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={CARD}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <span style={{ width: 30, height: 30, borderRadius: 9, flexShrink: 0, background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.28)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="calendar" size={15} /></span>
                <span style={{ ...CARD_LABEL, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Last 7 days</span>
              </span>
              <span style={{ flexShrink: 0, fontSize: 12, color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap' }}>Today {todayCount}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 38, fontWeight: 900, color: '#fff', lineHeight: 1, fontFamily: "'Urbanist',sans-serif" }}>{weekCount}</span>
              <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)' }}>new leads</span>
              <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 800, color: weekDelta >= 0 ? '#22c55e' : '#ef4444', background: (weekDelta >= 0 ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)'), border: '1px solid ' + (weekDelta >= 0 ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'), borderRadius: 100, padding: '3px 9px' }}>{weekDelta >= 0 ? '▲' : '▼'} {Math.abs(weekDelta)}%</span>
            </div>
            <Sparkline values={dayCounts} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>{days.map((d, i) => <span key={i} style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', flex: 1, textAlign: 'center' }}>{d.label}</span>)}</div>
          </div>
          <button onClick={() => { setStatus('new'); setScope('all'); setSvc('all') }} style={{ ...CARD, background: 'linear-gradient(140deg, #fff000 0%, #f5c400 100%)', border: 'none', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 150 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ ...CARD_LABEL, color: 'rgba(0,0,0,0.55)' }}>Needs action</span>
              <span style={{ color: '#0a0a0a' }}><Icon name="bell" size={20} /></span>
            </div>
            <div>
              <div style={{ fontSize: 52, fontWeight: 900, color: '#0a0a0a', lineHeight: 1, fontFamily: "'Urbanist',sans-serif" }}>{stats.new || 0}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 16, color: 'rgba(0,0,0,0.7)', fontWeight: 700, marginTop: 6 }}>new · awaiting first contact <Icon name="arrow-right" size={14} /></div>
            </div>
          </button>
        </div>

        {/* scope toggle */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
          {scopeTabs.map(([key, lbl, n]) => (
            <button key={key} onClick={() => setScope(key)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 16px', borderRadius: 100, cursor: 'pointer', fontSize: 15, fontWeight: 700, border: 'none', background: scope === key ? '#fff000' : 'rgba(255,255,255,0.05)', color: scope === key ? '#0a0a0a' : 'rgba(255,255,255,0.7)' }}>
              {key === 'mine' && myNew > 0 && <span className="admin-live" style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} title={`${myNew} new assigned to you`} />}
              {lbl}<span style={{ fontSize: 15, fontWeight: 800, opacity: 0.7 }}>{n}</span>
            </button>
          ))}
        </div>

        {/* TOOLBAR */}
        <div style={{ ...CARD, padding: '20px 22px', marginBottom: 22 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', pointerEvents: 'none' }}><Icon name="search" size={16} /></span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, phone, email, agent…" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '11px 14px 11px 40px', color: '#fff', fontSize: 16, outline: 'none', boxSizing: 'border-box', fontFamily: "'Abel',sans-serif" }} />
            </div>
            <div className="svc-drop-wrap">
              <Dropdown full ariaLabel="Filter by service" minWidth={170} value={svc} onChange={setSvc}
                options={[{ value: 'all', label: 'All services', icon: 'sparkle' as IconName }, ...tabServices.map(s => { const m = serviceMeta(s); return { value: s, label: m.label, icon: m.icon, color: m.color } as DropOption })]} />
            </div>
            <button onClick={() => setSort(s => s === 'new' ? 'old' : 'new')} title="Toggle sort order" style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', borderRadius: 10, padding: '11px 16px', cursor: 'pointer', fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap' }}><Icon name="filter" size={14} />{sort === 'new' ? 'Newest' : 'Oldest'}</button>
            <button onClick={exportCSV} title="Export filtered leads to CSV" style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,240,0,0.08)', border: '1px solid rgba(255,240,0,0.25)', color: '#fff000', borderRadius: 10, padding: '11px 16px', cursor: 'pointer', fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap' }}><Icon name="download" size={14} />CSV</button>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
            {['all', ...STATUSES].map(s => (
              <button key={s} onClick={() => setStatus(s)} style={{ background: status === s ? '#fff000' : 'rgba(255,255,255,0.05)', color: status === s ? '#0a0a0a' : 'rgba(255,255,255,0.7)', border: 'none', padding: '7px 14px', borderRadius: 100, cursor: 'pointer', fontSize: 14, fontWeight: 700, textTransform: 'capitalize', whiteSpace: 'nowrap' }}>{s}{s === 'all' ? ` ${total}` : stats[s] ? ` ${stats[s]}` : ''}</button>
            ))}
          </div>
        </div>

        {/* LEADS TABLE — full width, spacious; row opens a detail drawer */}
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="lead-row head">
            <div>Customer</div>
            <div className="lead-col-service">Service</div>
            <div className="lead-col-source">Source</div>
            <div className="lead-col-status">Status</div>
            <div className="lead-col-assigned">Agent</div>
            <div className="lead-col-time" style={{ textAlign: 'right' }}>When</div>
            <div />
          </div>
          {loading && !total ? <div style={{ padding: 50, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>Loading…</div>
            : displayed.length === 0 ? <div style={{ padding: 60, textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 16 }}>No leads here.</div>
            : rows}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 22px', borderTop: '1px solid rgba(255,255,255,0.07)', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
              {displayed.length === 0 ? '0 leads' : `Showing ${pageStart + 1}–${Math.min(pageStart + PAGE_SIZE, displayed.length)} of ${displayed.length}`}
              {displayed.length !== total ? ` · ${total} total` : ''}
            </span>
            {pageCount > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={safePage <= 1} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: safePage <= 1 ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.8)', borderRadius: 8, padding: '8px 14px', cursor: safePage <= 1 ? 'default' : 'pointer', fontSize: 14, fontWeight: 700 }}><Icon name="arrow-left" size={14} />Prev</button>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: 700, fontFamily: "'Urbanist',sans-serif" }}>Page {safePage} / {pageCount}</span>
                <button onClick={() => setPage(p => Math.min(pageCount, p + 1))} disabled={safePage >= pageCount} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: safePage >= pageCount ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.8)', borderRadius: 8, padding: '8px 14px', cursor: safePage >= pageCount ? 'default' : 'pointer', fontSize: 14, fontWeight: 700 }}>Next<Icon name="arrow-right" size={14} /></button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DETAIL DRAWER — slides in from the right */}
      {selected && (
        <>
          <div className="lead-drawer-backdrop" onClick={() => setSelected(null)} />
          <aside className="lead-drawer">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
              <div>
                <h2 style={{ fontSize: 26, fontWeight: 900, margin: 0, fontFamily: "'Urbanist',sans-serif" }}>{selected.name || 'Unknown'}</h2>
                <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>#{selected.id} · {timeAgo(selected.created_at)} · {new Date(selected.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</div>
              </div>
              <button onClick={() => setSelected(null)} aria-label="Close" style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="close" size={16} /></button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, margin: '18px 0 24px', alignItems: 'center' }}>
              {selected.phone && <a href={waLink(selected.phone)} target="_blank" rel="noopener noreferrer" className="glass-wa" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '10px 18px', borderRadius: 100, fontSize: 16, fontWeight: 700, textDecoration: 'none' }}><Icon name="whatsapp" size={15} /> WhatsApp</a>}
              {selected.phone && <a href={'tel:' + selected.phone} className="glass-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '10px 18px', borderRadius: 100, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}><Icon name="phone" size={14} /> {selected.phone}</a>}
              {selected.phone && <button onClick={() => copy(selected.phone, 'Phone')} title="Copy number" style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="copy" size={15} /></button>}
              {selected.email && <a href={'mailto:' + selected.email} className="glass-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '10px 18px', borderRadius: 100, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}><Icon name="mail" size={14} /> Email</a>}
            </div>

            {/* assignment */}
            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Assigned agent</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginBottom: 26 }}>
              {me?.role === 'admin' ? (
                <Dropdown ariaLabel="Assign agent" minWidth={240}
                  value={selected.assigned_to_id != null ? String(selected.assigned_to_id) : ''}
                  onChange={v => assign(selected.id, v ? parseInt(v, 10) : null)}
                  options={[{ value: '', label: '— Unassigned —', icon: 'users' as IconName }, ...activeStaff.map(u => ({ value: String(u.id), label: u.name + (u.role === 'admin' ? ' (admin)' : ''), icon: 'users' as IconName } as DropOption))]} />
              ) : (
                <>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: selected.assigned_to_id ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)', border: '1px solid ' + (selected.assigned_to_id ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.12)'), color: selected.assigned_to_id ? '#22c55e' : 'rgba(255,255,255,0.6)', borderRadius: 100, padding: '9px 16px', fontSize: 16, fontWeight: 700 }}><Icon name="users" size={14} />{selected.assigned_to_id ? (selected.assigned_to_id === me?.id ? 'You' : selected.assigned_to_name) : 'Unassigned'}</span>
                  {selected.assigned_to_id !== me?.id && <button onClick={() => assign(selected.id, me!.id)} className="glass-cta" style={{ padding: '9px 18px', borderRadius: 100, fontSize: 16, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer' }}>Claim</button>}
                  {selected.assigned_to_id === me?.id && <button onClick={() => assign(selected.id, null)} className="glass-ghost" style={{ padding: '9px 18px', borderRadius: 100, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Release</button>}
                </>
              )}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
              <ServiceBadge service={selected.service} />
              {selSrc && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.05)', color: selSrc.color, border: '1px solid rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: 100, fontSize: 16, fontWeight: 700 }}><Icon name={selSrc.icon} size={14} /> {selSrc.label}</span>}
              {selected.travel_dates && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: 100, fontSize: 16, color: 'rgba(255,255,255,0.7)' }}><Icon name="calendar" size={14} /> {selected.travel_dates}</span>}
            </div>

            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Enquiry details</div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 18, marginBottom: 26 }}>
              {(selected.message || '—').split('\n').map((line, i) => {
                const idx = line.indexOf(': ')
                if (i === 0 && idx < 0) return <div key={i} style={{ fontWeight: 800, color: '#fff000', fontSize: 16, letterSpacing: 1, marginBottom: 10, fontFamily: "'Urbanist',sans-serif" }}>{line}</div>
                if (idx > 0) return (<div key={i} style={{ display: 'flex', gap: 12, padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><span style={{ minWidth: 110, color: 'rgba(255,255,255,0.45)', fontSize: 16 }}>{line.slice(0, idx)}</span><span style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>{line.slice(idx + 2)}</span></div>)
                return <div key={i} style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, lineHeight: 1.7 }}>{line}</div>
              })}
            </div>

            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Status</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
              {STATUSES.map(s => (
                <button key={s} onClick={() => updateStatus(selected.id, s)} style={{ padding: '9px 16px', borderRadius: 100, fontSize: 16, fontWeight: 700, textTransform: 'capitalize', cursor: 'pointer', border: '1px solid ' + (selected.status === s ? (STATUS_COLORS[s] || '#fff') : 'rgba(255,255,255,0.12)'), background: selected.status === s ? (STATUS_COLORS[s] || '#fff') : 'transparent', color: selected.status === s ? '#0a0a0a' : 'rgba(255,255,255,0.7)' }}>{s}</button>
              ))}
            </div>

            <button onClick={() => deleteLead(selected.id)} style={{ background: 'none', border: '1px solid rgba(255,60,60,0.3)', color: '#ff6b6b', padding: '10px 18px', borderRadius: 100, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Delete lead</button>
          </aside>
        </>
      )}
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 200, background: 'rgba(20,20,20,0.96)', border: '1px solid rgba(255,240,0,0.3)', color: '#fff', padding: '11px 22px', borderRadius: 100, fontSize: 16, fontWeight: 600, boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>{toast}</div>}
    </AdminShell>
  )
}
