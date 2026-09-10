import { PartialType } from '@nestjs/swagger';
import { CreateIpvaDto } from './create-ipva.dto';

export class UpdateIpvaDto extends PartialType(CreateIpvaDto) {}
