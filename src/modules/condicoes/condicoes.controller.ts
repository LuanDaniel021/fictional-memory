import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CondicoesService } from './condicoes.service';
import { CreateCondicaoDto } from './dto/create-condicao.dto';
import { UpdateCondicaoDto } from './dto/update-condicao.dto';

@Controller('medicoes/:medicaoId/condicoes')
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
