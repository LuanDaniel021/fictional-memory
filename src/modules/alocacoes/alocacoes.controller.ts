import { Controller, Get, Post, Body, Patch, Param, Delete, ParseArrayPipe, UseGuards } from '@nestjs/common';
import { AlocacoesService } from './alocacoes.service';
import { CreateAlocacaoDto } from './dto/create-alocacao.dto';
import { UpdateAlocacaoDto } from './dto/update-alocacao.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { SupabaseAuthGuard } from '../../supabase/supabase.auth.guard';

@Controller('veiculos/:plate/alocacoes')
@UseGuards(SupabaseAuthGuard, RolesGuard)
@Roles('user')
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
  findAll(@Param('plate') plate: string) {
    return this.alocacoesService.findAll(plate);
  }

  @Get(':id')
  findOne(@Param('plate') plate: string, @Param('id') id: string) {
    return this.alocacoesService.findOne(plate, +id);
  }

  @Patch(':id')
  update(@Param('plate') plate: string, @Param('id') id: string, @Body() updateAlocacoeDto: UpdateAlocacaoDto) {
    return this.alocacoesService.update(plate, +id, updateAlocacoeDto);
  }

  @Delete(':id')
  remove(@Param('plate') plate: string, @Param('id') id: string) {
    return this.alocacoesService.remove(plate, +id);
  }
}
