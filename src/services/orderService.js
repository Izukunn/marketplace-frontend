import api from '../api/client'
import { MARKETPLACE_CONFIG } from '../utils/marketplaceConfig'

/**
 * Create a new order. Dynamically builds request body based on marketplace.
 * @param {string} marketplace - shopee | tokopedia | lazada
 * @param {string} sku - The product SKU (already the correct field value)
 * @param {number} quantity
 */
export const createOrder = (marketplace, sku, quantity) => {
  const config = MARKETPLACE_CONFIG[marketplace]
  if (!config) throw new Error(`Unknown marketplace: ${marketplace}`)
  const body = config.buildOrderBody(sku, quantity)
  return api.post(`/${marketplace}/orders`, body)
}

/**
 * Fetch paginated orders for the current user.
 */
export const getOrders = (marketplace, params = {}) =>
  api.get(`/${marketplace}/orders`, { params })

/**
 * Fetch a single order by ID.
 */
export const getOrderById = (marketplace, id) =>
  api.get(`/${marketplace}/orders/${id}`)
