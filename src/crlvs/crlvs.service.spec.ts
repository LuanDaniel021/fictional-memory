import { Test, TestingModule } from '@nestjs/testing';
import { CrlvService } from './crlvs.service';

describe('CrlvService', () => {
  let service: CrlvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrlvService],
    }).compile();

    service = module.get<CrlvService>(CrlvService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
