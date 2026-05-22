import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useMarketplace } from '../../hooks/useMarketplace'
import { getProducts } from '../../services/productService'
import ProductGrid from '../../components/products/ProductGrid'
import SearchBar from '../../components/common/SearchBar'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import Button from '../../components/common/Button'

const LIMIT = 12

export default function ProductListPage() {
  const { marketplace, config } = useMarketplace()
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const currentSearch = searchParams.get('search') || ''
  const currentCategory = searchParams.get('category') || ''

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = { page: currentPage, limit: LIMIT }
      if (currentSearch) params.search = currentSearch
      if (currentCategory) params.category = currentCategory

      const { data } = await getProducts(marketplace, params)
      // Normalize response shape: { data: { products, total, categories, ... } }
      const res = data.data || data
      const productList = res.products || res.items || res.data || (Array.isArray(res) ? res : [])
      setProducts(productList)

      // Compute total pages
      const total = res.total || res.totalCount || productList.length
      setTotalPages(Math.ceil(total / LIMIT) || 1)

      // Extract categories if available
      if (res.categories && categories.length === 0) {
        setCategories(res.categories)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }, [marketplace, currentPage, currentSearch, currentCategory])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const updateParam = (key, value) => {
    const params = Object.fromEntries(searchParams.entries())
    if (value) params[key] = value
    else delete params[key]
    if (key !== 'page') params.page = '1'
    setSearchParams(params)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchBar
            onSearch={(val) => updateParam('search', val)}
            initialValue={currentSearch}
            ringColor={config.ringColor}
            placeholder={`Search in ${config.name}...`}
          />
        </div>
        {categories.length > 0 && (
          <select
            value={currentCategory}
            onChange={(e) => updateParam('category', e.target.value)}
            className={`input-base w-auto ${config.ringColor}`}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        )}
      </div>

      {/* Active filters */}
      {(currentSearch || currentCategory) && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500">Filters:</span>
          {currentSearch && (
            <span className={`${config.badgeBg} text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1`}>
              "{currentSearch}"
              <button onClick={() => updateParam('search', '')} className="ml-1 hover:opacity-70">✕</button>
            </span>
          )}
          {currentCategory && (
            <span className={`${config.badgeBg} text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1`}>
              {currentCategory}
              <button onClick={() => updateParam('category', '')} className="ml-1 hover:opacity-70">✕</button>
            </span>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
          <button onClick={fetchProducts} className="ml-3 underline">Retry</button>
        </div>
      )}

      {/* Products */}
      {loading ? (
        <LoadingSpinner color={config.textColor} />
      ) : (
        <ProductGrid products={products} marketplace={marketplace} config={config} />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button
            onClick={() => updateParam('page', String(currentPage - 1))}
            disabled={currentPage <= 1}
            colorClass={config.btnBg}
            className="px-3 py-1.5 text-sm"
          >
            ← Prev
          </Button>
          <span className="text-sm text-gray-600 px-3">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => updateParam('page', String(currentPage + 1))}
            disabled={currentPage >= totalPages}
            colorClass={config.btnBg}
            className="px-3 py-1.5 text-sm"
          >
            Next →
          </Button>
        </div>
      )}
    </div>
  )
}
