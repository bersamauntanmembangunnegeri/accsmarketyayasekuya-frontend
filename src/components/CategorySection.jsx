import { useState } from 'react'
import { ChevronRight, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductCard from './ProductCard'

const CategorySection = ({ category, products }) => {
  const [showAll, setShowAll] = useState(false)
  
  const displayedProducts = showAll ? products : products.slice(0, 4)
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Category Header */}
      <div className="bg-gray-800 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <img 
                src="/api/placeholder/40/40" 
                alt={category.name}
                className="w-6 h-6"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'block'
                }}
              />
              <div className="w-6 h-6 bg-blue-500 rounded hidden items-center justify-center text-white text-xs font-bold">
                {category.name.charAt(0)}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold">{category.name}</h2>
              <p className="text-sm text-gray-300">
                {category.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-300">
              {products.length} products
            </span>
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white hover:bg-white hover:text-gray-800"
              onClick={() => setShowAll(!showAll)}
            >
              <Eye size={16} className="mr-2" />
              {showAll ? 'Show Less' : 'View all'}
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4">
        {products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No products available in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        {!showAll && products.length > 4 && (
          <div className="text-center mt-6">
            <Button
              variant="outline"
              onClick={() => setShowAll(true)}
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
            >
              Show {products.length - 4} more products
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategorySection

