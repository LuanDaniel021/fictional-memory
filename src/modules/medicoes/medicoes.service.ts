import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { SupabaseService } from '../../supabase/supabase.service';
import { CreateMedicaoDto } from './dto/create-medicao.dto';
import { Medicao } from './entities/medicao.entity';
import { PneusService } from '../pneus/pneus.service';

import { Calculo } from './calculo-medicoes';
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
        await this.pneusService.findOneById( pid );

        const { data, error } = await this.supabase.getClient()
        .from('medicoes')
        .select()
        .eq('pneu', pid)
        .order('km', {ascending: false})
        .limit(2);

        if (error) {
            throw new InternalServerErrorException(`Erro ao buscar medições: ${error.message}`);
        }

        if (data.length < 2) {
            throw new BadRequestException('São necessárias pelo menos duas medições do pneu para calcular.');
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

    /**
     * Calcula as métricas selecionando duas medições específicas do mesmo pneu por ID.
     */
    async calcularEntreDuasMedicoes( pid: number, medicaoId1: number, medicaoId2: number ): Promise<object>
    {
        await this.pneusService.findOneById( pid );

        if (medicaoId1 === medicaoId2) {
            throw new BadRequestException('Selecione duas medições diferentes.');
        }

        const { data, error } = await this.supabase.getClient()
            .from('medicoes')
            .select('*')
            .eq('pneu', pid)
            .in('id', [medicaoId1, medicaoId2]);

        if (error) {
            throw new InternalServerErrorException(`Erro ao buscar medições selecionadas: ${error.message}`);
        }

        if (!data || data.length < 2) {
            throw new NotFoundException('Uma ou ambas as medições selecionadas não foram encontradas para este pneu.');
        }

        // Ordena por KM decrescente para garantir que data[0] é a mais recente
        data.sort((a, b) => b.km - a.km);

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
            throw new InternalServerErrorException(
                error?.message ?? 'Não foi possível registrar a medição.',
            );
        }

        return data;
    }

    async findAll(pid: number): Promise<object[]>
    {
        const { data, error } = await this.supabase.getClient()
            .from('medicoes')
            .select('*')
            .eq('pneu', pid)
            .order('km', { ascending: false });

        if (error) {
            throw new InternalServerErrorException(`Erro ao buscar medições: ${error.message}`);
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
