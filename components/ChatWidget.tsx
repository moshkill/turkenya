'use client'
import { useState } from 'react'
import Icon from './Icon'
import Link from 'next/link'

// NOTE: The AI concierge is paused for now (to be redesigned). This widget
// is a clean launcher for WhatsApp + the smart quote builder. The AI chat
// code (app/api/chat, lib/turkenya-knowledge) is kept intact for revisit.
const WA = 'https://wa.me/254722666644'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div className="chat-fab-wrap" style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 99999, fontFamily: "'Abel', sans-serif" }}>
      {open && (
        <div style={{ position: 'absolute', bottom: 70, right: 0, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
          <a href={WA} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 9,
            background: 'rgba(37,211,102,0.18)', color: '#fff', border: '1px solid rgba(37,211,102,0.5)', backdropFilter: 'blur(14px) saturate(160%)', WebkitBackdropFilter: 'blur(14px) saturate(160%)', padding: '12px 20px', borderRadius: 100,
            fontSize: 14, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap',
            boxShadow: '0 6px 20px rgba(37,211,102,0.4)',
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.5h-.01a9.5 9.5 0 01-4.84-1.33l-.35-.2-3.6.94.96-3.51-.23-.36a9.5 9.5 0 01-1.45-5.06c0-5.24 4.27-9.5 9.51-9.5 2.54 0 4.93.99 6.72 2.79a9.46 9.46 0 012.78 6.72c0 5.24-4.27 9.5-9.5 9.5z"/></svg>
            WhatsApp Us
          </a>
          <Link href="/quote" onClick={() => setOpen(false)} className="glass-cta" style={{
            display: 'inline-flex', alignItems: 'center', gap: 9,
            padding: '12px 20px', borderRadius: 100,
            fontSize: 14, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap',
          }}>
            <Icon name="sparkle" size={15} style={{display:"inline",verticalAlign:"-2px",marginRight:6}} />Get a Quote
          </Link>
        </div>
      )}

      <button onClick={() => setOpen(!open)} aria-label="Contact options" style={{
        width: 56, height: 56, borderRadius: '50%',
        background: open ? '#1a1a1a' : '#fff000',
        border: open ? '1px solid rgba(255,255,255,0.15)' : 'none',
        cursor: 'pointer', fontSize: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: open ? '#fff' : '#0d0d0d', transition: 'all 0.2s',
      }}>
        {open ? <Icon name="close" size={22} /> : <Icon name="message" size={22} />}
      </button>
    </div>
  )
}
