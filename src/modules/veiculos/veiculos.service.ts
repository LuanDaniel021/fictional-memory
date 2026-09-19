
import { SupabaseService } from "../../supabase/supabase.service";
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateVeiculoDto } from './domains/dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './domains/dto/update-veiculo.dto';

import { CrlvService } from './domains/crlvs/crlvs.service';
import { PneusService } from '../pneus/pneus.service';
import { Template } from "./domains/templates/template.service";

@Injectable()
export class VeiculosService {

    constructor(
        private readonly supabase: SupabaseService,
        private readonly crlvService: CrlvService,
        private readonly pneuService: PneusService,
    ) { }

    private calculaStatus(motoristaId?: number | null, pneus?: number[] | null): string {
        const possuiMotorista = motoristaId !== undefined && motoristaId !== null;
        const possuiPneus = Array.isArray(pneus) && pneus.length > 0;

        return possuiMotorista && possuiPneus ? 'Ativo' : 'Inativo';
    }

    async create(dto: CreateVeiculoDto) {

        if (dto.pneus) {

            if (dto.pneus.length !== 0) {

                if (!(await this.pneuService.containsAll(dto.pneus))) {
                    throw new NotFoundException('Um ou mais pneus informados não existem!');
                }

            }

        }

        const crlv = await this.crlvService.create(dto.crlv);

        const payload: Record<string, any> = {
            km_atual: dto.km_atual,
            crlv_id: crlv.id,
            status: this.calculaStatus(dto.motorista_id, dto.pneus),
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

    async update(placa: string, dto: UpdateVeiculoDto) {
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

        const caminhao = await this.findOneByPlate(placa);

        await this.pneuService.updatePneusCaminhaoId(caminhao.data.pneu, null);

        const { error } = await this.supabase.getClient()
            .from('caminhao')
            .delete()
            .eq('id', caminhao.data.id);

        await this.crlvService.removeById(caminhao.data.crlv_id);

        if (error) {
            throw error;
        }

        return {
            mensagem: 'Caminhao removido com sucesso!',
        };
    }

    async instalacao(): Promise<void>
    {
        const client = this.supabase.getClient();

        const v = {
            plate : ''
        }

        const ps = [ { id : '' } ]

        const {data: veiculo, error: e1 } = await client
            .from('veiculos')
            .select('*, crlv( placa )')
            .eq('crlv.placa', v.plate )
            .single()

        if ( !veiculo ) {
            throw e1 ? e1 : new Error('');
        }

        const {data: template, error: e2 } = await client
            .from('templates')
            .select()
            .eq('id', veiculo.template )
            .single()

        if ( !template ) {
            throw e2 ? e2 : new Error('');
        }

        const _template = new Template( template.layout );

        for ( const p of ps )
        {

            const {data: pneu, error: e3 } = await client
                .from('pneus')
                .select()
                .eq('id', p.id )
                .single()

            if ( !pneu ) {
                throw e3 ? e3 : new Error('');
            }

            if ( _template.permite(0, 'E', 0) ) {
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