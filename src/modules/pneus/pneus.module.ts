import { Module } from '@nestjs/common';
import { PneusService } from './pneus.service';
import { PneusController } from './pneus.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { SupabaseAuthModule } from '../../supabase/supabase.auth.module';
import { SupabaseAuthGuard } from '../../supabase/supabase.auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Module({
  imports: [SupabaseModule, SupabaseAuthModule],
  controllers: [
    PneusController
  ],
  providers: [PneusService, SupabaseAuthGuard, RolesGuard],
  exports: [PneusService]
})
export class PneusModule {}
