import { Injectable } from '@nestjs/common';
import { CreateCondicoeDto } from './dto/create-condicoe.dto';
import { UpdateCondicoeDto } from './dto/update-condicoe.dto';

@Injectable()
export class CondicoesService {
  create(createCondicoeDto: CreateCondicoeDto) {
    return 'This action adds a new condicoe';
  }

  findAll() {
    return `This action returns all condicoes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} condicoe`;
  }

  update(id: number, updateCondicoeDto: UpdateCondicoeDto) {
    return `This action updates a #${id} condicoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} condicoe`;
  }
}
