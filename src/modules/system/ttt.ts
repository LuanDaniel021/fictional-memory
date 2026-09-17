class Veiculo {
    id         : number
}

class Pneu {
    id         : number
    sulco      : number // original value
}

class Instalacao {
    id         : number
    pneu       : number
    veiculo    : number
}

class Alocacao {
    id         : number
    eixo       : string
    lado       : string
    indice     : number
    instalacao : number
}