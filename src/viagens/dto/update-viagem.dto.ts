import { PartialType } from '@nestjs/swagger';
import { CreateViagemDto } from './create-viagem.dto';

export class UpdateViagemDto extends PartialType(CreateViagemDto) {}
