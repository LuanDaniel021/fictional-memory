import { Injectable } from '@nestjs/common';
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

    if ( !data )
    {
        throw error ? error : new Error(`Não foi possível registrar a condicão.`);
    }

    return data;
  }
  async createWithMedicaoId( id: number, dto: CreateCondicaoDto ): Promise<Condicao>
  {
    // depois eu faco
    return {} as Condicao;
  }
  findAll() {
    return `This action returns all condicoes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} condicoe`;
  }

  update(id: number, updateCondicoeDto: UpdateCondicaoDto) {
    return `This action updates a #${id} condicoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} condicoe`;
  }
}
