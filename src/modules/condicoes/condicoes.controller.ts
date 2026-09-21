import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CondicoesService } from './condicoes.service';
import { CreateCondicaoDto } from './dto/create-condicao.dto';
import { UpdateCondicaoDto } from './dto/update-condicao.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { SupabaseAuthGuard } from '../../supabase/supabase.auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('medicoes/:medicaoId/condicoes')
@ApiBearerAuth('access-token')
@UseGuards(SupabaseAuthGuard, RolesGuard)
@Roles('user')
export class CondicoesController {
  constructor(private readonly condicoesService: CondicoesService) {}

  @Post()
  create(@Param('medicaoId', ParseIntPipe) medicaoId: number, @Body() dto: CreateCondicaoDto) {
    return this.condicoesService.createWithMedicaoId(medicaoId, dto);
  }

  @Get()
  findAll(@Param('medicaoId', ParseIntPipe) medicaoId: number) {
    return this.condicoesService.findAll(medicaoId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.condicoesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCondicoeDto: UpdateCondicaoDto) {
    return this.condicoesService.update(id, updateCondicoeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.condicoesService.remove(id);
  }
}
