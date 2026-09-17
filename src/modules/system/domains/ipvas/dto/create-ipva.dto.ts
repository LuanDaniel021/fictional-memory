import {
  IsInt,
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateIpvaDto {
  @ApiPropertyOptional({
    description: 'ID do CRLV vinculado a este IPVA',
    example: 3,
  })
  @IsInt()
  @IsOptional()
  crlv_id?: number | null;

  @ApiPropertyOptional({
    description: 'Ano de referência do imposto',
    example: 2026,
  })
  @IsInt()
  @IsOptional()
  ano_referencia?: number | null;

  @ApiPropertyOptional({
    description: 'Data de vencimento do IPVA (formato YYYY-MM-DD)',
    example: '2026-03-15',
  })
  @IsDateString()
  @IsOptional()
  data_vencimento?: string | null;

  @ApiPropertyOptional({
    description: 'Valor total do IPVA (em R$)',
    example: 2450.0,
  })
  @IsNumber()
  @IsOptional()
  valor?: number | null;

  @ApiPropertyOptional({
    description: 'Status do pagamento (ex: Pago, Pendente, Atrasado)',
    example: 'Pago',
  })
  @IsString()
  @IsOptional()
  status?: string | null;
}
