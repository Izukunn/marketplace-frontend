export default function StockBadge({ stock }) {
  if (stock === null || stock === undefined) return null

  if (stock <= 0) {
    return <span className="inline-block px-2 py-0.5 bg-red-100 text-red-600 text-xs font-semibold rounded-full">Out of Stock</span>
  }
  if (stock <= 10) {
    return <span className="inline-block px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">Low Stock: {stock} left</span>
  }
  return <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">In Stock ({stock})</span>
}
