import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SupabaseModule } from '../supabase/supabase.module';
import { SupabaseAuthModule } from '../supabase/supabase.auth.module';

@Module({
  imports: [SupabaseModule, SupabaseAuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
