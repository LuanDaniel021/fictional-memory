import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';

import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { Pneu } from '../pneus/entities/pneu.entity';

@Controller('veiculos')
export class VeiculosController {

  constructor(private readonly veiculosService: VeiculosService) {}

  @Post()
  create( @Body() dto: CreateVeiculoDto )
  {
    return this.veiculosService.create(dto);
  }

  @Get()
  findAll()
  {
    return this.veiculosService.findAll();
  }

  @Get(':plate')
  findOneByPlate( @Param('plate') placa: string )
  {
    return this.veiculosService.findOneByPlate(placa);
  }

  @Patch(':plate')
  update( @Param('plate') placa: string, @Body() dto: UpdateVeiculoDto )
  {
    return this.veiculosService.update(placa, dto);
  }

  @Delete(':plate')
  remove( @Param('plate') placa: string )
  {
    return this.veiculosService.remove(placa);
  }

  @Post(':plate/instalar')
  instalacao( @Param('plate') placa: string )
  {
    return this.veiculosService.instalacao(placa, [ { posicao: {}, pneu: {} as Pneu } ]);
  }

}
