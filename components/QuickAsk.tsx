'use client'
import { useState } from 'react'
import Icon from './Icon'
import { useRouter } from 'next/navigation'

// Conversational hero input. Intent-only: it carries the user's words to the
// smart booking form (which extracts fields via /api/parse-trip). It NEVER
// quotes or invents anything — a real person confirms the price.
export default function QuickAsk() {
  const [text, setText] = useState('')
  const router = useRouter()

  function submit() {
    const t = text.trim()
    router.push(t ? `/quote?ask=${encodeURIComponent(t)}` : '/quote')
  }

  return (
    <div>
      <div className="quickask">
        <span style={{ color: '#fff000', fontSize: 18, flexShrink: 0 }}><Icon name="sparkle" size={14} style={{display:"inline",verticalAlign:"-2px"}} /></span>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') submit() }}
          placeholder="Describe your trip — e.g. “Return flights Nairobi → London for 2, business, mid-December”"
          aria-label="Describe your trip"
        />
        <button onClick={submit} className="glass-cta" style={{ flexShrink: 0, padding: '14px 30px', borderRadius: 100, fontSize: 14, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer' }}>
          Plan it
        </button>
      </div>
      <div style={{ color: 'rgba(255,255,255,0.32)', fontSize: 14, marginTop: 14 }}>
        Our AI fills the form from your words — then a real person confirms the price. We never auto-quote.
      </div>
    </div>
  )
}
