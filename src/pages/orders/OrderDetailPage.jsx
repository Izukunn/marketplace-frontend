import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useMarketplace } from '../../hooks/useMarketplace'
import { getOrderById } from '../../services/orderService'
import OrderDetailCard from '../../components/orders/OrderDetailCard'
import LoadingSpinner from '../../components/common/LoadingSpinner'

export default function OrderDetailPage() {
  const { id } = useParams()
  const { marketplace, config } = useMarketplace()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    getOrderById(marketplace, id)
      .then(({ data }) => {
        if (!cancelled) {
          const o = data.data || data
          setOrder(o)
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.response?.data?.message || 'Order not found')
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [marketplace, id])

  if (loading) return <LoadingSpinner color={config.textColor} />

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto">
      <Link to={`/${marketplace}/my-orders`} className={`text-sm ${config.textColor} hover:underline`}>
        ← Back to My Orders
      </Link>

      {error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      ) : (
        <OrderDetailCard order={order} marketplace={marketplace} />
      )}
    </div>
  )
}
