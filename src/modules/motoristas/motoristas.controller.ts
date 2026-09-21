import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MotoristasService } from './motoristas.service';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { SupabaseAuthGuard } from '../../supabase/supabase.auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('motoristas')
@ApiBearerAuth('access-token')
@UseGuards(SupabaseAuthGuard, RolesGuard)
@Roles('user')
export class MotoristasController {
  constructor(private readonly motoristasService: MotoristasService) {}

  @Post()
  create(@Body() createMotoristaDto: CreateMotoristaDto) {
    return this.motoristasService.create(createMotoristaDto);
  }

  @Get()
  findAll() {
    return this.motoristasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.motoristasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMotoristaDto: UpdateMotoristaDto) {
    return this.motoristasService.update(+id, updateMotoristaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.motoristasService.remove(+id);
  }
}
