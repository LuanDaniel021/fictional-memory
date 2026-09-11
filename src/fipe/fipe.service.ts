import { BadRequestException, Injectable } from '@nestjs/common';

export type TipoFipe = 'carros' | 'motos' | 'caminhoes';

export interface FipeMarca {
  codigo: number;
  nome: string;
}

export interface FipeModeloLista {
  modelos: Array<{ codigo: number; nome: string }>;
  anos: Array<{ codigo: string; nome: string }>;
}

export interface FipeAno {
  codigo: string;
  nome: string;
}

export interface FipeValorVeiculo {
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  TipoVeiculo: number;
  SiglaCombustivel: string;
  DataConsulta: string;
}

@Injectable()
export class FipeService {
  private readonly baseUrl = 'https://parallelum.com.br/fipe/api/v1';

  private async request<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`);

    if (!response.ok) {
      throw new BadRequestException(
        `Falha ao consultar a API da FIPE: ${response.status} ${response.statusText}`,
      );
    }

    return response.json() as Promise<T>;
  }

  private validarTipo(tipo: string): TipoFipe {
    const tiposValidos: TipoFipe[] = ['carros', 'motos', 'caminhoes'];

    if (!tiposValidos.includes(tipo as TipoFipe)) {
      throw new BadRequestException(
        `Tipo inválido. Use um dos valores: ${tiposValidos.join(', ')}`,
      );
    }

    return tipo as TipoFipe;
  }

  async getMarcas(tipo: string): Promise<FipeMarca[]> {
    const tipoValido = this.validarTipo(tipo);
    return this.request<FipeMarca[]>(`/${tipoValido}/marcas`);
  }

  async getModelos(tipo: string, marcaId: number | string): Promise<FipeModeloLista> {
    const tipoValido = this.validarTipo(tipo);
    const marca = Number(marcaId);

    if (!Number.isInteger(marca) || marca <= 0) {
      throw new BadRequestException('Código da marca inválido.');
    }

    return this.request<FipeModeloLista>(`/${tipoValido}/marcas/${marca}/modelos`);
  }

  async getAnos(tipo: string, marcaId: number | string, modeloId: number | string): Promise<FipeAno[]> {
    const tipoValido = this.validarTipo(tipo);
    const marca = Number(marcaId);
    const modelo = Number(modeloId);

    if (!Number.isInteger(marca) || marca <= 0) {
      throw new BadRequestException('Código da marca inválido.');
    }

    if (!Number.isInteger(modelo) || modelo <= 0) {
      throw new BadRequestException('Código do modelo inválido.');
    }

    return this.request<FipeAno[]>(`/${tipoValido}/marcas/${marca}/modelos/${modelo}/anos`);
  }

  async getValorVeiculo(
    tipo: string,
    marcaId: number | string,
    modeloId: number | string,
    ano: string,
  ): Promise<FipeValorVeiculo> {
    const tipoValido = this.validarTipo(tipo);
    const marca = Number(marcaId);
    const modelo = Number(modeloId);

    if (!Number.isInteger(marca) || marca <= 0) {
      throw new BadRequestException('Código da marca inválido.');
    }

    if (!Number.isInteger(modelo) || modelo <= 0) {
      throw new BadRequestException('Código do modelo inválido.');
    }

    if (!ano || ano.trim() === '') {
      throw new BadRequestException('Ano do veículo inválido.');
    }

    return this.request<FipeValorVeiculo>(`/${tipoValido}/marcas/${marca}/modelos/${modelo}/anos/${encodeURIComponent(ano)}`);
  }

  async getDadosVeiculoPorAno(
    tipo: string,
    marcaId: number | string,
    modeloId: number | string,
    ano: string,
  ) {
    const valor = await this.getValorVeiculo(tipo, marcaId, modeloId, ano);

    return {
      mensagem: 'Dados da FIPE consultados com sucesso!',
      data: valor,
    };
  }
}
