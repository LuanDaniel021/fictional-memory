import { Injectable } from '@nestjs/common';
import { CreateAlocacoeDto } from './dto/create-alocacoe.dto';
import { UpdateAlocacoeDto } from './dto/update-alocacoe.dto';

@Injectable()
export class AlocacoesService {
  create(createAlocacoeDto: CreateAlocacoeDto) {
    return 'This action adds a new alocacoe';
  }

  findAll() {
    return `This action returns all alocacoes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} alocacoe`;
  }

  update(id: number, updateAlocacoeDto: UpdateAlocacoeDto) {
    return `This action updates a #${id} alocacoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} alocacoe`;
  }
}
