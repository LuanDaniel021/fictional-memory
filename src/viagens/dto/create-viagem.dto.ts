import { IsInt, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateViagemDto {
  @ApiPropertyOptional({
    description: 'ID do caminhão vinculado à viagem',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  caminhao_id?: number | null;

  @ApiPropertyOptional({
    description: 'ID do motorista responsável pela viagem',
    example: 12,
  })
  @IsInt()
  @IsOptional()
  motorista_id?: number | null;

  @ApiPropertyOptional({
    description: 'Data e hora de início da viagem (formato ISO 8601)',
    example: '2026-08-27T10:00:00Z',
  })
  @IsDateString()
  @IsOptional()
  data_inicio?: string | null;

  @ApiPropertyOptional({
    description: 'Data e hora de término da viagem (formato ISO 8601)',
    example: '2026-08-28T18:00:00Z',
  })
  @IsDateString()
  @IsOptional()
  data_fim?: string | null;

  @ApiPropertyOptional({
    description: 'Quilometragem inicial do veículo',
    example: 120000.0,
  })
  @IsNumber()
  @IsOptional()
  km_inicial?: number | null;

  @ApiPropertyOptional({
    description: 'Quilometragem final do veículo',
    example: 120450.5,
  })
  @IsNumber()
  @IsOptional()
  km_final?: number | null;

  @ApiPropertyOptional({
    description: 'Distância total percorrida na viagem (em km)',
    example: 450.5,
  })
  @IsNumber()
  @IsOptional()
  distancia_percorrida?: number | null;
}
