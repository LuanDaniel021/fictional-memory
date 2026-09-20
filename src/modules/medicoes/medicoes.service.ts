
import { Injectable, NotFoundException } from '@nestjs/common';

import { SupabaseService } from '../../supabase/supabase.service';
import { CreateMedicaoDto } from './dto/create-medicao.dto';
import { Medicao } from './entities/medicao.entity';
import { PneusService } from '../pneus/pneus.service';

import { Calculo } from './calculo-medicoes'
import { CondicoesService } from '../condicoes/condicoes.service';

@Injectable()
export class MedicoesService {

    constructor(
        private readonly supabase: SupabaseService,
        private readonly pneusService: PneusService,
        private readonly condicoesService: CondicoesService,
    ) {} 

    async me( pid: number ): Promise<object>
    {
        const client = this.supabase.getClient();

        await this.pneusService.findOneById( pid );

        const { data, error } = await this.supabase.getClient()
        .from('medicoes')
        .select()
        .order('km', {ascending: false})
        .limit(2)

        if ( !data ) {
            throw error ? error : new Error('Error interno');
        }

        if (data.length < 2) {
            new Error('Dados insuficientes');
        }

        const atual = data[0];

        const anterior = data[1];
            
        const calculo = new Calculo(atual, anterior);

        const result = {
            taxa       : calculo.taxa(),
            desgaste   : calculo.desgaste(),
            distancia  : calculo.distancia(),
            porcentual : calculo.porcentual()
        };

        await this.condicoesService.createWithMedicao( atual, result );

        return result;
    }

    async create( pid: number, dto: CreateMedicaoDto ): Promise<Medicao>
    {
        await this.pneusService.findOneById( pid );

        const { data, error } = await this.supabase.getClient()
            .from('medicoes')
            .insert({
                pneu: pid,
                km: dto.km,
                sulco: dto.sulco,
                pressao: dto.pressao
            })
            .select('*')
            .maybeSingle();

        if ( !data )
        {
            throw error ? error : new Error(`Não foi possível registrar a medicão.`);
        }

        return data;
    }

    async findAll(): Promise<object[]>
    {
        const { data, error } = await this.supabase.getClient()
            .from('medicoes')
            .select('*');

        if (error) {
            throw error;
        }

        return data ?? [];
    }

    async findOneById(id: string): Promise<object>
    {
        const { data, error } = await this.supabase.getClient()
            .from('medicoes')
            .select('*')
            .eq('id', id)
            .maybeSingle();

        if (error) {
            throw error;
        }

        if (!data) {
            throw new NotFoundException('Medição de pneu não encontrada');
        }

        return data;
    }

    async update(id: number, dto: object): Promise<object>
    {
        const { data, error } = await this.supabase.getClient()
            .from('medicoes')
            .update(dto)
            .eq('id', id)
            .select('*')
            .maybeSingle();
  
        if (error) {
            throw error;
        }

        if (!data) {
            throw new NotFoundException('Medição de pneu não encontrada');
        }

        return data;
    }

    async remove(id: number): Promise<void>
    {
        const { data, error } = await this.supabase.getClient()
            .from('medicoes')
            .delete()
            .eq('id', id)
            .select('id')
            .maybeSingle();

        if (error) {
            throw error;
        }

        if (!data) {
            throw new NotFoundException('Medição de pneu não encontrada');
        }
    }

}