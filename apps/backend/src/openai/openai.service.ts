import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { 
  DraftOrderRequest, 
  DraftOrderResponse, 
  Order, 
  MenuItem, 
  MenuModifier 
} from '@iqra-assistant/shared';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('Missing OpenAI API key');
    }
    this.openai = new OpenAI({ apiKey });
  }

  async processOrderDraft(request: DraftOrderRequest): Promise<DraftOrderResponse> {
    const { customer_input, menu_items, menu_modifiers } = request;

    // Create a structured prompt for the AI
    const systemPrompt = this.createSystemPrompt(menu_items, menu_modifiers);
    
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: customer_input }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      // Parse the AI response and create order
      const order = this.parseOrderFromResponse(response, menu_items, menu_modifiers);
      
      return {
        order,
        confidence_score: 0.85, // Could be calculated based on response analysis
        clarification_needed: false,
      };
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to process order with AI');
    }
  }

  private createSystemPrompt(menuItems: MenuItem[], menuModifiers: MenuModifier[]): string {
    const menuText = menuItems.map(item => 
      `${item.name} - $${item.base_price} (${item.description || 'No description'})`
    ).join('\n');

    const modifiersText = menuModifiers.map(mod => 
      `${mod.name} - ${mod.price_adjustment > 0 ? '+' : ''}$${mod.price_adjustment} (${mod.modifier_group})`
    ).join('\n');

    return `You are an AI assistant for a restaurant. Your job is to parse customer orders from natural language and convert them into a structured JSON format.

MENU ITEMS:
${menuText}

MODIFIERS:
${modifiersText}

INSTRUCTIONS:
1. Parse the customer's order from their natural language input
2. Identify which menu items they want and quantities
3. Identify any modifiers (size, toppings, etc.)
4. Calculate the total price including modifiers
5. Return ONLY a valid JSON object in this exact format:
{
  "items": [
    {
      "menu_item_id": "item_id",
      "quantity": 1,
      "modifiers": [
        {
          "modifier_id": "modifier_id",
          "quantity": 1
        }
      ],
      "special_instructions": "any special requests"
    }
  ],
  "total_amount": 0,
  "special_instructions": "any general special instructions"
}

IMPORTANT:
- Only use menu_item_id and modifier_id values that exist in the provided lists
- Calculate total_amount correctly including all modifiers
- If the customer's request is unclear, ask for clarification
- If they mention items not on the menu, politely inform them it's not available
- Be helpful and friendly in your responses`;
  }

  private parseOrderFromResponse(
    response: string, 
    menuItems: MenuItem[], 
    menuModifiers: MenuModifier[]
  ): Order {
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      
      // Validate and calculate total
      let totalAmount = 0;
      const items = parsed.items.map((item: any) => {
        const menuItem = menuItems.find(mi => mi.id === item.menu_item_id);
        if (!menuItem) {
          throw new Error(`Invalid menu item ID: ${item.menu_item_id}`);
        }

        let itemTotal = menuItem.base_price * item.quantity;
        
        // Add modifier costs
        if (item.modifiers) {
          item.modifiers.forEach((mod: any) => {
            const modifier = menuModifiers.find(m => m.id === mod.modifier_id);
            if (modifier) {
              itemTotal += modifier.price_adjustment * mod.quantity;
            }
          });
        }

        totalAmount += itemTotal;

        return {
          menu_item_id: item.menu_item_id,
          quantity: item.quantity,
          modifiers: item.modifiers || [],
          special_instructions: item.special_instructions,
        };
      });

      return {
        items,
        total_amount: totalAmount,
        special_instructions: parsed.special_instructions,
        status: 'draft',
      };
    } catch (error) {
      console.error('Error parsing order from AI response:', error);
      throw new Error('Failed to parse order from AI response');
    }
  }
}

