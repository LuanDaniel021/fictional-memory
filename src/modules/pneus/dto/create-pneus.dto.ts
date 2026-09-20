import { IsInt, IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreatePneuDto {
  
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example:"Michelin"
  })
  marca: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    example:"Grande"
  })
  modelo : string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    example:"2.0"
  })
  medida : string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    example:"12-06-22"
  })
  fabricacao : string;

}
