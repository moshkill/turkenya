'use client'
import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'

type TransitionState = {
  active: boolean
  img: string
  rect: { top: number; left: number; width: number; height: number }
  href: string
}

const TransitionContext = createContext<{
  triggerTransition: (img: string, rect: DOMRect, href: string) => void
}>({ triggerTransition: () => {} })

export function usePageTransition() {
  return useContext(TransitionContext)
}

export default function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [state, setState] = useState<TransitionState | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const triggerTransition = useCallback((img: string, rect: DOMRect, href: string) => {
    setState({
      active: true,
      img,
      rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
      href,
    })

    setTimeout(() => {
      router.push(href)
    }, 700)

    setTimeout(() => {
      setState(null)
    }, 1200)
  }, [router])

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {children}
      {state && (
        <div
          ref={overlayRef}
          style={{
            position: 'fixed',
            zIndex: 9999,
            top: state.rect.top,
            left: state.rect.left,
            width: state.rect.width,
            height: state.rect.height,
            borderRadius: 16,
            overflow: 'hidden',
            animation: 'diveIn 0.7s cubic-bezier(0.4, 0, 0, 1) forwards',
            pointerEvents: 'none',
          }}
        >
          <img
            src={state.img}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              animation: 'diveZoom 0.7s cubic-bezier(0.4, 0, 0, 1) forwards',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(10,10,10,0.3)',
            animation: 'diveFade 0.7s cubic-bezier(0.4, 0, 0, 1) forwards',
          }} />
        </div>
      )}
    </TransitionContext.Provider>
  )
}
