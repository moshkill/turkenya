'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, useCallback } from 'react'

type Lead = { id:number; name:string; email:string; phone:string; service:string; message:string; travel_dates:string; status:string; created_at:string }
type Stats = Record<string,number>
const STATUS_COLORS: Record<string,string> = { new:'#fff000', contacted:'#3b82f6', converted:'#22c55e', closed:'#6b7280', lost:'#ef4444' }
const STATUSES = ['new','contacted','converted','closed','lost']

export default function AdminPage() {
  const [token, setToken] = useState('')
  const [input, setInput] = useState('')
  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<Stats>({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [updating, setUpdating] = useState<number|null>(null)
  const [selected, setSelected] = useState<Lead|null>(null)

  const fetchData = useCallback(async (t: string) => {
    setLoading(true); setError('')
    try {
      const [lr, sr] = await Promise.all([
        fetch('/api/admin/leads', { headers:{'x-admin-token':t} }),
        fetch('/api/admin/stats', { headers:{'x-admin-token':t} })
      ])
      if (lr.status === 401) { setError('Invalid token'); setToken(''); localStorage.removeItem('tk_admin'); setLoading(false); return }
      const ld = await lr.json()
      const sd = await sr.json()
      setLeads(ld.leads || [])
      const sm: Stats = {}
      if (Array.isArray(sd)) { sd.forEach((x: {status:string;count:string}) => { sm[x.status] = parseInt(x.count) }) }
      setStats(sm)
    } catch { setError('Connection failed') }
    setLoading(false)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('tk_admin')
    if (saved) { setToken(saved); fetchData(saved) }
  }, [fetchData])

  function login() {
    if (!input.trim()) return
    localStorage.setItem('tk_admin', input.trim())
    setToken(input.trim())
    fetchData(input.trim())
  }

  async function updateStatus(id: number, status: string) {
    setUpdating(id)
    await fetch('/api/admin/leads/' + id, { method:'PUT', headers:{'x-admin-token':token,'Content-Type':'application/json'}, body:JSON.stringify({status}) })
    setLeads(prev => prev.map(l => l.id === id ? {...l, status} : l))
    const old = leads.find(l=>l.id===id)?.status || 'new'
    setStats(prev => ({ ...prev, [old]: Math.max(0,(prev[old]||1)-1), [status]: (prev[status]||0)+1 }))
    setUpdating(null)
  }

  const filtered = filter==='all' ? leads : leads.filter(l=>l.status===filter)
  const total = leads.length

  if (!token) {
    return (
      <main style={{ minHeight:'100vh', background:'#0D0D0D', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Abel',sans-serif" }}>
        <div style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,240,0,0.2)', borderRadius:12, padding:48, width:'100%', maxWidth:400, textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>🔐</div>
          <h1 style={{ fontSize:28, fontWeight:700, color:'#fff000', marginBottom:8 }}>Admin Access</h1>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:15, marginBottom:32 }}>Turkenya CRM Dashboard</p>
          {error && <div style={{ background:'rgba(255,60,60,0.1)', border:'1px solid rgba(255,60,60,0.3)', color:'#ff6b6b', padding:'10px', borderRadius:6, fontSize:13, marginBottom:16 }}>{error}</div>}
          <input type="password" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()} placeholder="Enter admin token" style={{ width:'100%', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:6, padding:'13px 16px', color:'#fff', fontSize:15, outline:'none', boxSizing:'border-box', marginBottom:14, fontFamily:"'Abel',sans-serif" }} />
          <button onClick={login} style={{ width:'100%', background:'#fff000', color:'#0D0D0D', border:'none', borderRadius:6, padding:'14px', fontWeight:800, fontSize:14, letterSpacing:'2px', cursor:'pointer' }}>LOGIN</button>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight:'100vh', background:'#0D0D0D', fontFamily:"'Abel',sans-serif", color:'#fff' }}>
      <div style={{ background:'rgba(255,255,255,0.04)', borderBottom:'1px solid rgba(255,240,0,0.15)', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:60 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontSize:20 }}>📊</span>
          <span style={{ fontWeight:700, fontSize:20, color:'#fff000' }}>Turkenya CRM</span>
        </div>
        <div style={{ display:'flex', gap:12 }}>
          <button onClick={()=>fetchData(token)} style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff', padding:'7px 16px', borderRadius:6, cursor:'pointer', fontSize:14 }}>↻ Refresh</button>
          <button onClick={()=>{localStorage.removeItem('tk_admin');setToken('');setLeads([]);setStats({})}} style={{ background:'rgba(255,60,60,0.1)', border:'1px solid rgba(255,60,60,0.3)', color:'#ff6b6b', padding:'7px 16px', borderRadius:6, cursor:'pointer', fontSize:14 }}>Logout</button>
        </div>
      </div>

      <div style={{ maxWidth:1400, margin:'0 auto', padding:'32px 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:16, marginBottom:32 }}>
          {[
            { label:'Total Leads', value:total, color:'#fff000', icon:'📋' },
            { label:'New', value:stats.new||0, color:'#fff000', icon:'🆕' },
            { label:'Contacted', value:stats.contacted||0, color:'#3b82f6', icon:'📞' },
            { label:'Converted', value:stats.converted||0, color:'#22c55e', icon:'✅' },
            { label:'Conv. Rate', value:total>0?Math.round(((stats.converted||0)/total)*100)+'%':'0%', color:'#a855f7', icon:'📈' },
          ].map(c=>(
            <div key={c.label} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, padding:'20px 24px' }}>
              <div style={{ fontSize:24, marginBottom:8 }}>{c.icon}</div>
              <div style={{ fontSize:32, fontWeight:700, color:c.color }}>{loading?'…':c.value}</div>
              <div style={{ fontSize:14, color:'rgba(255,255,255,0.5)', marginTop:4 }}>{c.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display:'flex', gap:10, marginBottom:24, flexWrap:'wrap' }}>
          {['all',...STATUSES].map(s=>(
            <button key={s} onClick={()=>setFilter(s)} style={{ background:filter===s?'#fff000':'rgba(255,255,255,0.06)', color:filter===s?'#0D0D0D':'rgba(255,255,255,0.7)', border:filter===s?'none':'1px solid rgba(255,255,255,0.1)', padding:'8px 18px', borderRadius:20, cursor:'pointer', fontSize:14, fontWeight:filter===s?700:400, textTransform:'capitalize' }}>
              {s}{s==='all'?' ('+total+')':stats[s]?' ('+stats[s]+')':''}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign:'center', padding:80, color:'rgba(255,255,255,0.4)', fontSize:18 }}>Loading leads…</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:80 }}>
            <div style={{ fontSize:56, marginBottom:16 }}>📭</div>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:16 }}>No leads yet. Enquiries from the contact form will appear here.</p>
          </div>
        ) : (
          <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, overflow:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', minWidth:900 }}>
              <thead>
                <tr style={{ background:'rgba(255,240,0,0.06)', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
                  {['#','Name & Date','Contact','Service','Travel Dates','Message','Status','Action'].map(h=>(
                    <th key={h} style={{ padding:'12px 16px', textAlign:'left', fontSize:11, color:'rgba(255,255,255,0.5)', fontWeight:700, letterSpacing:'1.5px', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead,i)=>(
                  <tr key={lead.id} style={{ borderBottom:'1px solid rgba(255,255,255,0.05)', background:i%2===0?'transparent':'rgba(255,255,255,0.02)' }}>
                    <td style={{ padding:'14px 16px', fontSize:13, color:'rgba(255,255,255,0.35)' }}>#{lead.id}</td>
                    <td style={{ padding:'14px 16px' }}>
                      <div style={{ fontWeight:600, fontSize:15 }}>{lead.name}</div>
                      <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)', marginTop:3 }}>{new Date(lead.created_at).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</div>
                    </td>
                    <td style={{ padding:'14px 16px', fontSize:13 }}>
                      {lead.phone&&<div style={{ color:'#22c55e' }}>📞 {lead.phone}</div>}
                      {lead.email&&<div style={{ color:'rgba(255,255,255,0.5)', fontSize:12, marginTop:2 }}>✉ {lead.email}</div>}
                    </td>
                    <td style={{ padding:'14px 16px' }}>
                      <span style={{ background:'rgba(255,240,0,0.1)', color:'#fff000', padding:'3px 10px', borderRadius:12, fontSize:12 }}>{lead.service||'—'}</span>
                    </td>
                    <td style={{ padding:'14px 16px', fontSize:13, color:'rgba(255,255,255,0.6)', whiteSpace:'nowrap' }}>{lead.travel_dates||'—'}</td>
                    <td style={{ padding:'14px 16px', fontSize:13, color:'rgba(255,255,255,0.6)', maxWidth:180 }}>
                      <div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', cursor:'pointer' }} onClick={()=>setSelected(lead)} title={lead.message}>{lead.message||'—'}</div>
                    </td>
                    <td style={{ padding:'14px 16px' }}>
                      <span style={{ color: STATUS_COLORS[lead.status]||'#fff', fontSize:13, fontWeight:600, textTransform:'capitalize' }}>{lead.status}</span>
                    </td>
                    <td style={{ padding:'14px 16px', whiteSpace:'nowrap' }}>
                      <select value={lead.status} disabled={updating===lead.id} onChange={e=>updateStatus(lead.id,e.target.value)} style={{ background:'#1a1a1a', border:'1px solid rgba(255,255,255,0.15)', color:'#fff', padding:'6px 10px', borderRadius:6, fontSize:13, cursor:'pointer', outline:'none' }}>
                        {STATUSES.map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                      </select>
                      {lead.phone&&<a href={'https://wa.me/'+lead.phone.replace(/[^0-9]/g,'')} target="_blank" rel="noopener noreferrer" style={{ display:'inline-block', marginLeft:8, background:'#25D366', color:'#fff', padding:'6px 10px', borderRadius:6, fontSize:12, textDecoration:'none', fontWeight:700 }}>WA</a>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected&&(
        <div onClick={()=>setSelected(null)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:9998, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:'#1a1a1a', border:'1px solid rgba(255,240,0,0.2)', borderRadius:12, padding:32, maxWidth:540, width:'100%' }}>
            <h3 style={{ color:'#fff000', marginBottom:16, fontSize:20 }}>{selected.name}</h3>
            <p style={{ color:'rgba(255,255,255,0.8)', lineHeight:1.8, fontSize:15 }}>{selected.message}</p>
            <div style={{ marginTop:24, display:'flex', gap:12, flexWrap:'wrap' }}>
              {selected.phone&&<a href={'https://wa.me/'+selected.phone.replace(/[^0-9]/g,'')} target="_blank" rel="noopener noreferrer" style={{ background:'#25D366', color:'#fff', padding:'10px 20px', borderRadius:6, textDecoration:'none', fontSize:14, fontWeight:700 }}>WhatsApp</a>}
              {selected.email&&<a href={'mailto:'+selected.email} style={{ background:'rgba(255,255,255,0.1)', color:'#fff', padding:'10px 20px', borderRadius:6, textDecoration:'none', fontSize:14 }}>Email</a>}
              <button onClick={()=>setSelected(null)} style={{ marginLeft:'auto', background:'none', border:'1px solid rgba(255,255,255,0.2)', color:'rgba(255,255,255,0.6)', padding:'10px 20px', borderRadius:6, cursor:'pointer', fontSize:14 }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
