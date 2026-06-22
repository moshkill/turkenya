// Shared formatter for agent price offers — used by the admin CRM, the customer
// tracker, and notification emails so a price reads the same everywhere.
//
// An offer stores: price (amount), currency ('KES'|'USD'|null for legacy
// free-form), perPerson, travellers. We compute a clean per-person line and,
// when it's per-person with >1 traveller, the total.

export type RawOffer = {
  price?: string | null
  currency?: string | null
  perPerson?: boolean | null
  travellers?: number | null
}

export type FormattedOffer = {
  unit: string            // e.g. "USD 500" or legacy "KES 45,000"
  perPerson: boolean
  travellers: number | null
  total: string | null    // e.g. "USD 1,500" when per-person × travellers
}

function num(s: string): number {
  return parseFloat(String(s).replace(/[^\d.]/g, ''))
}

export function formatOffer(o: RawOffer): FormattedOffer | null {
  if (!o || !o.price) return null
  const perPerson = !!o.perPerson
  const n = o.travellers && o.travellers > 1 ? o.travellers : null

  // legacy offers (no currency) were stored as a full display string — show as-is
  if (!o.currency) {
    return { unit: String(o.price), perPerson, travellers: n, total: null }
  }

  const amt = num(o.price)
  const fmt = (x: number) => `${o.currency} ${Number.isFinite(x) ? x.toLocaleString('en-KE') : o.price}`
  const unit = fmt(amt)
  const total = perPerson && n && Number.isFinite(amt) ? fmt(amt * n) : null
  return { unit, perPerson, travellers: n, total }
}

// One-line plain-text version (for emails / notifications)
export function offerLine(o: RawOffer): string | null {
  const f = formatOffer(o)
  if (!f) return null
  let s = f.unit + (f.perPerson ? ' per person' : '')
  if (f.total) s += ` · Total (${f.travellers} travellers): ${f.total}`
  return s
}
