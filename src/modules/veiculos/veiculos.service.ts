
import { SupabaseService } from "../../supabase/supabase.service";
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateVeiculoDto } from './domains/dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './domains/dto/update-veiculo.dto';

import { CrlvService } from '../crlvs/crlvs.service';
import { PneusService } from '../pneus/pneus.service';
import { Pneu } from "../pneus/entities/pneu.entity";
import { TemplatesService } from "../templates/templates.service";

import { Template } from '../templates/entities/template.entity'
import { Veiculo } from "./domains/entities/veiculo.entity";

@Injectable()
export class VeiculosService {

  private readonly query = '*, crlv: crlvs!inner( * ), alocacoes( * ), template: templates( * )';

  constructor(
    private readonly supabase: SupabaseService,
    private readonly templateService: TemplatesService,
    private readonly crlvService: CrlvService,
    private readonly pneuService: PneusService,
  ) {}

  async create(dto: CreateVeiculoDto): Promise<Veiculo>
  {
    const template = await this.templateService.findOneByName(dto.template);

    const crlv = await this.crlvService.create(dto.crlv);

    const { data: veiculo, error } = await this.supabase.getClient()
      .from('veiculos')
      .insert({
        km: dto.km,
        crlv_id: crlv.id,
        template_id: template.id
      })
      .select<string,Veiculo>(this.query)
      .maybeSingle();

    if (!veiculo) {
      await this.crlvService.removeById(crlv.id);
      throw error ? error : new Error('Erro ao registrar veiculo.');
    }

    return veiculo;
  }

  async findAll(): Promise<Veiculo[]>
  {
    const { data, error } = await this.supabase.getClient()
      .from('veiculos')
      .select<string, Veiculo>(this.query);

    if (error) {
      throw error;
    }

    return data ?? []
  }

  async findOneById(id: string)
  {
    const { data, error } = await this.supabase.getClient()
      .from('veiculos')
      .select(this.query)
      .eq('id', id)
      .maybeSingle();

    if (!data) {
      throw error ? error : new NotFoundException('Veiculo não encontrado');
    }

    return data;
  }

  async findOneByPlate(placa: string): Promise<Veiculo>
  {
    const { data, error } = await this.supabase.getClient()
      .from('veiculos')
      .select<string, Veiculo>(this.query)
      .eq('crlv.placa', placa)
      .maybeSingle();

    if (!data) {
      throw error ? error : new NotFoundException('Veiculo não encontrado');
    }

    return data;
  }

  async update(placa: string, dto: UpdateVeiculoDto): Promise<object>
  {
    const atual = await this.findOneByPlate(placa);

    const { error } = await this.supabase.getClient()
      .from('veiculos')
      .update(dto)
      .eq('crlv_id', atual.crlv.id);

    if (error) {
      throw error;
    }

    return {
      mensagem: 'Veiculo atualizado com sucesso!',
    };
  }

  async remove(placa: string): Promise<object>
  {

    const veiculo = await this.findOneByPlate(placa);

    const { error: e1 } = await this.supabase.getClient()
      .from('alocacoes')
      .delete()
      .eq('veiculo', veiculo.id);

    if (e1) {
      throw e1;
    }

    const { error: e2 } = await this.supabase.getClient()
      .from('veiculos')
      .delete()
      .eq('id', veiculo.id);

    await this.crlvService.removeById(veiculo.crlv.id);

    if (e2) {
      throw e2;
    }

    return {
      mensagem: 'Veiculo removido com sucesso!',
    };
  }

  async instalacao(placa: string, content: { posicao: {}, pneu: Pneu }[]): Promise<void>
  {
    const client = this.supabase.getClient();

    const veiculo = await this.findOneByPlate(placa);

    const template = veiculo.template;

    for (const p of content) {

      const { data: pneu, error: e3 } = await client
        .from('pneus')
        .select()
        .eq('id', p.pneu.id)
        .single()

      if (!pneu) {
        throw e3 ? e3 : new Error('');
      }

      if (template.permite(0, 'E', 0)) {
        throw new Error('');
      }

      const { data: alocacao, error: e4 } = await client
        .from('alocacoes')
        .insert(p)
        .select()
        .single()

      if (!alocacao) {
        throw e4 ? e4 : new Error('');
      }

    }

  }
}