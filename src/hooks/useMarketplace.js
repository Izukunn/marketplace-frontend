import { useParams } from 'react-router-dom'
import { MARKETPLACE_CONFIG, VALID_MARKETPLACES } from '../utils/marketplaceConfig'

/**
 * Returns the current marketplace slug from the URL params,
 * plus its config object. Falls back to 'shopee' if invalid.
 */
export function useMarketplace() {
  const { marketplace } = useParams()
  const slug = VALID_MARKETPLACES.includes(marketplace) ? marketplace : 'shopee'
  const config = MARKETPLACE_CONFIG[slug]
  return { marketplace: slug, config }
}
