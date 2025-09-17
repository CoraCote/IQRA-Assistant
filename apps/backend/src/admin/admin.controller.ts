import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { MetricsResponse } from '@iqra-assistant/shared';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('metrics')
  @ApiOperation({ summary: 'Get basic metrics and counts' })
  @ApiResponse({ 
    status: 200, 
    description: 'Metrics retrieved successfully'
  })
  async getMetrics(): Promise<MetricsResponse> {
    return this.adminService.getMetrics();
  }
}

