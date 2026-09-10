import { Injectable } from '@nestjs/common';
import { CreateCaminhaoDto } from './dto/create-caminhao.dto';
import { UpdateCaminhaoDto } from './dto/update-caminhao.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { CrlvService } from '../crlvs/crlvs.service';
import { PneusService } from '../pneus/pneus.service';

@Injectable()
export class CaminhoesService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly crlvService: CrlvService
  ) {}

  async create(dto: CreateCaminhaoDto) {
    const crlv = await this.crlvService.create(dto.crlv);

    const contains = {
        motorista: dto.motorista_id !== undefined,
        pneus: dto.pneus !== undefined && dto.pneus.length > 0
    }

    const payload: Record<string, any> = {
      km_atual: dto.km_atual,
      crlv_id: crlv.id,
      status: contains.motorista && contains.pneus ? 'Ativo' : 'Inativo',
      motorista_id: contains.motorista ? dto.motorista_id : null,
    };

    const { data: caminhao, error } = await this.supabase.getClient()
      .from('caminhao')
      .insert(payload)
      .select('id')
      .single();

    if (error) {
      throw error;
    }

    if (dto.pneus?.length) {
      const { error: pneusError } = await this.supabase.getClient()
        .from('pneu')
        .update({ caminhao_id: caminhao.id })
        .in('id', dto.pneus);

      if (pneusError) {
        throw pneusError;
      }
    }
    return {
      mensagem: 'Caminhao cadastrado com sucesso!',
    };
  }

  async findAll() {
    const { data, error } = await this.supabase.getClient()
      .from('caminhao')
      .select(`
        *, crlv!inner( * ), motorista( * ), pneu( * )
      `)

    if (error) {
      throw error;
    }

    return {
      mensagem: 'Caminhoes encontrados com sucesso!', data
    }
  }

  async findOneByPlate(placa: string) {
    const { data, error } = await this.supabase.getClient()
      .from('caminhao')
      .select(`
        *, crlv!inner( * ), motorista( * ), pneu( * )
      `)
      .eq('crlv.placa', placa)
      .single()

    if (error) {
      throw error;
    }

    return {
      mensagem: 'Caminhao encontrado com sucesso!', data
    }
  }

  async findOneByPlateWithDriver(placa: string) {
    const { data } = await this.findOneByPlate(placa);

    if (!data) {
      return {
        mensagem: 'O caminhao nao possui Motirista definido!', data: null
      }
    }

    return {
      mensagem: 'Motirista encontrado com sucesso!', data: data.motorista
    }
  }

  async findOneByPlateWithPneus(placa: string) {
    const { data } = await this.findOneByPlate(placa);
    return {
      mensagem: data.pneu?.length === 0 ? 'O caminhao nao possui Pneus definidos!' : 'Pneus encontrados com sucesso!',
      data: data.pneu
    }
  }

  async findOneByPlateWithPneuById(placa: string, id : number) {
    const { mensagem, data } = await this.findOneByPlateWithPneus(placa);

    if (data.length === 0) {
      return {
        mensagem,
        data: null
      };
    }

    const pneu = data.find((p: any) => p.id === id);

    if (!pneu) {
      return {
        mensagem: 'Pneu nao encontrado para o caminhao informado!',
        data: null
      };
    }

    return {
      mensagem: 'Pneu encontrado com sucesso!', data: pneu
    }
  }

  async update(placa: string, dto: UpdateCaminhaoDto) {
    const crlv = await this.crlvService.findOneByPlate(placa);
    const { error } = await this.supabase.getClient()
      .from('caminhao')
      .update(dto)
      .eq('crlv_id', crlv.id)

    if (error) {
      throw error;
    }

    return {
      mensagem: 'Caminhao atualizado com sucesso!'
    }
  }

  async remove(placa: string) {
    const crlv = await this.crlvService.findOneByPlate(placa);
    const { error } = await this.supabase.getClient()
      .from('caminhao')
      .delete()
      .eq('crlv_id', crlv.id)

    await this.crlvService.remove(crlv.id);

    if (error) {
      throw error;
    }

    return {
      mensagem: 'Caminhao removido com sucesso!'
    }
  }
}
