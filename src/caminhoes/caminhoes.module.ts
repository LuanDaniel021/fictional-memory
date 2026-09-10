import { Module } from '@nestjs/common';
import { CaminhoesService } from './caminhoes.service';
import { CaminhoesController } from './caminhoes.controller';
import { SupabaseAuthModule } from '../supabase/supabase.auth.module';
import { SupabaseModule } from '../supabase/supabase.module';
import { CrlvsModule } from '../crlvs/crlvs.module';
import { MotoristasModule } from '../motoristas/motoristas.module';
import { PneusModule } from '../pneus/pneus.module';

@Module({
  imports: [
    SupabaseModule,
    SupabaseAuthModule,
    CrlvsModule,
    MotoristasModule,
    PneusModule
  ],
  controllers: [CaminhoesController],
  providers: [CaminhoesService],
})
export class CaminhoesModule {}
