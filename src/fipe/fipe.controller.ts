import { Controller, Get, Param } from '@nestjs/common';
import { FipeService } from './fipe.service';

@Controller('fipe')
export class FipeController {
  constructor(private readonly fipeService: FipeService) {}

  @Get(':tipo/marcas')
  getMarcas(@Param('tipo') tipo: string) {
    return this.fipeService.getMarcas(tipo);
  }

  @Get(':tipo/marcas/:marca/modelos')
  getModelos(@Param('tipo') tipo: string, @Param('marca') marca: string) {
    return this.fipeService.getModelos(tipo, marca);
  }

  @Get(':tipo/marcas/:marca/modelos/:modelo/anos')
  getAnos(
    @Param('tipo') tipo: string,
    @Param('marca') marca: string,
    @Param('modelo') modelo: string,
  ) {
    return this.fipeService.getAnos(tipo, marca, modelo);
  }

  @Get(':tipo/marcas/:marca/modelos/:modelo/anos/:ano')
  getValorVeiculo(
    @Param('tipo') tipo: string,
    @Param('marca') marca: string,
    @Param('modelo') modelo: string,
    @Param('ano') ano: string,
  ) {
    return this.fipeService.getDadosVeiculoPorAno(tipo, marca, modelo, ano);
  }
}
