import { Test, TestingModule } from '@nestjs/testing';
import { MedicaoPneusController } from './medicao_pneus.controller';
import { MedicaoPneusService } from './medicao_pneus.service';

describe('MedicaoPneusController', () => {
  let controller: MedicaoPneusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicaoPneusController],
      providers: [MedicaoPneusService],
    }).compile();

    controller = module.get<MedicaoPneusController>(MedicaoPneusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
