
export class Template {

    private struct : string[][]

    constructor( text : string ) {
        this.struct = text
            .trim()
            .split('\n')
            .map(
                ( line ) => line.trim().split(/\s+/)
            )
    }

    permite( eixo: number, lado: 'E' | 'D', indice: number ): boolean
    {
        const _eixo = this.struct[eixo];

        if ( !_eixo ) {
            return false;
        }

        return _eixo[{ E: 0, D: 1 }[lado]][indice] !== undefined;
    }

}