import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { SupabaseModule }     from './supabase/supabase.module';
import { SupabaseAuthModule } from './supabase/supabase.auth.module';
import { MotoristasModule } from './modules/motoristas/motoristas.module';
import { CondicoesModule } from './modules/condicoes/condicoes.module';
import { TemplatesModule } from './modules/templates/templates.module';

import { DashboardModule }    from './modules/dashboard/dashboard.module';

import { UsersModule }        from './modules/users/users.module';
import { AdminModule }        from './modules/users/admin/admin.module';
import { VeiculosModule }    from './modules/veiculos/veiculos.module';
import { PneusModule }        from './modules/pneus/pneus.module';
import { IpvasModule }        from './modules/ipvas/ipvas.module';
import { ManutencoesModule }  from './modules/manutencoes/manutencoes.module';
import { CrlvsModule }        from './modules/crlvs/crlvs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseAuthModule,
    SupabaseModule,

    UsersModule,
    AdminModule,
    
    DashboardModule,

    VeiculosModule,
    IpvasModule,
    CrlvsModule,
    // Template
    // Motorista

    // Alocacoes

    // ViagensModule,

    PneusModule,
    // medicoes
    // condicoes

    ManutencoesModule,
    MotoristasModule,
    CondicoesModule,
    TemplatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
