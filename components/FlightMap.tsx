'use client'

// Animated route map — flights radiating from Nairobi to major destinations.
// Cities are placed by true lon/lat on an equirectangular world map, routes
// draw themselves and a plane flies each arc. Pure SVG + SMIL, no deps.

const W = 1000, H = 500
const proj = (lon: number, lat: number): [number, number] => [((lon + 180) / 360) * W, ((90 - lat) / 180) * H]

const NBO = proj(36.82, -1.29)

const cities = [
  { n: 'Dubai', lon: 55.27, lat: 25.2 },
  { n: 'Doha', lon: 51.53, lat: 25.29 },
  { n: 'Istanbul', lon: 28.98, lat: 41.01 },
  { n: 'London', lon: -0.13, lat: 51.51 },
  { n: 'Paris', lon: 2.35, lat: 48.86 },
  { n: 'New York', lon: -74.0, lat: 40.71 },
  { n: 'Guangzhou', lon: 113.26, lat: 23.13 },
  { n: 'Bangkok', lon: 100.5, lat: 13.75 },
  { n: 'Mumbai', lon: 72.88, lat: 19.08 },
  { n: 'Jo’burg', lon: 28.05, lat: -26.2 },
]

function arcPath([x1, y1]: number[], [x2, y2]: number[]) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
  const d = Math.hypot(x2 - x1, y2 - y1)
  return `M${x1.toFixed(1)},${y1.toFixed(1)} Q${mx.toFixed(1)},${(my - d * 0.3).toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`
}

export default function FlightMap() {
  const routes = cities.map((c, i) => ({ ...c, p: proj(c.lon, c.lat), id: `route${i}` }))

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 1000, margin: '0 auto', aspectRatio: '2 / 1', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: 'radial-gradient(ellipse at 60% 45%, rgba(255,240,0,0.06), rgba(10,10,10,0) 60%), #0c0c0c' }}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="fm-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,240,0,0.15)" />
            <stop offset="100%" stopColor="rgba(255,240,0,0.75)" />
          </linearGradient>
        </defs>

        {/* graticule — lat/long grid suggesting the globe */}
        <g>
          {[-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map(lon => {
            const x = proj(lon, 0)[0]
            return <line key={`m${lon}`} x1={x} y1={0} x2={x} y2={H} stroke={lon === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'} strokeWidth={1} />
          })}
          {[-60, -30, 0, 30, 60].map(lat => {
            const y = proj(0, lat)[1]
            return <line key={`p${lat}`} x1={0} y1={y} x2={W} y2={y} stroke={lat === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'} strokeWidth={1} />
          })}
        </g>

        {routes.map((r, i) => {
          const d = arcPath(NBO, r.p)
          return (
            <g key={r.id}>
              {/* static faint route */}
              <path id={r.id} d={d} fill="none" stroke="url(#fm-line)" strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
              {/* destination dot */}
              <circle cx={r.p[0]} cy={r.p[1]} r={3} fill="#fff000">
                <animate attributeName="r" values="3;5;3" dur="2.4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={r.p[0]} cy={r.p[1]} r={3} fill="none" stroke="rgba(255,240,0,0.5)" strokeWidth={1}>
                <animate attributeName="r" values="3;12" dur="2.4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0" dur="2.4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
              </circle>
              <text x={r.p[0]} y={r.p[1] - 10} textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize={13} fontWeight={700} fontFamily="'Urbanist', sans-serif">{r.n}</text>
              {/* flying plane */}
              <g>
                <path d="M0,-3 L9,0 L0,3 L2.5,0 Z" fill="#fff000">
                  <animateMotion dur={`${3 + (i % 4) * 0.6}s`} begin={`${i * 0.35}s`} repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="linear" path={d} />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur={`${3 + (i % 4) * 0.6}s`} begin={`${i * 0.35}s`} repeatCount="indefinite" />
                </path>
              </g>
            </g>
          )
        })}

        {/* Nairobi hub */}
        <circle cx={NBO[0]} cy={NBO[1]} r={6} fill="#fff000" stroke="#0a0a0a" strokeWidth={1.5} />
        <circle cx={NBO[0]} cy={NBO[1]} r={6} fill="none" stroke="rgba(255,240,0,0.6)">
          <animate attributeName="r" values="6;20" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0" dur="2s" repeatCount="indefinite" />
        </circle>
        <text x={NBO[0]} y={NBO[1] + 22} textAnchor="middle" fill="#fff000" fontSize={14} fontWeight={800} fontFamily="'Urbanist', sans-serif">NAIROBI</text>
      </svg>
    </div>
  )
}
