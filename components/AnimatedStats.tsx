'use client'
import { useEffect, useRef, useState } from 'react'

type Stat = { num?: number; prefix?: string; suffix?: string; display?: string; label: string }

export default function AnimatedStats({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [run, setRun] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRun(true); io.disconnect() } }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(32px, 6vw, 72px)' }}>
      {stats.map((s, i) => <Counter key={i} s={s} run={run} delay={i * 120} />)}
    </div>
  )
}

function Counter({ s, run, delay }: { s: Stat; run: boolean; delay: number }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!run || s.num == null) return
    let raf = 0
    const dur = 1400
    let startTs = 0
    const tick = (ts: number) => {
      if (!startTs) startTs = ts
      const t = Math.min(1, (ts - startTs - delay) / dur)
      const eased = t < 0 ? 0 : 1 - Math.pow(1 - t, 3)
      setVal(Math.round(eased * (s.num as number)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, s.num, delay])

  const shown = s.display != null ? s.display : `${s.prefix || ''}${s.num != null ? val : ''}${s.suffix || ''}`
  return (
    <div style={{ textAlign: 'center', minWidth: 90 }}>
      <div style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', color: 'rgb(235,235,235)', fontFamily: "'Urbanist', sans-serif" }}>{shown}</div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: 3, textTransform: 'uppercase', marginTop: 10, fontWeight: 600 }}>{s.label}</div>
    </div>
  )
}
