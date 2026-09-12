import { Module } from '@nestjs/common';
import { PneusService } from './pneus.service';
import { PneusController } from './pneus.controller';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [PneusController],
  providers: [PneusService],
  exports: [PneusService]
})
export class PneusModule {}
