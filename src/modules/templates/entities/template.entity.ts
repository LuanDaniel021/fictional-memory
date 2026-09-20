
export class Template {

  id: number
  nome: string
  estrutura: string[]

  permite( eixo: number, lado: 'E' | 'D', indice: number ) {
    const _eixo = this.estrutura[eixo].trim().split(' ');

    if (!_eixo) {
      return false;
    }

    return (_eixo[{ 'E': 0, 'D': 1 }[lado]])[indice+1] !== undefined;
  }

}
