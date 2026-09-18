import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class AdminUpdateUserDto {
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({ example: 'usuario@email.com' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @ApiPropertyOptional({ example: '123456' })
  senha?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'José Silva' })
  nome?: string;

  @IsOptional()
  @IsEnum(['User', 'Admin'])
  @ApiPropertyOptional({ example: 'Admin', enum: ['User', 'Admin'] })
  role?: 'User' | 'Admin';
}
