import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly supabase: SupabaseService) {}

  async create(dto: CreateUserDto) {
    const client = this.supabase.getClient();
    const { error } = await client.auth.signUp({
      email: dto.email,
      password: dto.password,
      options: {
        data: {
          nome: dto.nome,
        },
      },
    });
    if (error) {
        throw error;
    }
    return {
      mensagem: 'Usuário cadastrado com sucesso!',
    };
  }

  async login(dto: LoginUserDto) {
    const { email, password } = dto;
    const client = this.supabase.getClient();
    const { data, error } = await client.auth.signInWithPassword({email, password});
    if (error) {
        throw error;
    }
    return {
      mensagem: 'Login efetuado com sucesso!',
      access_token: data.session.access_token
    };
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
    return {
      mensagem: 'Perfil atualizado com sucesso!',
    };
  }

  async remove(id: string) {
    const client = this.supabase.getClient();
    const { error } = await client.auth.admin.deleteUser(id)
    if (error) {
        throw error;
    }
    return { mensagem: 'Usuário removido com sucesso!' };
  }
}
