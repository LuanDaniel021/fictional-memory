import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@supabase/supabase-js';
import { SupabaseService } from '../../../supabase/supabase.service';

@Injectable()
export class AdminService {
  constructor(private readonly supabase: SupabaseService) {}

  async create(payload: { email: string; senha: string; nome?: string; role?: string }) {
    const normalizedRole = (payload.role ?? 'User').toString();

    const { data, error } = await this.supabase.getClient().auth.admin.createUser({
      email: payload.email,
      password: payload.senha,
      user_metadata: {
        nome: payload.nome ?? '',
      },
      app_metadata: {
        role: normalizedRole,
      },
      email_confirm: true,
    });

    if (error) {
      throw error;
    }

    return {
      mensagem: 'Usuário criado com sucesso!',
      data: data?.user ? this.mapUser(data.user) : null,
    };
  }

  async findAll() {
    const { data, error } = await this.supabase.getClient().auth.admin.listUsers();

    if (error) {
      throw error;
    }

    return {
      mensagem: 'Usuários consultados com sucesso!',
      data: (data?.users ?? []).map((user) => this.mapUser(user)),
    };
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase.getClient().auth.admin.getUserById(id);

    if (error) {
      throw error;
    }

    if (!data?.user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return {
      mensagem: 'Usuário encontrado com sucesso!',
      data: this.mapUser(data.user),
    };
  }

  async update(id: string, payload: { email?: string; senha?: string; nome?: string; role?: string }, currentAdmin?: User) {
    const { data: currentUserData, error: currentUserError } = await this.supabase.getClient().auth.admin.getUserById(id);

    if (currentUserError) {
      throw currentUserError;
    }

    if (currentAdmin && currentAdmin.id === id) {
      if (payload.role || payload.email || payload.senha || payload.nome) {
        throw new ForbiddenException('Você não pode operar sobre o próprio usuário pela rota administrativa.');
      }
    }

    const appMetadata = {
      ...(currentUserData?.user?.app_metadata ?? {}),
      ...(payload.role ? { role: payload.role } : {}),
    };

    const { data, error } = await this.supabase.getClient().auth.admin.updateUserById(id, {
      email: payload.email,
      password: payload.senha,
      email_confirm: true,
      user_metadata: {
        ...(currentUserData?.user?.user_metadata ?? {}),
        ...(payload.nome ? { nome: payload.nome } : {}),
      },
      app_metadata: appMetadata,
    });

    if (error) {
      throw error;
    }

    return {
      mensagem: 'Usuário atualizado com sucesso!',
      data: this.mapUser(data.user),
    };
  }

  async remove(id: string, currentAdmin?: User) {
    if (currentAdmin && currentAdmin.id === id) {
      throw new ForbiddenException('Você não pode remover o próprio usuário pela rota administrativa.');
    }

    const { error } = await this.supabase.getClient().auth.admin.deleteUser(id);

    if (error) {
      throw error;
    }

    return {
      mensagem: 'Usuário removido com sucesso!',
    };
  }

  private mapUser(user: User) {
    return {
      id: user.id,
      email: user.email,
      nome: user.user_metadata?.nome ?? user.user_metadata?.full_name ?? null,
      role: user.app_metadata?.role ?? user.role ?? null,
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at,
      email_confirmed_at: user.email_confirmed_at ?? null,
    };
  }
}
