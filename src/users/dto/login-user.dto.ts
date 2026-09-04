import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty, MinLength } from "class-validator";

export class LoginUserDto {
    @IsEmail()
    @ApiProperty({ example: 'usuario@email.com' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({ example: '123456' })
    password: string;
}
