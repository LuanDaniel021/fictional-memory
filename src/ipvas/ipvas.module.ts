import { Module } from '@nestjs/common';
import { IpvasService } from './ipvas.service';
import { IpvasController } from './ipvas.controller';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [IpvasController],
  providers: [IpvasService],
  exports: [IpvasService],
})
export class IpvasModule {}
