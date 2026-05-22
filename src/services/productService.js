import api from '../api/client'

/**
 * Fetch paginated product list for a marketplace.
 * @param {string} marketplace - shopee | tokopedia | lazada
 * @param {Object} params - { page, limit, search, category, minPrice, maxPrice }
 */
export const getProducts = (marketplace, params = {}) =>
  api.get(`/${marketplace}/products`, { params })

/**
 * Fetch a single product by ID.
 */
export const getProductById = (marketplace, id) =>
  api.get(`/${marketplace}/products/${id}`)
