import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { SupabaseModule }     from './supabase/supabase.module';
import { SupabaseAuthModule } from './supabase/supabase.auth.module';

import { DashboardModule }    from './modules/system/domains/dashboard/dashboard.module';

import { UsersModule }        from './modules/users/users.module';
import { AdminModule }        from './modules/users/admin/admin.module';
import { CaminhoesModule }    from './modules/system/domains/caminhoes/caminhoes.module';
import { PneusModule }        from './modules/system/domains/pneus/pneus.module';
import { IpvasModule }        from './modules/system/domains/ipvas/ipvas.module';
import { ManutencoesModule }  from './modules/system/domains/manutencoes/manutencoes.module';
import { CrlvsModule }        from './modules/system/domains/crlvs/crlvs.module';
import { FipeModule }         from './modules/system/domains/fipe/fipe.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseAuthModule,
    UsersModule,
    AdminModule,
    SupabaseModule,
    DashboardModule,
    CaminhoesModule,
    PneusModule,
    IpvasModule,
    ManutencoesModule,
    CrlvsModule,
    FipeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
