import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlocacoesService } from './alocacoes.service';
import { CreateAlocacoeDto } from './dto/create-alocacoe.dto';
import { UpdateAlocacoeDto } from './dto/update-alocacoe.dto';

@Controller('alocacoes')
export class AlocacoesController {
  constructor(private readonly alocacoesService: AlocacoesService) {}

  @Post()
  create(@Body() createAlocacoeDto: CreateAlocacoeDto) {
    return this.alocacoesService.create(createAlocacoeDto);
  }

  @Get()
  findAll() {
    return this.alocacoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alocacoesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlocacoeDto: UpdateAlocacoeDto) {
    return this.alocacoesService.update(+id, updateAlocacoeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alocacoesService.remove(+id);
  }
}
