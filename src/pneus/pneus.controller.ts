import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PneusService } from './pneus.service';
import { CreatePneuDto } from './dto/create-pneus.dto';
import { UpdatePneuDto } from './dto/update-pneus.dto';

@Controller('pneus')
export class PneusController {
  constructor(private readonly pneusService: PneusService) {}

  @Post()
  create(@Body() dto: CreatePneuDto) {
    return this.pneusService.create(dto);
  }

  @Get()
  findAll() {
    return this.pneusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pneusService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePneuDto) {
    return this.pneusService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pneusService.remove(id);
  }
}
