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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseAuthModule,
    UsersModule,
    SupabaseModule,
    DashboardModule,
    CaminhoesModule,
    MotoristasModule,
    PneusModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
