import { useState } from 'react'
import { Star, Clock, TrendingUp, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import CheckoutModal from './CheckoutModal'
import OrderDetailsModal from './OrderDetailsModal'

const ProductCard = ({ product }) => {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false)
  const [currentOrder, setCurrentOrder] = useState(null)

  const handleOrderCreated = (order) => {
    setCurrentOrder(order)
    setIsCheckoutModalOpen(false)
    setIsOrderDetailsModalOpen(true)
  }

  const handleContinueToPayment = async (order) => {
    // Here you would integrate with your payment gateway
    // For now, we'll just show an alert
    alert(`Redirecting to payment gateway for order #${order.id}...`)
    
    // Close the order details modal
    setIsOrderDetailsModalOpen(false)
    setCurrentOrder(null)
  }

  const formatPrice = (price) => {
    return `From $${parseFloat(price).toFixed(3)}`
  }

  const formatRating = (rating) => {
    return parseFloat(rating).toFixed(1)
  }

  const formatReturnRate = (rate) => {
    return `${parseFloat(rate).toFixed(1)}%`
  }

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
        {/* Product Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <img 
                src="/api/placeholder/48/48" 
                alt="Facebook" 
                className="w-8 h-8"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'block'
                }}
              />
              <div className="w-8 h-8 bg-blue-500 rounded hidden items-center justify-center text-white font-bold">
                FB
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-900 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {product.category?.name}
              </p>
            </div>
          </div>
        </div>

        {/* Product Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-yellow-500">
              <Star size={12} fill="currentColor" />
              <span className="font-semibold">{formatRating(product.rating)}</span>
            </div>
            <p className="text-gray-500 mt-1">Rating</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-red-500">
              <TrendingUp size={12} />
              <span className="font-semibold">{formatReturnRate(product.return_rate)}</span>
            </div>
            <p className="text-gray-500 mt-1">Return</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-blue-500">
              <Clock size={12} />
              <span className="font-semibold">{product.delivery_time}</span>
            </div>
            <p className="text-gray-500 mt-1">Delivery</p>
          </div>
        </div>

        {/* Stock Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              📦 {product.stock_quantity}
            </Badge>
            <span className="text-xs text-gray-500">in stock</span>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-green-600">
              {formatPrice(product.base_price)}
            </p>
            <p className="text-xs text-gray-500">per pc.</p>
          </div>
        </div>

        {/* Buy Button */}
        <Button 
          onClick={() => setIsCheckoutModalOpen(true)}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          disabled={product.stock_quantity === 0}
        >
          <ShoppingCart size={16} className="mr-2" />
          {product.stock_quantity === 0 ? 'Out of Stock' : 'Buy'}
        </Button>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        product={product}
        onOrderCreated={handleOrderCreated}
      />

      {/* Order Details Modal */}
      <OrderDetailsModal 
        isOpen={isOrderDetailsModalOpen}
        onClose={() => {
          setIsOrderDetailsModalOpen(false)
          setCurrentOrder(null)
        }}
        order={currentOrder}
        onContinueToPayment={handleContinueToPayment}
      />
    </>
  )
}

export default ProductCard

