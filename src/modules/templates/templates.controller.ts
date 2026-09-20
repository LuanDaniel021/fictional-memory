import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Controller('templates')
export class TemplatesController {

  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  create(@Body() dto: CreateTemplateDto)
  {
    return this.templatesService.create(dto);
  }

  @Get()
  findAll()
  {
    return this.templatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string)
  {
    return this.templatesService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTemplateDto)
  {
    return this.templatesService.updateById(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string)
  {
    return this.templatesService.removeById(id);
  }
}
