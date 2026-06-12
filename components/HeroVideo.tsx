'use client'
import { useEffect, useRef, useState } from 'react'

// Hero media that never shows a black frame: the poster image renders
// immediately (no entrance animation — it must be instantly visible), and the
// video fades in over it only once it can play through (fully buffered).
export default function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    let done = false
    const onReady = () => {
      if (done) return
      done = true
      setReady(true)
      v.play().catch(() => {})
    }
    v.addEventListener('canplaythrough', onReady)
    // Fallback poll — covers events missed in throttled/background tabs.
    const id = setInterval(() => { if (v.readyState >= 4) onReady() }, 400)
    if (v.readyState >= 4) onReady()
    return () => { v.removeEventListener('canplaythrough', onReady); clearInterval(id) }
  }, [])

  const fill: React.CSSProperties = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }

  return (
    <>
      <img src={poster} alt="" style={{ ...fill, transform: 'scale(1.05)' }} />
      <video
        ref={videoRef}
        muted loop playsInline preload="auto"
        style={{ ...fill, opacity: ready ? 1 : 0, transition: 'opacity 1.2s ease' }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </>
  )
}
