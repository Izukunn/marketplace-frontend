import { formatPrice } from '../../utils/marketplaceConfig'

export default function PriceTag({ price, colorClass = 'text-gray-800', size = 'lg' }) {
  const sizes = { sm: 'text-base', md: 'text-xl', lg: 'text-2xl xl:text-3xl' }
  return (
    <span className={`font-bold ${sizes[size]} ${colorClass}`}>
      {formatPrice(price)}
    </span>
  )
}
