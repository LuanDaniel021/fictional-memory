import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { MedicoesService } from './medicoes.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateMedicaoDto } from './dto/create-medicao.dto';

@ApiTags('Mediçoes')
@Controller('pneus/:pid/medicoes')
export class MedicoesController {

  constructor(private readonly medicaoPneusService: MedicoesService) {}

  @Post(':compare')
  create(
    @Param('pid') pid: string,
    @Param('compare') compare: 'anterior' | 'periodo',
    @Body() dto: CreateMedicaoDto
  ) {
    return this.medicaoPneusService.create(pid, compare, dto);
  }

  @Get(':id/medicoes')
  findAll() {
    return this.medicaoPneusService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.medicaoPneusService.findOneById(id);
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
