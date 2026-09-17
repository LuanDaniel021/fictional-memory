import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { SupabaseModule } from '../../../supabase/supabase.module';
import { SupabaseAuthModule } from '../../../supabase/supabase.auth.module';

@Module({
  imports: [SupabaseModule, SupabaseAuthModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
