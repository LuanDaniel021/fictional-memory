import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateAlocacaoDto {
    
    @IsNumber()
    @ApiProperty({
        example : 1
    })
    pneu : number

    @IsNumber()
    @ApiProperty({
        example : 0
    })
    eixo : number

    @IsString()
    @ApiProperty({
        example : 'E'
    })
    lado : 'E' | 'D'
    
    @IsNumber()
    @ApiProperty({
        example : 0
    })
    indice : number

}
