import { useState, useEffect } from 'react'
import { Mail, MessageCircle, Globe } from 'lucide-react'

const Footer = () => {
  const [dynamicPages, setDynamicPages] = useState([])
  const [footerSettings, setFooterSettings] = useState({
    footer_logo_text: 'ACCS',
    footer_logo_suffix: 'market.com',
    footer_company_name: 'ACCS market.com',
    footer_company_description: 'Buy or Sell Social Media Accounts (PVA & Cheap). Your trusted marketplace for social media accounts.',
    footer_contact_email: 'support@accsmarket.com',
    footer_contact_website: 'accsmarket.news',
    footer_contact_support_text: '24/7 Support Available',
    footer_contact_security_text: 'Secure Transactions',
    footer_copyright_text: '© 2024 AccsMarket.com. All rights reserved.',
    footer_payment_methods: '["BTC", "USDT", "ETH", "PayPal"]',
    footer_quick_links: '[]',
    footer_support_links: '[]'
  })
  const [quickLinks, setQuickLinks] = useState([])
  const [supportLinks, setSupportLinks] = useState([])
  const [paymentMethods, setPaymentMethods] = useState(['BTC', 'USDT', 'ETH', 'PayPal'])

  useEffect(() => {
    loadDynamicPages()
    loadFooterSettings()
  }, [])

  const loadDynamicPages = async () => {
    try {
      const response = await fetch('/api/pages/active')
      const data = await response.json()
      
      if (data.success) {
        setDynamicPages(data.data)
      }
    } catch (error) {
      console.error('Error loading dynamic pages:', error)
    }
  }

  const loadFooterSettings = async () => {
    try {
      const response = await fetch('/api/admin/footer')
      const data = await response.json()
      
      if (data.success) {
        setFooterSettings(data.data)
        
        // Parse JSON strings
        try {
          setQuickLinks(JSON.parse(data.data.footer_quick_links || '[]'))
          setSupportLinks(JSON.parse(data.data.footer_support_links || '[]'))
          setPaymentMethods(JSON.parse(data.data.footer_payment_methods || '["BTC", "USDT", "ETH", "PayPal"]'))
        } catch (e) {
          console.error('Error parsing footer JSON:', e)
          setQuickLinks([])
          setSupportLinks([])
          setPaymentMethods(['BTC', 'USDT', 'ETH', 'PayPal'])
        }
      }
    } catch (error) {
      console.error('Error loading footer settings:', error)
    }
  }

  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-red-600 text-white px-3 py-2 rounded font-bold text-xl">
                {footerSettings.footer_logo_text || 'ACCS'}
              </div>
              <span className="ml-2 text-xl font-semibold">{footerSettings.footer_logo_suffix || 'market.com'}</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              {footerSettings.footer_company_description || 'Buy or Sell Social Media Accounts (PVA & Cheap). Your trusted marketplace for social media accounts.'}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Globe size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Search Accounts
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Become a Seller
                </a>
              </li>
              {/* Custom Quick Links from Database */}
              {quickLinks.slice(0, 3).map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
              {/* Dynamic Pages */}
              {dynamicPages.slice(0, Math.max(0, 3 - quickLinks.length)).map((page) => (
                <li key={page.id}>
                  <a href={`/${page.slug}`} className="text-gray-300 hover:text-white transition-colors">
                    {page.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Contact Support
                </a>
              </li>
              {/* Custom Support Links from Database */}
              {supportLinks.slice(0, 3).map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
              {/* Additional Dynamic Pages */}
              {dynamicPages.slice(3, 6).map((page) => (
                <li key={page.id}>
                  <a href={`/${page.slug}`} className="text-gray-300 hover:text-white transition-colors">
                    {page.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>📧 {footerSettings.footer_contact_email || 'support@accsmarket.com'}</p>
              <p>🌐 {footerSettings.footer_contact_website || 'accsmarket.news'}</p>
              <p>💬 {footerSettings.footer_contact_support_text || '24/7 Support Available'}</p>
              <p>🔒 {footerSettings.footer_contact_security_text || 'Secure Transactions'}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {footerSettings.footer_copyright_text || '© 2024 AccsMarket.com. All rights reserved.'}
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Payment Methods:</span>
              <div className="flex space-x-2">
                {paymentMethods.map((method, index) => (
                  <span key={index} className="bg-gray-700 px-2 py-1 rounded text-xs">{method}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

