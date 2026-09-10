import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMotoristaDto {
  @ApiPropertyOptional({
    description: 'Nome completo do motorista',
    example: 'Carlos Silva',
  })
  @IsString()
  @IsOptional()
  nome?: string | null;

  @ApiPropertyOptional({
    description: 'Número do CPF do motorista',
    example: '123.456.789-00',
  })
  @IsString()
  @IsOptional()
  cpf?: string | null;

  @ApiPropertyOptional({
    description: 'Número do registro da CNH',
    example: '12345678900',
  })
  @IsString()
  @IsOptional()
  numero_cnh?: string | null;

  @ApiPropertyOptional({
    description: 'Categoria da CNH (ex: E, D, AE)',
    example: 'E',
  })
  @IsString()
  @IsOptional()
  categoria_cnh?: string | null;
}
