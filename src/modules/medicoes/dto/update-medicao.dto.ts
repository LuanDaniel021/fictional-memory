import { PartialType } from '@nestjs/swagger';
import { CreateMedicaoDto } from './create-medicao.dto';

export class UpdateMedicaoDto extends PartialType(CreateMedicaoDto) {}
