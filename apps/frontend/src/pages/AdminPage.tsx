import { useQuery } from '@tanstack/react-query'
import { apiService } from '../services/api'
import { MetricsCard } from '../components/MetricsCard'
import { BarChart3, ShoppingCart, MessageSquare, TrendingUp, Calendar } from 'lucide-react'

export function AdminPage() {
  const { data: metrics, isLoading, error } = useQuery({
    queryKey: ['metrics'],
    queryFn: () => apiService.getMetrics().then(res => res.data),
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading metrics...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Metrics</h2>
          <p className="text-gray-600">Unable to load admin metrics. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Monitor your restaurant's AI assistant performance</p>
      </div>

      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Total Orders"
            value={metrics.total_orders}
            icon={ShoppingCart}
            color="blue"
          />
          <MetricsCard
            title="Total Transcripts"
            value={metrics.total_transcripts}
            icon={MessageSquare}
            color="green"
          />
          <MetricsCard
            title="Orders Today"
            value={metrics.orders_today}
            icon={Calendar}
            color="purple"
          />
          <MetricsCard
            title="Transcripts Today"
            value={metrics.transcripts_today}
            icon={MessageSquare}
            color="orange"
          />
        </div>
      )}

      {metrics && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-primary-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Average Order Value</h3>
            </div>
            <div className="text-3xl font-bold text-primary-600">
              ${metrics.average_order_value.toFixed(2)}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Based on {metrics.total_orders} total orders
            </p>
          </div>

          <div className="card">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-6 h-6 text-primary-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">AI Processing</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">SMS Service</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Database</span>
                <span className="text-green-600 font-medium">Connected</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

