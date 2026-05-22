import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useMarketplace } from '../../hooks/useMarketplace'
import { getProductById } from '../../services/productService'
import ProductDetail from '../../components/products/ProductDetail'
import LoadingSpinner from '../../components/common/LoadingSpinner'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { marketplace, config } = useMarketplace()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    getProductById(marketplace, id)
      .then(({ data }) => {
        if (!cancelled) {
          const p = data.data || data
          setProduct(p)
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.response?.data?.message || 'Product not found')
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [marketplace, id])

  if (loading) return <LoadingSpinner color={config.textColor} />

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-3">😕</p>
        <p className="text-gray-600 mb-4">{error}</p>
        <Link to={`/${marketplace}`} className={`${config.textColor} underline text-sm`}>
          ← Back to {config.name}
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Link to={`/${marketplace}`} className={`text-sm ${config.textColor} hover:underline`}>
        ← Back to {config.name}
      </Link>
      <ProductDetail product={product} marketplace={marketplace} config={config} />
    </div>
  )
}
