
import { Medicao } from "./entities/medicao.entity";
import { BadRequestException } from "@nestjs/common";

export class Calculo {

    constructor( private readonly atual:Medicao, private readonly anterior:Medicao ) {}

    distancia(): number
    {
        return this.atual.km - this.anterior.km;
    }

    desgaste()
    {
        return this.anterior.sulco - this.atual.sulco;
    }

    taxa(): number
    {
        if (this.distancia() <= 0) {
            throw new BadRequestException('A medição atual deve ter quilometragem maior que a anterior.');
        }

        return this.desgaste() / this.distancia();
    }

    porcentual(): number
    {
        if (this.anterior.sulco <= 0) {
            throw new BadRequestException('A profundidade do sulco anterior deve ser maior que zero.');
        }

        return (this.desgaste() / this.anterior.sulco) * 100;
    }
}