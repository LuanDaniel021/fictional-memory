import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class AdminCreateUserDto {
  @IsEmail()
  @ApiProperty({ example: 'usuario@email.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ example: '123456' })
  senha: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'José Silva' })
  nome?: string;

  @IsOptional()
  @IsEnum(['User', 'admin'])
  @ApiPropertyOptional({ example: 'User', enum: ['User', 'admin'] })
  role?: 'User' | 'admin';
}
