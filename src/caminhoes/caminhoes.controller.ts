import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
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
  findOneByPlate(@Param('plate') placa: string) {
    return this.caminhoesService.findOneByPlate(placa);
  }

  @Patch(':plate')
  update(@Param('plate') placa: string, @Body() updateCaminhoeDto: UpdateCaminhaoDto) {
    return this.caminhoesService.update(placa, updateCaminhoeDto);
  }

  @Delete(':plate')
  remove(@Param('plate') placa: string) {
    return this.caminhoesService.remove(placa);
  }
}
