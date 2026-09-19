import { PartialType } from '@nestjs/swagger';
import { CreateMedicaoDto } from './create-medic.dto';

export class UpdateMedicaoDto extends PartialType(CreateMedicaoDto) {}
