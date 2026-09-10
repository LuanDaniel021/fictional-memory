import { PartialType } from '@nestjs/mapped-types';
import { CreateCrlvDto } from './create-crlv.dto';

export class UpdateCrlvDto extends PartialType(CreateCrlvDto) {
  id: number;
}
