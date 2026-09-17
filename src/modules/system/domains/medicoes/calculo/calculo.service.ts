
export class Inicial {
    constructor(
        readonly km: number,
        readonly sulco: number
    ) {}
}

export class Final {
    constructor(
        readonly km: number,
        readonly sulco: number
    ) {}
}

export class Calculo {
    constructor(
        readonly inicial: Inicial,
        readonly final: Final
    ) {}

    distancia(): number {
        return this.final.km - this.inicial.km;
    }
    
    desgaste(): number {
        return this.inicial.sulco - this.final.sulco;
    }

    taxa(): number {
        const dist = this.distancia();
        return dist === 0 ? 0 : this.desgaste() / dist;
    }

    porcentual(): number {
        if (this.inicial.sulco === 0) return 0;
        return (this.desgaste() / this.inicial.sulco) * 100;
    }
}
