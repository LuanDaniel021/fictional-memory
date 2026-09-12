import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateMedicaoPneuDto } from './dto/create-medicao_pneus.dto';
import { UpdateMedicaoPneuDto } from './dto/update-medicao_pneus.dto';

@Injectable()
export class MedicaoPneusService {
	constructor(private readonly supabase: SupabaseService) {}

	async create(dto: CreateMedicaoPneuDto) {
		const { data, error } = await this.supabase.getClient()
			.from('medicao_pneu')
			.insert(dto)
			.select('*')
			.single();

		if (error) throw error;
		return data;
	}

	async findAll() {
		const { data, error } = await this.supabase.getClient()
			.from('medicao_pneu')
			.select('*');

		if (error) throw error;
		return data ?? [];
	}

	async findOne(id: number) {
		const { data, error } = await this.supabase.getClient()
			.from('medicao_pneu')
			.select('*')
			.eq('id', id)
			.maybeSingle();

		if (error) throw error;
		if (!data) throw new NotFoundException('Medição de pneu não encontrada');
		return data;
	}

	async update(id: number, dto: UpdateMedicaoPneuDto) {
		const { data, error } = await this.supabase.getClient()
			.from('medicao_pneu')
			.update(dto)
			.eq('id', id)
			.select('*')
			.maybeSingle();

		if (error) throw error;
		if (!data) throw new NotFoundException('Medição de pneu não encontrada');
		return data;
	}

	async remove(id: number) {
		const { data, error } = await this.supabase.getClient()
			.from('medicao_pneu')
			.delete()
			.eq('id', id)
			.select('id')
			.maybeSingle();

		if (error) throw error;
		if (!data) throw new NotFoundException('Medição de pneu não encontrada');
	}
}
