import Link from 'next/link'
import Icon from './Icon'

// Sticky bottom action bar — mobile only. Keeps the two highest-intent
// actions one tap away (HealthIV-style bottom nav for conversion).
export default function MobileActionBar() {
  return (
    <div className="mobile-action-bar">
      <a
        href="https://wa.me/254722666644"
        target="_blank"
        rel="noopener noreferrer"
        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'rgba(37,211,102,0.1)', color: '#fff', border: '1px solid rgba(37,211,102,0.28)', backdropFilter: 'blur(4px) saturate(150%)', WebkitBackdropFilter: 'blur(4px) saturate(150%)', boxShadow: '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.12)', padding: '13px', borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41z"/></svg>
        WhatsApp
      </a>
      <Link
        href="/quote"
        className="glass-cta"
        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '13px', borderRadius: 12, fontSize: 15, fontWeight: 800, textDecoration: 'none' }}
      >
        <Icon name="sparkle" size={15} style={{display:"inline",verticalAlign:"-2px",marginRight:6}} />Get a Quote
      </Link>
    </div>
  )
}
