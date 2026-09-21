import { Module } from '@nestjs/common';
import { CondicoesService } from './condicoes.service';
import { CondicoesController } from './condicoes.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { SupabaseAuthModule } from '../../supabase/supabase.auth.module';
import { SupabaseAuthGuard } from '../../supabase/supabase.auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Module({
  imports: [SupabaseModule, SupabaseAuthModule],
  controllers: [CondicoesController],
  providers: [CondicoesService, SupabaseAuthGuard, RolesGuard],
  exports: [CondicoesService]
})
export class CondicoesModule {}
