import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { PneusService } from './pneus.service';
import { CreatePneuDto } from './dto/create-pneus.dto';
import { UpdatePneuDto } from './dto/update-pneus.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { SupabaseAuthGuard } from '../../supabase/supabase.auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Pneus')
@Controller('pneus')
@ApiBearerAuth('access-token')
@UseGuards(SupabaseAuthGuard)
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
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.pneusService.findOneById(id);
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
