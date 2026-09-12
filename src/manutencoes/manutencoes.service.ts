import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateManutencaoDto } from './dto/create-manutencao.dto';
import { UpdateManutencaoDto } from './dto/update-manutencao.dto';

@Injectable()
export class ManutencoesService {
	constructor(private readonly supabase: SupabaseService) {}

	async create(dto: CreateManutencaoDto) {
		const { data, error } = await this.supabase.getClient()
			.from('manutencao')
			.insert(dto)
			.select('*')
			.single();

		if (error) throw error;

		return data;
	}

	async findAll() {
		const { data, error } = await this.supabase.getClient()
			.from('manutencao')
			.select('*');
		if (error) throw error;
		return data ?? [];
	}

	async findOne(id: number) {
		const { data, error } = await this.supabase.getClient()
			.from('manutencao')
			.select('*')
			.eq('id', id)
			.maybeSingle();

		if (error) throw error;
		if (!data) throw new NotFoundException('Manutenção não encontrada');
		return data;
	}

	async update(id: number, dto: UpdateManutencaoDto) {
		const { data, error } = await this.supabase.getClient()
			.from('manutencao')
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
			.from('manutencao')
			.delete()
			.eq('id', id)
			.select('id')
			.maybeSingle();

		if (error) throw error;
		
		if (!data) throw new NotFoundException('Manutenção não encontrada');
	}
}
