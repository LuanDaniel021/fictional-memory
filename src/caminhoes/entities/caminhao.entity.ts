
import { Entity, Column } from "typeorm";
import { Crlv } from "./crlv.entity";
import { Pneu } from "./pneu.entity";
import { Motorista } from "./motorista.entity";
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
