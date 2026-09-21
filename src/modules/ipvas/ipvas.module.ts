import { Module } from '@nestjs/common';
import { IpvasService } from './ipvas.service';
import { IpvasController } from './ipvas.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { SupabaseAuthModule } from '../../supabase/supabase.auth.module';
import { SupabaseAuthGuard } from '../../supabase/supabase.auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Module({
  imports: [SupabaseModule, SupabaseAuthModule],
  controllers: [IpvasController],
  providers: [IpvasService, SupabaseAuthGuard, RolesGuard],
  exports: [IpvasService],
})
export class IpvasModule {}
