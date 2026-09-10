import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('manutencao')
export class Manutencao {
  @ApiProperty({
    description: 'ID único do registro de manutenção',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyOptional({
    description: 'ID do caminhão que recebeu a manutenção',
    example: 1,
    nullable: true,
  })
  @Column({ type: 'integer', nullable: true })
  caminhao_id: number | null;

  @ApiPropertyOptional({
    description:
      'Tipo de manutenção realizada (ex: Preventiva, Corretiva, Troca de Óleo)',
    example: 'Preventiva',
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  tipo: string | null;

  @ApiPropertyOptional({
    description: 'Quilometragem do caminhão no momento do serviço',
    example: 125000.0,
    type: Number,
    nullable: true,
  })
  @Column({ type: 'numeric', nullable: true })
  km_realizacao: number | null;

  @ApiPropertyOptional({
    description: 'Data de realização da manutenção',
    example: '2026-08-20',
    nullable: true,
  })
  @Column({ type: 'date', nullable: true })
  data_manutencao: string | null;

  @ApiPropertyOptional({
    description: 'Custo total do serviço (em R$)',
    example: 850.5,
    type: Number,
    nullable: true,
  })
  @Column({ type: 'numeric', nullable: true })
  custo: number | null;

  @ApiPropertyOptional({
    description: 'Observações e detalhes sobre as peças ou serviços prestados',
    example: 'Troca do filtro de combustível e alinhamento do eixo dianteiro.',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  observacoes: string | null;
}
