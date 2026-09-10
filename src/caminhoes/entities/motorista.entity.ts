
import { Entity, Column } from 'typeorm';

@Entity()
export class Motorista {
    @Column()
    nome: string;

    @Column()
    cpf: string;

    @Column()
    numero_cnh: string;
    
    @Column()
    categoria_cnh: string;
}
