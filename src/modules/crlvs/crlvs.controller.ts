import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateCrlvDto } from './dto/create-crlv.dto';
import { UpdateCrlvDto } from './dto/update-crlv.dto';
import { CrlvService } from './crlvs.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { SupabaseAuthGuard } from '../../supabase/supabase.auth.guard';

@Controller('crlvs')
@UseGuards(SupabaseAuthGuard, RolesGuard)
@Roles('user')
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
