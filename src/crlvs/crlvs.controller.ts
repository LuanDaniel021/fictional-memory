import { Controller } from '@nestjs/common';
import { CrlvService } from './crlvs.service';
import { CreateCrlvDto } from './dto/create-crlv.dto';
import { UpdateCrlvDto } from './dto/update-crlv.dto';

@Controller()
export class CrlvController {
  constructor(private readonly crlvsService: CrlvService) {}
}
