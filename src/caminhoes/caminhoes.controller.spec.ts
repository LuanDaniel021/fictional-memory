import { Test, TestingModule } from '@nestjs/testing';
import { CaminhoesController } from './caminhoes.controller';
import { CaminhoesService } from './caminhoes.service';
import { jest } from '@jest/globals';

describe('CaminhoesController', () => {
  let controller: CaminhoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaminhoesController],
      providers: [
        {
          provide: CaminhoesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findPlate: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CaminhoesController>(CaminhoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
