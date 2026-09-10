import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaminhoesService } from './caminhoes.service';
import { CreateCaminhaoDto } from './dto/create-caminhao.dto';
import { UpdateCaminhaoDto } from './dto/update-caminhao.dto';

@Controller('caminhoes')
export class CaminhoesController {
  constructor(private readonly caminhoesService: CaminhoesService) {}

  @Post()
  create(@Body() createCaminhaoDto: CreateCaminhaoDto) {
    return this.caminhoesService.create(createCaminhaoDto);
  }

  @Get()
  findAll() {
    return this.caminhoesService.findAll();
  }

  @Get(':plate')
  findPlate(@Param('plate') plate: string) {
    return this.caminhoesService.findPlate(plate);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaminhoeDto: UpdateCaminhaoDto) {
    return this.caminhoesService.update(+id, updateCaminhoeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caminhoesService.remove(+id);
  }
}
