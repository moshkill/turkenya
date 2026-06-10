'use client'
import { useState, useEffect } from 'react'
import Icon from './Icon'
import BookingButton from './BookingButton'

type Park = { name: string; region: string; img: string; best: string; blurb: string; wildlife: string[]; activities: string[]; stays: string[] }

const parks: Park[] = [
  { name: 'Maasai Mara', region: 'Inland · Rift Valley', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=80&fit=crop', best: 'Jul – Oct (Migration)',
    blurb: 'The stage for the Great Wildebeest Migration and Kenya’s most famous big-cat country.',
    wildlife: ['The Big Five', 'Wildebeest & zebra herds', 'Cheetahs & hyenas', 'Nile crocodiles & hippos'],
    activities: ['Day & night game drives', 'Hot-air balloon safari', 'Maasai village visit', 'Bush dinners'],
    stays: ['Mara Serena Lodge', 'Governor’s Camp', 'Keekorok Lodge', 'Ashnil Mara Camp'] },
  { name: 'Amboseli', region: 'Inland · South', img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=900&q=80&fit=crop', best: 'Jun – Oct',
    blurb: 'Big-tusked elephant herds beneath the snows of Kilimanjaro.',
    wildlife: ['Huge elephant herds', 'Buffalo, zebra, gazelle', 'Hippos in the swamps', '400+ bird species'],
    activities: ['Elephant & wildlife viewing', 'Kilimanjaro photography', 'Observation Hill walks', 'Maasai homestays'],
    stays: ['Amboseli Serena Lodge', 'Ol Tukai Lodge', 'Tortilis Camp', 'Kilima Safari Camp'] },
  { name: 'Tsavo West', region: 'Inland · South-East', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&q=80&fit=crop', best: 'Jun – Oct',
    blurb: 'Mzima Springs, the Shetani lava flow and the Ngulia rhino sanctuary in rugged volcanic country.',
    wildlife: ['“Red” elephants & buffalo', 'Active leopards, lions, cheetahs', 'Endangered black rhino', 'Hippos, crocs & spring fish'],
    activities: ['Game tracking', 'Underwater hippo viewing', 'Shetani lava caving', 'Rock climbing'],
    stays: ['Kilaguni Serena Lodge', 'Ngulia Safari Lodge', 'Finch Hattons', 'Severin Safari Camp'] },
  { name: 'Tsavo East', region: 'Inland · South-East', img: 'https://images.unsplash.com/photo-1551872427-1434a39a8c10?w=900&q=80&fit=crop', best: 'Jun – Oct',
    blurb: 'Endless plains of dust-red elephants, the Yatta Plateau and Lugard Falls.',
    wildlife: ['Famous dust-red elephants', 'Tsavo lions, leopards, cheetahs', 'Gerenuk, lesser kudu, oryx', 'Waterbucks & hartebeests'],
    activities: ['Long-distance game drives', 'Bird watching (500+)', 'Lugard Falls photography', 'Camping safaris'],
    stays: ['Ashnil Aruba Lodge', 'Voi Safari Lodge', 'Satao Camp', 'Sentrim Tsavo'] },
  { name: 'Samburu', region: 'Inland · North', img: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=900&q=80&fit=crop', best: 'Jun – Oct',
    blurb: 'Arid northern frontier along the Ewaso Nyiro River — home of the Special Five.',
    wildlife: ['Gerenuk & reticulated giraffe', 'Grevy’s zebra & Beisa oryx', 'Somali ostrich', 'River leopards & elephants'],
    activities: ['Arid-country game drives', 'Samburu cultural visits', 'Birding safaris', 'Guided wilderness walks'],
    stays: ['Samburu Sopa Lodge', 'Ashnil Samburu Camp', 'Elephant Bedroom Camp', 'Sarova Shaba'] },
  { name: 'Lake Nakuru', region: 'Inland · Rift Valley', img: 'https://images.unsplash.com/photo-1551872427-1434a39a8c10?w=900&q=80&fit=crop', best: 'Year-round',
    blurb: 'A rhino sanctuary ringed by flamingos against the Rift Valley cliffs.',
    wildlife: ['Black & white rhinos', 'Rothschild’s giraffe', 'Millions of flamingos', 'Lions & leopards'],
    activities: ['Flamingo watching', 'Rhino tracking', 'Baboon Cliff viewpoint', 'Picnicking'],
    stays: ['Sarova Lion Hill', 'Lake Nakuru Lodge', 'Mbweha Camp', 'The Cliff Nakuru'] },
  { name: 'Ol Pejeta & Mt. Kenya', region: 'Inland · Central', img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=900&q=80&fit=crop', best: 'Year-round',
    blurb: 'Home to the world’s last two northern white rhinos and a chimpanzee sanctuary.',
    wildlife: ['Last northern white rhinos', 'Largest black rhino refuge', 'Rescued chimpanzees', 'The Big Five'],
    activities: ['Rhino interaction', 'Chimpanzee visits', 'Night drives & K9 tracking', 'Equator crossing'],
    stays: ['Sweetwaters Tented Camp', 'Serena Mountain Lodge', 'Fairmont Mt Kenya', 'Ol Pejeta Bush Camp'] },
  { name: 'Naivasha & Hell’s Gate', region: 'Inland · Rift Valley', img: 'https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=900&q=80&fit=crop', best: 'Year-round',
    blurb: 'Walk and cycle among wildlife in the gorges that inspired The Lion King.',
    wildlife: ['Dense hippo pods', 'Zebra & giraffe', 'Gazelles', 'African fish eagles'],
    activities: ['Boat cruises', 'Cycling in Hell’s Gate', 'Rock climbing', 'Geothermal spa'],
    stays: ['Enashipai Resort & Spa', 'Naivasha Sopa Resort', 'Great Rift Valley Lodge', 'Kiboko Luxury Camp'] },
  { name: 'Nairobi National Park', region: 'Inland · Nairobi', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=80&fit=crop', best: 'Year-round',
    blurb: 'The only wildlife park bordering a capital — lions and rhinos against the city skyline.',
    wildlife: ['Successful black rhino sanctuary', 'Lions, leopards, cheetahs', 'Maasai giraffes & buffalo', 'Zebras & elands'],
    activities: ['Half-day game drives', 'Nairobi Safari Walk', 'Sheldrick Elephant Orphanage', 'Perfect pre/post-flight'],
    stays: ['Ole Sereni Hotel', 'The Emakoko', 'Nairobi Tented Camp'] },
  { name: 'Diani Beach', region: 'Coast · South', img: 'https://images.unsplash.com/photo-1531761535209-180857e963b9?w=900&q=80&fit=crop', best: 'Dec – Mar',
    blurb: 'Powder-white sand and the Kisite-Mpunguti marine park — safari meets the sea.',
    wildlife: ['Colobus monkeys', 'Whale sharks (seasonal)', 'Reef dolphins', 'Green & hawksbill turtles'],
    activities: ['Kitesurfing & scuba', 'Marine-park dhow cruise', 'Chale Island day trip', 'Skydiving'],
    stays: ['Baobab Beach Resort', 'Swahili Beach', 'Diani Reef Resort', 'The Sands at Nomad'] },
  { name: 'Mombasa', region: 'Coast · North', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80&fit=crop', best: 'Dec – Mar',
    blurb: 'Swahili history and beach resorts — Fort Jesus, the Old Town and Haller Park.',
    wildlife: ['Tropical reef fish & dolphins', 'Haller Park giraffes & hippos', 'Tortoises & crocodiles', 'Coral gardens'],
    activities: ['Old Town & Fort Jesus tours', 'Fort Jesus light show', 'Giraffe feeding at Haller Park', 'Glass-bottom boat tours'],
    stays: ['Sarova Whitesands', 'Serena Beach Resort & Spa', 'Voyager Beach Resort', 'PrideInn Paradise'] },
  { name: 'Watamu & Malindi', region: 'Coast · North', img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&q=80&fit=crop', best: 'Oct – Apr',
    blurb: 'Marine parks, turtle-nesting beaches and the ancient Gedi Ruins.',
    wildlife: ['Green turtle nesting', 'Bottlenose & humpback dolphins', 'Manta rays', 'Coral reef life'],
    activities: ['Dolphin cruises', 'Snorkelling in marine parks', 'Gedi Ruins', 'Deep-sea fishing'],
    stays: ['Hemingways Watamu', 'Turtle Bay Beach Club', 'Medina Palms', 'Diamonds Dream of Africa'] },
  { name: 'Lamu Archipelago', region: 'Coast · Far North', img: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=900&q=80&fit=crop', best: 'Dec – Mar',
    blurb: 'A UNESCO Swahili town of dhows and donkeys — no cars, just timeless calm.',
    wildlife: ['Swahili dhow culture', 'Shela sand dunes', 'Mangrove channels', 'Island birdlife'],
    activities: ['Sunset dhow sailing', 'Old Town heritage walk', 'Shela Beach', 'Island hopping'],
    stays: ['The Majlis Resort', 'Peponi Hotel', 'Kijani Hotel'] },
]

