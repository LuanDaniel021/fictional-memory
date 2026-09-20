export interface MarcaFipe {
  codigo: string;
  nome: string;
}

export interface ModeloFipe {
  codigo: number;
  nome: string;
}

export interface AnoFipe {
  codigo: string;
  nome: string;
}

export interface DetalhesVeiculoFipe {
  TipoVeiculo: number;
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  SiglaCombustivel: string;
}

export type TipoVeiculo = 'carros' | 'motos' | 'caminhoes';

export interface FipeFiltroInput {
  tipo?: TipoVeiculo;
  marca?: string | number;
  modelo?: string | number;
  ano?: string | number;
}

export class Fipe {
  private static readonly BASE_URL = 'https://parallelum.com.br/fipe/api/v1';

  private _tipo: TipoVeiculo = 'carros';
  private _marca?: string;
  private _modelo?: string;
  private _ano?: string;

  private constructor() {}

  /**
   * Instancia o Builder a partir dos dados recebidos diretamente da sua API.
   * Aceita IDs, nomes parciais ou combinações dinâmicas.
   */
  static de(dados: FipeFiltroInput): Fipe {
    const builder = new Fipe();
    if (dados.tipo) builder._tipo = dados.tipo;
    if (dados.marca !== undefined) builder._marca = String(dados.marca);
    if (dados.modelo !== undefined) builder._modelo = String(dados.modelo);
    if (dados.ano !== undefined) builder._ano = String(dados.ano);
    return builder;
  }

  static tipo(tipo: TipoVeiculo): Fipe {
    const builder = new Fipe();
    builder._tipo = tipo;
    return builder;
  }

  static marca(marca: string | number): Fipe {
    const builder = new Fipe();
    return builder.marca(marca);
  }

  static async existe(): Promise<boolean> {
    try {
      const response = await fetch(`${Fipe.BASE_URL}/carros/marcas`);
      return response.ok;
    } catch {
      return false;
    }
  }

  marca(marca: string | number): this {
    this._marca = String(marca);
    return this;
  }

  modelo(modelo: string | number): this {
    this._modelo = String(modelo);
    return this;
  }

  ano(ano: string | number): this {
    this._ano = String(ano);
    return this;
  }

  // --- MÉTODOS DE BUSCA EXPLÍCITOS ---

  /**
   * Busca as marcas (ou resolve a marca atual se um filtro/ID foi informado)
   */
  async buscarMarcas(): Promise<MarcaFipe[]> {
    return this.fetchJson<MarcaFipe[]>('/marcas');
  }

  /**
   * Busca os modelos da marca informada no Builder
   */
  async buscarModelos(): Promise<ModeloFipe[]> {
    const marcaObj = await this.resolverMarca();
    const data = await this.fetchJson<{ modelos: ModeloFipe[] }>(`/marcas/${marcaObj.codigo}/modelos`);
    return data.modelos;
  }

  /**
   * Busca os anos do modelo informado no Builder
   */
  async buscarAnos(): Promise<AnoFipe[]> {
    const marcaObj = await this.resolverMarca();
    const modeloObj = await this.resolverModelo(marcaObj.codigo);
    return this.fetchJson<AnoFipe[]>(`/marcas/${marcaObj.codigo}/modelos/${modeloObj.codigo}/anos`);
  }

  /**
   * Retorna os detalhes e o preço FIPE do veículo
   */
  async consultarPreco(): Promise<DetalhesVeiculoFipe> {
    const marcaObj = await this.resolverMarca();
    const modeloObj = await this.resolverModelo(marcaObj.codigo);
    const anoObj = await this.resolverAno(marcaObj.codigo, String(modeloObj.codigo));

    return this.fetchJson<DetalhesVeiculoFipe>(
      `/marcas/${marcaObj.codigo}/modelos/${modeloObj.codigo}/anos/${anoObj.codigo}`
    );
  }

  // --- MÉTODOS INTERNOS DE RESOLUÇÃO (Suporta IDs diretos ou busca por texto) ---

  private async fetchJson<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${Fipe.BASE_URL}/${this._tipo}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Erro na API FIPE (${response.status}) ao acessar ${endpoint}`);
    }
    return response.json();
  }

  private async resolverMarca(): Promise<MarcaFipe> {
    if (!this._marca) throw new Error('Marca não foi informada.');
    
    const marcas = await this.buscarMarcas();
    const termo = this._marca.toLowerCase();

    const encontrada = marcas.find(
      (m) => m.codigo === this._marca || m.nome.toLowerCase().includes(termo)
    );

    if (!encontrada) throw new Error(`Marca '${this._marca}' não encontrada.`);
    return encontrada;
  }

  private async resolverModelo(codigoMarca: string): Promise<ModeloFipe> {
    if (!this._modelo) throw new Error('Modelo não foi informado.');

    const data = await this.fetchJson<{ modelos: ModeloFipe[] }>(`/marcas/${codigoMarca}/modelos`);
    const termo = this._modelo.toLowerCase();

    const encontrado = data.modelos.find(
      (m) => String(m.codigo) === this._modelo || m.nome.toLowerCase().includes(termo)
    );

    if (!encontrado) throw new Error(`Modelo '${this._modelo}' não encontrado.`);
    return encontrado;
  }

  private async resolverAno(codigoMarca: string, codigoModelo: string): Promise<AnoFipe> {
    if (!this._ano) throw new Error('Ano não foi informado.');

    const anos = await this.fetchJson<AnoFipe[]>(`/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`);
    const termo = this._ano.toLowerCase();

    const encontrado = anos.find(
      (a) => a.codigo === this._ano || a.nome.toLowerCase().includes(termo)
    );

    if (!encontrado) throw new Error(`Ano '${this._ano}' não encontrado.`);
    return encontrado;
  }
}