import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Caminhao } from '../caminhoes/entities/caminhao.entity';
import { Pneu } from '../pneus/entities/pneu.entity';
import { Manutencao } from '../manutencoes/entities/manutencao.entity';
import { Crlv } from '../crlvs/entities/crlv.entity';
import { Ipva } from '../ipvas/entities/ipva.entity';
import { Viagem } from '../viagens/entities/viagem.entity';

@Injectable()
export class DashboardService {
  constructor( private readonly supabase: SupabaseService) {}
  async findAll() {
    return {
      caminhoes: await this.getCaminhoes(),
      pneus: await this.getPneus(),
      manutencoes: await this.getManutencoes(),
      documentacao: await this.getDocumentacao(),
      viagens: await this.getViagens(),
    };
  }

  async getCaminhoes() {
    const { data, error } = await this.supabase.getClient()
      .from('caminhao')
      .select<string,Caminhao>('*')
    
    if (error) {
      throw error;
    }

    return {
      total: data.length,
      ativos: data.filter((c): c is Caminhao => c.status === 'ativo').length,
      inativos: data.filter((c): c is Caminhao => c.status === 'inativo').length,
    };
  }

  async getPneus() {
    const { data, error } = await this.supabase.getClient()
      .from('pneu')
      .select<string,Pneu>('*')
    
    if (error) {
      throw error;
    }

    return {
      total: data.length,
      alertas: data.filter((p): p is Pneu => p.status === 'alerta').length,
    };
  }

  async getManutencoes() {
    const { data, error } = await this.supabase.getClient()
      .from('manutencao')
      .select<string, Manutencao>('*')
    
    if (error) {
      throw error;
    }

    return {
      pendentes: data.filter((m): m is Manutencao => m.observacoes === 'pendente').length,
      em_andamento: data.filter((m): m is Manutencao => m.observacoes === 'em_andamento').length,
    };
  }

  async getDocumentacao() {
    const { data: crlvs, error: error1 } = await this.supabase.getClient()
      .from('crlv')
      .select<string, Crlv>('*')

    if (error1) {
      throw error1;
    }

    const { data: ipvas, error: error2 } = await this.supabase.getClient()
      .from('ipva')
      .select<string, Ipva>('*')

    if (error2) {
      throw error2;
    }

    return {
      ipvas_pendentes: ipvas.filter((i): i is Ipva => i.status === 'pendente').length,
    };

  }

  async getViagens() {
    const { data, error } = await this.supabase.getClient()
      .from('viagem')
      .select<string, Viagem>('*')

    if (error) {
      throw error;
    }

    return {
      em_andamento: data.filter((v): v is Viagem => v.data_inicio !== null && v.data_fim === null).length,
    };
  }
}
