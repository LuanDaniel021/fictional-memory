import { Module } from '@nestjs/common';
import { MedicaoPneusService } from './medicao_pneus.service';
import { MedicaoPneusController } from './medicao_pneus.controller';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [MedicaoPneusController],
  providers: [MedicaoPneusService],
})
export class MedicaoPneusModule {}
