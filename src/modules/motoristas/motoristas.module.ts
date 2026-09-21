import { Module } from '@nestjs/common';
import { MotoristasService } from './motoristas.service';
import { MotoristasController } from './motoristas.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { SupabaseAuthModule } from '../../supabase/supabase.auth.module';
import { SupabaseAuthGuard } from '../../supabase/supabase.auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';


@Module({
  imports: [SupabaseModule, SupabaseAuthModule],
  controllers: [MotoristasController],
  providers: [MotoristasService, SupabaseAuthGuard, RolesGuard],
})
export class MotoristasModule {}
