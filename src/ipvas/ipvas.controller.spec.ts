import { Test, TestingModule } from '@nestjs/testing';
import { IpvasController } from './ipvas.controller';
import { IpvasService } from './ipvas.service';

describe('IpvasController', () => {
  let controller: IpvasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IpvasController],
      providers: [IpvasService],
    }).compile();

    controller = module.get<IpvasController>(IpvasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
