import { Test, TestingModule } from '@nestjs/testing';
import { ManutencoesController } from './manutencoes.controller';
import { ManutencoesService } from './manutencoes.service';

describe('ManutencoesController', () => {
  let controller: ManutencoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManutencoesController],
      providers: [ManutencoesService],
    }).compile();

    controller = module.get<ManutencoesController>(ManutencoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
