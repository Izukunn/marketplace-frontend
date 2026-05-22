const STATUS_STYLES = {
  UNPAID: 'bg-yellow-100 text-yellow-800',
  PAID: 'bg-green-100 text-green-800',
  PENDING: 'bg-blue-100 text-blue-800',
  CANCELLED: 'bg-red-100 text-red-700',
  SHIPPED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-teal-100 text-teal-800',
}

export default function OrderStatusBadge({ status }) {
  const style = STATUS_STYLES[status?.toUpperCase()] || 'bg-gray-100 text-gray-600'
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${style}`}>
      {status || 'UNKNOWN'}
    </span>
  )
}
