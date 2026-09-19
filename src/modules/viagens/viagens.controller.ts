import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ViagensService } from './viagens.service';
import { CreateViagenDto } from './dto/create-viagen.dto';
import { UpdateViagenDto } from './dto/update-viagen.dto';

@Controller('viagens')
export class ViagensController {
  constructor(private readonly viagensService: ViagensService) {}

  @Post()
  create(@Body() createViagenDto: CreateViagenDto) {
    return this.viagensService.create(createViagenDto);
  }

  @Get()
  findAll() {
    return this.viagensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viagensService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateViagenDto: UpdateViagenDto) {
    return this.viagensService.update(+id, updateViagenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viagensService.remove(+id);
  }
}
