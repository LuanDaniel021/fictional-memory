import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


@Entity('medicao_pneu')
export class MedicaoPneu {
  @ApiProperty({
    description: 'ID único da medição do pneu',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyOptional({
    description: 'ID do pneu medido',
    example: 1,
    nullable: true,
  })
  @Column({ type: 'integer', nullable: true })
  pneu_id: number | null;

  @ApiPropertyOptional({
    description: 'ID da viagem em que a medição foi realizada',
    example: 1,
    nullable: true,
  })
  @Column({ type: 'integer', nullable: true })
  viagem_id: number | null;

  @ApiPropertyOptional({
    description: 'Profundidade atual do sulco do pneu (em milímetros)',
    example: 12.3,
    type: Number,
    nullable: true,
  })
  @Column({ type: 'numeric', nullable: true })
  profundidade_atual_mm: number | null;

  @ApiPropertyOptional({
    description: 'Data em que a medição foi registrada',
    example: '2026-08-27',
    nullable: true,
  })
  @Column({ type: 'date', nullable: true })
  data_medicao: string | null;
}
