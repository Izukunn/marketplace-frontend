import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProductField } from '../../utils/marketplaceConfig'
import { placeholderImage } from '../../utils/helpers'
import { useAuthStore } from '../../stores/authStore'
import { useUiStore } from '../../stores/uiStore'
import { createOrder } from '../../services/orderService'
import Button from '../common/Button'
import StockBadge from './StockBadge'
import PriceTag from './PriceTag'
import QuantityInput from './QuantityInput'

export default function ProductDetail({ product, marketplace, config }) {
  const [quantity, setQuantity] = useState(1)
  const [buying, setBuying] = useState(false)
  const { user } = useAuthStore()
  const { showToast } = useUiStore()
  const navigate = useNavigate()

  const name = getProductField(product, marketplace, 'name')
  const sku = getProductField(product, marketplace, 'sku')
  const stock = getProductField(product, marketplace, 'stock')
  const price = getProductField(product, marketplace, 'price')
  const outOfStock = !stock || stock <= 0
  const imgSrc = product.image || product.images?.[0] || placeholderImage(sku || product.id)

  const handleBuyNow = async () => {
    if (!user) {
      navigate('/login')
      return
    }
    setBuying(true)
    try {
      await createOrder(marketplace, sku, quantity)
      showToast('Order placed successfully! 🎉', 'success')
      navigate(`/${marketplace}/my-orders`)
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to place order'
      showToast(msg, 'error')
    } finally {
      setBuying(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="bg-gray-100 aspect-square md:aspect-auto overflow-hidden">
            <img
              src={imgSrc}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = placeholderImage(product.id) }}
            />
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-snug">{name || 'Product'}</h1>
              <p className="text-xs text-gray-400 font-mono mt-1">SKU: {sku}</p>
            </div>

            <PriceTag price={price} colorClass={config.textColor} />

            <StockBadge stock={stock} />

            {product.description && (
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            )}

            {/* Quantity */}
            {!outOfStock && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Quantity</p>
                <QuantityInput
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                  max={stock || 99}
                />
              </div>
            )}

            {/* Subtotal */}
            {!outOfStock && price && (
              <div className={`${config.bgLight} rounded-lg p-3`}>
                <p className="text-sm text-gray-500">Subtotal</p>
                <PriceTag price={price * quantity} colorClass={config.textColor} size="md" />
              </div>
            )}

            <Button
              colorClass={config.btnBg}
              onClick={handleBuyNow}
              disabled={outOfStock}
              loading={buying}
              className="w-full py-3 text-base mt-auto"
            >
              {outOfStock ? 'Out of Stock' : 'Buy Now'}
            </Button>

            {!user && (
              <p className="text-xs text-center text-gray-400">
                You'll be redirected to login if not signed in
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
