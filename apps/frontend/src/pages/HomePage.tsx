import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiService } from '../services/api'
import { ChatWidget } from '../components/ChatWidget'
import { MenuDisplay } from '../components/MenuDisplay'
import { OrderSummary } from '../components/OrderSummary'
import { Order } from '@iqra-assistant/shared'

export function HomePage() {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [showChat, setShowChat] = useState(true)

  const { data: menu, isLoading: menuLoading } = useQuery({
    queryKey: ['menu'],
    queryFn: () => apiService.getMenu().then(res => res.data),
  })

  const handleOrderDraft = (order: Order) => {
    setCurrentOrder(order)
  }

  const handleOrderCommit = () => {
    if (currentOrder) {
      // Here you would typically commit the order
      console.log('Committing order:', currentOrder)
      setCurrentOrder(null)
    }
  }

  if (menuLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading menu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to IQRA Assistant
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          AI-powered restaurant ordering system. Order by voice, text, or browse our menu.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chat Widget */}
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">AI Assistant</h2>
              <button
                onClick={() => setShowChat(!showChat)}
                className="btn btn-outline"
              >
                {showChat ? 'Hide Chat' : 'Show Chat'}
              </button>
            </div>
            
            {showChat && (
              <ChatWidget
                onOrderDraft={handleOrderDraft}
                menu={menu}
              />
            )}
          </div>

          {/* Fallback Text Chat */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Text Chat (Fallback)
            </h3>
            <div className="space-y-4">
              <textarea
                className="input h-32 resize-none"
                placeholder="Type your order here... (e.g., 'I'd like a large pepperoni pizza with extra cheese')"
              />
              <button className="btn btn-primary w-full">
                Process Order
              </button>
            </div>
          </div>
        </div>

        {/* Menu and Order Summary */}
        <div className="space-y-6">
          {menu && <MenuDisplay menu={menu} />}
          
          {currentOrder && (
            <OrderSummary
              order={currentOrder}
              onCommit={handleOrderCommit}
              onCancel={() => setCurrentOrder(null)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

