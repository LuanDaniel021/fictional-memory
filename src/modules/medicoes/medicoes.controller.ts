import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { MedicoesService } from './medicoes.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateMedicaoDto } from './dto/create-medicao.dto';

@ApiTags('Mediçoes')
@Controller('pneus/:pneuId/medicoes')
export class MedicoesController {

  constructor(private readonly medicaoPneusService: MedicoesService) {}

  @Post()
  create(
    @Param('pneuId') pid: number,
    @Body() dto: CreateMedicaoDto
  ) {
    return this.medicaoPneusService.create(pid, dto);
  }

  @Post()
  medicao(
    @Param('pneuId') pid: number,
  ) {
    return this.medicaoPneusService.me(pid);
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
