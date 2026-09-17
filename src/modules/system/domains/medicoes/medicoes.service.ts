
import { Injectable, NotFoundException } from '@nestjs/common';

import { SupabaseService } from '../../../../supabase/supabase.service';

import { Calculo, Inicial, Final } from './calculo/calculo.service'

export class MDTO {
    constructor(
        readonly pneu: { id: number },
        readonly km: number,
        readonly psi: number,
        readonly sulco: number
    ) {}
}

@Injectable()
export class MedicoesService {

    constructor(private readonly supabase: SupabaseService) {}

    async medicao( dto: MDTO ): Promise<object>
    {
        const client = this.supabase.getClient();

        const { data: condicao, error: condError } = await client
            .from('condicoes')
            .select('id, pneu, medicoes:medicao (km, sulco)')
            .eq('pneu', dto.pneu.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (condError || !condicao) {
            throw new Error(`Não foi possível carregar o histórico do pneu ID ${dto.pneu.id}.`);
        }

        const inicial = new Inicial(condicao.medicoes[0].km, condicao.medicoes[0].sulco);
        const final = new Final(dto.km, dto.sulco);
        const calculo = new Calculo(inicial, final);

        const pctDesgaste = calculo.porcentual();

        const result = {
            taxa: calculo.taxa(),
            desgaste: calculo.desgaste(),
            distancia: calculo.distancia(),
            porcentual: pctDesgaste
        };

        const { data: medicao, error: medError } = await client
            .from('medicoes')
            .insert({
                km: dto.km,
                sulco: dto.sulco,
                pressao: dto.psi
            })
            .select('id')
            .single();

        if (medError || !medicao) {
            throw new Error(`Erro ao inserir medição: ${medError?.message}`);
        }

        const estado = pctDesgaste <= 30 ? 'Bom' : pctDesgaste <= 70 ? 'Alerta' : 'Ruim';

        const { error: condInsertError } = await client
            .from('condicoes')
            .insert({
                pneu_id: dto.pneu.id,
                estado: estado,
                medicao_id: medicao.id,
                km: dto.km,
                sulco: dto.sulco
            });

        if (condInsertError) {
            throw new Error(`Erro ao registrar condição: ${condInsertError.message}`);
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