import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateCrlvDto } from './dto/create-crlv.dto';
import { UpdateCrlvDto } from './dto/update-crlv.dto';
import { CrlvService } from './crlvs.service';

@Controller('crlvs')
export class CrlvController {
	constructor(private readonly crlvService: CrlvService) {}

	@Post()
	create(@Body() dto: CreateCrlvDto) {
		return this.crlvService.create(dto);
	}

	@Get()
	findAll() {
		return this.crlvService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.crlvService.findOne(id);
	}

	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateCrlvDto,
	) {
		return this.crlvService.update(id, dto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.crlvService.remove(id);
	}
}
