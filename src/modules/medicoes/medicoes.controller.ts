import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { MedicoesService } from './medicoes.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateMedicaoDto } from './dto/create-medicao.dto';
import { CalcularMedicoesDto } from './dto/calcular-medicoes.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { SupabaseAuthGuard } from '../../supabase/supabase.auth.guard';

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

  @Get('calculo/comparar')
  calcularEntreDuasMedicoes(
    @Param('pneuId', ParseIntPipe) pid: number,
    @Query() query: CalcularMedicoesDto,
  ) {
    return this.medicaoPneusService.calcularEntreDuasMedicoes(
      pid,
      query.medicaoId1,
      query.medicaoId2,
    );
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
