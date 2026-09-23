import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CalcularMedicoesDto {
  @ApiProperty({ description: 'ID da primeira medição' })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  medicaoId1: number;

  @ApiProperty({ description: 'ID da segunda medição' })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  medicaoId2: number;
}
