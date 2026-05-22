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
  const num = Math.abs(String(seed).split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 1000)
  return `https://picsum.photos/seed/${num}/300/200`
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
