import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class UsersService {
  constructor(private readonly supabase: SupabaseService) {}

  async login(email: string, password: string) {
    const client = this.supabase.getClient();
    const { data, error } = await client.auth.signInWithPassword({email, password});

    if (error) {
        throw error;
    }

    return {
      "access-token": data.session.access_token
    };
  }

  async create(dto: CreateUserDto) {
    const client = this.supabase.getClient();
    const { error } = await client.auth.admin.createUser({
      email: dto.email,
      password: dto.password,
      email_confirm: true,
      user_metadata: {
        nome: dto.nome,
      },
    });

    if (error) {
        throw error;
    }

    return 'success create users';
  }

  async update(id: string, dto: UpdateUserDto) {
    const client = this.supabase.getClient();
    const { error } = await client.auth.admin.updateUserById(id, {
      email: dto.email,
      password: dto.password,
      email_confirm: true,
      user_metadata: {
        nome: dto.nome,
      }
    });

    if (error) {
        throw error;
    }

    return `success update a user`;
  }

  async remove(id: string) {
    const client = this.supabase.getClient();
    const { error } = await client.auth.admin.deleteUser(id)
    if (error) {
        throw error;
    }
    return `success remove user`;
  }
}
