import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCaminhaoDto } from './dto/create-caminhao.dto';
import { UpdateCaminhaoDto } from './dto/update-caminhao.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { CrlvService } from '../crlvs/crlvs.service';

@Injectable()
export class CaminhoesService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly crlvService: CrlvService,
  ) {}

  private calculaStatus(motoristaId?: number | null, pneus?: number[] | null): string {
    const possuiMotorista = motoristaId !== undefined && motoristaId !== null;
    const possuiPneus = Array.isArray(pneus) && pneus.length > 0;

    return possuiMotorista && possuiPneus ? 'Ativo' : 'Inativo';
  }

  async create(dto: CreateCaminhaoDto) {
    const crlv = await this.crlvService.create(dto.crlv);
    const status = this.calculaStatus(dto.motorista_id, dto.pneus);

    const payload: Record<string, any> = {
      km_atual: dto.km_atual,
      crlv_id: crlv.id,
      status,
      motorista_id: dto.motorista_id ?? null,
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
      `);

    if (error) {
      throw error;
    }

    return {
      mensagem: 'Caminhoes encontrados com sucesso!',
      data,
    };
  }

  async findOneByPlate(placa: string) {
    const { data, error } = await this.supabase.getClient()
      .from('caminhao')
      .select(`
        *, crlv!inner( * ), motorista( * ), pneu( * )
      `)
      .eq('crlv.placa', placa)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      throw new NotFoundException('Caminhao não encontrado');
    }

    return {
      mensagem: 'Caminhao encontrado com sucesso!',
      data,
    };
  }

  async findOneByPlateWithDriver(placa: string) {
    const { data } = await this.findOneByPlate(placa);
    const motorista = data?.motorista ?? null;

    if (!motorista) {
      return {
        mensagem: 'O caminhao nao possui Motorista definido!',
        data: null,
      };
    }

    return {
      mensagem: 'Motorista encontrado com sucesso!',
      data: motorista,
    };
  }

  async findOneByPlateWithPneus(placa: string) {
    const { data } = await this.findOneByPlate(placa);
    const pneus = Array.isArray(data?.pneu) ? data.pneu : [];

    return {
      mensagem: pneus.length === 0 ? 'O caminhao nao possui Pneus definidos!' : 'Pneus encontrados com sucesso!',
      data: pneus,
    };
  }

  async findOneByPlateWithPneuById(placa: string, id: number) {
    const { mensagem, data } = await this.findOneByPlateWithPneus(placa);
    const pneus = Array.isArray(data) ? data : [];

    if (pneus.length === 0) {
      return {
        mensagem,
        data: null,
      };
    }

    const pneu = pneus.find((p: any) => p.id === id);

    if (!pneu) {
      return {
        mensagem: 'Pneu nao encontrado para o caminhao informado!',
        data: null,
      };
    }

    return {
      mensagem: 'Pneu encontrado com sucesso!',
      data: pneu,
    };
  }

  async update(placa: string, dto: UpdateCaminhaoDto) {
    const atual = await this.findOneByPlate(placa);
    const pneusAtuais = Array.isArray(atual.data.pneu)
      ? atual.data.pneu.map((p: any) => p.id)
      : [];

    const status = this.calculaStatus(
      dto.motorista_id ?? atual.data.motorista?.id ?? null,
      pneusAtuais,
    );

    const { error } = await this.supabase.getClient()
      .from('caminhao')
      .update({ ...dto, status })
      .eq('crlv_id', atual.data.crlv_id);

    if (error) {
      throw error;
    }

    return {
      mensagem: 'Caminhao atualizado com sucesso!',
    };
  }

  async remove(placa: string) {
    const crlv = await this.crlvService.findOneByPlate(placa);
    const { error } = await this.supabase.getClient()
      .from('caminhao')
      .delete()
      .eq('crlv_id', crlv.id);

    await this.crlvService.remove(crlv.id);

    if (error) {
      throw error;
    }

    return {
      mensagem: 'Caminhao removido com sucesso!',
    };
  }
}
