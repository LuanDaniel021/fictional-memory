import { Module } from '@nestjs/common';
import { MedicoesService } from './medicoes.service';
import { MedicoesController } from './medicoes.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { SupabaseAuthModule } from '../../supabase/supabase.auth.module';
import { SupabaseAuthGuard } from '../../supabase/supabase.auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PneusModule } from '../pneus/pneus.module';
import { CondicoesModule } from '../condicoes/condicoes.module';

@Module({
  imports: [SupabaseModule, SupabaseAuthModule, PneusModule, CondicoesModule],
  controllers: [MedicoesController],
  providers: [MedicoesService, SupabaseAuthGuard, RolesGuard],
})
export class MedicoesModule {}
