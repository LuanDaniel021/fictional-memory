import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {

  private readonly client: SupabaseClient;
  private readonly authClient: SupabaseClient;

  constructor(private configService: ConfigService) {

    const url = this.configService.get<string>('SUPABASE_URL');
    const key = this.configService.get<string>('SUPABASE_SECRET_KEY');

    if (!url || !key) {
      throw new Error(
        'SUPABASE_URL e SUPABASE_SECRET_KEY precisam ser definidos no .env',
      );
    }

    // Cliente administrativo.
    // Nunca deve armazenar sessão de usuário.
    this.client = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });

    // Cliente exclusivo para autenticação.
    this.authClient = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
  }

  getClient(): SupabaseClient {
    return this.client;
  }

  getAuthClient(): SupabaseClient {
    return this.authClient;
  }
}