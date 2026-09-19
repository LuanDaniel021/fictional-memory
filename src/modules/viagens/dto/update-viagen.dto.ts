import { PartialType } from '@nestjs/swagger';
import { CreateViagenDto } from './create-viagen.dto';

export class UpdateViagenDto extends PartialType(CreateViagenDto) {}
