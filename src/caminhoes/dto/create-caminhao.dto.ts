import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCaminhaoDto {

    @ApiProperty({ example: '1000' })
    km_atual: number

    @ApiProperty({ example: 'Ativo' })
    status: string

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
    crlv: object

    @ApiProperty({
      example: {
        "nome": "João da Silva",
        "cpf": "123.456.789-00",
        "numero_cnh": "1234567890",
        "categoria_cnh": "C"
      }
    })
    motorista: object

    @ApiProperty({
      example: [{
        "marca": "Pirelli",
        "modelo": "Scorpion",
        "tamanho": "275/70 R22.5",
        "pressao": 8.5
      }]
    })
    pneus: []
}
