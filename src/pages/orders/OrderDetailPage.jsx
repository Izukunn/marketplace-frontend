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
    if (!id) {
      setError('Order ID is required')
      setLoading(false)
      return
    }

    let cancelled = false

    const fetchOrder = async () => {
      try {
        setLoading(true)
        setError('')

        const { data } = await getOrderById(marketplace, id)

        console.log('Order Response:', data)

        if (cancelled) return

        if (data?.success && data?.order) {
          setOrder(data.order)
        } else {
          throw new Error('Order not found')
        }
      } catch (err) {
        if (cancelled) return

        setError(
          err.response?.data?.message ||
          err.message ||
          'Order not found'
        )
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchOrder()

    return () => {
      cancelled = true
    }
  }, [marketplace, id])

  if (loading) {
    return <LoadingSpinner color={config?.textColor} />
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4">
      <Link
        to={`/${marketplace}/my-orders`}
        className={`text-sm ${config?.textColor} hover:underline`}
      >
        ← Back to My Orders
      </Link>

      {error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      ) : order ? (
        <OrderDetailCard
          order={order}
          marketplace={marketplace}
        />
      ) : (
        <div className="p-4 bg-gray-50 border rounded-xl text-gray-500 text-sm">
          Order not found
        </div>
      )}
    </div>
  )
}