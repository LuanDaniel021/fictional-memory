import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SupabaseService } from '../../supabase/supabase.service';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '@supabase/supabase-js';

@Injectable()
export class UsersService {
  constructor(private readonly supabase: SupabaseService) {}

  async singup(dto: CreateUserDto) {
    const { data, error } = await this.supabase.getClient()
      .auth.admin.createUser(
        {
          email: dto.email,
          password: dto.senha,
          user_metadata: {
            nome: dto.nome,
          },
          app_metadata: {
            role: 'User',
          },
          email_confirm: true,
        }
      );

    if (error) {
        throw error;
    }

    if (data?.user) {
      this.email_confirm( data.user );
    }

    return {
      mensagem: 'Usuário cadastrado com sucesso!',
    };
  }

  async singin(dto: LoginUserDto) {
    const { data, error } = await this.supabase.getClient()
      .auth.signInWithPassword(
        {
          email: dto.email,
          password: dto.senha
        }
      );

    if (error) {
        throw error;
    }

    return {
      mensagem: 'Login efetuado com sucesso!',
      session: {
        refresh_token: data.session.refresh_token,
        access_token: data.session.access_token,
        expires_in: data.session.expires_in,
        expires_at: data.session.expires_at,
        token_type: data.session.token_type
      }
    };
  }

  async info(user: User) {
    const nome = user.user_metadata?.nome ?? user.user_metadata?.full_name ?? null;
    const role = user.app_metadata?.role ?? user.role ?? null;

    return {
      mensagem: 'Dados do usuário consultados com sucesso!',
      data: {
        id: user.id,
        email: user.email,
        nome,
        role,
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at,
      },
    };
  }

  async email_confirm( user : User ) {
    
    // confirmacao desativada

    return {
      mensagem: 'Email de confirmação enviado!',
    }
  }

  async update(user: User, dto: UpdateUserDto) {
    const { data, error } = await this.supabase.getClient()
      .auth.admin.updateUserById(
        user.id, {
          email: dto.email,
          password: dto.senha,
          email_confirm: true,
          user_metadata: {
            nome: dto.nome,
          }
        }
      );

    if (error) {
        throw error;
    }

    return {
      mensagem: 'Perfil atualizado com sucesso!',
    };
  }

  async remove(user: User) {
    const { error } = await this.supabase.getClient()
      .auth.admin.deleteUser(user.id)

    if (error) {
        throw error;
    }

    return { mensagem: 'Usuário removido com sucesso!' };
  }
}
