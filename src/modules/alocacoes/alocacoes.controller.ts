import { Controller, Get, Post, Body, Patch, Param, Delete, ParseArrayPipe } from '@nestjs/common';
import { AlocacoesService } from './alocacoes.service';
import { CreateAlocacaoDto } from './dto/create-alocacao.dto';
import { UpdateAlocacaoDto } from './dto/update-alocacao.dto';

@Controller('veiculos/:plate/alocacoes')
export class AlocacoesController {

  constructor(private readonly alocacoesService: AlocacoesService) {}

  @Post()
  alocar(
    @Param('plate') plate : string,
    @Body(new ParseArrayPipe({ items: CreateAlocacaoDto })) dtos: CreateAlocacaoDto[]
  ) {
    return this.alocacoesService.create(plate, dtos);
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
  update(@Param('id') id: string, @Body() updateAlocacoeDto: UpdateAlocacaoDto) {
    return this.alocacoesService.update(+id, updateAlocacoeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alocacoesService.remove(+id);
  }
}
