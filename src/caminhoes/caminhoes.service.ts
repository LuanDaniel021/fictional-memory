import { Injectable } from '@nestjs/common';
import { CreateCaminhaoDto } from './dto/create-caminhao.dto';
import { UpdateCaminhaoDto } from './dto/update-caminhao.dto';

@Injectable()
export class CaminhoesService {
  create(createCaminhoeDto: CreateCaminhaoDto) {
    return 'This action adds a new caminhoe';
  }

  findAll() {
    return `This action returns all caminhoes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} caminhoe`;
  }

  update(id: number, updateCaminhoeDto: UpdateCaminhaoDto) {
    return `This action updates a #${id} caminhoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} caminhoe`;
  }
}
