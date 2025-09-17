import axios from 'axios'
import { 
  MenuItem, 
  MenuModifier, 
  DraftOrderRequest, 
  DraftOrderResponse,
  CommitOrderRequest,
  CommitOrderResponse,
  SendSMSRequest,
  SendSMSResponse,
  TranscriptIntakeRequest,
  TranscriptIntakeResponse,
  MetricsResponse
} from '@iqra-assistant/shared'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const apiService = {
  // Health
  health: () => api.get('/health'),

  // Menu
  getMenu: () => api.get<{ items: MenuItem[]; modifiers: MenuModifier[] }>('/menu'),

  // Orders
  draftOrder: (data: DraftOrderRequest) => 
    api.post<DraftOrderResponse>('/order/draft', data),
  
  commitOrder: (data: CommitOrderRequest) => 
    api.post<CommitOrderResponse>('/order/commit', data),

  // SMS
  sendSMS: (data: SendSMSRequest) => 
    api.post<SendSMSResponse>('/sms/send', data),

  // Transcripts
  intakeTranscript: (data: TranscriptIntakeRequest) => 
    api.post<TranscriptIntakeResponse>('/transcript/intake', data),

  // Admin
  getMetrics: () => api.get<MetricsResponse>('/admin/metrics'),

  // Tools (for ElevenLabs integration)
  tools: {
    health: () => api.get('/tools/health'),
    getMenu: () => api.get<{ items: MenuItem[]; modifiers: MenuModifier[] }>('/tools/menu'),
    draftOrder: (data: DraftOrderRequest) => 
      api.post<DraftOrderResponse>('/tools/order/draft', data),
    commitOrder: (data: CommitOrderRequest) => 
      api.post<CommitOrderResponse>('/tools/order/commit', data),
    sendSMS: (data: SendSMSRequest) => 
      api.post<SendSMSResponse>('/tools/sms/send', data),
    intakeTranscript: (data: TranscriptIntakeRequest) => 
      api.post<TranscriptIntakeResponse>('/tools/transcript/intake', data),
    getMetrics: () => api.get<MetricsResponse>('/tools/admin/metrics'),
  }
}

