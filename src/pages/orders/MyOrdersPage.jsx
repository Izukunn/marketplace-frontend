import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useMarketplace } from '../../hooks/useMarketplace'
import { getOrders } from '../../services/orderService'
import OrderTable from '../../components/orders/OrderTable'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import Button from '../../components/common/Button'

const LIMIT = 20

export default function MyOrdersPage() {
  const { marketplace, config } = useMarketplace()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1', 10)

  const [orders, setOrders] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await getOrders(marketplace, { page: currentPage, limit: LIMIT })
      const res = data.data || data
      const orderList = res.orders || res.items || res.data || (Array.isArray(res) ? res : [])
      setOrders(orderList)
      const total = res.total || res.totalCount || orderList.length
      setTotalPages(Math.ceil(total / LIMIT) || 1)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load orders')
    } finally {
      setLoading(false)
    }
  }, [marketplace, currentPage])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const setPage = (p) => setSearchParams({ page: String(p) })

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">My Orders</h2>
        <Link to={`/${marketplace}`} className={`text-sm ${config.textColor} hover:underline`}>
          ← Browse Products
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
          <button onClick={fetchOrders} className="ml-3 underline">Retry</button>
        </div>
      )}

      {loading ? (
        <LoadingSpinner color={config.textColor} />
      ) : (
        <OrderTable orders={orders} marketplace={marketplace} />
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button onClick={() => setPage(currentPage - 1)} disabled={currentPage <= 1} colorClass={config.btnBg} className="px-3 py-1.5 text-sm">
            ← Prev
          </Button>
          <span className="text-sm text-gray-600 px-3">Page {currentPage} of {totalPages}</span>
          <Button onClick={() => setPage(currentPage + 1)} disabled={currentPage >= totalPages} colorClass={config.btnBg} className="px-3 py-1.5 text-sm">
            Next →
          </Button>
        </div>
      )}
    </div>
  )
}
