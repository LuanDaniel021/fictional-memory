import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthResponse, User } from '@supabase/supabase-js';

@Injectable()
export class UsersService {
  constructor(private readonly supabase: SupabaseService) {}

  async sing_up(dto: CreateUserDto) {
    const { data, error } = await this.supabase.getClient()
      .auth.admin.createUser(
        {
          email: dto.email,
          password: dto.senha,
          user_metadata: {
              nome: dto.nome,
          },
          email_confirm: true,
          role: "Usuario"
        }
      );

    if (error) {
        throw error;
    }

    if (data?.user) {
      this.email_confirm( data.user );
    }

    this.confirm_new_role(data.user.id, "ADM")

    return {
      mensagem: 'Usuário cadastrado com sucesso!',
    };
  }

  async sing_in(dto: LoginUserDto) {
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

  async email_confirm( user : User ) {
    
    // confirmacao desativada

    return {
      mensagem: 'Email de confirmação enviado!',
    }
  }

  async solicit_new_role( user: User, role: string ) {
    const { data, error } = await this.supabase.getClient()
      .from('')
      .insert({})
      .select()
      .single()
    
    if ( error ) {
      throw error;
    }

    if ( !data ) {
      throw Error( "error ao registrar solicitacao" )
    }

    return {
      mensagem: `Solicitação registrada!`,
    }

  }

  async confirm_new_role( id: string, role: string ) {
    const { data, error } = await this.supabase.getClient()
      .auth.admin.updateUserById(
        id, { role }
      );

    if (error) {
      throw error;
    }

    return {
      mensagem: `Usuario ${data.user.user_metadata.nome} atualizado para regra ${role}!`,
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
