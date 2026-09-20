
import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class CreateMedicaoDto {

    @IsNumber()
    @ApiProperty({
        example: 100
    })
    km : number

    @IsNumber()
    @ApiProperty({
        example: 20
    })
    sulco : number

    @IsNumber()
    @ApiProperty({
        example: 100
    })
    pressao : number
}
