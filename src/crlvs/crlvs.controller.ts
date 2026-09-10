import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UpdateCrlvDto } from './dto/update-crlv.dto';
import { CrlvService } from './crlvs.service';

@Controller('crlvs')
export class CrlvController {
	constructor(private readonly crlvService: CrlvService) {}

	@Get()
	findAll() {
		return this.crlvService.findAll();
	}

	@Get(':plate')
	findOneByPlate(@Param('plate') plate: string) {
		return this.crlvService.findOneByPlate(plate);
	}

	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateCrlvDto,
	) {
		return this.crlvService.update(id, dto);
	}
}
