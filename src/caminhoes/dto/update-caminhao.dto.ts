import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateCaminhaoDto } from './create-caminhao.dto';

export class UpdateCaminhaoDto extends PartialType(
  OmitType(CreateCaminhaoDto, ['crlv', 'pneus', 'status'] as const),
) {}
