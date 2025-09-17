import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { OpenaiService } from '../openai/openai.service';
import { 
  DraftOrderRequest, 
  DraftOrderResponse, 
  CommitOrderRequest, 
  CommitOrderResponse,
  Order 
} from '@iqra-assistant/shared';

@Injectable()
export class OrderService {
  constructor(
    private supabaseService: SupabaseService,
    private openaiService: OpenaiService,
  ) {}

  async draftOrder(request: DraftOrderRequest): Promise<DraftOrderResponse> {
    return this.openaiService.processOrderDraft(request);
  }

  async commitOrder(request: CommitOrderRequest): Promise<CommitOrderResponse> {
    const { order } = request;
    
    // Add timestamps
    const now = new Date().toISOString();
    const orderWithTimestamps = {
      ...order,
      created_at: now,
      updated_at: now,
      status: 'confirmed',
    };

    try {
      const savedOrder = await this.supabaseService.createOrder(orderWithTimestamps);
      
      return {
        order_id: savedOrder.id,
        status: 'confirmed',
        message: 'Order confirmed successfully',
      };
    } catch (error) {
      console.error('Error saving order:', error);
      throw new Error('Failed to save order');
    }
  }

  async getOrder(orderId: string): Promise<Order> {
    return this.supabaseService.getOrder(orderId);
  }

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    return this.supabaseService.updateOrder(orderId, { 
      status, 
      updated_at: new Date().toISOString() 
    });
  }
}

