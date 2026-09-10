
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Pneu {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    marca: string;

    @Column()
    status: string;

    @Column()
    posicao: string;

    @Column()
    caminhao_id: number;

    @Column()
    sulco_inicial_mm: number;
}
