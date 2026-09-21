import { IsNumber, Max, Min } from 'class-validator';

export class CreateCondicaoDto {
    @IsNumber()
    @Min(0)
    @Max(100)
    porcentual : number
}
