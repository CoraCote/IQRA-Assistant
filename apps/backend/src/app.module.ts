import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { SmsModule } from './sms/sms.module';
import { TranscriptModule } from './transcript/transcript.module';
import { AdminModule } from './admin/admin.module';
import { ToolsModule } from './tools/tools.module';
import { SupabaseModule } from './supabase/supabase.module';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SupabaseModule,
    OpenaiModule,
    HealthModule,
    MenuModule,
    OrderModule,
    SmsModule,
    TranscriptModule,
    AdminModule,
    ToolsModule,
  ],
})
export class AppModule {}

