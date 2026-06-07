'use client'
import { useEffect, useRef, useState } from 'react'

// Paper-plane cursor that follows the mouse with smooth easing and tilts
// toward the direction of motion. Desktop only (pointer: fine); respects
// reduced-motion. Native cursor is hidden only after this mounts, so
// no-JS / touch users always keep a normal cursor.
export default function CustomCursor() {
  const planeRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    setEnabled(true)
    document.documentElement.classList.add('cursor-hidden')

    let tx = window.innerWidth / 2, ty = window.innerHeight / 2
    let cx = tx, cy = ty
    let prevX = tx, prevY = ty
    let angle = 0
    let scale = 1, targetScale = 1
    let raf = 0

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      targetScale = t.closest('a, button, [role="button"], input, select, textarea') ? 1.7 : 1
    }
    const onLeave = () => { if (planeRef.current) planeRef.current.style.opacity = '0' }
    const onEnter = () => { if (planeRef.current) planeRef.current.style.opacity = '1' }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    const loop = () => {
      cx += (tx - cx) * 0.2
      cy += (ty - cy) * 0.2
      const dx = tx - prevX, dy = ty - prevY
      const dist = Math.hypot(dx, dy)
      if (dist > 1.5) {
        const target = Math.atan2(dy, dx) * 180 / Math.PI
        // shortest-path angle smoothing
        let diff = target - angle
        while (diff > 180) diff -= 360
        while (diff < -180) diff += 360
        angle += diff * 0.2
      }
      prevX = tx; prevY = ty
      scale += (targetScale - scale) * 0.2
      if (planeRef.current) {
        planeRef.current.style.transform =
          `translate(${cx}px, ${cy}px) translate(-50%, -50%) rotate(${angle}deg) scale(${scale})`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.documentElement.classList.remove('cursor-hidden')
    }
  }, [])

  if (!enabled) return null

  return (
    <div
      ref={planeRef}
      aria-hidden="true"
      className="tk-cursor"
      style={{
        position: 'fixed', top: 0, left: 0, width: 26, height: 26,
        zIndex: 100000, pointerEvents: 'none', willChange: 'transform',
        filter: 'drop-shadow(0 2px 6px rgba(255,240,0,0.45))',
        transition: 'opacity 0.25s ease',
      }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff000">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
      </svg>
    </div>
  )
}
