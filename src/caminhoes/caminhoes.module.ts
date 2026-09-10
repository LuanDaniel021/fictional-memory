import { Module } from '@nestjs/common';
import { CaminhoesService } from './caminhoes.service';
import { CaminhoesController } from './caminhoes.controller';
import { AuthModule } from '../auth.module';
import { SupabaseModule } from '../supabase/supabase.module';
import { CrlvsModule } from '../crlvs/crlvs.module';

@Module({
  imports: [
    SupabaseModule,
    AuthModule,
    CrlvsModule
  ],
  controllers: [CaminhoesController],
  providers: [CaminhoesService],
})
export class CaminhoesModule {}
