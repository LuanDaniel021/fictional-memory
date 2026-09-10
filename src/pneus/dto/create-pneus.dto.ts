import { IsInt, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';


export class CreatePneuDto {
  @ApiPropertyOptional({
    description: 'ID do caminhão em que o pneu está instalado',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  caminhao_id?: number | null;

  @ApiPropertyOptional({
    description: 'Posição do pneu no veículo',
    example: 'Dianteiro Esquerdo',
  })
  @IsString()
  @IsOptional()
  posicao?: string | null;

  @ApiPropertyOptional({
    description: 'Marca / Fabricante do pneu',
    example: 'Michelin',
  })
  @IsString()
  @IsOptional()
  marca?: string | null;

  @ApiPropertyOptional({
    description: 'Profundidade inicial do sulco da banda de rodagem (em mm)',
    example: 15.5,
  })
  @IsNumber()
  @IsOptional()
  sulco_inicial_mm?: number | null;

  @ApiPropertyOptional({
    description: 'Status do pneu (ex: Em uso, Descartado, Manutenção)',
    example: 'Em uso',
  })
  @IsString()
  @IsOptional()
  status?: string | null;
}
