import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { 
  DraftOrderRequest, 
  DraftOrderResponse, 
  CommitOrderRequest, 
  CommitOrderResponse,
  Order 
} from '@iqra-assistant/shared';

@ApiTags('orders')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('draft')
  @ApiOperation({ summary: 'Create a draft order using AI' })
  @ApiResponse({ 
    status: 201, 
    description: 'Order draft created successfully'
  })
  async draftOrder(@Body() request: DraftOrderRequest): Promise<DraftOrderResponse> {
    return this.orderService.draftOrder(request);
  }

  @Post('commit')
  @ApiOperation({ summary: 'Commit a draft order' })
  @ApiResponse({ 
    status: 201, 
    description: 'Order committed successfully'
  })
  async commitOrder(@Body() request: CommitOrderRequest): Promise<CommitOrderResponse> {
    return this.orderService.commitOrder(request);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Order retrieved successfully'
  })
  async getOrder(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOrder(id);
  }
}

