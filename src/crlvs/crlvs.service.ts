import { Injectable } from '@nestjs/common';
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
      .select()
      .single()
    
    if (error) {
      throw error;
    }

    return data;
  }

  findAll() {
    return `This action returns all crlvs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crlv`;
  }

  update(id: number, updateCrlvDto: UpdateCrlvDto) {
    return `This action updates a #${id} crlv`;
  }

  remove(id: number) {
    return `This action removes a #${id} crlv`;
  }
}
