import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { MedicoesService } from './medicoes.service';

@Controller('pneus/medicoes')
export class MedicoesController {

  constructor(private readonly medicaoPneusService: MedicoesService) {}

  @Post()
  create(@Body() dto: object) {
    return this.medicaoPneusService.create(dto);
  }

  @Get()
  findAll() {
    return this.medicaoPneusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicaoPneusService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: object) {
    return this.medicaoPneusService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicaoPneusService.remove(id);
  }
}
