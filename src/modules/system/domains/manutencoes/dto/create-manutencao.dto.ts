import {
  IsInt,
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateManutencaoDto {
  @ApiPropertyOptional({
    description: 'ID do caminhão que recebeu a manutenção',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  caminhao_id?: number | null;

  @ApiPropertyOptional({
    description: 'Tipo de manutenção realizada',
    example: 'Preventiva',
  })
  @IsString()
  @IsOptional()
  tipo?: string | null;

  @ApiPropertyOptional({
    description: 'Quilometragem do caminhão no momento do serviço',
    example: 125000.0,
  })
  @IsNumber()
  @IsOptional()
  km_realizacao?: number | null;

  @ApiPropertyOptional({
    description: 'Data de realização da manutenção (YYYY-MM-DD)',
    example: '2026-08-20',
  })
  @IsDateString()
  @IsOptional()
  data_manutencao?: string | null;

  @ApiPropertyOptional({
    description: 'Custo total do serviço (em R$)',
    example: 850.5,
  })
  @IsNumber()
  @IsOptional()
  custo?: number | null;

  @ApiPropertyOptional({
    description: 'Observações e detalhes sobre as peças ou serviços prestados',
    example: 'Troca do filtro de combustível e alinhamento do eixo dianteiro.',
  })
  @IsString()
  @IsOptional()
  observacoes?: string | null;
}
