import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Crlv } from '../../crlvs/entities/crlv.entity';
import { Motorista } from '../../motoristas/entities/motorista.entity';
import { Viagem } from '../../viagens/entities/viagem.entity';
import { Pneu } from '../../pneus/entities/pneu.entity';
import { Manutencao } from '../../manutencoes/entities/manutencao.entity';


@Entity('caminhao')
export class Caminhao {
  @ApiProperty({
    description: 'ID único do caminhão',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyOptional({
    description: 'Quilometragem atual do veículo',
    example: 125000.5,
    type: Number,
  })
  @Column({ type: 'numeric', nullable: true })
  km_atual: number | null;

  @ApiPropertyOptional({
    description:
      'Status operacional do caminhão (ex: Ativo, Em Manutenção, Inativo)',
    example: 'Ativo',
  })
  @Column({ type: 'varchar', nullable: true })
  status: string | null;

  @ApiPropertyOptional({
    description: 'ID do registro do CRLV vinculado',
    example: 3,
  })
  @Column({ type: 'integer', nullable: true })
  crlv_id: number | null;

  @ApiPropertyOptional({
    description: 'ID do motorista responsável',
    example: 12,
  })
  @Column({ type: 'integer', nullable: true })
  motorista_id: number | null;

  // --- Relacionamentos Opcionais ---

  @ApiPropertyOptional({
    description: 'Dados do documento CRLV associado',
    type: () => Crlv,
  })
  //@ManyToOne(() => Crlv, (crlv) => crlv.caminhoes)
  @JoinColumn({ name: 'crlv_id' })
  crlv?: Crlv | null;

  @ApiPropertyOptional({
    description: 'Motorista vinculado',
    type: () => Motorista,
  })
  //@ManyToOne(() => Motorista, (motorista) => motorista.caminhoes)
  @JoinColumn({ name: 'motorista_id' })
  motorista?: Motorista | null;

  @ApiPropertyOptional({
    description: 'Pneus instalados no caminhão',
    type: () => [Pneu],
  })
  //@OneToMany(() => Pneu, (pneu) => pneu.caminhao)
  pneus?: Pneu[];
}
