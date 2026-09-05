import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SupabaseAuthGuard } from './supabase/supabase.auth.guard';
import { SupabaseStrategy } from './supabase/supabase.strategy';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'supabase' }), SupabaseModule],
  providers: [SupabaseStrategy, SupabaseAuthGuard],
  exports: [PassportModule, SupabaseAuthGuard],
})
export class AuthModule {}