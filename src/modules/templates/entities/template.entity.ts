
export class Template {

  id: number

  nome: string

  estrutura: string[]

  permite(eixo: number, lado: 'E' | 'D', indice: number): boolean {
    const _eixo = this.estrutura[eixo];

    if (!_eixo) {
      return false;
    }

    return _eixo[{ E: 0, D: 1 }[lado]][indice] !== undefined;
  }

}
