export const dynamic = 'force-dynamic'

const articles: Record<string, { title:string; cat:string; date:string; read:string; img:string; content:string }> = {
  'ultimate-maasai-mara-guide': {
    title:'The Ultimate Maasai Mara Safari Guide 2025',
    cat:'Safari Tips', date:'15 Jan 2025', read:'8 min',
    img:'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1400&q=80&fit=crop',
    content:`The Maasai Mara is Kenya's crown jewel — 1,510 square kilometres of sweeping savannah where the drama of the African wild plays out daily. Whether you are watching a lion pride at sunrise or witnessing the Great Migration crossing, the Mara delivers an experience unlike anywhere else on Earth.

WHEN TO GO

The Great Migration crosses the Mara River between July and October, making this the peak season. However, the Mara is spectacular year-round. January to March offers lush green scenery and excellent predator sightings after the short rains. The dry season (June to October) means animals concentrate around water, making game viewing more predictable.

WHERE TO STAY

Accommodation ranges from budget campsites at KES 3,000 per night to ultra-luxury tented camps at USD 800+ per night. For most visitors, a mid-range tented camp in the conservancies (Olare Motorogi, Naboisho, Mara North) offers the best balance of exclusivity and value. These private conservancies border the Mara reserve and allow off-road driving and night game drives — activities not permitted in the main reserve.

WHAT TO EXPECT ON GAME DRIVES

A typical day starts at 06:00 with a sunrise drive lasting 3-4 hours. You return for breakfast and a midday rest, then head out again from 15:30 until sunset. An experienced guide makes all the difference — at Turkenya, all our guides are KWS-certified with minimum 5 years in the field.

THE BIG FIVE CHECK LIST

All Big Five (lion, leopard, elephant, buffalo, rhino) are present in the Mara ecosystem. Lions and elephants are sighted on virtually every visit. Leopards require patience but our guides know their territories. Black rhinos are rarer — found mainly in the Mara Triangle managed by the Mara Conservancy.

PACKING LIST

Neutral-coloured clothing (khaki, olive, tan — avoid blue and black which attract tsetse flies), a quality zoom lens if you shoot photography, binoculars, sunscreen, insect repellent, and a light fleece for early mornings.

BOOK WITH TURKENYA

We offer 3-day, 5-day and 8-day Mara packages from KES 45,000 per person. All our safaris include park fees, accommodation, meals, game drives, and airport transfers. Contact us for a custom itinerary.`
  },
  'budget-kenya-safari': {
    title:'How to Do a Kenya Safari on a Budget',
    cat:'Budget Travel', date:'22 Feb 2025', read:'6 min',
    img:'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1400&q=80&fit=crop',
    content:`Kenya is often perceived as an expensive destination, but with the right planning you can experience world-class wildlife without breaking the bank. Here is our honest guide to budget safari options from Turkenya.

OPTION 1 — GROUP JOINING SAFARIS

Rather than booking a private vehicle, you join a small group (max 6 people) sharing a safari vehicle and costs. This cuts prices dramatically. A 3-day Maasai Mara group safari can cost as little as KES 22,000 per person including transport from Nairobi, accommodation, park fees, and meals.

OPTION 2 — CAMPSITES OVER LODGES

Public campsites inside national parks charge KES 2,000–4,000 per night. You bring your own tent or hire one. The experience is raw and authentic — you may hear lions at night. Combine with self-catering and your entire 3-day trip budget drops significantly.

OPTION 3 — SHOULDER SEASON TRAVEL

April, May, and November are the low/shoulder seasons in Kenya. Accommodation rates drop 30–50% and parks are less crowded. The long rains fall in April and May, but game viewing is still excellent — predators are active and the landscapes are stunning green.

OPTION 4 — NAIROBI DAY TRIPS

Nairobi National Park is the world's only national park adjacent to a capital city. Entry is USD 35 for non-residents. You can see lions, cheetahs, giraffes, rhinos and more on a half-day trip from Nairobi — no overnight stay required.

WHAT BUDGET SAFARI DOES NOT COMPROMISE

Wildlife quality is the same regardless of your budget. The animals do not distinguish between a USD 50 campsite and a USD 500 lodge. A good guide, patience, and early mornings are what deliver memorable sightings.

TALK TO US

At Turkenya we are transparent about pricing. Tell us your budget and we will build the best possible experience within it — no hidden fees, no upselling pressure.`
  },
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = articles[params.slug]
  const css = '@keyframes heroIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}'

  if (!post) {
    return (
      <main style={{ background:'#0D0D0D', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Abel',system-ui,sans-serif" }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:80, marginBottom:24 }}>404</div>
          <h1 style={{ color:'#fff000', fontWeight:900, fontSize:32, marginBottom:16 }}>Article Not Found</h1>
          <a href="/blog" style={{ color:'rgba(255,255,255,0.6)', textDecoration:'none', fontSize:14 }}>← Back to Blog</a>
        </div>
      </main>
    )
  }

  return (
    <main style={{ background:'#0D0D0D', minHeight:'100vh', color:'#fff', fontFamily:"'Abel',system-ui,sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* HERO IMAGE */}
      <section style={{ position:'relative', height:'55vh', minHeight:400, overflow:'hidden' }}>
        <img src={post.img} alt={post.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(13,13,13,0.95) 100%)' }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'0 24px 48px', maxWidth:900, margin:'0 auto', animation:'heroIn 0.8s ease forwards' }}>
          <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:16 }}>
            <span style={{ background:'#fff000', color:'#0D0D0D', padding:'4px 12px', fontSize:10, fontWeight:800, letterSpacing:'2px', borderRadius:2 }}>{post.cat}</span>
            <span style={{ color:'rgba(255,255,255,0.5)', fontSize:12 }}>{post.date} · {post.read} read</span>
          </div>
          <h1 style={{ fontSize:'clamp(24px,4vw,52px)', fontWeight:900, margin:0, lineHeight:1.2 }}>{post.title}</h1>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <section style={{ maxWidth:820, margin:'0 auto', padding:'60px 24px 80px' }}>
        <a href="/blog" style={{ display:'inline-flex', alignItems:'center', gap:8, color:'rgba(255,255,255,0.5)', textDecoration:'none', fontSize:13, marginBottom:48, letterSpacing:'1px' }}>← BACK TO BLOG</a>
        {post.content.split('\n\n').map((para, i) => {
          if (para === para.toUpperCase() && para.length < 60) {
            return <h2 key={i} style={{ fontSize:20, fontWeight:800, color:'#fff000', margin:'40px 0 16px', letterSpacing:'2px', textTransform:'uppercase', borderLeft:'3px solid #fff000', paddingLeft:16 }}>{para}</h2>
          }
          return <p key={i} style={{ fontSize:17, lineHeight:1.85, color:'rgba(255,255,255,0.82)', margin:'0 0 24px' }}>{para}</p>
        })}

        {/* CTA CARD */}
        <div style={{ marginTop:60, background:'rgba(255,240,0,0.07)', border:'1px solid rgba(255,240,0,0.25)', borderRadius:10, padding:36, textAlign:'center' }}>
          <h3 style={{ fontSize:22, fontWeight:900, marginBottom:12 }}>Ready to Make It Real?</h3>
          <p style={{ color:'rgba(255,255,255,0.65)', marginBottom:24, fontSize:15 }}>Talk to our team and we will build your perfect itinerary.</p>
          <a href="/contact" style={{ display:'inline-block', background:'#fff000', color:'#0D0D0D', padding:'14px 40px', fontWeight:800, textDecoration:'none', fontSize:13, letterSpacing:'2px', borderRadius:2 }}>GET A FREE QUOTE</a>
        </div>
      </section>
    </main>
  )
}
