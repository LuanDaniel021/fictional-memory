import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CondicoesService } from './condicoes.service';
import { CreateCondicaoDto } from './dto/create-condicao.dto';
import { UpdateCondicaoDto } from './dto/update-condicao.dto';

@Controller('medicoes/:medicaoId/condicoes')
export class CondicoesController {
  constructor(private readonly condicoesService: CondicoesService) {}

  @Post()
  create(@Param('medicaoId') medicaoId:number, @Body() dto: CreateCondicaoDto) {
    return this.condicoesService.createWithMedicaoId(medicaoId, dto);
  }

  @Get()
  findAll() {
    return this.condicoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.condicoesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCondicoeDto: UpdateCondicaoDto) {
    return this.condicoesService.update(+id, updateCondicoeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.condicoesService.remove(+id);
  }
}
