import { Controller } from '@nestjs/common';
import { MedicaoPneusService } from './medicao_pneus.service';

@Controller('medicao-pneus')
export class MedicaoPneusController {
  constructor(private readonly medicaoPneusService: MedicaoPneusService) {}
}
