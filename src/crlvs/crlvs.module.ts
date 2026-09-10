import { Module } from '@nestjs/common';
import { CrlvService } from './crlvs.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [ SupabaseModule ],
  providers: [CrlvService],
  exports: [CrlvService]
})
export class CrlvsModule {}
