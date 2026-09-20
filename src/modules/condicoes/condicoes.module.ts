import { Module } from '@nestjs/common';
import { CondicoesService } from './condicoes.service';
import { CondicoesController } from './condicoes.controller';
import { SupabaseModule } from '../../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [CondicoesController],
  providers: [CondicoesService],
  exports: [CondicoesService]
})
export class CondicoesModule {}
