import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class MotoristasService {
    constructor( private readonly supabase: SupabaseService) {}

    async create( dto : CreateMotoristaDto) {
        const { data, error } = await this.supabase.getClient()
            .from('motorista')
            .insert(dto)
            .select('*')
            .single();

        if (error) {
            throw error;
        }

        return data;
    }

    async findAll() {
        const { data, error } = await this.supabase.getClient()
            .from('motorista')
            .select('*');

        if (error) throw error;
        return data ?? [];
    }

    async findOne(id: number) {
        const { data, error } = await this.supabase.getClient()
            .from('motorista')
            .select('*')
            .eq('id', id)
            .maybeSingle();

        if (error) throw error;
        if (!data) throw new NotFoundException('Motorista não encontrado');
        return data;
    }

    async update(id: number, dto: UpdateMotoristaDto) {
        const { data, error } = await this.supabase.getClient()
            .from('motorista')
            .update(dto)
            .eq('id', id)
            .select('*')
            .maybeSingle();

        if (error) throw error;
        if (!data) throw new NotFoundException('Motorista não encontrado');
        return data;
    }

    async remove(id: number) {
        const { data, error } = await this.supabase.getClient()
            .from('motorista')
            .delete()
            .eq('id', id)
            .select('id')
            .maybeSingle();

        if (error) throw error;
        if (!data) throw new NotFoundException('Motorista não encontrado');
    }
}
