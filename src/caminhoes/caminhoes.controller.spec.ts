import { Test, TestingModule } from '@nestjs/testing';
import { CaminhoesController } from './caminhoes.controller';
import { CaminhoesService } from './caminhoes.service';

describe('CaminhoesController', () => {
  let controller: CaminhoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaminhoesController],
      providers: [CaminhoesService],
    }).compile();

    controller = module.get<CaminhoesController>(CaminhoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
