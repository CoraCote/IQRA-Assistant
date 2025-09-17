import { z } from 'zod';

// Menu Item Schema
export const MenuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  base_price: z.number().positive(),
  category: z.string(),
  available: z.boolean().default(true),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// Menu Modifier Schema
export const MenuModifierSchema = z.object({
  id: z.string(),
  name: z.string(),
  price_adjustment: z.number(),
  modifier_group: z.string(),
  available: z.boolean().default(true),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// Order Item Schema
export const OrderItemSchema = z.object({
  menu_item_id: z.string(),
  quantity: z.number().int().positive(),
  modifiers: z.array(z.object({
    modifier_id: z.string(),
    quantity: z.number().int().positive().default(1),
  })).default([]),
  special_instructions: z.string().optional(),
});

// Order Schema
export const OrderSchema = z.object({
  id: z.string().optional(),
  customer_name: z.string().optional(),
  customer_phone: z.string().optional(),
  items: z.array(OrderItemSchema),
  total_amount: z.number().positive(),
  status: z.enum(['draft', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled']).default('draft'),
  special_instructions: z.string().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

// Transcript Schema
export const TranscriptSchema = z.object({
  id: z.string().optional(),
  session_id: z.string(),
  customer_phone: z.string().optional(),
  transcript_text: z.string(),
  order_id: z.string().optional(),
  created_at: z.string().datetime().optional(),
});

// API Request/Response Schemas
export const DraftOrderRequestSchema = z.object({
  customer_input: z.string(),
  menu_items: z.array(MenuItemSchema),
  menu_modifiers: z.array(MenuModifierSchema),
});

export const DraftOrderResponseSchema = z.object({
  order: OrderSchema,
  confidence_score: z.number().min(0).max(1),
  clarification_needed: z.boolean().default(false),
  clarification_message: z.string().optional(),
});

export const CommitOrderRequestSchema = z.object({
  order: OrderSchema,
});

export const CommitOrderResponseSchema = z.object({
  order_id: z.string(),
  status: z.string(),
  message: z.string(),
});

export const SendSMSRequestSchema = z.object({
  to: z.string(),
  message: z.string(),
});

export const SendSMSResponseSchema = z.object({
  message_id: z.string(),
  status: z.string(),
});

export const TranscriptIntakeRequestSchema = z.object({
  session_id: z.string(),
  customer_phone: z.string().optional(),
  transcript_text: z.string(),
  order_id: z.string().optional(),
});

export const TranscriptIntakeResponseSchema = z.object({
  transcript_id: z.string(),
  status: z.string(),
});

export const MetricsResponseSchema = z.object({
  total_orders: z.number(),
  total_transcripts: z.number(),
  orders_today: z.number(),
  transcripts_today: z.number(),
  average_order_value: z.number(),
});

// Type exports
export type MenuItem = z.infer<typeof MenuItemSchema>;
export type MenuModifier = z.infer<typeof MenuModifierSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type Transcript = z.infer<typeof TranscriptSchema>;
export type DraftOrderRequest = z.infer<typeof DraftOrderRequestSchema>;
export type DraftOrderResponse = z.infer<typeof DraftOrderResponseSchema>;
export type CommitOrderRequest = z.infer<typeof CommitOrderRequestSchema>;
export type CommitOrderResponse = z.infer<typeof CommitOrderResponseSchema>;
export type SendSMSRequest = z.infer<typeof SendSMSRequestSchema>;
export type SendSMSResponse = z.infer<typeof SendSMSResponseSchema>;
export type TranscriptIntakeRequest = z.infer<typeof TranscriptIntakeRequestSchema>;
export type TranscriptIntakeResponse = z.infer<typeof TranscriptIntakeResponseSchema>;
export type MetricsResponse = z.infer<typeof MetricsResponseSchema>;

