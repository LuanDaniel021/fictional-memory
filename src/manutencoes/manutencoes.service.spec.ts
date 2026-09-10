import { Test, TestingModule } from '@nestjs/testing';
import { ManutencoesService } from './manutencoes.service';

describe('ManutencoesService', () => {
  let service: ManutencoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManutencoesService],
    }).compile();

    service = module.get<ManutencoesService>(ManutencoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
