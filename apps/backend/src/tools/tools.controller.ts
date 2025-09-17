import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MenuService } from '../menu/menu.service';
import { OrderService } from '../order/order.service';
import { SmsService } from '../sms/sms.service';
import { TranscriptService } from '../transcript/transcript.service';
import { AdminService } from '../admin/admin.service';
import { 
  DraftOrderRequest, 
  DraftOrderResponse, 
  CommitOrderRequest, 
  CommitOrderResponse,
  SendSMSRequest, 
  SendSMSResponse,
  TranscriptIntakeRequest, 
  TranscriptIntakeResponse,
  MetricsResponse 
} from '@iqra-assistant/shared';

@ApiTags('tools')
@Controller('tools')
export class ToolsController {
  constructor(
    private menuService: MenuService,
    private orderService: OrderService,
    private smsService: SmsService,
    private transcriptService: TranscriptService,
    private adminService: AdminService,
  ) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check for ElevenLabs integration' })
  @ApiResponse({ 
    status: 200, 
    description: 'Service is healthy',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' }
      }
    }
  })
  check() {
    return { status: 'ok' };
  }

  @Get('menu')
  @ApiOperation({ summary: 'Get menu for ElevenLabs integration' })
  async getMenu() {
    return this.menuService.getMenu();
  }

  @Post('order/draft')
  @ApiOperation({ summary: 'Draft order for ElevenLabs integration' })
  async draftOrder(@Body() request: DraftOrderRequest): Promise<DraftOrderResponse> {
    return this.orderService.draftOrder(request);
  }

  @Post('order/commit')
  @ApiOperation({ summary: 'Commit order for ElevenLabs integration' })
  async commitOrder(@Body() request: CommitOrderRequest): Promise<CommitOrderResponse> {
    return this.orderService.commitOrder(request);
  }

  @Post('sms/send')
  @ApiOperation({ summary: 'Send SMS for ElevenLabs integration' })
  async sendSMS(@Body() request: SendSMSRequest): Promise<SendSMSResponse> {
    return this.smsService.sendSMS(request);
  }

  @Post('transcript/intake')
  @ApiOperation({ summary: 'Log transcript for ElevenLabs integration' })
  async intakeTranscript(@Body() request: TranscriptIntakeRequest): Promise<TranscriptIntakeResponse> {
    return this.transcriptService.intakeTranscript(request);
  }

  @Get('admin/metrics')
  @ApiOperation({ summary: 'Get metrics for ElevenLabs integration' })
  async getMetrics(): Promise<MetricsResponse> {
    return this.adminService.getMetrics();
  }
}

