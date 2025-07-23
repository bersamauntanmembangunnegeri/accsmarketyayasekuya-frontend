import { useState } from 'react'
import { Search, Menu, X, Globe, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="bg-gray-800 text-white">
      {/* Top Bar */}
      <div className="bg-gray-700 px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <a href="#" className="text-green-400 hover:text-green-300 transition-colors">
              📰 News
            </a>
            <span className="text-gray-300">
              News, promotions, coupons, announcements are published on our news site - accsmarket.news
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-green-400 transition-colors">+ Sign Up</a>
            <a href="#" className="hover:text-green-400 transition-colors">🔐 Login</a>
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">🇬🇧 Eng</span>
              <span className="text-gray-300">🇷🇺 Рус</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-red-600 text-white px-3 py-2 rounded font-bold text-xl">
                ACCS
              </div>
              <span className="ml-2 text-xl font-semibold">market.com</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="hover:text-green-400 transition-colors">🎫 New ticket / Ask a question</a>
              <a href="#" className="hover:text-green-400 transition-colors">Home</a>
              <div className="relative group">
                <button className="hover:text-green-400 transition-colors flex items-center">
                  Useful information
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <a href="#" className="hover:text-green-400 transition-colors">FAQ</a>
              <a href="#" className="hover:text-green-400 transition-colors">Terms of use</a>
              <a href="#" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-colors">
                🌟 Become a seller
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-4 flex items-center space-x-4">
            <div className="relative">
              <Button 
                variant="outline" 
                className="bg-green-600 hover:bg-green-700 text-white border-green-600 min-w-[200px] justify-start"
              >
                📂 Select a category
                <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
            </div>
            
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search for accounts"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-black"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              🔍 Advanced search
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 px-4 py-4">
          <nav className="flex flex-col space-y-3">
            <a href="#" className="hover:text-green-400 transition-colors">🎫 New ticket / Ask a question</a>
            <a href="#" className="hover:text-green-400 transition-colors">Home</a>
            <a href="#" className="hover:text-green-400 transition-colors">Useful information</a>
            <a href="#" className="hover:text-green-400 transition-colors">FAQ</a>
            <a href="#" className="hover:text-green-400 transition-colors">Terms of use</a>
            <a href="#" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-colors text-center">
              🌟 Become a seller
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header

