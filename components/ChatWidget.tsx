'use client';
import { useState, useRef, useEffect } from 'react';
type Msg = { role: 'user' | 'assistant'; text: string };
const WA = 'https://wa.me/254722666644';
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'assistant', text: 'Hi! I am your Turkenya travel assistant. Ask me about safaris, flights, car hire or any of our services!' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, loading]);
  const send = async () => {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput('');
    setMsgs(m => [...m, { role: 'user', text: msg }]);
    setLoading(true);
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: msg }) });
      const d = await r.json();
      setMsgs(m => [...m, { role: 'assistant', text: d.reply || 'Sorry, please try again or WhatsApp us.' }]);
    } catch {
      setMsgs(m => [...m, { role: 'assistant', text: 'Connection error. Please WhatsApp us directly.' }]);
    }
    setLoading(false);
  };
  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 99999, fontFamily: "'Abel', sans-serif" }}>
      {open && (
        <div style={{ position: 'absolute', bottom: 72, right: 0, width: 340, background: '#111', borderRadius: 20, boxShadow: '0 8px 40px rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '65vh' }}>
          <div style={{ background: '#000', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, background: '#fff000', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>✈</div>
              <div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>AI Travel Assistant</div>
                <div style={{ color: '#fff000', fontSize: 11 }}>Powered by Groq · Online</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 20 }}>×</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '85%', padding: '9px 13px', borderRadius: 12, background: m.role === 'user' ? '#fff000' : 'rgba(255,255,255,0.08)', color: m.role === 'user' ? '#000' : 'white', fontSize: 14, lineHeight: 1.5 }}>
                  {m.text}
                  {m.role === 'assistant' && i > 0 && (
                    <a href={WA + '?text=' + encodeURIComponent(msgs[i-1]?.text || '')} target='_blank' rel='noreferrer' style={{ display: 'block', marginTop: 6, color: '#25D366', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>💬 Continue on WhatsApp</a>
                  )}
                </div>
              </div>
            ))}
            {loading && <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, padding: '6px 0' }}>Typing...</div>}
            <div ref={endRef} />
          </div>
          <div style={{ padding: 10, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 8, background: '#0d0d0d' }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder='Ask about safaris, flights...' style={{ flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '9px 12px', color: 'white', fontSize: 13, outline: 'none' }} />
            <button onClick={send} disabled={loading || !input.trim()} style={{ background: '#fff000', border: 'none', borderRadius: 8, width: 38, height: 38, cursor: 'pointer', fontSize: 16, opacity: loading || !input.trim() ? 0.4 : 1 }}>→</button>
          </div>
          <a href={WA} target='_blank' rel='noreferrer' style={{ display: 'block', background: '#25D366', color: 'white', textAlign: 'center', padding: '10px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>💬 WhatsApp: +254 722 666 644</a>
        </div>
      )}
      {showMenu && !open && (
        <div style={{ position: 'absolute', bottom: 72, right: 0, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
          <a href={WA} target='_blank' rel='noreferrer' onClick={() => setShowMenu(false)} style={{ background: '#25D366', color: 'white', padding: '10px 18px', borderRadius: 50, fontSize: 13, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(37,211,102,0.4)' }}>💬 WhatsApp Us</a>
          <button onClick={() => { setOpen(true); setShowMenu(false); }} style={{ background: '#fff000', color: '#000', padding: '10px 18px', borderRadius: 50, fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(255,255,0,0.3)' }}>✈ AI Assistant</button>
        </div>
      )}
      <button onClick={() => { setShowMenu(!showMenu); if (open) setOpen(false); }} style={{ width: 54, height: 54, borderRadius: '50%', background: showMenu || open ? '#333' : '#fff000', border: 'none', cursor: 'pointer', fontSize: 22, boxShadow: '0 4px 20px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{showMenu || open ? '✕' : '💬'}</button>
    </div>
  );
}
