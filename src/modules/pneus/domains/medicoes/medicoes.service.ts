
import { Injectable, NotFoundException } from '@nestjs/common';

import { SupabaseService } from '../../../../supabase/supabase.service';

import { Calculo } from './calculo/calculo.service'

import { Medicao } from './medicao.interface';

@Injectable()
export class MedicoesService {

    constructor(private readonly supabase: SupabaseService) {}

    async medicao( atual: Medicao & { pneu : { id  : string } } ): Promise<object>
    {
        const client = this.supabase.getClient();

        const { data: pneu, error: e1 } = await client
            .from('pneus')
            .select()
            .eq('id', atual.pneu.id)
            .single();

        if ( !pneu )
        {
           throw e1 ? e1 : new NotFoundException(`Não foi possível encontrar o pneu ID ${atual.pneu.id}.`);
        }

        const { data: anterior, error: e2 } = await client
            .from('medicoes')
            .select('km, sulco, pressao')
            .eq('pneu', atual.pneu.id)
            .order('km', { ascending: false })
            .limit(1)
            .single();

        if ( !anterior )
        {
            throw e2 ? e2 : new NotFoundException(`Não foi possível encontrar a ultima medicão.`);
        }

        const calculo = new Calculo(atual, anterior);

        const result = {
            taxa: calculo.taxa(),
            desgaste: calculo.desgaste(),
            distancia: calculo.distancia(),
            porcentual: calculo.porcentual()
        };

        const { data: medicao, error: e3 } = await client
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
            throw e3 ? e3 : new Error(`Não foi possível registrar a medicão.`);
        }

        const estado = result.porcentual <= 30 ? 'Bom' : result.porcentual <= 70 ? 'Alerta' : 'Ruim';

        const { data: condicao, error: e4 } = await client
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
            throw e4 ? e4 : new Error(`Não foi possível registrar a condicão.`);
        }

        return result;
    }

    async create( dto: object ): Promise<object>
    {
        const { data, error } = await this.supabase.getClient()
            .from('medicoes')
            .insert(dto)
            .select('*')
            .single();

        if (error) {
            throw error;
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

    async findOne(id: number): Promise<object>
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