import { useState, useEffect } from 'react'

const FAQPage = () => {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch FAQ data from backend or use mock data
    const mockFaqs = [
      {
        id: 1,
        question: "How do I purchase accounts?",
        answer: "You can browse our categories, select the accounts you need, and proceed to checkout. We accept various payment methods including cryptocurrency and PayPal."
      },
      {
        id: 2,
        question: "Are the accounts verified?",
        answer: "Yes, all our accounts are verified and come with the necessary verification details. Each account listing specifies the verification status and included features."
      },
      {
        id: 3,
        question: "What is your return policy?",
        answer: "We offer returns for accounts that don't meet the specified criteria. Return rates vary by account type and are clearly displayed on each product listing."
      },
      {
        id: 4,
        question: "How fast is delivery?",
        answer: "Most accounts are delivered within 48 hours of purchase. Delivery times are specified for each product category."
      },
      {
        id: 5,
        question: "Do you provide customer support?",
        answer: "Yes, we provide 24/7 customer support. You can contact us through our support ticket system or email."
      }
    ]
    
    setFaqs(mockFaqs)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading FAQ...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our services
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-blue-700 mb-4">
              Our support team is here to help you 24/7
            </p>
            <a 
              href="#" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQPage

