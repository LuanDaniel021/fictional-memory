import { Module } from '@nestjs/common';
import { ViagensService } from './viagens.service';
import { ViagensController } from './viagens.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { SupabaseAuthModule } from '../../supabase/supabase.auth.module';
import { SupabaseAuthGuard } from '../../supabase/supabase.auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Module({
  imports: [SupabaseModule, SupabaseAuthModule],
  controllers: [ViagensController],
  providers: [ViagensService, SupabaseAuthGuard, RolesGuard],
})
export class ViagensModule {}
