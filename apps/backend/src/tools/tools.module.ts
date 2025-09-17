import { Module } from '@nestjs/common';
import { ToolsController } from './tools.controller';
import { MenuService } from '../menu/menu.service';
import { OrderService } from '../order/order.service';
import { SmsService } from '../sms/sms.service';
import { TranscriptService } from '../transcript/transcript.service';
import { AdminService } from '../admin/admin.service';

@Module({
  controllers: [ToolsController],
  providers: [MenuService, OrderService, SmsService, TranscriptService, AdminService],
})
export class ToolsModule {}

