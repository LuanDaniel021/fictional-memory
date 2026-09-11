import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Get(':plate/Pneu/:id')
  findOneByPlateWithPneuById(@Param('plate') placa: string, @Param('id') id: string) {
    return this.caminhoesService.findOneByPlateWithPneuById(placa, +id);
  }

  @Get(':plate/Pneus')
  findOneByPlateWithPneus(@Param('plate') placa: string) {
    return this.caminhoesService.findOneByPlateWithPneus(placa);
  }

  @Get(':plate/WithDriver')
  findOneByPlateWithDriver(@Param('plate') placa: string) {
    return this.caminhoesService.findOneByPlateWithDriver(placa);
  }

  @Get(':plate')
  findOneByPlate(@Param('plate') placa: string) {
    return this.caminhoesService.findOneByPlate(placa);
  }

  @Patch(':plate')
  update(@Param('plate') placa: string, @Body() updateCaminhoeDto: UpdateCaminhaoDto) {
    return this.caminhoesService.update(placa, updateCaminhoeDto);
  }
}
