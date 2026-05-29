'use client'
import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const TransitionContext = createContext<{
  triggerTransition: (img: string, rect: DOMRect, href: string) => void
}>({ triggerTransition: () => {} })

export function usePageTransition() {
  return useContext(TransitionContext)
}

export default function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [phase, setPhase] = useState<'idle' | 'start' | 'expand' | 'hold' | 'done'>('idle')
  const [img, setImg] = useState('')
  const [startRect, setStartRect] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const [href, setHref] = useState('')
  const frameRef = useRef(0)

  const triggerTransition = useCallback((imgSrc: string, rect: DOMRect, targetHref: string) => {
    setImg(imgSrc)
    setStartRect({ top: rect.top, left: rect.left, width: rect.width, height: rect.height })
    setHref(targetHref)
    setPhase('start')
  }, [])

  useEffect(() => {
    if (phase === 'start') {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = requestAnimationFrame(() => {
          setPhase('expand')
        })
      })
    }
    if (phase === 'expand') {
      const t = setTimeout(() => {
        setPhase('hold')
        router.push(href)
      }, 1000)
      return () => clearTimeout(t)
    }
    if (phase === 'hold') {
      const t = setTimeout(() => setPhase('done'), 300)
      return () => clearTimeout(t)
    }
    if (phase === 'done') {
      const t = setTimeout(() => setPhase('idle'), 400)
      return () => clearTimeout(t)
    }
  }, [phase, href, router])

  const isVisible = phase !== 'idle'
  const isExpanded = phase === 'expand' || phase === 'hold' || phase === 'done'
  const isFading = phase === 'done'

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {children}

      {/* Dark backdrop — instantly covers page content */}
      {isVisible && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99998,
          background: '#0a0a0a',
          opacity: isExpanded ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }} />
      )}

      {/* Expanding image */}
      {isVisible && (
        <div style={{
          position: 'fixed',
          zIndex: 99999,
          overflow: 'hidden',
          pointerEvents: 'none',
          top: isExpanded ? 0 : startRect.top,
          left: isExpanded ? 0 : startRect.left,
          width: isExpanded ? '100vw' : startRect.width,
          height: isExpanded ? '100vh' : startRect.height,
          borderRadius: isExpanded ? 0 : 16,
          opacity: isFading ? 0 : 1,
          transition: [
            `top 1s cubic-bezier(0.76, 0, 0.24, 1)`,
            `left 1s cubic-bezier(0.76, 0, 0.24, 1)`,
            `width 1s cubic-bezier(0.76, 0, 0.24, 1)`,
            `height 1s cubic-bezier(0.76, 0, 0.24, 1)`,
            `border-radius 0.5s cubic-bezier(0.76, 0, 0.24, 1)`,
            `opacity 0.4s ease`,
          ].join(', '),
        }}>
          <img
            src={img}
            alt=""
            style={{
              position: 'absolute',
              inset: isExpanded ? '-5%' : 0,
              width: isExpanded ? '110%' : '100%',
              height: isExpanded ? '110%' : '100%',
              objectFit: 'cover',
              transition: 'all 1s cubic-bezier(0.76, 0, 0.24, 1)',
            }}
          />
          {/* Gradient overlay — simulates depth */}
          <div style={{
            position: 'absolute', inset: 0,
            background: isExpanded
              ? 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.15) 100%)'
              : 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
            transition: 'background 0.8s ease',
          }} />
          {/* Paper plane */}
          {isExpanded && !isFading && (
            <div style={{
              position: 'absolute', bottom: '40%', left: 0,
              zIndex: 10, pointerEvents: 'none',
              animation: 'paperPlaneFly 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0 2px 8px rgba(255,240,0,0.4))' }}>
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="#fff000" />
              </svg>
            </div>
          )}
        </div>
      )}
    </TransitionContext.Provider>
  )
}
