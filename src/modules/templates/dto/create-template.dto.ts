import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateTemplateDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: `Caminhão 6x2`
  })
  nome: string

  @IsArray()
  @ArrayNotEmpty()
  @IsString({each: true})
  @IsNotEmpty({each: true})
  @ApiProperty({
    example: [
      'Eed Ded',
      'Eed Ded',
      'Eed Ded'
    ]
  })
  estrutura: string[]
}
