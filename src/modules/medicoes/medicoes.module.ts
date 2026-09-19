import { Module } from '@nestjs/common';
import { MedicoesService } from './medicoes.service';
import { MedicoesController } from './medicoes.controller';
import { SupabaseModule } from '../../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [MedicoesController],
  providers: [MedicoesService],
})
export class MedicoesModule {}
