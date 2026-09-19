
import { Injectable, NotFoundException } from '@nestjs/common';

import { SupabaseService } from '../../supabase/supabase.service';
import { CreateMedicaoDto } from './domains/dto/create-medicoes.dto';
import { PneusService } from '../pneus/pneus.service';

import { Calculo } from './domains/dto/calculo-medicoes.service'

@Injectable()
export class MedicoesService {

    constructor(
        private readonly supabase : SupabaseService,
        private readonly pneus    : PneusService
    ) {}

    async create( pid: string, compare: 'anterior' | 'periodo', atual: CreateMedicaoDto ): Promise<object>
    {
        const client = this.supabase.getClient();

        await this.pneus.findOneById( pid );

        let calculo;

        if ( compare === 'anterior') 
        {
            const { data: anterior, error: e1 } = await client
                .from('medicoes')
                .select('km, sulco, pressao')
                .eq('pneu', pid)
                .order('km', { ascending: false })
                .limit(1)
                .single();

            if ( !anterior )
            {
                throw e1 ? e1 : new NotFoundException(`Não foi possível encontrar a ultima medicão.`);
            }
            calculo = new Calculo(atual, anterior);        
        }

        else
        {
            const { data: periodo, error: e1 } = await client
                .from('manutencoes')
                .select<string,CreateMedicaoDto>('saida')
                .eq('pneu', pid)
                .limit(1)
                .single();

            if ( !periodo )
            {
                throw e1 ? e1 : new NotFoundException(`Não foi possível encontrar a ultima medicão.`);
            }

            calculo = new Calculo(atual, periodo);
        }

        const result = {
            taxa       : calculo.taxa(),
            desgaste   : calculo.desgaste(),
            distancia  : calculo.distancia(),
            porcentual : calculo.porcentual()
        };

        const { data: medicao, error: e2 } = await client
            .from('medicoes')
            .insert({
                km: atual.km,
                sulco: atual.sulco,
                pressao: atual.pressao
            })
            .select('id')
            .single();

        if ( !medicao )
        {
            throw e2 ? e2 : new Error(`Não foi possível registrar a medicão.`);
        }

        const estado = result.porcentual <= 30 ? 'Bom' : result.porcentual <= 70 ? 'Alerta' : 'Ruim';

        const { data: condicao, error: e3 } = await client
            .from('condicoes')
            .insert({
                estado: estado,
                medicao: medicao.id,
                km: atual.km,
                sulco: atual.sulco
            })
            .select()
            .single()

        if ( !condicao )
        {
            throw e3 ? e3 : new Error(`Não foi possível registrar a condicão.`);
        }

        return result;
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
            .from('medicao_pneu')
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
            .from('medicao_pneu')
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
            .from('medicao_pneu')
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