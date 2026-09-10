import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('motorista')
export class Motorista {
  @ApiProperty({
    description: 'ID único do motorista',
    example: 12,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyOptional({
    description: 'Nome completo do motorista',
    example: 'Carlos Silva',
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  nome: string | null;

  @ApiPropertyOptional({
    description: 'Número do CPF do motorista',
    example: '123.456.789-00',
    nullable: true,
  })
  @Column({ type: 'varchar', unique: true, nullable: true })
  cpf: string | null;

  @ApiPropertyOptional({
    description: 'Número do registro da CNH',
    example: '12345678900',
    nullable: true,
  })
  @Column({ type: 'varchar', unique: true, nullable: true })
  numero_cnh: string | null;

  @ApiPropertyOptional({
    description: 'Categoria da CNH (ex: E, D, AE)',
    example: 'E',
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  categoria_cnh: string | null;
}
