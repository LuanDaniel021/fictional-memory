import { Module } from '@nestjs/common';
import { MedicoesService } from './medicoes.service';
import { MedicoesController } from './medicoes.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { PneusModule } from '../pneus/pneus.module';

@Module({
  imports: [SupabaseModule, PneusModule],
  controllers: [MedicoesController],
  providers: [MedicoesService],
})
export class MedicoesModule {}
