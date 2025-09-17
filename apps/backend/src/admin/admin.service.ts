import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { MetricsResponse } from '@iqra-assistant/shared';

@Injectable()
export class AdminService {
  constructor(private supabaseService: SupabaseService) {}

  async getMetrics(): Promise<MetricsResponse> {
    const [
      totalOrders,
      totalTranscripts,
      ordersToday,
      transcriptsToday,
      averageOrderValue,
    ] = await Promise.all([
      this.supabaseService.getOrderCount(),
      this.supabaseService.getTranscriptCount(),
      this.supabaseService.getOrdersToday(),
      this.supabaseService.getTranscriptsToday(),
      this.supabaseService.getAverageOrderValue(),
    ]);

    return {
      total_orders: totalOrders,
      total_transcripts: totalTranscripts,
      orders_today: ordersToday,
      transcripts_today: transcriptsToday,
      average_order_value: averageOrderValue,
    };
  }
}

