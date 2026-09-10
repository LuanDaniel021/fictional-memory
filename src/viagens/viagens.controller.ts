import { Controller } from '@nestjs/common';
import { ViagensService } from './viagens.service';

@Controller('viagens')
export class ViagensController {
  constructor(private readonly viagensService: ViagensService) {}
}
