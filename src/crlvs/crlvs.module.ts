import { Module } from '@nestjs/common';
import { CrlvService } from './crlvs.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { CrlvController } from './crlvs.controller';

@Module({
  imports: [ SupabaseModule ],
  controllers: [CrlvController],
  providers: [CrlvService],
  exports: [CrlvService]
})
export class CrlvsModule {}
