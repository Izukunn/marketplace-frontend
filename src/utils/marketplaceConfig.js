/**
 * Central config for each marketplace's theme, field names, and order body builder.
 */
export const MARKETPLACE_CONFIG = {
  shopee: {
    name: 'Shopee',
    color: '#ee4d2d',
    bgLight: 'bg-orange-50',
    borderColor: 'border-orange-500',
    textColor: 'text-orange-600',
    btnBg: 'bg-orange-500 hover:bg-orange-600',
    ringColor: 'focus:ring-orange-400',
    badgeBg: 'bg-orange-100 text-orange-700',
    headerBg: 'bg-orange-500',
    // Product field names from API
    fields: {
      name: 'item_name',
      sku: 'model_sku',
      stock: 'stock',
      price: 'price',
    },
    // Build order request body
    buildOrderBody: (sku, quantity) => ({ model_sku: sku, qty: quantity }),
    orderSkuField: 'model_sku',
  },
  tokopedia: {
    name: 'Tokopedia',
    color: '#42b549',
    bgLight: 'bg-green-50',
    borderColor: 'border-green-500',
    textColor: 'text-green-600',
    btnBg: 'bg-green-500 hover:bg-green-600',
    ringColor: 'focus:ring-green-400',
    badgeBg: 'bg-green-100 text-green-700',
    headerBg: 'bg-green-500',
    fields: {
      name: 'name',
      sku: 'sku',
      stock: 'stock',
      price: 'price',
    },
    buildOrderBody: (sku, quantity) => ({ sku, quantity }),
    orderSkuField: 'sku',
  },
  lazada: {
    name: 'Lazada',
    color: '#0f1461',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-900',
    textColor: 'text-blue-900',
    btnBg: 'bg-blue-900 hover:bg-blue-800',
    ringColor: 'focus:ring-blue-400',
    badgeBg: 'bg-blue-100 text-blue-900',
    headerBg: 'bg-blue-900',
    fields: {
      name: 'title',           // fallback to 'name'
      sku: 'seller_sku',
      stock: 'quantity',       // lazada uses quantity for stock
      price: 'price',
    },
    buildOrderBody: (sku, quantity) => ({ seller_sku: sku, quantity }),
    orderSkuField: 'seller_sku',
  },
}

export const VALID_MARKETPLACES = Object.keys(MARKETPLACE_CONFIG)

/**
 * Safely extract a product field using marketplace-specific config.
 */
export function getProductField(product, marketplace, field) {
  const config = MARKETPLACE_CONFIG[marketplace]
  if (!config || !product) return null
  const key = config.fields[field]
  const value = product[key]
  // Fallback for lazada name field
  if (field === 'name' && (value === undefined || value === null)) {
    return product.name ?? null
  }
  return value ?? null
}

/**
 * Format a price number as IDR currency.
 */
export function formatPrice(price) {
  if (price === null || price === undefined) return '-'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}