const hideImg = (e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.opacity = '0' }

export default function SafariParks() {
  const [open, setOpen] = useState<number | null>(null)
  useEffect(() => {
    const on = open !== null
    document.body.style.overflow = on ? 'hidden' : ''
    document.documentElement.classList.toggle('modal-open', on)
    return () => { document.body.style.overflow = ''; document.documentElement.classList.remove('modal-open') }
  }, [open])

  const p = open !== null ? parks[open] : null

  const Chips = ({ title, items }: { title: string; items: string[] }) => (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#fff000', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>{title}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
        {items.map(it => (
          <span key={it} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '8px 14px', fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
            <span style={{ color: '#fff000' }}><Icon name="sparkle" size={14} style={{display:"inline",verticalAlign:"-2px"}} /></span>{it}
          </span>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 16 }}>
        {parks.map((pk, i) => (
          <button key={pk.name} onClick={() => setOpen(i)} className="hover-lift" data-reveal style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', minHeight: 290, border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer', padding: 0, textAlign: 'left', color: '#fff', background: 'linear-gradient(135deg, rgba(255,240,0,0.12), rgba(10,10,10,0.7))' }}>
            <img src={pk.img} alt={pk.name} onError={hideImg} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.93) 14%, rgba(10,10,10,0.45) 50%, rgba(10,10,10,0.15))' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '22px 20px' }}>
              <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'Urbanist', sans-serif", lineHeight: 1.1 }}>{pk.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10.5, letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 600 }}>{pk.region}</span>
                <span style={{ color: '#fff000', fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }}>Explore <Icon name="arrow-right" size={12} style={{display:"inline",verticalAlign:"-2px"}} /></span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {p && (
        <div className="sb-modal" onClick={() => setOpen(null)} style={{ position: 'fixed', inset: 0, zIndex: 100001, background: 'rgba(5,5,5,0.72)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '6vh 16px 16px', overflowY: 'auto' }}>
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: 640, background: 'rgba(15,15,15,0.98)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}>
            <div style={{ position: 'relative', height: 200, background: 'linear-gradient(135deg, rgba(255,240,0,0.15), rgba(10,10,10,0.7))' }}>
              <img src={p.img} alt={p.name} onError={hideImg} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,15,15,1) 4%, rgba(15,15,15,0.3) 60%, rgba(15,15,15,0.05))' }} />
              <button onClick={() => setOpen(null)} aria-label="Close" style={{ position: 'absolute', top: 14, right: 14, width: 38, height: 38, borderRadius: '50%', background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff', fontSize: 18, cursor: 'pointer', backdropFilter: 'blur(8px)' }}><Icon name="close" size={18} /></button>
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 28px 18px' }}>
                <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 800, letterSpacing: 1.5, color: '#fff000', border: '1px solid rgba(255,240,0,0.45)', borderRadius: 100, padding: '4px 12px', textTransform: 'uppercase', marginBottom: 10, backdropFilter: 'blur(6px)' }}>{p.region}</span>
                <h3 style={{ fontSize: 28, fontWeight: 900, margin: 0, fontFamily: "'Urbanist', sans-serif" }}>{p.name}</h3>
              </div>
            </div>
            <div style={{ padding: '30px 34px 38px' }}>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, lineHeight: 1.7, margin: '0 0 18px' }}>{p.blurb}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 100, padding: '7px 14px', fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 24 }}>
                <span style={{ color: '#fff000' }}><Icon name="sun" size={14} style={{display:"inline",verticalAlign:"-2px"}} /></span> Best time: <strong style={{ color: '#fff' }}>{p.best}</strong>
              </div>
              <Chips title="Wildlife & sights" items={p.wildlife} />
              <Chips title="Things to do" items={p.activities} />
              <div style={{ fontSize: 11, fontWeight: 700, color: '#fff000', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>Where you’ll stay</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.8, marginBottom: 26 }}>{p.stays.join(' · ')}</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <BookingButton flowKey="safari" label={`Plan ${p.name.split(' ')[0]}`} initial={{ park: p.name }} className="glass-cta" style={{ flex: 1, minWidth: 160, padding: '15px', borderRadius: 100, fontSize: 14, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }} />
                <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" className="glass-wa" style={{ flex: 1, minWidth: 140, padding: '15px', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
