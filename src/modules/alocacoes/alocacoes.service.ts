import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAlocacaoDto } from './dto/create-alocacao.dto';
import { UpdateAlocacaoDto } from './dto/update-alocacao.dto';
import { Alocacao } from './entities/alocacao.entity';
import { VeiculosService } from '../veiculos/veiculos.service';
import { SupabaseService } from '../../supabase/supabase.service';
import { PneusService } from '../pneus/pneus.service';
import { Template } from '../templates/entities/template.entity';

@Injectable()
export class AlocacoesService {

  constructor(
    private readonly supabase: SupabaseService,
    private readonly veiculosService: VeiculosService,
    private readonly pneusService: PneusService,
  ) {}

  async create(placa: string, dtos: CreateAlocacaoDto[]): Promise<Alocacao[]> {
    const client = this.supabase.getClient();

    if (dtos.length === 0) {
      throw new BadRequestException('Informe pelo menos uma alocação.');
    }

    const pneuIds = dtos.map((dto) => dto.pneu);
    if (new Set(pneuIds).size !== pneuIds.length) {
      throw new BadRequestException('O mesmo pneu não pode ser informado mais de uma vez.');
    }

    const posicoes = dtos.map((dto) => `${dto.eixo}-${dto.lado}-${dto.indice}`);
    if (new Set(posicoes).size !== posicoes.length) {
      throw new BadRequestException('A mesma posição não pode ser informada mais de uma vez.');
    }

    // 1. Busca veículo e valida existência dos pneus
    const veiculo = await this.veiculosService.findOneByPlate(placa);
    const template = Template.of(
      veiculo.template.id,
      veiculo.template.nome,
      veiculo.template.estrutura,
    );
    await this.pneusService.findAllById(pneuIds);

    // 2. Valida se as posições são permitidas pelo template
    for (const dto of dtos) {
      if (!template.permite(dto.eixo, dto.lado, dto.indice)) {
        throw new BadRequestException(
          `Posição inválida no template: eixo ${dto.eixo}, lado ${dto.lado}, índice ${dto.indice}.`,
        );
      }
    }

    // 3. Buscar alocações existentes dos pneus e do veículo
    // Regra: Pneu já em outro veículo -> Rejeitar
    const { data: alocacoesPneus, error: alocacoesPneusError } = await client
      .from('alocacoes')
      .select('*')
      .in('pneu', pneuIds)

    if (alocacoesPneusError) {
      throw new InternalServerErrorException(`Erro ao buscar alocações: ${alocacoesPneusError.message}`);
    }

    const pneusEmOutrosVeiculos = (alocacoesPneus || []).filter(
      (aloc) => aloc.veiculo !== veiculo.id,
    );

    if (pneusEmOutrosVeiculos.length > 0) {
      throw new BadRequestException(
        'Um ou mais pneus já estão alocados em outro veículo.',
      );
    }

    // 4. Processar alocações do veículo atual
    const { data: alocacoesVeiculo, error: alocacoesVeiculoError } = await client
      .from('alocacoes')
      .select('*')
      .eq('veiculo', veiculo.id)

    if (alocacoesVeiculoError) {
      throw new InternalServerErrorException(`Erro ao buscar alocações do veículo: ${alocacoesVeiculoError.message}`);
    }

    const paraInativarIds: string[] = [];
    const registrosParaSalvar: any[] = [];

    for (const dto of dtos) {
      // Verifica se o pneu já está neste veículo em outra posição
      const alocacaoAtualPneu = alocacoesVeiculo?.find(
        (a) => a.pneu === dto.pneu,
      );

      // Verifica quem ocupa a posição de destino desejada
      const alocacaoNaPosicaoDestino = alocacoesVeiculo?.find(
        (a) =>
          a.eixo === dto.eixo &&
          a.lado === dto.lado &&
          a.indice === dto.indice,
      );

      // REGRA: Troca interna de posições no mesmo veículo
      if (
        alocacaoAtualPneu &&
        alocacaoNaPosicaoDestino &&
        alocacaoAtualPneu.id !== alocacaoNaPosicaoDestino.id
      ) {
        // Marca ambas as alocações antigas para inativação/remoção
        paraInativarIds.push(alocacaoAtualPneu.id, alocacaoNaPosicaoDestino.id);

        // Mova o pneu de destino para a posição original do pneu recebido
        registrosParaSalvar.push({
          veiculo: veiculo.id,
          pneu: alocacaoNaPosicaoDestino.pneu,
          eixo: alocacaoAtualPneu.eixo,
          lado: alocacaoAtualPneu.lado,
          indice: alocacaoAtualPneu.indice,
        });
      } else if (alocacaoNaPosicaoDestino) {
        // REGRA: Substituição simples (desativa o pneu anterior da posição)
        paraInativarIds.push(alocacaoNaPosicaoDestino.id);
      } else if (alocacaoAtualPneu) {
        // REGRA: Apenas moveu de posição dentro do mesmo veículo para um local vazio
        paraInativarIds.push(alocacaoAtualPneu.id);
      }

      // REGRA: Aloca o novo pneu/posição solicitada no DTO
      registrosParaSalvar.push({
        veiculo: veiculo.id,
        pneu: dto.pneu,
        eixo: dto.eixo,
        lado: dto.lado,
        indice: dto.indice,
      });
    }

    // 5. Inativa/remove alocações antigas afetadas
    if (paraInativarIds.length > 0) {
      const { error: updateError } = await client
        .from('alocacoes')
        .update({ ativa: false }) // ou .delete() dependendo do seu modelo
        .in('id', Array.from(new Set(paraInativarIds)));

      if (updateError) {
        throw new InternalServerErrorException(
          `Erro ao atualizar posições anteriores: ${updateError.message}`,
        );
      }
    }

    // 6. Insere as novas alocações/trocas
    const { data: novasAlocacoes, error: insertError } = await client
      .from('alocacoes')
      .insert(registrosParaSalvar)
      .select();

    if (insertError) {
      throw new InternalServerErrorException(
        `Erro ao salvar novas alocações: ${insertError.message}`,
      );
    }

    return novasAlocacoes as Alocacao[];
  }

