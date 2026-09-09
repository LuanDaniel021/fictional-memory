import { PartialType } from '@nestjs/swagger';
import { CreateCaminhaoDto } from './create-caminhao.dto';

export class UpdateCaminhaoDto extends PartialType(CreateCaminhaoDto) {}
