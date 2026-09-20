
export class Template {

  id: number
  nome: string
  estrutura: string[]

  permite( eixo: number, lado: 'E' | 'D', indice: number ) {
    const linha = this.estrutura[eixo]

    if (!linha) {
      return false;
    }

    const _eixo = linha.trim().split(' ');

    return (_eixo[{ 'E': 0, 'D': 1 }[lado]])[indice+1] !== undefined;
  }

}
