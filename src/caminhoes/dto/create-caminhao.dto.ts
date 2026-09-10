import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateCrlvDto } from "../../crlvs/dto/create-crlv.dto";
import { CreateMotoristaDto } from "../../motoristas/dto/create-motorista.dto";
import { Type } from "class-transformer";
import { CreatePneuDto } from "../../pneus/dto/create-pneus.dto";

export class CreateCaminhaoDto {

    @IsNumber()
    @ApiProperty({ example: '1000' })
    km_atual: number

    @IsString()
    @ApiProperty({ example: 'Ativo' })
    status: string

    @ValidateNested()
    @Type(()=>CreateCrlvDto)
    @ApiProperty({
      example: {
        "uf": "SP",
        "crv": "123456789",
        "tipo": "Caminhão",
        "marca": "Mercedes-Benz",
        "placa": "ABC-1234",
        "chassi": "9BM12345678901234",
        "modelo": "Actros",
        "especie": "Caminhão de Carga",
        "renavam": "123456789012",
        "exercicio": 2023,
        "ano_modelo": 2022,
        "ano_fabricacao": 2021
      }
    })
    crlv: CreateCrlvDto

    @IsOptional()
    @ValidateNested()
    @Type(()=>CreateMotoristaDto)
    @ApiProperty({
      example: {
        "nome": "João da Silva",
        "cpf": "123.456.789-00",
        "numero_cnh": "1234567890",
        "categoria_cnh": "C"
      }
    })
    motorista: CreateMotoristaDto

    @IsOptional()
    @IsOptional()
    @ValidateNested()
    @Type(()=>CreatePneuDto)
    @ApiProperty({
      example: [{
        "marca": "Pirelli",
        "modelo": "Scorpion",
        "tamanho": "275/70 R22.5",
        "pressao": 8.5
      }]
    })
    pneus: CreatePneuDto[]
}
