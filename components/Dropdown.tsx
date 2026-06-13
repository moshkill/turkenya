'use client'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Icon, { IconName } from '@/components/Icon'

export type DropOption = { value: string; label: string; icon?: IconName; color?: string }

// Fully-owned select — no browser-default popup. Glass panel, styled options,
// icon + colour, checkmark on the active one. Closes on outside-click / Esc.
// The panel renders in a PORTAL with fixed positioning so it always sits above
// glass cards / tables (which create their own stacking contexts via backdrop-filter).
export default function Dropdown({
  value, options, onChange, placeholder = 'Select…', minWidth = 160, ariaLabel, full = false,
}: {
  value: string
  options: DropOption[]
  onChange: (v: string) => void
  placeholder?: string
  minWidth?: number
  ariaLabel?: string
  full?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const place = () => { const r = btnRef.current?.getBoundingClientRect(); if (r) setPos({ top: r.bottom + 6, left: r.left, width: r.width }) }
    place()
    const onDoc = (e: MouseEvent) => { const t = e.target as Node; if (!btnRef.current?.contains(t) && !panelRef.current?.contains(t)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); setOpen(false) } }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey, true)
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey, true)
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
    }
  }, [open])

  const sel = options.find(o => o.value === value)

  return (
    <div style={{ position: 'relative', minWidth, width: full ? '100%' : undefined }}>
      <button ref={btnRef} type="button" aria-label={ariaLabel} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(o => !o)} className="tk-drop-btn">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minWidth: 0, color: sel ? '#fff' : 'rgba(255,255,255,0.5)' }}>
          {sel?.icon && <Icon name={sel.icon} size={15} style={{ color: sel.color }} />}
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sel ? sel.label : placeholder}</span>
        </span>
        <Icon name="chevron-down" size={15} className={'tk-drop-chev' + (open ? ' open' : '')} />
      </button>
      {open && pos && typeof document !== 'undefined' && createPortal(
        <div ref={panelRef} className="tk-drop-panel" role="listbox" style={{ position: 'fixed', top: pos.top, left: pos.left, width: pos.width, minWidth: pos.width, right: 'auto' }}>
          {options.map(o => {
            const active = o.value === value
            return (
              <button key={o.value} type="button" role="option" aria-selected={active} onClick={() => { onChange(o.value); setOpen(false) }} className={'tk-drop-opt' + (active ? ' active' : '')}>
                {o.icon && <Icon name={o.icon} size={15} style={{ color: o.color || 'currentColor' }} />}
                <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.label}</span>
                {active && <Icon name="check" size={15} stroke={2.5} />}
              </button>
            )
          })}
        </div>,
        document.body,
      )}
    </div>
  )
}
