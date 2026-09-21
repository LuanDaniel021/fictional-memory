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

console.log('SUPABASE PNEUS:', {
    quantidade: data?.length,
    erro: error?.message,
  });

        if (!data) {
            throw error ? error : new Error('Erro ao buscar pnues.');
        }

        return data;
    }

    async findOneById(id: number): Promise<Pneu> 
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
            .from('pneus')
            .delete()
            .eq('id', id)
            .select()
            .maybeSingle();

        if (!data) {
            throw error ? error : new NotFoundException('Pneu não encontrado');
        }

        return data;
    }

    async findAllById(pneus: number[]): Promise<Pneu[]>
    {
        const { data, error } = await this.supabase.getClient()
            .from('pneus')
            .select('*')
            .in('id', pneus);

        if (error) {
            throw error;
        }

        if (data.length !== pneus.length) {
            throw new NotFoundException('Nem todos os pneus foram encontrados.');
        }

        return data;
    }

}
