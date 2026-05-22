import ProductCard from '../common/ProductCard'

export default function ProductGrid({ products, marketplace, config }) {
  if (!products?.length) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-4xl mb-3">📦</p>
        <p className="font-medium">No products found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id || product._id}
          product={product}
          marketplace={marketplace}
          config={config}
        />
      ))}
    </div>
  )
}
