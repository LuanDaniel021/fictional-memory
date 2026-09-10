import { Controller } from '@nestjs/common';
import { MotoristasService } from './motoristas.service';

@Controller('motoristas')
export class MotoristasController {
  constructor(private readonly motoristasService: MotoristasService) {}
}
