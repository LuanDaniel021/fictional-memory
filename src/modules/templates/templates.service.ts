import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { SupabaseService } from '../../supabase/supabase.service';
import { Template } from './entities/template.entity';

@Injectable()
export class TemplatesService {
  
  constructor( private readonly supabase : SupabaseService ) {}

  async create(dto: CreateTemplateDto): Promise<Template>
  {
    const { data, error } = await this.supabase.getClient()
      .from('templates')
      .insert( dto )
      .select<string,Template>()
      .maybeSingle();

    if ( !data ) {
      throw error ? error : new NotFoundException('Erro ao registrar Template');
    }

    return data;
  }

  async findAll(): Promise<Template[]>
  {
    const { data, error } = await this.supabase.getClient()
      .from('templates')
      .select<string,Template>()

    if (error) {
      throw error;
    }

    return data ?? [];
  }

  async findOneById(id: string): Promise<Template>
  {
    const { data, error } = await this.supabase.getClient()
      .from('templates')
      .select<string,Template>()
      .eq('id', id)
      .maybeSingle();

    if ( !data ) {
      throw error ? error : new NotFoundException('Template nao encontrado');
    }

    return data;
  }

  async findOneByName(nome: string): Promise<Template>
  {
    const { data, error } = await this.supabase.getClient()
      .from('templates')
      .select<string,Template>()
      .eq('nome', nome)
      .maybeSingle();

    if ( !data ) {
      throw error ? error : new NotFoundException('Template nao encontrado');
    }
    
    return data;
  }

  async updateById(id: string, dto: UpdateTemplateDto): Promise<Template>
  {
    const { data, error } = await this.supabase.getClient()
      .from('templates')
      .update(dto)
      .eq('id', id)
      .select<string,Template>()
      .maybeSingle();

    if ( !data ) {
      throw error ? error : new NotFoundException('Template nao encontrado');
    }
    
    return data;
  }

  async removeById(id: string): Promise<Template>
  {
    const { data, error } = await this.supabase.getClient()
      .from('templates')
      .delete()
      .eq('id', id)
      .select<string,Template>()
      .maybeSingle();

    if ( !data ) {
      throw error ? error : new NotFoundException('Template nao encontrado');
    }
    
    return data;
  }

}
