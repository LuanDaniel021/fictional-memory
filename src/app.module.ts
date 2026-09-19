import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { SupabaseModule }     from './supabase/supabase.module';
import { SupabaseAuthModule } from './supabase/supabase.auth.module';

import { DashboardModule }    from './modules/system/domains/dashboard/dashboard.module';

import { UsersModule }        from './modules/users/users.module';
import { AdminModule }        from './modules/users/admin/admin.module';
import { VeiculosModule }    from './modules/veiculos/veiculos.module';
import { PneusModule }        from './modules/pneus/pneus.module';
import { IpvasModule }        from './modules/veiculos/domains/ipvas/ipvas.module';
import { ManutencoesModule }  from './modules/system/domains/manutencoes/manutencoes.module';
import { CrlvsModule }        from './modules/veiculos/domains/crlvs/crlvs.module';
import { FipeModule }         from './modules/system/domains/fipe/fipe.module';
import { MedicoesModule } from './modules/pneus/domains/medicoes/medicoes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseAuthModule,
    UsersModule,
    AdminModule,
    SupabaseModule,
    DashboardModule,
    VeiculosModule,
    PneusModule,
    MedicoesModule,
    IpvasModule,
    ManutencoesModule,
    CrlvsModule,
    FipeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
