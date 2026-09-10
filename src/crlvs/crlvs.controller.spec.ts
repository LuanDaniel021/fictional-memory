import { Test, TestingModule } from '@nestjs/testing';
import { CrlvController } from './crlvs.controller';
import { CrlvService } from './crlvs.service';

describe('CrlvController', () => {
  let controller: CrlvController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrlvController],
      providers: [CrlvService],
    }).compile();

    controller = module.get<CrlvController>(CrlvController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
