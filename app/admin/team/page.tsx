'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, useCallback } from 'react'
import Icon from '@/components/Icon'
import AdminShell, { Me } from '@/components/admin/AdminShell'

type Staff = { id: number; name: string; email: string; role: string; active: boolean }
const input: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '11px 14px', color: '#fff', fontSize: 16, outline: 'none', boxSizing: 'border-box', fontFamily: "'Abel',sans-serif" }
const label: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: 1.5, marginBottom: 6, textTransform: 'uppercase' }

export default function AdminTeam() {
  const [me, setMe] = useState<Me>(null)
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [users, setUsers] = useState<Staff[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'agent' })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [ur, mr] = await Promise.all([fetch('/api/admin/users'), fetch('/api/admin/me')])
      if (ur.status === 401) { setAuthed(false); setLoading(false); return }
      const ud = await ur.json(); const md = await mr.json().catch(() => ({}))
      setUsers(ud.users || []); setMe(md.user || null); setAuthed(true)
    } catch { /* ignore */ }
    setLoading(false)
  }, [])

  useEffect(() => { (async () => { await fetchData(); setChecking(false) })() }, [fetchData])
  function flash(m: string) { setToast(m); window.setTimeout(() => setToast(''), 1800) }

  async function addUser() {
    if (!form.name.trim() || !form.email.trim() || form.password.length < 6) { setError('Name, email and a 6+ character password are required.'); return }
    setSaving(true); setError('')
    const res = await fetch('/api/admin/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }).catch(() => null)
    setSaving(false)
    if (!res || !res.ok) { const d = res ? await res.json().catch(() => ({})) : {}; setError(d.error || 'Could not create user.'); return }
    setForm({ name: '', email: '', password: '', role: 'agent' }); flash('Agent added'); fetchData()
  }
  async function patch(id: number, body: Record<string, unknown>, ok: string) {
    const res = await fetch('/api/admin/users/' + id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).catch(() => null)
    if (!res || !res.ok) { const d = res ? await res.json().catch(() => ({})) : {}; flash(d.error || 'Failed'); return }
    flash(ok); fetchData()
  }
  async function resetPw(u: Staff) {
    const pw = prompt(`New password for ${u.name} (min 6 characters):`)
    if (!pw) return
    if (pw.length < 6) { flash('Password too short'); return }
    patch(u.id, { password: pw }, 'Password reset')
  }
  async function removeUser(u: Staff) {
    if (!confirm(`Remove ${u.name}? Their assigned leads become unassigned.`)) return
    const res = await fetch('/api/admin/users/' + u.id, { method: 'DELETE' }).catch(() => null)
    if (!res || !res.ok) { const d = res ? await res.json().catch(() => ({})) : {}; flash(d.error || 'Failed'); return }
    setUsers(prev => prev.filter(x => x.id !== u.id)); flash('Removed')
  }

  if (checking || !authed) return <AdminShell active="team" me={me} authed={authed} checking={checking} onAuth={() => fetchData()} />

  const isAdmin = me?.role === 'admin'

  return (
    <AdminShell active="team" me={me} authed onAuth={() => fetchData()} onRefresh={fetchData} onLogout={() => { setAuthed(false); setMe(null) }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '30px 30px 60px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 6px', fontFamily: "'Urbanist',sans-serif" }}>Team &amp; Agents</h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, margin: '0 0 26px' }}>Agents log in with their own email and password and work the leads you assign them.</p>

        {!isAdmin ? (
          <div className="glass-card" style={{ padding: 56, textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
            <div style={{ display: 'inline-flex', marginBottom: 14, color: 'rgba(255,255,255,0.3)' }}><Icon name="lock" size={40} /></div>
            <p style={{ fontSize: 16 }}>Only admins can manage team accounts.</p>
          </div>
        ) : (
          <>
            {/* add */}
            <div className="glass-card" style={{ border: '1px solid rgba(255,240,0,0.28)', padding: 28, marginBottom: 28 }}>
              <h2 style={{ fontSize: 18, fontWeight: 900, margin: '0 0 16px', fontFamily: "'Urbanist',sans-serif" }}>Add an agent</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 14 }}>
                <div><span style={label}>Full name</span><input style={input} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Jane Wambui" /></div>
                <div><span style={label}>Email</span><input style={input} type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@turkenya.com" /></div>
                <div><span style={label}>Temp password</span><input style={input} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="min 6 characters" /></div>
                <div><span style={label}>Role</span>
                  <select className="tk-select" style={input} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                    <option value="agent">Agent — works leads</option>
                    <option value="admin">Admin — full access</option>
                  </select>
                </div>
              </div>
              {error && <div style={{ background: 'rgba(255,60,60,0.08)', border: '1px solid rgba(255,60,60,0.2)', color: '#ff6b6b', padding: '10px 14px', borderRadius: 10, fontSize: 16, marginBottom: 14 }}>{error}</div>}
              <button onClick={addUser} disabled={saving} className="glass-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '12px 28px', borderRadius: 100, fontSize: 16, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', cursor: saving ? 'wait' : 'pointer', opacity: saving ? 0.6 : 1 }}><Icon name="plus" size={15} /> {saving ? 'Adding…' : 'Add Agent'}</button>
            </div>

            {/* list */}
            {loading && users.length === 0 ? <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>Loading…</div> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {users.map(u => (
                  <div key={u.id} className="glass-card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', opacity: u.active ? 1 : 0.55 }}>
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: u.role === 'admin' ? 'rgba(255,240,0,0.14)' : 'rgba(255,255,255,0.06)', border: '1px solid ' + (u.role === 'admin' ? 'rgba(255,240,0,0.3)' : 'rgba(255,255,255,0.12)'), color: u.role === 'admin' ? '#fff000' : 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontFamily: "'Urbanist',sans-serif", flexShrink: 0 }}>{u.name.split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase()).join('')}</div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 800, fontSize: 16 }}>{u.name}{me && u.id === me.id ? ' (you)' : ''}</span>
                        <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', borderRadius: 100, padding: '2px 9px', color: u.role === 'admin' ? '#0a0a0a' : 'rgba(255,255,255,0.7)', background: u.role === 'admin' ? '#fff000' : 'rgba(255,255,255,0.08)' }}>{u.role}</span>
                        {!u.active && <span style={{ fontSize: 12, color: '#ff6b6b', fontWeight: 700 }}>Disabled</span>}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16 }}>{u.email}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <button onClick={() => patch(u.id, { role: u.role === 'admin' ? 'agent' : 'admin' }, 'Role updated')} style={btn}>{u.role === 'admin' ? 'Make agent' : 'Make admin'}</button>
                      <button onClick={() => patch(u.id, { active: !u.active }, u.active ? 'Disabled' : 'Enabled')} style={btn}>{u.active ? 'Disable' : 'Enable'}</button>
                      <button onClick={() => resetPw(u)} style={btn}>Reset password</button>
                      {me && u.id !== me.id && <button onClick={() => removeUser(u)} style={{ ...btn, border: '1px solid rgba(255,60,60,0.3)', color: '#ff6b6b' }}><Icon name="trash" size={13} /></button>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 200, background: 'rgba(20,20,20,0.96)', border: '1px solid rgba(255,240,0,0.3)', color: '#fff', padding: '11px 22px', borderRadius: 100, fontSize: 16, fontWeight: 600 }}>{toast}</div>}
    </AdminShell>
  )
}

const btn: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.75)', padding: '7px 13px', borderRadius: 100, fontSize: 16, fontWeight: 700, cursor: 'pointer' }
