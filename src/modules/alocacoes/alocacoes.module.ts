import { Module } from '@nestjs/common';
import { AlocacoesService } from './alocacoes.service';
import { AlocacoesController } from './alocacoes.controller';
import { VeiculosModule } from '../veiculos/veiculos.module';
import { SupabaseModule } from '../../supabase/supabase.module';
import { SupabaseAuthModule } from '../../supabase/supabase.auth.module';
import { SupabaseAuthGuard } from '../../supabase/supabase.auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PneusModule } from '../pneus/pneus.module';

@Module({
  imports:[SupabaseModule, SupabaseAuthModule, VeiculosModule, PneusModule],
  controllers: [AlocacoesController],
  providers: [AlocacoesService, SupabaseAuthGuard, RolesGuard],
})
export class AlocacoesModule {}
