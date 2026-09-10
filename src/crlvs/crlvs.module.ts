import { Module } from '@nestjs/common';
import { CrlvService } from './crlvs.service';
import { CrlvController } from './crlvs.controller';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [ SupabaseModule ],
  controllers: [CrlvController],
  providers: [CrlvService],
})
export class CrlvsModule {}
