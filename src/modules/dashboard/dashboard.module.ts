import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { SupabaseAuthModule } from '../../supabase/supabase.auth.module';
import { SupabaseAuthGuard } from '../../supabase/supabase.auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Module({
  imports: [SupabaseModule, SupabaseAuthModule],
  controllers: [DashboardController],
  providers: [DashboardService, SupabaseAuthGuard, RolesGuard],
})
export class DashboardModule {}
