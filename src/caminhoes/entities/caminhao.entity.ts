
import { Entity, Column } from 'typeorm';
import { Pneu } from './pneu.entity';
import { Motorista } from './motorista.entity';
import { Crlv } from '../../crlvs/entities/crlv.entity';

@Entity()
export class Caminhao {
    
  @Column()
  km_atual: number;
  
  @Column()
  status: string;

  crlv: Crlv;

  motorista: Motorista;

  pneus: Pneu[];
}
