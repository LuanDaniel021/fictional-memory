import { Controller } from '@nestjs/common';
import { IpvasService } from './ipvas.service';

@Controller('ipvas')
export class IpvasController {
  constructor(private readonly ipvasService: IpvasService) {}
}
