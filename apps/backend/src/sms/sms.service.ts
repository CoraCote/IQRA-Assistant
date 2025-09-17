import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendSMSRequest, SendSMSResponse } from '@iqra-assistant/shared';
import * as twilio from 'twilio';

@Injectable()
export class SmsService {
  private twilioClient: twilio.Twilio;

  constructor(private configService: ConfigService) {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    const phoneNumber = this.configService.get<string>('TWILIO_PHONE_NUMBER');

    if (!accountSid || !authToken || !phoneNumber) {
      throw new Error('Missing Twilio configuration');
    }

    this.twilioClient = twilio(accountSid, authToken);
  }

  async sendSMS(request: SendSMSRequest): Promise<SendSMSResponse> {
    const { to, message } = request;
    const from = this.configService.get<string>('TWILIO_PHONE_NUMBER');

    try {
      const result = await this.twilioClient.messages.create({
        body: message,
        from: from!,
        to: to,
      });

      return {
        message_id: result.sid,
        status: result.status,
      };
    } catch (error) {
      console.error('Twilio SMS error:', error);
      throw new Error('Failed to send SMS');
    }
  }

  async sendOrderConfirmation(phoneNumber: string, orderId: string, totalAmount: number): Promise<SendSMSResponse> {
    const message = `Thank you for your order! Order #${orderId} has been confirmed. Total: $${totalAmount.toFixed(2)}. We'll notify you when it's ready!`;
    
    return this.sendSMS({
      to: phoneNumber,
      message,
    });
  }
}

