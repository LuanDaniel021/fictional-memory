
import { CreateMedicaoDto } from "./create-medicoes.dto";

export class Calculo {
    constructor(
        readonly atual: CreateMedicaoDto,
        readonly anterior: CreateMedicaoDto
    ) {}

    distancia(): number {
        return this.anterior.km - this.atual.km;
    }
    
    desgaste(): number {
        return this.atual.sulco - this.anterior.sulco;
    }

    taxa(): number {
        const dist = this.distancia();
        if ( dist !== 0 )
        {
            return  this.desgaste() / dist;
        }
        return 0
    }

    porcentual(): number {
        if ( this.atual.sulco !== 0 )
        {    
            return (this.desgaste() / this.atual.sulco) * 100;
        }
        return 0;
    }
}
