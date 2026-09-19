import { PartialType } from '@nestjs/swagger';
import { CreateCondicoeDto } from './create-condicoe.dto';

export class UpdateCondicoeDto extends PartialType(CreateCondicoeDto) {}
