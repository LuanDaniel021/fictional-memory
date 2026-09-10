import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('ipva')
export class Ipva {
  @ApiProperty({
    description: 'ID único do registro de IPVA',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyOptional({
    description: 'ID do CRLV vinculado a este IPVA',
    example: 3,
    nullable: true,
  })
  @Column({ type: 'integer', nullable: true })
  crlv_id: number | null;

  @ApiPropertyOptional({
    description: 'Ano de referência do imposto',
    example: 2026,
    type: Number,
    nullable: true,
  })
  @Column({ type: 'integer', nullable: true })
  ano_referencia: number | null;

  @ApiPropertyOptional({
    description: 'Data de vencimento do IPVA',
    example: '2026-03-15',
    nullable: true,
  })
  @Column({ type: 'date', nullable: true })
  data_vencimento: string | null;

  @ApiPropertyOptional({
    description: 'Valor total do IPVA (em R$)',
    example: 2450.0,
    type: Number,
    nullable: true,
  })
  @Column({ type: 'numeric', nullable: true })
  valor: number | null;

  @ApiPropertyOptional({
    description: 'Status do pagamento (ex: Pago, Pendente, Atrasado)',
    example: 'Pago',
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  status: string | null;
}
