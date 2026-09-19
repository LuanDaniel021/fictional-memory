import { Module } from '@nestjs/common';
import { PneusService } from './pneus.service';
import { PneusController } from './pneus.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { MedicoesController } from '../medicoes/medicoes.controller';
import { MedicoesService } from '../medicoes/medicoes.service';

@Module({
  imports: [SupabaseModule],
  controllers: [
    PneusController,
    MedicoesController
  ],
  providers: [
    PneusService,
    MedicoesService
  ],
  exports: [PneusService]
})
export class PneusModule {}
