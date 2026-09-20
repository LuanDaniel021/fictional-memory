import { PartialType } from '@nestjs/swagger';
import { CreateCondicaoDto } from './create-condicao.dto';

export class UpdateCondicaoDto extends PartialType(CreateCondicaoDto) {}
