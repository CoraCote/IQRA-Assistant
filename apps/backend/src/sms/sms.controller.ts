import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SmsService } from './sms.service';
import { SendSMSRequest, SendSMSResponse } from '@iqra-assistant/shared';

@ApiTags('sms')
@Controller('sms')
export class SmsController {
  constructor(private smsService: SmsService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send SMS message' })
  @ApiResponse({ 
    status: 201, 
    description: 'SMS sent successfully'
  })
  async sendSMS(@Body() request: SendSMSRequest): Promise<SendSMSResponse> {
    return this.smsService.sendSMS(request);
  }
}

