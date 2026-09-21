import { Body, Controller, Get, Param, Patch, Post, Delete, UseGuards } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';

import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../../common/guards/roles.guard';
import { SupabaseAuthGuard } from '../../supabase/supabase.auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('veiculos')
@ApiBearerAuth('access-token')
@UseGuards(SupabaseAuthGuard, RolesGuard)
export class VeiculosController {

  constructor(private readonly veiculosService: VeiculosService) {}

  @Post()
  @Roles('user')
  create( @Body() dto: CreateVeiculoDto )
  {
    return this.veiculosService.create(dto);
  }

  @Get()
  @Roles('admin')
  findAll()
  {
    return this.veiculosService.findAll();
  }

  @Get(':plate')
  @Roles('user')
  findOneByPlate( @Param('plate') placa: string )
  {
    return this.veiculosService.findOneByPlate(placa);
  }

  @Patch(':plate')
  @Roles('user')
  update( @Param('plate') placa: string, @Body() dto: UpdateVeiculoDto )
  {
    return this.veiculosService.update(placa, dto);
  }

  @Delete(':plate')
  @Roles('user')
  remove( @Param('plate') placa: string )
  {
    return this.veiculosService.remove(placa);
  }

}
