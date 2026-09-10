import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCrlvDto } from './dto/create-crlv.dto';
import { UpdateCrlvDto } from './dto/update-crlv.dto';
import { Crlv } from './entities/crlv.entity';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class CrlvService {
  constructor( private readonly supabase: SupabaseService ) {}
  
  async create(dto: CreateCrlvDto) : Promise<Crlv> {
    const { data, error } = await this.supabase.getClient()
      .from('crlv')
      .insert(dto)
      .select<string, Crlv>()
      .single()
    
    if (error) throw error;

    return data;
  }

  async findAll(): Promise<Crlv[]> {
    const { data, error } = await this.supabase.getClient()
      .from('crlv')
      .select('*');

    if (error) throw error;
    return data ?? [];
  }

  async findOne(id: number): Promise<Crlv> {
    const { data, error } = await this.supabase.getClient()
      .from('crlv')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new NotFoundException('CRLV não encontrado');
    return data;
  }

  async update(id: number, updateCrlvDto: UpdateCrlvDto): Promise<Crlv> {
    const { data, error } = await this.supabase.getClient()
      .from('crlv')
      .update(updateCrlvDto)
      .eq('id', id)
      .select('*')
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new NotFoundException('CRLV não encontrado');
    return data;
  }

  async remove(id: number): Promise<void> {
    const { data, error } = await this.supabase.getClient()
      .from('crlv')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new NotFoundException('CRLV não encontrado');
  }
}
