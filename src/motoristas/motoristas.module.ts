
import { Module } from '@nestjs/common';
import { MotoristasService } from './motoristas.service';
import { MotoristasController } from './motoristas.controller';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [MotoristasController],
  providers: [MotoristasService],
  exports: [MotoristasService]
})
export class MotoristasModule {}
