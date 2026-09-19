import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';

import { CreateVeiculoDto } from './domains/dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './domains/dto/update-veiculo.dto';

@Controller('veiculos')
export class VeiculosController {

  constructor(private readonly veiculosService: VeiculosService) {}

  @Post()
  create(
    @Body() createCaminhaoDto: CreateVeiculoDto
  )
  {
    return this.veiculosService.create(createCaminhaoDto);
  }

  @Get()
  findAll()
  {
    return this.veiculosService.findAll();
  }

  @Get(':plate')
  findOneByPlate(
    @Param('plate') placa: string
  )
  {
    return this.veiculosService.findOneByPlate(placa);
  }

  @Patch(':plate')
  update(
    @Param('plate') placa: string,
    @Body() updateCaminhoeDto: UpdateVeiculoDto
  )
  {
    return this.veiculosService.update(placa, updateCaminhoeDto);
  }

  @Delete(':plate')
  remove(
    @Param('plate') placa: string
  )
  {
    return this.veiculosService.remove(placa);
  }

  @Post(':plate/instalar')
  instalar(
    @Param('plate') placa: string
  )
  {
    // criar
  }

}
