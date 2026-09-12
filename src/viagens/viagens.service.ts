import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateViagemDto } from './dto/create-viagem.dto';
import { UpdateViagemDto } from './dto/update-viagem.dto';

@Injectable()
export class ViagensService {
	constructor(private readonly supabase: SupabaseService) {}

	async create(dto: CreateViagemDto) {
		const { data, error } = await this.supabase.getClient()
			.from('viagem')
			.insert(dto)
			.select('*')
			.single();

		if (error) throw error;
		return data;
	}

	async findAll() {
		const { data, error } = await this.supabase.getClient()
			.from('viagem')
			.select('*');

		if (error) throw error;
		return data ?? [];
	}

	async findOne(id: number) {
		const { data, error } = await this.supabase.getClient()
			.from('viagem')
			.select('*')
			.eq('id', id)
			.maybeSingle();

		if (error) throw error;
		if (!data) throw new NotFoundException('Viagem não encontrada');
		return data;
	}

	async update(id: number, dto: UpdateViagemDto) {
		const { data, error } = await this.supabase.getClient()
			.from('viagem')
			.update(dto)
			.eq('id', id)
			.select('*')
			.maybeSingle();

		if (error) throw error;
		if (!data) throw new NotFoundException('Viagem não encontrada');
		return data;
	}

	async remove(id: number) {
		const { data, error } = await this.supabase.getClient()
			.from('viagem')
			.delete()
			.eq('id', id)
			.select('id')
			.maybeSingle();

		if (error) throw error;
		if (!data) throw new NotFoundException('Viagem não encontrada');
	}
}
