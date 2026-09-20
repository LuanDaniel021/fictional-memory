import { Module } from '@nestjs/common';
import { AlocacoesService } from './alocacoes.service';
import { AlocacoesController } from './alocacoes.controller';
import { VeiculosModule } from '../veiculos/veiculos.module';
import { SupabaseModule } from '../../supabase/supabase.module';
import { PneusModule } from '../pneus/pneus.module';

@Module({
  imports:[SupabaseModule, VeiculosModule, PneusModule],
  controllers: [AlocacoesController],
  providers: [AlocacoesService],
})
export class AlocacoesModule {}
