
import { Medicao } from "./entities/medicao.entity";

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
        return this.desgaste() / this.distancia();
    }

    porcentual(): number
    {
        return (this.distancia() / this.atual.sulco) * 100;
    }
}