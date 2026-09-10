import { IsInt, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMedicaoPneuDto {
  @ApiPropertyOptional({
    description: 'ID do pneu medido',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  pneu_id?: number | null;

  @ApiPropertyOptional({
    description: 'ID da viagem em que a medição foi realizada',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  viagem_id?: number | null;

  @ApiPropertyOptional({
    description: 'Profundidade atual do sulco do pneu (em mm)',
    example: 12.3,
  })
  @IsNumber()
  @IsOptional()
  profundidade_atual_mm?: number | null;

  @ApiPropertyOptional({
    description: 'Data em que a medição foi realizada (formato YYYY-MM-DD)',
    example: '2026-08-27',
  })
  @IsDateString()
  @IsOptional()
  data_medicao?: string | null;
}
