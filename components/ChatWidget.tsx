'use client'
import { useState, useRef, useEffect } from 'react'

type Msg = { role: 'user' | 'assistant'; text: string }
const WA = 'https://wa.me/254722666644'
const QUICK = ['Safari prices', 'Flights to Dubai', 'Corporate car hire', 'Umrah packages']

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'assistant', text: 'Hi! I’m the Turkenya travel assistant. Ask me about safaris, flights, car hire, or anything else — I’ll help right away.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, loading])

  async function send(text?: string) {
    const msg = (text ?? input).trim()
    if (!msg || loading) return
    setInput('')
    const history = msgs.map(m => ({ role: m.role, content: m.text }))
    setMsgs(m => [...m, { role: 'user', text: msg }])
    setLoading(true)
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: msg, history }) })
      const d = await r.json()
      setMsgs(m => [...m, { role: 'assistant', text: d.reply || 'Sorry, please try again or WhatsApp us.' }])
    } catch {
      setMsgs(m => [...m, { role: 'assistant', text: 'Connection error. Please WhatsApp us at +254 722 666 644.' }])
    }
    setLoading(false)
  }

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 99999, fontFamily: "'Abel', sans-serif" }}>
      {/* Chat panel */}
      {open && (
        <div style={{
          position: 'absolute', bottom: 70, right: 0,
          width: 'min(370px, calc(100vw - 32px))',
          height: 'min(560px, calc(100vh - 130px))',
          background: '#0f0f0f', borderRadius: 20,
          boxShadow: '0 12px 48px rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.1)',
          overflow: 'hidden', display: 'flex', flexDirection: 'column',
        }}>
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg, #1a1a1a, #0d0d0d)', padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,240,0,0.12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 38, height: 38, background: '#fff000', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>&#9992;</div>
              <div>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: 15, fontFamily: "'Urbanist', sans-serif" }}>Turkenya Assistant</div>
                <div style={{ color: '#22c55e', fontSize: 11, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} /> Online now
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 18, width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&times;</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '85%', padding: '10px 14px', borderRadius: 14,
                  borderBottomRightRadius: m.role === 'user' ? 4 : 14,
                  borderBottomLeftRadius: m.role === 'assistant' ? 4 : 14,
                  background: m.role === 'user' ? '#fff000' : 'rgba(255,255,255,0.07)',
                  color: m.role === 'user' ? '#0d0d0d' : '#f0f0f0',
                  fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                }}>{m.text}</div>
              </div>
            ))}

            {/* Quick replies (only before first user message) */}
            {msgs.length === 1 && !loading && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                {QUICK.map(q => (
                  <button key={q} onClick={() => send(q)} style={{ background: 'rgba(255,240,0,0.08)', border: '1px solid rgba(255,240,0,0.25)', color: '#fff000', padding: '7px 13px', borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{q}</button>
                ))}
              </div>
            )}

            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 14, borderBottomLeftRadius: 4, padding: '12px 16px', display: 'flex', gap: 4 }}>
                  <span className="chat-dot" /><span className="chat-dot" /><span className="chat-dot" />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div style={{ padding: 12, borderTop: '1px solid rgba(255,255,255,0.08)', background: '#0d0d0d' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Type your message..."
                style={{ flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 100, padding: '11px 16px', color: '#fff', fontSize: 14, outline: 'none', fontFamily: "'Abel', sans-serif" }}
              />
              <button onClick={() => send()} disabled={loading || !input.trim()} aria-label="Send" style={{ background: '#fff000', border: 'none', borderRadius: '50%', width: 42, height: 42, minWidth: 42, cursor: loading || !input.trim() ? 'not-allowed' : 'pointer', fontSize: 18, opacity: loading || !input.trim() ? 0.4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0d0d0d' }}>&#10148;</button>
            </div>
            <a href={WA} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 10, color: '#25D366', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z"/></svg>
              Or chat on WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Action menu */}
      {showMenu && !open && (
        <div style={{ position: 'absolute', bottom: 70, right: 0, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
          <a href={WA} target="_blank" rel="noreferrer" onClick={() => setShowMenu(false)} style={{ background: '#25D366', color: '#fff', padding: '11px 18px', borderRadius: 100, fontSize: 13, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(37,211,102,0.4)' }}>WhatsApp Us</a>
          <button onClick={() => { setOpen(true); setShowMenu(false) }} style={{ background: '#fff000', color: '#0d0d0d', padding: '11px 18px', borderRadius: 100, fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(255,240,0,0.3)' }}>Chat with AI</button>
        </div>
      )}

      {/* Launcher */}
      <button onClick={() => { if (open) { setOpen(false) } else { setShowMenu(!showMenu) } }} aria-label="Open chat" style={{ width: 56, height: 56, borderRadius: '50%', background: showMenu || open ? '#1a1a1a' : '#fff000', border: showMenu || open ? '1px solid rgba(255,255,255,0.15)' : 'none', cursor: 'pointer', fontSize: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: showMenu || open ? '#fff' : '#0d0d0d', transition: 'all 0.2s' }}>
        {showMenu || open ? '✕' : '💬'}
      </button>
    </div>
  )
}
