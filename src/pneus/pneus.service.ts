import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class PneusService {
    constructor(
        private readonly supabase: SupabaseService,
    ) {}

    async containsAll(pneus: number[] | undefined): Promise<boolean> {
        if (!pneus || pneus.length === 0) {
            return true;
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

    async updatePneusCaminhaoId(pneus: number[], caminhaoId: number | null): Promise<void> {
        const { error } = await this.supabase.getClient()
            .from('pneu')
            .update({ caminhao_id: caminhaoId })
            .in('id', pneus);

        if (error) {
            throw error;
        }
    }

}
