
import { Entity } from 'typeorm';

@Entity()
export class Medicao {
    km      : number
    sulco   : number
    pressao : number
}
