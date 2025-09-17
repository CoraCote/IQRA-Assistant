import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService implements OnModuleInit {
  private supabase: any;

  constructor(private configService: ConfigService) { }

  onModuleInit() {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration');
    }

    // Log minimal config for diagnostics (mask key)
    const maskedKey = `${supabaseKey.substring(0, 6)}…${supabaseKey.substring(supabaseKey.length - 4)}`;
    // eslint-disable-next-line no-console
    console.log(`Supabase init → url=${supabaseUrl} key=${maskedKey}`);

    this.supabase = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: { 'X-Client-Info': 'iqra-assistant-backend' },
      },
    });
  }

  getClient(): any {
    return this.supabase;
  }

  // Menu operations
  async getMenuItems() {
    const { data, error } = await this.supabase
      .from('menu_items')
      .select('*')
      .eq('available', true)
      .order('category', { ascending: true });

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Supabase getMenuItems error:', error);
      throw error;
    }
    return data;
  }

  async getMenuModifiers() {
    const { data, error } = await this.supabase
      .from('menu_modifiers')
      .select('*')
      .eq('available', true)
      .order('modifier_group', { ascending: true });

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Supabase getMenuModifiers error:', error);
      throw error;
    }
    return data;
  }

  // Order operations
  async createOrder(order: any) {
    const { data, error } = await this.supabase
      .from('orders')
      .insert(order)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getOrder(orderId: string) {
    const { data, error } = await this.supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error) throw error;
    return data;
  }

  async updateOrder(orderId: string, updates: any) {
    const { data, error } = await this.supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Transcript operations
  async createTranscript(transcript: any) {
    const { data, error } = await this.supabase
      .from('transcripts')
      .insert(transcript)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Analytics operations
  async getOrderCount() {
    const { count, error } = await this.supabase
      .from('orders')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return count || 0;
  }

  async getTranscriptCount() {
    const { count, error } = await this.supabase
      .from('transcripts')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return count || 0;
  }

  async getOrdersToday() {
    const today = new Date().toISOString().split('T')[0];
    const { count, error } = await this.supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', `${today}T00:00:00.000Z`)
      .lt('created_at', `${today}T23:59:59.999Z`);

    if (error) throw error;
    return count || 0;
  }

  async getTranscriptsToday() {
    const today = new Date().toISOString().split('T')[0];
    const { count, error } = await this.supabase
      .from('transcripts')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', `${today}T00:00:00.000Z`)
      .lt('created_at', `${today}T23:59:59.999Z`);

    if (error) throw error;
    return count || 0;
  }

  async getAverageOrderValue() {
    const { data, error } = await this.supabase
      .from('orders')
      .select('total_amount')
      .not('status', 'eq', 'draft');

    if (error) throw error;

    if (!data || data.length === 0) return 0;

    const total = data.reduce((sum, order) => sum + order.total_amount, 0);
    return total / data.length;
  }
}

