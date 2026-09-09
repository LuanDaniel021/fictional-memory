import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CaminhoesModule } from './caminhoes/caminhoes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    SupabaseModule,
    DashboardModule,
    CaminhoesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
