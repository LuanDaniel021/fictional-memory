
import { SupabaseService } from "../../supabase/supabase.service";
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateVeiculoDto } from './domains/dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './domains/dto/update-veiculo.dto';

import { CrlvService } from '../crlvs/crlvs.service';
import { PneusService } from '../pneus/pneus.service';
import { Template } from "./template.service";
import { Pneu } from "../pneus/entities/pneu.entity";

@Injectable()
export class VeiculosService {

    constructor(
        private readonly supabase: SupabaseService,
        private readonly crlvService: CrlvService,
        private readonly pneuService: PneusService,
    ) {}

    async create(dto: CreateVeiculoDto): Promise<object>
    {

        const crlv = await this.crlvService.create(dto.crlv);

        const payload: Record<string, any> = {
            km_atual: dto.km_atual,
            crlv_id: crlv.id,
            motorista_id: dto.motorista_id ?? null,
        };

        const { data: veiculo, error } = await this.supabase.getClient()
            .from('veiculos')
            .insert(payload)
            .select('id')
            .single();

        if (error) {
            throw error;
        }

        if (dto.pneus?.length) {
            const { error: pneusError } = await this.supabase.getClient()
                .from('pneu')
                .update({ caminhao_id: veiculo.id })
                .in('id', dto.pneus);

            if (pneusError) {
                throw pneusError;
            }
        }

        return veiculo;
    }

    async findAll() {
        const { data, error } = await this.supabase.getClient()
            .from('veiculos')
            .select(`
                *, crlv!inner( * ), motorista( * ), pneu_caminhao( * )
            `);

        if (error) {
            throw error;
        }

        return {
            mensagem: 'Caminhoes encontrados com sucesso!',
            data,
        };
    }

    async findOneById(id: string) {
        const { data, error } = await this.supabase.getClient()
            .from('veiculos')
            .select(`
                *, crlv!inner( * ), motorista( * ), pneu( * )
            `)
            .eq('id', id)
            .maybeSingle();

        if (error) {
            throw error;
        }

        if (!data) {
            throw new NotFoundException('Caminhao não encontrado');
        }

        return data;
    }

    async findOneByPlate(placa: string) {
        const { data, error } = await this.supabase.getClient()
            .from('veiculos')
            .select(`
        *, crlv!inner( * ), motorista( * ), pneu( * )
        `)
            .eq('crlv.placa', placa)
            .maybeSingle();

        if (!data)
        {
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
            .eq('crlv_id', atual.data.crlv_id);

        if (error) {
            throw error;
        }

        return {
            mensagem: 'Caminhao atualizado com sucesso!',
        };
    }

    async remove(placa: string): Promise<object>
    {

        const veiculo = await this.findOneByPlate(placa);

        await this.pneuService.updatePneusCaminhaoId(veiculo.data.pneu, null);

        const { error } = await this.supabase.getClient()
            .from('veiculos')
            .delete()
            .eq('id', veiculo.data.id);

        await this.crlvService.removeById(veiculo.crlv_id);

        if (error) {
            throw error;
        }

        return {
            mensagem: 'Caminhao removido com sucesso!',
        };
    }

    async instalacao(placa : string, content: { posicao: {}, pneu: Pneu }[] ): Promise<void>
    {
        const client = this.supabase.getClient();

        const veiculo = await this.findOneByPlate(placa)

        const template = new Template( veiculo.template.estrutura );

        for ( const p of content )
        {

            const {data: pneu, error: e3 } = await client
                .from('pneus')
                .select()
                .eq('id', p.pneu.id )
                .single()

            if ( !pneu ) {
                throw e3 ? e3 : new Error('');
            }

            if ( template.permite(0, 'E', 0) ) {
                throw new Error('');
            }

            const {data: alocacao, error: e4 } = await client
                .from('alocacoes')
                .insert( p )
                .select()
                .single()
            
            if ( !alocacao ) {
                throw e4 ? e4 : new Error('');
            }

        }

    }
}