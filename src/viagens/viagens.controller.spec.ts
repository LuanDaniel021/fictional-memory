import { Test, TestingModule } from '@nestjs/testing';
import { ViagensController } from './viagens.controller';
import { ViagensService } from './viagens.service';

describe('ViagensController', () => {
  let controller: ViagensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViagensController],
      providers: [ViagensService],
    }).compile();

    controller = module.get<ViagensController>(ViagensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
