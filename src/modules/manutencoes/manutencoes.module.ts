import { Module } from '@nestjs/common';
import { ManutencoesService } from './manutencoes.service';
import { ManutencoesController } from './manutencoes.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { SupabaseAuthModule } from '../../supabase/supabase.auth.module';
import { SupabaseAuthGuard } from '../../supabase/supabase.auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Module({
  imports: [SupabaseModule, SupabaseAuthModule],
  controllers: [ManutencoesController],
  providers: [ManutencoesService, SupabaseAuthGuard, RolesGuard],
  exports: [ManutencoesService],
})
export class ManutencoesModule {}
