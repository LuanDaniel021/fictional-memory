import { Module } from '@nestjs/common';
import { CrlvService } from './crlvs.service';
import { SupabaseModule } from '../../supabase/supabase.module';
import { SupabaseAuthModule } from '../../supabase/supabase.auth.module';
import { SupabaseAuthGuard } from '../../supabase/supabase.auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CrlvController } from './crlvs.controller';

@Module({
  imports: [ SupabaseModule, SupabaseAuthModule ],
  controllers: [CrlvController],
  providers: [CrlvService],
  exports: [CrlvService]
})
export class CrlvsModule {}
