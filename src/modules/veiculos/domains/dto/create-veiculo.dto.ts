import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, ValidateNested, IsInt, IsArray, ArrayUnique, IsNotEmpty } from "class-validator";
import { CreateCrlvDto } from "../../../crlvs/dto/create-crlv.dto";



export class CreateVeiculoDto {
  
  @IsNumber()
  @ApiProperty({ example: 1000 })
  km: number;

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
//      modelo: 'Actros',
      especie: 'Caminhão de Carga',
      renavam: '123456789012',
      exercicio: 2023,
      ano_modelo: 2022,
      ano_fabricacao: 2021,
    },
  })
  crlv: CreateCrlvDto;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Ativo', required: false })
  status?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Caminhão 6x2'
  })
  template: string;
}
