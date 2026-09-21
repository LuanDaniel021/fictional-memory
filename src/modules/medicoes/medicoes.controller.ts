import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { MedicoesService } from './medicoes.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateMedicaoDto } from './dto/create-medicao.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { SupabaseAuthGuard } from '../../supabase/supabase.auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Mediçoes')
@Controller('pneus/:pneuId/medicoes')
@ApiBearerAuth('access-token')
@UseGuards(SupabaseAuthGuard, RolesGuard)
@Roles('user')
export class MedicoesController {

  constructor(private readonly medicaoPneusService: MedicoesService) {}

  @Post()
  create(
    @Param('pneuId', ParseIntPipe) pid: number,
    @Body() dto: CreateMedicaoDto
  ) {
    return this.medicaoPneusService.create(pid, dto);
  }

  @Get('calculo')
  medicao(
    @Param('pneuId', ParseIntPipe) pid: number,
  ) {
    return this.medicaoPneusService.me(pid);
  }

  @Get()
  findAll(@Param('pneuId', ParseIntPipe) pid: number) {
    return this.medicaoPneusService.findAll(pid);
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
