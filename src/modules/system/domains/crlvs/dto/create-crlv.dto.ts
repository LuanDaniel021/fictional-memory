import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCrlvDto {
  @ApiProperty({
    description: 'Placa do veículo',
    example: 'ABC1D23',
  })
  @IsString()
  @IsNotEmpty()
  placa: string;

  @ApiProperty({
    description: 'Número do chassi do veículo',
    example: '9BWZZZ377VT001234',
  })
  @IsString()
  @IsNotEmpty()
  chassi: string;

  @ApiPropertyOptional({
    description: 'Ano de fabricação do veículo',
    example: 2021,
  })
  @IsInt()
  @IsOptional()
  ano_fabricacao?: number | null;

  @ApiPropertyOptional({
    description: 'Ano do modelo do veículo',
    example: 2022,
  })
  @IsInt()
  @IsOptional()
  ano_modelo?: number | null;

  @ApiPropertyOptional({
    description: 'Ano do exercício atual do licenciamento',
    example: 2026,
  })
  @IsInt()
  @IsOptional()
  exercicio?: number | null;

  @ApiPropertyOptional({
    description: 'Número do CRV (Certificado de Registro de Veículo)',
    example: '1234567890',
  })
  @IsString()
  @IsOptional()
  crv?: string | null;

  @ApiPropertyOptional({
    description: 'Número do Código RENAVAM',
    example: '00123456789',
  })
  @IsString()
  @IsOptional()
  renavam?: string | null;

  @ApiPropertyOptional({
    description: 'Marca do veículo',
    example: 'Volvo',
  })
  @IsString()
  @IsOptional()
  marca?: string | null;

  @ApiPropertyOptional({
    description: 'Modelo do veículo',
    example: 'FH 540 6x4',
  })
  @IsString()
  @IsOptional()
  modelo?: string | null;

  @ApiPropertyOptional({
    description: 'Espécie do veículo (ex: Carga, Passageiro)',
    example: 'Carga',
  })
  @IsString()
  @IsOptional()
  especie?: string | null;

  @ApiPropertyOptional({
    description: 'Tipo do veículo (ex: Trator, Reboque)',
    example: 'Caminhão Trator',
  })
  @IsString()
  @IsOptional()
  tipo?: string | null;

  @ApiPropertyOptional({
    description: 'UF do registro do veículo (sigla com 2 caracteres)',
    example: 'PR',
  })
  @IsString()
  @Length(2, 2)
  @IsOptional()
  uf?: string | null;
}
