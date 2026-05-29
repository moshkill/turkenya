'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background:'#0a0a0a', borderTop:'1px solid rgba(255,240,0,0.15)', fontFamily:"'Abel',system-ui,sans-serif" }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'64px 24px 40px', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:48 }}>

        {/* BRAND */}
        <div>
          <img src="/logo.png" alt="Turkenya" style={{ height:40, width:'auto', marginBottom:20 }} />
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:14, lineHeight:1.8, maxWidth:240 }}>Creating unforgettable travel memories across East Africa and beyond. IATA registered. Fully licensed tour operator.</p>
          <div style={{ display:'flex', gap:8, marginTop:24 }}>
            {[['IATA','Licensed'],['KMT','Approved'],['KWS','Certified']].map(([b,l])=>(
              <div key={b} style={{ background:'rgba(255,240,0,0.08)', border:'1px solid rgba(255,240,0,0.2)', borderRadius:4, padding:'6px 10px', textAlign:'center' }}>
                <div style={{ fontSize:11, fontWeight:800, color:'#fff000' }}>{b}</div>
                <div style={{ fontSize:9, color:'rgba(255,255,255,0.4)', marginTop:1 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SERVICES */}
        <div>
          <h4 style={{ fontSize:11, fontWeight:800, color:'#fff000', letterSpacing:'3px', textTransform:'uppercase', marginBottom:20 }}>Our Services</h4>
          {[
            ['Safari Tours','/safaris'],
            ['Air Ticketing','/air-ticketing'],
            ['Car Hire','/car-rental'],
            ['Hotel Booking','/hotel-booking'],
            ['International Travel','/international'],
            ['Pilgrimage Tours','/pilgrimage-tours'],
            ['Medical Tourism','/medical-tourism'],
            ['Airport Transfers','/airport-transfers'],
            ['Conferences & Events','/conferences'],
            ['Logistics & Cargo','/logistics'],
          ].map(([l,h])=>(
            <Link key={h} href={h} style={{ display:'block', color:'rgba(255,255,255,0.55)', textDecoration:'none', fontSize:14, padding:'4px 0', transition:'color 0.2s' }}
              onMouseEnter={e=>(e.target as HTMLElement).style.color='#fff000'}
              onMouseLeave={e=>(e.target as HTMLElement).style.color='rgba(255,255,255,0.55)'}>{l}</Link>
          ))}
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 style={{ fontSize:11, fontWeight:800, color:'#fff000', letterSpacing:'3px', textTransform:'uppercase', marginBottom:20 }}>Quick Links</h4>
          {[['About Us','/about'],['Blog','/blog'],['Contact','/contact'],['Get a Quote','/contact'],['Admin Login','/admin']].map(([l,h])=>(
            <Link key={l} href={h} style={{ display:'block', color:'rgba(255,255,255,0.55)', textDecoration:'none', fontSize:14, padding:'4px 0', transition:'color 0.2s' }}
              onMouseEnter={e=>(e.target as HTMLElement).style.color='#fff000'}
              onMouseLeave={e=>(e.target as HTMLElement).style.color='rgba(255,255,255,0.55)'}>{l}</Link>
          ))}
        </div>

        {/* CONTACT */}
        <div>
          <h4 style={{ fontSize:11, fontWeight:800, color:'#fff000', letterSpacing:'3px', textTransform:'uppercase', marginBottom:20 }}>Reach Us</h4>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {[
              { icon:'📍', text:'3rd Floor T-Mall, Nairobi West, Langata Road' },
              { icon:'📞', text:'+254 729 888 666' },
              { icon:'✉️', text:'info@turkenya.com' },
              { icon:'🕒', text:'Mon–Sat: 8am – 8pm EAT' },
            ].map(item=>(
              <div key={item.icon} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <span style={{ fontSize:16, flexShrink:0 }}>{item.icon}</span>
                <span style={{ color:'rgba(255,255,255,0.6)', fontSize:14, lineHeight:1.6 }}>{item.text}</span>
              </div>
            ))}
          </div>
          <a href="https://wa.me/254729888666" target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:8, marginTop:20, background:'#25D366', color:'#fff', padding:'10px 18px', borderRadius:6, textDecoration:'none', fontSize:13, fontWeight:700 }}>
            <span>💬</span> WhatsApp Us
          </a>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', padding:'20px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12, maxWidth:1280, margin:'0 auto' }}>
        <p style={{ color:'rgba(255,255,255,0.3)', fontSize:13, margin:0 }}>© 2026 Turkenya Tours and Safaris Ltd. All rights reserved.</p>
        <p style={{ color:'rgba(255,255,255,0.25)', fontSize:12, margin:0 }}>IATA Licensed Tour Operator · Nairobi, Kenya</p>
      </div>
    </footer>
  )
}
