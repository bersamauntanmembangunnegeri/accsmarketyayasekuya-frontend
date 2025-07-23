import { useState } from 'react'
import { X, Check, Clock, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const OrderDetailsModal = ({ isOpen, onClose, order, onContinueToPayment }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleContinueToPayment = async () => {
    setIsLoading(true)
    try {
      // Call the payment continuation handler
      await onContinueToPayment(order)
    } catch (error) {
      alert('Error proceeding to payment. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen || !order) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Order Created Successfully</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Success Message */}
        <div className="p-4 bg-green-50 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Check size={16} className="text-white" />
            </div>
            <div>
              <p className="font-medium text-green-800">Order Created!</p>
              <p className="text-sm text-green-600">Your order has been saved with ID: #{order.id}</p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="p-4">
          <h3 className="font-medium mb-4">Order Details</h3>
          
          <div className="space-y-4">
            {/* Order ID and Status */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium">#{order.id}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status:</span>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                <Clock size={12} className="mr-1" />
                Pending Payment
              </Badge>
            </div>

            {/* Product Details */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Product Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Product:</span>
                  <span>{order.product_name || 'FB Accounts'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vendor:</span>
                  <span>{order.vendor_name || `Partner #${order.vendor_id}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span>{order.quantity} items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Unit Price:</span>
                  <span>${(order.total_price / order.quantity).toFixed(3)}</span>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Payment Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span>{order.payment_method}</span>
                </div>
                {order.coupon_code && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coupon Applied:</span>
                    <span className="text-green-600">{order.coupon_code}</span>
                  </div>
                )}
                <div className="flex justify-between items-center font-medium">
                  <span>Total Amount:</span>
                  <span className="text-lg text-green-600">${order.total_price.toFixed(3)}</span>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Customer Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span>{order.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Newsletter:</span>
                  <span>{order.subscribe_newsletter ? 'Subscribed' : 'Not subscribed'}</span>
                </div>
              </div>
            </div>

            {/* Order Date */}
            <div className="border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Order Date:</span>
                <span>{new Date(order.created_at || Date.now()).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <Button 
              onClick={handleContinueToPayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Connecting to Payment...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <CreditCard size={16} />
                  <span>Continue to Payment</span>
                </div>
              )}
            </Button>
            
            <Button 
              onClick={onClose}
              variant="outline"
              className="w-full"
            >
              Close
            </Button>
          </div>

          {/* Important Note */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-xs text-blue-700">
              <strong>Important:</strong> Your order is saved and will be held for 24 hours. 
              Please complete the payment to secure your purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsModal

