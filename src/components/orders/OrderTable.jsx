import { useNavigate } from 'react-router-dom'
import { shortId, formatDate } from '../../utils/helpers'
import { formatPrice } from '../../utils/marketplaceConfig'
import OrderStatusBadge from './OrderStatusBadge'

export default function OrderTable({ orders, marketplace }) {
  const navigate = useNavigate()

  if (!orders?.length) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-4xl mb-3">🧾</p>
        <p className="font-medium">No orders yet</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="text-left px-4 py-3 font-semibold text-gray-600">Order ID</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
            <th className="text-right px-4 py-3 font-semibold text-gray-600">Total</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Created</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const id = order.id || order._id || order.order_id
            return (
              <tr
                key={id}
                onClick={() => navigate(`/${marketplace}/orders/${id}`)}
                className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 font-mono text-gray-700">#{shortId(id)}</td>
                <td className="px-4 py-3">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="px-4 py-3 text-right font-semibold text-gray-800">
                  {formatPrice(order.total_price || order.totalPrice || order.total)}
                </td>
                <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">
                  {formatDate(order.created_at || order.createdAt)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
