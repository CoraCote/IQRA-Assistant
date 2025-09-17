import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { TranscriptIntakeRequest, TranscriptIntakeResponse } from '@iqra-assistant/shared';

@Injectable()
export class TranscriptService {
  constructor(private supabaseService: SupabaseService) {}

  async intakeTranscript(request: TranscriptIntakeRequest): Promise<TranscriptIntakeResponse> {
    const transcript = {
      ...request,
      created_at: new Date().toISOString(),
    };

    try {
      const savedTranscript = await this.supabaseService.createTranscript(transcript);
      
      return {
        transcript_id: savedTranscript.id,
        status: 'saved',
      };
    } catch (error) {
      console.error('Error saving transcript:', error);
      throw new Error('Failed to save transcript');
    }
  }
}

