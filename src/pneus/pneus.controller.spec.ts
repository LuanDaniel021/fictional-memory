import { Test, TestingModule } from '@nestjs/testing';
import { PneusController } from './pneus.controller';
import { PneusService } from './pneus.service';

describe('PneusController', () => {
  let controller: PneusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PneusController],
      providers: [PneusService],
    }).compile();

    controller = module.get<PneusController>(PneusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
