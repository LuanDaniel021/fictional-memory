import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SupabaseAuthGuard } from './supabase.auth.guard';
import { SupabaseStrategy } from './supabase.strategy';
import { SupabaseModule } from './supabase.module';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'supabase' }),SupabaseModule],
  providers: [SupabaseStrategy, SupabaseAuthGuard],
  exports: [PassportModule, SupabaseAuthGuard],
})
export class SupabaseAuthModule {}