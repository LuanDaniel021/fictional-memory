import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreatePneuDto } from './dto/create-pneus.dto';
import { UpdatePneuDto } from './dto/update-pneus.dto';
import { Pneu } from './entities/pneu.entity';

@Injectable()
export class PneusService {
    constructor(
        private readonly supabase: SupabaseService,
    ) {}

    async create(dto: CreatePneuDto) {
        const { data, error } = await this.supabase.getClient()
            .from('pneu')
            .insert(dto)
            .select('*')
            .single();

        if (error) throw error;
        return data;
    }

    async findAll() {
        const { data, error } = await this.supabase.getClient()
            .from('pneu')
            .select('*');

        if (error) throw error;
        return data ?? [];
    }

    async findOne(id: number) {
        const { data, error } = await this.supabase.getClient()
            .from('pneu')
            .select('*')
            .eq('id', id)
            .maybeSingle();

        if (error) throw error;
        if (!data) throw new NotFoundException('Pneu não encontrado');
        return data;
    }

    async update(id: number, dto: UpdatePneuDto) {
        const { data, error } = await this.supabase.getClient()
            .from('pneu')
            .update(dto)
            .eq('id', id)
            .select('*')
            .maybeSingle();

        if (error) throw error;
        if (!data) throw new NotFoundException('Pneu não encontrado');
        return data;
    }

    async remove(id: number) {
        const { data, error } = await this.supabase.getClient()
            .from('pneu')
            .delete()
            .eq('id', id)
            .select('id')
            .maybeSingle();

        if (error) throw error;
        if (!data) throw new NotFoundException('Pneu não encontrado');
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

    async findByIds(pneus: number[]): Promise<any[]> {
        const { data, error } = await this.supabase.getClient()
            .from('pneu')
            .select('*')
            .in('id', pneus);

        if (error) {
            throw error;
        }

        return data;
    }

    async updatePneusStatus(pneus: number[], status: string): Promise<void> {
        const { error } = await this.supabase.getClient()
            .from('pneu')
            .update({ status })
            .in('id', pneus);

        if (error) {
            throw error;
        }
    }

    async updatePneusCaminhaoId(pneus: Pneu[], caminhaoId: number | null): Promise<void> {
        const { error } = await this.supabase.getClient()
            .from('pneu')
            .update({ caminhao_id: caminhaoId })
            .in('id', pneus.map((p) => p.id));

        if (error) {
            throw error;
        }
    }

}
