'use client'
import { useState, useRef, useEffect } from 'react'
import Icon, { IconName } from '@/components/Icon'

export type DropOption = { value: string; label: string; icon?: IconName; color?: string }

// Fully-owned select — no browser-default popup. Glass panel, styled options,
// icon + colour support, checkmark on the active one. Closes on outside-click / Esc.
// Used across the admin AND the public booking / quote / testimonial forms.
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
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); setOpen(false) } }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey, true)
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey, true) }
  }, [open])

  const sel = options.find(o => o.value === value)

  return (
    <div ref={ref} style={{ position: 'relative', minWidth, width: full ? '100%' : undefined }}>
      <button type="button" aria-label={ariaLabel} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(o => !o)} className="tk-drop-btn">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minWidth: 0, color: sel ? '#fff' : 'rgba(255,255,255,0.5)' }}>
          {sel?.icon && <Icon name={sel.icon} size={15} style={{ color: sel.color }} />}
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sel ? sel.label : placeholder}</span>
        </span>
        <Icon name="chevron-down" size={15} className={'tk-drop-chev' + (open ? ' open' : '')} />
      </button>
      {open && (
        <div className="tk-drop-panel" role="listbox">
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
        </div>
      )}
    </div>
  )
}
