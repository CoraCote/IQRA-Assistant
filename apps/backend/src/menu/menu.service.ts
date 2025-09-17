import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { MenuItem, MenuModifier } from '@iqra-assistant/shared';

@Injectable()
export class MenuService {
  constructor(private supabaseService: SupabaseService) {}

  async getMenu(): Promise<{ items: MenuItem[]; modifiers: MenuModifier[] }> {
    const [items, modifiers] = await Promise.all([
      this.supabaseService.getMenuItems(),
      this.supabaseService.getMenuModifiers(),
    ]);

    return { items, modifiers };
  }
}

