import { PartialType } from '@nestjs/swagger';
import { CreateMedicaoPneuDto } from './create-medicao_pneus.dto';

export class UpdateMedicaoPneuDto extends PartialType(CreateMedicaoPneuDto) {}
