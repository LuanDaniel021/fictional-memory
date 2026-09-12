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

	@Get(':plate')
	findOneByPlate(@Param('plate') plate: string) {
		return this.crlvService.findOneByPlate(plate);
	}

	@Patch(':plate')
	update(
		@Param('plate') placa: string,
		@Body() dto: UpdateCrlvDto,
	) {
		return this.crlvService.updateByPlate(placa, dto);
	}

	@Delete(':plate')
	remove(@Param('plate') placa: string) {
		return this.crlvService.removeByPlate(placa);
	}
}
