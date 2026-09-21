import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { SupabaseModule } from '../../../supabase/supabase.module';
import { SupabaseAuthModule } from '../../../supabase/supabase.auth.module';
import { SupabaseAuthGuard } from '../../../supabase/supabase.auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';

@Module({
  imports: [SupabaseModule, SupabaseAuthModule],
  controllers: [AdminController],
  providers: [AdminService, SupabaseAuthGuard, RolesGuard],
  exports: [AdminService],
})
export class AdminModule {}
