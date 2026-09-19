import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { SupabaseModule }     from './supabase/supabase.module';
import { SupabaseAuthModule } from './supabase/supabase.auth.module';
import { MotoristasModule } from './modules/motoristas/motoristas.module';
import { CondicoesModule } from './modules/condicoes/condicoes.module';
import { TemplatesModule } from './modules/templates/templates.module';
import { AlocacoesModule } from './modules/alocacoes/alocacoes.module';
import { ViagensModule } from './modules/viagens/viagens.module';
import { MedicoesModule } from './modules/medicoes/medicoes.module';

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
    TemplatesModule,
    MotoristasModule,

    AlocacoesModule,

    ViagensModule,

    PneusModule,
    MedicoesModule,
    CondicoesModule,

    ManutencoesModule,    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
