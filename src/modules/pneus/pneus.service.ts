import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { CreatePneuDto } from './dto/create-pneus.dto';
import { UpdatePneuDto } from './dto/update-pneus.dto';
import { Pneu } from './entities/pneu.entity';

@Injectable()
export class PneusService {
    constructor(
        private readonly supabase: SupabaseService,
    ) {}

    async create(dto: CreatePneuDto): Promise<Pneu>
    {
        const { data, error } = await this.supabase.getClient()
            .from('pneus')
            .insert(dto)
            .select('*')
            .single();

        if (!data) {
            throw error ? error : new Error('Erro ao criar pneu.');
        }

        return data;
    }

    async findAll(): Promise<Pneu[]>
    {
        const { data, error } = await this.supabase.getClient()
            .from('pneus')
            .select('*');

        if (!data) {
            throw error ? error : new Error('Erro ao buscar pnues.');
        }

        return data;
    }

    async findOneById(id: string): Promise<Pneu> 
    {
        const { data, error } = await this.supabase.getClient()
            .from('pneus')
            .select<string,Pneu>('*')
            .eq('id', id)
            .maybeSingle();

        if ( !data )
        {
           throw error ? error : new NotFoundException(`Pneu não encontrado.`);
        }

        return data;
    }

    async update(id: number, dto: UpdatePneuDto): Promise<Pneu>
    {
        const { data, error } = await this.supabase.getClient()
            .from('pneus')
            .update(dto)
            .eq('id', id)
            .select('*')
            .maybeSingle();

        if (error) throw error;
        if (!data) throw new NotFoundException('Pneu não encontrado');
        return data;
    }

    async remove(id: number): Promise<Pneu>
    {
        const { data, error } = await this.supabase.getClient()
            .from('pneu')
            .delete()
            .eq('id', id)
            .select()
            .maybeSingle();

        if (!data) {
            throw error ? error : new NotFoundException('Pneu não encontrado');
        }

        return data;
    }

    async containsAll(pneus: number[]): Promise<boolean> {
        if (pneus.length === 0) {
            return false;
        }

        const { data, error } = await this.supabase.getClient()
            .from('pneu')
            .select('id')
            .in('id', pneus);

        if (error) {
            throw error;
        }

        return data.length === pneus.length;
    }

    async findAllById(pneus: number[]): Promise<Pneu[]>
    {
        const { data, error } = await this.supabase.getClient()
            .from('pneu')
            .select('*')
            .in('id', pneus);

        if (error) {
            throw error;
        }

        return data;
    }

}
