import { Injectable } from '@nestjs/common';
import { CreateCaminhaoDto } from './dto/create-caminhao.dto';
import { UpdateCaminhaoDto } from './dto/update-caminhao.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { Caminhao } from './entities/caminhao.entity';

@Injectable()
export class CaminhoesService {
  constructor( private readonly supabase: SupabaseService ) {}

  async create(dto: CreateCaminhaoDto) {
    const { error } = await this.supabase.getClient()
      .from('caminhao')
      .insert(dto)

    if (error) {
      throw error;
    }

    return {
      mensagem: 'Caminhao cadastrado com sucesso!',
    }
  }

  async findAll() {
    const { data, error } = await this.supabase.getClient()
      .from('caminhao')
      .select(`
        km_atual, status,
        crlv!inner(
          uf, crv, tipo, marca, placa, chassi, modelo,
          especie, renavam, exercicio, ano_modelo, ano_fabricacao
        ),
        motorista(
          nome, cpf, numero_cnh, categoria_cnh
        ),
        pneu(
          marca, status, posicao, sulco_inicial_mm
        )
      `)

    if (error) {
      throw error;
    }

    return {
      mensagem: 'Caminhoes encontrados com sucesso!', data
    }
  }

  async findPlate(plate: string) {
    const { data, error } = await this.supabase.getClient()
      .from('caminhao')
      .select(`
        km_atual, status,
        crlv!inner(
          uf, crv, tipo, marca, placa, chassi, modelo,
          especie, renavam, exercicio, ano_modelo, ano_fabricacao
        ),
        motorista(
          nome, cpf, numero_cnh, categoria_cnh
        ),
        pneu(
          marca, status, posicao, sulco_inicial_mm
        )
      `)
      .eq('crlv.placa', plate)
      .single()

    if (error) {
      throw error;
    }

    return {
      mensagem: 'Caminhao encontrado com sucesso!', data
    }
  }

  async update(id: number, dto: UpdateCaminhaoDto) {
    const { error } = await this.supabase.getClient()
      .from('caminhao')
      .update(dto)
      .eq('id', id)

    if (error) {
      throw error;
    }

    return {
      mensagem: 'Caminhao atualizado com sucesso!'
    }
  }

  async remove(id: number) {
    const { error } = await this.supabase.getClient()
      .from('caminhao')
      .delete()
      .eq('id', id)

    if (error) {
      throw error;
    }

    return {
      mensagem: 'Caminhao removido com sucesso!'
    }
  }
}
