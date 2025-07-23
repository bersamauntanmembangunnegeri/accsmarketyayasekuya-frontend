import { useState, useEffect } from 'react'
import { X, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

const CheckoutModal = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    email: '',
    quantity: 1,
    paymentMethod: 'USDT TRC20 (min.$12)',
    couponCode: '',
    agreeTerms: false,
    subscribeNewsletter: false
  })
  const [vendors, setVendors] = useState([])
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [totalPrice, setTotalPrice] = useState(0)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const paymentMethods = [
    'USDT TRC20 (min.$12)',
    'Zcash (ZEC)',
    'Bitcoin cash (BCH)',
    'Tron (TRX)',
    'Litecoin (LTC)',
    'Etherium (ETH network) +1.33$',
    'BNB (BEP 20, BSC network)',
    'BUSD (BEP20, BSC network)',
    'BUSD (ERC20, ETH network)',
    'USDT ERC20 +2.09$ (min.$1.5)',
    'USDC ERC20 +1.69$ (min.$1.5)',
    'Other crypto-currencies',
    'Bitcoin (BTC) +1$ (min.$34)',
    'Capitalist',
    'AdvCash USD'
  ]

  // Mock vendors data
  useEffect(() => {
    if (isOpen && product) {
      const mockVendors = [
        { id: 1, name: 'Partner #2401', rating: 4.6, price: product.base_price, stock: 345 },
        { id: 2, name: 'Partner #1892', rating: 4.8, price: product.base_price * 1.05, stock: 1648 },
        { id: 3, name: 'Partner #3456', rating: 4.9, price: product.base_price * 1.1, stock: 1175 }
      ]
      setVendors(mockVendors)
      setSelectedVendor(mockVendors[0])
    }
  }, [isOpen, product])

  // Calculate total price
  useEffect(() => {
    if (selectedVendor && formData.quantity) {
      let price = selectedVendor.price * formData.quantity
      
      // Apply coupon discount
      if (formData.couponCode.toLowerCase() === 'news') {
        price = price * 0.91 // 9% discount
      }
      
      setTotalPrice(price)
    }
  }, [selectedVendor, formData.quantity, formData.couponCode])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    
    if (!formData.quantity || formData.quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1'
    }
    
    if (!selectedVendor) {
      newErrors.vendor = 'Please select a vendor'
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms of use'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Show success message
      alert('Order placed successfully!')
      onClose()
      
      // Reset form
      setFormData({
        email: '',
        quantity: 1,
        paymentMethod: 'USDT TRC20 (min.$12)',
        couponCode: '',
        agreeTerms: false,
        subscribeNewsletter: false
      })
    } catch (error) {
      alert('Error placing order. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">BUY</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 bg-gray-50 border-b">
          <p className="text-sm text-gray-600 mb-2">{product?.name}</p>
          <div className="text-xs text-gray-500">
            Male or female. The account profiles may be empty or have limited entries such as photos and other information. 2FA included. Cookies are included. Accounts are registered in United Kingdom IP.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {/* Step 1: Select a vendor */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
              <span className="font-medium">Step 1: Select a vendor</span>
            </div>
            
            <div className="space-y-2">
              {vendors.map((vendor) => (
                <div 
                  key={vendor.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedVendor?.id === vendor.id 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedVendor(vendor)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{vendor.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>⭐ {vendor.rating}</span>
                        <span>📦 {vendor.stock}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">
                        ${parseFloat(vendor.price).toFixed(3)}
                      </p>
                      <p className="text-xs text-gray-500">per pc.</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {errors.vendor && (
              <p className="text-red-500 text-xs mt-1">{errors.vendor}</p>
            )}
          </div>

          {/* Step 2: Data entry */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Step 2: Data entry</h3>
            
            <div className="space-y-4">
              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="test@example.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Quantity */}
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                  className={errors.quantity ? 'border-red-500' : ''}
                />
                {errors.quantity && (
                  <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <Label htmlFor="payment-method">Payment type</Label>
                <Select 
                  value={formData.paymentMethod} 
                  onValueChange={(value) => handleInputChange('paymentMethod', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Coupon */}
              <div>
                <Label htmlFor="coupon">Coupon (if you have)</Label>
                <Input
                  id="coupon"
                  value={formData.couponCode}
                  onChange={(e) => handleInputChange('couponCode', e.target.value)}
                  placeholder="Enter coupon code"
                />
                {formData.couponCode.toLowerCase() === 'news' && (
                  <p className="text-green-600 text-xs mt-1">9% discount applied!</p>
                )}
              </div>

              {/* Price */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Price</span>
                  <span className="text-lg font-bold text-green-600">
                    ${totalPrice.toFixed(3)}
                  </span>
                </div>
                {totalPrice < 12 && (
                  <p className="text-red-500 text-xs mt-1">
                    (!) - min sum - $12
                  </p>
                )}
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.subscribeNewsletter}
                    onCheckedChange={(checked) => handleInputChange('subscribeNewsletter', checked)}
                  />
                  <Label htmlFor="newsletter" className="text-sm">
                    Subscribe to E-mail newsletter for products
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:underline">public offer</a>
                    {' '}and{' '}
                    <a href="#" className="text-blue-600 hover:underline">terms of use</a>
                  </Label>
                </div>
                {errors.agreeTerms && (
                  <p className="text-red-500 text-xs">{errors.agreeTerms}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            disabled={isLoading || totalPrice < 12}
          >
            {isLoading ? 'Processing...' : 'Proceed to payment'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CheckoutModal

