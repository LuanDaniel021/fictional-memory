import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateCrlvDto } from '../../crlvs/dto/create-crlv.dto';

export class CreateCaminhaoDto {
  @IsNumber()
  @ApiProperty({ example: 1000 })
  km_atual: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Ativo', required: false })
  status?: string;

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
  @IsInt()
  @ApiProperty({
    required: false,
    example: 1,
  })
  motorista_id?: number;

  @IsOptional()
  @ApiProperty({
    required: false,
    example: [
      1,2,3
    ],
  })
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  pneus?: number[];
}
