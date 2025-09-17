import { useState } from 'react'
import { Mic, MicOff, Send, Loader2 } from 'lucide-react'
import { MenuItem, MenuModifier, Order } from '@iqra-assistant/shared'

interface ChatWidgetProps {
  onOrderDraft: (order: Order) => void
  menu: { items: MenuItem[]; modifiers: MenuModifier[] } | undefined
}

export function ChatWidget({ onOrderDraft, menu }: ChatWidgetProps) {
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'assistant'; content: string }>>([
    { type: 'assistant', content: 'Hi! I\'m your AI assistant. How can I help you order today?' }
  ])

  const handleVoiceToggle = () => {
    if (isListening) {
      // Stop listening
      setIsListening(false)
    } else {
      // Start listening (this would integrate with ElevenLabs)
      setIsListening(true)
      // Simulate voice input for demo
      setTimeout(() => {
        setIsListening(false)
        handleUserInput('I would like a large pepperoni pizza with extra cheese')
      }, 2000)
    }
  }

  const handleUserInput = async (input: string) => {
    if (!input.trim() || !menu) return

    // Add user message
    const newMessages = [...messages, { type: 'user' as const, content: input }]
    setMessages(newMessages)

    setIsProcessing(true)

    try {
      // Simulate AI processing
      const response = await fetch('/api/order/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_input: input,
          menu_items: menu.items,
          menu_modifiers: menu.modifiers,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        const assistantMessage = result.clarification_needed 
          ? result.clarification_message 
          : `I've prepared your order! Total: $${result.order.total_amount.toFixed(2)}. Would you like to confirm?`
        
        setMessages(prev => [...prev, { type: 'assistant', content: assistantMessage }])
        
        if (!result.clarification_needed) {
          onOrderDraft(result.order)
        }
      } else {
        setMessages(prev => [...prev, { 
          type: 'assistant', 
          content: 'Sorry, I encountered an error processing your order. Please try again.' 
        }])
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        type: 'assistant', 
        content: 'Sorry, I\'m having trouble connecting. Please try again in a moment.' 
      }])
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = e.currentTarget.message.value.trim()
    if (input) {
      handleUserInput(input)
      e.currentTarget.reset()
    }
  }

  return (
    <div className="h-96 flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-900'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          name="message"
          type="text"
          placeholder="Type your order..."
          className="flex-1 input"
          disabled={isProcessing}
        />
        <button
          type="button"
          onClick={handleVoiceToggle}
          disabled={isProcessing}
          className={`btn ${isListening ? 'btn-primary' : 'btn-outline'}`}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>
        <button
          type="submit"
          disabled={isProcessing}
          className="btn btn-primary"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* ElevenLabs Integration Note */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This demo uses simulated voice input. In production, this would integrate with ElevenLabs for real voice processing.
        </p>
      </div>
    </div>
  )
}

