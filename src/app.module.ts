import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { SupabaseAuthModule } from './supabase/supabase.auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CaminhoesModule } from './caminhoes/caminhoes.module';
import { MotoristasModule } from './motoristas/motoristas.module';
import { PneusModule } from './pneus/pneus.module';
import { IpvasModule } from './ipvas/ipvas.module';
import { ManutencoesModule } from './manutencoes/manutencoes.module';
import { MedicaoPneusModule } from './medicao_pneus/medicao_pneus.module';
import { ViagensModule } from './viagens/viagens.module';
import { CrlvsModule } from './crlvs/crlvs.module';
import { FipeModule } from './fipe/fipe.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseAuthModule,
    UsersModule,
    SupabaseModule,
    DashboardModule,
    CaminhoesModule,
    MotoristasModule,
    PneusModule,
    IpvasModule,
    ManutencoesModule,
    MedicaoPneusModule,
    ViagensModule,
    CrlvsModule,
    FipeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
