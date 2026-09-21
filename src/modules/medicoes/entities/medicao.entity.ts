
import { Entity } from 'typeorm';

@Entity()
export class Medicao {
    id      : number
    pneu    : number
    km      : number
    sulco   : number
    pressao : number
}
