import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { MotoristasService } from './motoristas.service';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';

@Controller('motoristas')
export class MotoristasController {
  constructor(private readonly motoristasService: MotoristasService) {}

  @Post()
  create(@Body() dto: CreateMotoristaDto) {
    return this.motoristasService.create(dto);
  }

  @Get()
  findAll() {
    return this.motoristasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.motoristasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMotoristaDto) {
    return this.motoristasService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.motoristasService.remove(id);
  }

}
