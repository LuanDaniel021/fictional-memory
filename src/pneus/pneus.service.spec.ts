import { Test, TestingModule } from '@nestjs/testing';
import { PneusService } from './pneus.service';

describe('PneusService', () => {
  let service: PneusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PneusService],
    }).compile();

    service = module.get<PneusService>(PneusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