  async findAll(placa: string): Promise<Alocacao[]> {
    const veiculo = await this.veiculosService.findOneByPlate(placa);
    const { data, error } = await this.supabase.getClient()
      .from('alocacoes')
      .select('*')
      .eq('veiculo', veiculo.id)

    if (error) {
      throw new InternalServerErrorException(`Erro ao buscar alocações: ${error.message}`);
    }

    return data ?? [];
  }

  async findOne(placa: string, id: number): Promise<Alocacao> {
    const veiculo = await this.veiculosService.findOneByPlate(placa);
    const { data, error } = await this.supabase.getClient()
      .from('alocacoes')
      .select('*')
      .eq('id', id)
      .eq('veiculo', veiculo.id)
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(`Erro ao buscar alocação: ${error.message}`);
    }

    if (!data) {
      throw new NotFoundException('Alocação não encontrada');
    }

    return data;
  }

  async update(placa: string, id: number, dto: UpdateAlocacaoDto): Promise<Alocacao> {
    const veiculo = await this.veiculosService.findOneByPlate(placa);
    await this.findOne(placa, id);

    const eixo = dto.eixo ?? undefined;
    const lado = dto.lado ?? undefined;
    const indice = dto.indice ?? undefined;
    if (eixo !== undefined && lado !== undefined && indice !== undefined &&
        !veiculo.template.permite(eixo, lado, indice)) {
      throw new BadRequestException('Posição inválida no template.');
    }

    if (dto.pneu !== undefined) {
      await this.pneusService.findOneById(dto.pneu);
    }

    const { data, error } = await this.supabase.getClient()
      .from('alocacoes')
      .update(dto)
      .eq('id', id)
      .eq('veiculo', veiculo.id)
      .select('*')
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(`Erro ao atualizar alocação: ${error.message}`);
    }

    if (!data) {
      throw new NotFoundException('Alocação não encontrada');
    }

    return data;
  }

  async remove(placa: string, id: number): Promise<void> {
    const veiculo = await this.veiculosService.findOneByPlate(placa);
    const { data, error } = await this.supabase.getClient()
      .from('alocacoes')
      .delete()
      .eq('id', id)
      .eq('veiculo', veiculo.id)
      .select('id')
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(`Erro ao remover alocação: ${error.message}`);
    }

    if (!data) {
      throw new NotFoundException('Alocação não encontrada');
    }
  }
}
