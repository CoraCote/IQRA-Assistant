import { Order } from '@iqra-assistant/shared'
import { Check, X, ShoppingCart } from 'lucide-react'

interface OrderSummaryProps {
  order: Order
  onCommit: () => void
  onCancel: () => void
}

export function OrderSummary({ order, onCommit, onCancel }: OrderSummaryProps) {
  return (
    <div className="card">
      <div className="flex items-center mb-4">
        <ShoppingCart className="w-6 h-6 text-primary-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
      </div>

      <div className="space-y-4">
        {order.items.map((item, index) => (
          <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-medium text-gray-900">
                  {item.quantity}x Menu Item #{item.menu_item_id}
                </div>
                {item.special_instructions && (
                  <div className="text-sm text-gray-600 mt-1">
                    Note: {item.special_instructions}
                  </div>
                )}
                {item.modifiers && item.modifiers.length > 0 && (
                  <div className="text-sm text-gray-600 mt-1">
                    Modifiers: {item.modifiers.map(m => `${m.quantity}x Modifier #${m.modifier_id}`).join(', ')}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {order.special_instructions && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm font-medium text-gray-700 mb-1">Special Instructions:</div>
            <div className="text-sm text-gray-600">{order.special_instructions}</div>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>${order.total_amount.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            onClick={onCommit}
            className="flex-1 btn btn-primary flex items-center justify-center space-x-2"
          >
            <Check className="w-4 h-4" />
            <span>Confirm Order</span>
          </button>
          <button
            onClick={onCancel}
            className="flex-1 btn btn-outline flex items-center justify-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  )
}

