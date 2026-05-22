import { formatDate } from '../../utils/helpers'
import { formatPrice, MARKETPLACE_CONFIG } from '../../utils/marketplaceConfig'
import OrderStatusBadge from './OrderStatusBadge'

function Row({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm font-medium text-gray-500 sm:w-40 shrink-0">{label}</span>
      <span className="text-sm text-gray-800">{value}</span>
    </div>
  )
}

export default function OrderDetailCard({ order, marketplace }) {
  const config = MARKETPLACE_CONFIG[marketplace] || {}
  if (!order) return null

  const id = order.id || order._id || order.order_id
  const status = order.status
  const sku = order.sku || order.model_sku || order.seller_sku
  const productName = order.product_name || order.item_name || order.name || '-'
  const qty = order.qty || order.quantity
  const unitPrice = order.unit_price || order.price
  const totalPrice = order.total_price || order.totalPrice || order.total
  const createdAt = order.created_at || order.createdAt
  const shippingAddress = order.shipping_address || order.shippingAddress

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className={`${config.headerBg || 'bg-gray-800'} px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-xs">Order ID</p>
            <p className="text-white font-mono font-bold text-lg">#{String(id).slice(0, 12)}</p>
          </div>
          <OrderStatusBadge status={status} />
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-2">
        <Row label="Marketplace" value={config.name || marketplace} />
        <Row label="SKU" value={<span className="font-mono">{sku || '-'}</span>} />
        <Row label="Product" value={productName} />
        <Row label="Quantity" value={qty ?? '-'} />
        <Row label="Unit Price" value={formatPrice(unitPrice)} />
        <Row label="Total Price" value={
          <span className={`font-bold text-lg ${config.textColor}`}>{formatPrice(totalPrice)}</span>
        } />
        {shippingAddress && (
          <Row label="Shipping Address" value={
            typeof shippingAddress === 'object'
              ? Object.values(shippingAddress).filter(Boolean).join(', ')
              : shippingAddress
          } />
        )}
        <Row label="Created At" value={formatDate(createdAt)} />
      </div>
    </div>
  )
}
