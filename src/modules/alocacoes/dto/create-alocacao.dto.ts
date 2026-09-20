import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsNumber, IsString, Min } from "class-validator"

export class CreateAlocacaoDto {
    
    @IsNumber()
    @ApiProperty({
        example : 1
    })
    pneu : number

    @IsNumber()
    @Min(0)
    @ApiProperty({
        example : 0
    })
    eixo : number

    @IsString()
    @IsIn(['E', 'D'])
    @ApiProperty({
        example : 'E'
    })
    lado : 'E' | 'D'
    
    @IsNumber()
    @Min(0)
    @ApiProperty({
        example : 0
    })
    indice : number

}
