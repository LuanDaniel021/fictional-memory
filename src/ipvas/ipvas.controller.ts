import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { IpvasService } from './ipvas.service';
import { CreateIpvaDto } from './dto/create-ipva.dto';
import { UpdateIpvaDto } from './dto/update-ipva.dto';

@Controller('ipvas')
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
