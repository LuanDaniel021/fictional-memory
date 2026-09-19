import { PartialType } from '@nestjs/swagger';
import { CreatePneuDto } from './create-pneus.dto';

export class UpdatePneuDto extends PartialType(CreatePneuDto) {}
