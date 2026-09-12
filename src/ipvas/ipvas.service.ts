import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateIpvaDto } from './dto/create-ipva.dto';
import { UpdateIpvaDto } from './dto/update-ipva.dto';

@Injectable()
export class IpvasService {
    constructor(private readonly supabase: SupabaseService) {}
    
    async create(dto: CreateIpvaDto) {
        const { data, error } = await this.supabase.getClient()
            .from('ipva')
            .insert(dto)
            .select('*')
            .single();

        if (error) throw error;

        return data;
    }

    async findAll() {
        const { data, error } = await this.supabase.getClient()
            .from('ipva')
            .select('*');
        if (error) throw error;
        return data ?? [];
    }

    async findOne(id: number) {
        const { data, error } = await this.supabase.getClient()
            .from('ipva')
            .select('*')
            .eq('id', id)
            .maybeSingle();

        if (error) throw error;
        if (!data) throw new NotFoundException('Manutenção não encontrada');
        return data;
    }

    async update(id: number, dto: UpdateIpvaDto) {
        const { data, error } = await this.supabase.getClient()
            .from('ipva')
            .update(dto)
            .eq('id', id)
            .select('*')
            .maybeSingle();
        if (error) throw error;
        if (!data) throw new NotFoundException('Manutenção não encontrada');
        return data;
    }

    async remove(id: number) {
        const { data, error } = await this.supabase.getClient()
            .from('ipva')
            .delete()
            .eq('id', id)
            .select('id')
            .maybeSingle();

        if (error) throw error;
        
        if (!data) throw new NotFoundException('Manutenção não encontrada');
    }
}
