import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { MenuItem, MenuModifier } from '@iqra-assistant/shared';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  @ApiOperation({ summary: 'Get menu items and modifiers' })
  @ApiResponse({ 
    status: 200, 
    description: 'Menu retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
              base_price: { type: 'number' },
              category: { type: 'string' },
              available: { type: 'boolean' },
              created_at: { type: 'string' },
              updated_at: { type: 'string' }
            }
          }
        },
        modifiers: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              price_adjustment: { type: 'number' },
              modifier_group: { type: 'string' },
              available: { type: 'boolean' },
              created_at: { type: 'string' },
              updated_at: { type: 'string' }
            }
          }
        }
      }
    }
  })
  async getMenu(): Promise<{ items: MenuItem[]; modifiers: MenuModifier[] }> {
    try {
      return await this.menuService.getMenu();
    } catch (error: any) {
      const message = error?.message || 'Failed to fetch menu from Supabase';
      // Propagate as 502 so the client can distinguish upstream failure
      throw new HttpException({ message }, HttpStatus.BAD_GATEWAY);
    }
  }
}

