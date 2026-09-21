import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCondicaoDto } from './dto/create-condicao.dto';
import { UpdateCondicaoDto } from './dto/update-condicao.dto';
import { SupabaseService } from '../../supabase/supabase.service';
import { Medicao } from '../medicoes/entities/medicao.entity';
import { Condicao } from './entities/condicao.entity';

@Injectable()
export class CondicoesService {

  constructor(
    private readonly supabase: SupabaseService
  ) {}

  async createWithMedicao( medicao: Medicao, dto: CreateCondicaoDto ): Promise<Condicao>
  {
    const estado = dto.porcentual <= 30 ? 'Bom' : dto.porcentual <= 70 ? 'Alerta' : 'Ruim';

    const { data, error} = await this.supabase.getClient()
        .from('condicoes')
        .insert({
          medicao: medicao.id,  
          estado: estado,
        })
        .select()
        .maybeSingle()

    if (error || !data)
    {
        throw new InternalServerErrorException(
          error?.message ?? 'Não foi possível registrar a condição.',
        );
    }

    return data;
  }
  async createWithMedicaoId( id: number, dto: CreateCondicaoDto ): Promise<Condicao>
  {
    const { data: medicao, error } = await this.supabase.getClient()
      .from('medicoes')
      .select('id')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(`Erro ao buscar medição: ${error.message}`);
    }

    if (!medicao) {
      throw new NotFoundException('Medição de pneu não encontrada');
    }

    return this.createWithMedicao(medicao as Medicao, dto);
  }

  async findAll(medicaoId: number): Promise<Condicao[]> {
    const { data, error } = await this.supabase.getClient()
      .from('condicoes')
      .select('*')
      .eq('medicao', medicaoId);

    if (error) {
      throw new InternalServerErrorException(`Erro ao buscar condições: ${error.message}`);
    }

    return data ?? [];
  }

  async findOne(id: number): Promise<Condicao> {
    const { data, error } = await this.supabase.getClient()
      .from('condicoes')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(`Erro ao buscar condição: ${error.message}`);
    }

    if (!data) {
      throw new NotFoundException('Condição não encontrada');
    }

    return data;
  }

  async update(id: number, updateCondicoeDto: UpdateCondicaoDto): Promise<Condicao> {
    const update = updateCondicoeDto.porcentual === undefined
      ? updateCondicoeDto
      : {
          ...updateCondicoeDto,
          estado: updateCondicoeDto.porcentual <= 30
            ? 'Bom'
            : updateCondicoeDto.porcentual <= 70
              ? 'Alerta'
              : 'Ruim',
        };

    const { data, error } = await this.supabase.getClient()
      .from('condicoes')
      .update(update)
      .eq('id', id)
      .select('*')
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(`Erro ao atualizar condição: ${error.message}`);
    }

    if (!data) {
      throw new NotFoundException('Condição não encontrada');
    }

    return data;
  }

  async remove(id: number): Promise<void> {
    const { data, error } = await this.supabase.getClient()
      .from('condicoes')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(`Erro ao remover condição: ${error.message}`);
    }

    if (!data) {
      throw new NotFoundException('Condição não encontrada');
    }
  }
}
