
import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@Controller('system')
@ApiBearerAuth('access-token')
export class SystemController {
}