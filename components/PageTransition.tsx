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
  const containerRef = useRef<HTMLDivElement>(null)

  const triggerTransition = useCallback((imgSrc: string, rect: DOMRect, targetHref: string) => {
    setImg(imgSrc)
    setStartRect({ top: rect.top, left: rect.left, width: rect.width, height: rect.height })
    setHref(targetHref)
    setPhase('start')
  }, [])

  useEffect(() => {
    if (phase === 'start') {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase('expand')
        })
      })
    }
    if (phase === 'expand') {
      const t1 = setTimeout(() => {
        setPhase('hold')
        router.push(href)
      }, 900)
      return () => clearTimeout(t1)
    }
    if (phase === 'hold') {
      const t2 = setTimeout(() => {
        setPhase('done')
      }, 400)
      return () => clearTimeout(t2)
    }
    if (phase === 'done') {
      const t3 = setTimeout(() => {
        setPhase('idle')
      }, 600)
      return () => clearTimeout(t3)
    }
  }, [phase, href, router])

  const isVisible = phase !== 'idle'
  const isExpanded = phase === 'expand' || phase === 'hold' || phase === 'done'
  const isFading = phase === 'done'

  const style: React.CSSProperties = isVisible ? {
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
    transition: isExpanded
      ? 'top 0.9s cubic-bezier(0.65, 0, 0.35, 1), left 0.9s cubic-bezier(0.65, 0, 0.35, 1), width 0.9s cubic-bezier(0.65, 0, 0.35, 1), height 0.9s cubic-bezier(0.65, 0, 0.35, 1), border-radius 0.6s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.5s ease'
      : 'none',
  } : { display: 'none' }

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {children}
      <div ref={containerRef} style={style}>
        {isVisible && (
          <>
            <img
              src={img}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: isExpanded ? 'scale(1.15)' : 'scale(1)',
                transition: 'transform 1.2s cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: isExpanded ? 'rgba(10,10,10,0.75)' : 'rgba(10,10,10,0)',
              transition: 'background 0.9s cubic-bezier(0.65, 0, 0.35, 1)',
            }} />
            {(phase === 'hold') && (
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: 40, height: 40, border: '3px solid rgba(255,240,0,0.6)',
                  borderTopColor: 'transparent', borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
              </div>
            )}
          </>
        )}
      </div>
    </TransitionContext.Provider>
  )
}
