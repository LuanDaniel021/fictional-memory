import { Test, TestingModule } from '@nestjs/testing';
import { CrlvService } from './crlvs.service';
import { SupabaseService } from '../supabase/supabase.service';
import { jest } from '@jest/globals';

describe('CrlvService', () => {
  let service: CrlvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrlvService,
        { provide: SupabaseService, useValue: { getClient: jest.fn() } },
      ],
    }).compile();

    service = module.get<CrlvService>(CrlvService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
