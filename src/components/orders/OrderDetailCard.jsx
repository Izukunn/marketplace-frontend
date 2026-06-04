import { useEffect } from 'react'
import { formatDate } from '../../utils/helpers'
import { formatPrice, MARKETPLACE_CONFIG } from '../../utils/marketplaceConfig'
import OrderStatusBadge from './OrderStatusBadge'

function Row({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm font-medium text-gray-500 sm:w-40 shrink-0">
        {label}
      </span>
      <span className="text-sm text-gray-800">{value}</span>
    </div>
  )
}

export default function OrderDetailCard({ order, marketplace }) {
  const config = MARKETPLACE_CONFIG[marketplace] || {}

  useEffect(() => {
    console.log(order);
  }, [])
  if (!order) return null

  const {
    id,
    order_code,
    status,
    total_price,
    createdAt,
    items = [],
  } = order

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className={`${config.headerBg || 'bg-gray-800'} px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-xs">Order Code</p>
            <p className="text-white font-mono font-bold text-lg">
              {order_code || `#${String(id).slice(0, 12)}`}
            </p>
          </div>

          <OrderStatusBadge status={status} />
        </div>
      </div>

      {/* Order Info */}
      <div className="px-6 py-2">
        <Row
          label="Marketplace"
          value={config.name || marketplace}
        />

        <Row
          label="Total Price"
          value={
            <span className={`font-bold text-lg ${config.textColor}`}>
              {formatPrice(total_price)}
            </span>
          }
        />

        <Row
          label="Created At"
          value={formatDate(createdAt)}
        />
      </div>

      {/* Items */}
      <div className="border-t border-gray-100 px-6 py-4">
        <h3 className="font-semibold text-gray-800 mb-4">
          Order Items
        </h3>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-4 bg-gray-50"
            >
              <div className="flex gap-4">
                <img
                  src={
                    item.product?.thumbnail_url ||
                    '/placeholder-product.png'
                  }
                  alt={item.product?.product_name}
                  className="w-20 h-20 rounded-lg object-cover border"
                />

                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {item.product?.product_name}
                  </h4>

                  <p className="text-sm text-gray-500 mt-1">
                    SKU:{' '}
                    <span className="font-mono">
                      {item.marketplace_sku}
                    </span>
                  </p>

                  <div className="mt-2 text-sm text-gray-700">
                    <p>Quantity: {item.quantity}</p>
                    <p>
                      Unit Price:{' '}
                      {formatPrice(item.price)}
                    </p>
                    <p className="font-semibold">
                      Subtotal:{' '}
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <p className="text-sm text-gray-500">
            No items found.
          </p>
        )}
      </div>
    </div>
  )
}