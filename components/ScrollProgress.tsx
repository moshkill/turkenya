'use client'
import { useEffect, useState } from 'react'

// Thin yellow progress bar at the very top showing scroll position.
export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        const h = document.documentElement
        const max = h.scrollHeight - h.clientHeight
        setPct(max > 0 ? (h.scrollTop / max) * 100 : 0)
        raf = 0
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 100001, pointerEvents: 'none' }}>
      <div style={{
        height: '100%', width: `${pct}%`,
        background: 'linear-gradient(90deg, #FFDC3E, #fff000)',
        boxShadow: '0 0 10px rgba(255,240,0,0.6)',
        transition: 'width 0.1s linear',
      }} />
    </div>
  )
}
