import { Controller } from '@nestjs/common';
import { ManutencoesService } from './manutencoes.service';

@Controller('manutencoes')
export class ManutencoesController {
  constructor(private readonly manutencoesService: ManutencoesService) {}
}
