import { Controller } from '@nestjs/common';
import { PneusService } from './pneus.service';

@Controller('pneus')
export class PneusController {
  constructor(private readonly pneusService: PneusService) {}
}
