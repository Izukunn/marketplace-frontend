/**
 * Truncate a string to maxLen characters, appending '...' if needed.
 */
export function truncate(str, maxLen = 60) {
  if (!str) return ''
  return str.length > maxLen ? str.slice(0, maxLen) + '…' : str
}

/**
 * Shorten an order ID for display (first 8 chars).
 */
export function shortId(id) {
  if (!id) return '-'
  return String(id).slice(0, 8).toUpperCase()
}

/**
 * Format a date string to a readable local format.
 */
export function formatDate(dateStr) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Get placeholder image URL seeded by a string.
 */
export function placeholderImage(seed = '1') {
  const value = String(seed)
  const hash = value.split('').reduce((acc, char) => ((acc * 31) + char.charCodeAt(0)) >>> 0, 0)
  const hue = hash % 360
  const hue2 = (hue + 36) % 360
  const label = value.slice(0, 2).toUpperCase() || 'P'
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200" role="img" aria-label="Placeholder image">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="hsl(${hue} 70% 55%)" />
          <stop offset="100%" stop-color="hsl(${hue2} 70% 45%)" />
        </linearGradient>
      </defs>
      <rect width="300" height="200" fill="url(#g)" rx="20" />
      <circle cx="240" cy="48" r="40" fill="rgba(255,255,255,0.16)" />
      <circle cx="60" cy="160" r="52" fill="rgba(255,255,255,0.12)" />
      <text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle"
        fill="rgba(255,255,255,0.92)" font-family="Arial, Helvetica, sans-serif"
        font-size="42" font-weight="700" letter-spacing="2">${label}</text>
    </svg>
  `.trim()

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

/**
 * Build a query string from a params object, omitting empty values.
 */
export function buildQuery(params) {
  const q = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') q.set(k, v)
  })
  return q.toString()
}
