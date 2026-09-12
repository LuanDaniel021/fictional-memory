import { Module } from '@nestjs/common';
import { ManutencoesService } from './manutencoes.service';
import { ManutencoesController } from './manutencoes.controller';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [ManutencoesController],
  providers: [ManutencoesService],
  exports: [ManutencoesService],
})
export class ManutencoesModule {}
