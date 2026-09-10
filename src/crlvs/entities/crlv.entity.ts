
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('crlv')
export class Crlv {

  @ApiProperty({
    description: 'ID único do registro de CRLV',
    example: 3,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Placa do veículo',
    example: 'ABC1D23',
  })
  @Column({
    type: 'varchar',
    unique: true
  })
  placa: string;

  @ApiProperty({
    description: 'Número do chassi do veículo',
    example: '9BWZZZ377VT001234',
  })
  @Column({
    type: 'varchar',
    unique: true
  })
  chassi: string;

  @ApiPropertyOptional({
    description: 'Ano de fabricação do veículo',
    example: 2021,
    type: Number,
    nullable: true,
  })
  @Column({
    type: 'integer',
    nullable: true
  })
  ano_fabricacao: number | null;

  @ApiPropertyOptional({
    description: 'Ano do modelo do veículo',
    example: 2022,
    type: Number,
    nullable: true,
  })
  @Column({
    type: 'integer',
    nullable: true
  })
  ano_modelo: number | null;

  @ApiPropertyOptional({
    description: 'Ano do exercício atual do licenciamento',
    example: 2026,
    type: Number,
    nullable: true,
  })
  @Column({
    type: 'integer',
    nullable: true
  })
  exercicio: number | null;

  @ApiPropertyOptional({
    description: 'Número do CRV (Certificado de Registro de Veículo)',
    example: '1234567890',
    nullable: true,
  })
  @Column({
    type: 'varchar',
    nullable: true
  })
  crv: string | null;

  @ApiPropertyOptional({
    description: 'Número do Código RENAVAM',
    example: '00123456789',
    nullable: true,
  })
  @Column({
    type: 'varchar',
    unique: true,
    nullable: true
  })
  renavam: string | null;

  @ApiPropertyOptional({
    description: 'Marca do veículo',
    example: 'Volvo',
    nullable: true,
  })
  @Column({
    type: 'varchar',
    nullable: true
  })
  marca: string | null;

  @ApiPropertyOptional({
    description: 'Modelo do veículo',
    example: 'FH 540 6x4',
    nullable: true,
  })
  @Column({
    type: 'varchar',
    nullable: true
  })
  modelo: string | null;

  @ApiPropertyOptional({
    description: 'Espécie do veículo (ex: Carga, Passageiro)',
    example: 'Carga',
    nullable: true,
  })
  @Column({
    type: 'varchar',
    nullable: true
  })
  especie: string | null;

  @ApiPropertyOptional({
    description: 'Tipo do veículo (ex: Trator, Reboque)',
    example: 'Caminhão Trator',
    nullable: true,
  })
  @Column({
    type: 'varchar',
    nullable: true
  })
  tipo: string | null;

  @ApiPropertyOptional({
    description: 'UF do registro do veículo (2 caracteres)',
    example: 'PR',
    nullable: true,
  })
  @Column({
    type: 'char',
    length: 2,
    nullable: true
  })
  uf: string | null;
}
