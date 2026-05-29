export const dynamic = 'force-dynamic'
export const metadata = { title: 'Travel Blog | Turkenya Tours & Safaris', description: 'Kenya safari tips, travel guides, destination inspiration and insider advice from Turkenya Tours.' }

const posts = [
  { slug:'ultimate-maasai-mara-guide', title:'The Ultimate Maasai Mara Safari Guide 2025', cat:'Safari Tips', date:'15 Jan 2025', read:'8 min', img:'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80&fit=crop', excerpt:'Everything you need to know about visiting the Maasai Mara — best time, camps, game drives and what the Great Migration really looks like up close.' },
  { slug:'budget-kenya-safari', title:'How to Do a Kenya Safari on a Budget', cat:'Budget Travel', date:'22 Feb 2025', read:'6 min', img:'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80&fit=crop', excerpt:'You do not need to spend a fortune to see the Big Five. Here is our honest breakdown of budget safari options, shared vehicles, and affordable camps.' },
  { slug:'dubai-layover-guide', title:'Making the Most of a Dubai Layover', cat:'International', date:'10 Mar 2025', read:'5 min', img:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80&fit=crop', excerpt:'Got 12–48 hours in Dubai between flights? We show you the best spots, food, and how to book a same-day tour without the stress.' },
  { slug:'kenya-car-hire-tips', title:'5 Things to Know Before Hiring a Car in Kenya', cat:'Car Hire', date:'2 Apr 2025', read:'4 min', img:'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80&fit=crop', excerpt:'From road conditions to insurance requirements — our practical guide to self-drive car hire in Kenya so your road trip stays stress-free.' },
  { slug:'amboseli-kilimanjaro-views', title:'Amboseli: Africa\'s Best Kilimanjaro Views', cat:'Destinations', date:'18 Apr 2025', read:'7 min', img:'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80&fit=crop', excerpt:'Amboseli National Park offers some of the most dramatic elephant-and-mountain scenery in Africa. Here is why it deserves a spot on your Kenya itinerary.' },
  { slug:'nairobi-city-guide', title:'Nairobi in 48 Hours: The Insider City Guide', cat:'Destinations', date:'5 May 2025', read:'6 min', img:'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=800&q=80&fit=crop', excerpt:'Nairobi is much more than a transit hub. From the National Museum to Carnivore Restaurant — the places locals actually love in the Safari Capital.' },
]

const cats = ['All', 'Safari Tips', 'Budget Travel', 'International', 'Car Hire', 'Destinations']

export default function BlogPage() {
  const css = '@keyframes heroIn{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}} @keyframes kenBurns{from{transform:scale(1)}to{transform:scale(1.08)}}'
  return (
    <main style={{ background:'#0D0D0D', minHeight:'100vh', color:'#fff', fontFamily:"'Abel',system-ui,sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* HERO */}
      <section style={{ position:'relative', height:'50vh', minHeight:380, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80&fit=crop)', backgroundSize:'cover', backgroundPosition:'center', animation:'kenBurns 12s ease forwards' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(13,13,13,0.92) 100%)' }} />
        <div style={{ position:'relative', zIndex:1, textAlign:'center', padding:'0 24px', animation:'heroIn 1s ease forwards' }}>
          <div style={{ display:'inline-block', background:'rgba(255,240,0,0.15)', border:'1px solid #fff000', color:'#fff000', padding:'6px 18px', fontSize:11, fontWeight:800, letterSpacing:'3px', marginBottom:20, borderRadius:2 }}>TRAVEL STORIES</div>
          <h1 style={{ fontSize:'clamp(32px,5vw,60px)', fontWeight:900, margin:'0 0 16px', textTransform:'uppercase' }}>
            The Turkenya <span style={{ color:'#fff000' }}>Blog</span>
          </h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.75)', maxWidth:480, margin:'0 auto' }}>Safari guides, travel tips, destination deep-dives and insider Africa knowledge</p>
        </div>
      </section>

      {/* CATEGORY PILLS */}
      <section style={{ background:'rgba(255,255,255,0.02)', borderBottom:'1px solid rgba(255,255,255,0.06)', padding:'20px 24px', overflowX:'auto' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', gap:12, flexWrap:'wrap' }}>
          {cats.map((c,i) => (
            <span key={c} style={{ background: i===0?'#fff000':'rgba(255,255,255,0.06)', color: i===0?'#0D0D0D':'rgba(255,255,255,0.7)', padding:'8px 20px', borderRadius:20, fontSize:12, fontWeight:700, letterSpacing:'1px', cursor:'pointer', whiteSpace:'nowrap', border: i===0?'none':'1px solid rgba(255,255,255,0.1)' }}>{c}</span>
          ))}
        </div>
      </section>

      {/* FEATURED POST */}
      <section style={{ maxWidth:1200, margin:'0 auto', padding:'60px 24px 0' }}>
        <div style={{ position:'relative', borderRadius:12, overflow:'hidden', height:440 }}>
          <img src={posts[0].img} alt={posts[0].title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 60%)' }} />
          <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:40 }}>
            <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:16 }}>
              <span style={{ background:'#fff000', color:'#0D0D0D', padding:'4px 12px', fontSize:10, fontWeight:800, letterSpacing:'2px', borderRadius:2 }}>FEATURED</span>
              <span style={{ background:'rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.7)', padding:'4px 12px', fontSize:10, fontWeight:700, borderRadius:2 }}>{posts[0].cat}</span>
            </div>
            <h2 style={{ fontSize:'clamp(20px,3vw,36px)', fontWeight:900, margin:'0 0 12px', maxWidth:700 }}>{posts[0].title}</h2>
            <p style={{ color:'rgba(255,255,255,0.75)', fontSize:14, maxWidth:600, marginBottom:20 }}>{posts[0].excerpt}</p>
            <div style={{ display:'flex', alignItems:'center', gap:16 }}>
              <span style={{ color:'rgba(255,255,255,0.5)', fontSize:12 }}>{posts[0].date}</span>
              <span style={{ color:'rgba(255,255,255,0.3)' }}>•</span>
              <span style={{ color:'rgba(255,255,255,0.5)', fontSize:12 }}>{posts[0].read} read</span>
              <a href={'/blog/' + posts[0].slug} style={{ marginLeft:'auto', background:'#fff000', color:'#0D0D0D', padding:'10px 24px', fontSize:11, fontWeight:800, textDecoration:'none', letterSpacing:'2px', borderRadius:2 }}>READ ARTICLE</a>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section style={{ maxWidth:1200, margin:'0 auto', padding:'48px 24px 80px' }}>
        <h2 style={{ fontSize:22, fontWeight:800, marginBottom:32, textTransform:'uppercase', letterSpacing:'2px' }}>Latest <span style={{ color:'#fff000' }}>Articles</span></h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:28 }}>
          {posts.slice(1).map(p => (
            <article key={p.slug} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, overflow:'hidden' }}>
              <div style={{ height:220, overflow:'hidden', position:'relative' }}>
                <img src={p.img} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:12, left:12, background:'rgba(255,240,0,0.9)', color:'#0D0D0D', padding:'3px 10px', fontSize:10, fontWeight:800, letterSpacing:'1.5px', borderRadius:2 }}>{p.cat}</div>
              </div>
              <div style={{ padding:24 }}>
                <h3 style={{ fontSize:17, fontWeight:800, margin:'0 0 12px', lineHeight:1.4 }}>{p.title}</h3>
                <p style={{ fontSize:13, color:'rgba(255,255,255,0.6)', lineHeight:1.7, marginBottom:20 }}>{p.excerpt}</p>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)' }}>{p.date} · {p.read} read</div>
                  </div>
                  <a href={'/blog/' + p.slug} style={{ background:'rgba(255,240,0,0.1)', color:'#fff000', border:'1px solid rgba(255,240,0,0.3)', padding:'8px 16px', fontSize:11, fontWeight:700, textDecoration:'none', letterSpacing:'1px', borderRadius:2 }}>READ →</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:'rgba(255,240,0,0.05)', borderTop:'1px solid rgba(255,240,0,0.15)', borderBottom:'1px solid rgba(255,240,0,0.15)', padding:'60px 24px', textAlign:'center' }}>
        <h2 style={{ fontSize:28, fontWeight:900, marginBottom:16, textTransform:'uppercase' }}>Ready to <span style={{ color:'#fff000' }}>Experience Africa?</span></h2>
        <p style={{ color:'rgba(255,255,255,0.6)', marginBottom:32 }}>Stop reading about it. Let us build your perfect safari.</p>
        <a href="/contact" style={{ display:'inline-block', background:'#fff000', color:'#0D0D0D', padding:'16px 48px', fontWeight:800, textDecoration:'none', fontSize:14, letterSpacing:'2px', borderRadius:2 }}>PLAN MY TRIP</a>
      </section>
    </main>
  )
}
