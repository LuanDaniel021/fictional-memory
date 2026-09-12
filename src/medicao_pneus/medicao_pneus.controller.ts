import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { MedicaoPneusService } from './medicao_pneus.service';
import { CreateMedicaoPneuDto } from './dto/create-medicao_pneus.dto';
import { UpdateMedicaoPneuDto } from './dto/update-medicao_pneus.dto';

@Controller('medicao-pneus')
export class MedicaoPneusController {
  constructor(private readonly medicaoPneusService: MedicaoPneusService) {}

  @Post()
  create(@Body() dto: CreateMedicaoPneuDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMedicaoPneuDto) {
    return this.medicaoPneusService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicaoPneusService.remove(id);
  }
}
