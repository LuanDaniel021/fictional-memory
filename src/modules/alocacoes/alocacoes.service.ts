import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAlocacaoDto } from './dto/create-alocacao.dto';
import { UpdateAlocacaoDto } from './dto/update-alocacao.dto';
import { Alocacao } from './entities/alocacao.entity';
import { VeiculosService } from '../veiculos/veiculos.service';
import { SupabaseService } from '../../supabase/supabase.service';
import { PneusService } from '../pneus/pneus.service';

@Injectable()
export class AlocacoesService {

  constructor(
    private readonly supabase: SupabaseService,
    private readonly veiculosService: VeiculosService,
    private readonly pneusService: PneusService,
  ) {}

  async create(placa: string, dtos: CreateAlocacaoDto[]): Promise<Alocacao[]> {
    const client = this.supabase.getClient();

    // 1. Busca veículo e valida existência dos pneus
    const veiculo = await this.veiculosService.findOneByPlate(placa);
    const pneuIds = dtos.map((dto) => dto.pneu);
    await this.pneusService.findAllById(pneuIds);

    // 2. Valida se as posições são permitidas pelo template
    for (const dto of dtos) {
      if (!veiculo.template.permite(dto.eixo, dto.lado, dto.indice)) {
        throw new BadRequestException(
          `Posição inválida no template: eixo ${dto.eixo}, lado ${dto.lado}, índice ${dto.indice}.`,
        );
      }
    }

    // 3. Buscar alocações existentes dos pneus e do veículo
    // Regra: Pneu já em outro veículo -> Rejeitar
    const { data: alocacoesPneus } = await client
      .from('alocacoes')
      .select('*')
      .in('pneu_id', pneuIds)
      .eq('ativa', true);

    const pneusEmOutrosVeiculos = (alocacoesPneus || []).filter(
      (aloc) => aloc.veiculo_id !== veiculo.id,
    );

    if (pneusEmOutrosVeiculos.length > 0) {
      throw new BadRequestException(
        'Um ou mais pneus já estão alocados em outro veículo.',
      );
    }

    // 4. Processar alocações do veículo atual
    const { data: alocacoesVeiculo } = await client
      .from('alocacoes')
      .select('*')
      .eq('veiculo_id', veiculo.id)
      .eq('ativa', true);

    const paraInativarIds: string[] = [];
    const registrosParaSalvar: any[] = [];

    for (const dto of dtos) {
      // Verifica se o pneu já está neste veículo em outra posição
      const alocacaoAtualPneu = alocacoesVeiculo?.find(
        (a) => a.pneu_id === dto.pneu,
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
          veiculo_id: veiculo.id,
          pneu_id: alocacaoNaPosicaoDestino.pneu_id,
          eixo: alocacaoAtualPneu.eixo,
          lado: alocacaoAtualPneu.lado,
          indice: alocacaoAtualPneu.indice,
          ativa: true,
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
        veiculo_id: veiculo.id,
        pneu_id: dto.pneu,
        eixo: dto.eixo,
        lado: dto.lado,
        indice: dto.indice,
        ativa: true,
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

  findAll() {
    return `This action returns all alocacoes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} alocacoe`;
  }

  update(id: number, dto: UpdateAlocacaoDto) {
    return `This action updates a #${id} alocacoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} alocacoe`;
  }
}
