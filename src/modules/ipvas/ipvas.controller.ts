import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { IpvasService } from './ipvas.service';
import { CreateIpvaDto } from './dto/create-ipva.dto';
import { UpdateIpvaDto } from './dto/update-ipva.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { SupabaseAuthGuard } from '../../supabase/supabase.auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('ipvas')
@ApiBearerAuth('access-token')
@UseGuards(SupabaseAuthGuard, RolesGuard)
@Roles('user')
export class IpvasController {
  constructor(private readonly ipvasService: IpvasService) {}

  @Post()
  create(@Body() dto: CreateIpvaDto) {
    return this.ipvasService.create(dto);
  }

  @Get()
  findAll() {
    return this.ipvasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ipvasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateIpvaDto) {
    return this.ipvasService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ipvasService.remove(id);
  }
}
