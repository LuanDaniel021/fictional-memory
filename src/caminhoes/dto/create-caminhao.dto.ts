import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateCrlvDto } from '../../crlvs/dto/create-crlv.dto';
import { CreateMotoristaDto } from '../../motoristas/dto/create-motorista.dto';
import { CreatePneuDto } from '../../pneus/dto/create-pneus.dto';

export class CreateCaminhaoDto {
  @IsNumber()
  @ApiProperty({ example: 1000 })
  km_atual: number;

  @IsString()
  @ApiProperty({ example: 'Ativo' })
  status: string;

  @ValidateNested()
  @Type(() => CreateCrlvDto)
  @ApiProperty({
    example: {
      uf: 'SP',
      crv: '123456789',
      tipo: 'Caminhão',
      marca: 'Mercedes-Benz',
      placa: 'ABC-1234',
      chassi: '9BM12345678901234',
      modelo: 'Actros',
      especie: 'Caminhão de Carga',
      renavam: '123456789012',
      exercicio: 2023,
      ano_modelo: 2022,
      ano_fabricacao: 2021,
    },
  })
  crlv: CreateCrlvDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateMotoristaDto)
  @ApiProperty({
    required: false,
    example: {
      nome: 'João da Silva',
      cpf: '123.456.789-00',
      numero_cnh: '1234567890',
      categoria_cnh: 'C',
    },
  })
  motorista?: CreateMotoristaDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePneuDto)
  @ApiProperty({
    required: false,
    type: [CreatePneuDto],
    example: [
      {
        marca: 'Pirelli',
        modelo: 'Scorpion',
        posicao: 'Dianteiro Esquerdo',
        sulco_inicial_mm: 15.5,
        status: 'Em uso',
      },
    ],
  })
  pneus?: CreatePneuDto[];
}
