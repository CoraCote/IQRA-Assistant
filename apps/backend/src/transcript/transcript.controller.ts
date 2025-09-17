import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TranscriptService } from './transcript.service';
import { TranscriptIntakeRequest, TranscriptIntakeResponse } from '@iqra-assistant/shared';

@ApiTags('transcripts')
@Controller('transcript')
export class TranscriptController {
  constructor(private transcriptService: TranscriptService) {}

  @Post('intake')
  @ApiOperation({ summary: 'Log a conversation transcript' })
  @ApiResponse({ 
    status: 201, 
    description: 'Transcript saved successfully'
  })
  async intakeTranscript(@Body() request: TranscriptIntakeRequest): Promise<TranscriptIntakeResponse> {
    return this.transcriptService.intakeTranscript(request);
  }
}

