"use client";

'use client'
import { useState, useRef, useEffect } from 'react'

type Message = { role: 'user' | 'ai'; text: string }

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://172.238.107.107'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Jambo! 👋 I'm your Turkenya travel assistant. Ask me about safaris, flights, car hire, hotels or any travel service!" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'ai', text: data.reply || 'Sorry, something went wrong. Please call us on +254 722 666 644' }])
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Connection error. Call us: +254 722 666 644' }])
    }
    setLoading(false)
  }

  return (
    <div className="chat-widget">
      {/* Chat window */}
      {open && (
        <div style={{ width: 340, height: 480, background: '#1E1E1E', border: '1px solid rgba(245,197,24,0.3)', display: 'flex', flexDirection: 'column', marginBottom: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
          {/* Header */}
          <div style={{ background: '#fff000', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 800, fontSize: 14, color: '#0D0D0D' }}>Turkenya AI Assistant</div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#1E1E1E', letterSpacing: '0.1em' }}>● ONLINE · Powered by AI</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#0D0D0D', fontWeight: 700 }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '80%',
                  padding: '10px 14px',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 14,
                  lineHeight: 1.6,
                  background: msg.role === 'user' ? '#fff000' : '#2A2A2A',
                  color: msg.role === 'user' ? '#0D0D0D' : '#F5F0E8',
                  borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '8px 0' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 6, height: 6, background: '#fff000', borderRadius: '50%', animation: `bounce 1s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask about safaris, flights..."
              style={{ flex: 1, background: '#0D0D0D', border: '1px solid rgba(245,197,24,0.2)', color: '#F5F0E8', padding: '10px 12px', fontFamily: 'DM Sans, sans-serif', fontSize: 14, outline: 'none' }}
            />
            <button onClick={send} disabled={loading} style={{ background: '#fff000', border: 'none', padding: '10px 16px', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#0D0D0D', transition: 'background 0.2s' }}>→</button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button onClick={() => setOpen(!open)} className="animate-pulse-yellow" style={{ width: 56, height: 56, background: '#fff000', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, boxShadow: '0 4px 20px rgba(245,197,24,0.4)', marginLeft: 'auto', transition: 'all 0.2s ease' }}>
        {open ? '✕' : '💬'}
      </button>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  )
}
