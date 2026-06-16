export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { getDbPost, getAllMeta, SITE_URL } from '@/lib/blog'
import Icon from '@/components/Icon'

const articles: Record<string, { title:string; cat:string; date:string; read:string; img:string; content:string }> = {
  'ultimate-maasai-mara-guide': {
    title:'The Ultimate Maasai Mara Safari Guide 2025',
    cat:'Safari Tips', date:'15 Jan 2025', read:'8 min',
    img:'/images/safaris.jpg',
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
  'dubai-layover-guide': {
    title:'Making the Most of a Dubai Layover',
    cat:'International', date:'10 Mar 2025', read:'5 min',
    img:'/images/international.jpg',
    content:`Dubai is one of the world's busiest transit hubs, and if you are flying between Nairobi and Europe, Asia, or the Americas, chances are you will pass through here. Rather than waiting at the gate, turn your layover into a mini-adventure. Here is how to make the most of 12 to 48 hours in Dubai.

DO YOU NEED A VISA?

Kenyan passport holders require a visa to leave Dubai International Airport. The good news — Turkenya arranges Dubai visas quickly, often within 3 to 4 working days. If you have a layover planned, talk to us before you travel and we will sort the paperwork so you can step out and explore.

12-HOUR LAYOVER

With half a day, head straight to the iconic sights. Take the Dubai Metro from the airport directly to the Burj Khalifa and Dubai Mall — about 30 minutes. See the world's tallest building, watch the fountain show, and grab lunch at one of the 200+ restaurants. You will be back at the airport with time to spare.

24-HOUR LAYOVER

Book a day room at an airport hotel to freshen up, then do a half-day city tour: the Burj Khalifa, the Dubai Frame, Jumeirah Beach, and the Gold and Spice Souks in old Dubai. End with dinner at a rooftop restaurant overlooking the marina.

48-HOUR LAYOVER

Now you have time for a desert safari — dune bashing, camel rides, a Bedouin camp dinner under the stars. Combine it with a day at the beach or a trip to the Palm Jumeirah. Turkenya can package the whole stopover with hotel, transfers, and tours included.

LAYOVER TIPS

Keep your luggage in airport storage if you only have a few hours. Dubai is extremely safe and taxis are plentiful, but the Metro is faster and cheaper. Carry light clothing — even in winter, daytime temperatures are warm.

LET US PLAN IT

Turkenya specialises in turning Dubai layovers into highlights. Visa, hotel, transfers, and tours — booked as one seamless package. Ask us about adding a Dubai stopover to your next international ticket.`
  },
  'kenya-car-hire-tips': {
    title:'5 Things to Know Before Hiring a Car in Kenya',
    cat:'Car Hire', date:'2 Apr 2025', read:'4 min',
    img:'/images/car-hire.jpg',
    content:`Hiring a car in Kenya gives you freedom — to chase sunrises, detour to a roadside market, or drive the Rift Valley at your own pace. But there are a few local realities worth knowing before you get behind the wheel. Here are our five essential tips.

1. CHOOSE THE RIGHT VEHICLE FOR THE ROUTE

City and tarmac trips are fine in a saloon like a Toyota Corolla. But if you are heading to the Maasai Mara, Amboseli, or anywhere upcountry, you need a 4x4 — a RAV4, Prado, or Land Cruiser. Park roads are rough, and during the rains a 2WD will get stuck. When in doubt, go 4x4.

2. SELF-DRIVE OR CHAUFFEUR?

Self-drive suits confident drivers comfortable with left-hand-side driving and Nairobi traffic. But many visitors — especially first-timers — prefer a chauffeur. Our drivers know every route, handle the traffic, and double as informal guides. For safaris, a driver-guide is almost always the better choice.

3. UNDERSTAND THE INSURANCE

Always confirm what your hire includes. Turkenya vehicles come with comprehensive insurance, but check the excess (the amount you pay in case of damage). We offer excess-reduction options for peace of mind. Never drive an uninsured vehicle in Kenya.

4. KNOW THE ROAD RULES AND CONDITIONS

Kenya drives on the LEFT. Speed limits are enforced by cameras and police, especially on highways. Watch for speed bumps (often unmarked) near towns, matatus that stop suddenly, and boda boda motorcycles. Carry your licence, hire agreement, and ID at all times.

5. FUEL, GPS, AND BREAKDOWN SUPPORT

Fill up in towns — fuel stations thin out in rural areas. Our cars include GPS and offline maps. Most importantly, every Turkenya hire comes with a 24/7 breakdown line. One call and we sort you out, wherever you are.

READY TO HIT THE ROAD?

Turkenya offers self-drive and chauffeur car hire from KES 3,500 per day. From city saloons to safari Land Cruisers — fully insured, serviced, and road-ready. Get in touch for a quote.`
  },
  'amboseli-kilimanjaro-views': {
    title:"Amboseli: Africa's Best Kilimanjaro Views",
    cat:'Destinations', date:'18 Apr 2025', read:'7 min',
    img:'https://images.unsplash.com/photo-1549366021-9f761d450615?w=1400&q=80&fit=crop',
    content:`There is no image more iconic of Africa than a herd of elephants crossing golden plains with the snow-capped peak of Mount Kilimanjaro behind them. That image is Amboseli. Located in southern Kenya on the Tanzania border, Amboseli National Park offers the continent's most dramatic mountain-and-wildlife scenery.

WHY AMBOSELI IS SPECIAL

While Kilimanjaro itself sits in Tanzania, the best views of it are from Kenya — from Amboseli. Early morning and late afternoon, when the cloud lifts, the mountain reveals itself in full glory. Combine that backdrop with some of the largest elephant herds in Africa and you have a photographer's dream.

THE ELEPHANTS OF AMBOSELI

Amboseli is home to over 1,500 elephants, among the most studied in the world thanks to decades of research. These are big-tusked, relaxed family herds you can observe at close range. Watching a matriarch lead her calves across the marshland is an unforgettable experience.

WHEN TO VISIT

The dry seasons — June to October and January to February — offer the clearest Kilimanjaro views and the best game viewing as animals gather around the swamps. The mountain is notoriously shy in the middle of the day, so plan early-morning and sunset game drives for that perfect shot.

BEYOND ELEPHANTS

Amboseli also hosts lions, cheetahs, giraffes, zebras, wildebeest, hyenas, and over 400 bird species. Observation Hill gives you a panoramic view of the entire park. A visit to a local Maasai village offers cultural insight into the people who have lived alongside this wildlife for centuries.

GETTING THERE

Amboseli is about a 4-hour drive from Nairobi, or a short 45-minute flight to the park airstrip. Turkenya arranges both — a scenic road transfer in a 4x4, or a quick hop by air if time is tight.

PACKAGE IT WITH TURKENYA

Our Amboseli & Kilimanjaro package runs 4 days / 3 nights from KES 62,000 per person, including park fees, full board accommodation, game drives, and transfers. Combine it with the Maasai Mara for the ultimate Kenya circuit. Contact us to plan your trip.`
  },
  'nairobi-city-guide': {
    title:'Nairobi in 48 Hours: The Insider City Guide',
    cat:'Destinations', date:'5 May 2025', read:'6 min',
    img:'https://images.unsplash.com/photo-1741991110666-88115e724741?w=1400&q=80&fit=crop',
    content:`Most travellers treat Nairobi as a gateway — a place to land before heading to the bush or the coast. But Kenya's capital is a vibrant, fast-moving city with world-class attractions, incredible food, and a character all its own. Here is how to spend a perfect 48 hours in the Green City in the Sun.

DAY 1 MORNING — WILDLIFE WITHOUT LEAVING THE CITY

Start at Nairobi National Park, the only national park bordering a capital city. Lions, rhinos, giraffes, and zebras roam against a skyline backdrop. Then visit the David Sheldrick Wildlife Trust to see orphaned baby elephants, and the Giraffe Centre where you can feed endangered Rothschild's giraffes by hand.

DAY 1 AFTERNOON — HISTORY AND CULTURE

Visit the Nairobi National Museum for Kenya's natural and cultural history, then the Karen Blixen Museum, the former home of the Out of Africa author, set in beautiful gardens at the foot of the Ngong Hills.

DAY 1 EVENING — THE FAMOUS CARNIVORE

No Nairobi visit is complete without dinner at Carnivore, the legendary open-air restaurant serving all manner of grilled meats. It is touristy, yes, but deservedly iconic.

DAY 2 MORNING — MARKETS AND SHOPPING

Hit the Maasai Market (it rotates locations by day) for authentic crafts, beadwork, and souvenirs — remember to bargain. For a modern experience, the city's malls like Two Rivers and the Village Market offer shopping, dining, and entertainment.

DAY 2 AFTERNOON — COFFEE AND GREEN SPACES

Kenya grows some of the world's finest coffee. Spend an afternoon at a specialty cafe in Westlands or Kilimani. Then relax in Karura Forest, an urban forest with walking trails, waterfalls, and cafes right in the city.

GETTING AROUND

Nairobi traffic is notorious. Use ride-hailing apps or, better, hire a car with a driver through Turkenya so you can relax while someone who knows the city navigates it. Airport transfers from JKIA start at KES 2,500.

STAY AND EXPLORE WITH TURKENYA

Whether Nairobi is your final destination or a stopover before safari, Turkenya arranges hotels, city tours, and transfers. Ask us to add a Nairobi city experience to your itinerary.`
  },
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = articles[params.slug] || await getDbPost(params.slug)
  if (!post) {
    return { title: 'Article Not Found | Turkenya Tours & Safaris' }
  }
  const plain = post.content.split('\n\n')[0].slice(0, 155)
  return {
    title: `${post.title} | Turkenya Tours & Safaris`,
    description: plain,
    alternates: { canonical: `${SITE_URL}/blog/${params.slug}` },
    openGraph: {
      title: post.title,
      description: plain,
      url: `${SITE_URL}/blog/${params.slug}`,
      images: [post.img],
      type: 'article',
    },
    twitter: { card: 'summary_large_image', title: post.title, description: plain, images: [post.img] },
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = articles[params.slug] || await getDbPost(params.slug)
  const css = '@keyframes heroIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}'

  if (!post) {
    return (
      <main style={{ background:'#0D0D0D', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Abel',system-ui,sans-serif" }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:80, marginBottom:24 }}>404</div>
          <h1 style={{ color:'#fff000', fontWeight:900, fontSize:32, marginBottom:16 }}>Article Not Found</h1>
          <a href="/blog" style={{ color:'rgba(255,255,255,0.6)', textDecoration:'none', fontSize:15 }}><Icon name="chevron-right" size={15} style={{display:"inline",verticalAlign:"-2px",marginRight:4,transform:"rotate(180deg)"}} />Back to Blog</a>
        </div>
      </main>
    )
  }

  // prev / next from the full ordered list (AI posts newest-first, then static)
  const allMeta = await getAllMeta()
  const idx = allMeta.findIndex(m => m.slug === params.slug)
  const prev = idx > 0 ? allMeta[idx - 1] : null
  const next = idx >= 0 && idx < allMeta.length - 1 ? allMeta[idx + 1] : null
  const firstPara = post.content.split('\n\n').find(p => !(p === p.toUpperCase() && p.length < 60)) || ''
  const heroImg = post.img.startsWith('http') ? post.img : SITE_URL + post.img
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: post.title, image: [heroImg], articleSection: post.cat,
    description: firstPara.slice(0, 200),
    author: { '@type': 'Organization', name: 'Turkenya Tours & Safaris' },
    publisher: { '@type': 'Organization', name: 'Turkenya Tours & Safaris', logo: { '@type': 'ImageObject', url: SITE_URL + '/logo.png' } },
    mainEntityOfPage: SITE_URL + '/blog/' + params.slug,
  }

  return (
    <main style={{ background:'#0D0D0D', minHeight:'100vh', color:'#fff', fontFamily:"'Abel',system-ui,sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO IMAGE */}
      <section style={{ position:'relative', height:'55vh', minHeight:400, overflow:'hidden' }}>
        <img src={post.img} alt={post.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(13,13,13,0.95) 100%)' }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'0 24px 48px', maxWidth:900, margin:'0 auto', animation:'heroIn 0.8s ease forwards' }}>
          <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:16 }}>
            <span style={{ background:'rgba(255,240,0,0.04)', color:'#fff', border:'1px solid rgba(255,240,0,0.1)', backdropFilter:'blur(4px) saturate(150%)', WebkitBackdropFilter:'blur(4px) saturate(150%)', boxShadow:'0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.12)', padding:'4px 12px', fontSize:10, fontWeight:800, letterSpacing:'2px', borderRadius:2 }}>{post.cat}</span>
            <span style={{ color:'rgba(255,255,255,0.5)', fontSize:12 }}>{post.date} · {post.read} read</span>
          </div>
          <h1 style={{ fontSize:'clamp(24px,4vw,52px)', fontWeight:900, margin:0, lineHeight:1.2 }}>{post.title}</h1>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <section style={{ maxWidth:820, margin:'0 auto', padding:'60px 24px 80px' }}>
        <a href="/blog" style={{ display:'inline-flex', alignItems:'center', gap:8, color:'rgba(255,255,255,0.5)', textDecoration:'none', fontSize:14, marginBottom:48, letterSpacing:'1px' }}><Icon name="chevron-right" size={15} style={{ transform:'rotate(180deg)' }} />BACK TO BLOG</a>
        {post.content.split('\n\n').map((para, i) => {
          if (para === para.toUpperCase() && para.length < 60) {
            return <h2 key={i} style={{ fontSize:20, fontWeight:800, color:'#fff000', margin:'40px 0 16px', letterSpacing:'2px', textTransform:'uppercase', borderLeft:'3px solid #fff000', paddingLeft:16 }}>{para}</h2>
          }
          return <p key={i} style={{ fontSize:17, lineHeight:1.85, color:'rgba(255,255,255,0.82)', margin:'0 0 24px' }}>{para}</p>
        })}

        {/* CTA CARD */}
        <div style={{ marginTop:60, background:'rgba(255,240,0,0.07)', border:'1px solid rgba(255,240,0,0.25)', borderRadius:10, padding:36, textAlign:'center' }}>
          <h3 style={{ fontSize:22, fontWeight:900, marginBottom:12 }}>Ready to Make It Real?</h3>
          <p style={{ color:'rgba(255,255,255,0.65)', marginBottom:24, fontSize:16 }}>Talk to our team and we will build your perfect itinerary.</p>
          <a href="/quote" style={{ display:'inline-block', background:'rgba(255,240,0,0.04)', color:'#fff', border:'1px solid rgba(255,240,0,0.1)', backdropFilter:'blur(4px) saturate(150%)', WebkitBackdropFilter:'blur(4px) saturate(150%)', boxShadow:'0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.12)', padding:'14px 40px', fontWeight:800, textDecoration:'none', fontSize:14, letterSpacing:'2px', borderRadius:2 }}>GET A FREE QUOTE</a>
        </div>

        {/* PREV / NEXT */}
        {(prev || next) && (
          <nav style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginTop:48 }} className="blog-nav">
            {prev ? (
              <Link href={'/blog/' + prev.slug} className="glass-card interactive" style={{ display:'block', padding:'20px 22px', borderRadius:16, textDecoration:'none', color:'#fff' }}>
                <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:11, fontWeight:800, letterSpacing:1.5, textTransform:'uppercase', color:'rgba(255,255,255,0.45)' }}><Icon name="arrow-left" size={13} /> Previous</span>
                <div style={{ fontSize:16, fontWeight:700, marginTop:8, lineHeight:1.4 }}>{prev.title}</div>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={'/blog/' + next.slug} className="glass-card interactive" style={{ display:'block', padding:'20px 22px', borderRadius:16, textDecoration:'none', color:'#fff', textAlign:'right' }}>
                <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:11, fontWeight:800, letterSpacing:1.5, textTransform:'uppercase', color:'rgba(255,255,255,0.45)' }}>Next <Icon name="arrow-right" size={13} /></span>
                <div style={{ fontSize:16, fontWeight:700, marginTop:8, lineHeight:1.4 }}>{next.title}</div>
              </Link>
            ) : <span />}
          </nav>
        )}
      </section>
    </main>
  )
}
