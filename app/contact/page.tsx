'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'

const info = [
  { icon:'📍', label:'Head Office', value:'Tom Mboya Street, Nairobi CBD, Kenya' },
  { icon:'📞', label:'Call / WhatsApp', value:'+254 700 000 000' },
  { icon:'✉️', label:'Email', value:'info@turkenya.com' },
  { icon:'🕒', label:'Office Hours', value:'Mon–Sat: 8:00am – 6:00pm\nSunday: 10:00am – 2:00pm' },
]

const services = ['Maasai Mara Safari','Amboseli Safari','International Travel','Air Ticketing','Car Hire','Logistics & Cargo','Custom Package','Other']

export default function ContactPage() {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const data = Object.fromEntries(fd)
    try {
      const res = await fetch('/api/leads', { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(data) })
      if (res.ok) { setStatus('success') } else { setStatus('error') }
    } catch { setStatus('error') }
    setLoading(false)
  }

  const css = '@keyframes heroIn{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}} @keyframes kenBurns{from{transform:scale(1)}to{transform:scale(1.08)}}'
  return (
    <main style={{ background:'#0D0D0D', minHeight:'100vh', color:'#fff', fontFamily:"'Abel',system-ui,sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* HERO */}
      <section style={{ position:'relative', height:'45vh', minHeight:340, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=1920&q=80&fit=crop)', backgroundSize:'cover', backgroundPosition:'center 40%', animation:'kenBurns 12s ease forwards' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(13,13,13,0.9) 100%)' }} />
        <div style={{ position:'relative', zIndex:1, textAlign:'center', padding:'0 24px', animation:'heroIn 1s ease forwards' }}>
          <div style={{ display:'inline-block', background:'rgba(255,240,0,0.15)', border:'1px solid #fff000', color:'#fff000', padding:'6px 18px', fontSize:11, fontWeight:800, letterSpacing:'3px', marginBottom:20, borderRadius:2 }}>GET IN TOUCH</div>
          <h1 style={{ fontSize:'clamp(32px,5vw,60px)', fontWeight:900, margin:'0 0 16px', textTransform:'uppercase' }}>
            Let&apos;s Plan Your <span style={{ color:'#fff000' }}>Adventure</span>
          </h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.75)', maxWidth:480, margin:'0 auto' }}>Our team responds within 2 hours during business hours.</p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ maxWidth:1200, margin:'0 auto', padding:'72px 24px 80px', display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:60, alignItems:'start' }}>

        {/* LEFT — CONTACT INFO */}
        <div>
          <h2 style={{ fontSize:24, fontWeight:900, marginBottom:8, textTransform:'uppercase' }}>Contact <span style={{ color:'#fff000' }}>Info</span></h2>
          <p style={{ color:'rgba(255,255,255,0.55)', fontSize:14, marginBottom:40, lineHeight:1.7 }}>We are based in Nairobi and serve clients across Kenya and East Africa. Reach us via phone, WhatsApp, email or walk in.</p>

          <div style={{ display:'flex', flexDirection:'column', gap:20, marginBottom:48 }}>
            {info.map(item => (
              <div key={item.label} style={{ display:'flex', gap:18, alignItems:'flex-start', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, padding:20 }}>
                <span style={{ fontSize:24, flexShrink:0, marginTop:2 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize:11, color:'#fff000', fontWeight:800, letterSpacing:'2px', marginBottom:6 }}>{item.label}</div>
                  <div style={{ fontSize:14, color:'rgba(255,255,255,0.8)', whiteSpace:'pre-line', lineHeight:1.6 }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* WHATSAPP BUTTON */}
          <a href="https://wa.me/254700000000?text=Hello Turkenya, I would like to enquire about a tour" target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, background:'#25D366', color:'#fff', padding:'16px 24px', fontWeight:800, textDecoration:'none', fontSize:14, letterSpacing:'1px', borderRadius:6 }}>
            <span style={{ fontSize:22 }}>💬</span> CHAT ON WHATSAPP
          </a>
        </div>

        {/* RIGHT — FORM */}
        <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, padding:40 }}>
          <h2 style={{ fontSize:22, fontWeight:900, marginBottom:8, textTransform:'uppercase' }}>Send an <span style={{ color:'#fff000' }}>Enquiry</span></h2>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:13, marginBottom:32 }}>Fill in the form and we will get back to you within 2 hours.</p>

          {status === 'success' ? (
            <div style={{ textAlign:'center', padding:'48px 24px' }}>
              <div style={{ fontSize:60, marginBottom:20 }}>✅</div>
              <h3 style={{ fontSize:22, fontWeight:800, color:'#fff000', marginBottom:12 }}>Message Received!</h3>
              <p style={{ color:'rgba(255,255,255,0.65)', lineHeight:1.7 }}>Thank you for reaching out. Our team will contact you within 2 hours during business hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:18 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                {[['name','Full Name','text'],['phone','Phone / WhatsApp','tel']].map(([n,p,t]) => (
                  <div key={n}>
                    <label style={{ display:'block', fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.5)', letterSpacing:'2px', marginBottom:8 }}>{p.toUpperCase()}</label>
                    <input name={n} type={t} placeholder={p} required style={{ width:'100%', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:6, padding:'12px 14px', color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box' }} />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ display:'block', fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.5)', letterSpacing:'2px', marginBottom:8 }}>EMAIL ADDRESS</label>
                <input name="email" type="email" placeholder="your@email.com" style={{ width:'100%', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:6, padding:'12px 14px', color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box' }} />
              </div>
              <div>
                <label style={{ display:'block', fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.5)', letterSpacing:'2px', marginBottom:8 }}>SERVICE INTERESTED IN</label>
                <select name="service" style={{ width:'100%', background:'rgba(30,30,30,1)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:6, padding:'12px 14px', color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box' }}>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display:'block', fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.5)', letterSpacing:'2px', marginBottom:8 }}>TRAVEL DATES (OPTIONAL)</label>
                <input name="dates" type="text" placeholder="e.g. 15–20 August 2025" style={{ width:'100%', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:6, padding:'12px 14px', color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box' }} />
              </div>
              <div>
                <label style={{ display:'block', fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.5)', letterSpacing:'2px', marginBottom:8 }}>YOUR MESSAGE</label>
                <textarea name="message" placeholder="Tell us about your group size, budget, and what you are looking for..." rows={5} required style={{ width:'100%', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:6, padding:'12px 14px', color:'#fff', fontSize:14, outline:'none', resize:'vertical', boxSizing:'border-box' }} />
              </div>
              {status === 'error' && <div style={{ background:'rgba(255,60,60,0.1)', border:'1px solid rgba(255,60,60,0.3)', color:'#ff6b6b', padding:'12px 16px', borderRadius:6, fontSize:13 }}>Something went wrong. Please try WhatsApp or call us directly.</div>}
              <button type="submit" disabled={loading} style={{ background: loading?'rgba(255,240,0,0.5)':'#fff000', color:'#0D0D0D', padding:'16px', fontWeight:900, fontSize:14, letterSpacing:'3px', border:'none', borderRadius:6, cursor: loading?'not-allowed':'pointer', transition:'all 0.2s' }}>{loading ? 'SENDING...' : 'SEND ENQUIRY'}</button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
